import { CountPublications } from "@/app/actions/publication/countPublications";
import { getPublications } from "@/app/actions/publication/getPublications";
import Pagination from "@/components/molecules/Pagination";
import SearchBox from "@/components/molecules/SearchBox";
import ClientPuplicationDashboard from "@/components/template/clientPuplicationDashboard";

const PopulationDashboard = async ({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) => {
  const searchQuery = (await searchParams).query || "";
  const currentPage = parseInt((await searchParams).page || "1");

  const puplication = await getPublications(searchQuery, currentPage);
  const countPublicationData = await CountPublications(searchQuery);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">منتشر کننده</h1>
      <p className="text-gray-600">خوش آمدید!</p>
      <SearchBox />
      <ClientPuplicationDashboard
        puplications={puplication}
        searchQuery={searchQuery}
      />
      <Pagination
        countPage={countPublicationData.qty}
        initialPage={currentPage}
      />
    </div>
  );
};

export default PopulationDashboard;
