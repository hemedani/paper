"use server";

import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const getBlogById = async ({ set, get, }: ReqType["main"]["blog"]["get"]) => {
  const token = (await cookies()).get("token");
  return await paperApi().send(
    {
      service: "main",
      model: "blog",
      act: "get",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );
}
