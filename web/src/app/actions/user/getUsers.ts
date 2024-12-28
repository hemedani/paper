"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const getUsers = async (_id: string) => {
  const token = (await cookies()).get("token");
  const getUsers = await paperApi().send(
    {
      service: "main",
      model: "user",
      act: "getMe",
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
    { token: token?.value }
  );

  if (getUsers.success) return getUsers.body;
};
