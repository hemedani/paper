"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const createBlog = async ({ set, get }: ReqType["main"]["blog"]["add"]) => {
  const token = (await cookies()).get("token");
  const addBlog = await paperApi().send(
    {
      service: "main",
      model: "blog",
      act: "add",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );

  if (addBlog.success) return addBlog.body;
};
