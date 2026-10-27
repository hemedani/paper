"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { getTags } from "@/app/actions/tag/getTags";
import { getKeywords } from "@/app/actions/keyword/getKeywords";
import { getAuthors } from "@/app/actions/author/getAuthors";
import MyInput from "../atoms/MyInput";
import MyAsyncMultiSelect from "../atoms/MyAsyncMultiSelect";
import { DeepPartial, ReqType } from "@/types/declarations/selectInp";
import { DefaultSearchArrayValues } from "@/utils/prepareArtticleSearch";
import { AdminIcon, btn } from "../organisms/admin/AdminUI";

export type AdvencedArticleSearchParams =
  ReqType["main"]["article"]["getArticles"]["set"];

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="rounded-[18px] border border-[#F0F0F2] bg-white p-4">
    <h4 className="mb-3.5 text-[12.5px] font-extrabold text-[#3C3C42]">{title}</h4>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  </section>
);

const AdvancedSearch: React.FC<{
  isOpen: boolean;
  defaultSearchArrayValues: DefaultSearchArrayValues;
  pageAddress?: string;
}> = ({
  isOpen,
  defaultSearchArrayValues: { tags, keywords, authors },
  pageAddress,
}) => {
  const router = useRouter();
  const searchParams: DeepPartial<AdvencedArticleSearchParams> = Array.from(
    useSearchParams().entries()
  ).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]:
        key === "tagIds" || key === "keywordIds" || key === "authorIds"
          ? value.split(",")
          : value,
    }),
    {}
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AdvencedArticleSearchParams>({ defaultValues: searchParams });

  const loadKeywordsOptions = async (keywordName?: string) => {
    const set: ReqType["main"]["keyword"]["getKeywords"]["set"] = {
      limit: 10,
      page: 1,
    };
    if (keywordName) {
      set.name = keywordName;
    }
    const response = await getKeywords({
      set,
      get: { _id: 1, name: 1 },
    });
    return response.map((keyword: { _id: string; name: string }) => ({
      value: keyword._id,
      label: keyword.name,
    }));
  };

  const loadAuthorsOptions = async (authorLastname?: string) => {
    const set: ReqType["main"]["author"]["gets"]["set"] = {
      limit: 10,
      page: 1,
    };
    if (authorLastname) {
      set.last_name = authorLastname;
    }
    const response = await getAuthors({
      set,
      get: { _id: 1, first_name: 1, last_name: 1 },
    });

    return response.map(
      (author: { _id: string; first_name: string; last_name: string }) => ({
        value: author._id,
        label: `${author.first_name} ${author.last_name}`,
      })
    );
  };

  const loadTagOptions = async (tagName?: string) => {
    const set: ReqType["main"]["tag"]["getTags"]["set"] = {
      limit: 10,
      page: 1,
    };
    if (tagName) {
      set.name = tagName;
    }
    const response = await getTags({
      set,
      get: { _id: 1, name: 1 },
    });
    return response.map((tag: { _id: string; name: string }) => ({
      value: tag._id,
      label: tag.name,
    }));
  };

  const onSubmit: SubmitHandler<AdvencedArticleSearchParams> = (criteria) => {
    const queryString = Object.entries(criteria)
      .filter((filterArr) => {
        const value = filterArr[1];
        if (Array.isArray(value)) return value.length > 0;
        return value && value.toString().trim() !== "";
      })
      .map(([key, value]) =>
        Array.isArray(value)
          ? `${encodeURIComponent(key)}=${encodeURIComponent(value.join(","))}`
          : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    const newRoute = pageAddress
      ? `${pageAddress}/?${queryString}`
      : `/?${queryString}`;
    router.push(newRoute);
  };

  const resetFilters = () => {
    router.push(pageAddress ? `${pageAddress}/` : "/");
  };

  return (
    <div
      className={isOpen ? "block" : "hidden"}
      aria-hidden={!isOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Section title="فیلتر بر اساس">
          <MyAsyncMultiSelect
            className="w-full"
            label="برچسب‌ها"
            setValue={setValue}
            defaultValue={tags}
            name="tagIds"
            defaultOptions
            loadOptions={loadTagOptions}
            errMsg={errors.tagIds?.message}
          />
          <MyAsyncMultiSelect
            className="w-full"
            label="کلمات کلیدی"
            setValue={setValue}
            defaultValue={keywords}
            name="keywordIds"
            defaultOptions
            loadOptions={loadKeywordsOptions}
            errMsg={errors.keywordIds?.message}
          />
          <MyAsyncMultiSelect
            className="w-full"
            label="نویسندگان"
            setValue={setValue}
            defaultValue={authors}
            name="authorIds"
            defaultOptions
            loadOptions={loadAuthorsOptions}
            errMsg={errors.authorIds?.message}
          />
        </Section>

        <Section title="جستجوی متن">
          <MyInput
            className="w-full"
            name="title"
            errMsg={errors.title?.message}
            label="عنوان"
            placeholder="عنوان مقاله را وارد کنید"
            register={register}
          />
          <MyInput
            className="w-full"
            name="abstract"
            errMsg={errors.abstract?.message}
            label="چکیده"
            placeholder="چکیده مقاله را وارد کنید"
            register={register}
          />
        </Section>

        <Section title="جزئیات انتشار">
          <MyInput
            className="w-full"
            name="publication"
            errMsg={errors.publication?.message}
            label="انتشارات"
            placeholder="نام انتشارات را وارد کنید"
            register={register}
          />
          <MyInput
            className="w-full"
            name="DOI"
            errMsg={errors.DOI?.message}
            label="DOI"
            placeholder="شماره DOI را وارد کنید"
            register={register}
          />
          <MyInput
            className="w-full"
            name="ISBN"
            errMsg={errors.ISBN?.message}
            label="ISBN"
            placeholder="شماره ISBN را وارد کنید"
            register={register}
          />
          <MyInput
            className="w-full"
            name="ISNN"
            errMsg={errors.ISNN?.message}
            label="ISNN"
            placeholder="شماره ISNN را وارد کنید"
            register={register}
          />
          <MyInput
            className="w-full"
            name="publicationYear"
            type="number"
            errMsg={errors.publicationYear?.message}
            label="سال انتشار"
            placeholder="سال انتشار را وارد کنید"
            register={register}
          />
        </Section>

        <Section title="تنظیمات صفحه‌بندی">
          <MyInput
            className="w-full"
            name="page"
            type="number"
            errMsg={errors.page?.message}
            label="شماره صفحه"
            placeholder="شماره صفحه را وارد کنید"
            register={register}
          />
          <MyInput
            className="w-full"
            name="limit"
            type="number"
            errMsg={errors.limit?.message}
            label="تعداد در صفحه"
            placeholder="تعداد آیتم در هر صفحه را وارد کنید"
            register={register}
          />
        </Section>

        <div className="flex flex-col-reverse items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end">
          <button type="button" onClick={resetFilters} className={btn.secondary}>
            {AdminIcon.refresh}
            پاک کردن فیلترها
          </button>
          <button type="submit" className={btn.primary}>
            {AdminIcon.search}
            اعمال جستجو
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdvancedSearch;
