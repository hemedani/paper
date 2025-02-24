"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const getAuthors = async ({
  set,
  get,
}: ReqType["main"]["author"]["gets"]) => {
  const token = (await cookies()).get("token");

  const getAuthors = await paperApi().send(
    {
      service: "main",
      model: "author",
      act: "gets",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );

  if (getAuthors.success) return getAuthors.body;
};
