"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";
import { ArticleFormCreateSchemaType } from "@/components/template/FormCreateArticle";

export const createArticle = async (data: ArticleFormCreateSchemaType) => {
  console.log({ data });

  const token = (await cookies()).get("token");
  const addArticle = await paperApi().send(
    {
      service: "main",
      model: "article",
      act: "addArticle",
      details: {
        set: {
          ...data,
        },
        get: {
          _id: 1,
          title: 1,
        },
      },
    },
    { token: token?.value }
  );

  if (addArticle.success) return addArticle.body;
};
