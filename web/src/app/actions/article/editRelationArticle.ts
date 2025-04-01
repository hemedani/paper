"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const editArticleRelations = async (set: ReqType["main"]["article"]["updateArticleRelations"]["set"]) => {
  const token = (await cookies()).get("token");
  const updateArticle = await paperApi().send(
    {
      service: "main",
      model: "article",
      act: "updateArticleRelations",
      details: {
        set,
        get: {
          _id: 1,
          title: 1,
          articleType: 1,
        },
      },
    },
    { token: token?.value }
  );

  if (updateArticle.success) return updateArticle.body;
};
