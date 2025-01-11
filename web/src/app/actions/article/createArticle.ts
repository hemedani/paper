"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export type AddArticleSet = ReqType["main"]["article"]["addArticle"]["set"];

export const createArticle = async (data: AddArticleSet) => {
  const token = (await cookies()).get("token");
  const addArticle = await paperApi().send(
    {
      service: "main",
      model: "article",
      act: "addArticle",
      details: {
        set: {
          ...data,
        },
        get: {
          _id: 1,
          title: 1,
        },
      },
    },
    { token: token?.value }
  );

  console.log(addArticle.body);
  


  if (addArticle.success) return addArticle.body;
};
