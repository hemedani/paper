import { getArticleAction } from "@/app/actions/article/getArticle";
import { EditArticleRelationForm } from "@/components/organisms/EditArticleRelation";
import { cookies } from "next/headers";
import Link from "next/link";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const articleId = (await params).id;

  const getArticle = await getArticleAction({
    set: { _id: articleId as string },
    get: {
      _id: 1,
      title: 1,
      publication: { _id: 1, title: 1 },
      tags: { _id: 1, name: 1 },
      keywords: { _id: 1, name: 1 },
      authors: { _id: 1, first_name: 1, last_name: 1 },
      avatar: { _id: 1, name: 1, type: 1 },
      doc: { _id: 1, name: 1, type: 1 },
    },
  });
  const token = (await cookies()).get("token");
  const lesanUrl = process.env.LESAN_URL ? process.env.LESAN_URL : "http://localhost:1382"

  return (
    <>
      {getArticle.success ? (
        <div className="p-6 min-h-full">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-700">ویرایش رابطه‌های مقاله «{getArticle.body.title}»</h1>
            <Link
              href="/admin/articles"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              بازگشت به لیست
            </Link>
          </div>
          <EditArticleRelationForm
            defaultValues={getArticle.body}
            token={token?.value as string}
            lesanUrl={lesanUrl}
          />
        </div>
      ) : (
        <div>
          متاسفانه این مقاله پیدا نشد
        </div>
      )}
    </>
  );
};

export default page;
