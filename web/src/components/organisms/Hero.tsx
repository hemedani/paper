"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../atoms/Input";
import { DefaultSearchArrayValues } from "@/utils/prepareArtticleSearch";
import Image from "next/image";
import AdvancedSearchModal from "../molecules/AdvancedSearchModal";

type SearchFormValues = {
  query: string;
};

export const Hero: React.FC<{
  defaultSearchArrayValues: DefaultSearchArrayValues;
  pageAddress?: string;
  /** Hide the headline when a page already renders its own (e.g. /graph). */
  compact?: boolean;
}> = ({ defaultSearchArrayValues, pageAddress, compact = false }) => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const router = useRouter();
  const { control, handleSubmit } = useForm<SearchFormValues>({
    defaultValues: { query: "" },
  });

  const onSubmit: SubmitHandler<SearchFormValues> = ({ query }) => {
    if (!query.trim()) return;
    router.push(pageAddress ? `${pageAddress}/?search=${query}` : `/?search=${query}`);
  };

  const trendingSearches = [
    ["فروشگاه برتر", "خرید آمازون", "پرینتر سه بعدی", "فروشگاه برتر"],
    ["فروشگاه برتر", "خرید آمازون", "راهنمای خرید"],
  ];

  return (
    <section
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#0FB5BE]"
      style={{
        backgroundImage: "linear-gradient(to bottom left, #3DB4BA 0%, #00B5BE 100%)",
      }}
    >
      {/* Subtle pattern overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
        <Image src="/images/hero/hero-pattern.svg" alt="" fill className="object-cover" priority />
      </div>

      {/* Content */}
      <div
        className={[
          "relative z-10 mx-auto flex w-full max-w-[1600px] flex-col items-center px-4",
          "pt-[132px] lg:pt-[184px]",
        ].join(" ")}
      >
        {/* Headline */}
        {!compact && (
          <div className="mb-6 flex w-full max-w-[700px] flex-col items-center gap-4 text-center md:mb-[26px]">
            <h1 className="text-[30px] font-extrabold leading-[1.34] text-white sm:text-[40px] lg:text-[54px]">
              مقالات مرتبط را در یک
              <br />
              نمودار بصری کاوش کنید
            </h1>
            <p className="text-[15px] font-semibold leading-[1.76] text-white sm:text-[18px]">
              بانک جامع مقالات معماری و شهرسازی بر اساس جستجوی پیشرفته ای
            </p>
          </div>
        )}

        {/* Search row — input first (rightmost in RTL), then gold, then dark */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-3 w-full max-w-[707px]"
          role="search"
        >
          <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-[18px]">
            <div className="order-2 flex h-[60px] w-full items-center gap-3 rounded-[18px] bg-white px-5 md:order-1 md:h-[68px] md:w-auto md:flex-1">
              <Input
                name="query"
                control={control}
                placeholder="جستجو کنید ..."
                aria-label="جستجوی مقالات"
                variant="bare"
                className="w-full flex-1"
              />
              <Image src="/images/hero/search-icon.svg" alt="" width={24} height={24} />
            </div>

            <div className="order-1 flex gap-3 md:order-2">
              <button
                type="submit"
                className="h-[60px] flex-1 rounded-[18px] bg-[#D2A634] px-9 text-[15px] font-semibold text-white transition-colors hover:bg-[#bd9429] md:h-[68px] md:flex-none md:text-[16px]"
              >
                جستجو
              </button>

              <button
                type="button"
                onClick={() => setShowAdvancedSearch(true)}
                aria-haspopup="dialog"
                className="flex h-[60px] flex-1 items-center justify-center gap-[10px] rounded-[18px] bg-black px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#1c1c1c] md:h-[68px] md:flex-none md:px-7 md:text-[16px]"
              >
                <span className="hidden sm:inline">جستجوی پیشرفته</span>
                <span className="sm:hidden">پیشرفته</span>
                <Image src="/images/hero/filter-icon.svg" alt="" width={22} height={22} />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Stats + trending */}
      <div className="relative z-10 mx-auto mt-10 w-full max-w-[1600px] px-4 pb-16 md:mt-[74px] lg:mt-[102px] lg:px-[104px] lg:pb-[66px]">
        <div className="flex flex-col-reverse items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-[88px]">
          {/* Trending searches (right in the design) */}
          <div className="flex w-full flex-col items-center gap-3 lg:order-1 lg:w-auto lg:max-w-[600px] lg:items-end">
            <h3 className="text-[15px] font-bold leading-[1.78] text-white lg:text-[18px]">
              جستجو ها ترند محبوب این ماه
            </h3>
            <div className="flex flex-col items-center gap-2 lg:items-end">
              {trendingSearches.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-wrap justify-center gap-1 lg:justify-end">
                  {row.map((tag, tagIndex) => (
                    <button
                      key={tagIndex}
                      type="button"
                      onClick={() => router.push(`/?search=${encodeURIComponent(tag)}`)}
                      className="h-10 whitespace-nowrap rounded-full bg-[#08A6AE] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#088f96] md:h-12 md:px-[26px] md:text-[14px]"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Stats (left in the design) — label on the right, number on the left */}
          <div className="flex w-full flex-col items-start gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-[59px] lg:order-2 lg:gap-[51px]">
            <div className="flex items-center gap-4 text-white lg:gap-[26px]">
              <div className="whitespace-nowrap text-right text-[13px] font-bold leading-[1.67] tracking-[-0.03em] lg:text-[18px]">
                موضوعات کلیدی
                <br />
                دسته بندی
              </div>
              <div className="text-[38px] font-extrabold leading-[1.23] tracking-[-0.02em] lg:text-[58px]">
                +۶۵۰
              </div>
            </div>
            <div className="flex items-center gap-4 text-white lg:gap-[26px]">
              <div className="whitespace-nowrap text-right text-[13px] font-bold leading-[1.67] tracking-[-0.03em] lg:text-[18px]">
                تعداد کل مقالات
                <br />
                منتشر شده
              </div>
              <div className="text-[38px] font-extrabold leading-[1.23] tracking-[-0.02em] lg:text-[58px]">
                +۷۰۰
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdvancedSearchModal
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
        defaultSearchArrayValues={defaultSearchArrayValues}
        pageAddress={pageAddress}
      />
    </section>
  );
};
