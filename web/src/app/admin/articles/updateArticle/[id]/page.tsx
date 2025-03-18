import { getArticleAction } from "@/app/actions/article/getArticle";
import { FormUpdateArticle } from "@/components/template/FormUpdateArticle";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const articleId = (await params).id;

  const getArticle = await getArticleAction({
    set: { _id: articleId as string },
    get: {
      _id: 0,
      title: 1,
      articleType: 1,
      publicationYear: 1,
      abstract: 1,
      DOI: 1,
      page: 1,
      issue: 1,
      volume: 1,
      key: 1,
      ISBN: 1,
      ISNN: 1,
      URL: 1,
    },
  });

  return (<FormUpdateArticle defaultValues={getArticle} />);
};

export default Page;
