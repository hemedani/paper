"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const getBlog = async ({ set, get }: ReqType["main"]["blog"]["get"]) => {
  const token = (await cookies()).get("token");
  const getBlog = await paperApi().send(
    {
      service: "main",
      model: "blog",
      act: "get",
      details: {
        set,
        get,
      },
    },
    { token }
  );

  if (getBlog.success) return getBlog.body;
};
