"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { MultiValue, SingleValue } from "react-select";
import { useRouter } from "next/navigation";

import Input from "../atoms/Input";
import SelectBox from "../atoms/Select";
import { getTags } from "@/app/actions/tag/getTags";
import { getPublications } from "@/app/actions/publication/getPublications";
import { createArticle } from "@/app/actions/article/createArticle";
import { ReqType } from "@/types/declarations/selectInp";
import { ToastNotify } from "@/utils/helper";

export type AddUserSet = ReqType["main"]["article"]["addArticle"]["set"];

export const FormArticle = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddUserSet>({
    defaultValues: {
      key: "",
      publicationYear: 0,
      articleType: "journalArticle",
      authors: [],
      title: "",
      abstract: "",
      ISBN: "",
      ISNN: "",
      DOI: "",
      URL: "",
      page: "",
      issue: 0,
      volume: 0,
      publicationId: "",
      tagIds: [],
    },
  });

  const onSubmit: SubmitHandler<AddUserSet> = async (data) => {
    data.publicationYear = +data.publicationYear;
    data.issue = +data.issue;
    data.volume = +data.volume;
    data.authors = [data.authors.toString()];
    await createArticle(data);
    ToastNotify("success", "مقاله با موفقیت ایجاد شد");
    router.replace("/admin/articles");
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
    const values = selectedOptions.map((option) => option.value);
    setValue("tagIds", values);
  };

  const loadPublicationOptions = async (inputValue: string) => {
    const response = await getPublications({
      get: { _id: 1, title: 1 },
      set: { title: inputValue, limit: 10, page: 1 },
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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">فرم انتشار مقاله</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              htmlFor="publicationId"
              className="text-sm font-medium text-gray-700"
            >
              انتشار
            </label>
            <AsyncSelect
              cacheOptions
              loadOptions={loadPublicationOptions}
              defaultOptions
              onChange={handlePublicationChange}
              placeholder="انتشار را انتخاب کنید"
              classNamePrefix="react-select"
            />
            {errors.publicationId && (
              <span className="text-red-500 text-xs">
                {errors.publicationId.message}
              </span>
            )}
          </div>

          <Input
            label="کلید"
            placeholder="کلید را وارد کنید"
            name="key"
            control={control}
            rules={{ required: "کلید الزامی است" }}
          />

          <SelectBox
            label="نوع مقاله"
            name="articleType"
            control={control}
            options={[
              { value: "journalArticle", label: "مقاله ژورنال" },
              { value: "book", label: "کتاب" },
            ]}
            rules={{ required: "نوع مقاله الزامی است" }}
          />

          <Input
            label="نویسندگان"
            placeholder="نویسندگان را با کاما جدا کنید"
            name="authors"
            control={control}
            rules={{ required: "نویسندگان الزامی هستند" }}
          />

          <Input
            label="عنوان"
            placeholder="عنوان را وارد کنید"
            name="title"
            control={control}
            rules={{ required: "عنوان الزامی است" }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="abstract"
            className="text-sm font-medium text-gray-700"
          >
            چکیده
          </label>
          <textarea
            id="abstract"
            rows={6}
            className="resize-none px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="چکیده را وارد کنید"
            {...control.register("abstract", {
              required: "چکیده الزامی است",
            })}
          />
          {errors.abstract && (
            <span className="text-red-500 text-xs">
              {errors.abstract.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="ISBN"
            placeholder="ISBN را وارد کنید"
            name="ISBN"
            control={control}
            rules={{ required: "ISBN الزامی است" }}
          />

          <Input
            label="ISNN"
            placeholder="ISNN را وارد کنید"
            name="ISNN"
            control={control}
            rules={{ required: "ISNN الزامی است" }}
          />

          <Input
            label="DOI"
            placeholder="DOI را وارد کنید"
            name="DOI"
            control={control}
            rules={{ required: "DOI الزامی است" }}
          />

          <Input
            label="URL"
            placeholder="URL را وارد کنید"
            name="URL"
            control={control}
            rules={{
              required: "URL الزامی است",
              pattern: {
                value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)\/?.*$/,
                message: "URL نامعتبر است",
              },
            }}
          />

          <Input
            label="صفحات"
            placeholder="تعداد صفحات را وارد کنید"
            name="page"
            control={control}
            rules={{ required: "تعداد صفحات الزامی است" }}
          />

          <Input
            label="سال انتشار"
            placeholder="سال انتشار را وارد کنید"
            name="publicationYear"
            control={control}
            type="number"
          />

          <Input
            label="شماره موضوع"
            placeholder="شماره را وارد کنید"
            name="issue"
            control={control}
            type="number"
          />

          <Input
            label="جلد"
            placeholder="جلد را وارد کنید"
            name="volume"
            control={control}
            type="number"
          />
        </div>

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
