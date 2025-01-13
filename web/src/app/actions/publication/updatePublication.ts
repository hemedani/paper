"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const EditPublication = async ({
  set,
  get,
}: ReqType["main"]["publication"]["updatePublication"]) => {

  const token = (await cookies()).get("token");
  const updatePublication = await paperApi().send(
    {
      service: "main",
      model: "publication",
      act: "updatePublication",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );



  if (updatePublication.success) return updatePublication.body;
};
