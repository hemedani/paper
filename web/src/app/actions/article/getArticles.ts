"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const getArticles = async () => {
  const token = (await cookies()).get("token");
  const getArticles = await paperApi().send({
    service: "main",
    model: "article",
    act: "getArticles",
    details: {
      set: { page: 1, limit: 15 },
      get: {
        _id: 1,
        title: 1,
        authors: 1,
        abstract: 1,
      },
    },
  });

  if (getArticles.success) return getArticles.body;
};
