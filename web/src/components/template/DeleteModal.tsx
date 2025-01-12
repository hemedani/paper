import React, { FC } from "react";

interface IProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  isVisible: boolean;
}

export const DeleteModal: FC<IProps> = ({
  onConfirm,
  onCancel,
  message,
  isVisible,
}) => {
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
