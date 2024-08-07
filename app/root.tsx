import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
// import { Toaster, toast } from "sonner";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { getFlashSession } from "~/flash-session";

import { SocketProvider } from "~/context";

import styles from "~/tailwind.css";
import { errorToast, successToast } from "./components/ui/toasters";
// import { errorToast, successToast } from "./components/ui/toasters";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  const loaderData = useLoaderData<typeof loader>();
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socket = io("https://lumen.printmoney.money");
    setSocket(socket);
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("confirmation", (data) => {
      console.log(data);
    });
  }, [socket]);

  // display notification toasts
  useEffect(() => {
    if (loaderData) {
      if (!loaderData?.errors && loaderData?.code === 200) {
        successToast("Success", loaderData.message);
      } else {
        errorToast("Error", loaderData.message);
      }
    }
  }, [loaderData]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <SocketProvider socket={socket}>
              <Toaster position="bottom-right" />
              <Outlet />
            </SocketProvider>
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const flashSession = await getFlashSession(request.headers.get("Cookie"));

  const alert = flashSession.get("alert");

  if (alert) {
    return alert;
  } else {
    return null;
  }
};
