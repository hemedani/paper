"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface SearchBoxProps {
  defaultValue?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ defaultValue = "" }) => {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`?query=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="mt-4 flex gap-2">
      <input
        type="text"
        placeholder="جستجو کنید..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded-lg flex-1 text-gray-700"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        جستجو
      </button>
    </form>
  );
};

export default SearchBox;
