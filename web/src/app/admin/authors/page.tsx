import SearchBox from "@/components/molecules/SearchBox";
import Pagination from "@/components/molecules/Pagination";
import { ReqType } from "@/types/declarations/selectInp";
import { CountAuthor } from "@/app/actions/author/countAuthor";
import ClientDashboard from "@/components/template/clientAuthorDashboard";
import { getAuthors } from "@/app/actions/author/getAuthors";

export default async function TagDashboard({
  searchParams,
}: {
  searchParams: Promise<ReqType["main"]["author"]["gets"]["set"]>;
}) {
  const {
    limit = "20",
    page = "1",
    first_name = "",
    last_name = "",
  } = await searchParams;

  const set: ReqType["main"]["author"]["gets"]["set"] = {
    limit: +limit || 20,
    page: +page,
    first_name,
    last_name,
  };
  const get: ReqType["main"]["author"]["gets"]["get"] = {
    _id: 1,
    first_name: 1,
    last_name: 1,
  };

  const data = await getAuthors({ set, get });

  const countPageData = await CountAuthor({
    set: { first_name },
    get: { qty: 1 },
  });

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">نویسندگان</h1>
      <SearchBox title="first_name" defaultValue={first_name} />
      <ClientDashboard authors={data} />
      <Pagination countPage={countPageData?.qty} initialPage={+page} />
    </div>
  );
}
