"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const getTags = async (name: string) => {
  const token = (await cookies()).get("token");
  const getTags = await paperApi().send(
    {
      service: "main",
      model: "tag",
      act: "getTags",
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

  if (getTags.success) return getTags.body;
};
