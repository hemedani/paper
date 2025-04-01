import { getArticleAction } from "@/app/actions/article/getArticle";
import { FormUpdateArticle } from "@/components/template/FormUpdateArticle";
import Link from "next/link";

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

  return (
    <>
      {getArticle.success ? (
        <div className="p-6 min-h-full">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-700">ویرایش مقاله</h1>
            <Link
              href="/admin/articles"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              بازگشت به لیست
            </Link>
          </div>
          <FormUpdateArticle defaultValues={getArticle.body} />
        </div>
      ) : (
        <div>متاسفانه این مقاله پیدا نشد</div>
      )}
    </>
  );
};

export default Page;
