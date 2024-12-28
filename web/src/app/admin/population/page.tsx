import { getPublications } from "@/app/actions/publication/getPublications";
import Pagination from "@/components/molecules/Pagination";
import SearchBox from "@/components/molecules/SearchBox";
import ClientPuplicationDashboard from "@/components/template/clientPuplicationDashboard";

const PopulationDashboard = async ({
  searchParams,
}: {
  searchParams: { query?: string, page?: string };
}) => {
  const searchQuery = searchParams.query || "";
  const currentPage = parseInt(searchParams.page || "1");

  const puplication = await getPublications(searchQuery, currentPage);
  const totalItems = puplication.length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">منتشر کننده</h1>
      <p className="text-gray-600">خوش آمدید!</p>
      <SearchBox />
      <ClientPuplicationDashboard puplications={puplication} searchQuery={searchQuery} />
      <Pagination totalItems={totalItems} initialPage={currentPage} />
    </div>
  );
};

export default PopulationDashboard;
