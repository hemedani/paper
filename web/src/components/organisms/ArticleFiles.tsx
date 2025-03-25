"use client";

import React from "react";
import { articleSchema } from "@/types/declarations/selectInp";
import { formatFileSize } from "@/utils/formatters";

interface ArticleFilesProps {
  article: articleSchema;
}

/**
 * ArticleFiles component for displaying article's attached files
 */
export const ArticleFiles = ({ article }: ArticleFilesProps) => {
  if (!article.avatar && !article.doc) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-r-4 border-indigo-500 pr-4">
        فایل‌ها
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {article.avatar ? (
          <div className="bg-blue-50 p-4 rounded-xl flex items-center">
            <svg
              className="w-8 h-8 text-blue-500 ml-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <div>
              <span className="block text-blue-900 font-semibold">تصویر:</span>
              <span className="text-blue-700 text-sm">
                {article.avatar.name} ({formatFileSize(article.avatar.size)})
              </span>
            </div>
          </div>
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
        {article.doc && (
          <div className="bg-green-50 p-4 rounded-xl flex items-center">
            <svg
              className="w-8 h-8 text-green-500 ml-3"
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
              ></path>
            </svg>
            <div>
              <span className="block text-green-900 font-semibold">سند:</span>
              <span className="text-green-700 text-sm">
                {article.doc.name} ({formatFileSize(article.doc.size)})
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleFiles;
