"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

type TArticle = {
  search?: string;
  page?: string;
  title?: string;
  abstract?: string;
  tag?: string;
  publication?: string;
  authors?: string;
  DOI?: string;
  ISBN?: string;
  ISNN?: string;
};

export const getArticles = async ({
  search,
  page,
  title,
  abstract,
  tag,
  publication,
  authors,
  DOI,
  ISBN,
  ISNN,

}: TArticle) => {
  const token = (await cookies()).get("token");
  const getArticles = await paperApi().send(
    {
      service: "main",
      model: "article",
      act: "getArticles",
      details: {
        set: {
          page: page ? +page : 1,
          limit: 21,
          search: search ? search : "",
          abstract: abstract ? abstract : "",
          tags: tag ? tag : "",
          publication: publication ? publication : "",
          authors: authors ? authors : "",
          title: title ? title : "",
          DOI: DOI ? DOI : "",
          ISBN: ISBN ? ISBN : "",
          ISNN: ISNN ? ISNN : "",
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
            last_name: 1,
          },
          publication: {
            title: 1,
          },
        },
      },
    },
    { token: token?.value }
  );

  if (getArticles.success) return getArticles.body;
};
