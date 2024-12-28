"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const createUser = async () => {
  const token = (await cookies()).get("token");
  const addUser = await paperApi().send(
    {
      service: "main",
      model: "user",
      act: "addUser",
      details: {
        set: {},
        get: {
          _id: 1,
          first_name: 1,
        },
      },
    },
    { token }
  );

  if (addUser.success) return addUser.body;
};
