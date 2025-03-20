import { DeepPartial, ReqType } from "@/types/declarations/selectInp";

export type GetArticleSetParams =
  ReqType["main"]["article"]["getArticles"]["set"];

export const populateSetSearch = (searchParams: GetArticleSetParams) => {

  const {
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
  } = searchParams;

  const setSearch: DeepPartial<GetArticleSetParams> = {};

  if (search && search !== "undefined") { setSearch.search = search; }
  if (title && title !== "undefined") { setSearch.title = title; }
  if (abstract && abstract !== "undefined") { setSearch.abstract = abstract; }
  if (publication && publication !== "undefined") { setSearch.publication = publication; }
  if (DOI && DOI !== "undefined") { setSearch.DOI = DOI; }
  if (ISBN && ISBN !== "undefined") { setSearch.ISBN = ISBN; }
  if (ISNN && ISNN !== "undefined") { setSearch.ISNN = ISNN; }

  if (authorFamily) { setSearch.authorFamily = authorFamily; }
  if (authorIds && authorIds.length > 0) { setSearch.authorIds = Array.isArray(authorIds) ? authorIds : (authorIds as string).split(","); }

  if (keywordIds && keywordIds.length > 0) { setSearch.keywordIds = Array.isArray(keywordIds) ? keywordIds : (keywordIds as string).split(","); }
  if (keywords && keywords.length > 0) { setSearch.keywords = Array.isArray(keywords) ? keywords : (keywords as string).split(","); }

  if (tagIds && tagIds.length > 0) { setSearch.tagIds = Array.isArray(tagIds) ? tagIds : (tagIds as string).split(","); }
  if (tags && tags.length > 0) { setSearch.tags = Array.isArray(tags) ? tags : (tags as string).split(","); }

  if (articleType) { setSearch.articleType = articleType; }
  if (issue) { setSearch.issue = Number(issue); }
  if (pageCount) { setSearch.pageCount = pageCount; }
  if (volume) { setSearch.volume = Number(volume); }
  if (publicationYear) { setSearch.publicationYear = Number(publicationYear); }

  return setSearch;
}
