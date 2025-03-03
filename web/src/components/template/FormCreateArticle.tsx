"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { MultiValue, SingleValue } from "react-select";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import SelectBox from "../atoms/Select";
import { UploadImage } from "@/components/molecules/UploadFile";
import { getTags } from "@/app/actions/tag/getTags";
import { getPublications } from "@/app/actions/publication/getPublications";
import { createArticle } from "@/app/actions/article/createArticle";
import { getAuthors } from "@/app/actions/author/getAuthors";
import { ToastNotify } from "@/utils/helper";
import { getKeywords } from "@/app/actions/keyword/getKeywords";

// تعریف اسکیما برای اعتبارسنجی فرم
export const ArticleCreateSchema = z.object({
  tags: z.array(z.string()).nonempty("حداقل یک برچسب انتخاب کنید"),
  keywords: z.array(z.string()).nonempty("حداقل یک کلمه کلیدی انتخاب کنید"),
  authors: z.array(z.string()).nonempty("حداقل یک نویسنده انتخاب کنید"),
  publication: z.string().nonempty("انتشار الزامی است"),
  key: z.string().nonempty("کلید الزامی است"),
  articleType: z.enum(["journalArticle", "book"], {
    required_error: "نوع مقاله الزامی است",
  }),
  title: z.string().nonempty("عنوان الزامی است"),
  abstract: z.string().nonempty("چکیده الزامی است"),
  ISBN: z.string().nonempty("ISBN الزامی است"),
  ISNN: z.string().nonempty("ISNN الزامی است"),
  DOI: z.string().nonempty("DOI الزامی است"),
  URL: z.string().url("فرمت URL نامعتبر است").nonempty("URL الزامی است"),
  page: z.string().nonempty("تعداد صفحات الزامی است"),
  publicationYear: z.coerce.number().int("سال انتشار باید عدد صحیح باشد"),
  issue: z.coerce.number().int("شماره موضوع باید عدد صحیح باشد"),
  volume: z.coerce.number().int("جلد باید عدد صحیح باشد"),
});

export type ArticleFormCreateSchemaType = z.infer<typeof ArticleCreateSchema>;

export const FormCreateArticle = ({
  defaultValues,
  token,
}: {
  defaultValues?: ArticleFormCreateSchemaType & {
    tagList: { _id: string; name: string }[];
  };
  token?: string;
}) => {
  const router = useRouter();
  const [imageAvatar, setImageAvatar] = useState<string | null>(null);
  const [imageNationalCard, setImageNationalCard] = useState<string | null>(
    null
  );

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ArticleFormCreateSchemaType>({
    defaultValues,
    resolver: zodResolver(ArticleCreateSchema),
  });

  const onSubmit: SubmitHandler<ArticleFormCreateSchemaType> = async (data) => {
    const updatedData = {
      ...data,
      avatart: imageAvatar,
      doc: imageNationalCard,
    };

    const newArticle = await createArticle(updatedData);

    if (newArticle._id) {
      ToastNotify("success", "مقاله با موفقیت ایجاد شد");
      router.replace("/admin/articles");
    }
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
    setValue("tags", values as [string, ...string[]]);
  };

  const loadAuthorOptions = async (inputValue: string) => {
    const value = inputValue.split(" ");
    const response = await getAuthors({
      set: { limit: 10, page: 1, first_name: value[0], last_name: value[1] },
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

  const loadKeywordOptions = async (inputValue: string) => {
    const response = await getKeywords({
      set: { name: inputValue, limit: 10, page: 1 },
      get: { _id: 1, name: 1 },
    });
    return response.map((key: { _id: string; name: string }) => ({
      value: key._id,
      label: key.name,
    }));
  };

  const handleKeywordChange = (
    selectedOptions: MultiValue<{ value: string; label: string }>
  ) => {
    const values = selectedOptions.map((option) => option.value);
    setValue("keywords", values as [string, ...string[]]);
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
    setValue("publication", selectedOption?.value || "");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">ایجاد مقاله جدید</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* بخش انتخاب‌ها */}
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
              defaultValue={
                defaultValues?.tagList?.map((tag) => ({
                  label: tag.name,
                  value: tag._id,
                })) || []
              }
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
            {errors.authors && (
              <span className="text-red-500 text-xs">
                {errors.authors?.message}
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
              کلیمه های کلیدی
            </label>
            <AsyncSelect
              isMulti
              cacheOptions
              loadOptions={loadKeywordOptions}
              defaultOptions
              onChange={handleKeywordChange}
              placeholder="کلمه های کلیدی را انتخاب کنید"
              classNamePrefix="react-select"
            />
            {errors.tags && (
              <span className="text-red-500 text-xs">
                {errors.tags.message}
              </span>
            )}
          </div>
        </div>

        {/* بخش اطلاعات اصلی */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="key"
              className="block text-sm font-medium text-gray-700"
            >
              کلید
            </label>
            <input
              id="key"
              type="text"
              {...register("key")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.key && (
              <span className="text-red-500 text-xs">{errors.key.message}</span>
            )}
          </div>

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

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              عنوان
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.title && (
              <span className="text-red-500 text-xs">
                {errors.title.message}
              </span>
            )}
          </div>
        </div>

        {/* بخش چکیده */}
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
            {...control.register("abstract", { required: "چکیده الزامی است" })}
          />
          {errors.abstract && (
            <span className="text-red-500 text-xs">
              {errors.abstract.message}
            </span>
          )}
        </div>

        {/* بخش اطلاعات تکمیلی */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="ISBN"
              className="block text-sm font-medium text-gray-700"
            >
              ISBN
            </label>
            <input
              id="ISBN"
              type="text"
              placeholder="ISBN را وارد کنید"
              {...register("ISBN")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.ISBN && (
              <span className="text-red-500 text-xs">
                {errors.ISBN.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="ISNN"
              className="block text-sm font-medium text-gray-700"
            >
              ISNN
            </label>
            <input
              id="ISNN"
              type="text"
              placeholder="ISNN را وارد کنید"
              {...register("ISNN")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.ISNN && (
              <span className="text-red-500 text-xs">
                {errors.ISNN.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="DOI"
              className="block text-sm font-medium text-gray-700"
            >
              DOI
            </label>
            <input
              id="DOI"
              type="text"
              placeholder="DOI را وارد کنید"
              {...register("DOI")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.DOI && (
              <span className="text-red-500 text-xs">{errors.DOI.message}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="URL"
              className="block text-sm font-medium text-gray-700"
            >
              URL
            </label>
            <input
              id="URL"
              type="text"
              placeholder="URL را وارد کنید"
              {...register("URL")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.URL && (
              <span className="text-red-500 text-xs">{errors.URL.message}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="page"
              className="block text-sm font-medium text-gray-700"
            >
              صفحات
            </label>
            <input
              id="page"
              type="text"
              placeholder="تعداد صفحات را وارد کنید"
              {...register("page")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.page && (
              <span className="text-red-500 text-xs">
                {errors.page.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="publicationYear"
              className="block text-sm font-medium text-gray-700"
            >
              سال انتشار
            </label>
            <input
              id="publicationYear"
              type="number"
              placeholder="سال انتشار را وارد کنید"
              {...register("publicationYear")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.publicationYear && (
              <span className="text-red-500 text-xs">
                {errors.publicationYear.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="issue"
              className="block text-sm font-medium text-gray-700"
            >
              شماره موضوع
            </label>
            <input
              id="issue"
              type="number"
              placeholder="شماره را وارد کنید"
              {...register("issue")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.issue && (
              <span className="text-red-500 text-xs">
                {errors.issue.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="volume"
              className="block text-sm font-medium text-gray-700"
            >
              جلد
            </label>
            <input
              id="volume"
              type="number"
              placeholder="جلد را وارد کنید"
              {...register("volume")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.volume && (
              <span className="text-red-500 text-xs">
                {errors.volume.message}
              </span>
            )}
          </div>
        </div>

        {/* بخش آپلود تصاویر */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">
              عکس پروفایل کاربری
            </span>
            <UploadImage
              inputName="avatar"
              setUploadedImage={setImageAvatar}
              type="image"
              token={token}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">
              pdf مقاله را آپلود کنید
            </span>
            <UploadImage
              inputName="nationalCard"
              setUploadedImage={setImageNationalCard}
              type="doc"
              token={token}
            />
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
