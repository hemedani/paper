import React from "react";
import { EditBlogRelationForm } from "@/components/organisms/EditBlogRelation";
import { getBlogById } from "@/app/actions/blog/getBlogById";
import { cookies } from "next/headers";
import {
  AdminEmptyState,
  AdminFormPage,
  AdminIcon,
  AdminPanel,
} from "@/components/organisms/admin/AdminUI";

export default async function EditBlogRelationPage({ params }: { params: Promise<{ id: string }> }) {
  const token = (await cookies()).get("token");
  const _id = (await params).id;
  const lesanUrl = process.env.LESAN_URL ? process.env.LESAN_URL : "http://localhost:1382";

  const blog = await getBlogById({
    set: { _id },
    get: {
      _id: 1,
      pic: { _id: 1, name: 1, type: 1 },
      categories: { _id: 1, name: 1 },
    },
  });

  if (!blog.success) {
    return (
      <AdminFormPage
        title="ویرایش رابطه‌های پست"
        backHref="/admin/blog"
        backLabel="بازگشت به فهرست پست‌ها"
      >
        <AdminPanel bodyClassName="p-4">
          <AdminEmptyState
            title="پست وبلاگ پیدا نشد"
            description="این پست حذف شده است یا شناسه آن معتبر نیست."
            icon={AdminIcon.link}
          />
        </AdminPanel>
      </AdminFormPage>
    );
  }

  return (
    <AdminFormPage
      title="ویرایش رابطه‌های پست"
      subtitle="دسته‌بندی و تصویر شاخص این پست را مدیریت کنید."
      backHref="/admin/blog"
      backLabel="بازگشت به فهرست پست‌ها"
    >
      <EditBlogRelationForm
        defaultValues={blog.body}
        token={token?.value as string}
        lesanUrl={lesanUrl}
      />
    </AdminFormPage>
  );
}
