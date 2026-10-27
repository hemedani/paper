"use client";

import React, { FC, useState } from "react";
import { AdminModal } from "../organisms/admin/AdminModal";
import { AdminIcon, AdminSegmented, btn } from "../organisms/admin/AdminUI";

interface IProps {
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  message: string;
  isVisible: boolean;
  isHardCascade: boolean;
  onHardCascadeChange: (value: boolean) => void;
  /** Dialog heading, e.g. «حذف مقاله». */
  title?: string;
  /** Name of the item being deleted, shown in a highlighted box. */
  subject?: string;
}

export const DeleteModal: FC<IProps> = ({
  onConfirm,
  onCancel,
  message,
  isVisible,
  isHardCascade,
  onHardCascadeChange,
  title = "تأیید حذف",
  subject,
}) => {
  const [busy, setBusy] = useState(false);

  const handleConfirm = async () => {
    try {
      setBusy(true);
      await onConfirm();
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminModal
      open={isVisible}
      onClose={onCancel}
      title={title}
      description="این تصمیم را نمی‌توان لغو کرد."
      icon={AdminIcon.trash}
      size="sm"
      footer={
        <>
          <button type="button" onClick={onCancel} className={btn.secondary}>
            انصراف
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={busy}
            className={`${btn.danger} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {busy ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#C2353D]/30 border-t-[#C2353D]" />
                در حال حذف…
              </>
            ) : (
              <>
                {AdminIcon.trash}
                حذف قطعی
              </>
            )}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {subject && (
          <div className="rounded-[16px] border border-[#F0F0F2] bg-[#F8F8F9] px-4 py-3">
            <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#9A9AA1]">
              مورد انتخاب شده
            </p>
            <p className="mt-1 line-clamp-2 text-[13.5px] font-bold leading-[1.8] text-black">
              {subject}
            </p>
          </div>
        )}

        <p className="text-[12.5px] font-medium leading-[2] text-[#5C5C63]">{message}</p>

        <div className="rounded-[16px] border border-[#F0F0F2] p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[12.5px] font-bold text-[#5C5C63]">
              آیا اسناد وابسته نیز حذف شوند؟
            </p>
            <AdminSegmented
              value={isHardCascade ? "yes" : "no"}
              onChange={(next) => onHardCascadeChange(next === "yes")}
              options={[
                { value: "no", label: "خیر" },
                { value: "yes", label: "بله" },
              ]}
            />
          </div>
          {isHardCascade && (
            <p className="mt-2.5 flex items-start gap-1.5 text-[11.5px] font-semibold leading-[1.9] text-[#C2353D]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="mt-0.5 shrink-0"
              >
                <path
                  d="M12 4.5l8.5 15h-17L12 4.5z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <path d="M12 10v4M12 16.6v.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              تمامی موارد مرتبط نیز حذف خواهند شد؛ مسئولیت این عملیات با شماست.
            </p>
          )}
        </div>
      </div>
    </AdminModal>
  );
};

export default DeleteModal;
