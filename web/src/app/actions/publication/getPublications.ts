"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const getPublications = async (title: string) => {
  const token = (await cookies()).get("token");
  const getPublications = await paperApi().send(
    {
      service: "main",
      model: "publication",
      act: "getPublications",
      details: {
        set: {
          page: 1,
          limit: 10,
          title,
        },
        get: {
          title: 1,
        },
      },
    },
    { token }
  );

  if (getPublications.success) return getPublications.body;
};
