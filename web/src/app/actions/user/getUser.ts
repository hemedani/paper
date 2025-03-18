"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const getUser = async (_id: string) => {
  const token = (await cookies()).get("token");
  return await paperApi().send(
    {
      service: "main",
      model: "user",
      act: "getUser",
      details: {
        set: {
          _id,
        },
        get: {
          updatedAt: 0
        },
      },
    },
    { token: token?.value }
  );
};
