"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export type AddUserSet = ReqType["main"]["user"]["addUser"]["set"];

export const createUser = async (data: AddUserSet) => {
  console.log(data);
  
  const token = (await cookies()).get("token");
  const addUser = await paperApi().send(
    {
      service: "main",
      model: "user",
      act: "addUser",
      details: {
        set: {
          ...data,
        },
        get: {
          _id: 1,
          first_name: 1,
        },
      },
    },
    { token: token?.value }
  );
  console.log("addUser body",addUser.body);
  console.log("addUser",addUser);
  

  if (addUser.success) return addUser.body;
};
