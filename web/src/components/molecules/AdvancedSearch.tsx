"use client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "../atoms/Input";
import AsyncSelect from "react-select/async";
import { MultiValue } from "react-select";
import { getTags } from "@/app/actions/tag/getTags";
import { getKeywords } from "@/app/actions/keyword/getKeywords";
import { getAuthor } from "@/app/actions/author/getAuthor";
import { getAuthors } from "@/app/actions/author/getAuthors";

type SearchCriteria = {
  title?: string;
  abstract?: string;
  tags?: string[];
  authors?: string[];
  keywords?: string[];
  publication?: string;
  DOI?: string;
  ISBN?: string;
  ISNN?: string;
};

const AdvancedSearch: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const params = useSearchParams();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SearchCriteria>();

  // useEffect(() => {
  //   setValue("title", params.get("title") || "");
  //   setValue("abstract", params.get("abstract") || "");
  //   setValue("tags", params.get("tags")?.split(",") || []);
  //   setValue("publication", params.get("publication") || "");
  //   setValue("authors", params.get("authors") || "");
  //   setValue("DOI", params.get("DOI") || "");
  //   setValue("ISBN", params.get("ISBN") || "");
  //   setValue("ISNN", params.get("ISNN") || "");
  // }, [params, setValue]);

  const loadKeywordsOptions = async (inputValue: string) => {
    const response = await getKeywords({
      set: { name: inputValue, limit: 10, page: 1 },
      get: { _id: 1, name: 1 },
    });
    return response.map((keyword: { _id: string; name: string }) => ({
      value: keyword._id,
      label: keyword.name,
    }));
  };

  const handleKeywordsChange = (
    selectedOptions: MultiValue<{ value: string; label: string }>
  ) => {
    const values = selectedOptions.map((option) => option.label);
    setValue("keywords", values);
  };

  const loadAuthorsOptions = async (inputValue: string) => {
    const response = await getAuthors({
      set: { first_name: "", last_name: inputValue, limit: 10, page: 1 },
      get: { _id: 1, first_name: 1, last_name: 1 },
    });
    return response.map(
      (author: { _id: string; first_name: string; last_name: string }) => ({
        value: author._id,
        label: `${author.first_name} ${author.last_name}`,
      })
    );
  };

  const handleAuthorsChange = (
    selectedOptions: MultiValue<{ value: string; label: string }>
  ) => {
    const values = selectedOptions.map((option) => option.label);
    setValue("authors", values);
  };

  const loadTagOptions = async (inputValue: string) => {
    const response = await getTags({
      set: { name: inputValue, limit: 10, page: 1 },
      get: { _id: 1, name: 1 },
    });
    return response.map((tag: { _id: string; name: string }) => ({
      value: tag._id,
      label: tag.name,
    }));
  };

  const handleTagChange = (
    selectedOptions: MultiValue<{ value: string; label: string }>
  ) => {
    const values = selectedOptions.map((option) => option.label);
    setValue("tags", values);
  };

  const onSubmit: SubmitHandler<SearchCriteria> = (criteria) => {
    const filteredCriteria = Object.entries(criteria).filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value && value.toString().trim() !== "";
    });

    const queryString = filteredCriteria
      .map(([key, value]) =>
        Array.isArray(value)
          ? `${encodeURIComponent(key)}=${encodeURIComponent(value.join(","))}`
          : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    router.push(`/?${queryString}`);
  };

  return (
    <div
      className={`transition-all duration-500 ease-in-out overflow-hidden bg-white border rounded-lg shadow-lg mt-4 ${
        isOpen ? "max-h-[1000px] opacity-100 p-6" : "max-h-0 opacity-0"
      }`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">جستجوی پیشرفته</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Input
            label="عنوان"
            name="title"
            placeholder="عنوان مقاله"
            control={control}
            className="w-full text-right"
          />
          <Input
            label="چکیده"
            name="abstract"
            placeholder="چکیده مقاله"
            control={control}
            className="w-full text-right"
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="tags" className="text-sm font-medium text-gray-700">
              برچسب‌ها
            </label>
            <AsyncSelect
              isMulti
              cacheOptions
              loadOptions={loadTagOptions}
              defaultOptions
              onChange={handleTagChange}
              name="tags"
              placeholder="برچسب‌ها را انتخاب کنید"
              classNamePrefix="react-select"
            />
            {errors.tags && (
              <span className="text-red-500 text-xs">
                {errors.tags.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="authors"
              className="text-sm text-right font-medium text-gray-700"
            >
              نویسندگان
            </label>
            <AsyncSelect
              isMulti
              cacheOptions
              loadOptions={loadAuthorsOptions}
              defaultOptions
              onChange={handleAuthorsChange}
              name="authors"
              placeholder="نویسنده ها را انتخاب کنید"
              classNamePrefix="react-select"
            />
            {errors.authors && (
              <span className="text-red-500 text-xs">
                {errors.authors.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="keywords"
              className="text-sm text-right font-medium text-gray-700"
            >
              کلمه های کلیدی
            </label>
            <AsyncSelect
              isMulti
              cacheOptions
              loadOptions={loadKeywordsOptions}
              defaultOptions
              onChange={handleKeywordsChange}
              name="keywords"
              placeholder="کلمه های کلیدی  را انتخاب کنید"
              classNamePrefix="react-select"
            />
            {errors.keywords && (
              <span className="text-red-500 text-xs">
                {errors.keywords.message}
              </span>
            )}
          </div>
          <Input
            label="انتشارات"
            name="publication"
            placeholder="نام انتشارات"
            control={control}
            className="w-full text-right"
          />
          {/* <Input
            label="نویسنده"
            name="authors"
            placeholder="نام نویسنده"
            control={control}
            className="w-full text-right"
          /> */}
          <Input
            label="DOI"
            name="DOI"
            placeholder=""
            control={control}
            className="w-full text-right"
          />
          <Input
            label="ISBN"
            name="ISBN"
            placeholder=""
            control={control}
            className="w-full text-right"
          />
          <Input
            label="ISNN"
            name="ISNN"
            placeholder=""
            control={control}
            className="w-full text-right"
          />
        </div>
        <div className="flex justify-end items-center">
          <button
            type="submit"
            className="px-6 h-10 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-semibold rounded-md shadow hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
          >
            جستجو
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdvancedSearch;
