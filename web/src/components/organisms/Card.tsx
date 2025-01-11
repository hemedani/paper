"use client";

import Link from "next/link";
import { useState } from "react";
import { FavoriteIconFilled, FavoriteIconOutline } from "../atoms/Icons";
import { addFavorite } from "@/app/actions/user/userFavoritArticle";
import { useRouter } from "next/navigation";

export const Card = ({
  title,
  abstract,
  authors,
  id,
  isFavorite: initialFavorite,
  level,
}: {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  isFavorite: boolean;
  level: "Editor" | "Manager" | "Ghost";
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const router = useRouter();

  const handleFavoriteClick = async () => {
    const isAddedFavorite = await addFavorite(id);
    if (isAddedFavorite) {
      setIsFavorite(!isFavorite); // تغییر وضعیت علاقه‌مندی
    }
  };

  return (
    <div className="max-w-lg mt-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 hover:border-indigo-500">
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="">
            <p className="text-lg font-semibold text-gray-900 ">{title}</p>
            <p className="text-sm text-gray-600 ">{authors?.join(" | ")}</p>
          </div>
        </div>
        <button
          onClick={level ? handleFavoriteClick : () => router.push("/login")}
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
