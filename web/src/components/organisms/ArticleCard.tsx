import { useRouter } from "next/navigation";
import React from "react";
import { EditIcon, ShowIcon, TrashIcon } from "../atoms/Icons";
import { translateArticleType } from "@/utils/helper";

type TArticle = {
  _id: string;
  title: string;
  articleType: string;
};

export const ArticleCard = ({ _id, articleType, title }: TArticle) => {
  const router = useRouter();
  return (
    <div className="bg-white border rounded-lg shadow-md p-4 max-w-sm mx-auto flex flex-col gap-4 min-h-[200px] justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-red-500 italic">{translateArticleType(articleType)}</p>
      </div>

      <div className="flex items-center justify-between mt-4 gap-5">
        <div className="flex">
          <button className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
            <EditIcon />
          </button>
          <button className="flex items-center gap-2 text-red-500 hover:text-red-700">
            <TrashIcon />
          </button>
        </div>

        <button
          onClick={() => router.push(`/article/${_id}`)}
          className="flex items-center gap-2 text-green-500 hover:text-green-700"
        >
          <ShowIcon />
          <span>مشاهده</span>
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
