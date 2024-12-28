import { getPublications } from "@/app/actions/publication/getPublications";
import SearchBox from "@/components/molecules/SearchBox";
import ClientPuplicationDashboard from "@/components/template/clientPuplicationDashboard";

const PopulationDashboard = async ({
  searchParams,
}: {
  searchParams: { query?: string };
}) => {
  const searchQuery = searchParams.query || "";
  const puplication = await getPublications(searchQuery);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">منتشر کننده</h1>
      <p className="text-gray-600">خوش آمدید!</p>
      <SearchBox />
      <ClientPuplicationDashboard puplications={puplication} searchQuery={searchQuery} />
    </div>
  );
};

export default PopulationDashboard;
