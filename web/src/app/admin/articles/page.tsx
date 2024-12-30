import { getArticles } from "@/app/actions/article/getArticles";
import Pagination from "@/components/molecules/Pagination";
import SearchBox from "@/components/molecules/SearchBox";
import ClientArticleDashboard from "@/components/template/clientArticleDashboard";

const ArticleDashboard = async ({
  searchParams,
}: {
  searchParams: { query?: string, page?: string };
}) => {
  const searchQuery = (await searchParams).query || "";
  const currentPage = parseInt((await searchParams).page || "1");

  const data = await getArticles(searchQuery, currentPage);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">بخش مقالات</h1>
      <p className="text-gray-600">خوش آمدید!</p>
      <SearchBox />
      <ClientArticleDashboard articles={data} searchQuery={searchQuery} />
      <Pagination totalItems={data.length} initialPage={currentPage} />
    </div>
  );
};

export default ArticleDashboard;
