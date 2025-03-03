"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const CountBlog = async ({
  set,
  get,
}: ReqType["main"]["blog"]["count"]) => {
  const token = (await cookies()).get("token");
  const countBlog = await paperApi().send(
    {
      service: "main",
      model: "blog",
      act: "count",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );

  if (countBlog.success) return countBlog.body;
};
