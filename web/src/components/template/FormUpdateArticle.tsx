"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import SelectBox from "../atoms/Select";
import { useParams, useRouter } from "next/navigation";
import { EditArticle } from "@/app/actions/article/updateArticle";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastNotify } from "@/utils/helper";
import MyInput from "../atoms/MyInput";

// Schema تعریف اعتبارسنجی
const ArticleUpdateSchema = z.object({
  articleId: z.optional(z.string()),
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
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
    register,
  } = useForm<ArticleFormUpdateSchemaType>({
    defaultValues: defaultValues,
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

        <MyInput label="عنوان" register={register} name="title" errMsg={errors.title?.message} />
        <MyInput label="چکیده" register={register} name="abstract" type="textarea" errMsg={errors.abstract?.message} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MyInput label="کلید" register={register} name="key" errMsg={errors.key?.message} />
          <SelectBox
            label="نوع مقاله"
            name="articleType"
            setValue={setValue}
            errMsg={errors.articleType?.message}
            options={[
              { value: "journalArticle", label: "مقاله ژورنال" },
              { value: "book", label: "کتاب" },
            ]}
            defaultValue={(defaultValues && defaultValues.articleType) ?
              { value: defaultValues.articleType, label: defaultValues.articleType === "journalArticle" ? "مقاله ژورنال" : "کتاب" }
              : undefined}
          />
          <MyInput label="ISBN" register={register} name="ISBN" errMsg={errors.ISBN?.message} />
          <MyInput label="ISNN" register={register} name="ISNN" errMsg={errors.ISNN?.message} />
          <MyInput label="DOI" register={register} name="DOI" errMsg={errors.DOI?.message} />
          <MyInput label="URL" register={register} name="URL" errMsg={errors.URL?.message} />
          <MyInput label="صفحات" register={register} name="page" errMsg={errors.page?.message} />
          <MyInput label="سال انتشار" register={register} name="publicationYear" errMsg={errors.publicationYear?.message} />
          <MyInput label="شماره موضوع" type="number" register={register} name="issue" errMsg={errors.issue?.message} />
          <MyInput label="جلد" type="number" register={register} name="volume" errMsg={errors.volume?.message} />
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
