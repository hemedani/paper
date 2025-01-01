"use server"
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const deleteTag = async (tagId: string) => {
    const token = (await cookies()).get("token");
    const removeTag = paperApi().send({
    service: "main",
    model: "tag",
    act: "removeTag",
    details: {
      set: { _id: tagId },
      get: { success: 1 },
    },
  }, { token: token?.value });

  console.log("removeTag", removeTag);
  
};
