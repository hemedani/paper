"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../atoms/Input";
import { DefaultSearchArrayValues } from "@/utils/prepareArtticleSearch";
import Image from "next/image";
import AdvancedSearchModal from "../molecules/AdvancedSearchModal";
import { HashtagIcon, KeyIcon } from "../atoms/Icons";
import { LandingStats } from "./LandingStats";

type SearchFormValues = {
  query: string;
};

export type LandingTerm = {
  _id?: string;
  name?: string;
  articleCount?: number;
};

export type LandingHighlights = {
  keywords?: LandingTerm[];
  tags?: LandingTerm[];
  stats?: {
    keywords?: number;
    tags?: number;
    articles?: number;
  };
};

export const Hero: React.FC<{
  defaultSearchArrayValues: DefaultSearchArrayValues;
  pageAddress?: string;
  /** Hide the headline when a page already renders its own (e.g. /graph). */
  compact?: boolean;
  highlights?: LandingHighlights;
}> = ({ defaultSearchArrayValues, pageAddress, compact = false, highlights }) => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const router = useRouter();
  const { control, handleSubmit } = useForm<SearchFormValues>({
    defaultValues: { query: "" },
  });

  const onSubmit: SubmitHandler<SearchFormValues> = ({ query }) => {
    if (!query.trim()) return;
    router.push(pageAddress ? `${pageAddress}/?search=${query}` : `/?search=${query}`);
  };

  const keywords = highlights?.keywords ?? [];
  const tags = highlights?.tags ?? [];
  const hasTerms = keywords.length > 0 || tags.length > 0;
  const hasStats =
    highlights?.stats?.keywords !== undefined ||
    highlights?.stats?.tags !== undefined ||
    highlights?.stats?.articles !== undefined;

  const handleTermClick = (key: "keywordIds" | "tagIds", id?: string) => {
    if (!id) return;
    router.push(`/?${key}=${id}`);
  };

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

      {/* Popular terms + stats */}
      {(hasTerms || hasStats) && (
        <div className="relative z-10 mx-auto mt-10 w-full max-w-[1600px] px-4 pb-16 md:mt-[74px] lg:mt-[102px] lg:px-[104px] lg:pb-[66px]">
          {hasTerms && (
            <div className="flex w-full flex-col items-start gap-7 sm:flex-row sm:items-start sm:justify-center sm:gap-8 lg:gap-10">
              {keywords.length > 0 && (
                <div className="flex w-full max-w-[440px] flex-col items-start gap-3 sm:w-auto">
                  <h3 className="text-[15px] font-bold text-white/80 lg:text-[17px]">
                    محبوب‌ترین کلمات کلیدی
                  </h3>
                  <div className="flex flex-wrap items-start gap-2">
                    {keywords.map((keyword) => (
                      <button
                        key={keyword._id}
                        type="button"
                        onClick={() => handleTermClick("keywordIds", keyword._id)}
                        className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#08A6AE] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#088f96] lg:h-11 lg:px-5 lg:text-[15px]"
                      >
                        <KeyIcon className="h-4 w-4 shrink-0" />
                        {keyword.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {tags.length > 0 && (
                <div className="flex w-full max-w-[440px] flex-col items-start gap-3 sm:w-auto">
                  <h3 className="text-[15px] font-bold text-white/80 lg:text-[17px]">
                    محبوب‌ترین برچسب‌ها
                  </h3>
                  <div className="flex flex-wrap items-start gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag._id}
                        type="button"
                        onClick={() => handleTermClick("tagIds", tag._id)}
                        className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/30 bg-white/10 px-4 text-[13px] font-semibold text-white transition-colors hover:bg-white/20 lg:h-11 lg:px-5 lg:text-[15px]"
                      >
                        <HashtagIcon className="h-4 w-4 shrink-0" />
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {hasStats && (
            <div className={`flex justify-center ${hasTerms ? "mt-8" : ""}`}>
              <LandingStats stats={highlights?.stats} />
            </div>
          )}
        </div>
      )}

      <AdvancedSearchModal
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
        defaultSearchArrayValues={defaultSearchArrayValues}
        pageAddress={pageAddress}
      />
    </section>
  );
};
