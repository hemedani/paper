import { getCountArticles } from "@/app/actions/article/countArticle";
import Pagination from "@/components/molecules/Pagination";
import ClientArticleDashboard from "@/components/template/clientArticleDashboard";
import ToggleAdvancedSearch from "@/components/molecules/ToggleAdvancedSearch";
import { GetArticleSetParams } from "@/utils/populateSetSearch";
import { prepareArticleSearch } from "@/utils/prepareArtticleSearch";

const ArticleDashboard = async ({
  searchParams,
}: {
  searchParams: Promise<GetArticleSetParams>;
}) => {

  const actualSearchParams = await searchParams;
  const { defaultSearchArrayValues, articles, setSearch } = await prepareArticleSearch(actualSearchParams)

  const countDataArticle = await getCountArticles({
    set: setSearch,
    get: { qty: 1 },
  });

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">بخش مقالات</h1>
      <ToggleAdvancedSearch defaultSearchArrayValues={defaultSearchArrayValues} />

      <ClientArticleDashboard articles={articles} />
      <Pagination countPage={countDataArticle?.qty} initialPage={+actualSearchParams.page || 1} />
    </div>
  );
};

export default ArticleDashboard;
