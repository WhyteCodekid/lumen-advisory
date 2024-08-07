import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the same CookieOptions to create one
    cookie: {
      name: "user_auth",
      secure: process.env.NODE_ENV === "production",
      secrets: ["r3m1xr0ck$ecr3t"],
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    },
  });

const getUserSession = getSession;
const commitUserSession = commitSession;
const destroyUserSession = destroySession;

export { getUserSession, commitUserSession, destroyUserSession };
