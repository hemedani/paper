"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import SelectBox from "../atoms/Select";
import { useParams, useRouter } from "next/navigation";
import { EditArticle } from "@/app/actions/article/updateArticle";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastNotify } from "@/utils/helper";

// Schema تعریف اعتبارسنجی
const ArticleUpdateSchema = z.object({
  articleId: z.string(),
  key: z.string().nonempty("کلید الزامی است"),
  articleType: z.enum(["journalArticle", "book"]),
  publicationYear: z.coerce.number().int("سال انتشار باید عدد صحیح باشد"),
  title: z.string().nonempty("عنوان مقاله الزامی است"),
  abstract: z.string().nonempty("چکیده الزامی است"),
  ISBN: z.string().nonempty("ISBN الزامی است"),
  ISNN: z.string().nonempty("ISNN الزامی است"),
  DOI: z.string().nonempty("DOI الزامی است"),
  URL: z.string().url("فرمت URL نامعتبر است").nonempty("URL الزامی است"),
  page: z.string().nonempty("صفحات الزامی است"),
  issue: z.coerce.number().int("شماره موضوع باید عدد صحیح باشد"),
  volume: z.coerce.number().int("جلد باید عدد صحیح باشد"),
});

export type ArticleFormUpdateSchemaType = z.infer<typeof ArticleUpdateSchema>;

export const FormUpdateArticle = ({
  defaultValues,
}: {
  defaultValues?: ArticleFormUpdateSchemaType;
}) => {
  const router = useRouter();

  const params = useParams();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    register,
  } = useForm<ArticleFormUpdateSchemaType>({
    defaultValues: defaultValues || {
      articleId: params.id as string,
      key: "",
      articleType: "journalArticle",
      publicationYear: 2023,
      title: "",
      abstract: "",
      ISBN: "",
      ISNN: "",
      DOI: "",
      URL: "",
      page: "",
      issue: 1,
      volume: 1,
    },
    resolver: zodResolver(ArticleUpdateSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ArticleFormUpdateSchemaType> = async (data) => {
    data.articleId = params.id as string;

    const editDataArticle = await EditArticle(data);
    if (editDataArticle._id) {
      router.replace("/admin/articles");
      ToastNotify("success", "ویرایش انجام شد");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">ویرایش مقاله</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <input
          {...register("articleId")}
          id="_id"
          name="_id"
          type="text"
          disabled
          hidden
        />
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
            {...register("abstract")}
          />
          {errors.abstract && (
            <span className="text-red-500 text-xs">
              {errors.abstract.message}
            </span>
          )}
        </div>

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

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            ارسال
          </button>
        </div>
      </form>
    </div>
  );
};
