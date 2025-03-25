import React from "react";
import { EditBlogRelationForm } from "@/components/organisms/EditBlogRelation";
import { getBlogById } from "@/app/actions/blog/getBlogById";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function EditBlogRelationPage({ params }: { params: Promise<{ id: string }> }) {
  const token = (await cookies()).get("token");
  const _id = (await params).id;
  const lesanUrl = process.env.LESAN_URL
    ? process.env.LESAN_URL
    : "http://localhost:1382";

  const blog = await getBlogById({
    set: { _id },
    get: {
      _id: 1,
      pic: { _id: 1, name: 1, type: 1 },
      categories: { _id: 1, name: 1 },
    },
  });

  return (
    <div className="p-6 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-700">ویرایش روابط وبلاگ</h1>
        <Link
          href="/admin/blog"
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          بازگشت به لیست
        </Link>
      </div>

      {blog.success ? (
        <EditBlogRelationForm
          defaultValues={blog.body}
          token={token?.value as string}
          lesanUrl={lesanUrl}
        />
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-xl text-gray-500">بلاگ یافت نشد</p>
        </div>
      )}
    </div>
  );
}
