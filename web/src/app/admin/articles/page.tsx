import { getCountArticles } from "@/app/actions/article/countArticle";
import { getArticles } from "@/app/actions/article/getArticles";
import Pagination from "@/components/molecules/Pagination";
import ClientArticleDashboard from "@/components/template/clientArticleDashboard";
import { ReqType } from "@/types/declarations/selectInp";
import ToggleAdvancedSearch from "@/components/molecules/ToggleAdvancedSearch";

const ArticleDashboard = async ({
  searchParams,
}: {
  searchParams: Promise<ReqType["main"]["article"]["getArticles"]["set"]>;
}) => {
  const { limit = "20", page = "1", search = "" } = await searchParams;
  const set: ReqType["main"]["article"]["getArticles"]["set"] = {
    limit: +limit || 20,
    page: +page || 1,
    search: search,
  };
  const get: ReqType["main"]["article"]["getArticles"]["get"] = {
    _id: 1,
    title: 1,
    articleType: 1,
    // authors: 1,
  };
  const data = await getArticles({ set, get });
  const countDataArticle = await getCountArticles({
    set: { search },
    get: { qty: 1 },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">بخش مقالات</h1>
      <ToggleAdvancedSearch />

      <ClientArticleDashboard articles={data} />
      <Pagination countPage={countDataArticle?.qty} initialPage={+page} />
    </div>
  );
};

export default ArticleDashboard;
