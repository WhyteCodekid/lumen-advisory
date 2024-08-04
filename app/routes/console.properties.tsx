import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import ConsoleLayout from "~/components/layouts/console";
import { commitFlashSession, getFlashSession } from "~/flash-session";
import { getSession } from "~/session";

export default function PropertyLayout() {
  return (
    <ConsoleLayout title="Property Management">
      <Outlet />
    </ConsoleLayout>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const authSession = await getSession(request.headers.get("Cookie"));
  const flashSession = await getFlashSession(request.headers.get("Cookie"));
  const token = authSession.get("token");

  if (token) {
    return token;
  } else {
    flashSession.set("alert", {
      code: 504,
      status: "error",
      message: "Unathorized! You need to login for access...",
    });

    return redirect("/console-login", {
      headers: {
        "Set-Cookie": await commitFlashSession(flashSession),
      },
    });
  }
};
