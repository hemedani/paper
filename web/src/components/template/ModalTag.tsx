"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../atoms/Input";
import { createTag } from "@/app/actions/tag/createTag";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";

interface TagFormValues {
  name: string;
}

const ModalTag = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm<TagFormValues>({
    defaultValues: { name: "" },
  });

  const onSubmit: SubmitHandler<TagFormValues> = async (data) => {
    const dataTag = await createTag(data.name);
    if (dataTag._id) {
      router.refresh();
      ToastNotify("success", "برچسب با موفقیت ایجاد شد");
    }
    reset();
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => setIsModalOpen(true)}
      >
        ایجاد برچسب جدید
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-500 ${
          isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`bg-white p-6 rounded-lg shadow-lg w-1/3 transform transition-all duration-500 ${
            isModalOpen
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-90 opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-lg font-bold mb-4">ایجاد برچسب جدید</h2>
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
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                بستن
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                ایجاد
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalTag;
