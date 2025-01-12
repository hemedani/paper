"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const EditArticle = async (data:ReqType["main"]["article"]["updateArticle"]["set"]) => {
  const token = (await cookies()).get("token");
  const updateArticle = await paperApi().send(
    {
      service: "main",
      model: "article",
      act: "updateArticle",
      details: {
        set: {
          ...data,
        },
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
