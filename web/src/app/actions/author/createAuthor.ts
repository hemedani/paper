"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const createAuthor = async (first_name: string, last_name: string) => {
  const token = (await cookies()).get("token");
  const addAuthor = await paperApi().send(
    {
      service: "main",
      model: "author",
      act: "add",
      details: {
        set: {
          first_name,
          last_name,
        },
        get: {
          first_name: 1,
          last_name: 1,
        },
      },
    },
    { token: token?.value }
  );

  if (addAuthor.success) return addAuthor.body;
};
