import { blogSchema } from "@/types/declarations/selectInp"
import Link from "next/link"
import { BlogCard } from "./BlogCard"


export const MainBlog = ({
  blogs,
  lesanUrl,
  isLogedIn,
  likedPosts
}: {
  blogs: blogSchema[],
  isLogedIn: boolean,
  likedPosts: Set<string>,
  lesanUrl: string
}) => {

  return (
    <div className="lg:w-2/3">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-indigo-900 relative inline-block">
          <span className="relative z-10">آخرین مقالات</span>
          <span className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-200 -z-10"></span>
        </h2>
        <Link
          href="/blog"
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
        >
          مشاهده همه مقالات
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {blogs?.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            lesanUrl={lesanUrl}
            isLiked={likedPosts.has(blog._id!)}
            isLogedIn={isLogedIn}
          />
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-12 text-center">
        <button className="px-8 py-3 bg-white border-2 border-indigo-200 text-indigo-700 rounded-lg font-medium hover:bg-indigo-50 transition-colors duration-300 shadow-sm hover:shadow flex items-center gap-2 mx-auto">
          <span>مقالات بیشتر</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
