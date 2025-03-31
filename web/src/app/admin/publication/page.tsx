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
    <div className="relative min-h-full">
      <div className="flex items-start">
        <div className="bg-blue-500 w-1 h-8 ml-3 rounded-full"></div>
        <div>
          <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
            ناشران مقالات
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            مدیریت تمامی ناشران مقالات وب‌سایت
          </p>
        </div>
      </div>
      <SearchBox title="title" />
      <ClientPuplicationDashboard publications={puplications} />
      <Pagination countPage={countPublicationData.qty} initialPage={+page} />
    </div>
  );
};

export default PopulationDashboard;
