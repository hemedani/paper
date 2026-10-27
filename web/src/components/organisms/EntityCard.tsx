import { AdminIcon } from "./admin/AdminUI";

interface SimpleCardProps {
  title: string;
  /** Optional one-line hint under the title (e.g. an id or a count). */
  subtitle?: string;
  onEdit?: () => void; // تابع برای ویرایش (اختیاری)
  onDelete?: () => void; // تابع برای حذف (اختیاری)
}

const EntityCard: React.FC<SimpleCardProps> = ({
  title,
  subtitle,
  onEdit,
  onDelete,
}) => {
  const monogram = title?.trim().charAt(0) ?? "؟";

  return (
    <div className="group flex items-center gap-3 rounded-[18px] border border-[#F0F0F2] bg-white p-3.5 transition-all duration-200 hover:border-[#08A6AE]/30 hover:shadow-[0_18px_36px_-30px_rgba(8,166,174,0.8)]">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#EDFEFF] text-[14px] font-extrabold text-[#08A6AE]">
        {monogram}
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[13.5px] font-bold leading-[1.7] text-black">
          {title}
        </h3>
        {subtitle && (
          <p className="truncate text-[11px] font-medium text-[#9A9AA1]">{subtitle}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            title="ویرایش"
            aria-label={`ویرایش ${title}`}
            className="flex h-9 w-9 items-center justify-center rounded-[10px] text-[#9A9AA1] transition-colors hover:bg-[#EDFEFF] hover:text-[#08A6AE]"
          >
            {AdminIcon.edit}
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            title="حذف"
            aria-label={`حذف ${title}`}
            className="flex h-9 w-9 items-center justify-center rounded-[10px] text-[#9A9AA1] transition-colors hover:bg-[#FEF3F3] hover:text-[#C2353D]"
          >
            {AdminIcon.trash}
          </button>
        )}
      </div>
    </div>
  );
};

export default EntityCard;
