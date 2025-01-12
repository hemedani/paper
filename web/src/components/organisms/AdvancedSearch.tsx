"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "../atoms/Input";
import AsyncSelect from "react-select/async";
import { MultiValue } from "react-select";
import { getTags } from "@/app/actions/tag/getTags";

type SearchCriteria = {
  title?: string;
  abstract?: string;
  tags?: string[];
  publication?: string;
  authors?: string;
  DOI?: string;
  ISBN?: string;
  ISNN?: string;
};

const AdvancedSearch: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const { control, handleSubmit, formState:{errors}, setValue } = useForm<SearchCriteria>({
    defaultValues: {
      title: "",
      abstract: "",
      tags: [],
      publication: "",
      authors: "",
      DOI: "",
      ISBN: "",
      ISNN: "",
    },
  });

  const router = useRouter();

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
      const values = selectedOptions.map((option) => option.value);
      setValue("tags", values);
    };

  // const onSubmit: SubmitHandler<SearchCriteria> = (criteria) => {
  //   const queryString = Object.entries(criteria)
  //     .filter(([value]) => value.trim() !== "")
  //     .map(
  //       ([key, value]) =>
  //         `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  //     )
  //     .join("&");

  //   router.push(`/?${queryString}`);
  // };
  const onSubmit: SubmitHandler<SearchCriteria> = (criteria) => {
    const queryString = Object.entries(criteria)
      .filter(([key, value]) => value && value.toString().trim() !== "")
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          // اگر مقدار آرایه باشد، به رشته‌ای جدا شده با کاما تبدیل شود
          return `${encodeURIComponent(key)}=${encodeURIComponent(
            value.join(",")
          )}`;
        }
        // برای مقادیر رشته‌ای یا دیگر انواع
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
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
          {/* <Input
            label="برچسب"
            name="tags"
            placeholder="برچسب مقاله"
            control={control}
            className="w-full text-right"
          /> */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="tagIds"
              className="text-sm font-medium text-gray-700"
            >
              برچسب‌ها
            </label>
            <AsyncSelect
              isMulti
              cacheOptions
              loadOptions={loadTagOptions}
              defaultOptions
              onChange={handleTagChange}
              placeholder="برچسب‌ها را انتخاب کنید"
              classNamePrefix="react-select"
            />
            {errors.tags && (
              <span className="text-red-500 text-xs">
                {errors.tags.message}
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
          <Input
            label="نویسنده"
            name="authors"
            placeholder="نام نویسنده"
            control={control}
            className="w-full text-right"
          />
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
