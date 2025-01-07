"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const CountPublications = async ({
  get,
  set,
}: ReqType["main"]["publication"]["countPublications"]) => {
  const token = (await cookies()).get("token");
  const countPublications = await paperApi().send(
    {
      service: "main",
      model: "publication",
      act: "countPublications",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );
  console.log(countPublications);
  

  if (countPublications.success) return countPublications.body;
};
