import React from "react";
import { FormUpdateBlog } from "@/components/template/FormUpdateBlog";
import { getBlogById } from "@/app/actions/blog/getBlogById";
import Link from "next/link";

export default async function EditBlogPage({ params, }: { params: Promise<{ id: string }> }) {
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

  return (
    <div className="p-6 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-700">ویرایش وبلاگ</h1>
        <Link
          href="/admin/blog"
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          بازگشت به لیست
        </Link>
      </div>

      {blog.success ? (
        <FormUpdateBlog defaultValues={blog.body} />
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-xl text-gray-500">بلاگ یافت نشد</p>
        </div>
      )}
    </div>
  );
}
