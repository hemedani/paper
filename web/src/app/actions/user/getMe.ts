"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const getMe = async () => {
  const token = (await cookies()).get("token");
  const getMe = await paperApi().send(
    {
      service: "main",
      model: "user",
      act: "getMe",
      details: {
        set: {},
        get: {
          _id: 1,
          first_name: 1,
        },
      },
    },
    { token }
  );

  if (getMe.success) return getMe.body;
};
