"use client";

import { loginReqAction } from "@/app/actions/loginReq";
import React, { Dispatch, SetStateAction, useState } from "react";
import { onlyDigits } from "@/utils/digits";

type TProps = {
  setStep: Dispatch<SetStateAction<number>>;
  setPhone: Dispatch<SetStateAction<string>>;
  phone: string;
};

const LoginStepOne = ({ setStep, setPhone, phone }: TProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isComplete = phone.length === 10;

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!isComplete) {
      setError("کد ملی باید ۱۰ رقم باشد.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const result = await loginReqAction({ national_number: phone });
      // The action returns the server payload only when the request failed.
      if (result) {
        setError("کد ملی یافت نشد. لطفاً کد ملی خود را بررسی کنید.");
        setLoading(false);
        return;
      }
      setStep(2);
    } catch {
      setError("ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor="national-code" className="text-[13px] font-bold text-[#3C3C42]">
          کد ملی
        </label>

        <div
          className={[
            "flex h-[58px] items-center gap-3 rounded-[18px] border-[1.5px] bg-white px-4 transition-all duration-200",
            error
              ? "border-[#E2555B] ring-4 ring-[#E2555B]/10"
              : "border-[#F0F0F2] focus-within:border-[#08A6AE] focus-within:ring-4 focus-within:ring-[#08A6AE]/10",
          ].join(" ")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className={error ? "shrink-0 text-[#E2555B]" : "shrink-0 text-[#9A9AA1]"}
          >
            <rect x="2.5" y="5" width="19" height="14" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="8.5" cy="11" r="2.1" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M5.6 16.2c.5-1.5 1.6-2.2 2.9-2.2s2.4.7 2.9 2.2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path d="M14.5 10.5h4M14.5 14h2.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>

          <span className="h-6 w-px shrink-0 bg-[#F0F0F2]" aria-hidden />

          <input
            type="text"
            id="national-code"
            name="national-code"
            value={phone}
            onChange={(e) => {
              setPhone(onlyDigits(e.target.value).slice(0, 10));
              if (error) setError("");
            }}
            placeholder="مثلاً ۰۰۱۲۳۴۵۶۷۸"
            inputMode="numeric"
            autoComplete="off"
            maxLength={10}
            dir="ltr"
            aria-invalid={Boolean(error)}
            aria-describedby="national-code-hint"
            disabled={loading}
            className="h-full min-w-0 flex-1 bg-transparent text-right text-[15px] font-bold tracking-[0.14em] text-black outline-none placeholder:text-[13px] placeholder:font-medium placeholder:tracking-normal placeholder:text-[#C4C4CA] disabled:opacity-60"
          />

          <span
            className={[
              "shrink-0 text-[11px] font-bold tabular-nums",
              isComplete ? "text-[#08A6AE]" : "text-[#C4C4CA]",
            ].join(" ")}
            aria-hidden
          >
            {phone.length}/۱۰
          </span>
        </div>

        <p
          id="national-code-hint"
          className={[
            "text-[11.5px] font-medium leading-[1.8]",
            error ? "text-[#C2353D]" : "text-[#9A9AA1]",
          ].join(" ")}
          role={error ? "alert" : undefined}
        >
          {error || "کد ملی ده‌رقمی خود را بدون خط تیره وارد کنید."}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group flex h-[58px] w-full items-center justify-center gap-2 rounded-[18px] bg-[#08A6AE] text-[15px] font-bold text-white shadow-[0px_18px_34px_-20px_rgba(8,166,174,0.9)] transition-all duration-200 hover:bg-[#079aa2] disabled:cursor-wait disabled:bg-[#E9F6F7] disabled:text-[#7FBDC1] disabled:shadow-none"
      >
        {loading ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              aria-hidden
            />
            در حال ارسال کد...
          </>
        ) : (
          <>
            دریافت کد تایید
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              className="transition-transform duration-200 group-hover:-translate-x-1 group-disabled:translate-x-0"
            >
              <path
                d="M19 12H5M11 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )}
      </button>
    </form>
  );
};

export default LoginStepOne;
