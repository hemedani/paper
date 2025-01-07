import { getTags } from "@/app/actions/tag/getTags";
import ClientTagDashboard from "@/components/template/clientTagDashboard";
import SearchBox from "@/components/molecules/SearchBox";
import Pagination from "@/components/molecules/Pagination";
import { CountTags } from "@/app/actions/tag/countTags";

export default async function TagDashboard({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const searchQuery = (await searchParams).query || "";
  const currentPage = parseInt((await searchParams).page || "1");

  const data = await getTags(searchQuery, currentPage);
  const countPageData = await CountTags(searchQuery);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">برچسب‌ها</h1>

      <SearchBox defaultValue={searchQuery} />
      <ClientTagDashboard tags={data} />
      <Pagination
        countPage={countPageData.qty}
        initialPage={currentPage}
      />
    </div>
  );
}
