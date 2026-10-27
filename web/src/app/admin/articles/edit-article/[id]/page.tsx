import { getArticleAction } from "@/app/actions/article/getArticle";
import { EditArticleRelationForm } from "@/components/organisms/EditArticleRelation";
import { cookies } from "next/headers";
import {
  AdminEmptyState,
  AdminFormPage,
  AdminIcon,
  AdminPanel,
} from "@/components/organisms/admin/AdminUI";

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
  const lesanUrl = process.env.LESAN_URL ? process.env.LESAN_URL : "http://localhost:1382";

  if (!getArticle.success) {
    return (
      <AdminFormPage
        title="ویرایش رابطه‌های مقاله"
        backHref="/admin/articles"
        backLabel="بازگشت به فهرست مقالات"
      >
        <AdminPanel bodyClassName="p-4">
          <AdminEmptyState
            title="مقاله پیدا نشد"
            description="این مقاله حذف شده است یا شناسه آن معتبر نیست."
            icon={AdminIcon.link}
          />
        </AdminPanel>
      </AdminFormPage>
    );
  }

  return (
    <AdminFormPage
      title="ویرایش رابطه‌های مقاله"
      subtitle={`برچسب‌ها، نویسندگان و فایل‌های «${getArticle.body.title}» را مدیریت کنید.`}
      backHref="/admin/articles"
      backLabel="بازگشت به فهرست مقالات"
    >
      <EditArticleRelationForm
        defaultValues={getArticle.body}
        token={token?.value as string}
        lesanUrl={lesanUrl}
      />
    </AdminFormPage>
  );
};

export default page;
