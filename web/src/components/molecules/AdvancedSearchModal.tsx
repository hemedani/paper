"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { StylesConfig } from "react-select";
import { getTags } from "@/app/actions/tag/getTags";
import { getKeywords } from "@/app/actions/keyword/getKeywords";
import { getAuthors } from "@/app/actions/author/getAuthors";
import { DeepPartial, ReqType } from "@/types/declarations/selectInp";
import { DefaultSearchArrayValues } from "@/utils/prepareArtticleSearch";
import {
  BookOpenIcon,
  CalendarIcon,
  CogIcon,
  DocumentTextIcon,
  FilterIcon,
  HashtagIcon,
  KeyIcon,
  SearchIcon,
  UsersIcon,
} from "../atoms/Icons";

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

export type AdvencedArticleSearchParams = ReqType["main"]["article"]["getArticles"]["set"];

type SelectOption = { value: string; label: string };

const selectStyles: StylesConfig<unknown, boolean> = {
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  menu: (base) => ({
    ...base,
    overflow: "hidden",
    borderRadius: 16,
    border: "1px solid #F0F0F2",
    boxShadow: "0 24px 48px -16px rgba(0, 0, 0, 0.18)",
  }),
  option: (base, state) => ({
    ...base,
    padding: "10px 14px",
    fontSize: 14,
    cursor: "pointer",
    backgroundColor: state.isSelected
      ? "#08A6AE"
      : state.isFocused
        ? "#F8F8F9"
        : "#fff",
    color: state.isSelected ? "#fff" : "#1A1A1F",
  }),
};

/* ── Field shell ──────────────────────────────────────────────────────────── */
const Field = ({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="flex min-h-[56px] items-center gap-3 rounded-[14px] border border-[#F0F0F2] bg-white px-4 py-2 transition-all hover:border-[#D9D9DE] focus-within:border-[#08A6AE] focus-within:ring-4 focus-within:ring-[#08A6AE]/10">
    {icon && <span className="shrink-0 text-[#9A9AA1]">{icon}</span>}
    <span className="shrink-0 whitespace-nowrap text-[15px] font-semibold leading-[1.7] text-black">
      {label}
    </span>
    <span className="h-[22px] w-px shrink-0 bg-[#F0F0F2]" aria-hidden />
    <div className="min-w-0 flex-1">{children}</div>
  </div>
);

/* ── Section shell ────────────────────────────────────────────────────────── */
const Section = ({
  title,
  icon,
  children,
  gridClassName = "md:grid-cols-2 lg:grid-cols-3",
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  gridClassName?: string;
}) => (
  <section className="flex flex-col gap-4">
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#EDFEFF] text-[#08A6AE]">
        {icon}
      </span>
      <h3 className="text-[17px] font-bold leading-[1.7] text-black">
        {title}
      </h3>
    </div>
    <div className={`grid grid-cols-1 gap-4 ${gridClassName}`}>{children}</div>
  </section>
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
  const searchKey = searchParams.toString();

  const parsedParams: DeepPartial<AdvencedArticleSearchParams> = useMemo(
    () =>
      Array.from(new URLSearchParams(searchKey).entries()).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]:
            key === "tagIds" || key === "keywordIds" || key === "authorIds"
              ? value.split(",").filter(Boolean)
              : value,
        }),
        {},
      ),
    [searchKey],
  );

  const { register, handleSubmit, setValue, reset, formState } =
    useForm<AdvencedArticleSearchParams>({ defaultValues: parsedParams });
  const { errors } = formState;

  useEffect(() => {
    if (isOpen) reset(parsedParams);
  }, [isOpen, parsedParams, reset]);

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

  const loadKeywordsOptions = useCallback(async (input?: string) => {
    const query = input?.trim();
    const set: ReqType["main"]["keyword"]["getKeywords"]["set"] = {
      limit: 10,
      page: 1,
    };
    if (query) set.name = query;

    try {
      const response = await getKeywords({
        set,
        get: { _id: 1, name: 1 },
      });
      if (!Array.isArray(response)) return [];
      return response.map((keyword: { _id: string; name: string }) => ({
        value: keyword._id,
        label: keyword.name,
      }));
    } catch {
      return [];
    }
  }, []);

  const loadAuthorsOptions = useCallback(async (input?: string) => {
    const query = input?.trim();
    const set: ReqType["main"]["author"]["gets"]["set"] = {
      limit: 10,
      page: 1,
    };
    const get = { _id: 1 as const, first_name: 1 as const, last_name: 1 as const };

    type AuthorRow = { _id: string; first_name?: string; last_name?: string };
    const toOption = (author: AuthorRow): SelectOption => ({
      value: author._id,
      label:
        `${author.first_name ?? ""} ${author.last_name ?? ""}`.trim() || "—",
    });

    try {
      if (!query) {
        const response = await getAuthors({ set, get });
        return Array.isArray(response) ? response.map(toOption) : [];
      }

      const parts = query.split(/\s+/);

      if (parts.length > 1) {
        const response = await getAuthors({
          set: {
            ...set,
            first_name: parts[0],
            last_name: parts.slice(1).join(" "),
          },
          get,
        });
        return Array.isArray(response) ? response.map(toOption) : [];
      }

      const [byFirstName, byLastName] = await Promise.all([
        getAuthors({ set: { ...set, first_name: query }, get }),
        getAuthors({ set: { ...set, last_name: query }, get }),
      ]);

      const merged: AuthorRow[] = [
        ...(Array.isArray(byFirstName) ? byFirstName : []),
        ...(Array.isArray(byLastName) ? byLastName : []),
      ];

      const seen = new Set<string>();
      return merged
        .filter((author) => {
          if (!author?._id || seen.has(author._id)) return false;
          seen.add(author._id);
          return true;
        })
        .slice(0, 10)
        .map(toOption);
    } catch {
      return [];
    }
  }, []);

  const loadTagOptions = useCallback(async (input?: string) => {
    const query = input?.trim();
    const set: ReqType["main"]["tag"]["getTags"]["set"] = {
      limit: 10,
      page: 1,
    };
    if (query) set.name = query;

    try {
      const response = await getTags({
        set,
        get: { _id: 1, name: 1 },
      });
      if (!Array.isArray(response)) return [];
      return response.map((tag: { _id: string; name: string }) => ({
        value: tag._id,
        label: tag.name,
      }));
    } catch {
      return [];
    }
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
    styles: selectStyles,
    noOptionsMessage: () => "موردی یافت نشد",
    loadingMessage: () => "در حال جستجو...",
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
          <Section title="فیلتر بر اساس" icon={<FilterIcon className="h-4 w-4" />}>
            <Field label="نویسندگان" icon={<UsersIcon className="h-4 w-4" />}>
              <div className="pd-select">
                <AsyncSelect
                  {...selectProps}
                  instanceId="advanced-authors"
                  name="authorIds"
                  aria-label="نویسندگان"
                  defaultValue={authors}
                  loadOptions={loadAuthorsOptions}
                  placeholder="انتخاب کنید"
                  onChange={(val) =>
                    setValue(
                      "authorIds",
                      ((val ?? []) as SelectOption[]).map((v) => v.value),
                      { shouldValidate: true },
                    )
                  }
                />
              </div>
            </Field>
            <Field label="برچسب‌ها" icon={<HashtagIcon className="h-4 w-4" />}>
              <div className="pd-select">
                <AsyncSelect
                  {...selectProps}
                  instanceId="advanced-tags"
                  name="tagIds"
                  aria-label="برچسب‌ها"
                  defaultValue={tags}
                  loadOptions={loadTagOptions}
                  placeholder="انتخاب کنید"
                  onChange={(val) =>
                    setValue(
                      "tagIds",
                      ((val ?? []) as SelectOption[]).map((v) => v.value),
                      { shouldValidate: true },
                    )
                  }
                />
              </div>
            </Field>
            <Field label="کلمات کلیدی" icon={<KeyIcon className="h-4 w-4" />}>
              <div className="pd-select">
                <AsyncSelect
                  {...selectProps}
                  instanceId="advanced-keywords"
                  name="keywordIds"
                  aria-label="کلمات کلیدی"
                  defaultValue={keywords}
                  loadOptions={loadKeywordsOptions}
                  placeholder="انتخاب کنید"
                  onChange={(val) =>
                    setValue(
                      "keywordIds",
                      ((val ?? []) as SelectOption[]).map((v) => v.value),
                      { shouldValidate: true },
                    )
                  }
                />
              </div>
            </Field>
          </Section>

          {/* Text search */}
          <Section
            title="جستجوی متن"
            icon={<SearchIcon className="h-4 w-4" />}
            gridClassName="md:grid-cols-2 lg:grid-cols-3"
          >
            <Field label="جستجوی کلی" icon={<SearchIcon className="h-4 w-4" />}>
              <input
                {...register("search")}
                className={inputClass}
                placeholder="عبارت جستجو..."
                aria-label="جستجوی کلی"
              />
            </Field>
            <Field label="عنوان" icon={<DocumentTextIcon className="h-4 w-4" />}>
              <input
                {...register("title")}
                className={inputClass}
                placeholder="اینجا وارد کنید..."
                aria-label="عنوان"
              />
            </Field>
            <Field label="چکیده" icon={<DocumentTextIcon className="h-4 w-4" />}>
              <input
                {...register("abstract")}
                className={inputClass}
                placeholder="اینجا وارد کنید..."
                aria-label="چکیده"
              />
            </Field>
          </Section>

          {/* Publication details */}
          <Section
            title="جزئیات انتشار"
            icon={<BookOpenIcon className="h-4 w-4" />}
          >
            <Field label="نوع مقاله" icon={<BookOpenIcon className="h-4 w-4" />}>
              <select
                {...register("articleType")}
                className={`${inputClass} cursor-pointer`}
                aria-label="نوع مقاله"
              >
                <option value="">همه</option>
                <option value="journalArticle">مقاله ژورنالی</option>
                <option value="book">کتاب</option>
              </select>
            </Field>
            <Field label="انتشارات" icon={<BookOpenIcon className="h-4 w-4" />}>
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
            <Field label="سال انتشار" icon={<CalendarIcon className="h-4 w-4" />}>
              <input
                {...register("publicationYear")}
                type="number"
                min={1250}
                max={1500}
                step={1}
                inputMode="numeric"
                className={inputClass}
                placeholder="سال انتشار"
                aria-label="سال انتشار"
              />
            </Field>
            <Field label="شماره (از)">
              <input
                {...register("issue")}
                type="number"
                min={1}
                step={1}
                inputMode="numeric"
                className={inputClass}
                placeholder="حداقل شماره"
                aria-label="شماره"
              />
            </Field>
            <Field label="جلد (از)">
              <input
                {...register("volume")}
                type="number"
                min={1}
                step={1}
                inputMode="numeric"
                className={inputClass}
                placeholder="حداقل جلد"
                aria-label="جلد"
              />
            </Field>
          </Section>

          {/* Pagination settings */}
          <Section
            title="تنظیمات صفحه‌بندی"
            icon={<CogIcon className="h-4 w-4" />}
            gridClassName="md:grid-cols-2"
          >
            <Field label="شماره صفحه">
              <input
                {...register("page")}
                type="number"
                min={1}
                step={1}
                inputMode="numeric"
                className={inputClass}
                placeholder="اینجا وارد کنید..."
                aria-label="شماره صفحه"
              />
            </Field>
            <Field label="تعداد در صفحه">
              <input
                {...register("limit")}
                type="number"
                min={1}
                step={1}
                inputMode="numeric"
                className={inputClass}
                placeholder="اینجا وارد کنید..."
                aria-label="تعداد در صفحه"
              />
            </Field>
          </Section>

          {(errors.title || errors.abstract) && (
            <p className="text-[13px] font-medium text-red-500">
              مقادیر وارد شده معتبر نیستند، لطفاً دوباره بررسی کنید.
            </p>
          )}

          <div className="flex justify-end border-t border-[#F0F0F2] pt-6">
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
