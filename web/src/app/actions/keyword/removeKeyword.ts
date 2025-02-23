"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const deleteKeyword = async (tagId: string, hardCascade: boolean) => {
  const token = (await cookies()).get("token");
  const removeKeyword = await paperApi().send(
    {
      service: "main",
      model: "keyword",
      act: "removeKeyword",
      details: {
        set: { _id: tagId, hardCascade: hardCascade },
        get: { success: 1 },
      },
    },
    { token: token?.value }
  );

  if (removeKeyword.body) {
    return removeKeyword.body;
  }
};
