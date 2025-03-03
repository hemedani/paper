"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const updateRelationUser = async ({
  set,
  get,
}: ReqType["main"]["user"]["updateUserRelations"]) => {
  const token = (await cookies()).get("token");
  console.log({ set, get });

  const updateUser = await paperApi().send(
    {
      service: "main",
      model: "user",
      act: "updateUserRelations",
      details: {
        set,
        get,
      },
    },
    { token: token?.value }
  );

  console.log(updateUser);

  if (updateUser.success) return updateUser.body;
};
