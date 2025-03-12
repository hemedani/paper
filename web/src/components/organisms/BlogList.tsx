"use client";
import React from "react";
import Image from "next/image";

import { Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";

interface Blog {
  _id: string;
  abstract: string;
  pic: { _id: string; name: string; type: string };
  isInSwipper: string;
  title: string;
  subtitle: string;
}

export const BLogList = ({ blogs, lesanUrl }: { blogs: Blog[], lesanUrl: string }) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 ">
        وبلاگ
      </h1>
      <Swiper
        slidesPerView={1}
        centeredSlides={false}
        slidesPerGroupSkip={1}
        grabCursor={true}
        keyboard={{ enabled: true }}
        breakpoints={{
          769: { slidesPerView: 3, slidesPerGroup: 2 },
        }}
        scrollbar={true}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Keyboard, Scrollbar, Navigation, Pagination]}
        className="mySwiper max-w-[800px] mb-8"
      >
        {/* {blogs.map((blog) => (
          <SwiperSlide>
            <img
              src={`http://127.0.0.1:1382/uploads/images/${blog.pic.name}`}
              className="h-48 object-cover rounded-xl"
            />
          </SwiperSlide>
        ))} */}
      </Swiper>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-right">
        {blogs?.map((blog, index) => (
          <div
            key={index}
            className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900"
          >
            <Image
              src={encodeURI(`${lesanUrl}/uploads/images/${blog.pic.name}`)}
              alt={blog.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-white mb-2">
                {blog.title}
              </h3>
              <p className="text-white mb-4">{blog.abstract}</p>
              <Link
                href={`/blog/${blog._id}`}
                className="inline-block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
              >
                بیشتر بخوانید
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
