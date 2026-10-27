import { userSchema } from "@/types/declarations/selectInp";
import { DocumentTextIcon } from "@/components/atoms/Icons";

interface SummarySectionProps {
  user: userSchema;
}

const SummarySection = ({ user }: SummarySectionProps) => {
  return (
    <div className="col-span-full space-y-2.5">
      <p className="mb-1 text-[12px] font-extrabold text-[#3C3C42]">خلاصه</p>

      <div className="flex items-start gap-3 rounded-[16px] border border-[#F0F0F2] bg-white p-3.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#FAF6EB] text-[#B98F26]">
          <DocumentTextIcon className="h-[18px] w-[18px]" />
        </span>
        <p className="whitespace-pre-wrap text-[13px] font-medium leading-[2] text-[#3C3C42]">
          {user.summery || "خلاصه‌ای ثبت نشده است"}
        </p>
      </div>
    </div>
  );
};

export default SummarySection;
