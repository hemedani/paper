'use client'

import { ReactNode } from "react";

export const ListCard = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <div className="w-full p-5 bg-gray-100 ">
        <p className="text-center my-5 text-4xl text-black">
          آخرین مقالات
        </p>
        <div className="flex justify-center items-center flex-wrap gap-5">
          {children}
        </div>


      </div>
    </section>
  );
};
