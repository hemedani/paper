"use client";

import Link from "next/link";
import { useState } from "react";
import { addFavorite } from "@/app/actions/user/userFavoritArticle";
import { useRouter } from "next/navigation";
import { translateArticleType } from "@/utils/helper";
import { articleSchema } from "@/types/declarations/selectInp";
import { HashtagIcon, KeyIcon } from "@/components/atoms/Icons";
import Image from "next/image";

export const Card = ({
  _id,
  title,
  abstract,
  authors,
  isFavorite: initialFavorite,
  level,
  articleType,
  keywords,
  tags,
  publication,
}: Partial<
  articleSchema & {
    isFavorite: boolean;
    level: "Editor" | "Manager" | "Ghost" | "Normal";
  }
>) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const router = useRouter();

  const handleFavoriteClick = async () => {
    if (!level) {
      router.push("/login");
      return;
    }
    const isAddedFavorite = await addFavorite(_id!);
    if (isAddedFavorite) {
      setIsFavorite(!isFavorite);
    }
  };

  const handleQuery = (queryType: string, value: string) => {
    const query = new URLSearchParams();
    query.append(queryType, value);
    router.push(`/?${query}`);
  };

  const fullAbstract =
    abstract && abstract.length > 250 ? `${abstract.substring(0, 250)}...` : abstract;

  return (
    <article
      dir="rtl"
      className="flex w-full flex-col gap-5 rounded-[28px] border border-[#F0F0F2] bg-white p-5 transition-shadow duration-300 hover:shadow-[0px_28px_48px_-32px_rgba(0,0,0,0.18)] sm:min-h-[540px] sm:rounded-[32px] sm:p-6 lg:min-h-[606px]"
    >
      {/* Badge + favourite */}
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          {articleType && (
            <span className="flex h-[38px] items-center justify-center whitespace-nowrap rounded-[13px] bg-[#EDFEFF] px-[14px] text-[13px] font-semibold leading-[1.76] text-[#08A6AE] sm:text-[14px]">
              {translateArticleType(articleType)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
          aria-pressed={!!isFavorite}
          className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[14px] bg-[#FDF7E9] transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M12 3.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L12 16.77l-5.2 2.74.99-5.79-4.21-4.1 5.82-.85L12 3.5z"
              fill={isFavorite ? "#D2A634" : "none"}
              stroke="#D2A634"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Title + abstract */}
      <div className="flex flex-col gap-3">
        <h3 className="line-clamp-3 text-[17px] font-bold leading-[1.5] text-black sm:text-[19px] lg:text-[20px]">
          {title}
        </h3>
        <p className="line-clamp-4 text-[14px] font-medium leading-[1.65] text-[#9A9AA1] lg:text-[15px]">
          {fullAbstract}
        </p>
      </div>

      <div className="h-px w-full bg-[#F0F0F2]" />

      {/* Metadata */}
      <div dir="rtl" className="flex flex-col items-start gap-3">
        {publication?.title && (
          <div className="flex w-full items-center justify-start gap-2">
            <span className="truncate text-[13px] font-medium leading-[1.76] text-[#9A9AA1] lg:text-[14px]">
              مجله : {publication.title}
            </span>
            <Image
              src="/images/card/journal-icon.svg"
              alt=""
              width={22}
              height={22}
              className="shrink-0"
            />
          </div>
        )}

        {authors && authors.length > 0 && (
          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex items-center justify-start gap-2">
              <span className="shrink-0 text-[13px] font-medium leading-[1.76] text-[#9A9AA1] lg:text-[14px]">
                نویسندگان :
              </span>
              <Image
                src="/images/card/authors-icon.svg"
                alt=""
                width={22}
                height={22}
                className="shrink-0"
              />
            </div>
            <div className="flex w-full flex-wrap items-center justify-start gap-2">
              {authors.slice(0, 2).map((author, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleQuery("authorIds", author._id!)}
                  className="max-w-full truncate rounded-[13px] border border-[#F0F0F2] px-[11px] py-[5px] text-[12px] font-medium leading-[1.76] text-[#9A9AA1] transition-colors hover:bg-[#F8F8F9] lg:text-[13px]"
                >
                  {`${author.first_name} ${author.last_name}`}
                </button>
              ))}
            </div>
          </div>
        )}

        {keywords && keywords.length > 0 && (
          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex items-center justify-start gap-2">
              <span className="text-[13px] font-medium leading-[1.76] text-[#9A9AA1] lg:text-[14px]">
                کلمات کلیدی :
              </span>
              <KeyIcon className="h-[22px] w-[22px] shrink-0 text-[#9A9AA1]" />
            </div>
            <div className="flex w-full flex-wrap items-center justify-start gap-2">
              {keywords.slice(0, 4).map((keyword, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleQuery("keywordIds", keyword._id!)}
                  className="inline-flex max-w-full items-center gap-1 rounded-[13px] bg-[#F8F8F9] px-[11px] py-[5px] text-[12px] font-medium leading-[1.76] text-black transition-colors hover:bg-[#EFEFF1] lg:text-[13px]"
                >
                  <KeyIcon className="h-[14px] w-[14px] shrink-0" />
                  <span className="truncate">{keyword.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex items-center justify-start gap-2">
              <span className="text-[13px] font-medium leading-[1.76] text-[#9A9AA1] lg:text-[14px]">
                برچسب‌ها :
              </span>
              <HashtagIcon className="h-[22px] w-[22px] shrink-0 text-[#9A9AA1]" />
            </div>
            <div className="flex w-full flex-wrap items-center justify-start gap-2">
              {tags.slice(0, 4).map((tag, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleQuery("tagIds", tag._id!)}
                  className="inline-flex max-w-full items-center gap-1 rounded-[13px] bg-[#FDF7E9] px-[11px] py-[5px] text-[12px] font-medium leading-[1.76] text-[#B48A1E] transition-colors hover:bg-[#F8EDD3] lg:text-[13px]"
                >
                  <HashtagIcon className="h-[14px] w-[14px] shrink-0" />
                  <span className="truncate">{tag.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <Link
        href={`/article/${_id}`}
        className="mt-auto flex w-full items-center justify-center gap-[9px] rounded-[18px] bg-[#EDFEFF] px-4 py-4 text-[14px] font-semibold leading-[1.76] text-[#08A6AE] transition-colors hover:bg-[#d8f9fb] lg:text-[15px]"
      >
        <Image src="/images/card/view-icon.svg" alt="" width={22} height={22} />
        <span className="whitespace-nowrap">مشاهده کامل مقاله</span>
      </Link>
    </article>
  );
};
