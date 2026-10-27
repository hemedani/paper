"use client";

import React from "react";
import Image from "next/image";
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
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to bottom left, #3DB4BA 0%, #00B5BE 100%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.14]">
        <Image src="/images/hero/hero-pattern.svg" alt="" fill className="object-cover" priority />
      </div>

      <div className="relative mx-auto max-w-[1284px] px-4 py-16 sm:py-20 md:py-24">
        <div className="flex flex-col items-center text-center">
          <div
            className="mb-6 inline-block cursor-pointer rounded-full bg-white/20 px-5 py-2 text-[13px] font-semibold text-white backdrop-blur-sm transition-transform duration-300 hover:scale-105 lg:text-[14px]"
            onClick={() => onArticleTypeClick(article.articleType)}
          >
            {translateArticleType(article.articleType)}
          </div>

          <h1 className="mb-6 max-w-4xl text-[24px] font-extrabold leading-[1.5] text-white sm:text-[34px] lg:text-[46px]">
            {article.title}
          </h1>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-white/85">
            <span className="text-[13px] font-medium lg:text-[15px]">
              {article.createdAt && formatDate(article.createdAt)}
            </span>

            {article.authors && article.authors.length > 0 && (
              <>
                <div className="h-1 w-1 rounded-full bg-white/50" />
                <span className="text-[13px] font-medium lg:text-[15px]">
                  نویسندگان:{" "}
                  {article.authors.map((author, index) => (
                    <span
                      key={author._id}
                      className="cursor-pointer transition-colors duration-300 hover:text-white"
                      onClick={() => author._id && onAuthorClick(author._id)}
                    >
                      {author.first_name} {author.last_name}
                      {index < (article.authors?.length || 0) - 1 ? "، " : ""}
                    </span>
                  ))}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleHeader;
