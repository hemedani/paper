"use client";

import Link from "next/link";
import { ReactNode } from "react";

export const ListCard = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <div className="w-full p-5 bg-gray-100">
        <div className="w-full flex justify-between items-center ">
          <p className="text-left w-2/4 my-5 text-2xl text-black">مقالات</p>
          <div className="w-2/4 text-left">
            <Link href={"/"} className=" bg-blue-500 hover:bg-blue-600 my-5 p-2 rounded text-white">
              نمایش نموداری
            </Link>
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-4 gap-4">
          {children}
        </div>
      </div>
    </section>
  );
};
