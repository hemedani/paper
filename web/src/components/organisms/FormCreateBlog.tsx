"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadImage } from "@/components/molecules/UploadFile";
import { createBlog } from "@/app/actions/blog/createBlog";
import { ToastNotify } from "@/utils/helper";
import { useRouter } from "next/navigation";

// تعریف اسکیما با استفاده از zod
const FormSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  subtitle: z.string().min(1, "زیر عنوان الزامی است"),
  abstract: z.string().min(1, "چکیده الزامی است"),
  content: z.string().min(1, "محتوا الزامی است"),
  likes: z.number().int("تعداد لایک‌ها باید عدد صحیح باشد"),
  isInSwipper: z.boolean(),
  pic: z.string(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

export const FormCreateBlog = ({ token }: { token?: string }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      abstract: "",
      content: "",
      likes: 0,
      isInSwipper: false,
      pic: "",
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const formData = {
      ...data,
      pic: imageUrl || "",
    };
    const blogData = await createBlog(formData);
    if (blogData._id) {
      ToastNotify("success", "با موفقیت ثبت شد");
      const router = useRouter();
      router.replace(`/admin`);
    } else {
      ToastNotify("error", "خطا در ثبت");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">فرم ایجاد محتوا</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* عنوان */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            عنوان
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {errors.title && (
            <span className="text-red-500 text-xs">{errors.title.message}</span>
          )}
        </div>

        {/* زیرعنوان */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="subtitle"
            className="text-sm font-medium text-gray-700"
          >
            زیرعنوان
          </label>
          <input
            id="subtitle"
            type="text"
            {...register("subtitle")}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {errors.subtitle && (
            <span className="text-red-500 text-xs">
              {errors.subtitle.message}
            </span>
          )}
        </div>

        {/* چکیده */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="abstract"
            className="text-sm font-medium text-gray-700"
          >
            چکیده
          </label>
          <textarea
            id="abstract"
            {...register("abstract")}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {errors.abstract && (
            <span className="text-red-500 text-xs">
              {errors.abstract.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="content"
            className="text-sm font-medium text-gray-700"
          >
            محتوا
          </label>
          <textarea
            id="content"
            {...register("content", { required: "محتوا الزامی است" })}
            className="resize-none px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.content && (
            <span className="text-red-500 text-xs">
              {errors.content.message}
            </span>
          )}
        </div>

        {/* تعداد لایک‌ها */}
        <div className="flex flex-col gap-2">
          <label htmlFor="likes" className="text-sm font-medium text-gray-700">
            تعداد لایک‌ها
          </label>
          <input
            id="likes"
            type="number"
            {...register("likes", { valueAsNumber: true })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {errors.likes && (
            <span className="text-red-500 text-xs">{errors.likes.message}</span>
          )}
        </div>

        {/* آیا در اسلایدر نمایش داده شود؟ */}
        <div className="flex items-center gap-2">
          <input
            id="isInSwipper"
            type="checkbox"
            {...register("isInSwipper")}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="isInSwipper"
            className="text-sm font-medium text-gray-700"
          >
            آیا در اسلایدر نمایش داده شود؟
          </label>
          {errors.isInSwipper && (
            <span className="text-red-500 text-xs">
              {errors.isInSwipper.message}
            </span>
          )}
        </div>

        {/* آپلود تصویر */}
        <div className="flex flex-col gap-2">
          <label htmlFor="pic" className="text-sm font-medium text-gray-700">
            تصویر
          </label>
          <UploadImage
            inputName="pic"
            setUploadedImage={setImageUrl}
            type="image"
            token={token}
          />
          {errors.pic && (
            <span className="text-red-500 text-xs">{errors.pic.message}</span>
          )}
        </div>

        {/* دکمه ارسال */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            ارسال
          </button>
        </div>
      </form>
    </div>
  );
};
