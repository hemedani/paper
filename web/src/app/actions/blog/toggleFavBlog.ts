"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const toggleFavBlog = async ({ set, get }: ReqType["main"]["blog"]["toggleFav"]) => {
  const token = (await cookies()).get("token");
  return await paperApi().send({
    service: "main",
    model: "blog",
    act: "toggleFav",
    details: {
      set,
      get,
    },
  },
    { token: token?.value }
  );

};
