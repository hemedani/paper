"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Category = "سوالات عمومی" | "محتوا و مقالات" | "امکانات آینده";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: Category;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "این وبسایت چه هدفی دارد؟",
    answer:
      "این وبسایت با هدف ارائه مقالات تخصصی در زمینه معماری اسلامی راه‌اندازی شده است. ما به بررسی جنبه‌های تاریخی، هنری و فنی معماری اسلامی می‌پردازیم و به زودی چت‌بات هوش مصنوعی برای پاسخ به سوالات شما اضافه خواهد شد.",
    category: "سوالات عمومی",
  },
  {
    id: 2,
    question: "چگونه می‌توانم با شما در تماس باشم؟",
    answer:
      "برای تماس با ما می‌توانید از فرم تماس در صفحه تماس با ما استفاده کنید، یا با ایمیل info@islamicarchitecture.com و شماره تلفن ۰۲۱-۱۲۳۴۵۶۷۸ با ما در ارتباط باشید.",
    category: "سوالات عمومی",
  },
  {
    id: 3,
    question: "مقالات بروز و تازه را چطور می‌توانم پیدا کنم؟",
    answer:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می‌باشد.",
    category: "محتوا و مقالات",
  },
  {
    id: 4,
    question: "آیا می‌توانم مقالات را دانلود کنم؟",
    answer:
      "بله، مقالات در قالب PDF قابل دانلود هستند. کافی است روی دکمه دانلود در صفحه مقاله کلیک کنید. برخی مقالات ممکن است نیاز به ثبت‌نام داشته باشند.",
    category: "محتوا و مقالات",
  },
  {
    id: 5,
    question: "چطور می‌توانم مقالات را با کمک هوش مصنوعی ارتقا بدهم؟",
    answer:
      "به زودی قابلیت هوش مصنوعی به پایگاه دانش اضافه می‌شود که به شما امکان می‌دهد مقالات مرتبط را پیدا کنید، خلاصه مقالات را دریافت کنید و سوالات خود را به صورت هوشمند جستجو نمایید.",
    category: "امکانات آینده",
  },
  {
    id: 6,
    question: "چطور می‌توانم با پایگاه دانش همکاری داشته باشم؟",
    answer:
      "برای همکاری با پایگاه دانش می‌توانید از طریق صفحه تماس با ما اطلاعات خود را ارسال کنید. تیم ما در اسرع وقت با شما تماس خواهد گرفت و جزئیات همکاری را بررسی خواهیم کرد.",
    category: "امکانات آینده",
  },
];

// RTL flex-row renders the first entry on the right — matches the Figma order.
const categories: Category[] = ["سوالات عمومی", "محتوا و مقالات", "امکانات آینده"];

const FAQAccordionItem: React.FC<{
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ item, isOpen, onToggle }) => (
  <div
    className={[
      "w-full overflow-hidden rounded-[18px] border bg-white transition-shadow duration-300",
      isOpen
        ? "border-[#F0F0F2] shadow-[0px_40px_62px_-37px_rgba(0,0,0,0.18)]"
        : "border-[#F0F0F2]",
    ].join(" ")}
  >
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="flex min-h-[91px] w-full flex-row items-center justify-between gap-4 px-5 py-5 text-right focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#08A6AE] sm:px-8"
    >
      <span
        className={[
          "text-[16px] font-semibold leading-[1.56] transition-colors sm:text-[18px]",
          isOpen ? "text-[#D2A634]" : "text-black",
        ].join(" ")}
      >
        {item.question}
      </span>

      <Image
        src={isOpen ? "/images/faq/faq-icon-expanded.svg" : "/images/faq/faq-icon-collapsed.svg"}
        alt=""
        width={40}
        height={40}
        className="shrink-0"
      />
    </button>

    <div
      className={[
        "grid transition-all duration-300 ease-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      ].join(" ")}
    >
      <div className="overflow-hidden">
        <div className="mx-5 border-t border-[#F0F0F2] sm:mx-8" />
        <p className="px-5 pb-8 pt-6 text-[14px] font-normal leading-[1.9] text-[#9A9AA1] sm:px-8 sm:text-[16px]">
          {item.answer}
        </p>
      </div>
    </div>
  </div>
);

const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("سوالات عمومی");
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const filteredItems = useMemo(
    () => faqItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  return (
    <div dir="rtl" className="bg-white">
      <div className="mx-auto w-full max-w-[950px] px-4 pb-[120px] pt-14 lg:pt-[96px]">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-[34px] font-extrabold leading-[1.15] text-black sm:text-[42px] lg:text-[48px]">
            سوالات متداول
          </h1>
          <p className="mt-4 text-[15px] font-medium leading-[1.6] text-[#9A9AA1] sm:text-[18px]">
            پاسخ به سوالات شما درباره معماری اسلامی و امکانات وبسایت
          </p>
        </div>

        {/* Category tabs */}
        <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-3 lg:mt-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenItemId(null);
                }}
                aria-pressed={isActive}
                className={[
                  "flex h-[58px] items-center justify-center whitespace-nowrap rounded-[60px] px-6 text-[15px] font-semibold leading-[1.5] transition-colors sm:px-[31px] sm:text-[16px]",
                  isActive
                    ? "border border-transparent bg-[#D2A634] text-white"
                    : "border-[1.5px] border-[#F0F0F2] bg-white text-black hover:border-[#D2A634]/40",
                ].join(" ")}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Items */}
        <div className="mt-10 flex flex-col gap-[13px] lg:mt-[52px]">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <FAQAccordionItem
                key={item.id}
                item={item}
                isOpen={openItemId === item.id}
                onToggle={() => setOpenItemId((prev) => (prev === item.id ? null : item.id))}
              />
            ))
          ) : (
            <p className="py-16 text-center text-[16px] text-[#9A9AA1]">
              سوالی در این دسته‌بندی یافت نشد.
            </p>
          )}
        </div>

        {/* Still curious? */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[24px] border border-[#F0F0F2] bg-[#F8F8F9] px-6 py-7 text-center sm:flex-row sm:text-right">
          <div className="flex flex-col gap-1">
            <p className="text-[17px] font-bold text-black">پاسخ سوال خود را پیدا نکردید؟</p>
            <p className="text-[14px] font-medium leading-[1.8] text-[#9A9AA1]">
              تیم پشتیبانی پایگاه دانش آماده پاسخ‌گویی به شماست.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-[16px] bg-[#08A6AE] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[#088f96]"
          >
            <span>تماس با ما</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

