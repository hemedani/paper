import { getCountArticles } from "@/app/actions/article/countArticle";
import { getArticles } from "@/app/actions/article/getArticles";
import Pagination from "@/components/molecules/Pagination";
import ClientArticleDashboard from "@/components/template/clientArticleDashboard";
import { DeepPartial, ReqType } from "@/types/declarations/selectInp";
import ToggleAdvancedSearch from "@/components/molecules/ToggleAdvancedSearch";
import { getAuthors } from "@/app/actions/author/getAuthors";
import { getKeywords } from "@/app/actions/keyword/getKeywords";
import { getTags } from "@/app/actions/tag/getTags";
import { DefaultSearchArrayValues, GetArticleSetParams } from "@/app/page";

const ArticleDashboard = async ({
  searchParams,
}: {
  searchParams: Promise<GetArticleSetParams>;
}) => {
  const {
    page = "1",
    limit = "20",
    search,
    title,
    abstract,
    publication,
    DOI,
    ISBN,
    ISNN,
    articleType,
    publicationYear,
    issue,
    volume,
    pageCount,

    authorFamily,
    authorIds,

    keywords,
    keywordIds,

    tags,
    tagIds,
  } = await searchParams;

  const setSearch: DeepPartial<GetArticleSetParams> = {};
  const defaultSearchArrayValues: DefaultSearchArrayValues = {
    tags: [],
    authors: [],
    keywords: [],
  };

  search && search !== "undefined" && (setSearch.search = search);
  title && title !== "undefined" && (setSearch.title = title);
  abstract && abstract !== "undefined" && (setSearch.abstract = abstract);
  publication &&
    publication !== "undefined" &&
    (setSearch.publication = publication);
  DOI && DOI !== "undefined" && (setSearch.DOI = DOI);
  ISBN && ISBN !== "undefined" && (setSearch.ISBN = ISBN);
  ISNN && ISNN !== "undefined" && (setSearch.ISNN = ISNN);

  authorFamily && (setSearch.authorFamily = authorFamily);
  authorIds &&
    authorIds.length > 0 &&
    (setSearch.authorIds = (authorIds as unknown as string).split(","));

  keywordIds &&
    keywordIds.length > 0 &&
    (setSearch.keywordIds = (keywordIds as unknown as string).split(","));
  keywords &&
    keywords.length > 0 &&
    (setSearch.keywords = (keywords as unknown as string).split(","));

  tagIds &&
    tagIds.length > 0 &&
    (setSearch.tagIds = (tagIds as unknown as string).split(","));
  tags &&
    tags.length > 0 &&
    (setSearch.tags = (tags as unknown as string).split(","));

  articleType &&
    (articleType as any) !== "undefined" &&
    (setSearch.articleType = articleType);
  issue && (issue as any) !== "undefined" && (setSearch.issue = +issue);
  pageCount &&
    (pageCount as any) !== "undefined" &&
    (setSearch.pageCount = pageCount);
  volume && (volume as any) !== "undefined" && (setSearch.volume = +volume);
  publicationYear &&
    (publicationYear as any) !== "undefined" &&
    (setSearch.publicationYear = +publicationYear);

  const set: ReqType["main"]["article"]["getArticles"]["set"] = {
    page: +page,
    limit: +limit || 20,
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
        title: 1,
      },
    },
  });

  const countDataArticle = await getCountArticles({
    set: setSearch,
    get: { qty: 1 },
  });


  if (setSearch?.tagIds) {
    const response = await getTags({
      set: { tagIds: setSearch.tagIds, page: 1, limit: 10 },
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

  if (setSearch?.keywordIds) {
    const response = await getKeywords({
      set: { keywordIds: setSearch.keywordIds, page: 1, limit: 10 },
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

  if (setSearch?.authorIds) {
    const response = await getAuthors({
      set: { authorIds: setSearch.authorIds, page: 1, limit: 10 },
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
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">بخش مقالات</h1>
      <ToggleAdvancedSearch defaultSearchArrayValues={defaultSearchArrayValues} />

      <ClientArticleDashboard articles={articles} />
      <Pagination countPage={countDataArticle?.qty} initialPage={+page} />
    </div>
  );
};

export default ArticleDashboard;
