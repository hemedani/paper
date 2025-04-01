"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import SelectBox from "../atoms/Select";
import { useRouter } from "next/navigation";
import { EditArticle } from "@/app/actions/article/updateArticle";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastNotify } from "@/utils/helper";
import MyInput from "../atoms/MyInput";

// Schema تعریف اعتبارسنجی
const ArticleUpdateSchema = z.object({
  _id: z.optional(z.string()),
  key: z.string().nonempty("کلید الزامی است"),
  articleType: z.enum(["journalArticle", "book"]),
  publicationYear: z.coerce.number().int("سال انتشار باید عدد صحیح باشد"),
  title: z.string().nonempty("عنوان مقاله الزامی است"),
  abstract: z.string().nonempty("چکیده الزامی است"),
  ISBN: z.string().optional(),
  ISNN: z.string().optional(),
  DOI: z.string().optional(),
  URL: z.string().url("فرمت URL نامعتبر است").nonempty("URL الزامی است"),
  page: z.string().nonempty("صفحات الزامی است"),
  issue: z.coerce.number().int().optional(),
  volume: z.coerce.number().int().optional(),
});

export type ArticleFormUpdateSchemaType = z.infer<typeof ArticleUpdateSchema>;

export const FormUpdateArticle = ({
  defaultValues,
}: {
  defaultValues?: ArticleFormUpdateSchemaType;
}) => {
  const router = useRouter();

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

    const editDataArticle = await EditArticle(data);
    if (editDataArticle._id) {
      router.replace("/admin/articles");
      ToastNotify("success", "ویرایش انجام شد");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-100 p-6 border rounded-lg">

      <div className="flex flex-wrap w-full">
        <input
          {...register("_id")}
          id="_id"
          name="_id"
          type="text"
          disabled
          hidden
        />
        <MyInput label="عنوان" register={register} name="title" errMsg={errors.title?.message} />
        <MyInput label="چکیده" register={register} name="abstract" type="textarea" errMsg={errors.abstract?.message} />
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

      <div className="w-full flex gap-4 justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="p-4 px-8 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
        >
          ارسال
        </button>
      </div>

    </form>
  );
};
