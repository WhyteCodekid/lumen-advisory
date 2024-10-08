import { DashboardBox } from "~/components/icons/box";

export const adminNavLinks = [
  {
    label: "Dashboard",
    title: "Dashboard & Analytics",
    path: "/console",
    icon: <DashboardBox />,
  },
  {
    label: "Categories",
    title: "Property Categories",
    path: "/console/categories",
    icon: <DashboardBox />,
  },
  {
    label: "Properties",
    title: "Property Management",
    path: "/console/properties",
    icon: <DashboardBox />,
  },
];

export const publicNavLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about-us" },
  { label: "Properties", path: "/properties" },
  { label: "Contact Us", path: "/contact" },
];
