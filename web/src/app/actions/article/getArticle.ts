"use server";

import { paperApi } from "@/services/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getArticleAction = async (_id: string) => {
  console.log(_id);

  const getArticle = await paperApi().send({
    service: "main",
    model: "article",
    act: "getArticle",
    details: {
      set: {
        _id,
      },

      get: {
        _id: 1,
        key: 1,
        registrar: { _id: 1, last_name: 1, registerArticles: { title: 1 } },
        publication: { title: 1 },
        tags: { name: 1 },
        articleType: 1,
        publicationYear: 1,
        authors: 1,
        title: 1,
        abstract: 1,
        ISBN: 1,
        ISNN: 1,
        DOI: 1,
        URL: 1,
        page: 1,
        issue: 1,
        volume: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  });
  const article = getArticle.body[0]
  
  if (getArticle.success) {
    return article
  } else {
  }
};
