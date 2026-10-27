"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import LoginStepOne from "@/components/organisms/login/LoginStepOne";
import LoginStepTwo from "@/components/organisms/login/LoginStepTwo";
import { SiteHeader } from "@/components/organisms/SiteHeader";
import { useAuth } from "@/context/AuthContext";
import { useAutoReturnTimer } from "@/hook/useAutoReturnTimer";
import { toFaDigits } from "@/utils/digits";

const STEPS = [
  { id: 1, label: "کد ملی" },
  { id: 2, label: "کد تایید" },
];

const FEATURES = [
  "دسترسی به بیش از ۷۰۰ مقاله تخصصی",
  "جستجوی پیشرفته و نمودار ارتباط مقالات",
  "ذخیره و بازیابی مقالات مورد علاقه",
];

const Stepper = ({ step }: { step: number }) => (
  <ol className="mb-8 flex w-full max-w-[340px] items-center gap-3" aria-label="مراحل ورود">
    {STEPS.map((item, index) => {
      const done = step > item.id;
      const active = step === item.id;
      return (
        <li key={item.id} className={index === 0 ? "flex flex-1 items-center gap-3" : "flex items-center gap-3"}>
          <span
            className={[
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold transition-colors",
              active
                ? "bg-[#08A6AE] text-white shadow-[0_8px_18px_-8px_rgba(8,166,174,0.9)]"
                : done
                  ? "bg-[#EDFEFF] text-[#08A6AE]"
                  : "bg-[#F8F8F9] text-[#9A9AA1]",
            ].join(" ")}
            aria-current={active ? "step" : undefined}
          >
            {done ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12.5l4.5 4.5L19 7"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              toFaDigits(item.id)
            )}
          </span>

          <span
            className={[
              "whitespace-nowrap text-[12.5px] font-bold transition-colors",
              active || done ? "text-black" : "text-[#9A9AA1]",
            ].join(" ")}
          >
            {item.label}
          </span>

          {index === 0 && (
            <span className="mx-1 h-px flex-1 rounded-full bg-[#F0F0F2]" aria-hidden />
          )}
        </li>
      );
    })}
  </ol>
);

const Login = () => {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(1);
  const [sessionExpired, setSessionExpired] = useState(false);
  const { login, setInitialAuthState } = useAuth();

  const { clearAutoReturnTimer, remainingTime } = useAutoReturnTimer(step, setStep);

  // The admin guard sends us here with ?expired=1 when the stored token is no
  // longer accepted. Reset the client state so the header stops advertising a
  // session that no longer exists, then explain what happened. The stale cookie
  // itself is replaced by loginAction (server-side) on the next successful
  // login; document.cookie cannot touch an HttpOnly cookie.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("expired") !== "1") return;

    setInitialAuthState(false, null);
    setSessionExpired(true);
    window.history.replaceState(null, "", "/login");
  }, [setInitialAuthState]);

  const handleCodeEntered = (level: string) => {
    clearAutoReturnTimer();
    setSessionExpired(false);

    // Convert level to our UserLevel type
    const userLevel = level as "Ghost" | "Manager" | "Editor" | "Normal" | null;

    // Call login from auth context
    login(userLevel);
  };

  return (
    <div dir="rtl" className="relative flex min-h-screen flex-col overflow-hidden bg-[#F8F8F9]">
      {/* Ambient brand glows behind the card */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-40 h-[460px] w-[460px] rounded-full bg-[#08A6AE]/[0.12] blur-[110px]" />
        <div className="absolute -bottom-48 -left-32 h-[460px] w-[460px] rounded-full bg-[#D2A634]/[0.12] blur-[110px]" />
      </div>

      <SiteHeader />

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-6 sm:px-6 lg:py-12">
        <div className="w-full max-w-[560px] overflow-hidden rounded-[28px] border border-[#F0F0F2] bg-white shadow-[0px_60px_110px_-70px_rgba(9,44,47,0.55)] lg:max-w-[1080px] lg:rounded-[32px]">
          <div className="grid lg:grid-cols-2">
            {/* ── Brand panel (right in RTL) ─────────────────────────── */}
            <aside
              className="relative isolate overflow-hidden px-6 pb-7 pt-6 sm:px-9 lg:px-11 lg:pb-11 lg:pt-10"
              style={{
                backgroundImage: "linear-gradient(to bottom left, #3DB4BA 0%, #00B5BE 100%)",
              }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
                <Image
                  src="/images/hero/hero-pattern.svg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 540px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Decorative geometry */}
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -left-24 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full border border-white/15" />
                <div className="absolute -left-10 top-1/2 h-[180px] w-[180px] -translate-y-1/2 rounded-full border border-white/10" />
                <div className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-[#D2A634]/30 blur-[70px]" />
              </div>

              <div className="relative flex h-full flex-col items-center text-center lg:items-start lg:text-right">
                <Link
                  href="/"
                  aria-label="پایگاه دانش"
                  className="hidden w-fit items-center lg:flex"
                >
                  <Image
                    src="/images/hero/logo.svg"
                    alt="پایگاه دانش"
                    width={161}
                    height={51}
                    priority
                    className="h-[36px] w-auto lg:h-[42px]"
                  />
                </Link>

                <div className="mt-6 lg:mt-12">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold text-white ring-1 ring-inset ring-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F4D68B]" aria-hidden />
                    ورود اعضا
                  </span>

                  <h2 className="mt-4 text-[24px] font-extrabold leading-[1.55] text-white sm:text-[28px] lg:text-[32px] lg:leading-[1.5]">
                    به پایگاه دانش
                    <br />
                    خوش آمدید
                  </h2>

                  <p className="mt-3 max-w-[330px] text-[12.5px] font-medium leading-[1.95] text-white/80 lg:text-[14px]">
                    با ورود به حساب کاربری، به بانک جامع مقالات معماری و شهرسازی ایرانی اسلامی دسترسی
                    پیدا می‌کنید.
                  </p>
                </div>

                <ul className="mt-8 hidden flex-col gap-4 lg:flex">
                  {FEATURES.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-inset ring-white/15">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path
                            d="M5 12.5l4.5 4.5L19 7"
                            stroke="#fff"
                            strokeWidth="2.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-[13.5px] font-semibold leading-[1.7] text-white/95">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto hidden w-full items-center gap-3 border-t border-white/20 pt-5 lg:flex">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M4 13v-1a8 8 0 1116 0v1"
                        stroke="#fff"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                      <rect
                        x="2.6"
                        y="13"
                        width="4.2"
                        height="6.6"
                        rx="2.1"
                        stroke="#fff"
                        strokeWidth="1.7"
                      />
                      <rect
                        x="17.2"
                        y="13"
                        width="4.2"
                        height="6.6"
                        rx="2.1"
                        stroke="#fff"
                        strokeWidth="1.7"
                      />
                    </svg>
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-medium text-white/70">پشتیبانی</span>
                    <span
                      dir="ltr"
                      className="w-full text-right text-[13.5px] font-extrabold tracking-wide text-white"
                    >
                      ۰۲۱ ۵۴۰۳ ۸۹۷
                    </span>
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Form panel (left in RTL) ───────────────────────────── */}
            <section className="flex flex-col justify-center px-5 py-7 sm:px-9 lg:px-11 lg:py-12">
              <Stepper step={step} />

              <h1 className="text-[21px] font-extrabold leading-[1.6] text-black sm:text-[23px] lg:text-[25px]">
                {step === 1 ? "ورود به حساب کاربری" : "کد تایید را وارد کنید"}
              </h1>
              <p className="mb-7 mt-2 text-[12.5px] font-medium leading-[1.9] text-[#9A9AA1] sm:text-[13.5px]">
                {step === 1
                  ? "برای ورود یا ساخت حساب، کد ملی خود را وارد کنید. کد تایید برای شما پیامک می‌شود."
                  : "کد پنج رقمی پیامک شده را در کادر زیر وارد کنید."}
              </p>

              {sessionExpired && (
                <div
                  role="status"
                  className="mb-6 flex items-start gap-2.5 rounded-[16px] border border-[#F3E3BE] bg-[#FAF6EB] px-3.5 py-3 text-[12px] font-semibold leading-[1.85] text-[#8A6A1C]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="mt-0.5 shrink-0"
                  >
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <span>
                    نشست شما منقضی شده است. لطفاً دوباره وارد شوید.
                  </span>
                </div>
              )}

              {step === 1 ? (
                <LoginStepOne setStep={setStep} setPhone={setPhone} phone={phone} />
              ) : (
                <LoginStepTwo
                  setStep={setStep}
                  phone={phone}
                  remainingTime={remainingTime}
                  onCodeEntered={handleCodeEntered}
                />
              )}

              <p className="mt-7 text-center text-[12px] font-medium leading-[1.9] text-[#9A9AA1]">
                با ورود،{" "}
                <Link href="/terms" className="font-bold text-[#5C5C63] underline-offset-4 hover:text-[#08A6AE] hover:underline">
                  شرایط و قوانین
                </Link>{" "}
                و{" "}
                <Link href="/privacy" className="font-bold text-[#5C5C63] underline-offset-4 hover:text-[#08A6AE] hover:underline">
                  حریم خصوصی
                </Link>{" "}
                را می‌پذیرید.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
