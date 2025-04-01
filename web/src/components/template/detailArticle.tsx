"use client";

import { useRouter } from "next/navigation";
import { articleSchema } from "@/types/declarations/selectInp";

// Component imports
import ArticleHeader from "@/components/organisms/ArticleHeader";
import ArticleSidebar from "@/components/organisms/ArticleInfo";
import ArticleAbstract from "@/components/organisms/ArticleAbstract";
import ArticleMetadata from "@/components/organisms/ArticleMetadata";
import ArticleDates from "@/components/organisms/ArticleDates";
import ArticleFiles from "@/components/organisms/ArticleFiles";
import ArticleRelated from "@/components/organisms/ArticleRelated";

/**
 * DetailArticle component - Main template for displaying a detailed article view
 *
 * This is the main template that composes all the article components together
 * Following the atomic design pattern, this template consists of multiple organisms
 * Each organism is responsible for its own functionality and UI
 */
export const DetailArticle = ({
  article,
  publisherArticles,
  tagArticles,
  authorArticles,
  keywordArticles,
  lesanUrl
}: {
  article: articleSchema,
  publisherArticles: articleSchema[]
  tagArticles: articleSchema[]
  authorArticles: articleSchema[]
  keywordArticles: articleSchema[]
  lesanUrl: string
}) => {
  const router = useRouter();
  const handleQuery = (queryType: string, value: string) => {
    const query = new URLSearchParams();
    query.append(queryType, value);
    router.push(`/?${query}`);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-blue-50 to-white dir-rtl transition-opacity duration-700`}
    >
      {/* Hero Section with Article Header */}
      <ArticleHeader
        article={article}
        onArticleTypeClick={(type) => handleQuery("articleType", type)}
        onAuthorClick={(authorId) => handleQuery("authorIds", authorId)}
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Sidebar */}
          <ArticleSidebar article={article} onQueryChange={handleQuery} />

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Abstract Section */}
            <ArticleAbstract article={article} />

            {/* Tags, Keywords and Metadata */}
            <ArticleMetadata
              article={article}
              onTagClick={(tagId) => handleQuery("tagIds", tagId)}
              onKeywordClick={(keywordId) =>
                handleQuery("keywordIds", keywordId)
              }
            />

            {/* Dates Section */}
            <ArticleDates article={article} />

            {/* Files Section */}
            <ArticleFiles article={article} />
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      <ArticleRelated
        article={article}
        publisherArticles={publisherArticles}
        tagArticles={tagArticles}
        keywordArticles={keywordArticles}
        authorArticles={authorArticles}
        lesanUrl={lesanUrl}
      />
    </div>
  );
};

export default DetailArticle;
