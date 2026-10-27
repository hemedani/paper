"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";
import { EditAuthor } from "@/app/actions/author/updateAuthor";
import { createAuthor } from "@/app/actions/author/createAuthor";
import MyInput from "@/components/atoms/MyInput";
import { AdminModal } from "../organisms/admin/AdminModal";
import { AdminIcon, btn } from "../organisms/admin/AdminUI";

interface ModalTagProps {
  isOpen: boolean;
  onClose: () => void;
  authorToEdit?: { _id: string; first_name: string; last_name: string } | null;
}

const authorSchema = z.object({
  first_name: z
    .string()
    .min(1, "نام نویسنده الزامی است")
    .max(50, "حداکثر 50 کاراکتر مجاز است"),
  last_name: z
    .string()
    .min(1, "نام خانوادگی نویسنده الزامی است")
    .max(50, "حداکثر 50 کاراکتر مجاز است"),
});

type AuthorFormValues = z.infer<typeof authorSchema>;

export const ModalAuthor: React.FC<ModalTagProps> = ({
  isOpen,
  onClose,
  authorToEdit,
}) => {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthorFormValues>({
    resolver: zodResolver(authorSchema),
    defaultValues: { first_name: "", last_name: "" },
  });

  useEffect(() => {
    if (authorToEdit) {
      reset({
        first_name: authorToEdit?.first_name,
        last_name: authorToEdit?.last_name,
      });
    } else {
      reset({ first_name: "", last_name: "" });
    }
  }, [authorToEdit, reset]);

  const onSubmit = async (data: AuthorFormValues) => {
    try {
      setBusy(true);
      if (authorToEdit) {
        await EditAuthor(authorToEdit._id, data.first_name, data.last_name);
        ToastNotify("success", "نویسنده با موفقیت ویرایش شد");
      } else {
        await createAuthor(data.first_name, data.last_name);
        ToastNotify("success", "نویسنده با موفقیت ایجاد شد");
      }
      router.refresh();
      reset();
      onClose();
    } catch (err) {
      ToastNotify("error", "خطا در انجام عملیات");
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminModal
      open={isOpen}
      onClose={onClose}
      title={authorToEdit ? "ویرایش نویسنده" : "ایجاد نویسنده جدید"}
      description={
        authorToEdit
          ? "نام و نام خانوادگی نویسنده را ویرایش کنید."
          : "نویسنده تازه را به فهرست نویسندگان اضافه کنید."
      }
      icon={AdminIcon.user}
      footer={
        <>
          <button type="button" onClick={onClose} className={btn.secondary}>
            انصراف
          </button>
          <button
            type="submit"
            form="author-form"
            disabled={busy}
            className={`${btn.primary} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {busy ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                در حال ذخیره…
              </>
            ) : (
              <>
                {AdminIcon.save}
                {authorToEdit ? "ذخیره تغییرات" : "ایجاد"}
              </>
            )}
          </button>
        </>
      }
    >
      <form id="author-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <MyInput
          className="w-full"
          name="first_name"
          errMsg={errors.first_name?.message}
          label="نام"
          placeholder="نام نویسنده را وارد کنید"
          register={register}
        />
        <MyInput
          className="w-full"
          name="last_name"
          errMsg={errors.last_name?.message}
          label="نام خانوادگی"
          placeholder="نام خانوادگی نویسنده را وارد کنید"
          register={register}
        />
      </form>
    </AdminModal>
  );
};

export default ModalAuthor;
