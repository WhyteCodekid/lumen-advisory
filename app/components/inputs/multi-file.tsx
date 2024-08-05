/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  DocxUpload,
  FileUpload,
  ImageUpload,
  PdfUpload,
  PptxUpload,
  VideoUpload,
  XlsxUpload,
} from "../icons/upload";
import { FileDelete } from "../icons/file";
import { toast } from "sonner";

export default function MultipleFileInput({
  name,
  fileType = "all",
  label = "Click to upload files",
  required = false,
  isMultiple = true,
  inputRef,
  base64Strings,
  setBase64Strings,
}: {
  name: string;
  fileType?: "image" | "video" | "pdf" | "docx" | "xlsx" | "pptx" | "all";
  label?: string;
  required?: boolean;
  isMultiple?: boolean;
  inputRef: any;
  base64Strings: string[];
  setBase64Strings: (files: string[]) => void;
}) {
  const [error, setError] = useState<string | null>(null);

  const allowedFileTypes: { [key: string]: string[] } = {
    image: ["image/jpeg", "image/png", "image/gif"],
    video: ["video/mp4", "video/avi"],
    pdf: ["application/pdf"],
    docx: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    xlsx: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    pptx: [
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError(null);
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);

      // Validate file types
      if (fileType !== "all") {
        const allowedTypes = allowedFileTypes[fileType];
        const invalidFiles = newFiles.filter(
          (file) => !allowedTypes.includes(file.type)
        );
        if (invalidFiles.length > 0) {
          toast.error(
            "Invalid file type. Please upload only " + fileType + " files"
          );
          setError(`Some files are not of type ${fileType}.`);
          return;
        }
      }

      const base64Promises = newFiles.map(fileToBase64);
      const newBase64Strings = await Promise.all(base64Promises);

      setBase64Strings((prev) => [...prev, ...newBase64Strings]);
    }
  };

  const handleRemoveFile = (base64String: string) => {
    setBase64Strings((prev) => prev.filter((b64) => b64 !== base64String));
  };

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = JSON.stringify(base64Strings);
    }
  }, [base64Strings, inputRef]);

  return (
    <div className="flex gap-4 items-center flex-wrap">
      {/* preview */}
      {base64Strings.map((base64String, index) => (
        <div
          key={index}
          className="relative rounded-xl overflow-hidden w-64 h-40 bg-slate-900/80"
        >
          <img
            src={base64String}
            alt={`Preview ${index}`}
            className="w-full h-full object-cover object-center"
          />
          <button
            type="button"
            onClick={() => handleRemoveFile(base64String)}
            className="absolute bottom-2 right-2 bg-red-500/80 text-white rounded-lg size-8 hover:bg-red-500 transition-all duration-300 flex items-center justify-center"
            aria-label={`Remove file`}
          >
            <FileDelete className="text-white size-6" />
          </button>
        </div>
      ))}

      {/* hidden input */}
      <input
        className="hidden"
        name={name}
        ref={inputRef}
        value={JSON.stringify(base64Strings)}
        required={required && base64Strings.length === 0}
      />

      {/* select file input */}
      <input
        id={`file-input-${name}`}
        className="hidden"
        type="file"
        multiple={isMultiple}
        onChange={handleFileSelect}
      />
      <label
        htmlFor={`file-input-${name}`}
        className="rounded-2xl overflow-hidden w-64 h-40 border border-dashed border-gray-400 dark:border-slate-700 !outline-none flex flex-col gap-2 items-center justify-center dark:bg-slate-900/30 dark:hover:bg-slate-900/70 transition-all duration-300"
      >
        {fileType === "all" ? (
          <FileUpload className="size-16 text-blue-500" />
        ) : fileType === "docx" ? (
          <DocxUpload className="size-16 text-blue-500" />
        ) : fileType === "image" ? (
          <ImageUpload className="size-16 text-blue-500" />
        ) : fileType === "video" ? (
          <VideoUpload className="size-16 text-blue-500" />
        ) : fileType === "pdf" ? (
          <PdfUpload className="size-16 text-blue-500" />
        ) : fileType === "pptx" ? (
          <PptxUpload className="size-16 text-blue-500" />
        ) : (
          <XlsxUpload className="size-16 text-blue-500" />
        )}

        <p className="font-quicksand text-sm dark:text-blue-50">{label}</p>
      </label>

      {/* error message */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
