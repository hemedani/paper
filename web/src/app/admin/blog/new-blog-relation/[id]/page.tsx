import { cookies } from "next/headers";
import React from "react";
import { NewBlogRelationForm } from "@/components/organisms/NewBlogRelation";
import { getBlogById } from "@/app/actions/blog/getBlogById";
import Link from "next/link";

export default async function NewBlogRelationPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";
  const lesanUrl = process.env.LESAN_URL
    ? process.env.LESAN_URL
    : "http://localhost:1382";

  // Get basic blog info to display
  const blog = await getBlogById({
    set: { _id: params.id },
    get: {
      _id: 1,
      title: 1,
    },
  });

  return (
    <div className="p-6 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-700">
          افزودن روابط به بلاگ
        </h1>
        <Link
          href="/admin/blog"
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          بازگشت به لیست
        </Link>
      </div>

      {blog ? (
        <>
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">
              بلاگ: {blog.title}
            </h2>
          </div>
          <NewBlogRelationForm
            blogId={params.id}
            token={token}
            lesanUrl={lesanUrl}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-xl text-gray-500">بلاگ یافت نشد</p>
        </div>
      )}
    </div>
  );
}
