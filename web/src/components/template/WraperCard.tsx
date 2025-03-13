"use client";

import Link from "next/link";
import { ReactNode } from "react";

export const ListCard = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <div className="w-full p-8">
        <div className="flex-end text-left h-12">
          <Link href={"/"} className="bg-blue-500 hover:bg-blue-600 p-2 rounded text-white">
            نمایش نموداری
          </Link>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-4 gap-4">
          {children}
        </div>
      </div>
    </section>
  );
};
