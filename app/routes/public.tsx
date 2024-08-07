/* eslint-disable @typescript-eslint/no-explicit-any */
import { publicNavLinks } from "~/data/navlinks";
import FrostedNavbar from "~/components/ui/frosted-topnav";
import {
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import {
  FacebookAnimated,
  InstagramAnimated,
  TwitterAnimated,
  YoutubeAnimated,
} from "~/components/icons/social-media";
import TextInput from "~/components/inputs/text-input";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Preloader from "~/components/ui/preloader";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { commitFlashSession, getFlashSession } from "~/flash-session";
import axios from "axios";
import { commitUserSession, getUserSession } from "~/user-session";

export default function PublicLayout() {
  // retrieve token from loader
  const { token, user } = useLoaderData<typeof loader>();

  const [scrolled, setScrolled] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <main className="dark:bg-slate-950 relative min-h-screen">
      <FrostedNavbar token={token} user={user} />

      <section
        className={`${
          scrolled ? "" : "pt-20"
        } max-w-6xl xl:max-w-[100rem] mx-auto`}
      >
        <Outlet />
      </section>

      <footer className="">
        <div className="max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div>
            <img
              src="https://lumen-advisory.com/wp-content/uploads/2024/07/Asset-19-2048x394.png"
              alt="logo"
              className="w-32 h-auto dark:bg-white px-2 py-1"
            />
            <p className="font-quicksand">
              Lumen Advisory is your trusted partner in the world of real
              estate. With a passion for connecting people with their dream
              homes and a commitment to exceptional customer service, we strive
              to make every transaction a seamless and successful experience.
            </p>
          </div>

          {/* links */}
          <div className="flex flex-col gap-4 items-center">
            <h2 className="font-montserrat font-semibold text-xl">
              Useful Links
            </h2>
            <div className="flex flex-col gap-2">
              {publicNavLinks.map((link, index) => (
                <NavLink
                  to={link.path}
                  end={true}
                  key={index}
                  className={({ isActive }) =>
                    `${isActive ? "text-yellow-700" : ""} font-nunito`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* social media icons */}
          <div className="flex flex-col gap-4">
            <h2 className="font-montserrat font-semibold text-xl">
              Social Media
            </h2>
            <div className="flex gap-4 items-center">
              <FacebookAnimated className="size-8" />
              <TwitterAnimated className="size-8" />
              <InstagramAnimated className="size-8" />
              <YoutubeAnimated className="size-10" />
            </div>
          </div>

          {/* newsletter */}
          <div className="xl:flex flex-col gap-4 hidden">
            <h2 className="font-montserrat font-semibold text-xl">
              Subscribe to Our Newsletter
            </h2>

            <div className="flex items-center gap-3">
              <TextInput color="warning" />
              <Button color="warning" variant="flat">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {navigation.state === "loading" && <Preloader />}
    </main>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  console.log(pathname);

  // sessions
  const userAuthSession = await getUserSession(request.headers.get("Cookie"));
  const flashSession = await getFlashSession(request.headers.get("Cookie"));

  // get form data values
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData.entries());

  // make post request
  try {
    let response;
    if (formValues.intent === "register") {
      response = await axios.post(
        `${process.env.BACKEND_API_BASE_URL}/${formValues.role}/register`,
        formValues
      );
    } else {
      response = await axios.post(
        `${process.env.BACKEND_API_BASE_URL}/${formValues.role}/login`,
        {
          email: formValues.email,
          password: formValues.password,
        }
      );
    }

    if (response.data.code === 200 && formValues.role === "users") {
      userAuthSession.set("token", response.data.data.token);
      userAuthSession.set("authenticatedUser", response.data.data.user);
    }

    flashSession.set("alert", response.data);

    const headers = new Headers();
    headers.append("Set-Cookie", await commitFlashSession(flashSession));
    headers.append("Set-Cookie", await commitUserSession(userAuthSession));

    return redirect(pathname, {
      headers,
    });
  } catch (error: any) {
    console.error(error);
    flashSession.set("alert", {
      code: 401,
      status: "error",
      message: "An unexpected error occurred!. " + error.message,
    });
    return json(null, {
      headers: {
        "Set-Cookie": await commitFlashSession(flashSession),
      },
    });
  }

  return null;
};

export const loader: LoaderFunction = async ({ request }) => {
  // sessions
  const userAuthSession = await getUserSession(request.headers.get("Cookie"));
  const userToken = userAuthSession.get("token");
  const authUser = userAuthSession.get("authenticatedUser");

  return {
    token: userToken,
    user: authUser,
  };
};
