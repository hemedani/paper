import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns-jalali";

interface RelatedBlogCardProps {
  _id?: string;
  title: string;
  abstract: string;
  pic: {
    name: string;
  };
  author: {
    first_name: string;
    last_name: string;
  };
  categories?: {
    name: string;
  }[];
  createdAt?: Date;
}

export const RelatedBlogCard = ({
  _id,
  title,
  abstract,
  pic,
  author,
  categories,
  createdAt,
}: RelatedBlogCardProps) => {
  const persianDate = createdAt ? format(new Date(createdAt), "dd MMMM yyyy") : "";
  const authorName = `${author.first_name} ${author.last_name}`;
  const categoryName = categories?.[0]?.name || "دسته‌بندی نشده";

  if (!_id) return null;

  return (
    <Link
      href={`/blog/${_id}`}
      className="group flex h-full flex-col gap-4 transition-opacity duration-200 hover:opacity-95"
    >
      {/* Image */}
      <div className="relative h-[220px] w-full overflow-hidden rounded-[20px] bg-gray-100 lg:h-[260px]">
        <Image
          src={`http://127.0.0.1:1382/uploads/images/${pic.name}`}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4">
        {/* Text Content */}
        <div className="flex flex-col gap-2">
          <h3 className="line-clamp-2 text-right text-[17px] font-bold leading-[1.6] text-black lg:text-[20px]">
            {title}
          </h3>
          <p className="line-clamp-2 text-right text-[13px] font-medium leading-[1.9] text-[#9A9AA1] lg:text-[14px]">
            {abstract}
          </p>
        </div>

        {/* Meta Info */}
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2">
          {/* Author */}
          <div className="flex items-center gap-1.5">
            <span className="whitespace-nowrap text-[12px] font-semibold text-[#3C3C43] lg:text-[13px]">
              {authorName}
            </span>
            <Image src="/images/blog/author-icon.svg" alt="" width={16} height={16} />
          </div>

          {/* Category */}
          <div className="flex items-center gap-1.5">
            <span className="whitespace-nowrap text-[12px] font-semibold text-[#3C3C43] lg:text-[13px]">
              {categoryName}
            </span>
            <Image src="/images/blog/category-icon.svg" alt="" width={16} height={16} />
          </div>

          {/* Date */}
          <div className="flex items-center gap-1.5">
            <span className="whitespace-nowrap text-[12px] font-semibold text-[#3C3C43] lg:text-[13px]">
              {persianDate}
            </span>
            <Image src="/images/blog/date-icon.svg" alt="" width={16} height={16} />
          </div>
        </div>
      </div>
    </Link>
  );
};
