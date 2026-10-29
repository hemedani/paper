import React from "react";
import Link from "next/link";
import Image from "next/image";

const informationLinks = [
  { href: "/faq", label: "سوالات متداول" },
  { href: "/terms", label: "شرایط و قوانین وبسایت" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

const featureLinks = [
  { href: "/", label: "جستجوی پیشرفته مقالات" },
  { href: "/blog", label: "بلاگ معماری اسلامی" },
  { href: "/graph", label: "تحلیل گرافیکی مقالات" },
  { href: "/faq", label: "خدمات پس از فروش" },
  { href: "/chatbot", label: "چت‌بات هوش مصنوعی (به زودی)" },
];

const headingClass = "text-[16px] font-bold leading-[1.76] text-black text-right";
const itemClass =
  "text-[14px] font-semibold leading-[1.76] text-[#9A9AA1] text-right transition-colors hover:text-black";

export const Footer = () => {
  return (
    <footer dir="rtl" className="w-full bg-[#F8F8F9]">
      <div
        className="mx-auto w-full max-w-[1600px]"
        style={{ padding: "68px clamp(20px, 13.875vw, 222px) 34px" }}
      >
        {/* Top */}
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-start lg:gap-8 lg:px-[52px]">
              {/* Brand + description (right) */}
              <div className="flex max-w-[420px] flex-col gap-6">
                <div className="flex flex-row items-center justify-start gap-3">
                  <Image
                    src="/images/footer/logo-footer.svg"
                    alt="پایگاه دانش"
                    width={161}
                    height={37}
                    className="h-[34px] w-auto"
                  />
                  <span className="text-[12px] font-light leading-[1.55] text-black">
                    معماری و شهرسازی ایرانی اسلامی
                  </span>
                </div>

                <p className="text-justify text-[14px] font-medium leading-[1.76] text-[#9A9AA1]">
                  این وبسایت با هدف ارائه مقالات تخصصی در زمینه معماری اسلامی راه‌اندازی شده است. ما
                  به بررسی جنبه‌های تاریخی، هنری و فنی معماری اسلامی می‌پردازیم و به زودی چت‌بات هوش
                  مصنوعی برای پاسخ به سوالات شما اضافه خواهد شد.
                </p>
              </div>

              {/* Link columns — design order (right→left): امکانات، تماس با ما، اطلاعات مجموعه */}
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12">
                <div className="flex flex-col items-start gap-4">
                  <h3 className={headingClass}>امکانات</h3>
                  <div className="flex flex-col items-start gap-2">
                    {featureLinks.map((link) => (
                      <Link key={link.label} href={link.href} className={itemClass}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-4">
                  <h3 className={headingClass}>تماس با ما</h3>
                  <div className="flex flex-col items-start gap-2">
                    <p className={itemClass}>تهران، خیابان ولیعصر، پلاک ۱۲۳</p>
                    <p className={itemClass} dir="ltr">
                      ۰۲۱ ۱۲۳۴ ۵۶۷۸
                    </p>
                    <p className={itemClass} dir="ltr">
                      info@islamicarchitecture.com
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-4">
                  <h3 className={headingClass}>اطلاعات مجموعه</h3>
                  <div className="flex flex-col items-start gap-2">
                    {informationLinks.map((link) => (
                      <Link key={link.label} href={link.href} className={itemClass}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-[#D7D7DA] opacity-50" />

            {/* Social */}
            <div className="flex flex-col-reverse items-center justify-between gap-6 sm:flex-row-reverse lg:px-[52px]">
              <div className="flex items-center gap-4">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="تلگرام"
                  className="text-[#9A9AA1] transition-colors hover:text-[#08A6AE]"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M21.5 3.5L2.5 11l5.5 2 2 6 3-3.5 5 3.5 3.5-15.5z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="توییتر"
                  className="text-[#9A9AA1] transition-colors hover:text-[#08A6AE]"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M4 4l7.5 9.5L4.5 20M20 4l-7.4 8.6L20 20"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="اینستاگرام"
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-[#08A6AE] text-white transition-opacity hover:opacity-90"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="فیسبوک"
                  className="text-[#9A9AA1] transition-colors hover:text-[#08A6AE]"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
                    <path
                      d="M14.5 8.5h-1.8c-.7 0-1.2.5-1.2 1.2V21"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                    <path d="M9.5 13h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </a>
              </div>

              <h3 className="text-[18px] font-bold leading-[1.76] text-black sm:text-[20px]">
                ما را در دنیای مجازی دنبال کنید!
              </h3>
            </div>
          </div>

          {/* Copyright */}
          <p className="mx-auto max-w-[410px] text-center text-[13px] font-medium leading-[1.76] text-[#9A9AA1]">
            © ۲۰۲۵ شهر سازی اسلامی. توسعه یافته در واحد فناوری اطلاعات حوزه هنری
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
