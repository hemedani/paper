"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastNotify, translateGender, translateLevel } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { ReqType, userSchema } from "@/types/declarations/selectInp";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MyInput from "@/components/atoms/MyInput";
import { AdminDatePicker } from "@/components/atoms/AdminDatePicker";
import SelectBox from "@/components/atoms/Select";
import { updateUserPure } from "@/app/actions/user/updateUser";
import {
  AdminIcon,
  AdminPanel,
  btn,
  formFooter,
  formGrid,
  formGrid3,
} from "../admin/AdminUI";

export const UpdateUserPureSchema = z.object({
  _id: z.string(),
  first_name: z.string().min(1, "نام الزامی است"),
  last_name: z.string().min(1, "نام خانوادگی الزامی است"),
  father_name: z.string().optional(),
  gender: z.enum(["Male", "Female"], { message: "جنسیت الزامی است" }),
  birth_date: z.coerce.date().optional(),
  personnel_number: z.string().optional(),
  address: z.string().optional(),
  summery: z.string().optional(),
  level: z.enum(["Normal", "Manager", "Editor", "Ghost"], {
    message: "باید یکی از این سطوح را انتخاب کنید",
  }).optional(),
});

export type UpdateUserPureSchemaType = z.infer<typeof UpdateUserPureSchema>;
export type UpdateUserPureSet = ReqType["main"]["user"]["updateUser"]["set"];

export const EditUserPures = ({ isOwn, ...rest }: userSchema & { isOwn?: boolean }) => {
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserPureSet>({
    resolver: zodResolver(UpdateUserPureSchema),
    defaultValues: rest,
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<UpdateUserPureSet> = async (formData) => {
    const updatedUserPures = await updateUserPure(formData);
    if (updatedUserPures.success) {
      ToastNotify("success", "با موقیت ویرایش شد");
      router.replace(isOwn ? "/user" : "/admin/users");
    } else {
      ToastNotify("error", updatedUserPures.body.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input {...register("_id")} id="_id" name="_id" type="text" disabled hidden />

      <AdminPanel title="اطلاعات شخصی" icon={AdminIcon.user} bodyClassName="p-5">
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

          <SelectBox
            label="جنسیت"
            name="gender"
            setValue={setValue}
            errMsg={errors.gender?.message}
            options={[
              { value: "Male", label: "مرد" },
              { value: "Female", label: "زن" },
            ]}
            defaultValue={{
              value: rest.gender,
              label: translateGender(rest.gender),
            }}
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="birth_date" className="text-[12.5px] font-bold text-[#5C5C63]">
              تاریخ تولد
            </label>
            <AdminDatePicker
              placeholder="انتخاب تاریخ تولد"
              invalid={!!errors.birth_date}
              defaultValue={rest.birth_date ? new Date(rest.birth_date) : undefined}
              onChange={(value) => setValue("birth_date", value)}
            />
            {errors.birth_date?.message && (
              <span className="text-[11.5px] font-semibold text-[#C2353D]">
                {errors.birth_date.message}
              </span>
            )}
          </div>

          <MyInput
            label="شماره شناسنامه"
            register={register}
            name="personnel_number"
            errMsg={errors.personnel_number?.message}
          />

          {isOwn === false || isOwn === undefined && (
            <SelectBox
              label="سطح دسترسی"
              name="level"
              setValue={setValue}
              errMsg={errors.level?.message}
              options={[
                { value: "Ghost", label: "ادمین" },
                { value: "Manager", label: "مدیر" },
                { value: "Editor", label: "ویرایشگر" },
                { value: "Normal", label: "عادی" },
              ]}
              defaultValue={{
                value: rest.level,
                label: translateLevel(rest.level),
              }}
            />
          )}
        </div>
      </AdminPanel>

      <AdminPanel title="آدرس و توضیحات" icon={AdminIcon.tag} bodyClassName="p-5">
        <div className={formGrid}>
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

      <div className={formFooter}>
        <button
          type="button"
          onClick={() => router.push(isOwn ? "/user" : "/admin/users")}
          className={btn.secondary}
        >
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
              ذخیره تغییرات
            </>
          )}
        </button>
      </div>
    </form>
  );
};
