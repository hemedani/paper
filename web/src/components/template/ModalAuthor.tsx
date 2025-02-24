"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";
import { EditAuthor } from "@/app/actions/author/updateAuthor";
import { createAuthor } from "@/app/actions/author/createAuthor";

interface ModalTagProps {
  isOpen: boolean;
  onClose: () => void;
  authorToEdit?: { _id: string; first_name: string; last_name: string } | null;
}

const tagSchema = z.object({
  first_name: z
    .string()
    .min(1, "نام نویسنده الزامی است")
    .max(50, "حداکثر 50 کاراکتر مجاز است"),
  last_name: z
    .string()
    .min(1, "نام خانوادگی نویسنده الزامی است")
    .max(50, "حداکثر 50 کاراکتر مجاز است"),
});

type AuthorFormValues = z.infer<typeof tagSchema>;

export const ModalAuthor: React.FC<ModalTagProps> = ({
  isOpen,
  onClose,
  authorToEdit,
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthorFormValues>({
    resolver: zodResolver(tagSchema),
    defaultValues: { first_name: "", last_name: "" },
  });

  useEffect(() => {
    if (authorToEdit) {
      reset({
        first_name: authorToEdit?.first_name,
        last_name: authorToEdit?.last_name,
      });
    } else {
      reset({ first_name: "", last_name: "" });
    }
  }, [authorToEdit, reset]);

  const onSubmit = async (data: AuthorFormValues) => {
    try {
      if (authorToEdit) {
        await EditAuthor(authorToEdit._id, data.first_name, data.last_name);
        ToastNotify("success", "برچسب با موفقیت ویرایش شد");
      } else {
        await createAuthor(data.first_name, data.last_name);
        ToastNotify("success", "برچسب با موفقیت ایجاد شد");
      }
      router.refresh();
      reset();
      onClose();
    } catch (err) {
      ToastNotify("error", "خطا در انجام عملیات");
      console.error(err);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-500 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-1/3 transform transition-all duration-500 ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-90 opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-lg font-bold mb-4">
          {authorToEdit ? "ویرایش برچسب" : "ایجاد برچسب جدید"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              نام
            </label>
            <input
              id="first_name"
              type="text"
              {...register("first_name")}
              placeholder="نام نویسنده را وارد کنید"
              className={`w-full p-2 border rounded ${
                errors.first_name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              نام
            </label>
            <input
              id="last_name"
              type="text"
              {...register("last_name")}
              placeholder="نام نویسنده را وارد کنید"
              className={`w-full p-2 border rounded ${
                errors.last_name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.last_name.message}
              </p>
            )}
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              بستن
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {authorToEdit ? "ویرایش" : "ایجاد"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
