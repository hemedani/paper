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
import {
  AdminIcon,
  AdminPanel,
  btn,
  formFooter,
  formGrid,
  formGrid3,
} from "../organisms/admin/AdminUI";

// Schema تعریف اعتبارسنجی
const ArticleUpdateSchema = z.object({
  _id: z.string(),
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
    formState: { errors, isSubmitting },
    register,
  } = useForm<ArticleFormUpdateSchemaType>({
    defaultValues: defaultValues,
    resolver: zodResolver(ArticleUpdateSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ArticleFormUpdateSchemaType> = async (data) => {

    const editDataArticle = await EditArticle(data);
    if (editDataArticle.success) {
      router.replace("/admin/articles");
      ToastNotify("success", "ویرایش انجام شد");
    } else {
      ToastNotify("error", `خطا  - ${editDataArticle.body.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input {...register("_id")} id="_id" name="_id" type="text" disabled hidden />

      <AdminPanel title="اطلاعات اصلی" icon={AdminIcon.book} bodyClassName="p-5">
        <div className={formGrid}>
          <MyInput
            className="md:col-span-2"
            label="عنوان"
            register={register}
            name="title"
            placeholder="عنوان کامل مقاله را وارد کنید"
            errMsg={errors.title?.message}
          />

          <SelectBox
            label="نوع مقاله"
            name="articleType"
            setValue={setValue}
            errMsg={errors.articleType?.message}
            options={[
              { value: "journalArticle", label: "مقاله ژورنال" },
              { value: "book", label: "کتاب" },
            ]}
            defaultValue={
              defaultValues && defaultValues.articleType
                ? {
                  value: defaultValues.articleType,
                  label:
                    defaultValues.articleType === "journalArticle" ? "مقاله ژورنال" : "کتاب",
                }
                : undefined
            }
          />

          <MyInput
            label="کلید"
            register={register}
            name="key"
            placeholder="کلید یکتای مقاله"
            errMsg={errors.key?.message}
          />

          <MyInput
            className="md:col-span-2"
            label="چکیده"
            register={register}
            name="abstract"
            type="textarea"
            rows={6}
            placeholder="چکیده مقاله را وارد کنید"
            errMsg={errors.abstract?.message}
          />
        </div>
      </AdminPanel>

      <AdminPanel title="جزئیات انتشار" icon={AdminIcon.news} bodyClassName="p-5">
        <div className={formGrid3}>
          <MyInput label="ISBN" register={register} name="ISBN" errMsg={errors.ISBN?.message} />
          <MyInput label="ISNN" register={register} name="ISNN" errMsg={errors.ISNN?.message} />
          <MyInput label="DOI" register={register} name="DOI" errMsg={errors.DOI?.message} />
          <MyInput
            label="URL"
            register={register}
            name="URL"
            placeholder="https://…"
            errMsg={errors.URL?.message}
          />
          <MyInput label="صفحات" register={register} name="page" errMsg={errors.page?.message} />
          <MyInput
            label="سال انتشار"
            register={register}
            name="publicationYear"
            errMsg={errors.publicationYear?.message}
          />
          <MyInput
            label="شماره موضوع"
            type="number"
            register={register}
            name="issue"
            errMsg={errors.issue?.message}
          />
          <MyInput
            label="جلد"
            type="number"
            register={register}
            name="volume"
            errMsg={errors.volume?.message}
          />
        </div>
      </AdminPanel>

      <div className={formFooter}>
        <button type="button" onClick={() => router.push("/admin/articles")} className={btn.secondary}>
          انصراف
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${btn.primary} disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              در حال ذخیره…
            </>
          ) : (
            <>
              {AdminIcon.save}
              ذخیره تغییرات
            </>
          )}
        </button>
      </div>
    </form>
  );
};
