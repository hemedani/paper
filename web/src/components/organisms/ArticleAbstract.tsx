"use client";

import React from "react";
import { articleSchema } from "@/types/declarations/selectInp";

interface ArticleAbstractProps {
  article: articleSchema;
}

/**
 * ArticleAbstract component for displaying the article's abstract
 */
export const ArticleAbstract = ({ article }: ArticleAbstractProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 mb-8 overflow-hidden">
      <div className="bg-gradient-to-r from-[#EDFEFF] to-[#EDFEFF] p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-r-4 border-[#08A6AE] pr-4">
          خلاصه مقاله
        </h2>
        <p className="text-gray-700 text-justify leading-relaxed text-lg">
          {article.abstract}
        </p>
      </div>
    </div>
  );
};

export default ArticleAbstract;
