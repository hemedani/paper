"use server";

import { cookies } from "next/headers";
import { BlogRelationsSchemaType } from "@/components/organisms/NewBlogRelation";
import { ReqType } from "@/types/declarations/selectInp";

export async function AddBlogRelations(
  data: BlogRelationsSchemaType,
  blogId: string
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value || "";
    const lesanUrl = process.env.LESAN_URL || "http://localhost:1382";

    const res = await fetch(`${lesanUrl}/lesan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        service: "MAIN",
        model: "blog",
        action: "addRelations",
        set: {
          _id: blogId,
          ...data,
        },
        get: { _id: 1 },
      } as ReqType["main"]["blog"]["addRelations"]),
    });

    const result = await res.json();
    return result?.data;
  } catch (error) {
    console.error("Error adding blog relations:", error);
    return null;
  }
}
