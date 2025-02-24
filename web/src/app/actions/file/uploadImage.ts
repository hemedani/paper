"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const UploadImage = async ({
  set,
  get,
}: ReqType["main"]["file"]["uploadImage"]) => {
  const token = (await cookies()).get("token");
  const addedFile = await paperApi().send(
    {
      service: "main",
      model: "file",
      act: "uploadImage",
      details: {
        set: set,
        get: get,
      },
    },
    { token: token?.value }
  );

  if (addedFile.success) return addedFile.body;
};
