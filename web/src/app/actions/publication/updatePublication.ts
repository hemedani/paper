"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const EditPublication = async ({
  set,
  get,
}: ReqType["main"]["publication"]["updatePublication"]) => {
  console.log(set._id,set.title);

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

  console.log(updatePublication);
  console.log(updatePublication.body);


  if (updatePublication.success) return updatePublication.body;
};
