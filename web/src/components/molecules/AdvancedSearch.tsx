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

export type AdvencedArticleSearchParams =
  ReqType["main"]["article"]["getArticles"]["set"];

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

  return (
    <div
      className={`transition-all duration-500 ease-in-out bg-white border rounded-lg shadow-lg max-h-auto mt-4 ${
        isOpen ? "max-h-auto opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-lg"
      >
        <h3 className="text-2xl font-bold text-gray-800 text-right mb-6">
          جستجوی پیشرفته
        </h3>

        {/* Filter by Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-700 mb-4 text-right">
            فیلتر بر اساس
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MyAsyncMultiSelect
              className="w-full"
              label="برچسب ها"
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
          </div>
        </div>

        {/* Text Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-700 mb-4 text-right">
            جستجوی متن
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </div>

        {/* Publication Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-700 mb-4 text-right">
            جزئیات انتشار
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>
        </div>

        {/* Pagination Controls Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-700 mb-4 text-right">
            تنظیمات صفحه‌بندی
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end items-center mt-8">
          <button
            type="submit"
            className="w-full md:w-auto px-8 h-12 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-base font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            جستجو
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdvancedSearch;
