"use client";
import { articleSchema } from "@/types/declarations/selectInp";
import { useRouter } from "next/navigation";
import { HashtagIcon } from "@/components/atoms/Icons";

export default function Tags({ tags }: { tags: articleSchema["tags"] }) {
  const router = useRouter();
  const handleQueryBack = (name: string) => {
    const query = new URLSearchParams();
    query.append("tags", name);
    router.push("/?" + query.toString());
  };

  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {tags?.map((tag) => (
        <span
          onClick={() => handleQueryBack(tag.name)}
          key={tag?.name}
          className="cursor-pointer inline-flex items-center gap-1.5 hover:underline bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-blue-300"
        >
          <HashtagIcon className="h-4 w-4 shrink-0" />
          {tag?.name}
        </span>
      ))}
    </div>
  );
}
