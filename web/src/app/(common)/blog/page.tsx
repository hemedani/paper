import { getBlogs } from "@/app/actions/blog/getBlogs";
import { getMe } from "@/app/actions/user/getMe";
import { MainBlog } from "@/components/organisms/blog/MainBlog";
import { MostLikeBlog } from "@/components/organisms/blog/MostLikeBlog";
import { SwiperBlog } from "@/components/organisms/blog/SwiperBlog";
import { ReqType } from "@/types/declarations/selectInp";

const BlogPage = async () => {
  const set: ReqType["main"]["blog"]["gets"]["set"] = {
    limit: 20,
    page: 1,
  };

  const get: ReqType["main"]["blog"]["gets"]["get"] = {
    _id: 1,
    abstract: 1,
    content: 1,
    isInSwipper: 1,
    pic: { _id: 1, name: 1, type: 1 },
    subtitle: 1,
    title: 1,
    likes: 1,
    author: { _id: 1, first_name: 1, last_name: 1 },
    favByUsers: { _id: 1 }
  };

  const me = await getMe({ _id: 1, favBlogs: { _id: 1 } });
  const favoriteIds: Set<string> = me.success ? new Set(
    me.body.favBlogs?.map((fav: { _id: string }) => fav._id)
  ) : new Set();

  const blogs = await getBlogs({ set, get });

  const mostLikedPosts = await getBlogs({
    set: { ...set, sortByLikes: true },
    get,
  });
  const swiperBlogPosts = await getBlogs({
    set: { ...set, isInSwipper: true },
    get,
  });
  const lesanUrl = process.env.LESAN_URL
    ? process.env.LESAN_URL
    : "http://localhost:1382";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 dir-rtl rounded-t-[2.5rem]">
        <SwiperBlog swiperBlogPosts={swiperBlogPosts} isLogedIn={me.success} likedPosts={favoriteIds} lesanUrl={lesanUrl} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section Title */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
              <span className="relative z-10">مقالات و دیدگاه‌ها</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-indigo-100 -z-10 transform -rotate-1"></span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              آخرین مقالات، دیدگاه‌ها و اخبار ما را در این بخش مطالعه کنید. به روز
              باشید و از جدیدترین تحولات آگاه شوید.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-12">

            <MainBlog blogs={blogs} isLogedIn={me.success} likedPosts={favoriteIds} lesanUrl={lesanUrl} />
            <MostLikeBlog mostLikedPosts={mostLikedPosts} isLogedIn={me.success} likedPosts={favoriteIds} lesanUrl={lesanUrl} />

          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
