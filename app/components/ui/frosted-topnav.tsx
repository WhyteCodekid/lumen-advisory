import {
  User,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { Form, NavLink, useLocation, useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { publicNavLinks } from "~/data/navlinks";
import ThemeSwitcher from "./theme-switcher";
import TextInput from "../inputs/text-input";
import PasswordInput from "../inputs/password";
import CustomSelect from "../inputs/select";
import { UserInterface } from "~/types";

export default function FrostedNavbar({
  token,
  user,
}: {
  token?: string;
  user?: UserInterface;
}) {
  const navigation = useNavigation();
  const { pathname } = useLocation();

  // nav handler
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

  // login/register modal stuff
  const loginDisclosure = useDisclosure();
  const registerDisclosure = useDisclosure();

  useEffect(() => {
    if (token) {
      loginDisclosure.onClose();
      registerDisclosure.onClose();
    }
  }, [token]);

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
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                      color: "warning",
                      size: "sm",
                    }}
                    className="transition-transform"
                    description={`${user?.email || ""}`}
                    name={`${user?.firstName || ""} ${user?.lastName || ""}`}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  {!token ? (
                    <DropdownSection aria-label="Unauthenticated Menu">
                      <DropdownItem
                        onPress={loginDisclosure.onOpen}
                        key="login"
                      >
                        Sign In
                      </DropdownItem>
                      <DropdownItem
                        onPress={registerDisclosure.onOpen}
                        key="register"
                      >
                        Create an Account
                      </DropdownItem>
                    </DropdownSection>
                  ) : (
                    <DropdownSection aria-label="Authenticated Menu">
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

      {/* login form */}
      <Modal
        backdrop={"blur"}
        isOpen={loginDisclosure.isOpen}
        onClose={loginDisclosure.onClose}
        className="dark:bg-slate-900 border-[1px] dark:border-slate-700/20 w-full md:w-1/2"
        placement="center"
        classNames={{
          base: "rounded-3xl pb-4",
        }}
        motionProps={{
          variants: {
            enter: {
              scale: [1, 0.9],
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              scale: [0.9, 1],
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onCloseModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-montserrat text-slate-700 dark:text-white text-xl font-semibold">
                Sign In To Your Account
              </ModalHeader>
              <ModalBody>
                <Form
                  method={"POST"}
                  id="login-form"
                  action={pathname}
                  className="flex flex-col gap-6"
                >
                  <TextInput
                    label="Intent"
                    name="intent"
                    value="login"
                    className="hidden"
                  />
                  <TextInput label="Email" name="email" isRequired={true} />
                  <PasswordInput
                    name="password"
                    label="Password"
                    isRequired={true}
                  />
                  <CustomSelect name="role" label="Role" isRequired={true}>
                    <SelectItem key={"agents"}>Agent/Realtor</SelectItem>
                    <SelectItem key={"users"}>Buyer</SelectItem>
                  </CustomSelect>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="font-montserrat font-medium w-full"
                  color="default"
                  variant="flat"
                  onPress={onCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={navigation.state === "submitting"}
                  className="font-montserrat font-medium w-full"
                  color={"warning"}
                  type="submit"
                  form="login-form"
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* register form */}
      <Modal
        backdrop={"blur"}
        isOpen={registerDisclosure.isOpen}
        onClose={registerDisclosure.onClose}
        className="dark:bg-slate-900 border-[1px] dark:border-slate-700/20 w-full md:w-1/2"
        placement="center"
        size="lg"
        classNames={{
          base: "rounded-3xl pb-4",
        }}
        motionProps={{
          variants: {
            enter: {
              scale: [1, 0.9],
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              scale: [0.9, 1],
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onCloseModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-montserrat text-slate-700 dark:text-white text-xl md:text-2xl font-semibold">
                Create A Free Account
              </ModalHeader>
              <ModalBody>
                <Form
                  method={"POST"}
                  id="register-form"
                  action={pathname}
                  className="flex flex-col gap-6"
                >
                  <TextInput
                    label="Intent"
                    name="intent"
                    value="register"
                    className="hidden"
                  />
                  <TextInput label="First Name" name="firstName" />
                  <TextInput label="Last Name" name="lastName" />
                  <TextInput label="Email" name="email" />
                  <TextInput label="Phone" name="phone" />
                  <PasswordInput name="password" label="Password" />
                  <CustomSelect name="role" label="Register As">
                    <SelectItem key={"agents"}>Agent/Realtor</SelectItem>
                    <SelectItem key={"users"}>Buyer</SelectItem>
                  </CustomSelect>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="font-montserrat font-medium w-full"
                  color="default"
                  variant="flat"
                  onPress={onCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={navigation.state === "submitting"}
                  className="font-montserrat font-medium w-full"
                  color={"warning"}
                  type="submit"
                  form="register-form"
                >
                  Register
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
