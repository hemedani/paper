"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const Header = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const handleSearch = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?query=${query}`);
    }
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
          <button onClick={(e: React.FormEvent<HTMLButtonElement>) => handleSearch(e)} className="bg-blue-600 text-white px-6 py-2 rounded-3xl hover:bg-blue-500">
            ساخت نمودار
          </button>
        </div>
      </div>
    </section>
  );
};
