"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadImage } from "@/components/molecules/UploadFile";
import { createBlog } from "@/app/actions/blog/createBlog";
import { ToastNotify } from "@/utils/helper";
import { useRouter } from "next/navigation";
import MyInput from "../atoms/MyInput";

// تعریف اسکیما با استفاده از zod
const FormSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  subtitle: z.string().min(1, "زیر عنوان الزامی است"),
  abstract: z.string().min(1, "چکیده الزامی است"),
  content: z.string().min(1, "محتوا الزامی است"),
  isInSwipper: z.boolean(),
  pic: z.string(),
});

export type BlogFormSchemaType = z.infer<typeof FormSchema>;

export const FormCreateBlog = ({ token, lesanUrl }: { token?: string, lesanUrl?: string }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<BlogFormSchemaType>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<BlogFormSchemaType> = async (set) => {
    const blogData = await createBlog({ set, get: { _id: 1 } });
    if (blogData._id) {
      ToastNotify("success", "با موفقیت ثبت شد");
      router.replace(`/admin/blog`);
    } else {
      ToastNotify("error", "خطا در ثبت");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">فرم ایجاد محتوا</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div className="flex flex-col gap-2">
          <label htmlFor="pic" className="text-sm font-medium text-gray-700">
            تصویر
          </label>
          <UploadImage
            inputName="pic"
            setUploadedImage={(pic: string) => setValue("pic", pic)}
            type="image"
            token={token}
            lesanUrl={lesanUrl}
          />
          {errors.pic && (
            <span className="text-red-500 text-xs">{errors.pic.message}</span>
          )}
        </div>

        <MyInput name="title" label="عنوان" errMsg={errors.title?.message} register={register} />
        <MyInput name="subtitle" label="زیر عنوان" errMsg={errors.subtitle?.message} register={register} />
        <MyInput name="abstract" type="textarea" label="چکیده" errMsg={errors.abstract?.message} register={register} />
        <MyInput name="content" type="textarea" label="متن" errMsg={errors.content?.message} register={register} />
        <MyInput name="isInSwipper" type="checkbox" label="آیا در اسلایدر نمایش داده شود؟" errMsg={errors.content?.message} register={register} />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isDirty || !isValid}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400"
          >
            ارسال
          </button>
        </div>
      </form>
    </div>
  );
};
