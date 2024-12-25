"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const createPublication = async (title: string) => {
  const token = (await cookies()).get("token");
  const addPublication = await paperApi().send(
    {
      service: "main",
      model: "publication",
      act: "addPublication",
      details: {
        set: {
          title,
        },
        get: {
          title: 1,
        },
      },
    },
    { token }
  );

  if (addPublication.success) return addPublication.body;
};
