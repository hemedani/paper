"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const getUser = async (_id: string) => {
  const token = (await cookies()).get("token");
  const getUser = await paperApi().send(
    {
      service: "main",
      model: "user",
      act: "getUser",
      details: {
        set: {
          _id,
        },
        get: {
          _id:1,
          first_name: 1,
        },
      },
    },
    { token }
  );

  if (getUser.success) return getUser.body;
};
