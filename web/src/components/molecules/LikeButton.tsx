"use client";

import Image from "next/image";
import { useState } from "react";
import { toggleFavBlog } from "@/app/actions/blog/toggleFavBlog";

interface LikeButtonProps {
  blogId: string;
  initialIsLiked: boolean;
  isLoggedIn: boolean;
  className?: string;
}

export const LikeButton = ({
  blogId,
  initialIsLiked,
  isLoggedIn,
  className = "",
}: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (!isLoggedIn) {
      alert("برای پسندیدن مقاله باید وارد حساب کاربری خود شوید");
      return;
    }

    setIsLoading(true);
    try {
      const result = await toggleFavBlog({
        set: { blogId },
        get: {},
      });

      if (result.success) {
        setIsLiked(!isLiked);
      } else {
        alert("خطا در انجام عملیات");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      alert("خطا در انجام عملیات");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={`flex h-12 items-center gap-2 rounded-full px-4 transition-colors hover:bg-[#F8F8F9] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <Image
        src="/images/blog/heart-icon.svg"
        alt="پسندیدن"
        width={22}
        height={22}
        className={isLiked ? "filter-primary" : ""}
      />
      <span className="text-[14px] font-semibold text-black lg:text-[15px]">
        {isLiked ? "پسندیده شده" : "پسندیدن این مقاله"}
      </span>
    </button>
  );
};
