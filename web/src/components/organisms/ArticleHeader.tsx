"use client";

import React from "react";
import { articleSchema } from "@/types/declarations/selectInp";
import { translateArticleType } from "@/utils/helper";
import { formatDate } from "@/utils/formatters";

interface ArticleHeaderProps {
  article: articleSchema;
  onArticleTypeClick: (articleType: string) => void;
  onAuthorClick: (authorId: string) => void;
}

/**
 * ArticleHeader component for displaying the hero section with parallax effect
 */
export const ArticleHeader = ({
  article,
  onArticleTypeClick,
  onAuthorClick,
}: ArticleHeaderProps) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('/patterns/topography.svg')]"></div>

      <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-28 md:py-32">
        <div className="flex flex-col items-center text-center">
          <div
            className="inline-block mb-6 px-4 py-1.5 bg-indigo-100 bg-opacity-20 backdrop-blur-sm rounded-full text-white text-sm font-medium transform hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => onArticleTypeClick(article.articleType)}
          >
            {translateArticleType(article.articleType)}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight max-w-4xl">
            {article.title}
          </h1>

          <div className="flex items-center space-x-4 space-x-reverse mt-4">
            <div className="flex items-center">
              <span className="text-indigo-100 text-sm">
                {article.createdAt && formatDate(article.createdAt)}
              </span>
            </div>

            {article.authors && article.authors.length > 0 && (
              <>
                <div className="w-1 h-1 bg-indigo-200 rounded-full"></div>
                <div className="flex items-center">
                  <span className="text-indigo-100 text-sm">
                    نویسندگان:{" "}
                    {article.authors.map((author, index) => (
                      <span
                        key={author._id}
                        className="cursor-pointer hover:text-white transition-colors duration-300"
                        onClick={() => author._id && onAuthorClick(author._id)}
                      >
                        {author.first_name} {author.last_name}
                        {index < (article.authors?.length || 0) - 1 ? "، " : ""}
                      </span>
                    ))}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleHeader;
