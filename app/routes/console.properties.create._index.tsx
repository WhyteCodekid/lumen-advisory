/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, SelectItem } from "@nextui-org/react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import axios from "axios";
import { toast } from "sonner";
import useSWR from "swr";
import CustomSelect from "~/components/inputs/select";
import TextInput from "~/components/inputs/text-input";
import TextareaInput from "~/components/inputs/textarea";
import { commitFlashSession, getFlashSession } from "~/flash-session";
import {
  commitPropertyIdSession,
  getPropertyIdSession,
} from "~/property-id-session";
import { getSession } from "~/session";
import { CategoryInterface } from "~/types";

export type SelectOption = {
  value: string;
  label: string;
};

export default function CreatePropertyOverview() {
  const { token, baseAPI } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  // fetch categories
  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.status === "error") {
        toast.error(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch categories");
    }
  };
  const { data, isLoading } = useSWR(
    `${baseAPI}/admins/categories?page=${1}&search_term=`,
    fetcher
  );

  return (
    <div>
      <Form
        method="POST"
        id="property-overview-form"
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <TextInput label="Property Title" name="title" />
        <TextareaInput label="Description" name="description" />
        <TextInput label="Price" name="price" type="number" />
        <TextInput label="Location" name="location" />
        <TextareaInput label="Address" name="address" />
        <CustomSelect label="Category" name="category" isLoading={isLoading}>
          {data?.categories?.map((option: CategoryInterface) => (
            <SelectItem key={option._id} value={option._id}>
              {option.name}
            </SelectItem>
          ))}
        </CustomSelect>
        <CustomSelect label="Lease Type" name="leaseType">
          {[
            {
              value: "rent",
              label: "Rent",
            },
            {
              value: "sale",
              label: "Sale",
            },
          ].map((option: SelectOption) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </CustomSelect>
        <TextInput label="Bedrooms" name="bedrooms" type="number" />
        <TextInput label="Bathrooms" name="bathrooms" type="number" />
        <TextInput label="Area (sq ft)" name="squareFeet" type="number" />

        {/* submit button */}
        <Button
          type="submit"
          form="property-overview-form"
          color="primary"
          className="w-max"
          isLoading={navigation.state === "submitting"}
        >
          Save and Continue
        </Button>
      </Form>
    </div>
  );
}

export const action: ActionFunction = async ({ request }) => {
  // sessions
  const authSession = await getSession(request.headers.get("Cookie"));
  const flashSession = await getFlashSession(request.headers.get("Cookie"));
  const propertyIdSession = await getPropertyIdSession(
    request.headers.get("Cookie")
  );

  const token = authSession.get("token");

  // form data
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData.entries());

  try {
    const response = await axios.post(
      `${process.env.BACKEND_API_BASE_URL}/admins/properties`,
      { ...formValues, intent: "storeGeneral" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    propertyIdSession.set("propertyId", response.data.data._id);
    flashSession.set("alert", response.data);

    const headers = new Headers();
    headers.append("Set-Cookie", await commitFlashSession(flashSession));
    headers.append(
      "Set-Cookie",
      await commitPropertyIdSession(propertyIdSession)
    );

    return redirect("/console/properties/create/amenities", {
      headers,
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

export const loader: LoaderFunction = async ({ request }) => {
  // sessions
  const authSession = await getSession(request.headers.get("Cookie"));
  const token = authSession.get("token");
  const baseAPI = process.env.BACKEND_API_BASE_URL;

  return {
    token,
    baseAPI,
  };
};
