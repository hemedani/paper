"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { SingleValue } from "react-select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { UploadImage } from "@/components/molecules/UploadFile";
import { getTags } from "@/app/actions/tag/getTags";
import { getPublications } from "@/app/actions/publication/getPublications";
import { getAuthors } from "@/app/actions/author/getAuthors";
import { getKeywords } from "@/app/actions/keyword/getKeywords";
import { editArticleRelations } from "@/app/actions/article/editRelationArticle";
import { ToastNotify } from "@/utils/helper";
import MyAsyncMultiSelect from "../atoms/MyAsyncMultiSelect";
import { useRouter } from "next/navigation";
import { articleSchema } from "@/types/declarations/selectInp";
import {
  AdminIcon,
  AdminPanel,
  btn,
  formFooter,
  formGrid,
  formGrid3,
} from "./admin/AdminUI";

export const FormUpdateArticleRelationsSchema = z.object({
  _id: z.string(),
  avatar: z.optional(z.string()),
  doc: z.optional(z.string()),
  publication: z.optional(z.string().nonempty("انتشار الزامی است")),
  tags: z.optional(z.array(z.string()).nonempty("حداقل یک برچسب انتخاب کنید")),
  keywords: z.optional(z.array(z.string()).nonempty("حداقل یک کلمه کلیدی انتخاب کنید")),
  authors: z.optional(z.array(z.string()).nonempty("حداقل یک نویسنده انتخاب کنید")),
});

export type FormUpdatetArticleRelationsSchemaType = z.infer<typeof FormUpdateArticleRelationsSchema>;

export const EditArticleRelationForm = ({
  defaultValues,
  token,
  lesanUrl
}: {
  defaultValues?: articleSchema;
  token: string;
  lesanUrl?: string
}) => {

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<FormUpdatetArticleRelationsSchemaType>({
    defaultValues: {
      _id: defaultValues?._id,
      authors: defaultValues?.authors?.map((author) => author._id) || [],
      keywords: defaultValues?.keywords?.map((keyword) => keyword._id) || [],
      tags: defaultValues?.tags?.map((tag) => tag._id) || [],
      publication: defaultValues?.publication?._id || "",
    },
    resolver: zodResolver(FormUpdateArticleRelationsSchema),
  });

  const router = useRouter();


  const onSubmit: SubmitHandler<FormUpdatetArticleRelationsSchemaType> = async (data) => {

    const dataArticle = await editArticleRelations(data);
    if (dataArticle) {
      ToastNotify("success", "با موفقیت انجام شد");
      router.replace(`/admin/articles`);
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
    selectedOption: SingleValue<{ value: string | undefined; label: string }>
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input {...register("_id")} id="_id" name="_id" type="text" disabled hidden />

      <AdminPanel title="روابط مقاله" icon={AdminIcon.tag} bodyClassName="p-5">
        <div className={formGrid3}>
          <div className="flex w-full flex-col gap-1.5 md:col-span-2 lg:col-span-1">
            <label htmlFor="publicationId" className="text-[12.5px] font-bold text-[#5C5C63]">
              انتشارات
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
                instanceId="article-relation-publication"
                cacheOptions
                loadOptions={loadPublicationOptions}
                defaultOptions
                onChange={handlePublicationChange}
                placeholder="انتشارات را انتخاب کنید"
                classNamePrefix="react-select"
                className="w-full"
                defaultValue={defaultPublicationOption}
              />
            </div>
            {errors.publication && (
              <span className="text-[11.5px] font-semibold text-[#C2353D]">
                {errors.publication.message}
              </span>
            )}
          </div>

          <MyAsyncMultiSelect
            errMsg={errors.tags?.message}
            name="tags"
            label="برچسب‌ها"
            loadOptions={loadTagOptions}
            setValue={setValue}
            defaultOptions
            defaultValue={defaultTagOptions}
          />

          <MyAsyncMultiSelect
            errMsg={errors.keywords?.message}
            name="keywords"
            label="کلمات کلیدی"
            loadOptions={loadKeywordOptions}
            setValue={setValue}
            defaultOptions
            defaultValue={defaultKeywordOptions}
          />

          <MyAsyncMultiSelect
            errMsg={errors.authors?.message}
            name="authors"
            label="نویسندگان"
            loadOptions={loadAuthorOptions}
            setValue={setValue}
            defaultOptions
            defaultValue={defaultAuthorOptions}
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
              filePath={defaultValues?.avatar ? defaultValues.avatar.name : ""}
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
              filePath={defaultValues?.doc ? defaultValues.doc.name : ""}
            />
          </div>
        </div>
      </AdminPanel>

      <div className={formFooter}>
        <button
          type="button"
          onClick={() => router.push("/admin/articles")}
          className={btn.secondary}
        >
          انصراف
        </button>
        <button type="submit" className={btn.primary}>
          {AdminIcon.save}
          ذخیره تغییرات
        </button>
      </div>
    </form>
  );
};
