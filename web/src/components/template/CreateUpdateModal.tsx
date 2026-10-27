"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTag } from "@/app/actions/tag/createTag";
import { EditTag } from "@/app/actions/tag/updateTag";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";
import { update } from "@/app/actions/category/update";
import { create } from "@/app/actions/category/create";
import MyInput from "@/components/atoms/MyInput";
import { AdminModal } from "../organisms/admin/AdminModal";
import { AdminIcon, btn } from "../organisms/admin/AdminUI";

interface CreateUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemToEdit?: { _id: string; name: string } | null;
  model: "tag" | "category";
}

const itemSchema = z.object({
  name: z
    .string()
    .min(1, "نام برچسب الزامی است")
    .max(50, "حداکثر 50 کاراکتر مجاز است"),
});

type ItemFormValues = z.infer<typeof itemSchema>;

const CreateUpdateModal = ({
  isOpen,
  onClose,
  itemToEdit,
  model,
}: CreateUpdateModalProps): React.ReactElement => {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const persianModel = model === "tag" ? "برچسب" : "دسته بندی (وبلاگ)";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: { name: itemToEdit?.name ? itemToEdit.name : "" },
  });

  useEffect(() => {
    if (itemToEdit) {
      reset({ name: itemToEdit.name });
    } else {
      reset({ name: "" });
    }
  }, [itemToEdit, reset]);

  const onSubmit = async (data: ItemFormValues) => {
    try {
      setBusy(true);
      if (itemToEdit) {
        if (model === "tag") {
          await EditTag(itemToEdit._id, data.name);
        } else {
          await update(itemToEdit._id, data.name);
        }
        ToastNotify("success", `${persianModel} با موفقیت ویرایش شد`);
      } else {
        if (model === "tag") {
          await createTag(data.name);
        } else {
          await create(data.name);
        }
        ToastNotify("success", `${persianModel} با موفقیت ایجاد شد`);
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
      title={itemToEdit ? `ویرایش ${persianModel}` : `ایجاد ${persianModel} جدید`}
      description={
        itemToEdit
          ? `اطلاعات ${persianModel} انتخاب‌شده را ویرایش کنید.`
          : `یک ${persianModel} تازه به فهرست اضافه کنید.`
      }
      icon={model === "tag" ? AdminIcon.tag : AdminIcon.folder}
      footer={
        <>
          <button type="button" onClick={onClose} className={btn.secondary}>
            انصراف
          </button>
          <button
            type="submit"
            form="entity-form"
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
                {itemToEdit ? "ذخیره تغییرات" : "ایجاد"}
              </>
            )}
          </button>
        </>
      }
    >
      <form id="entity-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <MyInput
          className="w-full"
          errMsg={errors.name?.message}
          name="name"
          label={`نام ${persianModel}`}
          placeholder={`نام ${persianModel} را وارد کنید`}
          register={register}
        />
      </form>
    </AdminModal>
  );
};

export default CreateUpdateModal;
