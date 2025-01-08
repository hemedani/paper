"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "../atoms/Input";
import { createPublication } from "@/app/actions/publication/createPublication";
import { ReqType } from "@/types/declarations/selectInp";

const ModalPupulation = () => {
  type PublicationSetType =
    ReqType["main"]["publication"]["addPublication"]["set"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm<PublicationSetType>({
    defaultValues: { title: "" },
  });

  const onSubmit: SubmitHandler<PublicationSetType> = async (data) => {
    const dataPupulation = await createPublication({
      set: data,
      get: { _id: 1, title: 1 },
    });
    if (dataPupulation._id) {
      router.refresh();
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
        ایجاد انتشارات جدید
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-500 ${
          isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`bg-white p-6 rounded-lg shadow-lg w-1/3 transform transition-transform duration-500 ${
            isModalOpen ? "translate-y-0" : "-translate-y-10"
          }`}
        >
          <h2 className="text-lg font-bold mb-4">ایجاد انتشارات جدید</h2>
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

export default ModalPupulation;
