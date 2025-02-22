"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const getKeywords = async ({
  set,
  get,
}: ReqType["main"]["keyword"]["getKeywords"]) => {
  const token = (await cookies()).get("token");

  const getKeywords = await paperApi().send(
    {
      service: "main",
      model: "keyword",
      act: "getKeywords",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );

  if (getKeywords.success) return getKeywords.body;
};
