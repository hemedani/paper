"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const EditAuthor = async (
  _id: string,
  first_name: string,
  last_name: string
) => {
  const token = (await cookies()).get("token");
  const updateAuthor = await paperApi().send(
    {
      service: "main",
      model: "author",
      act: "update",
      details: {
        set: {
          _id,
          first_name,
          last_name,
        },
        get: {
          _id: 1,
          first_name: 1,
          last_name: 1,
        },
      },
    },
    { token: token?.value }
  );

  if (updateAuthor.success) return updateAuthor.body;
};
