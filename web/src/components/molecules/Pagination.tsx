"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

interface PaginationProps {
  initialPage: number; // صفحه فعلی
  countPage: number; // تعداد کل آیتم‌های دیتابیس
}

const Pagination: FC<PaginationProps> = ({
  initialPage,
  countPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const limit = 21;
  const totalPages = Math.ceil(countPage / limit);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-2/4 mx-auto flex items-center justify-between mt-4">
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
        {initialPage < totalPages && (
          <button
            onClick={() => handlePageChange(initialPage + 1)}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            بعدی
          </button>
        )}
      </div>

      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={initialPage === totalPages}
        className={`px-4 py-2 rounded-lg ${
          initialPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        صفحه آخر
      </button>
    </div>
  );
};

export default Pagination;
