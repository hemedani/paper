import React from "react";
import { FormNewBlog } from "@/components/template/FormNewBlog";
import { cookies } from "next/headers";
import { AdminFormPage } from "@/components/organisms/admin/AdminUI";

const page = async () => {
  const token = (await cookies()).get("token");
  const lesanUrl = process.env.LESAN_URL ? process.env.LESAN_URL : "http://localhost:1382";

  return (
    <AdminFormPage
      title="ایجاد پست وبلاگ جدید"
      subtitle="عنوان، خلاصه و متن پست را بنویسید و تصویر شاخص آن را بارگذاری کنید."
      backHref="/admin/blog"
      backLabel="بازگشت به فهرست پست‌ها"
    >
      <FormNewBlog token={token?.value} lesanUrl={lesanUrl} />
    </AdminFormPage>
  );
};

export default page;
