"use server";

import { cookies } from "next/headers";
import { ReqType } from "@/types/declarations/selectInp";
import { paperApi } from "@/services/api";

export async function editBlogRelations(set: ReqType["main"]["blog"]["updateRelation"]["set"]) {
  const token = (await cookies()).get("token");
  return await paperApi().send(
    {
      service: "main",
      model: "blog",
      act: "updateRelation",
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
