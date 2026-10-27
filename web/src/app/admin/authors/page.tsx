import SearchBox from "@/components/molecules/SearchBox";
import Pagination from "@/components/molecules/Pagination";
import { ReqType } from "@/types/declarations/selectInp";
import { getCounts } from "@/app/actions/user/dashboardStatistic";
import ClientDashboard from "@/components/template/clientAuthorDashboard";
import { getAuthors } from "@/app/actions/author/getAuthors";
import {
  AdminCountChip,
  AdminPageHeader,
  AdminPanel,
} from "@/components/organisms/admin/AdminUI";

export default async function AuthorDashboard({
  searchParams,
}: {
  searchParams: Promise<ReqType["main"]["author"]["gets"]["set"]>;
}) {
  const { limit = "20", page = "1", first_name = "", last_name = "" } =
    await searchParams;

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

  const [data, counts] = await Promise.all([
    getAuthors({ set, get }),
    // The author model's own `count` act returns a different aggregate, so the
    // dashboard statistic (a real document count) is the trustworthy source.
    getCounts(),
  ]);

  const authors = Array.isArray(data) ? data : [];
  const total = counts?.authors ?? 0;

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="نویسندگان مقالات"
        subtitle="مدیریت تمامی نویسندگان مقالات وب‌سایت"
        badge={<AdminCountChip value={total} label="نویسنده" />}
      />

      <AdminPanel bodyClassName="p-4">
        <SearchBox
          title="first_name"
          defaultValue={first_name}
          placeholder="جستجو در نام نویسنده…"
        />
      </AdminPanel>

      <ClientDashboard authors={authors} />

      <Pagination countPage={total} initialPage={+page} />
    </div>
  );
}
