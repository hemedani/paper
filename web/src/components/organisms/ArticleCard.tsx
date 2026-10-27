import { useRouter } from "next/navigation";
import React from "react";
import { translateArticleType } from "@/utils/helper";
import { AdminIcon, AdminIconButton } from "./admin/AdminUI";

type TArticle = {
  _id: string;
  title: string;
  articleType: string;
  onDelete: () => void; // افزودن پراپ حذف
  isOwn?: boolean;
};

export const ArticleCard = ({
  _id,
  articleType,
  title,
  onDelete,
  isOwn,
}: TArticle) => {
  const router = useRouter();
  const canManage = isOwn === false || isOwn === undefined;

  return (
    <article className="flex h-full flex-col justify-between gap-4 rounded-[20px] border border-[#F0F0F2] bg-white p-4 transition-all duration-200 hover:border-[#08A6AE]/30 hover:shadow-[0_18px_36px_-30px_rgba(8,166,174,0.8)]">
      <div>
        <span className="inline-flex items-center rounded-full bg-[#FAF6EB] px-2.5 py-1 text-[10.5px] font-bold text-[#B98F26]">
          {translateArticleType(articleType)}
        </span>
        <h3 className="mt-2.5 line-clamp-2 text-[14px] font-bold leading-[1.85] text-black">
          {title}
        </h3>
      </div>

      <div className="flex items-center gap-1.5 border-t border-[#F0F0F2] pt-3">
        {canManage && (
          <>
            <AdminIconButton
              label="بروزرسانی"
              tone="teal"
              icon={AdminIcon.refresh}
              onClick={() => router.push(`/admin/articles/updateArticle/${_id}`)}
            />
            <AdminIconButton
              label="ویرایش رابطه‌ها"
              tone="neutral"
              icon={AdminIcon.link}
              onClick={() => router.push(`/admin/articles/edit-article/${_id}`)}
            />
            <AdminIconButton
              label="حذف"
              tone="danger"
              icon={AdminIcon.trash}
              onClick={onDelete}
            />
          </>
        )}

        <AdminIconButton
          label="مشاهده مقاله"
          tone="neutral"
          icon={AdminIcon.eye}
          className="ms-auto"
          onClick={() => router.push(`/article/${_id}`)}
        />
      </div>
    </article>
  );
};

export default ArticleCard;
