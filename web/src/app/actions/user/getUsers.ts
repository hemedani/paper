"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const getUsers = async (name: string, currentPage: number) => {
  const token = (await cookies()).get("token");
  const getUsers = await paperApi().send(
    {
      service: "main",
      model: "user",
      act: "getUsers",
      details: {
        set: { page: currentPage ? currentPage : 1, limit: 21 },
        get: {
          _id: 1,
          first_name: 1,
          last_name: 1,
          mobile: 1,
        },
      },
    },
    { token: token?.value }
  );

  if (getUsers.success) return getUsers.body;
};
