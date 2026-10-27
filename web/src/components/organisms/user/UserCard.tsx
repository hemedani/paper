import React from "react";
import { useRouter } from "next/navigation";
import { AdminIcon } from "@/components/organisms/admin/AdminUI";
import { translateLevel } from "@/utils/helper";

interface UserCardProps {
  id: string;
  first_name: string;
  last_name: string;
  national_number: string;
  level?: string;
  onDelete: () => void;
}

const actionClass =
  "inline-flex h-8 items-center gap-1.5 rounded-[10px] bg-[#F8F8F9] px-2.5 text-[11.5px] font-bold text-[#5C5C63] transition-colors hover:bg-[#EDFEFF] hover:text-[#08A6AE]";

const UserCard: React.FC<UserCardProps> = ({
  id,
  first_name,
  last_name,
  national_number,
  level,
  onDelete,
}) => {
  const router = useRouter();
  const initials = `${first_name?.[0] ?? ""}${last_name?.[0] ?? ""}`;

  return (
    <article className="flex flex-col gap-4 rounded-[20px] border border-[#F0F0F2] bg-white p-4 transition-all duration-200 hover:border-[#08A6AE]/30 hover:shadow-[0_18px_36px_-30px_rgba(8,166,174,0.8)]">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EDFEFF] text-[13px] font-extrabold text-[#08A6AE]">
          {initials || "؟"}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-bold leading-[1.6] text-black">
            {first_name} {last_name}
          </p>
          <p className="mt-0.5 text-[11.5px] font-medium tabular-nums text-[#9A9AA1]" dir="ltr">
            {national_number}
          </p>
        </div>

        {level && (
          <span className="shrink-0 rounded-full bg-[#FAF6EB] px-2.5 py-1 text-[10.5px] font-bold text-[#B98F26]">
            {translateLevel(level)}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-1.5 border-t border-[#F0F0F2] pt-3">
        <button
          type="button"
          onClick={() => router.push(`/admin/users/edit/pure/${id}`)}
          className={actionClass}
          title="ویرایش اطلاعات"
        >
          {AdminIcon.edit}
          ویرایش
        </button>
        <button
          type="button"
          onClick={() => router.push(`/admin/users/edit/relation/${id}`)}
          className={actionClass}
          title="ویرایش روابط"
        >
          {AdminIcon.link}
          روابط
        </button>
        <button
          type="button"
          onClick={() => router.push(`/admin/users/user/${id}`)}
          className={actionClass}
          title="مشاهده پروفایل"
        >
          {AdminIcon.eye}
          مشاهده
        </button>
        <button
          type="button"
          onClick={onDelete}
          title="حذف کاربر"
          className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#FEF3F3] text-[#C2353D] transition-colors hover:bg-[#FCE7E8]"
        >
          {AdminIcon.trash}
        </button>
      </div>
    </article>
  );
};

export default UserCard;
