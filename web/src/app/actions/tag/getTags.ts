"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";


export const getTags = async (name: string) => {
  const token = (await cookies()).get("token");

  const getTags = await paperApi().send(
    {
      service: "main",
      model: "tag",
      act: "getTags",
      details: {
        set: {
          page: 1,
          limit: 21,
          name: name ? name : "",
        },
        get: {
          name: 1,
        },
      },
    },
    { token: token?.value }
  );  

  if (getTags.success) return getTags.body;
};
