"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { MultiValue, SingleValue } from "react-select";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { UploadImage } from "@/components/molecules/UploadFile";
import { getTags } from "@/app/actions/tag/getTags";
import { getPublications } from "@/app/actions/publication/getPublications";
import { getAuthors } from "@/app/actions/author/getAuthors";
import { getKeywords } from "@/app/actions/keyword/getKeywords";
import { EditArticle } from "@/app/actions/article/editRelationArticle";
import { ToastNotify } from "@/utils/helper";

export const FormSchema = z.object({
  avatar: z.optional(z.string()),
  doc: z.optional(z.string()),
  publication: z.optional(z.string().nonempty("انتشار الزامی است")),
  tags: z.optional(z.array(z.string()).nonempty("حداقل یک برچسب انتخاب کنید")),
  keywords: z.optional(z.array(z.string()).nonempty("حداقل یک کلمه کلیدی انتخاب کنید")),
  authors: z.optional(z.array(z.string()).nonempty("حداقل یک نویسنده انتخاب کنید")),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

type BackendData = {
  _id: string;
  authors: { _id: string; first_name: string; last_name: string }[];
  avatar: { _id: string; name: string; type: string };
  doc: { _id: string; name: string; type: string };
  keywords: { _id: string; name: string }[];
  publication: { _id: string; title: string };
  tags: { _id: string; name: string }[];
};

export const EditArticleRelationForm = ({
  defaultValues,
  token,
  lesanUrl
}: {
  defaultValues?: BackendData;
  token: string;
  lesanUrl?: string
}) => {
  const [imageAvatar, setImageAvatar] = useState<string | null>(null);
  const [imageDoc, setImageDoc] = useState<string | null>(null);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormSchemaType>({
    defaultValues: {
      authors: defaultValues?.authors?.map((author) => author._id) || [],
      keywords: defaultValues?.keywords?.map((keyword) => keyword._id) || [],
      tags: defaultValues?.tags?.map((tag) => tag._id) || [],
      publication: defaultValues?.publication?._id || "",
    },
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    data.avatar = imageAvatar || "";
    data.doc = imageDoc || "";

    const dataArticle = await EditArticle(data, defaultValues?._id as string);
    if (dataArticle) {
      ToastNotify("success", "با موفقیت انجام شد");
    } else {
      ToastNotify("error", "خطا در انجام عملیات");
    }
  };

  const defaultPublicationOption = defaultValues?.publication
    ? {
      value: defaultValues.publication._id,
      label: defaultValues.publication.title,
    }
    : null;

  const defaultTagOptions =
    defaultValues?.tags?.map((tag) => ({
      value: tag._id,
      label: tag.name,
    })) || [];

  const defaultKeywordOptions =
    defaultValues?.keywords?.map((keyword) => ({
      value: keyword._id,
      label: keyword.name,
    })) || [];

  const defaultAuthorOptions =
    defaultValues?.authors?.map((author) => ({
      value: author._id,
      label: `${author.first_name} ${author.last_name}`,
    })) || [];

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
    setValue("publication", selectedOption?.value || "");
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
    setValue("tags", values as [string, ...string[]]);
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
    setValue("keywords", values as [string, ...string[]]);
  };

  // بارگذاری گزینه‌های نویسندگان
  const loadAuthorOptions = async () => {
    const response = await getAuthors({
      set: { limit: 10, page: 1, first_name: "", last_name: "" },
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
    setValue("authors", values as [string, ...string[]]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">فرم ویرایش رابطه‌ها</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* بخش آپلود تصاویر */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">
              عکس مقاله
            </span>
            <UploadImage
              inputName="avatar"
              setUploadedImage={setImageAvatar}
              type="image"
              token={token}
              lesanUrl={lesanUrl}
              filePath={defaultValues?.avatar ? defaultValues.avatar.name : ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">فایل مقاله</span>
            <UploadImage
              inputName="doc"
              setUploadedImage={setImageDoc}
              lesanUrl={lesanUrl}
              type="doc"
              token={token}
              filePath={defaultValues?.doc ? defaultValues.doc.name : ""}
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
              defaultValue={defaultPublicationOption}
            />
            {errors.publication && (
              <span className="text-red-500 text-xs">
                {errors.publication.message}
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
              defaultValue={defaultTagOptions}
            />
            {errors.tags && (
              <span className="text-red-500 text-xs">
                {errors.tags.message}
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
              defaultValue={defaultKeywordOptions}
            />
            {errors.keywords && (
              <span className="text-red-500 text-xs">
                {errors.keywords.message}
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
              defaultValue={defaultAuthorOptions}
            />
            {errors.authors && (
              <span className="text-red-500 text-xs">
                {errors.authors.message}
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
