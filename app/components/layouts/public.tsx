import { publicNavLinks } from "~/data/navlinks";
import FrostedNavbar from "../ui/frosted-topnav";
import { NavLink } from "@remix-run/react";
import {
  FacebookAnimated,
  InstagramAnimated,
  TwitterAnimated,
  YoutubeAnimated,
} from "../icons/social-media";
import TextInput from "../inputs/text-input";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);

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
    <main className="dark:bg-slate-950">
      <FrostedNavbar />

      <section
        className={`${
          scrolled ? "" : "pt-20"
        } max-w-6xl xl:max-w-[100rem] mx-auto`}
      >
        {children}
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
    </main>
  );
}
