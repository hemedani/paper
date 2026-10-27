import { FormCreateUser } from "@/components/template/FormCreateUser";
import { cookies } from "next/headers";
import { AdminFormPage } from "@/components/organisms/admin/AdminUI";

const Page = async () => {
  const token = (await cookies()).get("token");
  const lesanUrl = process.env.LESAN_URL ? process.env.LESAN_URL : "http://localhost:1382";

  return (
    <AdminFormPage
      title="ایجاد کاربر جدید"
      subtitle="اطلاعات هویتی و سطح دسترسی کاربر را تعیین کنید."
      backHref="/admin/users"
      backLabel="بازگشت به فهرست کاربران"
    >
      <FormCreateUser token={token?.value} lesanUrl={lesanUrl} />
    </AdminFormPage>
  );
};

export default Page;
