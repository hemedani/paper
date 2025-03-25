"use client";

import React from "react";
import { articleSchema } from "@/types/declarations/selectInp";
import InfoItem from "@/components/atoms/InfoItem";

interface ArticleInfoProps {
  article: articleSchema;
  onItemClick: (queryType: string, value: string) => void;
}

/**
 * ArticleInfo component for displaying article information in the sidebar
 */
export const ArticleInfo = ({ article, onItemClick }: ArticleInfoProps) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white">اطلاعات مقاله</h2>
      </div>

      <div className="p-6 space-y-4">
        <InfoItem
          label="شناسه مقاله"
          value={article.key}
          onClick={() => onItemClick("key", article.key)}
        />

        <InfoItem
          label="سال انتشار"
          value={article.publicationYear.toString()}
          onClick={() =>
            onItemClick("publicationYear", article.publicationYear.toString())
          }
        />

        {article.ISBN && (
          <InfoItem
            label="ISBN"
            value={article.ISBN}
            onClick={() => onItemClick("ISBN", article.ISBN)}
          />
        )}

        {article.ISNN && (
          <InfoItem
            label="ISNN"
            value={article.ISNN}
            onClick={() => onItemClick("ISNN", article.ISNN)}
          />
        )}

        {article.DOI && (
          <InfoItem
            label="DOI"
            value={article.DOI}
            onClick={() => onItemClick("DOI", article.DOI)}
          />
        )}

        {article.page && (
          <InfoItem
            label="صفحات"
            value={article.page}
            onClick={() => onItemClick("pageCount", article.page)}
          />
        )}

        {article.issue && (
          <InfoItem
            label="شماره"
            value={article.issue.toString()}
            onClick={() => onItemClick("issue", article.issue.toString())}
          />
        )}

        {article.volume && (
          <InfoItem
            label="جلد"
            value={article.volume.toString()}
            onClick={() => onItemClick("volume", article.volume.toString())}
          />
        )}
      </div>
    </div>
  );
};

/**
 * PublicationCard component for displaying article's publication information
 */
export const PublicationCard = ({
  publication,
  onPublicationClick,
}: {
  publication: { title: string; _id?: string };
  onPublicationClick: (title: string) => void;
}) => {
  if (!publication) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white">انتشارات</h2>
      </div>

      <div className="p-6">
        <span
          className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full hover:bg-indigo-100 transition-colors duration-300 cursor-pointer"
          onClick={() =>
            publication.title && onPublicationClick(publication.title)
          }
        >
          {publication.title}
        </span>
      </div>
    </div>
  );
};

/**
 * DownloadButton component for downloading the article
 */
export const DownloadButton = ({ url }: { url: string }) => {
  if (!url) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <span>دانلود مقاله</span>
        <svg
          className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:translate-y-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </a>
    </div>
  );
};

/**
 * ArticleSidebar component that combines all sidebar components
 */
export const ArticleSidebar = ({
  article,
  onQueryChange,
}: {
  article: articleSchema;
  onQueryChange: (queryType: string, value: string) => void;
}) => {
  return (
    <div className="lg:col-span-1 mb-10 lg:mb-0">
      <div className="sticky top-10 space-y-8">
        {/* Article Info Card */}
        <ArticleInfo article={article} onItemClick={onQueryChange} />

        {/* Publication Card */}
        {article.publication && (
          <PublicationCard
            publication={article.publication}
            onPublicationClick={(title) => onQueryChange("publication", title)}
          />
        )}

        {/* Download Button */}
        {article.URL && <DownloadButton url={article.URL} />}
      </div>
    </div>
  );
};

export default ArticleSidebar;
