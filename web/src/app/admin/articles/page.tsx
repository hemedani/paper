import { getCountArticles } from "@/app/actions/article/countArticle";
import { getArticles } from "@/app/actions/article/getArticles";
import Pagination from "@/components/molecules/Pagination";
import SearchBox from "@/components/molecules/SearchBox";
import ClientArticleDashboard from "@/components/template/clientArticleDashboard";

const ArticleDashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const {
    query = "",
    page = "1",
  } = await searchParams;

  const data = await getArticles({ page: page, search: query });
  const countDataArticle = await getCountArticles({ search: query });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">بخش مقالات</h1>
      <p className="text-gray-600">خوش آمدید!</p>
      <SearchBox />
      <ClientArticleDashboard articles={data} searchQuery={query} />
      <Pagination
        countPage={countDataArticle?.qty}
        initialPage={+page}
      />
    </div>
  );
};

export default ArticleDashboard;
