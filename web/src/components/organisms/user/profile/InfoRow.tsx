import type { ReactNode } from "react";

interface InfoRowProps {
  icon: ReactNode;
  label: string;
  value?: string | null;
  /** Force LTR for numbers so digits are not reordered by bidi. */
  dir?: "ltr" | "rtl";
}

/**
 * Single-line key/value row: icon + label on the start edge, value pinned to the
 * end edge so the row uses its full width instead of leaving a dead gap.
 */
const InfoRow = ({ icon, label, value, dir }: InfoRowProps) => (
  <div className="flex items-center gap-2.5 rounded-[16px] border border-[#F0F0F2] bg-white px-3.5 py-2.5 transition-colors hover:border-[#08A6AE]/25">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#EDFEFF] text-[#08A6AE]">
      {icon}
    </span>
    <span className="shrink-0 text-[12px] font-bold text-[#9A9AA1]">{label}</span>
    <span
      dir={dir}
      title={value || undefined}
      className="ms-auto min-w-0 truncate text-[13px] font-bold text-black"
    >
      {value || "نامشخص"}
    </span>
  </div>
);

export default InfoRow;
