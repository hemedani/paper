import ClientTagDashboard from "@/components/template/clientTagDashboard";
import SearchBox from "@/components/molecules/SearchBox";
import Pagination from "@/components/molecules/Pagination";
import { ReqType } from "@/types/declarations/selectInp";
import { gets } from "@/app/actions/category/gets";
import { count } from "@/app/actions/category/count";
import {
  AdminCountChip,
  AdminPageHeader,
  AdminPanel,
} from "@/components/organisms/admin/AdminUI";

export default async function CategoryDashboard({
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

  const [data, counted] = await Promise.all([
    gets({ set, get }),
    count({ set: set.name ? { name: set.name } : {}, get: { qty: 1 } }),
  ]);

  const categories = data.success && Array.isArray(data.body) ? data.body : [];
  const total = counted?.qty ?? 0;

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="دسته‌بندی‌های وبلاگ"
        subtitle="مدیریت تمامی دسته‌بندی‌های پست‌های وبلاگ"
        badge={<AdminCountChip value={total} label="دسته‌بندی" />}
      />

      <AdminPanel bodyClassName="p-4">
        <SearchBox
          title="name"
          defaultValue={name}
          placeholder="جستجو در نام دسته‌بندی…"
        />
      </AdminPanel>

      <ClientTagDashboard data={categories} model="category" />

      <Pagination countPage={total} initialPage={+page} />
    </div>
  );
}
