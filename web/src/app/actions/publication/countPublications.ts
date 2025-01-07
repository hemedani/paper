"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const CountPublications = async (title?: string) => {
  const token = (await cookies()).get("token");
  const countPublications = await paperApi().send(
    {
      service: "main",
      model: "publication",
      act: "countPublications",
      details: {
        set: { title: title ? title : "" },
        get: { qty: 1 },
      },
    },
    { token: token?.value }
  );

  if(countPublications.success) return countPublications.body
};
