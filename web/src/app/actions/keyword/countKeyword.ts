"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const CountKeyword = async ({
  set,
  get,
}: ReqType["main"]["keyword"]["countKeywords"]) => {
  const token = (await cookies()).get("token");
  const countKeyword = await paperApi().send(
    {
      service: "main",
      model: "keyword",
      act: "countKeywords",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );

  if (countKeyword.success) return countKeyword.body;
};
