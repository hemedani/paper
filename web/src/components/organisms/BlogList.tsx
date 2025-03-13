"use client";
import React, { useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import { blogSchema } from "@/types/declarations/selectInp";

export const BLogList = ({
  blogs,
  lesanUrl,
  swiperBlogPosts,
  mostLikedPosts
}: {
  blogs: blogSchema[];
  mostLikedPosts: blogSchema[];
  swiperBlogPosts: blogSchema[];
  lesanUrl: string;
}) => {
  // State to track liked posts
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  // Toggle like function
  const toggleLike = (blogId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  // Heart icon component
  const HeartIcon = ({
    filled,
    onClick,
  }: {
    filled: boolean;
    onClick?: () => void;
  }) => (
    <span
      onClick={onClick}
      className={`inline-block w-6 h-6 flex items-center justify-center cursor-pointer ${filled ? "text-white" : "text-transparent"
        }`}
    >
      {filled ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-5 h-5"
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

  return (
    <>
      <Swiper
        slidesPerView={1}
        centeredSlides={false}
        slidesPerGroupSkip={1}
        grabCursor={true}
        keyboard={{ enabled: true }}
        breakpoints={{
          769: { slidesPerView: 1, slidesPerGroup: 1 },
        }}
        scrollbar={true}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Keyboard, Scrollbar, Navigation, Pagination]}
        className="w-full h-[80vh] mb-8 rounded-2xl overflow-hidden"
      >
        {swiperBlogPosts.map((blog) => (
          <SwiperSlide key={blog._id}>
            <div className="relative h-full w-full">
              <img
                src={`${lesanUrl}/uploads/images/${blog.pic.name}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-6 text-right rounded-t-2xl">
                <h2 className="text-3xl font-bold mb-2">{blog.title}</h2>
                <h3 className="text-xl mb-3">{blog.subtitle || "زیرعنوان"}</h3>
                <p className="text-base text-gray-300">{blog.abstract}</p>
                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center">
                    <HeartIcon
                      filled={likedPosts[blog._id!] || false}
                      onClick={() => toggleLike(blog._id!)}
                    />
                    <span className="mr-1">{blog.likes || 0}</span>
                  </div>
                  <Link
                    href={`/blog/${blog._id}`}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                  >
                    بیشتر بخوانید
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* All Blog Posts Section */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold text-right mb-6 text-gray-900">
            آخرین مقالات
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-right">
            {blogs?.map((blog, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 flex flex-col h-full"
              >
                <Image
                  src={encodeURI(`${lesanUrl}/uploads/images/${blog.pic.name}`)}
                  alt={blog.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-white mb-4 flex-grow">{blog.abstract}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center">
                      <HeartIcon
                        filled={likedPosts[blog._id!] || false}
                        onClick={() => toggleLike(blog._id!)}
                      />
                      <span className="text-white mr-1">{blog.likes || 0}</span>
                    </div>
                    <Link
                      href={`/blog/${blog._id}`}
                      className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                    >
                      بیشتر بخوانید
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Liked Posts Section - Vertical Layout */}
        <div className="lg:w-1/3">
          <h2 className="text-2xl font-bold text-right mb-6 text-gray-900">
            محبوب‌ترین مقالات
          </h2>
          <div className="flex flex-col gap-4">
            {mostLikedPosts.map((blog, index) => (
              <div
                key={`most-liked-${index}`}
                className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-purple-800 to-indigo-900 flex h-32"
              >
                <div className="w-1/3">
                  <img
                    src={`${lesanUrl}/uploads/images/${blog.pic.name}`}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-bold text-white text-right w-full">
                        {blog.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2 mb-1 gap-2">
                    <div className="bg-green-500 text-white px-2 py-1 rounded-full flex items-center text-xs">
                      <HeartIcon
                        filled={likedPosts[blog._id!] || false}
                        onClick={() => toggleLike(blog._id!)}
                      />
                      <span className="mr-1">{blog.likes || 0}</span>
                    </div>
                    <Link
                      href={`/blog/${blog._id}`}
                      className="px-3 py-1 bg-white text-indigo-900 hover:bg-gray-100 rounded-lg transition text-sm font-medium"
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
    </>
  );
};
