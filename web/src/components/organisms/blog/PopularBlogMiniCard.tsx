"use client";

import { blogSchema } from "@/types/declarations/selectInp";
import Link from "next/link";
import Image from "next/image";

interface PopularBlogMiniCardProps {
  blog: blogSchema;
  lesanUrl: string;
}

const metaText = "text-[13px] font-semibold leading-[1.5] text-black lg:text-[16px]";

export const PopularBlogMiniCard = ({
  blog,
  lesanUrl,
}: PopularBlogMiniCardProps) => {
  return (
    <Link href={`/blog/${blog._id}`} className="block w-full">
      <div className="group flex w-full cursor-pointer flex-row items-start gap-4 lg:gap-5" dir="rtl">
        {/* Image — right side in RTL, as in the design */}
        <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[16px] bg-[#F8F8F9] lg:h-[116px] lg:w-[116px] lg:rounded-[20px]">
          <Image
            src={`${lesanUrl}/uploads/images/${blog.pic?.name || "placeholder.jpg"}`}
            alt={blog.title}
            fill
            sizes="116px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Text */}
        <div className="flex min-w-0 flex-1 flex-col items-end gap-3 lg:gap-5">
          <h4 className="line-clamp-2 text-right text-[15px] font-bold leading-[1.55] text-black transition-colors group-hover:text-[#08A6AE] lg:text-[20px]">
            {blog.title}
          </h4>

          <div className="flex flex-row flex-wrap items-center justify-end gap-x-3 gap-y-1.5 lg:gap-x-[21px]">
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
          </div>
        </div>
      </div>
    </Link>
  );
};
