"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const getBlogs = async ({
  set,
  get,
}: ReqType["main"]["blog"]["gets"]) => {
  const token = (await cookies()).get("token");

  return await paperApi().send(
    {
      service: "main",
      model: "blog",
      act: "gets",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );
};
