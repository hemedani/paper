"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const getArticles = async ({ set, get }: ReqType["main"]["article"]["getArticles"]) => {
  const token = (await cookies()).get("token");
  const getArticles = await paperApi().send(
    {
      service: "main",
      model: "article",
      act: "getArticles",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );

  if (getArticles.success) return getArticles.body;
};
