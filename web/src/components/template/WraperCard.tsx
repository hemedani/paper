"use client";
import { ReactNode } from "react";

export const ListCard = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <div className="w-full p-8">
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-4">
          {children}
        </div>
      </div>
    </section>
  );
};
