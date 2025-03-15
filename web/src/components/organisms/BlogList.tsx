"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Navigation, Pagination } from "swiper/modules";
import { blogSchema } from "@/types/declarations/selectInp";

// Heart Icon Component
const HeartIcon = ({ filled, onClick }: { filled: boolean; onClick?: () => void }) => (
  <span
    onClick={onClick}
    className={`inline-block w-6 h-6 flex items-center justify-center cursor-pointer transition-colors duration-300 ${filled ? "text-red-500" : "text-gray-400"
      }`}
  >
    {filled ? (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    )}
  </span>
);

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

  const toggleLike = (blogId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 rounded-2xl pb-12 dir-rtl">
      <section className="mb-12">
        <Swiper
          slidesPerView={1}
          grabCursor={true}
          keyboard={{ enabled: true }}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Keyboard, Navigation, Pagination]}
          className="w-full h-[70vh] rounded-2xl overflow-hidden shadow-xl"
        >
          {swiperBlogPosts.map((blog) => (
            <SwiperSlide key={blog._id}>
              <div className="relative h-full w-full">
                <Image
                  src={`${lesanUrl}/uploads/images/${blog.pic.name}`}
                  alt={blog.title}
                  layout="fill"
                  objectFit="cover"
                  className="brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{blog.title}</h2>
                  <p className="text-lg md:text-xl mb-4">{blog.subtitle || "زیرعنوان"}</p>
                  <p className="text-base text-gray-200 mb-6">{blog.abstract}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <HeartIcon
                        filled={likedPosts[blog._id!] || false}
                        onClick={() => toggleLike(blog._id!)}
                      />
                      <span>{blog.likes || 0}</span>
                    </div>
                    <Link
                      href={`/blog/${blog._id}`}
                      className="px-6 py-2 bg-white text-indigo-700 rounded-full font-medium hover:bg-indigo-50 transition"
                    >
                      بیشتر بخوانید
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* All Blog Posts */}
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-bold text-indigo-900 mb-8 text-right">
              آخرین مقالات
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs?.map((blog) => (
                <div
                  key={blog._id}
                  className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <Image
                      src={`${lesanUrl}/uploads/images/${blog.pic.name}`}
                      alt={blog.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{blog.abstract}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <HeartIcon
                          filled={likedPosts[blog._id!] || false}
                          onClick={() => toggleLike(blog._id!)}
                        />
                        <span className="text-gray-500">{blog.likes || 0}</span>
                      </div>
                      <Link
                        href={`/blog/${blog._id}`}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        بیشتر بخوانید
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Liked Posts */}
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-bold text-indigo-900 mb-8 text-right">
              محبوب‌ترین مقالات
            </h2>
            <div className="space-y-6">
              {mostLikedPosts.map((blog) => (
                <div
                  key={blog._id}
                  className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-1/3 h-24 relative">
                    <Image
                      src={`${lesanUrl}/uploads/images/${blog.pic.name}`}
                      alt={blog.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="w-2/3 p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                      {blog.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <HeartIcon
                          filled={likedPosts[blog._id!] || false}
                          onClick={() => toggleLike(blog._id!)}
                        />
                        <span className="text-gray-500 text-sm">{blog.likes || 0}</span>
                      </div>
                      <Link
                        href={`/blog/${blog._id}`}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        بیشتر بخوانید
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
