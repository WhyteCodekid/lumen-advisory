import { Outlet } from "@remix-run/react";
import ConsoleLayout from "~/components/layouts/console";

export default function PropertyLayout() {
  return (
    <ConsoleLayout title="Property Management">
      <Outlet />
    </ConsoleLayout>
  );
}
