"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const getTags = async ({
  set,
  get,
}: ReqType["main"]["tag"]["getTags"]) => {
  const token = (await cookies()).get("token");

  const getTags = await paperApi().send(
    {
      service: "main",
      model: "tag",
      act: "getTags",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );

  if (getTags.success) return getTags.body;
};
