"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const EditKeyword = async (_id: string, name: string) => {
  const token = (await cookies()).get("token");
  const updateKeyword = await paperApi().send(
    {
      service: "main",
      model: "keyword",
      act: "updateKeyword",
      details: {
        set: {
          _id,
          name,
        },
        get: {
          name: 1,
        },
      },
    },
    { token: token?.value }
  );

  if (updateKeyword.success) return updateKeyword.body;
};
