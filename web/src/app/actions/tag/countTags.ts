"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const CountTags = async ({set,get}: ReqType["main"]["tag"]["countTags"]) => {
  const token = (await cookies()).get("token");
  const countTags = await paperApi().send(
    {
      service: "main",
      model: "tag",
      act: "countTags",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );
  

  if(countTags.success) return countTags.body
};
