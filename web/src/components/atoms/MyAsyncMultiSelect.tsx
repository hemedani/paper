"use client";
import { ReactSelectOption } from "@/types/option";
import dynamic from "next/dynamic";
import React from "react";
import { FieldPath, FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import { GroupBase, OptionsOrGroups, PropsValue } from "react-select";

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

interface InputProps<Option, Group extends GroupBase<Option>, T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  label: string;
  setValue: UseFormSetValue<T>;
  labelAsValue?: boolean;
  errMsg?: string;
  placeholder?: string;
  loadOptions?: (inputValue: string, callback: (options: OptionsOrGroups<Option, Group>) => void) => Promise<OptionsOrGroups<Option, Group>> | void;
  defaultOptions?: OptionsOrGroups<Option, Group> | boolean;
  defaultValue?: PropsValue<Option>;
  className?: string;
}

const MyAsyncMultiSelect = <Option, Group extends GroupBase<Option>, T extends FieldValues = FieldValues>({
  errMsg,
  name,
  label,
  loadOptions,
  setValue,
  labelAsValue,
  defaultOptions,
  defaultValue,
  className,
}: InputProps<Option, Group, T>) => {
  return (
    <div className={`flex w-full flex-col gap-1.5 ${className ?? ""}`}>
      <label htmlFor={name} className="text-[12.5px] font-bold text-[#5C5C63]">
        {label}
      </label>

      <div
        className={[
          "pd-select flex min-h-11 w-full items-center rounded-[14px] border-[1.5px] bg-white px-3 py-1.5 transition-all",
          errMsg
            ? "border-[#E2555B] bg-[#FEF5F5]"
            : "border-[#F0F0F2] focus-within:border-[#08A6AE] focus-within:ring-4 focus-within:ring-[#08A6AE]/10",
        ].join(" ")}
      >
        <AsyncSelect
          isMulti
          cacheOptions
          instanceId={`multiselect-${String(name)}`}
          defaultValue={defaultValue}
          loadOptions={loadOptions}
          defaultOptions={defaultOptions}
          onChange={(newVal) =>
            setValue(
              name,
              (newVal as ReactSelectOption[]).map((val) =>
                labelAsValue ? val.label : val.value
              ) as unknown as PathValue<T, Path<T>>,
              { shouldValidate: true }
            )
          }
          name={name}
          placeholder={`${label} را انتخاب کنید`}
          classNamePrefix="react-select"
          className="w-full"
        />
      </div>

      {errMsg && (
        <span className="flex items-center gap-1 text-[11.5px] font-semibold text-[#C2353D]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 7.5v5.5M12 16.2v.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          {errMsg}
        </span>
      )}
    </div>
  );
};

export default MyAsyncMultiSelect;
