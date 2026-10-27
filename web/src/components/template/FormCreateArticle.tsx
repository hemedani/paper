"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { SingleValue } from "react-select";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectBox from "../atoms/Select";
import { UploadImage } from "@/components/molecules/UploadFile";
import { getTags } from "@/app/actions/tag/getTags";
import { getPublications } from "@/app/actions/publication/getPublications";
import { createArticle } from "@/app/actions/article/createArticle";
import { getAuthors } from "@/app/actions/author/getAuthors";
import { ToastNotify } from "@/utils/helper";
import { getKeywords } from "@/app/actions/keyword/getKeywords";
import MyAsyncMultiSelect from "@/components/atoms/MyAsyncMultiSelect";
import MyInput from "../atoms/MyInput";
import {
  AdminIcon,
  AdminPanel,
  btn,
  formFooter,
  formGrid,
  formGrid3,
} from "../organisms/admin/AdminUI";

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
  ISBN: z.string().optional(),
  ISNN: z.string().optional(),
  DOI: z.string().optional(),
  URL: z.string().url("فرمت URL نامعتبر است").nonempty("URL الزامی است"),
  page: z.string().nonempty("تعداد صفحات الزامی است"),
  publicationYear: z.coerce.number().int("سال انتشار باید عدد صحیح باشد"),
  issue: z.coerce.number().int().optional(),
  volume: z.coerce.number().int().optional(),
  avatar: z.optional(z.string()),
  doc: z.optional(z.string()),
});

export type ArticleFormCreateSchemaType = z.infer<typeof ArticleCreateSchema>;

export const FormCreateArticle = ({ token, lesanUrl }: { token?: string; lesanUrl: string; }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormCreateSchemaType>({
    resolver: zodResolver(ArticleCreateSchema),
  });

  const onSubmit: SubmitHandler<ArticleFormCreateSchemaType> = async (data) => {

    const newArticle = await createArticle(data);

    if (newArticle.success) {
      ToastNotify("success", "مقاله با موفقیت ایجاد شد");
      router.replace("/admin/articles");
    } else {
      ToastNotify("error", newArticle.body.message);
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
          />

          <MyInput
            label="کلید"
            register={register}
            name="key"
            placeholder="کلید یکتای مقاله"
            errMsg={errors.key?.message}
          />

          <div className="flex w-full flex-col gap-1.5 md:col-span-2">
            <label htmlFor="publicationId" className="text-[12.5px] font-bold text-[#5C5C63]">
              انتشار
            </label>
            <div
              className={[
                "pd-select flex min-h-11 w-full items-center rounded-[14px] border-[1.5px] bg-white px-3 py-1.5 transition-all",
                errors.publication
                  ? "border-[#E2555B] bg-[#FEF5F5]"
                  : "border-[#F0F0F2] focus-within:border-[#08A6AE] focus-within:ring-4 focus-within:ring-[#08A6AE]/10",
              ].join(" ")}
            >
              <AsyncSelect
                inputId="publicationId"
                instanceId="article-publication"
                cacheOptions
                loadOptions={loadPublicationOptions}
                defaultOptions
                onChange={handlePublicationChange}
                placeholder="انتشار را انتخاب کنید"
                classNamePrefix="react-select"
                className="w-full"
              />
            </div>
            {errors.publication && (
              <span className="flex items-center gap-1 text-[11.5px] font-semibold text-[#C2353D]">
                {errors.publication.message}
              </span>
            )}
          </div>

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

      <AdminPanel title="روابط و دسته‌بندی" icon={AdminIcon.tag} bodyClassName="p-5">
        <div className={formGrid3}>
          <MyAsyncMultiSelect
            errMsg={errors.tags?.message}
            name="tags"
            label="برچسب‌ها"
            loadOptions={loadTagOptions}
            setValue={setValue}
            defaultOptions
          />

          <MyAsyncMultiSelect
            errMsg={errors.keywords?.message}
            name="keywords"
            label="کلمات کلیدی"
            loadOptions={loadKeywordOptions}
            setValue={setValue}
            defaultOptions
          />

          <MyAsyncMultiSelect
            errMsg={errors.authors?.message}
            name="authors"
            label="نویسندگان"
            loadOptions={loadAuthorOptions}
            setValue={setValue}
            defaultOptions
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

      <AdminPanel title="تصویر و فایل مقاله" icon={AdminIcon.image} bodyClassName="p-5">
        <div className={formGrid}>
          <div className="flex flex-col gap-1.5">
            <span className="text-[12.5px] font-bold text-[#5C5C63]">عکس مقاله</span>
            <UploadImage
              inputName="avatar"
              setUploadedImage={(uploaded: string) => setValue("avatar", uploaded)}
              type="image"
              token={token}
              lesanUrl={lesanUrl}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[12.5px] font-bold text-[#5C5C63]">فایل مقاله</span>
            <UploadImage
              inputName="doc"
              setUploadedImage={(uploaded: string) => setValue("doc", uploaded)}
              lesanUrl={lesanUrl}
              type="doc"
              token={token}
            />
          </div>
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
              ایجاد مقاله
            </>
          )}
        </button>
      </div>
    </form>
  );
};
