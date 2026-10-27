"use client";

import { loginAction } from "@/app/actions/login";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { formatClock, onlyDigits, toFaDigits } from "@/utils/digits";

type TProps = {
  setStep: Dispatch<SetStateAction<number>>;
  phone: string;
  remainingTime: number;
  onCodeEntered: (level: string) => void;
};

const OTP_LENGTH = 5;

const LoginStepTwo = ({ setStep, phone, remainingTime, onCodeEntered }: TProps) => {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();

  const otp = digits.join("");

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const writeDigits = (start: number, raw: string) => {
    const clean = onlyDigits(raw);
    if (!clean) return;
    setDigits((prev) => {
      const next = [...prev];
      for (let i = 0; i < clean.length && start + i < OTP_LENGTH; i += 1) {
        next[start + i] = clean[i];
      }
      return next;
    });
    const nextIndex = Math.min(start + clean.length, OTP_LENGTH - 1);
    inputsRef.current[nextIndex]?.focus();
    if (error) setError("");
  };

  const handleChange = (index: number, value: string) => {
    // Keep the newest character typed in this box (handles overwrite and paste).
    const clean = onlyDigits(value);
    if (clean.length > 1) {
      writeDigits(index, clean);
      return;
    }
    setDigits((prev) => {
      const next = [...prev];
      next[index] = clean;
      return next;
    });
    if (clean && index < OTP_LENGTH - 1) inputsRef.current[index + 1]?.focus();
    if (error) setError("");
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      e.preventDefault();
      setDigits((prev) => {
        const next = [...prev];
        next[index - 1] = "";
        return next;
      });
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) inputsRef.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) inputsRef.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const clean = onlyDigits(e.clipboardData.getData("text")).slice(0, OTP_LENGTH);
    if (!clean) return;
    e.preventDefault();
    setDigits(Array.from({ length: OTP_LENGTH }, (_, i) => clean[i] ?? ""));
    inputsRef.current[Math.min(clean.length, OTP_LENGTH - 1)]?.focus();
    if (error) setError("");
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (otp.length !== OTP_LENGTH) {
      setError("کد تایید پنج رقمی را کامل وارد کنید.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const userLoggedIn = await loginAction({
        national_number: phone,
        code: otp,
      });

      if (userLoggedIn.success) {
        // loginAction has already written the session cookies server-side.
        onCodeEntered(userLoggedIn.body.user.level);
        router.replace("/");
      } else {
        setError("کد وارد شده صحیح نیست. لطفاً کد پیامک شده را دوباره بررسی کنید.");
        setLoading(false);
      }
    } catch {
      setError("خطا در ورود. لطفاً دوباره تلاش کنید.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleOtpSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[13px] font-bold text-[#3C3C42]">
            کد ارسال شده به{" "}
            <span className="font-extrabold text-black" dir="ltr">
              {toFaDigits(phone)}
            </span>
          </p>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="shrink-0 text-[12px] font-bold text-[#08A6AE] underline-offset-4 transition-colors hover:text-[#079aa2] hover:underline"
            disabled={loading}
          >
            ویرایش
          </button>
        </div>

        <div dir="ltr" className="flex items-center justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={(e) => e.target.select()}
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              aria-label={`رقم ${toFaDigits(index + 1)} کد تایید`}
              aria-invalid={Boolean(error)}
              maxLength={1}
              disabled={loading}
              className={[
                "h-[58px] w-full min-w-0 max-w-[62px] flex-1 rounded-[16px] border-[1.5px] text-center text-[22px] font-extrabold text-black outline-none transition-all duration-200 disabled:opacity-60",
                error
                  ? "border-[#E2555B] bg-[#FEF5F5]"
                  : digit
                    ? "border-[#08A6AE]/45 bg-[#EDFEFF]/40 focus:border-[#08A6AE] focus:ring-4 focus:ring-[#08A6AE]/10"
                    : "border-[#F0F0F2] bg-white focus:border-[#08A6AE] focus:ring-4 focus:ring-[#08A6AE]/10",
              ].join(" ")}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11.5px] font-medium text-[#9A9AA1]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
            <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <span>زمان باقی‌مانده</span>
          <span className="font-extrabold tabular-nums text-[#D2A634]">{formatClock(remainingTime)}</span>
        </div>

        {error && (
          <p role="alert" className="text-center text-[12px] font-bold leading-[1.8] text-[#C2353D]">
            {error}
          </p>
        )}
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
            در حال ورود...
          </>
        ) : (
          <>
            تایید و ورود
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 12.5l4.5 4.5L19 7"
                stroke="currentColor"
                strokeWidth="2.2"
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

export default LoginStepTwo;
