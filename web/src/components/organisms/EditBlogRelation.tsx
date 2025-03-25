"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";
import { editBlogRelations, } from "@/app/actions/blog/editBlogRelations";
import { UploadImage } from "@/components/molecules/UploadFile";
import MyAsyncMultiSelect from "../atoms/MyAsyncMultiSelect";
import { gets } from "@/app/actions/category/gets";
import { ReqType } from "@/types/declarations/selectInp";

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

type BackendData = {
  _id: string;
  pic: { _id: string; name: string; type: string };
  categories: { _id: string; name: string }[];
};

export const EditBlogRelationForm = ({
  defaultValues,
  token,
  lesanUrl,
}: {
  defaultValues?: BackendData;
  token: string;
  lesanUrl?: string;
}) => {
  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BlogRelationsSchemaType>({
    defaultValues: {
      categories:
        defaultValues?.categories?.map((category) => category._id) || [],
      pic: defaultValues?.pic._id || ""
    },
    resolver: zodResolver(BlogRelationsSchema),
  });

  const onSubmit: SubmitHandler<BlogRelationsSchemaType> = async (data) => {
    const editData = await editBlogRelations({ ...data, _id: defaultValues?._id as string });
    if (editData.success) {
      ToastNotify("success", "روابط بلاگ با موفقیت ویرایش شدند");
      router.replace("/admin/blog");
    } else {
      ToastNotify("error", `خطا در ویرایش روابط بلاگ - ${editData.body.message}`);
    }
  };


  const defaultCategoryOptions =
    defaultValues?.categories?.map((category) => ({
      value: category._id,
      label: category.name,
    })) || [];

  const loadCategoryOptions = async (inputValue?: string) => {
    const set: ReqType["main"]["category"]["gets"]["set"] = { limit: 10, page: 1 }
    if (inputValue) { set.name = inputValue }

    const response = await gets({
      set,
      get: { _id: 1, name: 1 },
    });

    if (response.success) {
      return response.body.map((category: { _id: string; name: string }) => ({
        value: category._id,
        label: category.name,
      }));
    } else {
      return []
    }
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
            filePath={defaultValues?.pic ? defaultValues.pic.name : ""}
          />
        </div>

        <MyAsyncMultiSelect
          errMsg={errors.categories?.message}
          name="categories"
          label="دسته‌بندی‌ها"
          loadOptions={loadCategoryOptions}
          setValue={setValue}
          defaultOptions
          defaultValue={defaultCategoryOptions}
        />

      </div>

      <div className="w-full flex gap-4 justify-end">
        <button
          type="submit"
          className="p-4 px-8 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
        >
          ثبت تغییرات
        </button>
      </div>
    </form>
  );
};
