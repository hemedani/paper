"use client";

import Link from "next/link";
import { useState } from "react";
import { FavoriteIconFilled, FavoriteIconOutline } from "../atoms/Icons";
import { addFavorite } from "@/app/actions/user/userFavoritArticle";
import { useRouter } from "next/navigation";
import { translateArticleType } from "@/utils/helper";
import { articleSchema } from "@/types/declarations/selectInp";

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
}: Partial<articleSchema & {
  isFavorite: boolean;
  level: "Editor" | "Manager" | "Ghost";
}>) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

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


  return (
    <div
      className="group relative w-full max-w-xl mx-auto my-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="p-6 space-y-4">
        {/* Header Section: Article Type and Title */}
        <div className="flex flex-col gap-2">
          {articleType && (
            <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium w-fit transition-all duration-300 group-hover:bg-indigo-200">
              {translateArticleType(articleType)}
            </span>
          )}
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600">
              {title}
            </h3>
            <button
              onClick={handleFavoriteClick}
              className="flex-shrink-0 focus:outline-none transform transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label={isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
            >
              {isFavorite ? <FavoriteIconFilled /> : <FavoriteIconOutline />}
            </button>
          </div>
          {publication?.title && (
            <p
              onClick={() => handleQuery("publication", publication.title!)}
              className="cursor-pointer text-sm text-gray-600 transition-colors duration-300 group-hover:text-indigo-500">
              مجله: {publication.title}
            </p>
          )}
        </div>

        {/* Authors Section */}
        {authors && authors.length > 0 && (
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            <span className="font-medium">نویسندگان:</span>
            {authors.map((author, index) => (
              <span
                key={index}
                onClick={() => handleQuery("authorIds", author._id!)}
                className="cursor-pointer bg-gray-100 pl-1 rounded-md transition-all duration-300 group-hover:bg-indigo-50 group-hover:text-indigo-700"
              >
                {`${author.first_name} ${author.last_name}`}
                {index < authors.length - 1 ? "، " : ""}
              </span>
            ))}
          </div>
        )}

        {/* Abstract Section */}
        <div
          className={`prose prose-sm max-w-none transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[500px]" : "max-h-[4.5em]"
            } overflow-hidden`}
        >
          <p className="text-gray-700 leading-relaxed text-justify">{abstract}</p>
        </div>

        {/* Tags Section */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="font-medium">برچسب ها:</span>
            {tags.map((tag, index) => (
              <span
                key={index}
                onClick={() => handleQuery("tagIds", tag._id!)}
                className="cursor-pointer bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full transition-all duration-300 group-hover:bg-indigo-50 group-hover:text-indigo-600"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Tags Section */}
        {keywords && keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="font-medium">کلمات کلیدی : </span>
            {keywords.map((keyword, index) => (
              <span
                key={index}
                onClick={() => handleQuery("keywordIds", keyword._id!)}
                className="cursor-pointer bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full transition-all duration-300 group-hover:bg-indigo-50 group-hover:text-indigo-600"
              >
                #{keyword.name}
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div className="pt-4 text-center border-t border-gray-100">
          <Link
            href={`/article/${_id}`}
            className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-all duration-300"
          >
            مشاهده مقاله کامل
            <svg
              className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 5l-7 7 7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
