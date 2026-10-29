"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HashtagIcon } from "@/components/atoms/Icons";

interface HashtagPillsProps {
  tags: string[];
}

export const HashtagPills = ({ tags }: HashtagPillsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleTagClick = (tag: string) => {
    const newSelectedTag = tag === selectedTag ? null : tag;
    setSelectedTag(newSelectedTag);

    // Navigate to filtered results
    if (newSelectedTag) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", newSelectedTag);
      router.push(`/blog?${params.toString()}`);
    } else {
      router.push("/blog");
    }
  };

  return (
    <div
      className="flex w-full flex-row flex-wrap items-center justify-end gap-[9px]"
      dir="rtl"
    >
      {tags.map((tag, index) => {
        const isActive = selectedTag === tag;
        return (
          <button
            key={`${tag}-${index}`}
            type="button"
            onClick={() => handleTagClick(tag)}
            aria-pressed={isActive}
            className={[
              "flex h-10 items-center justify-center gap-1.5 rounded-[360px] border px-[18px] transition-colors lg:h-12 lg:px-[26px]",
              isActive
                ? "border-[#08A6AE] bg-[#EDFEFF] text-[#08A6AE]"
                : "border-[#F0F0F2] bg-white text-black hover:border-[#08A6AE]",
            ].join(" ")}
          >
            <HashtagIcon className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap text-[13px] font-medium leading-[1.5] lg:text-[15px]">
              {tag}
            </span>
          </button>
        );
      })}
    </div>
  );
};
