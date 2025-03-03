"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const EditBlog = async ({
  set,
  get,
}: ReqType["main"]["blog"]["update"]) => {
  const token = (await cookies()).get("token");
  const updateBlog = await paperApi().send(
    {
      service: "main",
      model: "blog",
      act: "update",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );

  if (updateBlog.success) return updateBlog.body;
};
