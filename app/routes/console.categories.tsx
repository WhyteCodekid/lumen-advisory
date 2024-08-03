import {
  Button,
  Input,
  TableCell,
  TableRow,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { toast } from "sonner";
import useSWR from "swr";
import ConsoleLayout from "~/components/layouts/console";
import CreateRecordModal from "~/components/modals/CreateRecord";
import CustomTable from "~/components/ui/new-table";
import { commitFlashSession } from "~/flash-session";
import { getSession } from "~/session";
import { CategoryInterface } from "~/types";

export default function ConsoleCategories() {
  const { page, search_term, token, baseAPI } = useLoaderData<typeof loader>();

  //    retrieve categories
  const fetcher = async (url: string) => {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data.data);
    if (response.data.status === "error") {
      toast.error(response.data.message);
    }
    return response.data.data;
  };
  const { data, isLoading } = useSWR(
    `${baseAPI}/admins/categories?page=${page}&search_term=${search_term}`,
    fetcher
  );

  //   create category stuff
  const createDisclosure = useDisclosure();
  return (
    <ConsoleLayout>
      <div className="flex items-center justify-between">
        <Button onPress={createDisclosure.onOpen}>Add Category</Button>
      </div>
      <CustomTable
        columns={["Category Name", "Description", "Actions"]}
        loadingState={isLoading ? "loading" : "idle"}
        page={page}
        totalPages={data?.totalPages || 1}
        setPage={() => {}}
      >
        {data?.categories?.map((data: CategoryInterface, index: number) => (
          <TableRow key={index}>
            <TableCell>{data.name}</TableCell>
            <TableCell>{data.description}</TableCell>
            <TableCell>
              <button>Edit</button>
              <button>Delete</button>
            </TableCell>
          </TableRow>
        ))}
      </CustomTable>

      {/* create category modal */}
      <CreateRecordModal
        isOpen={createDisclosure.isOpen}
        onCloseModal={createDisclosure.onClose}
        onOpenChange={createDisclosure.onOpenChange}
        title="Create Category"
        actionText="Create Category"
        intent="create"
      >
        <Input
          name="name"
          label="Category Name"
          placeholder=" "
          labelPlacement="outside"
        />
        <Textarea
          name="description"
          label="Description"
          labelPlacement="outside"
          placeholder=" "
        />
      </CreateRecordModal>
    </ConsoleLayout>
  );
}

export const action: ActionFunction = async ({ request }) => {
  // sessions
  const authSession = await getSession(request.headers.get("Cookie"));
  const flashSession = await getSession(request.headers.get("Cookie"));

  const token = authSession.get("token");
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData);

  try {
    const response = await axios.post(
      `${process.env.BACKEND_API_BASE_URL}/admins/categories`,
      formValues,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    flashSession.set("alert", response.data);

    return json(response.data, {
      headers: {
        "Set-Cookie": await commitFlashSession(flashSession),
      },
    });
  } catch (error) {
    console.log(error);
  }
  return {};
};

export const loader: LoaderFunction = async ({ request }) => {
  // sessions
  const authSession = await getSession(request.headers.get("Cookie"));
  const token = authSession.get("token");
  const baseAPI = process.env.BACKEND_API_BASE_URL;

  //   query params
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const search_term = url.searchParams.get("search_term") || "";

  return {
    page,
    search_term,
    token,
    baseAPI,
  };
};
