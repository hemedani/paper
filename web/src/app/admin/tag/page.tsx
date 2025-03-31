import { getTags } from "@/app/actions/tag/getTags";
import ClientTagDashboard from "@/components/template/clientTagDashboard";
import SearchBox from "@/components/molecules/SearchBox";
import Pagination from "@/components/molecules/Pagination";
import { CountTags } from "@/app/actions/tag/countTags";
import { ReqType } from "@/types/declarations/selectInp";

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

  const data = await getTags({ set, get });
  const countPageData = await CountTags({
    set: { name: set.name },
    get: { qty: 1 },
  });

  return (
    <div className="relative min-h-full">
      <div className="flex items-start">
        <div className="bg-blue-500 w-1 h-8 ml-3 rounded-full"></div>
        <div>
          <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
            برچسب‌های مقالات
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            مدیریت تمامی برچسب‌های مقالات وب‌سایت
          </p>
        </div>
      </div>
      <SearchBox title="name" defaultValue={name} />
      <ClientTagDashboard data={data} model="tag" />
      <Pagination countPage={countPageData?.qty} initialPage={+page} />
    </div>
  );
}
