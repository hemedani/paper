"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { getTags } from "@/app/actions/tag/getTags";
import { getKeywords } from "@/app/actions/keyword/getKeywords";
import { getAuthors } from "@/app/actions/author/getAuthors";
import { DeepPartial, ReqType } from "@/types/declarations/selectInp";
import { DefaultSearchArrayValues } from "@/utils/prepareArtticleSearch";

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

export type AdvencedArticleSearchParams = ReqType["main"]["article"]["getArticles"]["set"];

/* ── Field shell ──────────────────────────────────────────────────────────── */
const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex h-[56px] items-center gap-3 rounded-[14px] border border-[#F0F0F2] bg-white px-4 transition-colors focus-within:border-[#08A6AE]">
    <span className="shrink-0 whitespace-nowrap text-[15px] font-semibold leading-[1.7] text-black">
      {label}
    </span>
    <span className="h-[22px] w-px shrink-0 bg-[#F0F0F2]" aria-hidden />
    <div className="min-w-0 flex-1">{children}</div>
  </div>
);

const inputClass =
  "h-full w-full bg-transparent text-[14px] font-normal text-black outline-none placeholder:text-[#9A9AA1]";

/* ── Modal ────────────────────────────────────────────────────────────────── */
const AdvancedSearchModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  defaultSearchArrayValues: DefaultSearchArrayValues;
  pageAddress?: string;
}> = ({ isOpen, onClose, defaultSearchArrayValues: { tags, keywords, authors }, pageAddress }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const parsedParams: DeepPartial<AdvencedArticleSearchParams> = useMemo(
    () =>
      Array.from(searchParams.entries()).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]:
            key === "tagIds" || key === "keywordIds" || key === "authorIds"
              ? value.split(",")
              : value,
        }),
        {},
      ),
    [searchParams],
  );

  const { register, handleSubmit, setValue, formState } =
    useForm<AdvencedArticleSearchParams>({ defaultValues: parsedParams });
  const { errors } = formState;

  /* Lock body scroll + close on Escape while open */
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  const loadKeywordsOptions = useCallback(async (keywordName?: string) => {
    const set: ReqType["main"]["keyword"]["getKeywords"]["set"] = { limit: 10, page: 1 };
    if (keywordName) set.name = keywordName;
    const response = await getKeywords({ set, get: { _id: 1, name: 1 } });
    return response.map((keyword: { _id: string; name: string }) => ({
      value: keyword._id,
      label: keyword.name,
    }));
  }, []);

  const loadAuthorsOptions = useCallback(async (authorLastname?: string) => {
    const set: ReqType["main"]["author"]["gets"]["set"] = { limit: 10, page: 1 };
    if (authorLastname) set.last_name = authorLastname;
    const response = await getAuthors({ set, get: { _id: 1, first_name: 1, last_name: 1 } });
    return response.map((author: { _id: string; first_name: string; last_name: string }) => ({
      value: author._id,
      label: `${author.first_name} ${author.last_name}`,
    }));
  }, []);

  const loadTagOptions = useCallback(async (tagName?: string) => {
    const set: ReqType["main"]["tag"]["getTags"]["set"] = { limit: 10, page: 1 };
    if (tagName) set.name = tagName;
    const response = await getTags({ set, get: { _id: 1, name: 1 } });
    return response.map((tag: { _id: string; name: string }) => ({
      value: tag._id,
      label: tag.name,
    }));
  }, []);

  const onSubmit: SubmitHandler<AdvencedArticleSearchParams> = (criteria) => {
    const queryString = Object.entries(criteria)
      .filter(([, value]) => {
        if (Array.isArray(value)) return value.length > 0;
        return value && value.toString().trim() !== "";
      })
      .map(([key, value]) =>
        Array.isArray(value)
          ? `${encodeURIComponent(key)}=${encodeURIComponent(value.join(","))}`
          : `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
      )
      .join("&");

    onClose();
    router.push(pageAddress ? `${pageAddress}/?${queryString}` : `/?${queryString}`);
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!isOpen || !mounted) return null;

  const selectProps = {
    isMulti: true,
    cacheOptions: true,
    defaultOptions: true as const,
    classNamePrefix: "react-select",
    menuPortalTarget: typeof document !== "undefined" ? document.body : undefined,
    menuPosition: "fixed" as const,
  };

  return createPortal(
    <div
      dir="rtl"
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/55 px-4 py-6 backdrop-blur-[2px] sm:py-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="advanced-search-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="pd-scroll relative w-full max-w-[1260px] rounded-[28px] bg-white p-5 shadow-2xl sm:rounded-[32px] sm:p-8 lg:p-10">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <h2
            id="advanced-search-title"
            className="text-[26px] font-extrabold leading-[1.4] text-black sm:text-[30px]"
          >
            جستجوی پیشرفته
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن جستجوی پیشرفته"
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#F8F8F9] text-black transition-colors hover:bg-[#EFEFF1]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-9">
          {/* Filter by */}
          <section className="flex flex-col gap-4">
            <h3 className="text-[17px] font-bold leading-[1.7] text-black">فیلتر بر اساس</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Field label="نویسندگان">
                <div className="pd-select">
                  <AsyncSelect
                    {...selectProps}
                    name="authorIds"
                    defaultValue={authors}
                    loadOptions={loadAuthorsOptions}
                    placeholder="انتخاب کنید"
                    onChange={(val) =>
                      setValue(
                        "authorIds",
                        ((val ?? []) as { value: string }[]).map((v) => v.value) as never,
                        { shouldValidate: true },
                      )
                    }
                  />
                </div>
              </Field>
              <Field label="برچسب‌ها">
                <div className="pd-select">
                  <AsyncSelect
                    {...selectProps}
                    name="tagIds"
                    defaultValue={tags}
                    loadOptions={loadTagOptions}
                    placeholder="انتخاب کنید"
                    onChange={(val) =>
                      setValue(
                        "tagIds",
                        ((val ?? []) as { value: string }[]).map((v) => v.value) as never,
                        { shouldValidate: true },
                      )
                    }
                  />
                </div>
              </Field>
              <Field label="کلمات کلیدی">
                <div className="pd-select">
                  <AsyncSelect
                    {...selectProps}
                    name="keywordIds"
                    defaultValue={keywords}
                    loadOptions={loadKeywordsOptions}
                    placeholder="انتخاب کنید"
                    onChange={(val) =>
                      setValue(
                        "keywordIds",
                        ((val ?? []) as { value: string }[]).map((v) => v.value) as never,
                        { shouldValidate: true },
                      )
                    }
                  />
                </div>
              </Field>
            </div>
          </section>

          {/* Text search */}
          <section className="flex flex-col gap-4">
            <h3 className="text-[17px] font-bold leading-[1.7] text-black">جستجوی متن</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="عنوان">
                <input
                  {...register("title")}
                  className={inputClass}
                  placeholder="اینجا وارد کنید..."
                  aria-label="عنوان"
                />
              </Field>
              <Field label="چکیده">
                <input
                  {...register("abstract")}
                  className={inputClass}
                  placeholder="اینجا وارد کنید..."
                  aria-label="چکیده"
                />
              </Field>
            </div>
          </section>

          {/* Publication details */}
          <section className="flex flex-col gap-4">
            <h3 className="text-[17px] font-bold leading-[1.7] text-black">جزئیات انتشار</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Field label="انتشارات">
                <input
                  {...register("publication")}
                  className={inputClass}
                  placeholder="اینجا وارد کنید..."
                  aria-label="انتشارات"
                />
              </Field>
              <Field label="DOI">
                <input
                  {...register("DOI")}
                  className={inputClass}
                  placeholder="شماره DOI را وارد کنید"
                  dir="ltr"
                  aria-label="DOI"
                />
              </Field>
              <Field label="ISBN">
                <input
                  {...register("ISBN")}
                  className={inputClass}
                  placeholder="شماره ISBN را وارد کنید"
                  dir="ltr"
                  aria-label="ISBN"
                />
              </Field>
              <Field label="ISNN">
                <input
                  {...register("ISNN")}
                  className={inputClass}
                  placeholder="شماره ISNN را وارد کنید"
                  dir="ltr"
                  aria-label="ISNN"
                />
              </Field>
              <Field label="سال انتشار">
                <input
                  {...register("publicationYear")}
                  type="number"
                  className={inputClass}
                  placeholder="سال انتشار"
                  aria-label="سال انتشار"
                />
              </Field>
            </div>
          </section>

          {/* Pagination settings */}
          <section className="flex flex-col gap-4">
            <h3 className="text-[17px] font-bold leading-[1.7] text-black">تنظیمات صفحه‌بندی</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="شماره صفحه">
                <input
                  {...register("page")}
                  type="number"
                  className={inputClass}
                  placeholder="اینجا وارد کنید..."
                  aria-label="شماره صفحه"
                />
              </Field>
              <Field label="تعداد در صفحه">
                <input
                  {...register("limit")}
                  type="number"
                  className={inputClass}
                  placeholder="اینجا وارد کنید..."
                  aria-label="تعداد در صفحه"
                />
              </Field>
            </div>
          </section>

          {(errors.title || errors.abstract) && (
            <p className="text-[13px] font-medium text-red-500">
              مقادیر وارد شده معتبر نیستند، لطفاً دوباره بررسی کنید.
            </p>
          )}

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="flex h-[60px] items-center justify-center gap-[10px] rounded-[18px] bg-[#D2A634] px-9 text-[16px] font-semibold text-white transition-colors hover:bg-[#bd9429] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2A634]"
            >
              <Image src="/images/hero/filter-icon.svg" alt="" width={22} height={22} />
              <span>جستجوی پیشرفته</span>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default AdvancedSearchModal;
