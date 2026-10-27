import { translateLevel } from "@/utils/helper";
import { userSchema } from "@/types/declarations/selectInp";
import { EditIcon, UpdateIcon } from "@/components/atoms/Icons";
import Link from "next/link";
import Image from "next/image";

interface ProfileHeaderProps {
  user: userSchema;
  showAvatar?: boolean;
  pureEditLink: string;
  relationEditLink: string;
}

const ProfileHeader = ({
  user,
  showAvatar = true,
  pureEditLink,
  relationEditLink,
}: ProfileHeaderProps) => {
  const initials =
    `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}`.trim() || "ک";

  return (
    <div
      className="relative overflow-hidden rounded-[24px] px-5 py-6 text-white sm:px-7 sm:py-7"
      style={{ background: "linear-gradient(to bottom left, #3DB4BA 0%, #00B5BE 100%)" }}
    >
      <Image
        src="/images/hero/hero-pattern.svg"
        alt=""
        fill
        sizes="100vw"
        aria-hidden
        className="pointer-events-none object-cover opacity-[0.14]"
      />

      <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-right">
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          {showAvatar && (
            <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border-[3px] border-white/30 bg-white/15 text-[24px] font-extrabold text-white backdrop-blur-sm">
              {initials}
            </span>
          )}

          <div className="min-w-0">
            <h2 className="truncate text-[19px] font-extrabold leading-[1.6] text-white">
              {user.first_name} {user.last_name}
            </h2>
            <span className="mt-1.5 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-[11.5px] font-bold text-white backdrop-blur-sm">
              {translateLevel(user.level)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href={pureEditLink}
            className="inline-flex h-10 items-center gap-2 rounded-[12px] bg-white px-3.5 text-[12.5px] font-bold text-[#08A6AE] transition-colors hover:bg-[#F0FDFF]"
          >
            <UpdateIcon className="h-4 w-4" />
            ویرایش اطلاعات
          </Link>
          <Link
            href={relationEditLink}
            className="inline-flex h-10 items-center gap-2 rounded-[12px] border border-white/40 px-3.5 text-[12.5px] font-bold text-white transition-colors hover:bg-white/15"
          >
            <EditIcon className="h-4 w-4" />
            ویرایش روابط
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
