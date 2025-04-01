import { getArticleAction } from "@/app/actions/article/getArticle";
import { getArticles } from "@/app/actions/article/getArticles";
import { DetailArticle } from "@/components/template/detailArticle";
import { ReqType } from "@/types/declarations/selectInp";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const articleId = (await params).id;

  const set: ReqType["main"]["article"]["getArticle"]["set"] = {
    _id: articleId,
  };
  const get: ReqType["main"]["article"]["getArticle"]["get"] = {
    _id: 1,
    key: 1,
    articleType: 1,
    publicationYear: 1,
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
    registrar: { _id: 1, first_name: 1, last_name: 1 },
    avatar: { _id: 1, name: 1, size: 1 },
    doc: { _id: 1, name: 1, size: 1 },
    publication: { title: 1 },
    authors: { _id: 1, first_name: 1, last_name: 1 },
    tags: { _id: 1, name: 1 },
    keywords: { _id: 1, name: 1 },
    favByUsers: { _id: 1, first_name: 1, last_name: 1 },
  };
  const article = await getArticleAction({ set, get });
  const publisherArticles = [];
  const tagArticles = [];
  const authorArticles = [];
  const keywordArticles = [];
  if (article.success) {
    const foundedPublisherArticles = await getArticles({
      set: { page: 1, limit: 5, publication: article.body.publication.name },
      get,
    });
    if (foundedPublisherArticles.success)
      publisherArticles.push(...foundedPublisherArticles.body);

    if (article.body.tags && article.body.tags.length > 0) {
      const foundedTagsArticles = await getArticles({
        set: {
          page: 1,
          limit: 5,
          tagIds: article.body.tags.map((tag: { _id: string }) => tag._id),
        },
        get,
      });
      if (foundedTagsArticles.success)
        tagArticles.push(...foundedTagsArticles.body);
    }

    if (article.body.authors && article.body.authors.length > 0) {
      const foundedAuthorsArticles = await getArticles({
        set: {
          page: 1,
          limit: 5,
          authorIds: article.body.authors.map(
            (author: { _id: string }) => author._id
          ),
        },
        get,
      });
      if (foundedAuthorsArticles.success)
        authorArticles.push(...foundedAuthorsArticles.body);
    }

    if (article.body.keywords && article.body.keywords.length > 0) {
      const foundedKeywordArticles = await getArticles({
        set: {
          page: 1,
          limit: 5,
          keywordIds: article.body.keywords.map(
            (keyword: { _id: string }) => keyword._id
          ),
        },
        get,
      });
      if (foundedKeywordArticles.success)
        keywordArticles.push(...foundedKeywordArticles.body);
    }
  }

  const lesanUrl = process.env.LESAN_URL
    ? process.env.LESAN_URL
    : "http://localhost:1382";

  return (
    <>
      {article.success ? (
        <DetailArticle
          article={article.body}
          publisherArticles={publisherArticles}
          tagArticles={tagArticles}
          keywordArticles={keywordArticles}
          authorArticles={authorArticles}
          lesanUrl={lesanUrl}
        />
      ) : (
        <div>این مقاله پیدا نشد</div>
      )}
    </>
  );
}
