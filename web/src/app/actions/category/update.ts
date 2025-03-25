"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const update = async (_id: string, name: string) => {
  const token = (await cookies()).get("token");
  return await paperApi().send(
    {
      service: "main",
      model: "category",
      act: "update",
      details: {
        set: {
          _id,
          name,
        },
        get: {
          name: 1,
        },
      },
    },
    { token: token?.value }
  );
};
