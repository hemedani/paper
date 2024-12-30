// "use client"
// import { useState } from 'react';

// export const AdvancedSearch = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleSearch = () => {
//       setIsOpen(!isOpen);
//     };
  
//     return (
//       <div className="relative w-full max-w-md mx-auto">
//         <button
//           onClick={toggleSearch}
//           className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//         >
//           {isOpen ? "بستن پنجره" : "باز کردن پنجره"}
//         </button>
//         <div
//           className={`transition-[max-height] overflow-hidden duration-[2000ms] ease-in-out bg-gray-100 rounded mt-2 shadow-lg ${
//             isOpen ? "max-h-[500px] p-4" : "max-h-0"
//           }`}
//         >
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
//           />
//           <div className="flex justify-between mt-4">
//             <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
//               Search
//             </button>
//             <button
//               onClick={toggleSearch}
//               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     );
// };
"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "../atoms/Input";

type SearchCriteria = {
  title: string;
  abstract: string;
};

const AdvancedSearch: React.FC = () => {
  const { control, handleSubmit } = useForm<SearchCriteria>({
    defaultValues: {
      title: "",
      abstract: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<SearchCriteria> = (criteria) => {
    const queryString = Object.entries(criteria)
      .filter(([_, value]) => value.trim() !== "")
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");

    router.push(`/?${queryString}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 border border-gray-200 rounded-lg shadow-md bg-white space-y-6"
    >
      <h3 className="text-2xl text-center font-bold text-gray-800">جستجوی پیشرفته</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Input
          label="عنوان"
          name="title"
          placeholder="عنوان مقاله"
          control={control}
          className="w-full"
        />
        <Input
          label="چکیده"
          name="abstract"
          placeholder="چکیده مقاله"
          control={control}
          className="w-full"
        />
        <button
          type="submit"
          className="px-6 h-10 mt-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-semibold rounded-md shadow hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
        >
          جستجو
        </button>
      </div>
    </form>
  );
};

export default AdvancedSearch;
