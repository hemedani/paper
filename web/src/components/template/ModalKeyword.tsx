"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";
import { EditKeyword } from "@/app/actions/keyword/updateKeyword";
import { createKeyword } from "@/app/actions/keyword/createKeyword";
import MyInput from "@/components/atoms/MyInput";
import { AdminModal } from "../organisms/admin/AdminModal";
import { AdminIcon, btn } from "../organisms/admin/AdminUI";

interface ModalKeywordProps {
  isOpen: boolean;
  onClose: () => void;
  keywordToEdit?: { _id: string; name: string } | null;
}

const keywordSchema = z.object({
  name: z
    .string()
    .min(1, "نام کلمات کلیدی الزامی است")
    .max(50, "حداکثر 50 کاراکتر مجاز است"),
});

type KeywordFormValues = z.infer<typeof keywordSchema>;

const ModalKeyword: React.FC<ModalKeywordProps> = ({
  isOpen,
  onClose,
  keywordToEdit,
}) => {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<KeywordFormValues>({
    resolver: zodResolver(keywordSchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (keywordToEdit) {
      reset({ name: keywordToEdit.name });
    } else {
      reset({ name: "" });
    }
  }, [keywordToEdit, reset]);

  const onSubmit = async (data: KeywordFormValues) => {
    try {
      setBusy(true);
      if (keywordToEdit) {
        await EditKeyword(keywordToEdit._id, data.name);
        ToastNotify("success", "کلمه کلیدی با موفقیت ویرایش شد");
      } else {
        await createKeyword(data.name);
        ToastNotify("success", "کلمه کلیدی با موفقیت ایجاد شد");
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
      title={keywordToEdit ? "ویرایش کلمه کلیدی" : "ایجاد کلمه کلیدی جدید"}
      description={
        keywordToEdit
          ? "متن کلمه کلیدی انتخاب‌شده را ویرایش کنید."
          : "کلمه کلیدی تازه را برای ایندکس جستجو اضافه کنید."
      }
      icon={AdminIcon.key}
      footer={
        <>
          <button type="button" onClick={onClose} className={btn.secondary}>
            انصراف
          </button>
          <button
            type="submit"
            form="keyword-form"
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
                {keywordToEdit ? "ذخیره تغییرات" : "ایجاد"}
              </>
            )}
          </button>
        </>
      }
    >
      <form id="keyword-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <MyInput
          className="w-full"
          name="name"
          errMsg={errors.name?.message}
          label="نام کلمه کلیدی"
          placeholder="کلمه کلیدی را وارد کنید"
          register={register}
        />
      </form>
    </AdminModal>
  );
};

export default ModalKeyword;
