"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const createTag = async (name: string) => {
  const token = (await cookies()).get("token");
  const addTag = await paperApi().send(
    {
      service: "main",
      model: "tag",
      act: "addTag",
      details: {
        set: {
          name,
        },
        get: {
          name: 1,
        },
      },
    },
    { token }
  );

  if (addTag.success) return addTag.body;
};
