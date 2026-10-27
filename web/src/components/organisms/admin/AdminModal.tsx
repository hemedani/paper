"use client";

import { useEffect, type ReactNode } from "react";
import { AdminIcon } from "./AdminUI";

/* ═══════════════════════════════════════════════════════════════════════════
   Modal shell shared by every admin dialog. Locks page scroll, closes on
   Escape and on backdrop click, and slides up as a sheet on small screens.
   ═══════════════════════════════════════════════════════════════════════════ */

export const AdminModal = ({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  const maxWidth = {
    sm: "sm:max-w-[420px]",
    md: "sm:max-w-[520px]",
    lg: "sm:max-w-[680px]",
  }[size];

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label="بستن"
        onClick={onClose}
        className="pd-fade absolute inset-0 cursor-default bg-[#1A1A1E]/45 backdrop-blur-[3px]"
      />

      <div
        className={`pd-pop relative flex max-h-[92dvh] w-full ${maxWidth} flex-col overflow-hidden rounded-t-[24px] bg-white shadow-[0_36px_90px_-40px_rgba(20,20,25,0.55)] sm:rounded-[24px]`}
      >
        <header className="flex shrink-0 items-start gap-3 border-b border-[#F0F0F2] px-5 py-4">
          {icon && (
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#EDFEFF] text-[#08A6AE]">
              {icon}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <h2 className="text-[15px] font-extrabold leading-[1.6] text-black">{title}</h2>
            {description && (
              <p className="mt-0.5 text-[11.5px] font-medium leading-[1.8] text-[#9A9AA1]">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="-mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#9A9AA1] transition-colors hover:bg-[#F8F8F9] hover:text-black"
          >
            {AdminIcon.close}
          </button>
        </header>

        <div className="pd-scroll min-h-0 flex-1 overflow-y-auto px-5 py-5">{children}</div>

        {footer && (
          <footer className="flex shrink-0 flex-col-reverse gap-2 border-t border-[#F0F0F2] px-5 py-4 sm:flex-row sm:items-center sm:justify-end">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};

export default AdminModal;
