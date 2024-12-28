"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";


export const getTags = async (name: string, currentPage:number) => {
  const token = (await cookies()).get("token");

  const getTags = await paperApi().send(
    {
      service: "main",
      model: "tag",
      act: "getTags",
      details: {
        set: {
          page: currentPage ? currentPage : 1,
          limit: 21,
          name: name ? name : "",
        },
        get: {
          name: 1,
        },
      },
    },
    { token: token?.value }
  );  
  console.log(getTags);
  

  if (getTags.success) return getTags.body;
};
