"use client";
import { useState } from "react";
import AdvancedSearch from "../molecules/AdvancedSearch";
import { DefaultSearchArrayValues } from "@/utils/prepareArtticleSearch";
import { AdminIcon } from "../organisms/admin/AdminUI";

const ToggleAdvancedSearch = ({
  defaultSearchArrayValues,
  pageAddress,
}: {
  defaultSearchArrayValues: DefaultSearchArrayValues;
  pageAddress?: string;
}) => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowAdvancedSearch((v) => !v)}
        aria-expanded={showAdvancedSearch}
        className="flex w-full items-center justify-between gap-3 rounded-[14px] bg-[#F8F8F9] px-4 py-3 text-start transition-colors hover:bg-[#F0F0F2]"
      >
        <span className="flex items-center gap-2 text-[13px] font-bold text-[#3C3C42]">
          <span className="text-[#08A6AE]">{AdminIcon.search}</span>
          جستجوی پیشرفته
        </span>

        <span className="flex items-center gap-1.5 text-[12px] font-bold text-[#08A6AE]">
          {showAdvancedSearch ? "بستن" : "باز کردن"}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className={`transition-transform duration-300 ${showAdvancedSearch ? "rotate-180" : ""}`}
          >
            <path
              d="M6 9.5l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div className="mt-4">
        <AdvancedSearch
          isOpen={showAdvancedSearch}
          defaultSearchArrayValues={defaultSearchArrayValues}
          pageAddress={pageAddress}
        />
      </div>
    </div>
  );
};

export default ToggleAdvancedSearch;
