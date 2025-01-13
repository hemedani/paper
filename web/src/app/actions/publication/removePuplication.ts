"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const deletePublication = async (
  publicationId: string,
  hardCascade: boolean
) => {
  const token = (await cookies()).get("token");
  const removePublication = await paperApi().send(
    {
      service: "main",
      model: "publication",
      act: "removePublication",
      details: {
        set: { _id: publicationId, hardCascade: hardCascade },
        get: { success: 1 },
      },
    },
    { token: token?.value }
  );

  return removePublication;
};
