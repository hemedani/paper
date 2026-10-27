import { getBlogs } from "@/app/actions/blog/getBlogs";
import { gets } from "@/app/actions/category/gets";
import { getMe } from "@/app/actions/user/getMe";
import { BlogHeroCard } from "@/components/organisms/blog/BlogHeroCard";
import { NewBlogCard } from "@/components/organisms/blog/NewBlogCard";
import { PopularBlogMiniCard } from "@/components/organisms/blog/PopularBlogMiniCard";
import { NewBlogSearchFilter } from "@/components/organisms/blog/NewBlogSearchFilter";
import { HashtagPills } from "@/components/molecules/HashtagPills";
import { NewsletterSignup } from "@/components/molecules/NewsletterSignup";
import Pagination from "@/components/molecules/Pagination";
import { CountBlog } from "@/app/actions/blog/countBlog";
import { ReqType, blogSchema } from "@/types/declarations/selectInp";

interface BlogPageSearchFilterProps {
  categories: string;
  search: string;
  page: string;
}

const BlogPage = async ({ searchParams }: { searchParams: Promise<BlogPageSearchFilterProps> }) => {
  const getSearchParams = await searchParams;

  const currentPage = parseInt(getSearchParams.page) || 1;
  const limit = 6; // 6 items per page for 2-column grid

  const set: ReqType["main"]["blog"]["gets"]["set"] = {
    limit,
    page: currentPage,
  };

  if (getSearchParams.search) {
    set.search = getSearchParams.search;
  }

  if (getSearchParams.categories) {
    set.categoryIds = getSearchParams.categories.split(",");
  }

  const get: ReqType["main"]["blog"]["gets"]["get"] = {
    _id: 1,
    abstract: 1,
    content: 1,
    isInSwipper: 1,
    pic: { _id: 1, name: 1, type: 1 },
    subtitle: 1,
    title: 1,
    likes: 1,
    createdAt: 1,
    author: { _id: 1, first_name: 1, last_name: 1 },
    favByUsers: { _id: 1 },
    categories: { _id: 1, name: 1 },
  };

  const me = await getMe({ _id: 1, favBlogs: { _id: 1 } });
  const favoriteIds: Set<string> = me.success
    ? new Set(me.body.favBlogs?.map((fav: { _id: string }) => fav._id))
    : new Set();

  const blogs = await getBlogs({ set, get });

  // Get featured blog (first blog for hero section)
  const featuredBlog = await getBlogs({
    set: { limit: 1, page: 1, isInSwipper: true },
    get,
  });

  // Get most liked posts for sidebar
  const mostLikedPosts = await getBlogs({
    set: { limit: 3, page: 1, sortByLikes: true },
    get,
  });

  const categories = await gets({
    set: { page: 1, limit: 30 },
    get: { _id: 1, name: 1 },
  });

  const lesanUrl = process.env.LESAN_URL ? process.env.LESAN_URL : "http://localhost:1382";

  // Popular hashtags (sample data - replace with actual data from backend)
  const popularTags = [
    "اقتصادان",
    "هویت",
    "اصل معمار",
    "ورزش",
    "تاریکی",
    "صدقه",
    "مرجع قاطع",
    "اصل فردا",
    "معماری",
    "ورزش سلامت",
    "هویت",
  ];

  // Calculate total count for pagination
  const blogCount = await CountBlog({
    set: {
      ...(getSearchParams.search ? { search: getSearchParams.search } : {}),
      ...(getSearchParams.categories
        ? { categoryIds: getSearchParams.categories.split(",") }
        : {}),
    },
    get: { qty: 1 },
  });
  const totalBlogs = blogCount?.qty ?? (blogs.success ? blogs.body.length : 0);

  return (
    <div className="bg-white pb-16 lg:pb-24" dir="rtl">
      {/* Container with max-width */}
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-8 lg:px-[104px] xl:px-[108px]">
        {/* Hero Section - Featured Article */}
        {featuredBlog.success && featuredBlog.body.length > 0 && (
          <div className="pt-[50px] pb-16">
            <BlogHeroCard
              blog={featuredBlog.body[0]}
              lesanUrl={lesanUrl}
              isLiked={favoriteIds.has(featuredBlog.body[0]._id!)}
              isLogedIn={me.success}
            />
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="pb-[30px]">
          <NewBlogSearchFilter
            categories={categories.success ? categories.body : []}
            pageAddress="/blog"
            defaultSearch={getSearchParams.search}
            defaultCategories={getSearchParams.categories ? getSearchParams.categories.split(",") : []}
          />
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-8">
          {/* Article Grid - Left Column */}
          <div className="flex w-full min-w-0 flex-col items-end gap-[34px] lg:w-auto lg:flex-1">
            {/* Section Title */}
            <h2 className="w-full text-[24px] font-bold leading-[1.76] text-right text-black lg:text-[28px]">
              برترین مقالات این هفته
            </h2>

            {/* Article Grid */}
            <div className="flex w-full flex-col items-center gap-10 lg:gap-[60px]">
              {blogs.success && blogs.body.length > 0 ? (
                <>
                  <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-[24px] sm:gap-y-12 lg:gap-y-[60px]">
                    {blogs.body.map((blog: blogSchema) => (
                      <NewBlogCard
                        key={blog._id}
                        blog={blog}
                        lesanUrl={lesanUrl}
                        isLiked={favoriteIds.has(blog._id!)}
                        isLogedIn={me.success}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex w-full justify-center pt-2 lg:pt-[34px]">
                    <Pagination
                      countPage={totalBlogs}
                      initialPage={currentPage}
                      limit={limit}
                    />
                  </div>
                </>
              ) : (
                <div className="py-16 text-center text-[#9A9AA1]">
                  <p className="text-lg">مقاله‌ای یافت نشد</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="flex w-full flex-col items-end gap-12 lg:w-[442px] lg:shrink-0 lg:gap-[56px]">
            {/* Most Popular Section */}
            <div className="flex w-full flex-col items-end gap-[34px]">
              <h3 className="w-full text-[24px] font-bold leading-[1.76] text-right text-black lg:text-[28px]">
                محبوب‌ترین ها
              </h3>

              {/* Popular Cards List */}
              <div className="flex w-full flex-col items-end gap-[30px]">
                {mostLikedPosts.success &&
                  mostLikedPosts.body.map((blog: blogSchema, index: number) => (
                    <div key={blog._id} className="w-full">
                      <PopularBlogMiniCard blog={blog} lesanUrl={lesanUrl} />
                      {/* Divider between cards */}
                      {index < mostLikedPosts.body.length - 1 && (
                        <div className="my-[30px] h-px w-full bg-[#F0F0F2]" />
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Popular Hashtags Section */}
            <div className="flex w-full flex-col items-end gap-[26px]">
              <h3 className="text-[24px] font-bold leading-[1.76] text-right text-black lg:text-[28px]">
                هشتگ پر طرفدار
              </h3>

              <HashtagPills tags={popularTags} />
            </div>

            {/* Newsletter Section */}
            <div className="flex w-full flex-col items-end gap-6">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
