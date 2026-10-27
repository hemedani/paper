"use server";

import { cookies } from "next/headers";

const SESSION_COOKIES = [
  "token",
  "national_number",
  "user",
  "registration_step",
] as const;

/**
 * Delete the session cookies on the server.
 *
 * This has to run on the server: `document.cookie` cannot remove an HttpOnly
 * cookie, so a client-side logout would leave the token behind and the next
 * server render would still treat the visitor as signed in.
 */
export const clearSessionAction = async () => {
  const jar = await cookies();

  for (const name of SESSION_COOKIES) {
    jar.set(name, "", { path: "/", maxAge: 0 });
  }
};
