import Image from "next/image";
import Link from "next/link";
import React from "react";

const teamMembers = [
  { name: "همایون آرون", role: "توسعه‌دهنده وب", img: "/images/about/team-member-1.jpg" },
  { name: "همایون آرون", role: "متخصص محتوا", img: "/images/about/team-member-2.jpg" },
  { name: "شاهین بیانی", role: "هیئت مدیره مجموعه", img: "/images/about/team-member-3.jpg", featured: true },
  { name: "همایون آرون", role: "گرافیک دیزاینر", img: "/images/about/team-member-4.jpg" },
  { name: "همایون آرون", role: "طراح و پژوهشگر معماری", img: "/images/about/team-member-5.jpg" },
  { name: "سپیده صیاد", role: "هیئت مدیره مجموعه", img: "/images/about/team-member-6.jpg" },
  { name: "مجتبی فهیمده", role: "گرافیک دیزاینر", img: "/images/about/team-member-7.jpg" },
  { name: "علی محتشم", role: "طراح و پژوهشگر معماری", img: "/images/about/team-member-8.jpg" },
  { name: "ناهید موکل", role: "توسعه‌دهنده وب", img: "/images/about/team-member-9.jpg" },
  { name: "سامیار ارجمند", role: "متخصص محتوا", img: "/images/about/team-member-10.jpg" },
];

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(205deg, rgba(250, 246, 235, 0) 32%, rgba(246, 237, 214, 1) 92%), linear-gradient(139deg, rgba(202, 243, 246, 0) 22%, rgba(202, 243, 246, 1) 100%), #FFFFFF",
        }}
      >
        <div className="mx-auto flex w-full max-w-[1284px] flex-col items-center justify-between gap-14 px-4 py-14 md:px-8 lg:flex-row lg:items-center lg:gap-10 lg:py-[80px]">
          {/* Text (right in RTL) */}
          <div className="order-1 flex w-full flex-col items-end gap-7 lg:w-[533px] lg:shrink-0">
            {/* Badge */}
            <div className="flex items-center gap-[10px]">
              <h1 className="text-[14px] font-semibold leading-[1.76] text-right text-[#08A6AE] lg:text-[16px]">
                درباره شهرسازی اسلامی
              </h1>
              <div
                className="flex h-8 w-8 items-center justify-center rounded-[11px] bg-[#08A6AE] lg:h-9 lg:w-9"
                style={{ boxShadow: "0px 11px 20.6px 0px rgba(8, 166, 174, 0.22)" }}
              >
                <Image src="/images/about/icon-button.svg" alt="" width={22} height={22} />
              </div>
            </div>

            {/* Title */}
            <h2 className="w-full text-right text-[30px] font-extrabold leading-[1.4] text-black sm:text-[40px] lg:text-[54px]">
              پایگاه دانش از یک{" "}
              <span className="text-[#D2A634]">پژوهشگر</span> چند ساله!
            </h2>

            {/* Description */}
            <p className="w-full text-right text-[15px] font-medium leading-[1.9] text-[#9A9AA1] lg:text-[18px]">
              ما تیمی هستیم که به ترویج معماری اسلامی و ارائه منابع آموزشی باکیفیت اختصاص یافته‌ایم.
              هدف ما ارتقای دانش و آگاهی در این حوزه است.
            </p>

            {/* CTA */}
            <Link
              href="/#results"
              className="flex h-[60px] items-center justify-center gap-[9px] rounded-[18px] bg-[#08A6AE] px-8 transition-colors hover:bg-[#07959c] lg:h-[72px] lg:w-[284px] lg:px-0"
            >
              <Image src="/images/about/icon-arrow-left.svg" alt="" width={24} height={24} />
              <span className="whitespace-nowrap text-[15px] font-semibold leading-[1.76] text-white lg:text-[16px]">
                مشاهده دسته‌بندی مقالات
              </span>
            </Link>
          </div>

          {/* Image card + floating tags (left in RTL) */}
          <div className="order-2 flex w-full justify-center lg:w-[551px] lg:shrink-0 lg:justify-start">
            <div className="relative w-full max-w-[383px] lg:mx-0">
              {/* Floating tags */}
              <span className="absolute -right-2 -top-5 z-10 rounded-[13px] border border-[#F0F0F2] bg-white px-4 py-2 text-[14px] font-medium text-black shadow-[0px_19px_32.8px_-15px_rgba(0,0,0,0.13)] lg:-right-16 lg:text-[18px]">
                # پژوهشگاه
              </span>
              <span className="absolute -left-2 top-[72px] z-10 rounded-[13px] border border-[#EDDBAE] bg-[#FAF6EB] px-4 py-2 text-[14px] font-medium text-[#D2A634] shadow-[0px_19px_32.8px_-15px_rgba(210,166,52,0.33)] lg:-left-24 lg:text-[18px]">
                # کلمات-کلیدی
              </span>
              <span className="absolute -left-6 top-[168px] z-10 rounded-[13px] border border-[#F0F0F2] bg-white px-4 py-2 text-[14px] font-medium text-black shadow-[0px_19px_32.8px_-15px_rgba(0,0,0,0.13)] lg:-left-32 lg:text-[18px]">
                # هویت
              </span>

              {/* Card */}
              <div className="relative rounded-[30px] bg-white p-4 shadow-[0px_28px_60px_-30px_rgba(0,0,0,0.18)]">
                <div className="relative h-[240px] w-full overflow-hidden rounded-[20px] bg-[#2B2118] lg:h-[322px]">
                  <Image
                    src="/images/about/about-hero-image.jpg"
                    alt="درباره ما"
                    fill
                    sizes="(max-width: 1024px) 100vw, 351px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-[70px] w-[70px] items-center justify-center rounded-[23px] border-4 border-white/20 bg-white/20 backdrop-blur-[6.5px]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M9 7.5v9l7.5-4.5L9 7.5z" fill="#fff" />
                      </svg>
                    </span>
                  </div>
                </div>

                <h3 className="mt-5 w-full text-right text-[17px] font-bold leading-[1.6] text-black lg:text-[20px]">
                  مهم نیست اطلاعات چه کمکی قراره داشته باشه معرفی ما!
                </h3>
                <p className="mb-2 mt-2 w-full text-right text-[14px] font-medium leading-[1.76] text-[#9A9AA1] lg:text-[16px]">
                  لورم ایپسوم ساختگی برای طراحان گرافیک است.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro paragraph ──────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1242px] px-4 py-14 md:px-8 lg:py-20">
        <p className="text-center text-[15px] font-medium leading-[2] text-[#9A9AA1] lg:text-[18px]">
          اطلاعات شخصی: مانند نام، آدرس ایمیل و جزئیات تماس شما هنگام اشتراک در خبرنامه یا تماس با ما.
          داده‌های استفاده: اطلاعاتی درباره نحوه استفاده شما از وبسایت، از جمله آدرس IP، نوع مرورگر و
          صفحات بازدید شده، که از طریق ابزارهای تحلیلی جمع‌آوری می‌شود. تعاملات چت‌بات: پس از
          راه‌اندازی چت‌بات هوش مصنوعی، ممکن است داده‌هایی از تعاملات شما برای بهبود عملکرد آن و تجربه
          کاربری جمع‌آوری کنیم.
        </p>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1242px] px-4 pb-10 md:px-8 lg:px-0 lg:pb-16">
        <div className="flex flex-col items-center gap-[7px]">
          <h2 className="text-center text-[26px] font-extrabold leading-[1.76] text-black lg:text-[32px]">
            اعضای تیم ما
          </h2>
          <p className="text-center text-[14px] font-medium leading-[1.76] text-[#9A9AA1] lg:text-[18px]">
            تیمی متعهد، خلاق و همیشه آماده برای بهترین‌ها
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-[20px] gap-y-10 sm:gap-x-[30px] lg:mt-[52px] lg:gap-x-[41.75px] lg:gap-y-[60px]">
          {teamMembers.map((member, index) => (
            <div
              key={`${member.name}-${index}`}
              className="flex w-[140px] flex-col items-center gap-5 sm:w-[170px] lg:w-[215px] lg:gap-9"
            >
              <div className="relative h-[140px] w-[140px] overflow-hidden rounded-full bg-[#F8F8F9] sm:h-[170px] sm:w-[170px] lg:h-[215px] lg:w-[215px]">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  sizes="215px"
                  className="object-cover grayscale"
                />
                {member.featured && (
                  <>
                    <span className="absolute inset-0 bg-[#08A6AE]/45 mix-blend-multiply" aria-hidden />
                    <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white lg:bottom-5 lg:left-5 lg:h-[46px] lg:w-[46px]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M7 17L17 7M17 7H9M17 7v8"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-col items-center gap-1 lg:gap-[10px]">
                <h3 className="text-center text-[15px] font-bold leading-[1.4] text-black lg:text-[20px]">
                  {member.name}
                </h3>
                <p className="text-center text-[12px] font-medium leading-[1.76] text-[#9A9AA1] lg:text-[15px]">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1242px] px-4 py-10 md:px-8 lg:py-16">
        <div className="flex flex-col items-center gap-[7px]">
          <h2 className="text-center text-[26px] font-extrabold leading-[1.76] text-black lg:text-[32px]">
            تماس باما
          </h2>
          <p className="max-w-[443px] text-center text-[14px] font-medium leading-[1.76] text-[#9A9AA1] lg:text-[18px]">
            ما مشتاق شنیدن نظرات و سوالات شما هستیم. از طریق فرم زیر یا اطلاعات تماس با ما در ارتباط
            باشید.
          </p>
        </div>

        <form className="mt-9 flex w-full flex-col gap-6 lg:mt-[42px]">
          <div className="flex w-full flex-col gap-6 lg:flex-row">
            {/* Name */}
            <div className="flex h-[90px] w-full items-center justify-end gap-5 rounded-[22px] border-[1.5px] border-[#F0F0F2] px-6 lg:px-8">
              <input
                type="text"
                name="name"
                aria-label="نام و نام خانوادگی"
                placeholder="اینجا وارد کنید"
                className="min-w-0 flex-1 bg-transparent text-right text-[15px] font-normal leading-[1.76] text-black outline-none placeholder:text-[#9A9AA1] lg:text-[16px]"
              />
              <span className="h-[22.5px] w-px bg-[#F0F0F2]" aria-hidden />
              <label className="flex shrink-0 items-center gap-2 whitespace-nowrap">
                <span className="text-[15px] font-semibold leading-[1.76] text-black lg:text-[16px]">
                  نام و نام خانوادگی
                </span>
                <span className="text-[15px] font-semibold text-[#D2A634]">*</span>
              </label>
            </div>

            {/* Phone */}
            <div className="flex h-[90px] w-full items-center justify-end gap-5 rounded-[22px] border-[1.5px] border-[#F0F0F2] px-6 lg:px-8">
              <input
                type="tel"
                name="phone"
                aria-label="شماره تماس"
                placeholder="اینجا وارد کنید"
                className="min-w-0 flex-1 bg-transparent text-right text-[15px] font-normal leading-[1.76] text-black outline-none placeholder:text-[#9A9AA1] lg:text-[16px]"
              />
              <span className="h-[22.5px] w-px bg-[#F0F0F2]" aria-hidden />
              <label className="flex shrink-0 items-center gap-2 whitespace-nowrap">
                <span className="text-[15px] font-semibold leading-[1.76] text-black lg:text-[16px]">
                  شماره تماس
                </span>
                <span className="text-[15px] font-semibold text-[#D2A634]">*</span>
              </label>
            </div>
          </div>

          {/* Message */}
          <div className="flex min-h-[180px] w-full flex-col items-end gap-3 rounded-[22px] border-[1.5px] border-[#F0F0F2] px-6 py-5 lg:flex-row lg:items-start lg:gap-5 lg:px-8 lg:py-8">
            <label className="shrink-0 whitespace-nowrap text-[15px] font-semibold leading-[1.76] text-black lg:text-[16px]">
              توضیحات در صورت لزوم
            </label>
            <span className="hidden h-[22.5px] w-px bg-[#F0F0F2] lg:block" aria-hidden />
            <textarea
              name="message"
              aria-label="توضیحات"
              placeholder="اینجا وارد کنید..."
              className="min-h-[110px] w-full flex-1 resize-none bg-transparent text-right text-[15px] font-normal leading-[1.76] text-black outline-none placeholder:text-[#9A9AA1] lg:text-[16px]"
            />
          </div>

          <button
            type="submit"
            className="flex h-[60px] w-[196px] items-center justify-center gap-[9px] self-end rounded-[18px] bg-[#08A6AE] transition-colors hover:bg-[#07959c] lg:h-[72px]"
          >
            <Image src="/images/about/icon-send.svg" alt="" width={24} height={24} />
            <span className="text-[15px] font-semibold leading-[1.76] text-white lg:text-[16px]">
              ارسال پیام
            </span>
          </button>
        </form>
      </section>

      {/* ── Contact info cards ───────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1242px] px-4 pb-16 md:px-8 lg:pb-24">
        <div className="flex flex-col items-stretch justify-center gap-8 lg:flex-row lg:items-center lg:gap-[45px]">
          {/* Phone (right in the design) */}
          <div className="flex shrink-0 items-center justify-center gap-[30px] lg:w-[354px]">
            <div className="relative flex h-[90px] w-[90px] shrink-0 items-center justify-center rounded-full bg-[#F8F8F9] lg:h-[110px] lg:w-[110px]">
              <Image src="/images/about/icon-phone.svg" alt="" width={44} height={44} />
            </div>
            <div className="flex flex-col items-end gap-[6px]">
              <span className="text-[14px] font-semibold leading-[1.56] text-right text-[#9A9AA1] lg:text-[18px]">
                تماس با مجموعه
              </span>
              <span className="text-[15px] font-bold leading-[1.56] text-right text-black lg:text-[18px]">
                تماس با ۹۸ ۹۱۵ ۸۷۳ ۵۰۴۱+
              </span>
            </div>
          </div>

          <div className="hidden h-[63px] w-0 border-l border-[#F0F0F2] lg:block" />

          {/* Working hours */}
          <div className="flex shrink-0 items-center justify-center gap-[30px] lg:w-[354px]">
            <div
              className="relative flex h-[90px] w-[90px] shrink-0 items-center justify-center rounded-full bg-[#D2A634] text-white lg:h-[110px] lg:w-[110px]"
              style={{ boxShadow: "0px 11px 20.6px 0px rgba(210, 166, 52, 0.22)" }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
                <path
                  d="M12 7.5V12l3 1.8"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex flex-col items-end gap-[6px]">
              <span className="text-[14px] font-semibold leading-[1.56] text-right text-[#9A9AA1] lg:text-[18px]">
                ساعت کاری
              </span>
              <span className="text-[15px] font-bold leading-[1.56] text-right text-black lg:text-[18px]">
                شنبه تا پنجشنبه از ۹ الی ۲۰
              </span>
            </div>
          </div>

          <div className="hidden h-[63px] w-0 border-l border-[#F0F0F2] lg:block" />

          {/* Address */}
          <div className="flex shrink-0 items-center justify-center gap-[30px] lg:w-[354px]">
            <div className="relative flex h-[90px] w-[90px] shrink-0 items-center justify-center rounded-full bg-[#F8F8F9] lg:h-[110px] lg:w-[110px]">
              <Image src="/images/about/icon-location.svg" alt="" width={44} height={44} />
            </div>
            <div className="flex flex-col items-end gap-[6px]">
              <span className="text-[14px] font-semibold leading-[1.56] text-right text-[#9A9AA1] lg:text-[18px]">
                آدرس مجموعه
              </span>
              <span className="text-[15px] font-bold leading-[1.56] text-right text-black lg:text-[18px]">
                تهران، زعفرانیه ۲۰، پلاک ۱۳
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
