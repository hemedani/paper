"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const getArticles = async ({
  set,
  get,
}: ReqType["main"]["article"]["getArticles"]) => {
  const token = (await cookies()).get("token");
  if (!set.tags?.length) delete set.tags;
  if (!set.authorIds?.length) delete set.authorIds;
  if (!set.keywords?.length) delete set.keywords;
  set.tags = set.tags?.toString().split(",");
  set.authorIds = set.authorIds?.toString().split(",");
  set.keywords = set.keywords?.toString().split(",");

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
