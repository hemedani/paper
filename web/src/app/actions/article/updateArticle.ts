"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";
import { ArticleFormUpdateSchemaType } from "@/components/template/FormUpdateArticle";

export const EditArticle = async (data: ArticleFormUpdateSchemaType) => {
  const token = (await cookies()).get("token");
  const updateArticle = await paperApi().send(
    {
      service: "main",
      model: "article",
      act: "updateArticle",
      details: {
        set: {
          articleId: data.articleId,
          abstract: data.abstract,
          articleType: data.articleType,
          authors: data.authors,
          DOI: data.DOI,
          ISBN: data.ISBN,
          ISNN: data.ISNN,
          issue: data.issue,
          publicationYear: data.publicationYear,
          key: data.key,
          title: data.title,
          URL: data.URL,
          page: data.page,
          volume: data.volume,
        },
        get: {
          _id: 1,
          title: 1,
          articleType: 1,
        },
      },
    },
    { token: token?.value }
  );

  if (updateArticle.success) return updateArticle.body;
};
