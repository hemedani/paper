"use client";

import { toggleFavBlog } from "@/app/actions/blog/toggleFavBlog";
import { Badge } from "@/components/molecules/Badge";
import { HeartIcon } from "@/components/molecules/HeartIcon";
import { blogSchema } from "@/types/declarations/selectInp";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


// Featured blog card for the swiper
export const FeaturedBlogCard = ({
  blog,
  lesanUrl,
  isLiked,
  isLogedIn,
}: {
  blog: blogSchema;
  lesanUrl: string;
  isLiked: boolean;
  isLogedIn: boolean;
}) => {

  const [isFavorite, setIsFavorite] = useState(isLiked);
  const router = useRouter();

  const handleFavoriteClick = async () => {
    if (!isLogedIn) {
      router.push("/login");
      return;
    }
    const isAddedFavorite = await toggleFavBlog({ set: { blogId: blog._id! }, get: {} });
    if (isAddedFavorite.success) {
      setIsFavorite(!isFavorite);
    }
  };

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
              <HeartIcon filled={isFavorite} onClick={handleFavoriteClick} size="large" />
              <span className="text-white text-sm">{blog.favByUsers ? blog.favByUsers.length : 0} لایک</span>
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
