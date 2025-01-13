"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";
import { createPublication } from "@/app/actions/publication/createPublication";
import { EditPublication } from "@/app/actions/publication/updatePublication";

const publicationSchema = z.object({
  title: z
    .string()
    .min(1, "نام انتشارات الزامی است")
    .max(100, "حداکثر 100 کاراکتر مجاز است"),
});

type PublicationFormValues = z.infer<typeof publicationSchema>;

interface ModalPublicationProps {
  isOpen: boolean;
  onClose: () => void;
  publicationToEdit?: { _id: string; title: string } | null;
}

const ModalPublication: React.FC<ModalPublicationProps> = ({
  isOpen,
  onClose,
  publicationToEdit,
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PublicationFormValues>({
    resolver: zodResolver(publicationSchema),
    defaultValues: { title: "" },
  });

  useEffect(() => {
    if (publicationToEdit) {
      setValue("title", publicationToEdit.title);
    } else {
      reset();
    }
  }, [publicationToEdit, setValue, reset]);

  const onSubmit = async (data: PublicationFormValues) => {
    try {
      if (publicationToEdit?._id) {
        await EditPublication({
          set: { _id: publicationToEdit._id, title: data.title },
          get: { _id: 1, title: 1 },
        });
        ToastNotify("success", "انتشارات با موفقیت ویرایش شد");
      } else {
        await createPublication({
          set: { title: data.title },
          get: { _id: 1, title: 1 },
        });
        ToastNotify("success", "انتشارات با موفقیت ایجاد شد");
      }
      router.refresh();
      onClose();
    } catch (err) {
      ToastNotify("error", "خطا در انجام عملیات");
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-500 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-1/3 transform transition-transform duration-500 ${
          isOpen ? "translate-y-0" : "-translate-y-10"
        }`}
      >
        <h2 className="text-lg font-bold mb-4">
          {publicationToEdit ? "ویرایش انتشارات" : "ایجاد انتشارات جدید"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              نام انتشارات
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              placeholder="نام انتشارات را وارد کنید"
              className={`w-full p-2 border rounded ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
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
              {publicationToEdit ? "ویرایش" : "ایجاد"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalPublication;
