"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTag } from "@/app/actions/tag/createTag";
import { EditTag } from "@/app/actions/tag/updateTag";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";

interface ModalTagProps {
  isOpen: boolean;
  onClose: () => void;
  tagToEdit?: { _id: string; name: string } | null;
}

const tagSchema = z.object({
  name: z
    .string()
    .min(1, "نام برچسب الزامی است")
    .max(50, "حداکثر 50 کاراکتر مجاز است"),
});

type TagFormValues = z.infer<typeof tagSchema>;

const ModalTag: React.FC<ModalTagProps> = ({ isOpen, onClose, tagToEdit }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TagFormValues>({
    resolver: zodResolver(tagSchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (tagToEdit) {
      reset({ name: tagToEdit.name });
    } else {
      reset({ name: "" });
    }
  }, [tagToEdit, reset]);

  const onSubmit = async (data: TagFormValues) => {
    try {
      if (tagToEdit) {
        await EditTag(tagToEdit._id, data.name);
        ToastNotify("success", "برچسب با موفقیت ویرایش شد");
      } else {
        await createTag(data.name);
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
          {tagToEdit ? "ویرایش برچسب" : "ایجاد برچسب جدید"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              نام برچسب
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder="نام برچسب را وارد کنید"
              className={`w-full p-2 border rounded ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
              {tagToEdit ? "ویرایش" : "ایجاد"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalTag;
