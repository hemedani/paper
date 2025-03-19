import { blogSchema } from "@/types/declarations/selectInp";
import { PopularBlogCard } from "./PopularBlogCard";
import { Badge } from "@/components/molecules/Badge";

export const MostLikeBlog = ({
  mostLikedPosts,
  lesanUrl,
  likedPosts,
  isLogedIn
}: {
  lesanUrl: string;
  mostLikedPosts: blogSchema[];
  likedPosts: Set<string>;
  isLogedIn: boolean;
}) => {
  return (
    <div className="lg:w-1/3 lg:border-r border-gray-200 lg:pr-10">
      {/* Most Liked Posts */}
      <div>
        <h2 className="text-2xl font-bold text-indigo-900 mb-6 relative inline-block">
          <span className="relative z-10">محبوب‌ترین مقالات</span>
          <span className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-200 -z-10"></span>
        </h2>

        <div className="space-y-4">
          {mostLikedPosts.map((blog) => (
            <PopularBlogCard
              key={blog._id}
              blog={blog}
              lesanUrl={lesanUrl}
              isLiked={likedPosts.has(blog._id!)}
              isLogedIn={isLogedIn}
            />
          ))}
        </div>
      </div>

      {/* Newsletter Signup Section */}
      <div className="bg-indigo-50 rounded-2xl p-6 mt-12 border border-indigo-100 shadow-sm">
        <h3 className="text-xl font-bold text-indigo-900 mb-3">
          عضویت در خبرنامه
        </h3>
        <p className="text-gray-600 text-sm mb-6">
          با عضویت در خبرنامه ما، از آخرین مقالات و رویدادها مطلع شوید.
        </p>

        <form className="space-y-3">
          <div>
            <input
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              className="w-full px-4 py-3 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
          >
            عضویت در خبرنامه
          </button>
        </form>

        <p className="text-gray-500 text-xs mt-4 text-center">
          ما به حریم خصوصی شما احترام می‌گذاریم. در هر زمان می‌توانید
          عضویت خود را لغو کنید.
        </p>
      </div>

      {/* Categories Section */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-indigo-900 mb-4">
          دسته‌بندی‌ها
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "تکنولوژی",
            "سلامت",
            "اقتصاد",
            "فرهنگ",
            "ورزش",
            "سیاست",
            "هنر",
            "آموزش",
          ].map((category, index) => (
            <Badge key={index}>{category}</Badge>
          ))}
        </div>
      </div>

    </div>
  )
}
