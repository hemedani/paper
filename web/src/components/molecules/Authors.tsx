"use client";

import { useRouter } from "next/navigation";

export default function Authors({
  authors,
}: {
  authors: { _id: string; first_name: string; last_name: string }[];
}) {
  const router = useRouter();

  const handleQueryBack = () => {
    const query = new URLSearchParams();
    authors?.forEach((author) => query.append("authorIds", author._id));

    router.push("/?" + query.toString());
  };

  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {authors?.map((author, index) => (
        <span
          onClick={handleQueryBack}
          key={index}
          className="cursor-pointer hover:underline bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-blue-300"
        >
          {author.first_name} {author.last_name}
        </span>
      ))}
    </div>
  );
}
