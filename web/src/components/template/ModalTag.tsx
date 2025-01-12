"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../atoms/Input";
import { createTag } from "@/app/actions/tag/createTag";
// import { updateTag } from "@/app/actions/tag/updateTag"; // فرض می‌کنیم متدی برای آپدیت داریم
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";
import { EditTag } from "@/app/actions/tag/updateTag";

interface TagFormValues {
  name: string;
}

interface ModalTagProps {
  isOpen: boolean;
  onClose: () => void;
  tagToEdit?: { _id: string; name: string } | null; // داده برای ویرایش
}

const ModalTag: React.FC<ModalTagProps> = ({ isOpen, onClose, tagToEdit }) => {
  const router = useRouter();

  const { handleSubmit, control, reset } = useForm<TagFormValues>({
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (tagToEdit) {
      reset({ name: tagToEdit.name });
    } else {
      reset({ name: "" });
    }
  }, [tagToEdit, reset]);

  const onSubmit: SubmitHandler<TagFormValues> = async (data) => {
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
          <Input
            label="نام برچسب"
            placeholder="نام برچسب را وارد کنید"
            name="name"
            control={control}
            rules={{ required: "نام برچسب الزامی است" }}
          />
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
