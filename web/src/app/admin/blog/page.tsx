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
    <div className="relative min-h-full">
      <div className="flex items-start">
        <div className="bg-blue-500 w-1 h-8 ml-3 rounded-full"></div>
        <div>
          <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
            مدیریت وبلاگ
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            مدیریت تمامی پست‌های وبلاگ وب‌سایت
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm my-4">
        <SearchBox title="جستجو در عنوان" defaultValue={search} />
      </div>

      <ClientDashboard blogs={data.success ? data.body : []} lesanUrl={lesanUrl} />

      <div className="mt-4">
        <Pagination countPage={countPageData?.qty} initialPage={+page} />
      </div>
    </div>
  );
}
