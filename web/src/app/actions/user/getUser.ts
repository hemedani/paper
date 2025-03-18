"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const getUser = async (_id: string) => {
  const token = (await cookies()).get("token");
  return await paperApi().send(
    {
      service: "main",
      model: "user",
      act: "getUser",
      details: {
        set: {
          _id,
        },
        get: {
          _id: 1,
          first_name: 1,
          address: 1,
          birth_date: 1,
          father_name: 1,
          gender: 1,
          last_name: 1,
          mobile: 1,
          national_number: 1,
          personnel_number: 1,
          level: 1,
          avatar: { _id: 1, name: 1 },
          nationalCard: { _id: 1, name: 1 },
        },
      },
    },
    { token: token?.value }
  );
};
