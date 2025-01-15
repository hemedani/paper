"use client";

import { useRouter } from "next/navigation";

export default function Tags({ tags }: { tags: { name: string }[] }) {
  const router = useRouter();
  const handleQueryBack = () => {
    const query = new URLSearchParams();
    tags?.forEach((tag) => query.append("tags", tag.name));
    router.push("/?" + query.toString());
  };

  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {tags?.map((tag) => (
        <span
          onClick={handleQueryBack}
          key={tag?.name}
          className="cursor-pointer hover:underline bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-blue-300"
        >
          {tag?.name}
        </span>
      ))}
    </div>
  );
}
