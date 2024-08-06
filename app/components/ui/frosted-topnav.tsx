import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { NavLink } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { publicNavLinks } from "~/data/navlinks";
import ThemeSwitcher from "./theme-switcher";

export default function FrostedNavbar({ token }: { token?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [navIsOpen, setNavIsOpen] = useState(false);

  const mobileNavRef = useRef(null);

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
    <>
      <section
        className={`transition-[top] duration-400 rounded-2xl px-4 ${
          scrolled
            ? "bg-white/10 dark:bg-slate-800/30 z-40 sticky bg-opacity-70 backdrop-blur-md dark:backdrop-blur-lg border-b dark:border-white/10 mx-auto max-w-6xl xl:max-w-[100rem] top-1"
            : "top-0 fixed w-full"
        }`}
      >
        <div
          className={`${
            !scrolled ? "max-w-6xl xl:max-w-[100rem] mx-auto" : ""
          } flex items-center justify-between h-20`}
        >
          <div className="flex items-center">
            <img
              src="https://lumen-advisory.com/wp-content/uploads/2024/07/Asset-19-2048x394.png"
              alt="logo"
              className="w-32 md:w-40 h-auto dark:bg-white px-2 py-2 rounded-lg"
            />
          </div>

          <div className="flex-1 md:flex items-center justify-center gap-10 hidden">
            {publicNavLinks.map((item, index) => (
              <NavLink
                end
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-yellow-700 font-semibold" : "font-medium"
                  } font-montserrat transition-all duration-300`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* icons */}
          <div className="flex justify-end">
            <Button
              isIconOnly
              variant="light"
              className="block md:hidden"
              onClick={() => setNavIsOpen(!navIsOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="size-8"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 17h8m-8-5h14M5 7h8"
                ></path>
              </svg>
            </Button>

            <div className="md:flex items-center gap-2 hidden">
              <ThemeSwitcher />

              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    size="sm"
                    as="button"
                    className="transition-transform"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  {!token ? (
                    <DropdownSection>
                      <DropdownItem key="login">Sign In</DropdownItem>
                      <DropdownItem key="register">
                        Create an Account
                      </DropdownItem>
                    </DropdownSection>
                  ) : (
                    <DropdownSection>
                      <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">zoey@example.com</p>
                      </DropdownItem>
                      <DropdownItem key="settings">My Settings</DropdownItem>
                      <DropdownItem key="team_settings">
                        Team Settings
                      </DropdownItem>
                      <DropdownItem key="analytics">Analytics</DropdownItem>
                      <DropdownItem key="configurations">Log Out</DropdownItem>
                    </DropdownSection>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </section>
      {/* mobile nav */}
      <aside
        ref={mobileNavRef}
        className={`w-[80vw] z-[60] bg-white/20 backdrop-blur-xl dark:bg-slate-800/60 fixed top-0 ${
          navIsOpen ? "left-0" : "-left-[100vw]"
        } transition-all duration-400 h-screen md:hidden flex flex-col gap-16 py-3 px-4`}
      >
        <div className="flex justify-center items-center bg-slate-800/60 px-5 py-4 rounded-3xl">
          {/* <img src={logo} alt="logo" className="w-[80%]" /> */}
        </div>

        <div className="flex flex-col gap-6">
          {/* {navLinks.map((link) => (
            <Link
              to={link.path}
              className={`font-nunito ${
                pathname === link.path ? "text-red-500" : ""
              }`}
            >
              {link.label}
            </Link>
          ))} */}
        </div>

        <div className="flex items-center gap-2">
          {/* <FacebookIcon className="size-5" />
          <LinkedInIcon className="size-5" />
          <TwitterXIcon className="size-5 mr-1" />
          <ThemeSwitcher /> */}
        </div>
      </aside>
    </>
  );
}
