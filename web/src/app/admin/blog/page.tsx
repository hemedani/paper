import SearchBox from "@/components/molecules/SearchBox";
import Pagination from "@/components/molecules/Pagination";
import { ReqType } from "@/types/declarations/selectInp";
import { getBlogs } from "@/app/actions/blog/getBlogs";
import { CountBlog } from "@/app/actions/blog/countBlog";
import ClientDashboard from "@/components/template/clientBlogDashboard";

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

  const data = await getBlogs({ set, get });

  const countPageData = await CountBlog({
    set: { search },
    get: { qty: 1 },
  });
  const lesanUrl = process.env.LESAN_URL
    ? process.env.LESAN_URL
    : "http://localhost:1382";

  return (
    <div className="relative bg-gray-50 p-6 rounded-lg shadow-sm min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-gray-700 font-bold">مدیریت وبلاگ</h1>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <SearchBox title="جستجو در عنوان" defaultValue={search} />
      </div>

      <ClientDashboard blogs={data} lesanUrl={lesanUrl} />

      <div className="mt-6">
        <Pagination countPage={countPageData?.qty} initialPage={+page} />
      </div>
    </div>
  );
}
