"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../atoms/Input";
import SelectBox from "../atoms/Select";
import { createUser } from "@/app/actions/user/createUser";
import { ReqType } from "@/types/declarations/selectInp";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";

export type AddUserSet = ReqType["main"]["user"]["addUser"]["set"];

export const ModalUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm<AddUserSet>({
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

  const onSubmit: SubmitHandler<AddUserSet> = async (data) => {
    console.log(data);
    await createUser(data);
    router.refresh();
    setIsModalOpen(false);
    ToastNotify("success", "کاربر  جدید با موفقیت ایجاد شد");
    reset()
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        افزودن کاربر
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
            <h2 className="text-lg font-bold mb-4">افزودن مقاله</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-4"
            >
              <Input name="first_name" control={control} label="نام" />
              <Input name="last_name" control={control} label="نام خانوادگی" />
              <Input name="father_name" control={control} label="نام پدر" />
              <Input name="mobile" control={control} label="شماره تماس" />
              <Input name="national_number" type="password" control={control} label="کد ملی" />
              <Input
                name="personnel_number"
                control={control}
                label="کد پرسنلی"
              />
              <Input name="address" control={control} label="آدرس" />
              <Input name="birth_date" control={control} label="تاریخ تولد" />
              <SelectBox
                name="gender"
                control={control}
                label="جنسیت"
                options={[
                  { value: "Male", label: "مرد" },
                  { value: "Female", label: "زن" },
                ]}
              />
              <SelectBox
                name="level"
                control={control}
                label="سطح"
                options={[
                  { value: "Manager", label: "مدیر" },
                  { value: "Editor", label: "ویرایش کننده" },
                  { value: "Ghost", label: "ادمین اصلی" },
                ]}
              />
              <div className="col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...control.register("isVerified")}
                    className="mr-2"
                  />
                  تایید شده
                </label>
              </div>
              <div className="col-span-2 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
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
      )}
    </>
  );
};
