"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const getArticles = async (name?: string, currentPage?: number, abstract?: string) => {
  const token = (await cookies()).get("token");
  const getArticles = await paperApi().send(
    {
      service: "main",
      model: "article",
      act: "getArticles",
      details: {
        set: {
          page: currentPage ? +currentPage : 1,
          limit: 21,
          search: name ? name : "",
          abstract: abstract ? abstract : "",
        },
        get: {
          _id: 1,
          title: 1,
          articleType: 1,
          authors: 1,
          abstract: 1,
          tags: {
            name: 1,
          },
          registrar: {
            first_name: 1,
            last_name:1,
          },
          publication: {
            title:1
          }
        },
      },
    },
    { token: token?.value }
  );

  if (getArticles.success) return getArticles.body;
};
