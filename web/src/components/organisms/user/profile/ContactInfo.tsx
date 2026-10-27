import { userSchema } from "@/types/declarations/selectInp";
import { PhoneIcon, IdCardIcon, MapPinIcon } from "@/components/atoms/Icons";
import InfoRow from "./InfoRow";

interface ContactInfoProps {
  user: userSchema;
}

const ContactInfo = ({ user }: ContactInfoProps) => {
  return (
    <div className="space-y-2.5">
      <p className="mb-1 text-[12px] font-extrabold text-[#3C3C42]">اطلاعات تماس</p>

      <InfoRow
        icon={<PhoneIcon className="h-[18px] w-[18px]" />}
        label="شماره موبایل"
        value={user.mobile}
        dir="ltr"
      />

      <InfoRow
        icon={<IdCardIcon className="h-[18px] w-[18px]" />}
        label="کد ملی"
        value={user.national_number}
        dir="ltr"
      />

      <InfoRow
        icon={<MapPinIcon className="h-[18px] w-[18px]" />}
        label="آدرس"
        value={user.address}
      />
    </div>
  );
};

export default ContactInfo;
