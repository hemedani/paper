"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const deleteArticle = async (
  articleId: string,
  hardCascade: boolean = false
) => {
  const token = (await cookies()).get("token");
  const removeArticle = await paperApi().send(
    {
      service: "main",
      model: "article",
      act: "removeArticle",
      details: {
        set: { _id: articleId, hardCascade: hardCascade },
        get: { success: 1 },
      },
    },
    { token: token?.value }
  );

  if (removeArticle.body) {
    return removeArticle.body;
  }
};
