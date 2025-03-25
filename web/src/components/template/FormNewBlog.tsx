"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";
import MyInput from "../atoms/MyInput";
import { addBlog } from "@/app/actions/blog/addBlog";
import ToggleSwitch from "../atoms/ToggleSwitch";
import { UploadImage } from "@/components/molecules/UploadFile";
import MyAsyncMultiSelect from "@/components/atoms/MyAsyncMultiSelect";
import { gets } from "@/app/actions/category/gets";
import { ReqType } from "@/types/declarations/selectInp";

const BlogAddSchema = z.object({
  title: z.string().nonempty("عنوان بلاگ الزامی است"),
  subtitle: z.string().nonempty("زیرعنوان الزامی است"),
  abstract: z.string().nonempty("چکیده الزامی است"),
  content: z.string().nonempty("محتوا الزامی است"),
  isInSwipper: z.boolean().optional(),
  pic: z.string(),
  categories: z.array(z.string()).nonempty("حداقل یک برچسب انتخاب کنید"),
});

export type BlogFormSchemaType = z.infer<typeof BlogAddSchema>;

export const FormNewBlog = ({ token, lesanUrl }: { token?: string; lesanUrl: string; }) => {
  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm<BlogFormSchemaType>({
    resolver: zodResolver(BlogAddSchema),
    mode: "onChange"
  });

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

  const onSubmit: SubmitHandler<BlogFormSchemaType> = async (data) => {

    const addData = await addBlog(data);
    if (addData.success) {
      router.replace("/admin/blog");
      ToastNotify("success", "بلاگ جدید با موفقیت ایجاد شد");
    } else {
      ToastNotify("error", `خطا در ایجاد بلاگ - ${addData.body.message}`);
    }
  };

  const isInSwipperValue = watch("isInSwipper");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <div className="flex flex-wrap w-full">
        <div className="w-full p-4">
          <span className="text-sm font-medium text-gray-700">
            عکس بلاگ پست
          </span>
          <UploadImage
            inputName="pic"
            setUploadedImage={(uploaded: string) => setValue("pic", uploaded)}
            type="image"
            token={token}
            lesanUrl={lesanUrl}
          />
        </div>
        <MyInput
          label="عنوان بلاگ"
          register={register}
          name="title"
          errMsg={errors.title?.message}
        />

        <MyInput
          label="زیرعنوان"
          register={register}
          name="subtitle"
          errMsg={errors.subtitle?.message}
        />

        <MyAsyncMultiSelect
          errMsg={errors.categories?.message}
          name="categories"
          label="دسته بندی (وبلاگ)"
          loadOptions={loadCategoryOptions}
          setValue={setValue}
          defaultOptions />

        <MyInput
          label="چکیده"
          register={register}
          name="abstract"
          type="textarea"
          errMsg={errors.abstract?.message}
        />

        <MyInput
          label="محتوا"
          register={register}
          name="content"
          type="textarea"
          errMsg={errors.content?.message}
        />

        <div className="w-1/2 p-10">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 ml-4">
              نمایش در اسلایدر
            </span>
            <ToggleSwitch
              checked={isInSwipperValue || false}
              onChange={(checked) => setValue("isInSwipper", checked)}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex gap-4 justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="p-4 px-8 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
        >
          ایجاد بلاگ
        </button>
      </div>
    </form>
  );
};
