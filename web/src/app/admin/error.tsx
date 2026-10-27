"use client";

import { useEffect } from "react";
import { AdminIcon, AdminPanel, btn } from "@/components/organisms/admin/AdminUI";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <AdminPanel bodyClassName="p-6">
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FEF3F3] text-[#C2353D]">
          {AdminIcon.empty}
        </span>
        <p className="text-[15px] font-bold text-black">خطایی در بارگذاری این بخش رخ داد</p>
        <p className="max-w-[420px] text-[12.5px] font-medium leading-[1.9] text-[#9A9AA1]">
          {error.message || "لطفاً دوباره تلاش کنید. اگر مشکل ادامه داشت، صفحه را بازنشانی کنید."}
        </p>
        {error.digest && (
          <p dir="ltr" className="font-mono text-[11px] text-[#C4C4CA]">
            {error.digest}
          </p>
        )}
        <button type="button" onClick={reset} className={`${btn.secondary} mt-1`}>
          {AdminIcon.refresh}
          تلاش دوباره
        </button>
      </div>
    </AdminPanel>
  );
}
