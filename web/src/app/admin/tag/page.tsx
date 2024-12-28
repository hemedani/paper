import React from "react";
import ClientTagDashboard from "@/components/template/clientTagDashboard";
import { getTags } from "@/app/actions/tag/getTags";
import SearchBox from "@/components/molecules/SearchBox";


export default async function TagDashboard({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const searchQuery = searchParams.query || "";
  const tags = await getTags(searchQuery);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">برچسب‌ها</h1>
      <p className="text-gray-600">خوش آمدید!</p>
      <SearchBox defaultValue={searchQuery} />
      <ClientTagDashboard tags={tags} searchQuery={searchQuery} />
    </div>
  );
}
