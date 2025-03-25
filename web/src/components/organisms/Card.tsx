"use client";

import Link from "next/link";
import { useState } from "react";
import { FavoriteIconFilled, FavoriteIconOutline } from "../atoms/Icons";
import { addFavorite } from "@/app/actions/user/userFavoritArticle";
import { useRouter } from "next/navigation";
import { translateArticleType } from "@/utils/helper";
import { articleSchema } from "@/types/declarations/selectInp";

// Custom article type icons
const ArticleTypeIcons = {
  journalArticle: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 5V19H5V5H19ZM21 3H3V21H21V3ZM17 7H7V9H17V7ZM17 11H7V13H17V11ZM14 15H7V17H14V15Z"
        fill="currentColor"
      />
    </svg>
  ),
  book: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM9 4H11V9L10 8.25L9 9V4ZM18 20H6V4H7V13L10 10.75L13 13V4H18V20Z"
        fill="currentColor"
      />
    </svg>
  ),
  conferencePaper: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 12C16 13.66 14.66 15 13 15C11.34 15 10 13.66 10 12V10H12V12C12 12.55 12.45 13 13 13C13.55 13 14 12.55 14 12V10H16V12ZM13 8V3.5L18.5 9H14C13.45 9 13 8.55 13 8Z"
        fill="currentColor"
      />
    </svg>
  ),
  thesis: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 3C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H5ZM7 7H9V9H7V7ZM11 7H17V9H11V7ZM7 11H9V13H7V11ZM11 11H17V13H11V11ZM7 15H9V17H7V15ZM11 15H17V17H11V15Z"
        fill="currentColor"
      />
    </svg>
  ),
  review: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM6 4H13L18 9V20H6V4ZM9.54 15.65L7.5 13.61L8.91 12.2L9.54 12.83L11.86 10.5L13.27 11.91L9.54 15.65Z"
        fill="currentColor"
      />
    </svg>
  ),
  report: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM6 20V4H13V9H18V20H6ZM9 13V15H15V13H9ZM9 9V11H11V9H9ZM9 17V19H15V17H9Z"
        fill="currentColor"
      />
    </svg>
  ),
  default: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 5V19H5V5H19ZM21 3H3V21H21V3ZM17 7H7V9H17V7ZM17 11H7V13H17V11ZM14 15H7V17H14V15Z"
        fill="currentColor"
      />
    </svg>
  ),
};

// Get gradient color classes based on article type
const getArticleTypeGradient = (type: string) => {
  const gradients = {
    journalArticle: "from-indigo-100 to-indigo-50 text-indigo-700",
    book: "from-green-100 to-green-50 text-green-700",
    conferencePaper: "from-blue-100 to-blue-50 text-blue-700",
    thesis: "from-purple-100 to-purple-50 text-purple-700",
    review: "from-amber-100 to-amber-50 text-amber-700",
    report: "from-rose-100 to-rose-50 text-rose-700",
    default: "from-indigo-100 to-indigo-50 text-indigo-700",
  };

  return gradients[type as keyof typeof gradients] || gradients.default;
};

export const Card = ({
  _id,
  title,
  abstract,
  authors,
  isFavorite: initialFavorite,
  level,
  articleType,
  tags,
  keywords,
  publication,
  publicationYear,
  DOI,
}: Partial<
  articleSchema & {
    isFavorite: boolean;
    level: "Editor" | "Manager" | "Ghost" | "Normal";
  }
>) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteClick = async () => {
    if (!level) {
      router.push("/login");
      return;
    }
    const isAddedFavorite = await addFavorite(_id!);
    if (isAddedFavorite) {
      setIsFavorite(!isFavorite);
    }
  };

  const handleQuery = (queryType: string, title: string) => {
    const query = new URLSearchParams();
    query.append(queryType, title);
    router.push(`/?${query}`);
  };

  // Get article type icon
  const getArticleTypeIcon = (type: string | undefined) => {
    if (!type) return ArticleTypeIcons.default;
    return (
      ArticleTypeIcons[type as keyof typeof ArticleTypeIcons] ||
      ArticleTypeIcons.default
    );
  };

  return (
    <div
      className="group relative h-full w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-2"
      onMouseEnter={() => {
        setIsExpanded(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsExpanded(false);
        setIsHovered(false);
      }}
    >
      {/* Colored top border based on article type */}
      <div
        className={`h-1 w-full bg-gradient-to-r ${getArticleTypeGradient(
          articleType || "default"
        )}`}
      ></div>

      <div className="p-6 space-y-4 flex flex-col h-full">
        {/* Header Section: Article Type and Title */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            {articleType && (
              <div
                dir="rtl"
                className={`flex items-center gap-2 w-fit rounded-full px-3 py-1.5 text-xs font-medium bg-gradient-to-r ${getArticleTypeGradient(
                  articleType
                )}`}
              >
                <span className="transition-all duration-300 transform group-hover:scale-110">
                  {getArticleTypeIcon(articleType)}
                </span>
                <span>{translateArticleType(articleType)}</span>
              </div>
            )}
            <button
              onClick={handleFavoriteClick}
              className="flex-shrink-0 focus:outline-none transform transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label={
                isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
              }
            >
              <div
                className={`transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"
                  }`}
              >
                {isFavorite ? <FavoriteIconFilled /> : <FavoriteIconOutline />}
              </div>
            </button>
          </div>

          <div className="flex items-start justify-between gap-4">
            <h3
              dir="rtl"
              className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600"
            >
              {title}
            </h3>
          </div>

          {/* Publication and Year */}
          <div
            dir="rtl"
            className="flex flex-wrap items-center gap-x-4 text-sm text-gray-600"
          >
            {publication?.title && (
              <div
                onClick={() => handleQuery("publication", publication.title!)}
                className="flex items-center gap-1.5 cursor-pointer transition-colors duration-300 group-hover:text-indigo-500"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>مجله: {publication.title}</span>
              </div>
            )}

            {publicationYear && (
              <div className="flex items-center gap-1.5 transition-colors duration-300 group-hover:text-indigo-500">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>سال انتشار: {publicationYear}</span>
              </div>
            )}

            {DOI && (
              <div className="flex items-center gap-1.5 transition-colors duration-300 group-hover:text-indigo-500">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>DOI: {DOI}</span>
              </div>
            )}
          </div>
        </div>

        {/* Authors Section */}
        {authors && authors.length > 0 && (
          <div dir="rtl" className="flex flex-wrap gap-2 text-sm">
            <span className="font-medium text-gray-700 flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              نویسندگان:
            </span>
            <div className="flex flex-wrap gap-1">
              {authors.map((author, index) => (
                <span
                  key={index}
                  onClick={() => handleQuery("authorIds", author._id!)}
                  className="cursor-pointer bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md transition-all duration-300 hover:bg-indigo-50 hover:border-indigo-100 hover:text-indigo-700"
                >
                  {`${author.first_name} ${author.last_name}`}
                  {index < authors.length - 1 ? "" : ""}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Abstract Section with elegant reveal animation */}
        <div dir="rtl" className="relative prose prose-sm max-w-none">
          <div
            className={`transition-all duration-500 ease-in-out ${isExpanded
              ? "max-h-[500px] opacity-100"
              : "max-h-[4.5em] opacity-90"
              } overflow-hidden`}
          >
            <p className="text-gray-700 leading-relaxed text-justify">
              {abstract}
            </p>
          </div>

          {/* Gradient fade effect */}
          {!isExpanded && abstract && abstract.length > 200 && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          )}

          {/* Expand/collapse indicator */}
          {abstract && abstract.length > 200 && (
            <button
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              <svg
                className={`w-5 h-5 text-indigo-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                  }`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Tags and Keywords Section with improved styling */}
        <div dir="rtl" className="flex flex-wrap gap-y-3 gap-x-6 pt-2">
          {/* Tags Section */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-gray-700 flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                برچسب‌ها:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    onClick={() => handleQuery("tagIds", tag._id!)}
                    className="cursor-pointer bg-indigo-50 text-indigo-600 text-xs px-3 py-1 rounded-full border border-indigo-100 transition-all duration-300 hover:bg-indigo-100 hover:border-indigo-200"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Keywords Section */}
          {keywords && keywords.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-gray-700 flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                کلمات کلیدی:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {keywords.map((keyword, index) => (
                  <span
                    key={index}
                    onClick={() => handleQuery("keywordIds", keyword._id!)}
                    className="cursor-pointer bg-purple-50 text-purple-600 text-xs px-3 py-1 rounded-full border border-purple-100 transition-all duration-300 hover:bg-purple-100 hover:border-purple-200"
                  >
                    #{keyword.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button with improved styling */}
        <div
          dir="rtl"
          className="pt-4 mt-auto text-center border-t border-gray-100"
        >
          <Link
            href={`/article/${_id}`}
            className="inline-flex items-center justify-center w-full px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            مشاهده مقاله کامل
            <svg
              className="w-4 h-4 mr-2 transform transition-transform duration-300 group-hover:-translate-x-1 rtl:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
