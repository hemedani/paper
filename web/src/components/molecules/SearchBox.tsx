"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { SearchIcon } from "@/components/atoms/Icons";

interface SearchBoxProps {
  defaultValue?: string;
  /** Query-string key this field writes to (e.g. `name`, `first_name`). */
  title: string;
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  defaultValue = "",
  title,
  placeholder = "جستجو کنید...",
}) => {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();
  const pathname = usePathname();

  const go = (value: string) => {
    const trimmed = value.trim();
    router.push(trimmed ? `${pathname}?${title}=${encodeURIComponent(trimmed)}` : pathname);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    go(query);
  };

  const handleClear = () => {
    setQuery("");
    go("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2.5 sm:flex-row sm:items-center">
      <div className="flex h-11 flex-1 items-center gap-2.5 rounded-[14px] border-[1.5px] border-[#F0F0F2] bg-white px-4 transition-all focus-within:border-[#08A6AE] focus-within:ring-4 focus-within:ring-[#08A6AE]/10">
        <SearchIcon className="h-[18px] w-[18px] shrink-0 text-[#9A9AA1]" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="h-full min-w-0 flex-1 bg-transparent text-[13.5px] font-medium text-black outline-none placeholder:text-[#C4C4CA] [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="پاک کردن جستجو"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[#9A9AA1] transition-colors hover:bg-[#F8F8F9] hover:text-black"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-[14px] bg-[#08A6AE] px-6 text-[13.5px] font-bold text-white transition-colors hover:bg-[#079aa2]"
        >
          جستجو
        </button>
        {defaultValue && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex h-11 items-center justify-center rounded-[14px] border border-[#F0F0F2] bg-white px-5 text-[13px] font-semibold text-[#5C5C63] transition-colors hover:bg-[#F8F8F9] hover:text-black"
          >
            حذف فیلتر
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBox;
