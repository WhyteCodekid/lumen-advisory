import { Button, Card, Input } from "@nextui-org/react";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useNavigation, redirect } from "@remix-run/react";
import { getFlashSession } from "~/flash-session";
import { getSession, commitSession } from "~/session";
import axios from "axios";

export default function ConsoleLogin() {
  const navigation = useNavigation();

  return (
    <div className="h-screen grid grid-cols-2 gap-8 bg-[url('assets/images/black-background-texture.jpeg')] bg-cover bg-no-repeat bg-center">
      {/* placeholder content */}
      <div className="h-full bg-transparent hidden lg:block"></div>

      {/* login form */}
      <div className="h-full flex flex-col gap-20 items-center justify-center col-span-2 md:col-span-1">
        <Card className="w- full md:w-[55%] rounded-3xl flex flex-col gap-12 backdrop-blur-lg bg-[#18181b] pt-8 px-8 pb-12 border border-white/5">
          <div>
            <h1 className="font-montserrat font-semibold text-xl md:text-2xl text-white/50 mb-2">
              Welcome back!
            </h1>
            <h2 className="font-montserrat font-bold text-6xl md:text-7xl text-white">
              Sign In
            </h2>
          </div>

          <Form
            method="POST"
            id="login-form"
            className="flex flex-col gap-8 w-full md:w-[95%]"
          >
            <Input
              label="Email"
              name="email"
              classNames={{
                label: "text-white font-sen font-semibold",
                base: "shadow-none",
                inputWrapper: "border-gray-600 text-white font-nunito",
                errorMessage: "font-nunito",
              }}
              type="email"
              isRequired
            />
            <Input
              label="Password"
              name="password"
              classNames={{
                label: "text-white font-sen font-semibold",
                base: "shadow-none",
                inputWrapper: "border-gray-600 text-white font-nunito",
                errorMessage: "font-nunito",
              }}
              isRequired
            />
            <Button
              type="submit"
              form="login-form"
              isLoading={navigation.state === "submitting"}
              color="primary"
              className="font-montserrat font-medium h-12 text-lg"
            >
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo");

  // flash session
  const flashSession = await getFlashSession(request.headers.get("Cookie"));
  const authSession = await getSession(request.headers.get("Cookie"));
  // extract form data values
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData.entries());

  // make post request
  try {
    const response = await axios.post(
      `${process.env.BACKEND_API_BASE_URL}/admins/login`,
      formValues
    );

    // set token to cookie storage
    if (response.data.code === 200) {
      authSession.set("token", response.data.data.token);
    }

    flashSession.set("alert", response.data);

    return redirect(redirectTo || "/console", {
      headers: {
        "Set-Cookie": await commitSession(authSession),
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to login", { cause: error });
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo");

  const authSession = await getSession(request.headers.get("Cookie"));

  const token = authSession.get("token");
  console.log(token || "no token");

  if (token) {
    return redirect(redirectTo || "/console", {
      headers: {
        "Set-Cookie": await commitSession(authSession),
      },
    });
  }

  return null;
};
