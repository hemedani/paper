"use client";

import React from "react";
import { articleSchema } from "@/types/declarations/selectInp";
import { HashtagIcon, KeyIcon } from "@/components/atoms/Icons";

interface ArticleMetadataProps {
  article: articleSchema;
  onTagClick?: (tagId: string) => void;
  onKeywordClick?: (keywordId: string) => void;
}

/**
 * ArticleMetadata component for displaying article tags, keywords, liked by users and registrar
 */
export const ArticleMetadata = ({
  article,
  onTagClick,
  onKeywordClick,
}: ArticleMetadataProps) => {
  return (
    <div className="space-y-8">
      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-r-4 border-[#08A6AE] pr-4">
            برچسب‌ها
          </h2>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag._id}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#EDFEFF] text-[#08A6AE] rounded-full text-sm font-medium hover:bg-[#EDFEFF] transition-colors duration-300 cursor-pointer"
                onClick={() => onTagClick && tag._id && onTagClick(tag._id)}
              >
                <HashtagIcon className="h-4 w-4 shrink-0" />
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Keywords */}
      {article.keywords && article.keywords.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-r-4 border-[#08A6AE] pr-4">
            کلیدواژه‌ها
          </h2>
          <div className="flex flex-wrap gap-2">
            {article.keywords.map((keyword) => (
              <span
                key={keyword._id}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#EDFEFF] text-[#08A6AE] rounded-full text-sm font-medium hover:bg-[#EDFEFF] transition-colors duration-300 cursor-pointer"
                onClick={() =>
                  onKeywordClick && keyword._id && onKeywordClick(keyword._id)
                }
              >
                <KeyIcon className="h-4 w-4 shrink-0" />
                {keyword.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Liked by users */}
      {article.favByUsers && article.favByUsers.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-r-4 border-[#08A6AE] pr-4">
            کاربران علاقه‌مند
          </h2>
          <div className="flex flex-wrap gap-2">
            {article.favByUsers.map((user) => (
              <span
                key={user._id}
                className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full text-sm font-medium"
              >
                {user.first_name} {user.last_name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Registrar */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-r-4 border-[#08A6AE] pr-4">
          ثبت‌کننده
        </h2>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#08A6AE] to-[#08A6AE] flex items-center justify-center text-white font-bold text-lg">
            {article.registrar.first_name.charAt(0)}
          </div>
          <span className="mr-3 text-gray-700">
            {article.registrar.first_name} {article.registrar.last_name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleMetadata;
