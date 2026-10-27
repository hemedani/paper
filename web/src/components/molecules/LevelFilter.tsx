"use client";

import { usePathname, useRouter } from "next/navigation";

const OPTIONS = [
  { value: "", label: "همه" },
  { value: "Ghost", label: "ادمین" },
  { value: "Manager", label: "مدیر" },
  { value: "Editor", label: "ویرایشگر" },
  { value: "Normal", label: "عادی" },
];

/** Pill filter for the `levels` query param used by the users list. */
export const LevelFilter = ({ value = "" }: { value?: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="فیلتر سطح دسترسی">
      {OPTIONS.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value || "all"}
            type="button"
            aria-pressed={active}
            onClick={() =>
              router.push(
                option.value ? `${pathname}?levels=${option.value}` : pathname
              )
            }
            className={[
              "h-9 rounded-full px-4 text-[12px] font-bold transition-colors",
              active
                ? "bg-[#08A6AE] text-white"
                : "border border-[#F0F0F2] bg-white text-[#5C5C63] hover:border-[#08A6AE]/30 hover:text-black",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default LevelFilter;
