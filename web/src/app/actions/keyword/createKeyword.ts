"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const createKeyword = async (name: string) => {
  const token = (await cookies()).get("token");
  const createKeyword = await paperApi().send(
    {
      service: "main",
      model: "keyword",
      act: "addKeyword",
      details: {
        set: {
          name,
        },
        get: {
          _id: 1,
          name: 1,
        },
      },
    },
    { token: token?.value }
  );

  if (createKeyword.success) return createKeyword.body;
};
