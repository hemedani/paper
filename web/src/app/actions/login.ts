"use server";

import { cookies } from "next/headers";
import { paperApi } from "@/services/api";

const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

export const loginAction = async ({
  national_number,
  code,
}: {
  national_number: string;
  code: string;
}) => {
  const result = await paperApi().send({
    service: "main",
    model: "user",
    act: "login",
    details: {
      set: {
        national_number,
        code,
      },
      get: {
        token: 1,
        user: {
          _id: 1,
          first_name: 1,
          last_name: 1,
          mobile: 1,
          national_number: 1,
          personnel_number: 1,
          level: 1
        },
      },
    },
  });

  if (result.success) {
    // Session cookies must be written by the server. A client-side
    // document.cookie write cannot replace an existing HttpOnly token (Firefox
    // ignores it), which used to leave a stale token from another localhost app
    // shadowing the fresh one and made /admin bounce to /login.
    //
    // The token stays readable by JS because EditUserRelations passes it to the
    // client-side upload widget. A server response still replaces the stale
    // HttpOnly cookie, which is the part that was broken.
    const jar = await cookies();
    const { token, user } = result.body;

    jar.set("token", token, {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
    });
    jar.set("national_number", user.national_number, {
      path: "/",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
    });
    jar.set(
      "user",
      JSON.stringify({ ...user, level: user.level || "Normal" }),
      {
        path: "/",
        sameSite: "lax",
        maxAge: SESSION_MAX_AGE,
      }
    );
    jar.set("registration_step", "", { path: "/", maxAge: 0 });
  }

  return result;
};
