"use client";

import { blogSchema } from "@/types/declarations/selectInp";
import { HeartIcon } from "@/components/molecules/HeartIcon";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toggleFavBlog } from "@/app/actions/blog/toggleFavBlog";
import { useState } from "react";

export const PopularBlogCard = ({
  blog,
  lesanUrl,
  isLiked,
  isLogedIn
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
            <HeartIcon filled={isFavorite} onClick={handleFavoriteClick} size="small" />
            <span className="text-gray-500 text-xs">{blog.favByUsers ? blog.favByUsers.length : 0}</span>
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
