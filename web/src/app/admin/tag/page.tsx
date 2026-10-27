import { getTags } from "@/app/actions/tag/getTags";
import ClientTagDashboard from "@/components/template/clientTagDashboard";
import SearchBox from "@/components/molecules/SearchBox";
import Pagination from "@/components/molecules/Pagination";
import { CountTags } from "@/app/actions/tag/countTags";
import { ReqType } from "@/types/declarations/selectInp";
import {
  AdminCountChip,
  AdminPageHeader,
  AdminPanel,
} from "@/components/organisms/admin/AdminUI";

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

  const [data, countPageData] = await Promise.all([
    getTags({ set, get }),
    CountTags({ set: { name: set.name }, get: { qty: 1 } }),
  ]);

  const tags = Array.isArray(data) ? data : [];
  const total = countPageData?.qty ?? 0;

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="برچسب‌های مقالات"
        subtitle="مدیریت تمامی برچسب‌های مقالات وب‌سایت"
        badge={<AdminCountChip value={total} label="برچسب" />}
      />

      <AdminPanel bodyClassName="p-4">
        <SearchBox
          title="name"
          defaultValue={name}
          placeholder="جستجو در نام برچسب…"
        />
      </AdminPanel>

      <ClientTagDashboard data={tags} model="tag" />

      <Pagination countPage={total} initialPage={+page} />
    </div>
  );
}
