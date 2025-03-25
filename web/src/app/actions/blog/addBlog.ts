"use server";

import { cookies } from "next/headers";
import { ReqType } from "@/types/declarations/selectInp";
import { paperApi } from "@/services/api";

export async function addBlog(set: ReqType["main"]["blog"]["add"]["set"]) {
  const token = (await cookies()).get("token");
  return await paperApi().send(
    {
      service: "main",
      model: "blog",
      act: "add",
      details: {
        set,
        get: {
          _id: 1,
        },
      },
    },
    { token: token?.value }
  );
}
