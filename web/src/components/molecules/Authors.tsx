"use client";
import { articleSchema } from "@/types/declarations/selectInp";
import { useRouter } from "next/navigation";

export default function Authors({
  authors,
}: {
  authors: articleSchema["authors"];
}) {
  const router = useRouter();

  const handleQueryBack = (id: string) => {
    const query = new URLSearchParams();
    query.append("authorIds", id);

    router.push("/?" + query.toString());
  };

  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {authors?.map((author, index) => (
        <span
          onClick={() => handleQueryBack(author._id!)}
          key={index}
          className="cursor-pointer hover:underline bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-blue-300"
        >
          {author.first_name} {author.last_name}
        </span>
      ))}
    </div>
  );
}
