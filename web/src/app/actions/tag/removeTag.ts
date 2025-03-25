"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const deleteTag = async (tagId: string, hardCascade: boolean) => {
  const token = (await cookies()).get("token");
  return await paperApi().send(
    {
      service: "main",
      model: "tag",
      act: "removeTag",
      details: {
        set: { _id: tagId, hardCascade: hardCascade },
        get: { success: 1 },
      },
    },
    { token: token?.value }
  );
};
