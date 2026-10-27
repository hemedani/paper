import React from "react";
import { FormUpdateBlog } from "@/components/template/FormUpdateBlog";
import { getBlogById } from "@/app/actions/blog/getBlogById";
import {
  AdminEmptyState,
  AdminFormPage,
  AdminIcon,
  AdminPanel,
} from "@/components/organisms/admin/AdminUI";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const _id = (await params).id;

  const blog = await getBlogById({
    set: { _id },
    get: {
      _id: 1,
      title: 1,
      subtitle: 1,
      abstract: 1,
      isInSwipper: 1,
      content: 1,
    },
  });

  if (!blog.success) {
    return (
      <AdminFormPage
        title="ویرایش پست وبلاگ"
        backHref="/admin/blog"
        backLabel="بازگشت به فهرست پست‌ها"
      >
        <AdminPanel bodyClassName="p-4">
          <AdminEmptyState
            title="پست وبلاگ پیدا نشد"
            description="این پست حذف شده است یا شناسه آن معتبر نیست."
            icon={AdminIcon.rss}
          />
        </AdminPanel>
      </AdminFormPage>
    );
  }

  return (
    <AdminFormPage
      title="ویرایش پست وبلاگ"
      subtitle={`محتوای «${blog.body.title}» را به‌روزرسانی کنید.`}
      backHref="/admin/blog"
      backLabel="بازگشت به فهرست پست‌ها"
    >
      <FormUpdateBlog defaultValues={blog.body} />
    </AdminFormPage>
  );
}
