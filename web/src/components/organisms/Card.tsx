"use client";

import Link from "next/link";

export const Card = ({
  title,
  abstract,
  authors,
  id,
}: {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
}) => {
  return (
    <div className="max-w-sm mt-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 hover:border-indigo-500">
      {/* Header Section */}
      <div className="flex items-center p-5 border-b border-gray-200">
        <div className="w-16 h-16 border-4 border-indigo-600 rounded-full overflow-hidden flex-shrink-0">
          <img
            src="/assets/images/Untitled2.png" // Add your profile image source here
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="ml-4">
          <p className="text-xl font-semibold text-gray-900">{title}</p>
          <p className="text-sm text-gray-600">{authors.join(" | ")}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <p className="text-gray-700 text-sm leading-relaxed text-justify">
          {abstract}
        </p>
      </div>

      {/* Link Button */}
      <div className="p-4 text-center">
        <Link
          className="inline-block text-indigo-600 font-semibold hover:text-indigo-800 hover:underline"
          href={`/article/${id}`}
        >
          مشاهده مقاله
        </Link>
      </div>
    </div>
  );
};
