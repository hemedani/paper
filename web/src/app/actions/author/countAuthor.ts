"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const CountAuthor = async ({
  set,
  get,
}: ReqType["main"]["author"]["count"]) => {
  const token = (await cookies()).get("token");
  const countAuthor = await paperApi().send(
    {
      service: "main",
      model: "author",
      act: "count",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );

  if (countAuthor.success) return countAuthor.body;
};
