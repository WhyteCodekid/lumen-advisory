/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card } from "@nextui-org/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Form, json, useLoaderData } from "@remix-run/react";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { BathTub } from "~/components/icons/amenities";
import { EyeOutlined } from "~/components/icons/eye";
import { Bedrooms, LandSize } from "~/components/icons/property-features";
import {
  HeartDuotone,
  PrinterDuotone,
  ShareArrowDuotone,
} from "~/components/icons/social-media";
import TextInput from "~/components/inputs/text-input";
import TextareaInput from "~/components/inputs/textarea";
import PublicLayout from "~/components/layouts/public";
import { commitFlashSession, getFlashSession } from "~/flash-session";

const InfoSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-6 mb-12 pb-12 border-b border-slate-300 dark:border-white/15">
      <h3 className="font-montserrat font-bold text-4xl">{title}</h3>

      <div className="">{children}</div>
    </div>
  );
};

const PropertyDetailsValue = ({
  icon,
  value,
  suffix,
  title,
}: {
  icon: ReactNode;
  value: string;
  suffix?: string | ReactNode;
  title: string;
}) => {
  return (
    <div className="border-b py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {icon}
        <h4 className="font-montserrat text-lg">{title}</h4>
      </div>

      <h4 className="font-montserrat font-semibold text-lg">
        {value}
        {suffix}
      </h4>
    </div>
  );
};

export default function PropertyDetails() {
  const loaderData = useLoaderData<typeof loader>();

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(
        (prev) => (prev + 1) % loaderData?.data?.property?.images?.length
      );
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <PublicLayout>
        {/* banner */}
        <div className="w-full px-4">
          {/* title and price */}
          <div className="flex items-center justify-between py-4">
            <h1 className="font-montserrat font-bold text-6xl">
              {loaderData?.data?.property.title}
            </h1>
            <h1 className="font-montserrat font-bold text-6xl">
              $ {loaderData?.data?.property.price}
            </h1>
          </div>

          {/* more info and action buttons */}
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-4">
              <p className="font-poppins uppercase text-xs md:text-base border-r border-black pr-4">
                {loaderData?.data?.property?.category?.name}
              </p>
              <p className="font-poppins uppercase text-xs md:text-base border-r border-black pr-4">
                PROPERTY ID: {loaderData?.data?.property?._id}
              </p>
              <p className="font-poppins uppercase text-xs md:text-base pr-4 flex items-center gap-2">
                <EyeOutlined /> {loaderData?.data?.views || 0}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                variant="flat"
                className="font-nunito font-semibold"
                startContent={<HeartDuotone className="text-lg" />}
                color="warning"
              >
                Add to wishlist
              </Button>
              <Button
                size="sm"
                variant="flat"
                className="font-nunito font-semibold text-sm"
                startContent={<ShareArrowDuotone className="text-lg" />}
                color="warning"
              >
                Share
              </Button>
              <Button
                size="sm"
                variant="flat"
                className="font-nunito font-semibold text-sm"
                startContent={<PrinterDuotone className="text-lg" />}
                color="warning"
              >
                Print
              </Button>
            </div>
          </div>

          {/* banner carousel */}
          <div
            className={`h-[60vh] xl:h-[70vh] rounded-[2rem] w-full flex flex-col items-center justify-center gap-6 overflow-hidden`}
          >
            <img
              key={currentImage}
              src={`/uploaded_files/images/${loaderData?.data?.property?.images[currentImage]}`}
              alt="banner"
              className="h-full w-full object-cover transition-all duration-300"
            />
          </div>

          <div className="flex items-center gap-3 py-4 flex-nowrap overflow-x-auto">
            {loaderData?.data?.property?.images?.map(
              (image: string, index: number) => (
                <button
                  key={index}
                  className={`h-32 w-52 border-none dark:border dark:border-white/70 rounded-3xl overflow-hidden transition-all duration-300 hover:opacity-100 ${
                    currentImage === index ? "" : "opacity-50"
                  }`}
                  onClick={() => setCurrentImage(index)}
                >
                  <img
                    src={`/uploaded_files/images/${image}`}
                    alt="banner"
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              )
            )}
          </div>
          {/* end:: banner carousel */}

          {/* start:: property info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-20">
            {/* main info card */}
            <div className="md:col-span-2">
              {/* description */}
              <InfoSection title="Description">
                <p className="font-quicksand text-lg">
                  {loaderData?.data?.property?.description}
                </p>
              </InfoSection>

              {/* property features */}
              <InfoSection title="Property Features">
                <div className="flex flex-col gap-6">
                  <h3>Property Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-20">
                    <div className="border-b py-2 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <LandSize />
                        <h4 className="font-montserrat text-lg">Size</h4>
                      </div>

                      <h4 className="font-montserrat font-semibold text-lg">
                        {loaderData?.data?.property?.details?.size}m<sup>2</sup>
                      </h4>
                    </div>
                    <PropertyDetailsValue
                      title="Bedrooms"
                      icon={<Bedrooms />}
                      value={loaderData?.data?.property?.bedrooms}
                    />
                    <PropertyDetailsValue
                      title="Bathrooms"
                      icon={<BathTub />}
                      value={loaderData?.data?.property?.bathrooms}
                    />
                  </div>
                </div>
              </InfoSection>

              {/* video */}
              <InfoSection title="Video Tour">
                <video
                  controls
                  autoPlay
                  muted
                  playsInline
                  loop
                  className="rounded-3xl w-full h-auto aspect-video"
                >
                  <source
                    // src={`/uploaded_files/videos/${loaderData?.data?.property?.videos[0]}`}
                    src="https://res.cloudinary.com/depow7mhg/video/upload/v1719163363/oil-processing-plant_rrtxnt.mp4"
                    type="video/mp4"
                  />
                  <track kind="captions"></track>
                </video>
              </InfoSection>
            </div>

            {/* right-side cards */}
            <div className="flex flex-col gap-8">
              {/* agent */}

              {/* schedule a tour */}
              <Card className="shadow-none rounded-3xl bg-slate-300/30 dark:bg-slate-900/90 p-4 lg:p-8">
                <h3 className="font-montserrat font-semibold text-2xl">
                  Make An Enquiry
                </h3>
                <p className="font-quicksand text-sm">
                  Want to schedule a tour or have any enquiries, dont hesitate
                  to fill out this form. We will respond to you as soon as
                  possible{" "}
                </p>

                <Form
                  method="post"
                  id="enquiry-form"
                  className="grid grid-cols-1 gap-4 mt-8"
                >
                  <TextInput label="Full Name" />
                  <TextInput label="Email" />
                  <TextInput label="Phone" type="tel" />
                  <TextareaInput label="Message" />
                  <Button
                    className="font-montserrat font-semibold"
                    type="submit"
                    form="enquiry-form"
                    color="warning"
                  >
                    Submit
                  </Button>
                </Form>
              </Card>
            </div>
          </div>
        </div>

        <div className="h-[20vh]"></div>
      </PublicLayout>
    </>
  );
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { property_id } = params;
  const baseAPI = process.env.BACKEND_API_BASE_URL;

  // sessions
  const flashSession = await getFlashSession(request.headers.get("Cookie"));

  let property = [];
  try {
    const response = await axios.get(
      `${process.env.BACKEND_API_BASE_URL}/properties/${property_id}`
    );

    if (response.data.code === 200) {
      property = response.data.data;

      try {
        const response = await axios.get(
          `${process.env.BACKEND_API_BASE_URL}/views/${property_id}`
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }

      return json({
        baseAPI,
        property_id,
        data: property,
      });
    } else {
      flashSession.set("alert", response.data);
      return json(response.data, {
        headers: {
          "Set-Cookie": await commitFlashSession(flashSession),
        },
      });
    }
  } catch (error: any) {
    console.log(error);
    flashSession.set("alert", {
      code: 401,
      status: "error",
      message: "Failed to fetch property",
    });

    return json(null, {
      headers: {
        "Set-Cookie": await commitFlashSession(flashSession),
      },
    });
  }
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
