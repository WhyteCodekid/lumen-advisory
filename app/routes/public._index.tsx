import { Button, SelectItem } from "@nextui-org/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import axios from "axios";
import { toast } from "sonner";
import useSWR from "swr";
import CustomSelect from "~/components/inputs/select";
import TextInput from "~/components/inputs/text-input";
import PublicLayout from "~/components/layouts/public";
import PropertyCard from "~/components/ui/property-card";
import { getSession } from "~/session";
import { CategoryInterface, PropertyInterface } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { baseAPI, token } = useLoaderData<typeof loader>();

  // fetch categories
  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);
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

  const propertiesData = useSWR(
    `${baseAPI}/properties?page=${1}&search_term=`,
    fetcher
  );

  if (propertiesData?.data?.length > 0) console.log(propertiesData.data);

  return (
    <>
      <PublicLayout token={token}>
        <Outlet />
        {/* banner */}
        <div className="w-full px-4">
          <div className="bg-banner bg-cover bg-no-repeat bg-center h-[60vh] xl:h-[70vh] rounded-[2rem] w-full flex flex-col items-center justify-center gap-6">
            <h1 className="font-montserrat font-bold text-3xl md:text-7xl xl:text-8xl text-white text-center">
              Easy way to find the perfect property
            </h1>

            {/* property search */}
            <div className="rounded-2xl bg-white/20 backdrop-blur-md w-[90%] xl:w-4/6 p-4 py-6 flex flex-col md:flex-row md:items-end gap-4">
              <CustomSelect
                label="Category"
                name="category"
                isLoading={isLoading}
                color="warning"
                classNames={{
                  label:
                    "text-white font-montserrat text-sm md:text-lg font-medium",
                }}
              >
                {data?.categories?.map((option: CategoryInterface) => (
                  <SelectItem key={option._id} value={option._id}>
                    {option.name}
                  </SelectItem>
                ))}
              </CustomSelect>
              <TextInput
                name="location"
                label="Location"
                color="warning"
                classNames={{
                  label:
                    "text-white font-montserrat text-sm md:text-lg font-medium",
                }}
              />
              <div>
                <Button
                  color="warning"
                  className="w-max font-montserrat font-semibold"
                >
                  Search Properties
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* property listing */}
        <div className="flex flex-col gap-6 lg:py-20">
          <h2 className="font-montserrat font-bold text-3xl lg:text-6xl lg:w-[60%]">
            Tailored Properties Just for You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {propertiesData?.data?.properties?.map(
              (property: PropertyInterface) => (
                <PropertyCard property={property} key={property._id} />
              )
            )}
          </div>
        </div>
        <h1 className="font-bold text-3xl text-blue-600">Welcome to Remix</h1>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/blog"
              rel="noreferrer"
            >
              15m Quickstart Blog Tutorial
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/jokes"
              rel="noreferrer"
            >
              Deep Dive Jokes App Tutorial
            </a>
          </li>
          <li>
            <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
              Remix Docs
            </a>
          </li>
        </ul>

        <div className="h-screen px-4"></div>
      </PublicLayout>
      {/* ) : (
        <Preloader />
      )} */}
    </>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const baseAPI = process.env.BACKEND_API_BASE_URL;

  // sessions
  const authSession = await getSession(request.headers.get("Cookie"));
  const token = authSession.get("token");

  return {
    baseAPI,
    token,
  };
};
