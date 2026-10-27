import { CountPublications } from "@/app/actions/publication/countPublications";
import { getPublications } from "@/app/actions/publication/getPublications";
import Pagination from "@/components/molecules/Pagination";
import SearchBox from "@/components/molecules/SearchBox";
import ClientPuplicationDashboard from "@/components/template/clientPuplicationDashboard";
import { ReqType } from "@/types/declarations/selectInp";
import {
  AdminCountChip,
  AdminPageHeader,
  AdminPanel,
} from "@/components/organisms/admin/AdminUI";

const PopulationDashboard = async ({
  searchParams,
}: {
  searchParams: Promise<ReqType["main"]["publication"]["getPublications"]["set"]>;
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

  const [puplications, countPublicationData] = await Promise.all([
    getPublications({ get, set }),
    CountPublications({ get: { qty: 1 }, set: { title } }),
  ]);

  const publications = Array.isArray(puplications) ? puplications : [];
  const total = countPublicationData?.qty ?? 0;

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="ناشران مقالات"
        subtitle="مدیریت تمامی ناشران مقالات وب‌سایت"
        badge={<AdminCountChip value={total} label="ناشر" />}
      />

      <AdminPanel bodyClassName="p-4">
        <SearchBox
          title="title"
          defaultValue={title}
          placeholder="جستجو در نام ناشر…"
        />
      </AdminPanel>

      <ClientPuplicationDashboard publications={publications} />

      <Pagination countPage={total} initialPage={+page} />
    </div>
  );
};

export default PopulationDashboard;
