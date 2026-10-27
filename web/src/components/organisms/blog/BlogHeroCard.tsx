"use client";

import { blogSchema } from "@/types/declarations/selectInp";
import Link from "next/link";
import Image from "next/image";
import { HeartIcon } from "@/components/molecules/HeartIcon";
import { toggleFavBlog } from "@/app/actions/blog/toggleFavBlog";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface BlogHeroCardProps {
  blog: blogSchema;
  lesanUrl: string;
  isLiked: boolean;
  isLogedIn: boolean;
}

export const BlogHeroCard = ({
  blog,
  lesanUrl,
  isLiked,
  isLogedIn,
}: BlogHeroCardProps) => {
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
    <div
      className="mx-auto mb-16 flex w-full max-w-[1242px] flex-col-reverse items-center gap-8 lg:flex-row lg:items-center lg:gap-[68px]"
      dir="rtl"
    >
      {/* Content Section - Right side in RTL */}
      <div className="flex w-full flex-col items-end gap-7 lg:w-[486px]">
        {/* Metadata Row */}
        <div className="flex flex-row flex-wrap items-center gap-x-[21px] gap-y-2">
          {/* Author */}
          <div className="flex flex-row items-center gap-1.5">
            <span className="text-[18px] font-semibold leading-[1.33] text-right text-black">
              {blog.author?.first_name} {blog.author?.last_name}
            </span>
            <Image
              src="/images/blog/author-icon.svg"
              alt="Author"
              width={24}
              height={24}
            />
          </div>

          {/* Category */}
          {blog.categories && blog.categories.length > 0 && (
            <div className="flex flex-row items-center gap-1.5">
              <span className="text-[18px] font-semibold leading-[1.33] text-right text-black">
                {blog.categories[0].name}
              </span>
              <Image
                src="/images/blog/category-icon.svg"
                alt="Category"
                width={24}
                height={24}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col items-end self-stretch gap-6">
          {/* Title */}
          <h2 className="w-full text-[26px] font-bold leading-[1.35] text-right text-black lg:text-[36px]">
            {blog.title}
          </h2>

          {/* Description */}
          <p className="line-clamp-4 w-full text-[15px] font-normal leading-[1.7] text-right text-[#9A9AA1] lg:text-[18px]">
            {blog.abstract || blog.subtitle}
          </p>
        </div>

        {/* View Article Button */}
        <Link
          href={`/blog/${blog._id}`}
          className="group flex h-[64px] items-center justify-center gap-2.5 rounded-[20px] border border-[#F0F0F2] bg-white px-8 transition-all hover:border-[#08A6AE] hover:bg-[#EDFEFF] lg:h-[72px] lg:w-[272px] lg:px-0"
        >
          <Image
            src="/images/blog/arrow-right-icon.svg"
            alt=""
            width={24}
            height={24}
            className="transition-transform group-hover:translate-x-1"
          />
          <span className="text-[15px] font-semibold leading-[1.76] text-black transition-colors group-hover:text-[#08A6AE] lg:text-[16px]">
            مشاهده کامل مقاله
          </span>
        </Link>
      </div>

      {/* Image Section - Left side in RTL */}
      <div className="relative h-[240px] w-full overflow-hidden rounded-[20px] bg-[#F8F8F9] sm:h-[320px] lg:h-[428px] lg:w-[688px]">
        <Image
          src={`${lesanUrl}/uploads/images/${blog.pic?.name || "placeholder.jpg"}`}
          alt={blog.title}
          fill
          sizes="(max-width: 1024px) 100vw, 688px"
          className="object-cover"
          priority
        />

        {/* Favorite Button Overlay */}
        <div className="absolute top-6 left-6 z-10">
          <button
            onClick={handleFavoriteClick}
            className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <HeartIcon filled={isFavorite} onClick={() => {}} />
          </button>
        </div>
      </div>
    </div>
  );
};
