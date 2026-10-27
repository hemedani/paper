"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";
import { createPublication } from "@/app/actions/publication/createPublication";
import { EditPublication } from "@/app/actions/publication/updatePublication";
import MyInput from "@/components/atoms/MyInput";
import { AdminModal } from "../organisms/admin/AdminModal";
import { AdminIcon, btn } from "../organisms/admin/AdminUI";

const publicationSchema = z.object({
  title: z
    .string()
    .min(1, "نام انتشارات الزامی است")
    .max(100, "حداکثر 100 کاراکتر مجاز است"),
});

type PublicationFormValues = z.infer<typeof publicationSchema>;

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
  const [busy, setBusy] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PublicationFormValues>({
    resolver: zodResolver(publicationSchema),
    defaultValues: { title: "" },
  });

  useEffect(() => {
    if (publicationToEdit) {
      setValue("title", publicationToEdit.title);
    } else {
      reset();
    }
  }, [publicationToEdit, setValue, reset]);

  const onSubmit = async (data: PublicationFormValues) => {
    try {
      setBusy(true);
      if (publicationToEdit?._id) {
        await EditPublication({
          set: { _id: publicationToEdit._id, title: data.title },
          get: { _id: 1, title: 1 },
        });
        ToastNotify("success", "انتشارات با موفقیت ویرایش شد");
      } else {
        await createPublication({
          set: { title: data.title },
          get: { _id: 1, title: 1 },
        });
        ToastNotify("success", "انتشارات با موفقیت ایجاد شد");
      }
      router.refresh();
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
      title={publicationToEdit ? "ویرایش ناشر" : "ایجاد ناشر جدید"}
      description={
        publicationToEdit
          ? "نام ناشر انتخاب‌شده را ویرایش کنید."
          : "ناشر تازه را به فهرست ناشران اضافه کنید."
      }
      icon={AdminIcon.news}
      footer={
        <>
          <button type="button" onClick={onClose} className={btn.secondary}>
            انصراف
          </button>
          <button
            type="submit"
            form="publication-form"
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
                {publicationToEdit ? "ذخیره تغییرات" : "ایجاد"}
              </>
            )}
          </button>
        </>
      }
    >
      <form
        id="publication-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <MyInput
          className="w-full"
          name="title"
          errMsg={errors.title?.message}
          label="نام انتشارات"
          placeholder="نام انتشارات را وارد کنید"
          register={register}
        />
      </form>
    </AdminModal>
  );
};

export default ModalPublication;
