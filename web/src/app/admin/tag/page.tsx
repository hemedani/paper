import { getTags } from "@/app/actions/tag/getTags";
import ClientTagDashboard from "@/components/template/clientTagDashboard";
import SearchBox from "@/components/molecules/SearchBox";
import Pagination from "@/components/molecules/Pagination";

export default async function TagDashboard({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const searchQuery = searchParams.query || "";
  const currentPage = parseInt(searchParams.page || "1");

  const data = await getTags(searchQuery, currentPage);
  const totalItems = data.length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">برچسب‌ها</h1>
      <p className="text-gray-600">خوش آمدید!</p>

      {/* جستجو */}
      <SearchBox defaultValue={searchQuery} />

      {/* نمایش داده‌ها */}
      <ClientTagDashboard tags={data} searchQuery={searchQuery} />

      {/* کامپوننت Pagination */}
      <Pagination totalItems={totalItems} initialPage={currentPage} />
    </div>
  );
}
