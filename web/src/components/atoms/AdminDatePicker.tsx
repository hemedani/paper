"use client";

import { DatePicker } from "zaman";

/**
 * Jalali date field matching the admin form inputs.
 *
 * Zaman styles its own `<input>` through `inputClass` (the `className` prop only
 * reaches an internal wrapper), so the shared `.pd-datepicker` class has to be
 * applied there — otherwise the control renders as an unstyled, invisible field.
 */
export const AdminDatePicker = ({
  onChange,
  placeholder = "انتخاب تاریخ",
  invalid,
  defaultValue,
}: {
  onChange: (value: Date) => void;
  placeholder?: string;
  invalid?: boolean;
  defaultValue?: Date;
}) => (
  <div className="w-full [&>div]:w-full">
    <DatePicker
      locale="fa"
      direction="rtl"
      accentColor="#08A6AE"
      round="x1"
      inputClass={`pd-datepicker ${invalid ? "pd-datepicker-invalid" : ""}`}
      inputAttributes={{ placeholder, "aria-invalid": invalid ? "true" : undefined }}
      onChange={(event) => onChange(event.value)}
      defaultValue={defaultValue}
    />
  </div>
);

export default AdminDatePicker;
