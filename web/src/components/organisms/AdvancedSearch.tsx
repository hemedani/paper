"use client"
import { useState } from 'react';

export const AdvancedSearch = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSearch = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="relative w-full max-w-md mx-auto">
        <button
          onClick={toggleSearch}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {isOpen ? "بستن پنجره" : "باز کردن پنجره"}
        </button>
        <div
          className={`transition-[max-height] overflow-hidden duration-[2000ms] ease-in-out bg-gray-100 rounded mt-2 shadow-lg ${
            isOpen ? "max-h-[500px] p-4" : "max-h-0"
          }`}
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Search
            </button>
            <button
              onClick={toggleSearch}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
};
