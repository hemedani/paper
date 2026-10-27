"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { categorySchema } from "@/types/declarations/selectInp";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import AdvancedSearchModal from "@/components/molecules/AdvancedSearchModal";

const searchFilterSchema = z.object({
  search: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

type SearchFilterFormValues = z.infer<typeof searchFilterSchema>;

interface NewBlogSearchFilterProps {
  categories: categorySchema[];
  pageAddress: string;
  defaultSearch?: string;
  defaultCategories?: string[];
}

export const NewBlogSearchFilter = ({
  categories,
  pageAddress,
  defaultSearch = "",
  defaultCategories = [],
}: NewBlogSearchFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { register, handleSubmit, setValue, watch, formState } = useForm<SearchFilterFormValues>({
    resolver: zodResolver(searchFilterSchema),
    defaultValues: {
      search: defaultSearch || searchParams.get("search") || "",
      categories:
        defaultCategories.length > 0
          ? defaultCategories
          : (searchParams.get("categories")?.split(",").filter(Boolean) ?? []),
    },
  });
  const { isSubmitting } = formState;

  const selectedCategories = watch("categories") || [];

  const onSubmit: SubmitHandler<SearchFilterFormValues> = (data) => {
    const params = new URLSearchParams();
    if (data.search?.trim()) params.append("search", data.search.trim());
    if (data.categories?.length) params.append("categories", data.categories.join(","));
    const queryString = params.toString();
    router.push(queryString ? `${pageAddress}?${queryString}` : pageAddress);
  };

  const toggleCategory = (categoryId: string) => {
    const next = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    setValue("categories", next);
    const params = new URLSearchParams();
    const search = watch("search");
    if (search?.trim()) params.append("search", search.trim());
    if (next.length) params.append("categories", next.join(","));
    const queryString = params.toString();
    router.push(queryString ? `${pageAddress}?${queryString}` : pageAddress);
  };

  return (
    <div className="mx-auto w-full max-w-[800px]" dir="rtl">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 lg:gap-9">
        {/* Page title */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-[30px] font-extrabold leading-[1.2] text-black sm:text-[40px] lg:text-[48px]">
            مقالات و دیدگاه‌ها
          </h1>
          <p className="max-w-[560px] text-[14px] font-medium leading-[1.8] text-[#9A9AA1] sm:text-[16px]">
            آخرین مقالات، دیدگاه‌ها و اخبار ما را در این بخش مطالعه کنید. به‌روز باشید و از جدیدترین
            تحولات آگاه شوید.
          </p>
        </div>

        {/* Search row: input (right) · teal submit · black advanced */}
        <div className="flex w-full flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-[14px]">
          <div className="order-2 flex h-[60px] flex-1 flex-row items-center gap-3 rounded-[18px] border border-[#F0F0F2] bg-white px-5 md:order-1 md:h-[68px]">
            <input
              type="text"
              {...register("search")}
              placeholder="جستجو کنید ..."
              aria-label="جستجو در مقالات وبلاگ"
              className="h-full w-full min-w-0 bg-transparent text-[15px] font-medium text-black outline-none placeholder:text-[#9A9AA1] md:text-[16px]"
            />
            <Image src="/images/blog/search-icon.svg" alt="" width={24} height={24} />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="order-1 h-[60px] shrink-0 rounded-[18px] bg-[#08A6AE] px-8 text-[15px] font-semibold text-white transition-colors hover:bg-[#0895a0] disabled:cursor-not-allowed disabled:opacity-60 md:order-2 md:h-[68px] md:w-[140px] md:text-[16px]"
          >
            {isSubmitting ? "..." : "جستجو"}
          </button>

          <button
            type="button"
            onClick={() => setShowAdvanced(true)}
            aria-haspopup="dialog"
            className="order-1 flex h-[60px] shrink-0 items-center justify-center gap-[10px] rounded-[18px] bg-black px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#1c1c1c] md:order-3 md:h-[68px] md:w-[226px] md:text-[16px]"
          >
            <span className="whitespace-nowrap">جستجوی پیشرفته</span>
            <Image src="/images/blog/search-advanced-icon.svg" alt="" width={22} height={22} />
          </button>
        </div>

        {/* Categories */}
        <div className="flex w-full flex-col items-end gap-4">
          <div className="flex flex-row items-center gap-2">
            <Image src="/images/blog/category-icon.svg" alt="" width={22} height={22} />
            <h3 className="text-[16px] font-bold leading-[1.7] text-black sm:text-[18px]">
              دسته‌بندی
            </h3>
          </div>

          <div className="flex w-full flex-row flex-wrap items-center justify-end gap-[9px]">
            {categories.map((category) => {
              const isActive = selectedCategories.includes(category._id!);
              return (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => toggleCategory(category._id!)}
                  aria-pressed={isActive}
                  className={[
                    "flex h-11 items-center justify-center whitespace-nowrap rounded-[360px] border px-[24px] text-[13px] font-medium transition-colors sm:h-12 sm:text-[15px]",
                    isActive
                      ? "border-[#08A6AE] bg-[#EDFEFF] text-[#08A6AE]"
                      : "border-[#F0F0F2] bg-white text-black hover:border-[#08A6AE]/50",
                  ].join(" ")}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </form>

      <AdvancedSearchModal
        isOpen={showAdvanced}
        onClose={() => setShowAdvanced(false)}
        defaultSearchArrayValues={{ tags: [], authors: [], keywords: [] }}
      />
    </div>
  );
};
