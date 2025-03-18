import { CountPublications } from "@/app/actions/publication/countPublications";
import { getPublications } from "@/app/actions/publication/getPublications";
import Pagination from "@/components/molecules/Pagination";
import SearchBox from "@/components/molecules/SearchBox";
import ClientPuplicationDashboard from "@/components/template/clientPuplicationDashboard";
import { ReqType } from "@/types/declarations/selectInp";

const PopulationDashboard = async ({
  searchParams,
}: {
  searchParams: Promise<
    ReqType["main"]["publication"]["getPublications"]["set"]
  >;
}) => {
  const { limit = "20", page = "1", title = "" } = await searchParams;

  const set: ReqType["main"]["publication"]["getPublications"]["set"] = {
    limit: +limit || 20,
    page: +page,
    title,
  };

  const get: ReqType["main"]["publication"]["getPublications"]["get"] = {
    _id: 1,
    title: 1,
  };

  const puplications = await getPublications({ get, set });
  const countPublicationData = await CountPublications({
    get: { qty: 1 },
    set: { title },
  });


  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">منتشر کننده</h1>
      <p className="text-gray-600">خوش آمدید!</p>
      <SearchBox title="title" />
      <ClientPuplicationDashboard publications={puplications} />
      <Pagination countPage={countPublicationData.qty} initialPage={+page} />
    </div>
  );
};

export default PopulationDashboard;
