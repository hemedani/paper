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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 dir-rtl">

      {/* Main Content Section */}
    </div>
  );
};
