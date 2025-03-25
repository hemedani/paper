import { useRouter } from "next/navigation";
import React from "react";
import { EditIcon, HideIcon, TrashIcon, LinkIcon } from "../atoms/Icons";
import Image from "next/image";

type TBlog = {
  _id: string;
  title: string;
  subtitle: string;
  abstract: string;
  pic?: {
    _id: string;
    name: string;
    type: string;
  };
  isInSwipper?: boolean;
  onDelete: () => void;
  lesanUrl: string;
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
}: TBlog) => {
  const router = useRouter();
  const imageSrc = pic?.name
    ? `${lesanUrl}/uploads/images/${pic.name}`
    : "/images/placeholder.jpg";

  return (
    <div className="bg-white border rounded-lg shadow-md p-4 w-full flex flex-col gap-4 min-h-[200px] justify-between">
      <div className="flex gap-4">
        <div className="w-24 h-24 relative rounded-md overflow-hidden flex-shrink-0">
          <Image src={imageSrc} alt={title} fill className="object-cover" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600">{subtitle}</p>
          {isInSwipper && (
            <span className="mt-1 text-xs inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full">
              نمایش در اسلایدر
            </span>
          )}
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{abstract}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 gap-2">
        <div className="flex gap-3">
          <button
            onClick={() => router.push(`/admin/blog/edit-blog/${_id}`)}
            className="flex items-center gap-1 text-blue-500 hover:text-blue-700 bg-blue-50 px-3 py-1 rounded-md"
            title="ویرایش اطلاعات"
          >
            <EditIcon />
            <span className="text-sm">ویرایش</span>
          </button>
          <button
            onClick={() => router.push(`/admin/blog/edit-relation/${_id}`)}
            className="flex items-center gap-1 text-purple-500 hover:text-purple-700 bg-purple-50 px-3 py-1 rounded-md"
            title="ویرایش روابط"
          >
            <LinkIcon />
            <span className="text-sm">روابط</span>
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
          onClick={() => router.push(`/blog/${_id}`)}
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

export default BlogCard;
