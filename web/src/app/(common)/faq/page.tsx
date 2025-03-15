"use client";
import React, { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out border border-gray-100 hover:shadow-xl">
      <button
        className="w-full text-right p-5 flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-semibold text-indigo-900 tracking-wide">
          {question}
        </span>
        <span
          className={`text-indigo-600 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="p-5 text-gray-700 leading-relaxed bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 animate-fade-in">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-gray-100 overflow-hidden">
      <div
        className="relative bg-cover bg-center h-80 md:h-[28rem] lg:h-[36rem]"
        style={{
          backgroundImage: "url(/images/faq.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-md">
            سوالات متداول
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
            پاسخ به سوالات شما درباره معماری اسلامی و امکانات وبسایت
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-8 text-center tracking-tight">
            سوالات عمومی
          </h2>
          <div className="max-w-3xl mx-auto">
            <FAQItem
              question="این وبسایت چه هدفی دارد؟"
              answer="هدف این وبسایت ارائه منابع معتبر و مقالات تخصصی در زمینه معماری اسلامی است تا به ارتقای دانش و علاقه‌مندی در این حوزه کمک کند."
            />
            <FAQItem
              question="چگونه می‌توانم با شما تماس بگیرم؟"
              answer="برای تماس با ما، می‌توانید از فرم تماس در صفحه اصلی استفاده کنید یا به ایمیل info@example.com پیام بفرستید."
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-8 text-center tracking-tight">
            محتوا و مقالات
          </h2>
          <div className="max-w-3xl mx-auto">
            <FAQItem
              question="چگونه مقالات جدید را پیدا کنم؟"
              answer="مقالات جدید در بخش 'آخرین مقالات' در صفحه اصلی نمایش داده می‌شوند. همچنین می‌توانید از فیلترهای جستجو استفاده کنید."
            />
            <FAQItem
              question="آیا می‌توانم مقالات را دانلود کنم؟"
              answer="بله، مقالات در قالب PDF قابل دانلود هستند. کافی است روی دکمه دانلود در صفحه مقاله کلیک کنید."
            />
          </div>
        </section>

        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-8 text-center tracking-tight">
            امکانات آینده
          </h2>
          <div className="max-w-3xl mx-auto">
            <FAQItem
              question="چت‌بات هوش مصنوعی چیست؟"
              answer="چت‌بات ما یک ابزار هوشمند است که به زودی راه‌اندازی می‌شود و به سوالات شما درباره معماری اسلامی پاسخ خواهد داد."
            />
            <FAQItem
              question="چه زمانی امکانات جدید اضافه می‌شود؟"
              answer="ما به طور مداوم در حال توسعه هستیم و اخبار به‌روزرسانی‌ها از طریق خبرنامه اعلام خواهد شد."
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQPage;
