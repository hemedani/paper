import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface ExampleDatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export const ExampleDatePicker: React.FC<ExampleDatePickerProps> = ({
  value,
  onChange,
}) => {
  const handleChange = (date: DateObject | null) => {
    if (date) {
      onChange(date.toDate()); // تبدیل DateObject به Date
    }
  };

  return (
    <DatePicker
      value={value}
      onChange={handleChange}
      plugins={[weekends()]}
      calendar={persian}
      locale={persian_fa}
      inputClass="w-full border border-gray-300 rounded p-2 mt-5"
    />
  );
};
