"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { blogSchema } from "@/types/declarations/selectInp";
import { AdminIcon, AdminIconButton } from "./admin/AdminUI";
import { AdminThumb } from "./admin/AdminThumb";

type TBlog = {
  onDelete: () => void;
  lesanUrl: string;
  isOwn?: boolean;
};

export const BlogCard = ({
  _id,
  title,
  subtitle,
  abstract,
  pic,
  isInSwipper,
  onDelete,
  lesanUrl,
  isOwn,
}: blogSchema & TBlog) => {
  const router = useRouter();
  const canManage = isOwn === false || isOwn === undefined;
  const imageSrc = pic?.name ? `${lesanUrl}/uploads/images/${pic.name}` : undefined;

  return (
    <article className="flex h-full flex-col justify-between gap-4 rounded-[20px] border border-[#F0F0F2] bg-white p-4 transition-all duration-200 hover:border-[#08A6AE]/30 hover:shadow-[0_18px_36px_-30px_rgba(8,166,174,0.8)]">
      <div className="flex gap-3.5">
        <AdminThumb src={imageSrc} alt={title ?? "تصویر پست"} size={84} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-[14px] font-bold leading-[1.85] text-black">
              {title}
            </h3>
            {isInSwipper && (
              <span className="shrink-0 rounded-full bg-[#EDFEFF] px-2 py-0.5 text-[10px] font-bold text-[#08A6AE]">
                اسلایدر
              </span>
            )}
          </div>

          {subtitle && (
            <p className="mt-0.5 line-clamp-1 text-[11.5px] font-medium text-[#9A9AA1]">
              {subtitle}
            </p>
          )}

          {abstract && (
            <p className="mt-1.5 line-clamp-2 text-[11.5px] font-medium leading-[1.85] text-[#5C5C63]">
              {abstract}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 border-t border-[#F0F0F2] pt-3">
        {canManage && (
          <>
            <AdminIconButton
              label="ویرایش اطلاعات"
              tone="teal"
              icon={AdminIcon.edit}
              onClick={() => router.push(`/admin/blog/edit-blog/${_id}`)}
            />
            <AdminIconButton
              label="ویرایش روابط"
              tone="neutral"
              icon={AdminIcon.link}
              onClick={() => router.push(`/admin/blog/edit-relation/${_id}`)}
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
          label="مشاهده پست"
          tone="neutral"
          icon={AdminIcon.eye}
          className="ms-auto"
          onClick={() => router.push(`/blog/${_id}`)}
        />
      </div>
    </article>
  );
};

export default BlogCard;
