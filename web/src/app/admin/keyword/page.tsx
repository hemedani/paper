import ClientKeywordDashboard from "@/components/template/clientKeywordDashboard";
import SearchBox from "@/components/molecules/SearchBox";
import Pagination from "@/components/molecules/Pagination";
import { CountTags } from "@/app/actions/tag/countTags";
import { ReqType } from "@/types/declarations/selectInp";
import { getKeywords } from "@/app/actions/keyword/getKeywords";

export default async function TagDashboard({
  searchParams,
}: {
  searchParams: Promise<ReqType["main"]["tag"]["getTags"]["set"]>;
}) {
  const { limit = "20", page = "1", name = "" } = await searchParams;

  const set: ReqType["main"]["tag"]["getTags"]["set"] = {
    limit: +limit || 20,
    page: +page,
    name,
  };
  const get: ReqType["main"]["tag"]["getTags"]["get"] = {
    _id: 1,
    name: 1,
  };

  const data = await getKeywords({ set, get });
  const countPageData = await CountTags({
    set: { name: set.name },
    get: { qty: 1 },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">کلمات کلیدی</h1>
      <SearchBox title="name" defaultValue={name} />
      <ClientKeywordDashboard keywords={data} />
      <Pagination countPage={countPageData?.qty} initialPage={+page} />
    </div>
  );
}
