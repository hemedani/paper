"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";
import { ReqType } from "@/types/declarations/selectInp";

export const EditArticle = async (set: ReqType["main"]["article"]["updateArticle"]["set"]) => {
  const token = (await cookies()).get("token");
  return await paperApi().send(
    {
      service: "main",
      model: "article",
      act: "updateArticle",
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
};
