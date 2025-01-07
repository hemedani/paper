"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const getPublications = async ({
  get,
  set,
}: ReqType["main"]["publication"]["getPublications"]) => {
  const token = (await cookies()).get("token");
  const getPublications = await paperApi().send(
    {
      service: "main",
      model: "publication",
      act: "getPublications",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );

  if (getPublications.success) return getPublications.body;
};
