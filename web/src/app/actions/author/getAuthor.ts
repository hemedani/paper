"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const getAuthor = async (_id: string) => {
  const token = (await cookies()).get("token");
  const getAuthor = await paperApi().send(
    {
      service: "main",
      model: "author",
      act: "get",
      details: {
        set: {
          _id,
        },
        get: {
          _id: 1,
          first_name: 1,
          last_name: 1,
        },
      },
    },
    { token }
  );

  if (getAuthor.success) return getAuthor.body;
};
