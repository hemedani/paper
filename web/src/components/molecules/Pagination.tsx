"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import Image from "next/image";
import { toFaDigits } from "@/utils/digits";

interface PaginationProps {
  initialPage: number; // صفحه فعلی
  countPage: number; // تعداد کل آیتم‌های دیتابیس
  limit?: number; // تعداد آیتم در هر صفحه
}

const Pagination: FC<PaginationProps> = ({ initialPage, countPage, limit = 20 }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(countPage / limit);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisible = 3; // Maximum number of page buttons to show

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      if (initialPage > 2) {
        // Show current page and maybe one before
        if (initialPage > 3) {
          pageNumbers.push("ellipsis");
        }
        if (initialPage < totalPages) {
          pageNumbers.push(initialPage);
        }
      } else if (totalPages > 2) {
        // Show page 2 if we're near the start
        pageNumbers.push(2);
      }

      // Always show last page if different from current pages shown
      if (!pageNumbers.includes(totalPages) && totalPages > 1) {
        if (initialPage < totalPages - 1 && !pageNumbers.includes("ellipsis")) {
          pageNumbers.push("ellipsis");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page
  }

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="صفحه‌بندی" className="flex w-full justify-center">
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {/* Previous button (قبلی) — first in RTL, so it sits on the right */}
        <button
          onClick={() => handlePageChange(initialPage - 1)}
          disabled={initialPage === 1}
          aria-label="صفحه قبلی"
          className="flex h-12 items-center justify-center gap-2 rounded-full border border-[#F0F0F2] bg-white px-5 transition-colors hover:bg-[#F8F8F9] disabled:cursor-not-allowed disabled:opacity-50 lg:h-14 lg:px-8"
        >
          <span className="text-[14px] font-medium leading-[1.76] text-[#9A9AA1] lg:text-[16px]">
            قبلی
          </span>
          <Image src="/images/pagination/arrow-right.svg" alt="" width={4} height={7} />
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-2">
          {pageNumbers.map((pageNumber, index) => {
            if (pageNumber === "ellipsis") {
              return (
                <div
                  key={`ellipsis-${index}`}
                  className="flex h-12 w-10 items-center justify-center lg:h-14 lg:w-12"
                  aria-hidden="true"
                >
                  <span className="text-[15px] font-medium leading-[1.76] text-[#9A9AA1]">...</span>
                </div>
              );
            }

            const isActive = pageNumber === initialPage;

            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber as number)}
                aria-label={`صفحه ${pageNumber}`}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "flex h-12 w-12 items-center justify-center rounded-full text-[14px] font-semibold leading-[1.76] transition-colors lg:h-14 lg:w-14 lg:text-[16px]",
                  isActive
                    ? "bg-[#D2A634] text-white"
                    : "border border-[#F0F0F2] bg-white text-black hover:bg-[#F8F8F9]",
                ].join(" ")}
              >
                {toFaDigits(pageNumber as number)}
              </button>
            );
          })}
        </div>

        {/* Next button (بعدی) — last in RTL, so it sits on the left */}
        <button
          onClick={() => handlePageChange(initialPage + 1)}
          disabled={initialPage === totalPages}
          aria-label="صفحه بعدی"
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#F8F8F9] px-5 transition-colors hover:bg-[#F0F0F2] disabled:cursor-not-allowed disabled:opacity-50 lg:h-14 lg:px-8"
        >
          <Image src="/images/pagination/arrow-left.svg" alt="" width={4} height={7} />
          <span className="text-[14px] font-semibold leading-[1.76] text-black lg:text-[16px]">
            بعدی
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
