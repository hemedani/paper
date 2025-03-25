import { useRouter } from "next/navigation";
import React from "react";
import { EditIcon, HideIcon, TrashIcon, UpdateIcon } from "../atoms/Icons";
import { translateArticleType } from "@/utils/helper";

type TArticle = {
  _id: string;
  title: string;
  articleType: string;
  onDelete: () => void; // افزودن پراپ حذف
};

export const ArticleCard = ({
  _id,
  articleType,
  title,
  onDelete,
}: TArticle) => {
  const router = useRouter();

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col gap-4 h-full justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
        <span className="text-xs inline-block bg-red-50 text-red-600 px-2 py-1 rounded-full">
          {translateArticleType(articleType)}
        </span>
      </div>

      <div className="flex items-center justify-between mt-4 gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/admin/articles/updateArticle/${_id}`)}
            className="flex items-center gap-1 text-purple-500 hover:text-purple-700 bg-purple-50 px-3 py-1 rounded-md"
            title="بروزرسانی"
          >
            <UpdateIcon />
            <span className="text-sm">بروزرسانی</span>
          </button>
          <button
            onClick={() => router.push(`/admin/articles/edit-article/${_id}`)}
            className="flex items-center gap-1 text-blue-500 hover:text-blue-700 bg-blue-50 px-3 py-1 rounded-md"
            title="ویرایش رابطه‌ها"
          >
            <EditIcon />
            <span className="text-sm">رابطه‌ها</span>
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1 text-red-500 hover:text-red-700 bg-red-50 px-3 py-1 rounded-md"
            title="حذف"
          >
            <TrashIcon />
            <span className="text-sm">حذف</span>
          </button>
        </div>

        <button
          onClick={() => router.push(`/article/${_id}`)}
          className="flex items-center gap-1 text-green-500 hover:text-green-700 bg-green-50 px-3 py-1 rounded-md"
          title="مشاهده"
        >
          <HideIcon />
          <span className="text-sm">مشاهده</span>
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
