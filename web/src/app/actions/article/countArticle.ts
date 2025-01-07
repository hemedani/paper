"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const getCountArticles = async ({ set, get }: ReqType["main"]["article"]["countArticles"]) => {
  const token = (await cookies()).get("token");
  const getCountArticles = await paperApi().send(
    {
      service: "main",
      model: "article",
      act: "countArticles",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );

  if (getCountArticles.success) return getCountArticles.body;
};
