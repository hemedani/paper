"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const create = async (name: string) => {
  const token = (await cookies()).get("token");
  return await paperApi().send(
    {
      service: "main",
      model: "category",
      act: "add",
      details: {
        set: {
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
