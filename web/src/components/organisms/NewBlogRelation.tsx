"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";
import Link from "next/link";
import { AddBlogRelations } from "@/app/actions/blog/addBlogRelations";
import { UploadImage } from "@/components/molecules/UploadFile";
import { getTags } from "@/app/actions/tag/getTags";
import { getAuthors } from "@/app/actions/author/getAuthors";
import { getCategories } from "@/app/actions/category/getCategories";
import MyAsyncMultiSelect from "../atoms/MyAsyncMultiSelect";

// Schema for blog relations validation
const BlogRelationsSchema = z.object({
  pic: z.optional(z.string()),
  tags: z.optional(z.array(z.string()).nonempty("حداقل یک برچسب انتخاب کنید")),
  categories: z.optional(
    z.array(z.string()).nonempty("حداقل یک دسته‌بندی انتخاب کنید")
  ),
  authors: z.optional(
    z.array(z.string()).nonempty("حداقل یک نویسنده انتخاب کنید")
  ),
});

export type BlogRelationsSchemaType = z.infer<typeof BlogRelationsSchema>;

export const NewBlogRelationForm = ({
  blogId,
  token,
  lesanUrl,
}: {
  blogId: string;
  token: string;
  lesanUrl?: string;
}) => {
  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BlogRelationsSchemaType>({
    defaultValues: {
      authors: [],
      tags: [],
      categories: [],
    },
    resolver: zodResolver(BlogRelationsSchema),
  });

  const onSubmit: SubmitHandler<BlogRelationsSchemaType> = async (data) => {
    const addData = await AddBlogRelations(data, blogId);
    if (addData) {
      ToastNotify("success", "روابط بلاگ با موفقیت اضافه شدند");
      router.replace("/admin/blog");
    } else {
      ToastNotify("error", "خطا در اضافه کردن روابط بلاگ");
    }
  };

  // Load options for selects
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

  // Load categories options
  const loadCategoryOptions = async (inputValue: string) => {
    const response = await getCategories({
      set: { name: inputValue, limit: 10, page: 1 },
      get: { _id: 1, name: 1 },
    });
    return response.map((category: { _id: string; name: string }) => ({
      value: category._id,
      label: category.name,
    }));
  };

  // Load authors options
  const loadAuthorOptions = async (inputValue: string) => {
    const response = await getAuthors({
      set: {
        limit: 10,
        page: 1,
        first_name: inputValue,
        last_name: inputValue,
      },
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <div className="flex flex-wrap w-full">
        <div className="w-full p-4">
          <span className="text-sm font-medium text-gray-700 block mb-2">
            تصویر بلاگ
          </span>
          <UploadImage
            inputName="pic"
            setUploadedImage={(uploaded: string) => setValue("pic", uploaded)}
            type="image"
            token={token}
            lesanUrl={lesanUrl}
          />
        </div>

        <div className="w-full md:w-1/2 p-4">
          <MyAsyncMultiSelect
            errMsg={errors.tags?.message}
            name="tags"
            label="برچسب‌ها"
            loadOptions={loadTagOptions}
            setValue={setValue}
            defaultOptions
          />
        </div>

        <div className="w-full md:w-1/2 p-4">
          <MyAsyncMultiSelect
            errMsg={errors.categories?.message}
            name="categories"
            label="دسته‌بندی‌ها"
            loadOptions={loadCategoryOptions}
            setValue={setValue}
            defaultOptions
          />
        </div>

        <div className="w-full p-4">
          <MyAsyncMultiSelect
            errMsg={errors.authors?.message}
            name="authors"
            label="نویسندگان"
            loadOptions={loadAuthorOptions}
            setValue={setValue}
            defaultOptions
          />
        </div>
      </div>

      <div className="w-full flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-1/2 p-4 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
        >
          ثبت روابط
        </button>
        <Link
          href="/admin/blog"
          className="w-1/2 p-4 bg-gray-600 text-white text-center font-semibold rounded-lg hover:bg-gray-700"
        >
          انصراف
        </Link>
      </div>
    </form>
  );
};
