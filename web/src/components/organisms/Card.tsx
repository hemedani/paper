"use client";

export const Card = ({
  title,
  abstract,
  authors,
}: {
  title: string;
  abstract: string;
  authors: string[];
}) => {
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-300 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Header Section */}
      <div className="flex items-center p-4 border-b gap-5">
        <div className="w-12 h-12 border rounded-full overflow-hidden flex-shrink-0">
          <img
            src="/assets/images/Untitled2.png" // Add your profile image source here
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="ml-4">
          <p className="text-lg font-semibold text-gray-800">{title}</p>
          <p className="text-sm text-gray-500">{authors.join(" | ")}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <p className="text-gray-700 text-sm leading-relaxed text-justify">
          {abstract}
        </p>
      </div>
    </div>
  );
};
