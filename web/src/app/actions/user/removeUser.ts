"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const deleteUser = async (userId: string) => {
  const token = (await cookies()).get("token");
  const removeUser = await paperApi().send(
    {
      service: "main",
      model: "user",
      act: "removeUser",
      details: {
        set: { _id: userId },
        get: { success: 1 },
      },
    },
    { token: token?.value }
  );

  if (removeUser.body) {
    return removeUser.body;
  }
};
