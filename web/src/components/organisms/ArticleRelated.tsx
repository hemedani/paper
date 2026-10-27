"use client";

import React from "react";
import { articleSchema } from "@/types/declarations/selectInp";
import RelatedArticlesSection from "./RelatedArticlesSection";

interface ArticleRelatedProps {
  article: articleSchema;
  publisherArticles: articleSchema[];
  authorArticles: articleSchema[];
  tagArticles: articleSchema[];
  keywordArticles: articleSchema[];
  lesanUrl: string;
}

/**
 * ArticleRelated component - Redesigned with full-width magazine style layout
 * Presents related articles in an elegant, visually stunning magazine-like format
 */
const ArticleRelated = ({
  article,
  publisherArticles,
  authorArticles,
  tagArticles,
  keywordArticles,
  lesanUrl
}: ArticleRelatedProps) => {
  // Helper to get formatted author names for display
  const getAuthorsLabel = () => {
    if (!article.authors || article.authors.length === 0) return "";

    if (article.authors.length === 1) {
      return `${article.authors[0].first_name} ${article.authors[0].last_name}`;
    }

    if (article.authors.length === 2) {
      return `${article.authors[0].first_name} ${article.authors[0].last_name} و ${article.authors[1].first_name} ${article.authors[1].last_name}`;
    }

    return `${article.authors[0].first_name} ${article.authors[0].last_name
      } و ${article.authors.length - 1} نویسنده دیگر`;
  };

  // Helper to get formatted tags for display
  const getTagsLabel = () => {
    if (!article.tags || article.tags.length === 0) return "";

    if (article.tags.length === 1) {
      return article.tags[0].name;
    }

    if (article.tags.length === 2) {
      return `${article.tags[0].name} و ${article.tags[1].name}`;
    }

    return `${article.tags[0].name} و ${article.tags.length - 1} برچسب دیگر`;
  };

  // Helper to get formatted keywords for display
  const getKeywordsLabel = () => {
    if (!article.keywords || article.keywords.length === 0) return "";

    if (article.keywords.length === 1) {
      return article.keywords[0].name;
    }

    if (article.keywords.length === 2) {
      return `${article.keywords[0].name} و ${article.keywords[1].name}`;
    }

    return `${article.keywords[0].name} و ${article.keywords.length - 1
      } کلیدواژه دیگر`;
  };

  return (
    <section className="w-full mt-16 relative">
      {/* Elegant section title with subtle animation */}
      <div className="mb-12 text-center relative">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 inline-block">
          مقالات مرتبط
          <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-[#08A6AE] to-[#08A6AE] mt-2 transform transition-all duration-500 hover:scale-110 rounded-full"></div>
        </h2>
        <div className="absolute inset-0 -z-10 opacity-5 bg-[url('/patterns/topography.svg')]"></div>
      </div>

      {/* Publisher Articles */}
      {publisherArticles.length > 0 && (
        <div className="relative pb-16">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <RelatedArticlesSection
              title="از همین انتشارات"
              articles={publisherArticles}
              emptyMessage="مقاله‌ای از این انتشارات یافت نشد."
              bgColor="from-[#08A6AE] to-[#08A6AE]"
              iconColor="text-[#08A6AE]"
              valueLabel={article.publication?.title}
              lesanUrl={lesanUrl}
            />
          </div>
          <div className="absolute inset-0 -z-10 opacity-5 bg-gradient-to-r from-[#EDFEFF] to-[#EDFEFF]"></div>
        </div>
      )}

      {/* Author Articles - with a different background for visual separation */}
      {authorArticles.length > 0 && (
        <div className="relative py-16">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <RelatedArticlesSection
              title="از همین نویسندگان"
              articles={authorArticles}
              emptyMessage="مقاله‌ای از این نویسندگان یافت نشد."
              bgColor="from-[#08A6AE] to-[#08A6AE]"
              iconColor="text-[#08A6AE]"
              valueLabel={getAuthorsLabel()}
              lesanUrl={lesanUrl}
            />
          </div>
          <div className="absolute inset-0 -z-10 opacity-5 bg-[url('/patterns/circuit-board.svg')]"></div>
        </div>
      )}

      {/* Tag Articles - with another visual style */}
      {tagArticles.length > 0 && (
        <div className="relative py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <RelatedArticlesSection
              title="با همین برچسب‌ها"
              articles={tagArticles}
              emptyMessage="مقاله‌ای با این برچسب‌ها یافت نشد."
              bgColor="from-teal-500 to-emerald-600"
              iconColor="text-teal-600"
              valueLabel={getTagsLabel()}
              lesanUrl={lesanUrl}
            />
          </div>
        </div>
      )}

      {/* Keyword Articles - with a fourth visual style */}
      {keywordArticles.length > 0 && (
        <div className="relative py-16">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <RelatedArticlesSection
              title="با همین کلیدواژه‌ها"
              articles={keywordArticles}
              emptyMessage="مقاله‌ای با این کلیدواژه‌ها یافت نشد."
              bgColor="from-amber-500 to-orange-600"
              iconColor="text-amber-600"
              valueLabel={getKeywordsLabel()}
              lesanUrl={lesanUrl}
            />
          </div>
          <div className="absolute inset-0 -z-10 opacity-5 bg-gradient-to-r from-amber-50 to-orange-50"></div>
        </div>
      )}

      {/* Visual footer element to complete the design */}
      <div className="h-1 w-full bg-gradient-to-r from-[#08A6AE] via-[#08A6AE] to-pink-500 opacity-70"></div>
    </section>
  );
};

export default ArticleRelated;
