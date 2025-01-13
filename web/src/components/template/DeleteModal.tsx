import React, { FC } from "react";

interface IProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  isVisible: boolean;
  isHardCascade: boolean; // state از والد دریافت می‌شود
  onHardCascadeChange: (value: boolean) => void; // تغییر مقدار state
}

export const DeleteModal: FC<IProps> = ({
  onConfirm,
  onCancel,
  message,
  isVisible,
  isHardCascade,
  onHardCascadeChange,
}) => {
  const handleCheckboxChange = () => {
    onHardCascadeChange(!isHardCascade); // تغییر مقدار state
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-lg max-w-sm w-full p-6 text-center transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-90"
        }`}
      >
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex items-center justify-start gap-2 mb-4">
          <input
            type="checkbox"
            id="hardCascade"
            checked={isHardCascade}
            onChange={handleCheckboxChange}
            className="w-5 h-5 cursor-pointer"
          />
          <label
            htmlFor="hardCascade"
            className="text-sm text-gray-800 cursor-pointer"
          >
            حذف کامل
          </label>
        </div>

        {isHardCascade && (
          <p className="text-sm text-red-500 mb-6">
            هشدار: اگر این گزینه فعال شود، تمامی موارد مرتبط حذف خواهند شد.
            مسئولیت این عملیات با شماست.
          </p>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            بله
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            خیر
          </button>
        </div>
      </div>
    </div>
  );
};
