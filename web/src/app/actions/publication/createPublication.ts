"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const createPublication = async ({
  set,
  get,
}: {
  get: ReqType["main"]["publication"]["addPublication"]["get"];
  set: { title: string };
}) => {
  const token = (await cookies()).get("token");
  const addPublication = await paperApi().send(
    {
      service: "main",
      model: "publication",
      act: "addPublication",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );

  if (addPublication.success) return addPublication.body;
};
