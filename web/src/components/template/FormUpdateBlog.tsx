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
import {
  AdminIcon,
  AdminPanel,
  btn,
  formFooter,
  formGrid,
} from "../organisms/admin/AdminUI";

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
    formState: { errors, isSubmitting },
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input {...register("_id")} id="_id" name="_id" type="text" disabled hidden />

      <AdminPanel title="محتوای پست" icon={AdminIcon.rss} bodyClassName="p-5">
        <div className={formGrid}>
          <MyInput
            className="md:col-span-2"
            label="عنوان پست"
            register={register}
            name="title"
            placeholder="عنوان پست وبلاگ را وارد کنید"
            errMsg={errors.title?.message}
          />

          <MyInput
            className="md:col-span-2"
            label="زیرعنوان"
            register={register}
            name="subtitle"
            placeholder="یک زیرعنوان کوتاه و جذاب"
            errMsg={errors.subtitle?.message}
          />

          <MyInput
            className="md:col-span-2"
            label="چکیده"
            register={register}
            name="abstract"
            type="textarea"
            rows={3}
            placeholder="خلاصه‌ای از محتوای پست"
            errMsg={errors.abstract?.message}
          />

          <MyInput
            className="md:col-span-2"
            label="محتوا"
            register={register}
            name="content"
            type="textarea"
            rows={14}
            placeholder="متن کامل پست را وارد کنید"
            errMsg={errors.content?.message}
          />

          <div className="flex items-center justify-between gap-3 rounded-[14px] border-[1.5px] border-[#F0F0F2] px-4 py-3 md:col-span-2">
            <div>
              <p className="text-[12.5px] font-bold text-[#3C3C42]">نمایش در اسلایدر</p>
              <p className="text-[11px] font-medium text-[#9A9AA1]">
                این پست در اسلایدر صفحه اصلی نمایش داده می‌شود.
              </p>
            </div>
            <ToggleSwitch
              checked={isInSwipperValue || false}
              onChange={(checked) => setValue("isInSwipper", checked)}
            />
          </div>
        </div>
      </AdminPanel>

      <div className={formFooter}>
        <button type="button" onClick={() => router.push("/admin/blog")} className={btn.secondary}>
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
