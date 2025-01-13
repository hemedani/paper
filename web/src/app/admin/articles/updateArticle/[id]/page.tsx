import { getArticleAction } from "@/app/actions/article/getArticle";
import { FormUpdateArticle } from "@/components/template/FormUpdateArticle";

const Page = async ({ params }: { params: Promise<{ id: string }>; }) => {

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
      authors: 1,
      publication: { _id: 1, title: 1 },
      tags: { _id: 1, name: 1 },
      URL: 1,
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">ویرایش مقاله</h1>
      <FormUpdateArticle defaultValues={getArticle} />
    </div>
  );
};

export default Page;
