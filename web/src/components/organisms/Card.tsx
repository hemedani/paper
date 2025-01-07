"use client";

import Link from "next/link";
import { useState } from "react";
import { FavoriteIconFilled, FavoriteIconOutline } from "../atoms/Icons";
import { addFavorite } from "@/app/actions/user/userFavoritArticle";

export const Card = ({
  title,
  abstract,
  authors,
  id,
}: {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = async () => {
    const isAddedFavorite = await addFavorite(id);
    if (isAddedFavorite) {
      // setIsFavorite(true);
    }
  };

  return (
    <div className="max-w-sm mt-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 hover:border-indigo-500">
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-400 border-2 border-indigo-400 rounded-full overflow-hidden flex-shrink-0">
          </div>
          <div className="">
            <p className="text-lg font-semibold text-gray-900 truncate max-w-[12rem]">
              {title}
            </p>
            <p className="text-sm text-gray-600 truncate max-w-[12rem]">
              {authors?.join(" | ")}
            </p>
          </div>
        </div>
        <button
          onClick={handleFavoriteClick}
          className="focus:outline-none"
          aria-label="Add to favorites"
        >
          {isFavorite ? <FavoriteIconFilled /> : <FavoriteIconOutline />}
        </button>
      </div>

      <div className="p-5">
        <p className="text-gray-700 text-sm leading-relaxed text-justify">
          {abstract}
        </p>
      </div>

      <div className="p-4 text-center">
        <Link
          className="inline-block text-indigo-600 font-semibold hover:text-indigo-800 hover:underline"
          href={`/article/${id}`}
        >
          مشاهده مقاله
        </Link>
      </div>
    </div>
  );
};
