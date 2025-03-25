"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";
import MyInput from "../atoms/MyInput";
import { editBlog, } from "@/app/actions/blog/editBlog";
import ToggleSwitch from "../atoms/ToggleSwitch";

// Schema for blog validation
const BlogUpdateSchema = z.object({
  _id: z.string(),
  title: z.string().nonempty("عنوان بلاگ الزامی است"),
  subtitle: z.string().nonempty("زیرعنوان الزامی است"),
  abstract: z.string().nonempty("چکیده الزامی است"),
  content: z.string().nonempty("محتوا الزامی است"),
  isInSwipper: z.boolean().optional(),
});

export type BlogFormUpdateSchemaType = z.infer<typeof BlogUpdateSchema>;

type BlogData = {
  _id: string;
  title: string;
  subtitle: string;
  abstract: string;
  content: string;
  isInSwipper: boolean;
};

export const FormUpdateBlog = ({ defaultValues, }: { defaultValues?: BlogData; }) => {
  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitting },
    register,
  } = useForm<BlogFormUpdateSchemaType>({
    defaultValues: {
      _id: defaultValues?._id || "",
      title: defaultValues?.title || "",
      subtitle: defaultValues?.subtitle || "",
      abstract: defaultValues?.abstract || "",
      content: defaultValues?.content || "",
      isInSwipper: defaultValues?.isInSwipper || false,
    },
    resolver: zodResolver(BlogUpdateSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<BlogFormUpdateSchemaType> = async (data) => {

    const editData = await editBlog(data);
    if (editData.success) {
      router.replace("/admin/blog");
      ToastNotify("success", "ویرایش بلاگ با موفقیت انجام شد");
    } else {
      ToastNotify("error", `خطا در ویرایش بلاگ - ${editData.body.message}`);
    }
  };

  const isInSwipperValue = watch("isInSwipper");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <div className="flex flex-wrap w-full">
        <input
          {...register("_id")}
          id="_id"
          name="_id"
          type="text"
          disabled
          hidden
        />

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

        <div className="w-full p-4">
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
          ثبت تغییرات
        </button>
      </div>
    </form>
  );
};
