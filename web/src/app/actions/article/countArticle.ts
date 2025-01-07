"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

type TArticle = {
  search?: string;
  title?: string;
  abstract?: string;
  tag?: string;
  publication?: string;
  authors?: string;
  DOI?: string;
  ISBN?: string;
  ISNN?: string;
};

export const getCountArticles = async ({
  search,
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
  const getCountArticles = await paperApi().send(
    {
      service: "main",
      model: "article",
      act: "countArticles",
      details: {
        set: {
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
          qty: 1,
        },
      },
    },
    { token: token?.value }
  );

  if (getCountArticles.success) return getCountArticles.body;
};
