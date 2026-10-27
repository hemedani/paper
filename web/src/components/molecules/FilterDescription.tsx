"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type FilterValue = string | string[] | number;

interface FilterInfo {
  key: string;
  value: FilterValue;
  label: string;
  displayValue?: string;
}

interface FilterDescriptionProps {
  activeFilters: FilterInfo[];
}

/**
 * Compact summary of the currently active search filters.
 * Renders nothing when no filter is active so the results grid stays clean.
 */
export const FilterDescription = ({ activeFilters }: FilterDescriptionProps) => {
  const pathname = usePathname();

  if (activeFilters.length === 0) return null;

  const buildHref = (skipKey?: string) => {
    const params = new URLSearchParams();
    activeFilters
      .filter((f) => f.key !== skipKey)
      .forEach((f) => params.set(f.key, String(f.value)));
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const formatValue = (filter: FilterInfo) =>
    filter.displayValue ??
    (Array.isArray(filter.value) ? filter.value.join("، ") : String(filter.value));

  return (
    <div className="flex flex-col gap-3 rounded-[20px] border border-[#F0F0F2] bg-[#F8F8F9] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[13px] font-bold text-black">فیلترهای فعال :</span>
        {activeFilters.map((filter) => (
          <span
            key={filter.key}
            className="flex items-center gap-2 rounded-[12px] border border-[#F0F0F2] bg-white px-3 py-1.5"
          >
            <span className="text-[12px] font-semibold text-[#08A6AE]">{filter.label}</span>
            <span className="max-w-[160px] truncate text-[12px] font-medium text-[#5C5C63]">
              {formatValue(filter)}
            </span>
            <Link
              href={buildHref(filter.key)}
              aria-label={`حذف فیلتر ${filter.label}`}
              className="text-[#9A9AA1] transition-colors hover:text-[#D9534F]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
          </span>
        ))}
      </div>

      <Link
        href={pathname}
        className="shrink-0 text-[13px] font-semibold text-[#D9534F] transition-colors hover:text-[#b43f3c]"
      >
        پاک کردن همه
      </Link>
    </div>
  );
};
