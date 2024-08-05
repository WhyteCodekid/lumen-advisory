/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@nextui-org/react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import axios from "axios";
import { ReactNode, useRef, useState } from "react";
import MultipleFileInput from "~/components/inputs/multi-file";
import TextInput from "~/components/inputs/text-input";
import { commitFlashSession, getFlashSession } from "~/flash-session";
import { getPropertyIdSession } from "~/property-id-session";
import { getSession } from "~/session";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

export type SelectOption = {
  value: string;
  label: string;
};

const FormSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex items-center gap-3">
        <h3>{title}</h3>
        <div className="h-[1px] flex-1 bg-slate-300 dark:bg-white/15"></div>
      </div>

      <div className="">{children}</div>
    </div>
  );
};

export default function CreatePropertyOverview() {
  const { propertyId } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const navigate = useNavigate();

  // refs for file inputs
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [videoFiles, setVideoFiles] = useState<string[]>([]);

  return (
    <div>
      <Form
        method="POST"
        id="property-amenities-form"
        className="grid grid-cols-1 gap-12"
      >
        {/* property details */}
        <TextInput
          label="Property Id"
          name="propertyId"
          className="hidden"
          value={propertyId}
        />
        <FormSection title="Property Images">
          <MultipleFileInput
            name="images"
            fileType="image"
            label="Click to upload images"
            inputRef={imageInputRef}
            base64Strings={imageFiles}
            setBase64Strings={setImageFiles}
          />
        </FormSection>
        <FormSection title="Property Videos">
          <MultipleFileInput
            name="videos"
            fileType="video"
            label="Click to upload video"
            inputRef={videoInputRef}
            base64Strings={videoFiles}
            setBase64Strings={setVideoFiles}
          />
        </FormSection>

        {/* submit button */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            className="w-max"
            variant="flat"
            onPress={() => navigate("/console/properties/create/amenities")}
          >
            Go Back
          </Button>

          <Button
            type="submit"
            form="property-amenities-form"
            color="primary"
            className="w-max"
            isLoading={navigation.state === "submitting"}
          >
            Save and Continue
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const action: ActionFunction = async ({ request }) => {
  // sessions
  const authSession = await getSession(request.headers.get("Cookie"));
  const flashSession = await getFlashSession(request.headers.get("Cookie"));
  const token = authSession.get("token");

  // form data
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData.entries());

  const images = JSON.parse(formValues.images);
  const videos = JSON.parse(formValues.videos);

  // Get the directory name of the current module
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Define the output directory and file
  const publicDir = path.join(__dirname, "../public");
  const outputPath = path.join(publicDir, "uploaded_files", "images");
  const outputVideoPath = path.join(publicDir, "uploaded_files", "videos");

  let imageNames = [];
  let videoNames = [];

  try {
    const uploadImagePromises = images.map((image) =>
      base64ToFile(image, outputPath)
    );

    const uploadVideoPromises = videos.map((video) =>
      base64ToFile(video, outputVideoPath)
    );

    const uploadedImagesFiles = await Promise.all(uploadImagePromises);
    const uploadedVideosFiles = await Promise.all(uploadVideoPromises);
    console.log({ uploadedImagesFiles, uploadedVideosFiles });

    imageNames = uploadedImagesFiles;
    videoNames = uploadedVideosFiles;
  } catch (error) {
    console.error("Error uploading files:", error);
  }

  // return true;

  try {
    const response = await axios.post(
      `${process.env.BACKEND_API_BASE_URL}/admins/properties`,
      {
        images: imageNames,
        videos: videoNames,
        intent: "storeMedia",
        id: formValues.propertyId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    flashSession.set("alert", response.data);
    return redirect("/console/properties/create/media", {
      headers: {
        "Set-Cookie": await commitFlashSession(flashSession),
      },
    });
  } catch (error) {
    flashSession.set("alert", {
      code: 401,
      status: "error",
      message: "Failed to create property",
    });
    console.log(error);
    return json(null, {
      headers: {
        "Set-Cookie": await commitFlashSession(flashSession),
      },
    });
  }
};

// Function to convert base64 string to a file and save it
const base64ToFile = (base64String, outputDir) => {
  return new Promise((resolve, reject) => {
    // Extract the MIME type from the base64 string
    const matches = base64String.match(/^data:(.+);base64,/);
    if (!matches) {
      return reject(new Error("Invalid base64 string"));
    }

    // Get MIME type and determine the extension
    const mimeType = matches[1];
    const extension = mimeType.split("/")[1];
    if (!extension) {
      return reject(new Error("Could not determine file extension"));
    }

    // Generate a unique filename with timestamp
    const filename = `file_${Date.now()}.${extension}`;
    const outputPath = path.join(outputDir, filename);

    // Extract the data part from the base64 string
    const base64Data = base64String.split(";base64,").pop();

    // Decode the base64 string
    const buffer = Buffer.from(base64Data, "base64");

    // Ensure the directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the buffer to a file
    fs.writeFile(outputPath, buffer, (err) => {
      if (err) {
        return reject(err);
      } else {
        resolve(filename);
      }
    });
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  // sessions
  const authSession = await getSession(request.headers.get("Cookie"));
  const propertyIdSession = await getPropertyIdSession(
    request.headers.get("Cookie")
  );
  const propertyId = propertyIdSession.get("propertyId");
  console.log(propertyId);

  const token = authSession.get("token");
  const baseAPI = process.env.BACKEND_API_BASE_URL;

  return {
    token,
    baseAPI,
    propertyId,
  };
};
