"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastNotify } from "@/utils/helper";
import { createUser } from "@/app/actions/user/createUser";
import { useRouter } from "next/navigation";
import { UploadImage } from "../molecules/UploadFile";
import Cookies from "js-cookie";

// تعریف اعتبارسنجی با Zod
const userSchema = z.object({
  first_name: z.string().min(1, "نام الزامی است"),
  last_name: z.string().min(1, "نام خانوادگی الزامی است"),
  father_name: z.string().optional(),
  mobile: z.string().regex(/^\d{10}$/, "شماره تماس باید 10 رقم باشد"),
  gender: z.enum(["Male", "Female"], { message: "جنسیت الزامی است" }),
  birth_date: z.date(),
  personnel_number: z.string().optional(),
  national_number: z.string().regex(/^\d{10}$/, "کد ملی باید 10 رقم باشد"),
  address: z.string().optional(),
  level: z.enum(["Manager", "Editor", "Ghost"], { message: "سطح الزامی است" }),
  isVerified: z.boolean(),
  avatar: z.any().optional(), // برای عکس پروفایل
  nationalCard: z.any().optional(), // برای کارت ملی
});

export type UserFormValues = z.infer<typeof userSchema>;
interface ModalUserProps {
  onClose: () => void;
}

export const ModalUser: React.FC<ModalUserProps> = ({ onClose }) => {
  const router = useRouter();
  const [imageAvatar, setImageAvatar] = useState<string | null>(null);
  const [imageNationalCard, setImageNationalCard] = useState<string | null>(
    null
  );

  const token = Cookies.get("token");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      father_name: "",
      mobile: "",
      gender: "Male",
      birth_date: new Date(),
      personnel_number: "",
      national_number: "",
      address: "",
      level: "Manager",
      isVerified: true,
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    const formData = {
      ...data,
      avatar: imageAvatar, // عکس پروفایل
      nationalCard: imageNationalCard, // عکس کارت ملی
    };
    await createUser(formData);
    ToastNotify("success", "کاربر جدید با موفقیت ایجاد شد");
    router.refresh();
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-lg font-bold mb-4">افزودن کاربر جدید</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-4"
        >
          {/* ستون اول */}
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium">
              نام
            </label>
            <input
              id="first_name"
              {...register("first_name")}
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.first_name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.first_name && (
              <span className="text-red-500 text-sm">
                {errors.first_name.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-medium">
              نام خانوادگی
            </label>
            <input
              id="last_name"
              {...register("last_name")}
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.last_name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.last_name && (
              <span className="text-red-500 text-sm">
                {errors.last_name.message}
              </span>
            )}
          </div>

          {/* ستون سوم برای آپلود عکس‌ها */}
          <div className="row-span-4">
            <div className="mb-4">
              <label className="block text-sm font-medium">عکس پروفایل</label>
              <UploadImage
                inputName="avatar"
                setUploadedImage={setImageAvatar}
                type="image"
                token={token}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">عکس کارت ملی</label>
              <UploadImage
                inputName="nationalCard"
                setUploadedImage={setImageNationalCard}
                type="image"
                token={token}
              />
            </div>
          </div>

          {/* ادامه ستون اول و دوم */}
          <div>
            <label htmlFor="father_name" className="block text-sm font-medium">
              نام پدر
            </label>
            <input
              id="father_name"
              {...register("father_name")}
              className="mt-1 block w-full border rounded-md p-2 border-gray-300"
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-medium">
              شماره تماس
            </label>
            <input
              id="mobile"
              {...register("mobile")}
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.mobile ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.mobile && (
              <span className="text-red-500 text-sm">
                {errors.mobile.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium">
              جنسیت
            </label>
            <select
              id="gender"
              {...register("gender")}
              className="mt-1 block w-full border rounded-md p-2 border-gray-300"
            >
              <option value="Male">مرد</option>
              <option value="Female">زن</option>
            </select>
          </div>

          <div>
            <label htmlFor="birth_date" className="block text-sm font-medium">
              تاریخ تولد
            </label>
            <input
              id="birth_date"
              type="date"
              {...register("birth_date", { valueAsDate: true })}
              className="mt-1 block w-full border rounded-md p-2 border-gray-300"
            />
          </div>

          <div>
            <label
              htmlFor="national_number"
              className="block text-sm font-medium"
            >
              کد ملی
            </label>
            <input
              id="national_number"
              {...register("national_number")}
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.national_number ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.national_number && (
              <span className="text-red-500 text-sm">
                {errors.national_number.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="personnel_number"
              className="block text-sm font-medium"
            >
              کد پرسنلی
            </label>
            <input
              id="personnel_number"
              {...register("personnel_number")}
              className="mt-1 block w-full border rounded-md p-2 border-gray-300"
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="address" className="block text-sm font-medium">
              آدرس
            </label>
            <textarea
              id="address"
              {...register("address")}
              className="mt-1 block w-full border rounded-md p-2 border-gray-300"
            />
          </div>

          <div>
            <label htmlFor="level" className="block text-sm font-medium">
              سطح
            </label>
            <select
              id="level"
              {...register("level")}
              className="mt-1 block w-full border rounded-md p-2 border-gray-300"
            >
              <option value="Manager">مدیر</option>
              <option value="Editor">ویرایش کننده</option>
              <option value="Ghost">ادمین اصلی</option>
            </select>
          </div>

          <div className="col-span-2 flex items-center">
            <input
              id="isVerified"
              type="checkbox"
              {...register("isVerified")}
              className="mr-2"
            />
            <label htmlFor="isVerified" className="text-sm">
              تایید شده
            </label>
          </div>

          <div className="col-span-3 flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              onClick={onClose}
            >
              لغو
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
