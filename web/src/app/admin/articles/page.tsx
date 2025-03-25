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
  const { defaultSearchArrayValues, articles, setSearch } =
    await prepareArticleSearch(actualSearchParams);

  const countDataArticle = await getCountArticles({
    set: setSearch,
    get: { qty: 1 },
  });

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white p-6 md:p-8 rounded-xl shadow-md min-h-full border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-5 border-b border-gray-200">
        <div className="flex items-start">
          <div className="bg-blue-500 w-1 h-8 mr-3 rounded-full"></div>
          <div>
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              بخش مقالات
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              مدیریت و بررسی تمام مقالات سایت
            </p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2 space-x-reverse rtl:space-x-reverse">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1.5 rtl:ml-1.5 rtl:mr-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {countDataArticle?.qty || 0} مقاله
          </span>
        </div>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-sm mb-8 hover:shadow-md transition-all duration-300 ease-in-out border border-gray-100">
        <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-600 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="text-lg font-semibold text-gray-700">
            جستجوی پیشرفته
          </h2>
        </div>
        <ToggleAdvancedSearch
          defaultSearchArrayValues={defaultSearchArrayValues}
          pageAddress="articles"
        />
      </div>

      <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out border border-gray-100">
        <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-600 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
          <h2 className="text-lg font-semibold text-gray-700">لیست مقالات</h2>
        </div>
        <ClientArticleDashboard articles={articles.success ? articles.body : []} />
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination
          countPage={countDataArticle?.qty}
          initialPage={+actualSearchParams.page || 1}
        />
      </div>
    </div>
  );
};

export default ArticleDashboard;
