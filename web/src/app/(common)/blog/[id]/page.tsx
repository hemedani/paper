import { getBlog } from "@/app/actions/blog/getBlog";
import Image from "next/image";
import Link from "next/link";

const BlogDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const blogId = (await params).id;
  const blog = await getBlog(blogId);

  if (!blog)
    return (
      <p className="text-center text-red-500 text-lg font-semibold">
        پست مورد نظر یافت نشد
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl text-right">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          src={`http://127.0.0.1:1382/uploads/images/${blog.pic.name}`}
          alt={blog.title}
          width={700}
          height={400}
          className="w-full h-72 object-cover"
        />
        <div className="p-6">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {blog.title}
          </h1>
          {blog.subtitle && (
            <h2 className="text-xl text-gray-600 mb-3 font-semibold">
              {blog.subtitle}
            </h2>
          )}
          <p className="text-gray-700 leading-relaxed text-lg">
            {blog.content}
          </p>
          <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
            <p>👍 {blog.likes} لایک</p>
            <Link className="text-blue-600 hover:underline" href="/blog">
              بازگشت به بلاگ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
