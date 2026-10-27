import ClientKeywordDashboard from "@/components/template/clientKeywordDashboard";
import SearchBox from "@/components/molecules/SearchBox";
import Pagination from "@/components/molecules/Pagination";
import { CountKeyword } from "@/app/actions/keyword/countKeyword";
import { ReqType } from "@/types/declarations/selectInp";
import { getKeywords } from "@/app/actions/keyword/getKeywords";
import {
  AdminCountChip,
  AdminPageHeader,
  AdminPanel,
} from "@/components/organisms/admin/AdminUI";

export default async function KeywordDashboard({
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

  const [data, countPageData] = await Promise.all([
    getKeywords({ set, get }),
    CountKeyword({ set: { name }, get: { qty: 1 } }),
  ]);

  const keywords = Array.isArray(data) ? data : [];
  const total = countPageData?.qty ?? 0;

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="کلمات کلیدی مقالات"
        subtitle="مدیریت تمامی کلمات کلیدی مقالات وب‌سایت"
        badge={<AdminCountChip value={total} label="کلمه کلیدی" />}
      />

      <AdminPanel bodyClassName="p-4">
        <SearchBox
          title="name"
          defaultValue={name}
          placeholder="جستجو در کلمات کلیدی…"
        />
      </AdminPanel>

      <ClientKeywordDashboard keywords={keywords} />

      <Pagination countPage={total} initialPage={+page} />
    </div>
  );
}
