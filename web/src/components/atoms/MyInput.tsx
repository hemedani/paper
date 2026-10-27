"use client";
import React from "react";
import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  label: string;
  register: UseFormRegister<T>;
  className?: string;
  errMsg?: string;
  type?: string;
  placeholder?: string;
  hint?: string;
  rows?: number;
}

const controlBase =
  "w-full rounded-[14px] border-[1.5px] bg-white px-4 text-[13.5px] font-medium text-black outline-none transition-all placeholder:text-[#C4C4CA]";

const MyInput = <T extends FieldValues = FieldValues>({
  className,
  errMsg,
  name,
  type,
  label,
  placeholder,
  hint,
  rows = 5,
  register,
}: InputProps<T>) => {
  const state = errMsg
    ? "border-[#E2555B] bg-[#FEF5F5] focus:border-[#E2555B] focus:ring-4 focus:ring-[#E2555B]/10"
    : "border-[#F0F0F2] focus:border-[#08A6AE] focus:ring-4 focus:ring-[#08A6AE]/10";

  return (
    <div className={`flex w-full flex-col gap-1.5 ${className ?? ""}`}>
      <label
        htmlFor={name}
        className="flex items-center gap-1 text-[12.5px] font-bold text-[#5C5C63]"
      >
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          rows={rows}
          {...register(name)}
          placeholder={placeholder ?? label}
          className={`${controlBase} ${state} resize-y py-3 leading-[1.9]`}
        />
      ) : (
        <input
          {...register(name)}
          id={name}
          name={name}
          type={type ?? "text"}
          placeholder={placeholder ?? label}
          className={`${controlBase} ${state} h-11`}
        />
      )}

      {errMsg ? (
        <span className="flex items-center gap-1 text-[11.5px] font-semibold text-[#C2353D]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 7.5v5.5M12 16.2v.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          {errMsg}
        </span>
      ) : (
        hint && <span className="text-[11.5px] font-medium text-[#9A9AA1]">{hint}</span>
      )}
    </div>
  );
};

export default MyInput;
