import { getArticles } from "@/app/actions/article/getArticles";
import GraphVisualization from "@/components/template/GraphVisualization";
import { Header } from "@/components/organisms/Header";
import { getMe } from "@/app/actions/user/getMe";
import { getTags } from "@/app/actions/tag/getTags";
import { getKeywords } from "@/app/actions/keyword/getKeywords";
import { getAuthors } from "@/app/actions/author/getAuthors";
import { DefaultSearchArrayValues } from "@/app/page";

export default async function GraphPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
    search?: string;
    title?: string;
    abstract?: string;
    publication?: string;
    DOI?: string;
    ISBN?: string;
    ISNN?: string;
    articleType?: string;
    publicationYear?: string;
    issue?: string;
    volume?: string;
    pageCount?: string;
    authorFamily?: string;
    authorIds?: string;
    keywords?: string;
    keywordIds?: string;
    tags?: string;
    tagIds?: string;
  };
}) {
  const { tagIds = "", keywordIds = "", authorIds = "" } = searchParams || {};

  const articles = await getArticles({
    set: { page: 1, limit: 20 },
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
        title: 1,
      },
    },
  });

  // Setup default search values for the Header component
  const defaultSearchArrayValues: DefaultSearchArrayValues = {
    tags: [],
    authors: [],
    keywords: [],
  };

  // Fetch tags if tagIds are provided
  if (tagIds && tagIds.length > 0) {
    const response = await getTags({
      set: { tagIds: tagIds.split(","), page: 1, limit: 10 },
      get: { _id: 1, name: 1 },
    });
    response &&
      (defaultSearchArrayValues.tags = response.map(
        ({ _id, name }: { _id: string; name: string }) => ({
          value: _id,
          label: name,
        })
      ));
  }

  // Fetch keywords if keywordIds are provided
  if (keywordIds && keywordIds.length > 0) {
    const response = await getKeywords({
      set: { keywordIds: keywordIds.split(","), page: 1, limit: 10 },
      get: { _id: 1, name: 1 },
    });
    response &&
      (defaultSearchArrayValues.keywords = response.map(
        ({ _id, name }: { _id: string; name: string }) => ({
          value: _id,
          label: name,
        })
      ));
  }

  // Fetch authors if authorIds are provided
  if (authorIds && authorIds.length > 0) {
    const response = await getAuthors({
      set: { authorIds: authorIds.split(","), page: 1, limit: 10 },
      get: { _id: 1, first_name: 1, last_name: 1 },
    });
    response &&
      (defaultSearchArrayValues.authors = response.map(
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
      ));
  }

  return (
    <>
      <Header defaultSearchArrayValues={defaultSearchArrayValues} />
      <GraphVisualization articles={articles} />
    </>
  );
}
