"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const getFile = async ({
  set,
  get,
}: ReqType["main"]["file"]["getFiles"]) => {
  const token = (await cookies()).get("token");
  const getFile = await paperApi().send(
    {
      service: "main",
      model: "file",
      act: "getFiles",
      details: {
        set: set,
        get: get,
      },
    },
    { token: token?.value }
  );

  if (getFile.success) return getFile.body;
};
