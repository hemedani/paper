import React from "react";

export const PolicySection = ({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="border-t border-[#F0F0F2] pt-8 first:border-t-0 first:pt-0">
    <h2 className="flex items-start gap-3 text-[19px] font-bold leading-[1.7] text-black lg:text-[22px]">
      <span className="mt-[6px] flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] bg-[#EDFEFF] text-[12px] font-bold text-[#08A6AE]">
        {index}
      </span>
      <span>{title}</span>
    </h2>
    <div className="mt-4 flex flex-col gap-4 text-justify text-[15px] font-normal leading-[2] text-[#5C5C63] lg:text-[16px]">
      {children}
    </div>
  </section>
);

export const PolicyList = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="flex flex-col gap-3">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3">
        <span className="mt-[11px] h-[7px] w-[7px] shrink-0 rounded-full bg-[#08A6AE]" aria-hidden />
        <span className="flex-1">{item}</span>
      </li>
    ))}
  </ul>
);

export const PolicyLayout = ({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt?: string;
  children: React.ReactNode;
}) => (
  <div dir="rtl" className="bg-white">
    <div className="mx-auto w-full max-w-[950px] px-4 pb-20 pt-12 lg:pt-[80px]">
      <header className="flex flex-col items-start gap-3 border-b border-[#F0F0F2] pb-8">
        <h1 className="text-[28px] font-extrabold leading-[1.35] text-black sm:text-[36px] lg:text-[44px]">
          {title}
        </h1>
        {updatedAt && (
          <p className="text-[13px] font-medium leading-[1.8] text-[#9A9AA1] lg:text-[15px]">
            {updatedAt}
          </p>
        )}
      </header>

      <div className="mt-10 flex flex-col gap-8">{children}</div>
    </div>
  </div>
);
