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
import {
  AdminIcon,
  AdminPanel,
  btn,
  formFooter,
  formGrid,
} from "../organisms/admin/AdminUI";

const BlogAddSchema = z.object({
  title: z.string().nonempty("عنوان بلاگ الزامی است"),
  subtitle: z.string().nonempty("زیرعنوان الزامی است"),
  abstract: z.string().nonempty("چکیده الزامی است"),
  content: z.string().nonempty("محتوا الزامی است"),
  isInSwipper: z.boolean().optional(),
  pic: z.string().nonempty("عکس بلاگ الزامی است"),
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
    formState: { errors, isSubmitting },
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            rows={12}
            placeholder="متن کامل پست را وارد کنید"
            errMsg={errors.content?.message}
          />
        </div>
      </AdminPanel>

      <AdminPanel title="دسته‌بندی و تصویر" icon={AdminIcon.folder} bodyClassName="p-5">
        <div className={formGrid}>
          <MyAsyncMultiSelect
            errMsg={errors.categories?.message}
            name="categories"
            label="دسته‌بندی (وبلاگ)"
            loadOptions={loadCategoryOptions}
            setValue={setValue}
            defaultOptions
          />

          <div className="flex flex-col gap-1.5">
            <span className="text-[12.5px] font-bold text-[#5C5C63]">عکس پست</span>
            <UploadImage
              inputName="pic"
              setUploadedImage={(uploaded: string) =>
                setValue("pic", uploaded, { shouldValidate: true })
              }
              type="image"
              token={token}
              lesanUrl={lesanUrl}
            />
          </div>

          <div className="flex items-center justify-between gap-3 rounded-[14px] border-[1.5px] border-[#F0F0F2] px-4 py-3 md:col-span-2">
            <div>
              <p className="text-[12.5px] font-bold text-[#3C3C42]">نمایش در اسلایدر</p>
              <p className="text-[11px] font-medium text-[#9A9AA1]">
                این پست در اسلایدر صفحه اصلی نمایش داده می‌شود.
              </p>
            </div>
            <ToggleSwitch
              checked={isInSwipperValue || false}
              onChange={(checked) =>
                setValue("isInSwipper", checked, { shouldValidate: true })
              }
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
              ایجاد پست
            </>
          )}
        </button>
      </div>
    </form>
  );
};
