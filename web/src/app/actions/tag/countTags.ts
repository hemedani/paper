"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const CountTags = async (name?: string) => {
  const token = (await cookies()).get("token");
  const countTags = await paperApi().send(
    {
      service: "main",
      model: "tag",
      act: "countTags",
      details: {
        set: { name: name ? name : "" },
        get: { qty: 1 },
      },
    },
    { token: token?.value }
  );

  if(countTags.success) return countTags.body
};
