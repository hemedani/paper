"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalItems: number;
  initialPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, initialPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const limit = 20;
  const isLastPage = totalItems <= limit;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`); // Update URL without refreshing
  };

  return (
    <div className="flex items-center justify-between mt-4">
      {/* دکمه رفتن به صفحه اول */}
      <button
        onClick={() => handlePageChange(1)}
        disabled={initialPage === 1}
        className={`px-4 py-2 rounded-lg ${
          initialPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        صفحه اول
      </button>

      {/* شماره صفحات */}
      <div className="flex items-center gap-2">
        {initialPage > 1 && (
          <button
            onClick={() => handlePageChange(initialPage - 1)}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            قبلی
          </button>
        )}
        <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg">
          صفحه {initialPage}
        </span>
        {!isLastPage && (
          <button
            onClick={() => handlePageChange(initialPage + 1)}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            بعدی
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
