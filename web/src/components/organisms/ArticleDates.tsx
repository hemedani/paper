"use client";

import React from "react";
import { articleSchema } from "@/types/declarations/selectInp";
import { formatDate } from "@/utils/formatters";

interface ArticleDatesProps {
  article: articleSchema;
}

/**
 * ArticleDates component for displaying article's creation and update dates
 */
export const ArticleDates = ({ article }: ArticleDatesProps) => {
  if (!article.createdAt && !article.updatedAt) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-r-4 border-[#08A6AE] pr-4">
        تاریخ‌ها
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {article.createdAt && (
          <div className="bg-gradient-to-r from-[#EDFEFF] to-[#EDFEFF] p-4 rounded-xl">
            <span className="block text-[#08A6AE] font-semibold mb-1">
              تاریخ ثبت:
            </span>
            <span className="text-[#08A6AE]">
              {formatDate(article.createdAt)}
            </span>
          </div>
        )}
        {article.updatedAt && (
          <div className="bg-gradient-to-r from-[#EDFEFF] to-[#EDFEFF] p-4 rounded-xl">
            <span className="block text-[#08A6AE] font-semibold mb-1">
              تاریخ به‌روزرسانی:
            </span>
            <span className="text-[#08A6AE]">
              {formatDate(article.updatedAt)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDates;
