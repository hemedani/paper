"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";

// import required modules

import Image from "next/image";
interface Blog {
  image: string;
  title: string;
  description: string;
  link: string;
}

const blogs: Blog[] = [
  {
    image: "/Ui-design-software1.jpg",
    title: "اولین پست وبلاگ",
    description: "این توضیحات اولین پست وبلاگ است.",
    link: "/blog/post1",
  },
  {
    image: "/Ui-design-software1.jpg",
    title: "دومین پست وبلاگ",
    description: "این توضیحات دومین پست وبلاگ است.",
    link: "/blog/post2",
  },
  {
    image: "/Ui-design-software1.jpg",
    title: "سومین پست وبلاگ",
    description: "این توضیحات سومین پست وبلاگ است.",
    link: "/blog/post3",
  },
  {
    image: "/Ui-design-software1.jpg",
    title: "چهارمین پست وبلاگ",
    description: "این توضیحات چهارمین پست وبلاگ است.",
    link: "/blog/post4",
  },
  {
    image: "/Ui-design-software1.jpg",
    title: "پنجمین پست وبلاگ",
    description: "این توضیحات پنجمین پست وبلاگ است.",
    link: "/blog/post5",
  },
  {
    image: "/Ui-design-software1.jpg",
    title: "ششمین پست وبلاگ",
    description: "این توضیحات ششمین پست وبلاگ است.",
    link: "/blog/post6",
  },
  {
    image: "/Ui-design-software1.jpg",
    title: "هفتمین پست وبلاگ",
    description: "این توضیحات هفتمین پست وبلاگ است.",
    link: "/blog/post7",
  },
  {
    image: "/Ui-design-software1.jpg",
    title: "هشتمین پست وبلاگ",
    description: "این توضیحات هشتمین پست وبلاگ است.",
    link: "/blog/post8",
  },
  {
    image: "/Ui-design-software1.jpg",
    title: "نهمین پست وبلاگ",
    description: "این توضیحات نهمین پست وبلاگ است.",
    link: "/blog/post9",
  },
  {
    image: "/Ui-design-software1.jpg",
    title: "دهمین پست وبلاگ",
    description: "این توضیحات دهمین پست وبلاگ است.",
    link: "/blog/post10",
  },
];

const BlogList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
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
        <SwiperSlide>
          <img
            src="https://cdn.magloft.com/github/swiper/images/page-001.jpg"
            className="h-48 object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.magloft.com/github/swiper/images/page-002.jpg"
            className="h-48 object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.magloft.com/github/swiper/images/page-003.jpg"
            className="h-48 object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.magloft.com/github/swiper/images/page-004.jpg"
            className="h-48 object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.magloft.com/github/swiper/images/page-005.jpg"
            className="h-48 object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.magloft.com/github/swiper/images/page-006.jpg"
            className="h-48 object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.magloft.com/github/swiper/images/page-007.jpg"
            className="h-48 object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.magloft.com/github/swiper/images/page-008.jpg"
            className="h-48 object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.magloft.com/github/swiper/images/page-009.jpg"
            className="h-48 object-cover rounded-xl"
          />
        </SwiperSlide>
      </Swiper>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-right">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900"
          >
            <Image
              src={blog.image}
              alt={blog.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-white mb-2">
                {blog.title}
              </h3>
              <p className="text-white mb-4">{blog.description}</p>
              <a
                href={blog.link}
                className="inline-block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
              >
                بیشتر بخوانید
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
