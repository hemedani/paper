"use client";

import Image from "next/image";
import Link from "next/link";
import { articleSchema } from "@/types/declarations/selectInp";
import { translateArticleType } from "@/utils/helper";
import { formatDate } from "@/utils/formatters";

interface ArticleCardProps {
  article: articleSchema;
}

/**
 * ArticleCard component for displaying article information in a card format
 * Used in various article listing components
 */
export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link href={`/article/${article._id}`} passHref>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
        <div className="relative h-40 w-full">
          {article.avatar ? (
            <Image
              src={"/images/default-article.jpg"}
              alt={article.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white opacity-60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          )}
          {article.articleType && (
            <div className="absolute top-3 right-3 px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full">
              {translateArticleType(article.articleType)}
            </div>
          )}
        </div>

        <div className="p-5 flex-grow flex flex-col">
          <h4 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            {article.title}
          </h4>

          <p className="text-gray-600 mb-4 text-sm line-clamp-3">
            {article.abstract?.substring(0, 120)}...
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xs text-gray-500">
                {article.createdAt && formatDate(article.createdAt)}
              </span>
            </div>
            <span className="text-indigo-600 text-sm font-medium">
              مشاهده مقاله
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
