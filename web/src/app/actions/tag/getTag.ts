"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const getTag = async (_id: string) => {
  const token = (await cookies()).get("token");
  const getTag = await paperApi().send(
    {
      service: "main",
      model: "tag",
      act: "getTag",
      details: {
        set: {
          _id,
        },
        get: {
          _id:1,
          name: 1,
        },
      },
    },
    { token }
  );

  if (getTag.success) return getTag.body;
};
