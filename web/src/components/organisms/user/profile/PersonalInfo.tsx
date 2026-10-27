import { format } from "date-fns-jalali";
import { translateGender } from "@/utils/helper";
import { toFaDigits } from "@/utils/digits";
import { userSchema } from "@/types/declarations/selectInp";
import { UserIcon, CalendarIcon } from "@/components/atoms/Icons";
import InfoRow from "./InfoRow";

interface PersonalInfoProps {
  user: userSchema;
}

const PersonalInfo = ({ user }: PersonalInfoProps) => {
  return (
    <div className="space-y-2.5">
      <p className="mb-1 text-[12px] font-extrabold text-[#3C3C42]">اطلاعات شخصی</p>

      <InfoRow
        icon={<UserIcon className="h-[18px] w-[18px]" />}
        label="نام پدر"
        value={user.father_name}
      />

      <InfoRow
        icon={<UserIcon className="h-[18px] w-[18px]" />}
        label="جنسیت"
        value={translateGender(user.gender)}
      />

      <InfoRow
        icon={<CalendarIcon className="h-[18px] w-[18px]" />}
        label="تاریخ تولد"
        value={
          user.birth_date
            ? toFaDigits(format(new Date(user.birth_date), "yyyy/MM/dd"))
            : "نامشخص"
        }
        dir="ltr"
      />

      <InfoRow
        icon={<UserIcon className="h-[18px] w-[18px]" />}
        label="شماره پرسنلی"
        value={user.personnel_number}
        dir="ltr"
      />
    </div>
  );
};

export default PersonalInfo;
