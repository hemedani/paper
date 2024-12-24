// components/Pagination.js
import React, { FC } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type TProps = {
    totalPage: string;
}

const Pagination: FC<TProps> = (props) => {
  const searchParams = useSearchParams();
  const page: string = searchParams.get('page') || "1";
  const currentPage = parseInt(page);

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link href={`/?page=${currentPage - 1}`}>
          <a>Previous</a>
        </Link>
      )}
      <span>Page {currentPage} of {props.totalPage}</span>
      {currentPage < +props.totalPage && (
        <Link href={`/?page=${currentPage + 1}`}>
          <a>Next</a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;