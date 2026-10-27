"use client";

import { blogSchema } from "@/types/declarations/selectInp";
import Link from "next/link";
import Image from "next/image";
import { HeartIcon } from "@/components/molecules/HeartIcon";
import { toggleFavBlog } from "@/app/actions/blog/toggleFavBlog";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface NewBlogCardProps {
  blog: blogSchema;
  lesanUrl: string;
  isLiked: boolean;
  isLogedIn: boolean;
}

const metaText = "text-[14px] font-semibold leading-[1.5] text-black lg:text-[16px]";

export const NewBlogCard = ({
  blog,
  lesanUrl,
  isLiked,
  isLogedIn,
}: NewBlogCardProps) => {
  const [isFavorite, setIsFavorite] = useState(isLiked);
  const router = useRouter();

  const handleFavoriteClick = async () => {
    if (!isLogedIn) {
      router.push("/login");
      return;
    }
    const isAddedFavorite = await toggleFavBlog({
      set: { blogId: blog._id! },
      get: {},
    });
    if (isAddedFavorite.success) {
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <Link href={`/blog/${blog._id}`} className="block h-full w-full">
      <div className="group flex h-full w-full cursor-pointer flex-col" dir="rtl">
        {/* Image */}
        <div className="relative h-[220px] w-full overflow-hidden rounded-[20px] bg-[#F8F8F9] sm:h-[260px] lg:h-[300px]">
          <Image
            src={`${lesanUrl}/uploads/images/${blog.pic?.name || "placeholder.jpg"}`}
            alt={blog.title}
            fill
            sizes="(max-width: 1024px) 100vw, 443px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Favorite overlay */}
          <div className="absolute left-4 top-4 z-10">
            <button
              type="button"
              aria-label="افزودن به علاقه‌مندی‌ها"
              onClick={(e) => {
                e.preventDefault();
                handleFavoriteClick();
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
            >
              <HeartIcon filled={isFavorite} onClick={() => {}} />
            </button>
          </div>
        </div>

        {/* Content — title, abstract, then metadata (as in the design) */}
        <div className="mt-5 flex flex-1 flex-col lg:mt-[30px]">
          <h3 className="line-clamp-2 text-[19px] font-bold leading-[1.55] text-black transition-colors group-hover:text-[#08A6AE] lg:text-[22px]">
            {blog.title}
          </h3>

          <p className="mt-3 line-clamp-2 text-[14px] font-normal leading-[1.75] text-[#9A9AA1] lg:mt-4 lg:text-[16px]">
            {blog.abstract}
          </p>

          <div className="mt-5 flex flex-row flex-wrap items-center gap-x-[18px] gap-y-2 lg:mt-auto lg:gap-x-[21px] lg:pt-7">
            {/* Author */}
            <div className="flex flex-row items-center gap-1.5">
              <span className={metaText}>
                {blog.author?.first_name} {blog.author?.last_name}
              </span>
              <Image src="/images/blog/author-icon.svg" alt="" width={22} height={22} />
            </div>

            {/* Category */}
            {blog.categories && blog.categories.length > 0 && (
              <div className="flex flex-row items-center gap-1.5">
                <span className={metaText}>{blog.categories[0].name}</span>
                <Image src="/images/blog/category-icon.svg" alt="" width={22} height={22} />
              </div>
            )}

            {/* Date */}
            <div className="flex flex-row items-center gap-1.5">
              <span className={metaText}>
                {new Date(blog.createdAt || Date.now()).toLocaleDateString("fa-IR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <Image src="/images/blog/date-icon.svg" alt="" width={22} height={22} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
