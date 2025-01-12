"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export type AddUserSet = ReqType["main"]["user"]["addUser"]["set"];

export const EditUser = async (userId:string,data: AddUserSet) => {
  
  const token = (await cookies()).get("token");
  const updateUser = await paperApi().send(
    {
      service: "main",
      model: "user",
      act: "updateUser",
      details: {
        set: {
          // ...data,
        },
        get: {
          _id: 1,
          first_name: 1,
        },
      },
    },
    { token: token?.value }
  );

  if (updateUser.success) return updateUser.body;
};
