"use client";

import React from "react";
import { useController, UseControllerProps, FieldValues } from "react-hook-form";

interface InputProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  /** "bare" removes the built-in chrome so a parent can draw the field shell. */
  variant?: "default" | "bare";
}

const Input = <T extends FieldValues>({
  label,
  placeholder,
  type = "text",
  className = "",
  variant = "default",
  ...controllerProps
}: InputProps<T>) => {
  const { field, fieldState } = useController(controllerProps);

  const inputClass =
    variant === "bare"
      ? "w-full border-0 bg-transparent p-0 text-[15px] font-medium text-black outline-none placeholder:text-[#9A9AA1] focus:outline-none focus:ring-0 md:text-[16px]"
      : `text-gray-600 border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 ${
          fieldState.error ? "border-red-500" : "border-gray-300"
        }`;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={field.name}
        {...field}
        type={type}
        placeholder={placeholder}
        className={inputClass}
      />
      {fieldState.error && (
        <span className="text-red-500 text-xs">{fieldState.error.message}</span>
      )}
    </div>
  );
};

export default Input;
