"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const getLandingHighlights = async ({
  set,
  get,
}: ReqType["main"]["article"]["getLandingHighlights"]) => {
  const token = (await cookies()).get("token");

  const highlights = await paperApi().send(
    {
      service: "main",
      model: "article",
      act: "getLandingHighlights",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );

  if (highlights.success) return highlights.body;
};
