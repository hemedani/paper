"use client";
import React from "react";
import Select from "react-select";
import {
  useController,
  UseControllerProps,
  FieldValues,
} from "react-hook-form";

interface SelectBoxProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  options: { value: string | number; label: string }[];
  placeholder?: string;
  className?: string;
}

const SelectBox = <T extends FieldValues>({
  label,
  options,
  placeholder = "انتخاب کنید",
  className = "",
  ...controllerProps
}: SelectBoxProps<T>) => {
  const { field, fieldState } = useController(controllerProps);

  const handleChange = (
    selectedOption: { value: string | number; label: string } | null
  ) => {
    field.onChange(selectedOption?.value || "");
  };
  

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={field.name}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <Select
        id={field.name}
        options={options}
        value={options?.find((option) => option.value === field.value) || null}
        onChange={handleChange}
        placeholder={placeholder}
        classNamePrefix="react-select"
        className={`text-sm ${
          fieldState.error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {fieldState.error && (
        <span className="text-red-500 text-xs">{fieldState.error.message}</span>
      )}
    </div>
  );
};

export default SelectBox;
