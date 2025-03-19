"use client";

import { blogSchema } from "@/types/declarations/selectInp";
import Link from "next/link";
import Image from "next/image";
import { AuthorAvatar } from "@/components/molecules/AuthorAvatar";
import { HeartIcon } from "@/components/molecules/HeartIcon";
import { toggleFavBlog } from "@/app/actions/blog/toggleFavBlog";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const BlogCard = ({
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
            <HeartIcon filled={isFavorite} onClick={handleFavoriteClick} />
            <span className="text-gray-500 text-sm">{blog.favByUsers ? blog.favByUsers.length : 0}</span>
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

