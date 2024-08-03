/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, SelectItem, Checkbox } from "@nextui-org/react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import axios from "axios";
import { ReactNode } from "react";
import CustomSelect from "~/components/inputs/select";
import TextInput from "~/components/inputs/text-input";
import TextareaInput from "~/components/inputs/textarea";
import { commitFlashSession, getFlashSession } from "~/flash-session";
import { getPropertyIdSession } from "~/property-id-session";
import { getSession } from "~/session";
import { CategoryInterface } from "~/types";

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </div>
  );
};

export default function CreatePropertyOverview() {
  // const { token, baseAPI } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <div>
      <Form
        method="POST"
        id="property-amenities-form"
        className="grid grid-cols-1 gap-5"
      >
        <FormSection title="Property Details">
          <TextInput label="Size" name="size" type="number" />
          <TextInput label="Floor" name="floor" type="number" />
          <TextInput
            label="Additional Space"
            name="additionalSpace"
            type="number"
          />
          <TextInput label="Furnishing" name="furnishing" />
          <TextInput label="Ceiling Heigh" name="ceilingHeight" type="number" />
          <TextInput
            label="Construction Year"
            name="constructionYear"
            type="number"
          />
          <TextInput label="Renovation" name="renovation" />
        </FormSection>
        <FormSection title="Indoor Features">
          <Checkbox name="airCondition">Air Conditioning</Checkbox>
          <Checkbox name="fireplace">Fireplace</Checkbox>
          <Checkbox name="ventilation">Ventilation</Checkbox>
          <Checkbox name="elevator">Elevator</Checkbox>
          <Checkbox name="cableTV">Cable TV</Checkbox>
          <Checkbox name="wifi">WiFi</Checkbox>
          <TextInput label="Furnishing" name="furnishing" />
        </FormSection>
        <FormSection title="Outdoor Features">
          <Checkbox name="garage">Garage</Checkbox>
          <Checkbox name="petFriendly">Pet Friendly</Checkbox>
          <Checkbox name="swimmingPool">Swimming Pool</Checkbox>
          <Checkbox name="barbequeGrill">Barbeque Grill</Checkbox>
          <TextInput label="Disabled Access" name="disabledAccess" />
          <TextInput label="Fence" name="fence" />
          <TextInput label="Garden" name="garden" />
          <TextInput label="Security" name="security" />
        </FormSection>

        {/* submit button */}
        <div className="flex items-center gap-3">
          <Button type="button" className="w-max" variant="flat">
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
  console.log(formValues);

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
    flashSession.set("alert", response.data);
    return redirect("/console/properties/create/amenities", {
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
