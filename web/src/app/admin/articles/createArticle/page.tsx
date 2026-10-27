import { FormCreateArticle } from "@/components/template/FormCreateArticle";
import { cookies } from "next/headers";
import { AdminFormPage } from "@/components/organisms/admin/AdminUI";

const Page = async () => {
  const token = (await cookies()).get("token");
  const lesanUrl = process.env.LESAN_URL ? process.env.LESAN_URL : "http://localhost:1382";

  return (
    <AdminFormPage
      title="ایجاد مقاله جدید"
      subtitle="اطلاعات کتاب‌شناختی مقاله را کامل کنید و روابط آن را تعیین کنید."
      backHref="/admin/articles"
      backLabel="بازگشت به فهرست مقالات"
    >
      <FormCreateArticle token={token?.value} lesanUrl={lesanUrl} />
    </AdminFormPage>
  );
};

export default Page;
