"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectBox from "../atoms/Select";
import { UploadImage } from "@/components/molecules/UploadFile";
import { ToastNotify } from "@/utils/helper";
import MyInput from "../atoms/MyInput";
import { createUser } from "@/app/actions/user/createUser";
import { AdminDatePicker } from "../atoms/AdminDatePicker";
import { ReqType } from "@/types/declarations/selectInp";
import {
  AdminIcon,
  AdminPanel,
  btn,
  formFooter,
  formGrid,
  formGrid3,
} from "../organisms/admin/AdminUI";

export const UserCreateSchema = z.object({
  first_name: z.string().min(1, "نام الزامی است"),
  last_name: z.string().min(1, "نام خانوادگی الزامی است"),
  father_name: z.string().optional(),
  mobile: z.string().regex(/^\d{10}$/, "شماره تماس باید 10 رقم باشد"),
  gender: z.enum(["Male", "Female"], { message: "جنسیت الزامی است" }),
  birth_date: z.date().optional(),
  personnel_number: z.string().optional(),
  national_number: z.string().regex(/^\d{10}$/, "کد ملی باید 10 رقم باشد"),
  address: z.string().optional(),
  summery: z.string().optional(),
  level: z.enum(["Normal", "Manager", "Editor", "Ghost"], { message: "سطح الزامی است" }),
  avatar: z.any().optional(), // برای عکس پروفایل
  nationalCard: z.any().optional(), // برای کارت ملی
});

export type UserFormCreateSchemaType = z.infer<typeof UserCreateSchema>;
export type UserSetObj = ReqType["main"]["user"]["addUser"]["set"]

export const FormCreateUser = ({
  token,
  lesanUrl
}: {
  token?: string;
  lesanUrl: string;
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserSetObj>({
    resolver: zodResolver(UserCreateSchema),
  });

  const onSubmit: SubmitHandler<UserSetObj> = async (data) => {
    const createdUser = await createUser(data);

    if (createdUser.success) {
      ToastNotify("success", "مقاله با موفقیت ایجاد شد");
      router.replace("/admin/users");
    } else {
      ToastNotify("error", createdUser.body.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <AdminPanel title="اطلاعات هویتی" icon={AdminIcon.user} bodyClassName="p-5">
        <div className={formGrid3}>
          <MyInput
            label="نام"
            register={register}
            name="first_name"
            placeholder="نام کاربر"
            errMsg={errors.first_name?.message}
          />
          <MyInput
            label="نام خانوادگی"
            register={register}
            name="last_name"
            placeholder="نام خانوادگی کاربر"
            errMsg={errors.last_name?.message}
          />
          <MyInput
            label="نام پدر"
            register={register}
            name="father_name"
            placeholder="نام پدر"
            errMsg={errors.father_name?.message}
          />
          <MyInput
            label="شماره ملی"
            register={register}
            name="national_number"
            placeholder="۱۰ رقم بدون خط تیره"
            errMsg={errors.national_number?.message}
          />
          <MyInput
            label="شماره شناسنامه"
            register={register}
            name="personnel_number"
            errMsg={errors.personnel_number?.message}
          />

          <SelectBox
            label="جنسیت"
            name="gender"
            setValue={setValue}
            errMsg={errors.gender?.message}
            options={[
              { value: "Male", label: "مرد" },
              { value: "Female", label: "زن" },
            ]}
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="birth_date" className="text-[12.5px] font-bold text-[#5C5C63]">
              تاریخ تولد
            </label>
            <AdminDatePicker
              placeholder="انتخاب تاریخ تولد"
              invalid={!!errors.birth_date}
              onChange={(value) => setValue("birth_date", value)}
            />
            {errors.birth_date?.message && (
              <span className="text-[11.5px] font-semibold text-[#C2353D]">
                {errors.birth_date.message}
              </span>
            )}
          </div>
        </div>
      </AdminPanel>

      <AdminPanel title="تماس و دسترسی" icon={AdminIcon.key} bodyClassName="p-5">
        <div className={formGrid}>
          <MyInput
            label="شماره موبایل"
            register={register}
            name="mobile"
            placeholder="۰۹xxxxxxxxx"
            errMsg={errors.mobile?.message}
          />

          <SelectBox
            label="سطح دسترسی"
            name="level"
            setValue={setValue}
            errMsg={errors.level?.message}
            options={[
              { value: "Manager", label: "مدیر" },
              { value: "Editor", label: "ویرایشگر" },
              { value: "Normal", label: "عادی" },
            ]}
          />

          <MyInput
            label="آدرس"
            register={register}
            name="address"
            placeholder="آدرس محل سکونت"
            errMsg={errors.address?.message}
          />
          <MyInput
            label="توضیحات"
            register={register}
            name="summery"
            type="textarea"
            rows={3}
            placeholder="توضیحات تکمیلی"
            errMsg={errors.summery?.message}
          />
        </div>
      </AdminPanel>

      <AdminPanel title="تصاویر" icon={AdminIcon.image} bodyClassName="p-5">
        <div className={formGrid}>
          <div className="flex flex-col gap-1.5">
            <span className="text-[12.5px] font-bold text-[#5C5C63]">عکس پروفایل</span>
            <UploadImage
              inputName="avatar"
              setUploadedImage={(uploaded: string) => setValue("avatar", uploaded)}
              type="image"
              token={token}
              lesanUrl={lesanUrl}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[12.5px] font-bold text-[#5C5C63]">عکس کارت ملی</span>
            <UploadImage
              inputName="nationalCard"
              setUploadedImage={(uploaded: string) => setValue("nationalCard", uploaded)}
              lesanUrl={lesanUrl}
              type="image"
              token={token}
            />
          </div>
        </div>
      </AdminPanel>

      <div className={formFooter}>
        <button type="button" onClick={() => router.push("/admin/users")} className={btn.secondary}>
          انصراف
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${btn.primary} disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              در حال ذخیره…
            </>
          ) : (
            <>
              {AdminIcon.save}
              ایجاد کاربر
            </>
          )}
        </button>
      </div>
    </form>
  );
};
