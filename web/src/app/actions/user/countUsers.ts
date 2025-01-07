"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const CountUsers = async () => {
  const token = (await cookies()).get("token");
  const countUsers = await paperApi().send(
    {
      service: "main",
      model: "user",
      act: "countUsers",
      details: {
        set: {},
        get: { qty: 1 },
      },
    },
    { token: token?.value }
  );

  if (countUsers.success) return countUsers.body;
};
