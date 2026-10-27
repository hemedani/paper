import SearchBox from "@/components/molecules/SearchBox";
import Pagination from "@/components/molecules/Pagination";
import { ReqType } from "@/types/declarations/selectInp";
import { getBlogs } from "@/app/actions/blog/getBlogs";
import { CountBlog } from "@/app/actions/blog/countBlog";
import ClientDashboard from "@/components/template/clientBlogDashboard";
import {
  AdminCountChip,
  AdminPageHeader,
  AdminPanel,
} from "@/components/organisms/admin/AdminUI";

export default async function BlogDashboard({
  searchParams,
}: {
  searchParams: Promise<ReqType["main"]["blog"]["gets"]["set"]>;
}) {
  const { limit = "20", page = "1", search = "" } = await searchParams;

  const set: ReqType["main"]["blog"]["gets"]["set"] = {
    limit: +limit || 20,
    page: +page,
    search,
  };
  const get: ReqType["main"]["blog"]["gets"]["get"] = {
    _id: 1,
    abstract: 1,
    pic: { _id: 1, name: 1, type: 1 },
    isInSwipper: 1,
    title: 1,
    subtitle: 1,
  };

  const [data, countPageData] = await Promise.all([
    getBlogs({ set, get }),
    CountBlog({ set: { search }, get: { qty: 1 } }),
  ]);

  const blogs = data.success && Array.isArray(data.body) ? data.body : [];
  const total = countPageData?.qty ?? 0;
  const lesanUrl = process.env.LESAN_URL
    ? process.env.LESAN_URL
    : "http://localhost:1382";

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="مدیریت وبلاگ"
        subtitle="مدیریت تمامی پست‌های وبلاگ وب‌سایت"
        badge={<AdminCountChip value={total} label="پست" />}
      />

      <AdminPanel bodyClassName="p-4">
        <SearchBox
          title="search"
          defaultValue={search}
          placeholder="جستجو در عنوان یا خلاصه پست…"
        />
      </AdminPanel>

      <ClientDashboard blogs={blogs} lesanUrl={lesanUrl} />

      <Pagination countPage={total} initialPage={+page} />
    </div>
  );
}
