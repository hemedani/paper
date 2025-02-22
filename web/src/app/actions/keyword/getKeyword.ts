"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const getTag = async (_id: string) => {
  const token = (await cookies()).get("token");
  const getKeywords = await paperApi().send(
    {
      service: "main",
      model: "keyword",
      act: "getKeyword",
      details: {
        set: {
          _id,
        },
        get: {
          _id: 1,
          name: 1,
        },
      },
    },
    { token }
  );

  if (getKeywords.success) return getKeywords.body;
};
