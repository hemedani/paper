"use client";

import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../atoms/Input";
import SelectBox from "../atoms/Select";
import { ReqType } from "@/types/declarations/selectInp";
import { ToastNotify } from "@/utils/helper";
import { ExampleDatePicker } from "../atoms/DatePicker";
import { getUser } from "@/app/actions/user/getUser";
import { EditUser } from "@/app/actions/user/updateUser";

export type AddUserSet = ReqType["main"]["user"]["addUser"]["set"];

interface ModalUserProps {
  isOpen: boolean;
  onClose: () => void;
  userToEditId?: string | null; // ID کاربری که باید ویرایش شود
}

export const ModalUser: React.FC<ModalUserProps> = ({
  isOpen,
  onClose,
  userToEditId,
}) => {
  const { control, handleSubmit, reset, getValues, setValue, register } =
    useForm<AddUserSet>({
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

  useEffect(() => {
    const fetchUser = async () => {
      if (userToEditId) {
        try {
          const userData = await getUser(userToEditId);
          reset(userData);
        } catch (error) {
          console.error(error);
          ToastNotify("error", "خطا در دریافت اطلاعات کاربر");
        }
      }
    };

    fetchUser();
  }, [userToEditId, reset]);

  const onSubmit: SubmitHandler<AddUserSet> = async (data) => {
    try {
      if (userToEditId) {
        // ارسال ریکوئست به‌روزرسانی
        await EditUser(userToEditId,data);
        ToastNotify("success", "اطلاعات کاربر با موفقیت به‌روزرسانی شد");
      } else {
        // ارسال ریکوئست ایجاد
        // await createUser(data);
        ToastNotify("success", "کاربر جدید با موفقیت ایجاد شد");
      }
      reset();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      ToastNotify("error", "عملیات با خطا مواجه شد");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-lg font-bold mb-4">
          {userToEditId ? "ویرایش کاربر" : "افزودن کاربر جدید"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <Input name="first_name" control={control} label="نام" />
          <Input name="last_name" control={control} label="نام خانوادگی" />
          <Input name="father_name" control={control} label="نام پدر" />
          <Input name="mobile" control={control} label="شماره تماس" />
          <Input
            name="national_number"
            type="text"
            control={control}
            label="کد ملی"
          />
          <Input name="personnel_number" control={control} label="کد پرسنلی" />
          <Input name="address" control={control} label="آدرس" />
          <ExampleDatePicker
            value={getValues("birth_date")!}
            onChange={(date) => setValue("birth_date", date)}
          />
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
                {...register("isVerified")}
                className="mr-2"
              />
              تایید شده
            </label>
          </div>
          <div className="col-span-2 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
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
  );
};
