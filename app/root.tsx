import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
// import { useState, useEffect } from "react";
// import { io, Socket } from "socket.io-client";

// import { SocketProvider } from "~/context";

import styles from "~/tailwind.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  // const [socket, setSocket] = useState<Socket>();

  // useEffect(() => {
  //   const socket = io("http://192.168.43.127:5173");
  //   setSocket(socket);
  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!socket) return;
  //   socket.on("confirmation", (data) => {
  //     console.log(data);
  //   });
  // }, [socket]);

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
            {/* <SocketProvider socket={socket}> */}
            <Outlet />
            {/* </SocketProvider> */}
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
