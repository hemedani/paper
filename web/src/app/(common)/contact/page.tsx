import React from "react";
import Image from "next/image";

const contactItems = [
  {
    title: "تماس با مجموعه",
    value: "۰۲۱-۳۳۳۴-۵۶۷۸",
    icon: "phone",
  },
  {
    title: "ساعات پاسخگویی",
    value: "شنبه تا چهارشنبه ۹ تا ۱۷",
    icon: "clock",
  },
  {
    title: "نشانی دفتر",
    value: "تهران، خیابان ولیعصر، پلاک ۱۴۳",
    icon: "pin",
  },
];

const ContactUsPage: React.FC = () => {
  return (
    <div dir="rtl" className="w-full bg-white">
      {/* Page header */}
      <section className="mx-auto w-full max-w-[1242px] px-4 pt-12 md:px-8 lg:pt-[74px]">
        <div className="flex flex-col items-center gap-[7px]">
          <h1 className="text-center text-[28px] font-extrabold leading-[1.76] text-black lg:text-[36px]">
            تماس با ما
          </h1>
          <p className="max-w-[520px] text-center text-[14px] font-medium leading-[1.9] text-[#9A9AA1] lg:text-[17px]">
            ما مشتاق شنیدن نظرات و سوالات شما هستیم. از طریق فرم زیر یا اطلاعات تماس با ما در ارتباط
            باشید.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto w-full max-w-[1242px] px-4 py-9 md:px-8 lg:py-12">
        <form className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-6 lg:flex-row">
            {/* Name */}
            <div className="flex h-[74px] w-full items-center justify-end gap-5 rounded-[22px] border-[1.5px] border-[#F0F0F2] px-6 transition-colors focus-within:border-[#08A6AE] lg:h-[90px] lg:px-8">
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
            <div className="flex h-[74px] w-full items-center justify-end gap-5 rounded-[22px] border-[1.5px] border-[#F0F0F2] px-6 transition-colors focus-within:border-[#08A6AE] lg:h-[90px] lg:px-8">
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
          <div className="flex min-h-[160px] w-full flex-col items-end gap-3 rounded-[22px] border-[1.5px] border-[#F0F0F2] px-6 py-5 transition-colors focus-within:border-[#08A6AE] lg:min-h-[180px] lg:flex-row lg:items-start lg:gap-5 lg:px-8 lg:py-8">
            <label className="shrink-0 whitespace-nowrap text-[15px] font-semibold leading-[1.76] text-black lg:text-[16px]">
              توضیحات در صورت لزوم
            </label>
            <span className="hidden h-[22.5px] w-px bg-[#F0F0F2] lg:block" aria-hidden />
            <textarea
              name="message"
              aria-label="توضیحات"
              placeholder="اینجا وارد کنید..."
              className="min-h-[100px] w-full flex-1 resize-none bg-transparent text-right text-[15px] font-normal leading-[1.76] text-black outline-none placeholder:text-[#9A9AA1] lg:text-[16px]"
            />
          </div>

          <button
            type="submit"
            className="flex h-[56px] w-[180px] items-center justify-center gap-[9px] self-end rounded-[18px] bg-[#08A6AE] transition-colors hover:bg-[#07959c] lg:h-[64px] lg:w-[196px]"
          >
            <Image src="/images/about/icon-send.svg" alt="" width={22} height={22} />
            <span className="text-[15px] font-semibold leading-[1.76] text-white lg:text-[16px]">
              ارسال پیام
            </span>
          </button>
        </form>
      </section>

      {/* Contact info */}
      <section className="mx-auto w-full max-w-[1242px] px-4 pb-16 md:px-8 lg:pb-24">
        <div className="flex flex-col items-stretch justify-center gap-8 lg:flex-row lg:items-center lg:gap-[45px]">
          {contactItems.map((item, index) => (
            <React.Fragment key={item.title}>
              {index > 0 && (
                <div className="hidden h-[63px] w-0 border-l border-[#F0F0F2] lg:block" />
              )}
              <div className="flex shrink-0 items-center justify-center gap-[22px] lg:w-[354px] lg:gap-[30px]">
                <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full bg-[#F8F8F9] lg:h-[92px] lg:w-[92px]">
                  {item.icon === "phone" && (
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
                        stroke="#08A6AE"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {item.icon === "clock" && (
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="12" r="9" stroke="#08A6AE" strokeWidth="1.7" />
                      <path
                        d="M12 7.5V12l3 1.8"
                        stroke="#08A6AE"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  {item.icon === "pin" && (
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z"
                        stroke="#08A6AE"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="10" r="2.5" stroke="#08A6AE" strokeWidth="1.7" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col items-end gap-[6px]">
                  <span className="text-[13px] font-semibold leading-[1.56] text-right text-[#9A9AA1] lg:text-[16px]">
                    {item.title}
                  </span>
                  <span className="text-[14px] font-bold leading-[1.56] text-right text-black lg:text-[17px]">
                    {item.value}
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
