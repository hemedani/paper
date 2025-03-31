import ClientTagDashboard from "@/components/template/clientTagDashboard";
import SearchBox from "@/components/molecules/SearchBox";
import Pagination from "@/components/molecules/Pagination";
import { ReqType } from "@/types/declarations/selectInp";
import { gets } from "@/app/actions/category/gets";
import { count } from "@/app/actions/category/count";

export default async function TagDashboard({
  searchParams,
}: {
  searchParams: Promise<ReqType["main"]["category"]["gets"]["set"]>;
}) {
  const { limit = "20", page = "1", name } = await searchParams;

  const set: ReqType["main"]["category"]["gets"]["set"] = {
    limit: +limit || 20,
    page: +page,
    name,
  };
  const get: ReqType["main"]["category"]["gets"]["get"] = {
    _id: 1,
    name: 1,
  };

  const data = await gets({ set, get });
  const counted = await count({
    set: set.name ? { name: set.name } : {},
    get: { qty: 1 },
  });

  return (
    <div className="relative min-h-full">
      <div className="flex items-start">
        <div className="bg-blue-500 w-1 h-8 ml-3 rounded-full"></div>
        <div>
          <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
            دسته بندی ها (وبلاگ)
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            مدیریت تمامی دسته بندی ها (وبلاگ) وب‌سایت
          </p>
        </div>
      </div>
      <SearchBox title="name" defaultValue={name} />
      <ClientTagDashboard data={data.success ? data.body : []} model="category" />
      <Pagination countPage={counted?.qty} initialPage={+page} />
    </div>
  );
}
