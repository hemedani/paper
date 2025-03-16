"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectFade,
  Autoplay,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { blogSchema } from "@/types/declarations/selectInp";

// Heart Icon Component
const HeartIcon = ({
  filled,
  onClick,
  size = "normal",
}: {
  filled: boolean;
  onClick?: () => void;
  size?: "small" | "normal" | "large";
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    normal: "w-5 h-5",
    large: "w-6 h-6",
  };

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center justify-center cursor-pointer transition-all duration-300 ${
        filled ? "text-red-500 scale-110" : "text-gray-400 hover:text-gray-500"
      }`}
    >
      {filled ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={sizeClasses[size]}
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={sizeClasses[size]}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      )}
    </span>
  );
};

// Badge component for categories or tags
const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-medium">
      {children}
    </span>
  );
};

// Author avatar component
const AuthorAvatar = ({ name, size = 8 }: { name: string; size?: number }) => {
  // Generate color based on name
  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div
      className={`flex items-center justify-center rounded-full text-white font-medium text-xs w-${size} h-${size}`}
      style={{ backgroundColor: stringToColor(name) }}
    >
      {initials}
    </div>
  );
};

// Featured blog card for the swiper
const FeaturedBlogCard = ({
  blog,
  lesanUrl,
  isLiked,
  onToggleLike,
}: {
  blog: blogSchema;
  lesanUrl: string;
  isLiked: boolean;
  onToggleLike: () => void;
}) => {
  return (
    <div className="relative h-full w-full">
      <Image
        src={`${lesanUrl}/uploads/images/${blog.pic.name}`}
        alt={blog.title}
        fill
        sizes="100vw"
        priority
        className="object-cover brightness-75 transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <Badge>مقاله ویژه</Badge>
            <span className="text-gray-300 text-sm">
              {blog.author?.first_name} {blog.author?.last_name}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
            {blog.title}
          </h2>

          {blog.subtitle && (
            <h3 className="text-xl md:text-2xl text-white/90 mb-4 font-medium">
              {blog.subtitle}
            </h3>
          )}

          <p className="text-base md:text-lg text-gray-200 mb-6 line-clamp-3">
            {blog.abstract}
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <HeartIcon filled={isLiked} onClick={onToggleLike} size="large" />
              <span className="text-white text-sm">{blog.likes || 0} لایک</span>
            </div>

            <Link
              href={`/blog/${blog._id}`}
              className="px-6 py-3 bg-white text-indigo-700 rounded-lg font-medium hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
            >
              مطالعه مقاله
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Blog card component
const BlogCard = ({
  blog,
  lesanUrl,
  isLiked,
  onToggleLike,
}: {
  blog: blogSchema;
  lesanUrl: string;
  isLiked: boolean;
  onToggleLike: () => void;
}) => {
  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={`${lesanUrl}/uploads/images/${blog.pic.name}`}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AuthorAvatar
              name={`${blog.author.first_name} ${blog.author.last_name}`}
            />
            <span className="text-sm text-gray-600">
              {blog.author.first_name} {blog.author.last_name}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <HeartIcon filled={isLiked} onClick={onToggleLike} />
            <span className="text-gray-500 text-sm">{blog.likes || 0}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-700 transition-colors duration-300">
          {blog.title}
        </h3>

        <p className="text-gray-600 mb-5 line-clamp-2 text-sm leading-relaxed">
          {blog.abstract}
        </p>

        <div className="flex justify-end">
          <Link
            href={`/blog/${blog._id}`}
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm group-hover:underline transition-all flex items-center gap-1"
          >
            مطالعه مقاله
            <svg
              className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-[-4px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 12H5M12 19l-7-7 7-7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Popular blog card for sidebar
const PopularBlogCard = ({
  blog,
  lesanUrl,
  isLiked,
  onToggleLike,
  index,
}: {
  blog: blogSchema;
  lesanUrl: string;
  isLiked: boolean;
  onToggleLike: () => void;
  index: number;
}) => {
  return (
    <div className="flex bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group">
      <div className="w-1/3 h-28 relative overflow-hidden">
        <Image
          src={`${lesanUrl}/uploads/images/${blog.pic.name}`}
          alt={blog.title}
          fill
          sizes="33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
      </div>

      <div className="w-2/3 py-3 px-4 flex flex-col justify-between">
        <div>
          <h3 className="text-md font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-indigo-700 transition-colors duration-300">
            {blog.title}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-1">
            {blog.subtitle || blog.abstract.substring(0, 60)}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2 space-x-reverse">
            <HeartIcon filled={isLiked} onClick={onToggleLike} size="small" />
            <span className="text-gray-500 text-xs">{blog.likes || 0}</span>
          </div>

          <Link
            href={`/blog/${blog._id}`}
            className="text-indigo-600 hover:text-indigo-800 text-xs font-medium group-hover:underline transition-all"
          >
            مطالعه
          </Link>
        </div>
      </div>
    </div>
  );
};

export const BlogList = ({
  blogs,
  lesanUrl,
  swiperBlogPosts,
  mostLikedPosts,
}: {
  blogs: blogSchema[];
  mostLikedPosts: blogSchema[];
  swiperBlogPosts: blogSchema[];
  lesanUrl: string;
}) => {
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedLikes = localStorage.getItem("blogLikes");
    if (savedLikes) {
      setLikedPosts(JSON.parse(savedLikes));
    }
    setMounted(true);
  }, []);

  // Save to localStorage when likes change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("blogLikes", JSON.stringify(likedPosts));
    }
  }, [likedPosts, mounted]);

  const toggleLike = (blogId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 dir-rtl">
      {/* Hero Swiper Section */}
      <section className="mb-16">
        <Swiper
          slidesPerView={1}
          effect={"fade"}
          grabCursor={true}
          keyboard={{ enabled: true }}
          navigation={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: function (index, className) {
              return (
                '<span class="' +
                className +
                ' transition-all duration-300 hover:bg-indigo-600"></span>'
              );
            },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[EffectFade, Keyboard, Navigation, Pagination, Autoplay]}
          className="w-full h-[70vh] md:h-[75vh] lg:h-[80vh] overflow-hidden shadow-2xl rounded-b-[2.5rem]"
        >
          {swiperBlogPosts.map((blog) => (
            <SwiperSlide key={blog._id}>
              <FeaturedBlogCard
                blog={blog}
                lesanUrl={lesanUrl}
                isLiked={likedPosts[blog._id!] || false}
                onToggleLike={() => toggleLike(blog._id!)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Main Content Section */}
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
          {/* Main Blog Posts Section */}
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
                  isLiked={likedPosts[blog._id!] || false}
                  onToggleLike={() => toggleLike(blog._id!)}
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

          {/* Sidebar Section */}
          <div className="lg:w-1/3 lg:border-r border-gray-200 lg:pr-10">
            {/* Most Liked Posts */}
            <div>
              <h2 className="text-2xl font-bold text-indigo-900 mb-6 relative inline-block">
                <span className="relative z-10">محبوب‌ترین مقالات</span>
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-200 -z-10"></span>
              </h2>

              <div className="space-y-4">
                {mostLikedPosts.map((blog, index) => (
                  <PopularBlogCard
                    key={blog._id}
                    blog={blog}
                    lesanUrl={lesanUrl}
                    isLiked={likedPosts[blog._id!] || false}
                    onToggleLike={() => toggleLike(blog._id!)}
                    index={index}
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
        </div>
      </div>
    </div>
  );
};
