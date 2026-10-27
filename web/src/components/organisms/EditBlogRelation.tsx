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
import {
  AdminIcon,
  AdminPanel,
  btn,
  formFooter,
  formGrid,
} from "./admin/AdminUI";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <AdminPanel title="دسته‌بندی و تصویر" icon={AdminIcon.folder} bodyClassName="p-5">
        <div className={formGrid}>
          <MyAsyncMultiSelect
            errMsg={errors.categories?.message}
            name="categories"
            label="دسته‌بندی‌ها"
            loadOptions={loadCategoryOptions}
            setValue={setValue}
            defaultOptions
            defaultValue={defaultCategoryOptions}
          />

          <div className="flex flex-col gap-1.5">
            <span className="text-[12.5px] font-bold text-[#5C5C63]">تصویر پست</span>
            <UploadImage
              inputName="pic"
              setUploadedImage={(uploaded: string) => setValue("pic", uploaded)}
              type="image"
              token={token}
              lesanUrl={lesanUrl}
              filePath={defaultValues?.pic ? defaultValues.pic.name : ""}
            />
          </div>
        </div>
      </AdminPanel>

      <div className={formFooter}>
        <button type="button" onClick={() => router.push("/admin/blog")} className={btn.secondary}>
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
