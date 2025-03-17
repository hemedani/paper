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
import MyAsyncMultiSelect from "../atoms/MyAsyncMultiSelect";
import MyInput from "../atoms/MyInput";

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
  avatar: z.optional(z.string()),
  doc: z.optional(z.string()),
});

export type ArticleFormCreateSchemaType = z.infer<typeof ArticleCreateSchema>;

export const FormCreateArticle = ({
  token,
  lesanUrl
}: {
  token?: string;
  lesanUrl: string;
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">ایجاد مقاله جدید</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">
              عکس مقاله
            </span>
            <UploadImage
              inputName="avatar"
              setUploadedImage={(uploaded: string) => setValue("avatar", uploaded)}
              type="image"
              token={token}
              lesanUrl={lesanUrl}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">فایل مقاله</span>
            <UploadImage
              inputName="doc"
              setUploadedImage={(uploaded: string) => setValue("doc", uploaded)}
              lesanUrl={lesanUrl}
              type="doc"
              token={token}
            />
          </div>
        </div>

        <MyInput label="عنوان" register={register} name="title" errMsg={errors.title?.message} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


          <MyAsyncMultiSelect
            errMsg={errors.tags?.message}
            name="tags"
            label="برچسب"
            loadOptions={loadTagOptions}
            setValue={setValue}
            defaultOptions />

          <MyAsyncMultiSelect
            errMsg={errors.keywords?.message}
            name="keywords"
            label="کلمات کلیدی"
            loadOptions={loadKeywordOptions}
            setValue={setValue}
            defaultOptions />

          <MyAsyncMultiSelect
            errMsg={errors.authors?.message}
            name="authors"
            label="نویسندگان"
            loadOptions={loadAuthorOptions}
            setValue={setValue}
            defaultOptions />

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
          <MyInput label="کلید" register={register} name="key" errMsg={errors.key?.message} />
        </div>

        <MyInput label="چکیده" register={register} name="abstract" type="textarea" errMsg={errors.abstract?.message} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            ارسال
          </button>
        </div>
      </form>
    </div>
  );
};
