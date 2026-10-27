import { DeepPartial, ReqType } from "@/types/declarations/selectInp";
import { GetArticleSetParams, populateSetSearch } from "./populateSetSearch";
import { getArticles } from "@/app/actions/article/getArticles";
import { getTags } from "@/app/actions/tag/getTags";
import { getKeywords } from "@/app/actions/keyword/getKeywords";
import { getAuthors } from "@/app/actions/author/getAuthors";

export type DefaultSearchArrayValues = { tags: []; authors: []; keywords: [] };

export const prepareArticleSearch = async (searchParams: GetArticleSetParams) => {

  const setSearch: DeepPartial<GetArticleSetParams> = populateSetSearch(searchParams);
  const defaultSearchArrayValues: DefaultSearchArrayValues = {
    tags: [],
    authors: [],
    keywords: [],
  };

  const set: ReqType["main"]["article"]["getArticles"]["set"] = {
    page: +searchParams.page || 1,
    limit: +searchParams.limit || 9,
    ...setSearch,
  };

  const articles = await getArticles({
    set,
    get: {
      _id: 1,
      title: 1,
      articleType: 1,
      abstract: 1,
      tags: {
        _id: 1,
        name: 1,
      },
      keywords: {
        _id: 1,
        name: 1,
      },
      authors: {
        _id: 1,
        first_name: 1,
        last_name: 1,
      },
      publication: {
        _id: 1,
        title: 1
      }
    },
  });

  if (setSearch?.tagIds) {
    const response = await getTags({
      set: { tagIds: setSearch.tagIds, page: 1, limit: 10 },
      get: { _id: 1, name: 1 },
    });
    if (response) {
      defaultSearchArrayValues.tags = response.map(
        ({ _id, name }: { _id: string; name: string }) => ({
          value: _id,
          label: name,
        })
      );
    }
  }

  if (setSearch?.keywordIds) {
    const response = await getKeywords({
      set: { keywordIds: setSearch.keywordIds, page: 1, limit: 10 },
      get: { _id: 1, name: 1 },
    });
    if (response) {
      defaultSearchArrayValues.keywords = response.map(
        ({ _id, name }: { _id: string; name: string }) => ({
          value: _id,
          label: name,
        })
      );
    }
  }

  if (setSearch?.authorIds) {
    const response = await getAuthors({
      set: { authorIds: setSearch.authorIds, page: 1, limit: 10 },
      get: { _id: 1, first_name: 1, last_name: 1 },
    });
    if (response) {
      defaultSearchArrayValues.authors = response.map(
        ({
          _id,
          first_name,
          last_name,
        }: {
          _id: string;
          first_name: string;
          last_name: string;
        }) => ({
          value: _id,
          label: `${first_name} ${last_name}`,
        })
      );
    }
  }

  return {
    setSearch,
    articles,
    defaultSearchArrayValues
  }
}
