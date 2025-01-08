"use server";

import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const getArticleAction = async ({
  set,
  get,
}: ReqType["main"]["article"]["getArticle"]) => {
  const token = (await cookies()).get("token");
  
  const getArticle = await paperApi().send(
    {
      service: "main",
      model: "article",
      act: "getArticle",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );
  const article = getArticle.body[0];
  
  if (getArticle.success) {
    return article;
  } else {
  }
};
