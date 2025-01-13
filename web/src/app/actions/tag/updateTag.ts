"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const EditTag = async (_id: string, name: string) => {
  const token = (await cookies()).get("token");
  const updateTag = await paperApi().send(
    {
      service: "main",
      model: "tag",
      act: "updateTag",
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


  if (updateTag.success) return updateTag.body;
};
