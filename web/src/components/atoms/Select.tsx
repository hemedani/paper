"use client";
import React from "react";
import Select, { GroupBase, OptionsOrGroups, PropsValue } from "react-select";
import {
  FieldValues,
  FieldPath,
  UseFormSetValue,
  PathValue,
  Path,
} from "react-hook-form";
import { ReactSelectOption } from "@/types/option";

interface SelectBoxProps<Option, Group extends GroupBase<Option>, T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  label: string;
  setValue: UseFormSetValue<T>;
  options: ReactSelectOption[];
  placeholder?: string;
  labelAsValue?: boolean;
  className?: string;
  errMsg?: string
  defaultValue?: PropsValue<ReactSelectOption>;
  defaultOptions?: OptionsOrGroups<Option, Group> | boolean;
}

const SelectBox = <Option, Group extends GroupBase<Option>, T extends FieldValues = FieldValues>({
  name,
  setValue,
  label,
  options,
  errMsg,
  placeholder = "انتخاب کنید",
  className = "",
  labelAsValue,
  defaultValue
}: SelectBoxProps<Option, Group, T>) => {

  return (
    <div className={`flex w-full flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-[12.5px] font-bold text-[#5C5C63]">
          {label}
        </label>
      )}

      <div
        className={[
          "pd-select flex min-h-11 w-full items-center rounded-[14px] border-[1.5px] bg-white px-3 py-1.5 transition-all",
          errMsg
            ? "border-[#E2555B] bg-[#FEF5F5]"
            : "border-[#F0F0F2] focus-within:border-[#08A6AE] focus-within:ring-4 focus-within:ring-[#08A6AE]/10",
        ].join(" ")}
      >
        <Select
          inputId={name}
          instanceId={`select-${String(name)}`}
          options={options}
          onChange={(newVal) =>
            setValue(
              name,
              (labelAsValue ? newVal!.label : newVal!.value) as unknown as PathValue<T, Path<T>>
            )
          }
          placeholder={placeholder}
          classNamePrefix="react-select"
          className="w-full"
          defaultValue={defaultValue}
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

export default SelectBox;
