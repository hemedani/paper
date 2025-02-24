"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const deleteAuthor = async (authorId: string, hardCascade: boolean) => {
  const token = (await cookies()).get("token");
  const removeAuthor = await paperApi().send(
    {
      service: "main",
      model: "author",
      act: "remove",
      details: {
        set: { _id: authorId, hardCascade: hardCascade },
        get: { success: 1 },
      },
    },
    { token: token?.value }
  );

  if (removeAuthor.body) {
    return removeAuthor.body;
  }
};
