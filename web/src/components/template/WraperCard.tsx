"use client";
import { ReactNode } from "react";

export const ListCard = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <div className="grid w-full grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[25px]">
        {children}
      </div>
    </section>
  );
};
