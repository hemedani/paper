"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "../atoms/Input";
import { ToastNotify } from "@/utils/helper";
import { createPublication } from "@/app/actions/publication/createPublication";
import { EditPublication } from "@/app/actions/publication/updatePublication";

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
  const { handleSubmit, control, reset, setValue } = useForm<{ title: string }>(
    {
      defaultValues: { title: "" },
    }
  );

  useEffect(() => {
    if (publicationToEdit) {
      setValue("title", publicationToEdit.title);
    } else {
      reset();
    }
  }, [publicationToEdit, setValue, reset]);

  const onSubmit: SubmitHandler<{ title: string }> = async (data) => {
    if (publicationToEdit?._id) {
      await EditPublication({
        set: { _id: publicationToEdit._id, title: data.title },
        get: { _id: 1, title: 1 },
      });
      ToastNotify("success", "انتشارات با موفقیت ویرایش شد");
    } else {
      await createPublication({ set: {title: data.title}, get: { _id: 1, title: 1 } });
      ToastNotify("success", "انتشارات با موفقیت ایجاد شد");
    }
    router.refresh();
    onClose();
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
          <Input
            label="نام انتشارات"
            placeholder="نام انتشارات را وارد کنید"
            name="title"
            control={control}
            rules={{ required: "نام انتشارات الزامی است" }}
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
              {publicationToEdit ? "ویرایش" : "ایجاد"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalPublication;
