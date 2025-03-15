import { Card } from "@/components/organisms/Card";
import { Header } from "@/components/organisms/Header";
import { ListCard } from "@/components/template/WraperCard";
import {
  articleSchema,
  DeepPartial,
  ReqType,
} from "@/types/declarations/selectInp";
import { getArticles } from "./actions/article/getArticles";
import Pagination from "@/components/molecules/Pagination";
import { getMe } from "./actions/user/getMe";
import { getCountArticles } from "./actions/article/countArticle";
import { getTags } from "./actions/tag/getTags";
import { getKeywords } from "./actions/keyword/getKeywords";
import { getAuthors } from "./actions/author/getAuthors";

export type GetArticleSetParams =
  ReqType["main"]["article"]["getArticles"]["set"];
export type DefaultSearchArrayValues = { tags: []; authors: []; keywords: [] };

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<GetArticleSetParams>;
}) {
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

  const me = await getMe();

  const countDataArticle = await getCountArticles({
    set: setSearch,
    get: { qty: 1 },
  });

  // تبدیل لیست علاقه‌مندی‌ها به Set برای جستجوی سریع‌تر
  const favoriteIds = new Set(
    me?.favArticles?.map((fav: { _id: string }) => fav._id)
  );

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
    <>
      <Header defaultSearchArrayValues={defaultSearchArrayValues} />
      {articles?.length > 0 && (
        <div className="bg-gray-300">
          <ListCard>
            {articles.map((item: Partial<articleSchema>) => (
              <Card
                key={item._id}
                {...item}
                isFavorite={favoriteIds.has(item._id!)}
                level={me?.level}
              />
            ))}
          </ListCard>
          <div className="flex justify-center items-center gap-2 pb-6">
            <Pagination
              countPage={countDataArticle ? countDataArticle.qty : 0}
              initialPage={+set.page}
            />
          </div>
        </div>
      )}
    </>
  );
}
