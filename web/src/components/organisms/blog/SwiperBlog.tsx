"use client";

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
import { FeaturedBlogCard } from "./FeatureBlogCard";



export const SwiperBlog = ({
  swiperBlogPosts,
  isLogedIn,
  likedPosts,
  lesanUrl
}: {
  swiperBlogPosts: blogSchema[];
  isLogedIn: boolean,
  likedPosts: Set<string>,
  lesanUrl: string
}) => {
  return (
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
          renderBullet: function(className) {
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
        className="w-full h-[70vh] md:h-[75vh] lg:h-[80vh] overflow-hidden shadow-2xl rounded-[2.5rem]"
      >
        {swiperBlogPosts.map((blog) => (
          <SwiperSlide key={blog._id}>
            <FeaturedBlogCard
              blog={blog}
              lesanUrl={lesanUrl}
              isLiked={likedPosts.has(blog._id!)}
              isLogedIn={isLogedIn}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>

  )
}
