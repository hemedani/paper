"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const deleteBlog = async (
  _id: string,
  hardCascade: boolean = false
) => {
  const token = (await cookies()).get("token");
  return await paperApi().send(
    {
      service: "main",
      model: "blog",
      act: "remove",
      details: {
        set: { _id, hardCascade },
        get: { success: 1 },
      },
    },
    { token: token?.value }
  );
};
