import { getBlog } from "@/app/actions/blog/getBlog";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns-jalali";
import {
  CalendarIcon,
  HeartIcon,
  ArrowUturnLeftIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const BlogDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const blogId = (await params).id;
  const blog = await getBlog(blogId);

  if (!blog)
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="text-red-500 text-3xl font-bold mb-4">
          پست مورد نظر یافت نشد
        </div>
        <p className="text-gray-600 mb-8">
          مقاله‌ای که به دنبال آن هستید در سیستم موجود نیست.
        </p>
        <Link
          href="/blog"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out"
        >
          <ArrowUturnLeftIcon className="h-5 w-5" />
          <span>بازگشت به صفحه مقالات</span>
        </Link>
      </div>
    );

  // Format dates
  const persianCreatedDate = blog.createdAt
    ? format(new Date(blog.createdAt), "dd MMMM yyyy")
    : "";
  const persianUpdatedDate = blog.updatedAt
    ? format(new Date(blog.updatedAt), "dd MMMM yyyy")
    : "";

  // Format author name
  const authorFullName = `${blog.author.first_name} ${blog.author.last_name}`;

  return (
    <article className="bg-gray-50 min-h-screen pb-16">
      {/* Hero section with image */}
      <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        <Image
          src={`http://127.0.0.1:1382/uploads/images/${blog.pic.name}`}
          alt={blog.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              {blog.title}
            </h1>
            {blog.subtitle && (
              <h2 className="text-lg md:text-xl text-white/90 mb-6 font-medium">
                {blog.subtitle}
              </h2>
            )}
          </div>
        </div>
      </div>

      {/* Main content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Author and meta info bar */}
          <div className="bg-blue-50 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center text-right border-b border-blue-100">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-blue-200 flex items-center justify-center">
                <UserIcon className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{authorFullName}</h3>
                <p className="text-sm text-gray-600">
                  {blog.author.level === "Editor"
                    ? "ویراستار"
                    : blog.author.level === "Manager"
                    ? "مدیر"
                    : "نویسنده"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span>تاریخ انتشار: {persianCreatedDate}</span>
              </div>
              {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>بروزرسانی: {persianUpdatedDate}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <HeartIcon className="h-4 w-4 text-red-500" />
                <span>{blog.likes || 0} لایک</span>
              </div>
            </div>
          </div>

          {/* Content area */}
          <div className="p-4 md:p-8 lg:p-10">
            {/* Abstract */}
            {blog.abstract && (
              <div className="mb-8 bg-amber-50 p-4 md:p-6 rounded-lg border-r-4 border-amber-400">
                <h3 className="text-lg font-bold mb-2 text-gray-800">چکیده</h3>
                <p className="text-gray-700 leading-relaxed">{blog.abstract}</p>
              </div>
            )}

            {/* Main content */}
            <div className="prose prose-lg max-w-none text-right">
              <div className="text-gray-800 leading-relaxed space-y-6 whitespace-pre-line">
                {blog.content
                  .split("\n\n")
                  .map((paragraph: string, idx: number) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
              </div>
            </div>

            {/* Author bio */}
            {blog.author.summery && (
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  درباره نویسنده
                </h3>
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
                  <p className="text-gray-700">{blog.author.summery}</p>
                </div>
              </div>
            )}

            {/* Actions bar */}
            <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap justify-between items-center gap-4">
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition">
                <HeartIcon className="h-5 w-5" />
                <span>پسندیدن این مقاله</span>
              </button>

              <Link
                href="/blog"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out"
              >
                <ArrowUturnLeftIcon className="h-5 w-5" />
                <span>بازگشت به صفحه مقالات</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogDetail;
