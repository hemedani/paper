"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../atoms/Input";
import { createTag } from "@/app/actions/tag/createTag";
import { useRouter } from "next/navigation";

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
    console.log("Tag Created:", data);

    const dataTag = await createTag(data.name);
    if(dataTag._id) {
      router.refresh()
      // show alert
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">ایجاد برچسب جدید</h2>
            {/* فرم برچسب */}
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
      )}
    </>
  );
};

export default ModalTag;
