"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const getPublications = async (title: string, page: number) => {
  const token = (await cookies()).get("token");
  const getPublications = await paperApi().send(
    {
      service: "main",
      model: "publication",
      act: "getPublications",
      details: {
        set: {
          page: page ? page : 1,
          limit: 21,
          title: title ? title : "",
        },
        get: {
          title: 1,
        },
      },
    },
    { token : token?.value }
  );

  if (getPublications.success) return getPublications.body;
};
