"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { MultiValue, SingleValue } from "react-select";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { UploadImage } from "@/components/molecules/UploadFile"; // فرض می‌کنیم این کامپوننت وجود دارد
import { getTags } from "@/app/actions/tag/getTags";
import { getPublications } from "@/app/actions/publication/getPublications";
import { getAuthors } from "@/app/actions/author/getAuthors";
import { getKeywords } from "@/app/actions/keyword/getKeywords";

// تعریف اسکیما برای اعتبارسنجی فرم
export const FormSchema = z.object({
  avatar: z.string().optional(), // آواتار اختیاری
  doc: z.string().optional(), // سند اختیاری
  publicationId: z.string().nonempty("انتشار الزامی است"), // انتشارات
  tagIds: z.array(z.string()).nonempty("حداقل یک برچسب انتخاب کنید"), // برچسب‌ها
  keywordIds: z.array(z.string()).nonempty("حداقل یک کلمه کلیدی انتخاب کنید"), // کلمات کلیدی
  authorIds: z.array(z.string()).nonempty("حداقل یک نویسنده انتخاب کنید"), // نویسندگان
});

export type FormSchemaType = z.infer<typeof FormSchema>;

export const EditArticleRelationForm = ({ token }: { token?: string }) => {
  const [imageAvatar, setImageAvatar] = useState<string | null>(null);
  const [imageDoc, setImageDoc] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log("Form Data:", data);
    // ارسال داده‌ها به سرور
  };

  // بارگذاری گزینه‌های انتشارات
  const loadPublicationOptions = async (inputValue: string) => {
    const response = await getPublications({
      set: { title: inputValue, limit: 10, page: 1 },
      get: { _id: 1, title: 1 },
    });
    return response.map((publication: { _id: string; title: string }) => ({
      value: publication._id,
      label: publication.title,
    }));
  };

  const handlePublicationChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    setValue("publicationId", selectedOption?.value || "");
  };

  // بارگذاری گزینه‌های برچسب‌ها
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
    setValue("tagIds", values as [string, ...string[]]);
  };

  // بارگذاری گزینه‌های کلمات کلیدی
  const loadKeywordOptions = async (inputValue: string) => {
    const response = await getKeywords({
      set: { name: inputValue, limit: 10, page: 1 },
      get: { _id: 1, name: 1 },
    });
    return response.map((keyword: { _id: string; name: string }) => ({
      value: keyword._id,
      label: keyword.name,
    }));
  };

  const handleKeywordChange = (
    selectedOptions: MultiValue<{ value: string; label: string }>
  ) => {
    const values = selectedOptions.map((option) => option.value);
    setValue("keywordIds", values as [string, ...string[]]);
  };

  // بارگذاری گزینه‌های نویسندگان
  const loadAuthorOptions = async (inputValue: string) => {
    const response = await getAuthors({
      set: { limit: 10, page: 1 },
      get: { _id: 1, first_name: 1, last_name: 1 },
    });
    return response.map(
      (author: { _id: string; first_name: string; last_name: string }) => ({
        value: author._id,
        label: `${author.first_name} ${author.last_name}`,
      })
    );
  };

  const handleAuthorChange = (
    selectedOptions: MultiValue<{ value: string; label: string }>
  ) => {
    const values = selectedOptions.map((option) => option.value);
    setValue("authorIds", values as [string, ...string[]]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">فرم ایجاد محتوا</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* بخش آپلود تصاویر */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">
              عکس پروفایل
            </span>
            <UploadImage
              inputName="avatar"
              setUploadedImage={setImageAvatar}
              type="image"
              token={token}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">عکس سند</span>
            <UploadImage
              inputName="doc"
              setUploadedImage={setImageDoc}
              type="image"
              token={token}
            />
          </div>
        </div>

        {/* بخش انتخاب‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="publicationId"
              className="text-sm font-medium text-gray-700"
            >
              انتشارات
            </label>
            <AsyncSelect
              cacheOptions
              loadOptions={loadPublicationOptions}
              defaultOptions
              onChange={handlePublicationChange}
              placeholder="انتشارات را انتخاب کنید"
              classNamePrefix="react-select"
            />
            {errors.publicationId && (
              <span className="text-red-500 text-xs">
                {errors.publicationId.message}
              </span>
            )}
          </div>

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
            {errors.tagIds && (
              <span className="text-red-500 text-xs">
                {errors.tagIds.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="keywordIds"
              className="text-sm font-medium text-gray-700"
            >
              کلمات کلیدی
            </label>
            <AsyncSelect
              isMulti
              cacheOptions
              loadOptions={loadKeywordOptions}
              defaultOptions
              onChange={handleKeywordChange}
              placeholder="کلمات کلیدی را انتخاب کنید"
              classNamePrefix="react-select"
            />
            {errors.keywordIds && (
              <span className="text-red-500 text-xs">
                {errors.keywordIds.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="authorIds"
              className="text-sm font-medium text-gray-700"
            >
              نویسندگان
            </label>
            <AsyncSelect
              isMulti
              cacheOptions
              loadOptions={loadAuthorOptions}
              defaultOptions
              onChange={handleAuthorChange}
              placeholder="نویسندگان را انتخاب کنید"
              classNamePrefix="react-select"
            />
            {errors.authorIds && (
              <span className="text-red-500 text-xs">
                {errors.authorIds.message}
              </span>
            )}
          </div>
        </div>

        {/* دکمه ارسال */}
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            ارسال
          </button>
        </div>
      </form>
    </div>
  );
};
