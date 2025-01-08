"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AdvancedSearch from "./AdvancedSearch";

export const Header = () => {
  const [query, setQuery] = useState<string>("");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?search=${query}`);
    }
  };

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  return (
    <section className="py-12">
      <div className="mx-auto text-center mt-10">
        <h1 className="text-4xl font-bold mb-6 text-black text-center">
          مقالات مرتبط را در یک نمودار بصری کاوش کنید
        </h1>
        <p className="text-2xl text-gray-600 m-10">
          برای شروع، شناسه مقاله را وارد کنید
        </p>
        <div className="flex justify-center items-center gap-2">
          <input
            type="text"
            placeholder="جستجو بر اساس کلمات کلیدی، عنوان مقاله، DOI..."
            className="border text-gray-700 rounded-3xl px-4 py-2 w-1/3"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={(e: React.FormEvent<HTMLButtonElement>) => handleSearch(e)}
            className="bg-blue-600 text-white px-6 py-2 rounded-3xl hover:bg-blue-500"
          >
            جستجو
          </button>
          <button
            onClick={toggleAdvancedSearch}
            className={`px-4 py-2 rounded-3xl text-white transition-all ${
              showAdvancedSearch
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            {showAdvancedSearch
              ? "بستن جستجوی پیشرفته"
              : "باز کردن جستجوی پیشرفته"}
          </button>
        </div>
        {/* ارسال مقدار showAdvancedSearch به عنوان prop */}
        <div className="w-2/4 mx-auto">
          <AdvancedSearch isOpen={showAdvancedSearch} />
        </div>
      </div>
    </section>
  );
};
