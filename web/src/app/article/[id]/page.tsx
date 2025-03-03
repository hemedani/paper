import { getArticleAction } from "@/app/actions/article/getArticle";
import { getMe } from "@/app/actions/user/getMe";
import { Navbar } from "@/components/organisms/Navbar";
import { DetailArticle } from "@/components/template/detailArticle";
import { ReqType } from "@/types/declarations/selectInp";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const articleId = (await params).id;
  // const router = useRouter();

  const set: ReqType["main"]["article"]["getArticle"]["set"] = {
    _id: articleId,
  };
  const get: ReqType["main"]["article"]["getArticle"]["get"] = {
    _id: 1,
    title: 1,
    articleType: 1,
    publicationYear: 1,
    abstract: 1,
    DOI: 1,
    page: 1,
    issue: 1,
    volume: 1,
    registrar: { _id: 1, first_name: 1, last_name: 1 },
    publication: { title: 1 },
    tags: { name: 1 },
    authors: { _id: 1, first_name: 1, last_name: 1 },
    URL: 1,
  };
  const article = await getArticleAction({ set, get });
  const me = await getMe();

  return (
    <>
      <Navbar level={me?.level} />
      <DetailArticle article={article} />
    </>
  );
}
