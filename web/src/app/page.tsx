import { Card } from "@/components/organisms/Card";
import { Header } from "@/components/organisms/Header";
import { ListCard } from "@/components/template/WraperCard";
import { articleSchema } from "@/types/declarations/selectInp";
import Pagination from "@/components/molecules/Pagination";
import { getMe } from "./actions/user/getMe";
import { getCountArticles } from "./actions/article/countArticle";
import { GetArticleSetParams } from "@/utils/populateSetSearch";
import { prepareArticleSearch } from "@/utils/prepareArtticleSearch";
import Link from "next/link";
import { FilterDescription } from "@/components/molecules/FilterDescription";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<GetArticleSetParams>;
}) {
  const actualSearchParams = await searchParams;
  const { defaultSearchArrayValues, articles, setSearch } =
    await prepareArticleSearch(actualSearchParams);

  const me = await getMe();

  const countDataArticle = await getCountArticles({
    set: setSearch,
    get: { qty: 1 },
  });

  const favoriteIds: Set<string> = me.success
    ? new Set(me.body.favArticles?.map((fav: { _id: string }) => fav._id))
    : new Set();

  // Check if any filters are active
  const hasActiveFilters = Object.entries(actualSearchParams).some(
    ([key, value]) => key !== "page" && value !== undefined && value !== ""
  );

  // Get active filter details for display
  const activeFilters = Object.entries(actualSearchParams)
    .filter(
      ([key, value]) => key !== "page" && value !== undefined && value !== ""
    )
    .map(([key, value]) => {
      const filterNames: Record<string, string> = {
        search: "جستجوی متنی",
        authorIds: "نویسنده",
        tagIds: "برچسب",
        keywordIds: "کلیدواژه",
        articleType: "نوع مقاله",
        publication: "مجله",
        DOI: "شناسه DOI",
        year: "سال انتشار",
      };

      // Map article types to Persian
      const articleTypes: Record<string, string> = {
        journalArticle: "مقاله ژورنالی",
        book: "کتاب",
        conferencePaper: "مقاله کنفرانسی",
        thesis: "پایان‌نامه",
        review: "مقاله مروری",
        report: "گزارش علمی",
      };

      let displayValue = String(value);

      // Format display values for specific filter types
      if (key === "articleType" && typeof value === "string") {
        displayValue = articleTypes[value] || value;
      }

      return {
        key,
        value,
        label: filterNames[key] || key,
        displayValue,
      };
    });

  return (
    <div dir="rtl">
      <Header defaultSearchArrayValues={defaultSearchArrayValues} />
      {articles.success && articles.body.length > 0 && (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-8">
          <div className="container mx-auto px-2 sm:px-3">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-3 md:mb-0">
                نتایج جستجو
              </h1>
              {hasActiveFilters && (
                <Link
                  href="/"
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300"
                >
                  <span>پاک کردن فیلترها</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Link>
              )}
            </div>

            <FilterDescription activeFilters={activeFilters} />

            <ListCard>
              {articles.success ? articles.body.map((item: Partial<articleSchema>) => (
                <Card
                  key={item._id}
                  {...item}
                  isFavorite={favoriteIds.has(item._id!)}
                  level={me.success ? me.body.level : undefined}
                />
              )) : (
                <div>هیچ سندی پیدا نشد</div>
              )}
            </ListCard>
            <div className="flex justify-center items-center gap-2 pt-10">
              <Pagination
                countPage={countDataArticle ? countDataArticle.qty : 0}
                initialPage={+actualSearchParams.page || 1}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
