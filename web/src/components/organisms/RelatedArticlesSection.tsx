"use client";

import React, { useRef } from "react";
import { articleSchema } from "@/types/declarations/selectInp";
import Link from "next/link";
import Image from "next/image";

interface RelatedArticlesSectionProps {
  title: string;
  articles: articleSchema[];
  emptyMessage: string;
  bgColor: string;
  iconColor: string;
  valueLabel?: string; // The specific value to display alongside the title (e.g., "انتشارات بهمن")
}

/**
 * RelatedArticlesSection component for displaying a section of related articles
 * Redesigned with a horizontal scrollable layout for a magazine-style, elegant appearance
 */
export const RelatedArticlesSection = ({
  title,
  articles,
  emptyMessage,
  bgColor,
  iconColor,
  valueLabel,
}: RelatedArticlesSectionProps) => {
  // Reference for scroll container to implement custom scroll behaviors
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle scroll with buttons
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef;
      const scrollAmount = container.clientWidth * 0.75; // Scroll 75% of the visible width

      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Section Header - Elegant, minimalist design */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div
            className={`w-1 h-10 rounded-full bg-gradient-to-b ${bgColor} shadow-lg`}
          ></div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center flex-wrap">
              <span className="ml-2">{title}</span>
              {valueLabel && (
                <span className="font-normal text-sm text-gray-500 inline-flex items-center">
                  <span className="mx-2 h-1 w-1 rounded-full bg-gray-300"></span>
                  <span className="text-sm">{valueLabel}</span>
                </span>
              )}
            </h3>
            {articles.length > 0 && (
              <p className="text-sm text-gray-500 mt-1 flex items-center">
                <span className={`inline-block ${iconColor} mr-1 opacity-70`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 01-2-2V5m0 0h-5a2 2 0 00-2 2v13"
                    />
                  </svg>
                </span>
                {articles.length} مقاله یافت شد
              </p>
            )}
          </div>
        </div>

        {/* Scroll Controls - Only show if there are more than visible items */}
        {articles.length > 3 && (
          <div className="flex gap-2">
            <button
              onClick={() => scroll("right")}
              className={`p-2 rounded-full ${iconColor} bg-opacity-5 hover:bg-opacity-15 border border-opacity-10 border-current transition-all duration-300`}
              aria-label="مشاهده قبلی"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll("left")}
              className={`p-2 rounded-full ${iconColor} bg-opacity-5 hover:bg-opacity-15 border border-opacity-10 border-current transition-all duration-300`}
              aria-label="مشاهده بعدی"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Article Cards - Elegant Horizontal Scrollable Row */}
      {articles.length > 0 ? (
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-5 space-x-5 space-x-reverse scrollbar-hide snap-x scroll-pl-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {articles.map((article) => (
            <div
              key={article._id}
              className="flex-none w-[280px] md:w-[320px] snap-start"
            >
              <ElegantArticleCard article={article} accentColor={iconColor} />
            </div>
          ))}

          {/* View All Button - elegant addition at the end of the row */}
          <div className="flex-none w-[200px] flex items-center justify-center snap-start pl-4">
            <Link
              href={`/search?${
                title === "از همین انتشارات"
                  ? "publication"
                  : title === "از همین نویسندگان"
                  ? "authorIds"
                  : title === "با همین برچسب‌ها"
                  ? "tagIds"
                  : "keywordIds"
              }=${articles[0]?._id || ""}`}
              className={`group flex flex-col items-center justify-center h-48 w-full rounded-xl ${iconColor} bg-opacity-5 hover:bg-opacity-10 border border-current border-opacity-10 hover:border-opacity-20 transition-all duration-300`}
            >
              <span className={`${iconColor} opacity-80 mb-3`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <span className={`${iconColor} font-semibold text-sm`}>
                مشاهده همه
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
          <div className="mb-3 opacity-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

/**
 * ElegantArticleCard - A refined, minimalist card design for related articles
 * Designed to create a visual harmony and enhance readability
 */
const ElegantArticleCard = ({
  article,
  accentColor,
}: {
  article: articleSchema;
  accentColor: string;
}) => {
  return (
    <Link href={`/article/${article._id}`} className="group block h-full">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 h-full flex flex-col transform group-hover:translate-y-[-4px] border border-gray-100">
        {/* Image Section with gradient overlay for better text contrast */}
        <div className="relative h-40 w-full overflow-hidden">
          {article.avatar ? (
            <div className="relative h-full w-full">
              <Image
                src="/images/default-article.jpg"
                alt={article.title}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                width={400}
                height={160}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70"></div>
            </div>
          ) : (
            <div className="h-full w-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 group-hover:scale-[1.03] transition-transform duration-700">
              <div className="h-full w-full flex items-center justify-center bg-[url('/patterns/circuit-board.svg')] bg-opacity-10">
                <svg
                  className="w-10 h-10 text-white opacity-80"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Article type badge - more elegant and subtle */}
          {article.articleType && (
            <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-md">
              {article.articleType}
            </div>
          )}

          {/* Publication year badge if available */}
          {article.publicationYear && (
            <div className="absolute top-3 left-3 px-2 py-0.5 bg-white/80 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-md">
              {article.publicationYear}
            </div>
          )}
        </div>

        {/* Content Section - refined typography and spacing */}
        <div className="p-4 flex-grow flex flex-col">
          <h4 className="text-base font-bold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300 min-h-[3rem]">
            {article.title}
          </h4>

          {/* Authors if available - with refined styling */}
          {article.authors && article.authors.length > 0 && (
            <p className="text-xs text-gray-500 mt-2 line-clamp-1 flex items-center">
              <svg
                className="w-3 h-3 ml-1 inline-block opacity-60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {article.authors
                .map((author) => `${author.first_name} ${author.last_name}`)
                .join("، ")}
            </p>
          )}

          {/* View Article button - subtle and elegant */}
          <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
            <span
              className={`${accentColor} text-sm font-medium transition-all duration-300 inline-flex items-center opacity-80 group-hover:opacity-100`}
            >
              مشاهده مقاله
              <svg
                className="w-4 h-4 mr-1 transform transition-transform duration-300 group-hover:translate-x-[-4px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </span>

            {/* Publication icon if available */}
            {article.publication && (
              <div className="px-2 py-1 bg-indigo-50 rounded-md text-xs text-indigo-700 flex items-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-3 h-3 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 01-2-2V5a2 2 0 00-2-2h-5M19 20h-2a2 2 0 01-2-2v-5m2 0H9a2 2 0 00-2 2v5a2 2 0 002 2h10"
                  ></path>
                </svg>
                انتشارات
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

// Add CSS for scrollbar hiding and snap scrolling
const scrollbarHideStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  /* Add smooth scroll behavior */
  .snap-x {
    scroll-snap-type: x mandatory;
  }
  .snap-start {
    scroll-snap-align: start;
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleEl = document.createElement("style");
  styleEl.textContent = scrollbarHideStyles;
  document.head.appendChild(styleEl);
}

export default RelatedArticlesSection;
