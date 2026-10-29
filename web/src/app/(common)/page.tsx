import { Card } from "@/components/organisms/Card";
import { Hero } from "@/components/organisms/Hero";
import { ListCard } from "@/components/template/WraperCard";
import { articleSchema } from "@/types/declarations/selectInp";
import Pagination from "@/components/molecules/Pagination";
import { getMe } from "@/app/actions/user/getMe";
import { getCountArticles } from "@/app/actions/article/countArticle";
import { getLandingHighlights } from "@/app/actions/article/getLandingHighlights";
import { GetArticleSetParams } from "@/utils/populateSetSearch";
import { prepareArticleSearch } from "@/utils/prepareArtticleSearch";
import { FilterDescription } from "@/components/molecules/FilterDescription";

const PAGE_LIMIT = 9;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<GetArticleSetParams>;
}) {
  const actualSearchParams = await searchParams;
  const { defaultSearchArrayValues, articles, setSearch } =
    await prepareArticleSearch(actualSearchParams);

  const me = await getMe();

  const highlights = await getLandingHighlights({
    set: { limit: 6 },
    get: {},
  });

  const countDataArticle = await getCountArticles({
    set: setSearch,
    get: { qty: 1 },
  });

  const favoriteIds: Set<string> = me.success
    ? new Set(me.body.favArticles?.map((fav: { _id: string }) => fav._id))
    : new Set();

  // Check if any filters are active
  // Get active filter details for display
  const activeFilters = Object.entries(actualSearchParams)
    .filter(
      ([key, value]) => key !== "page" && key !== "limit" && value !== undefined && value !== "",
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

      const articleTypes: Record<string, string> = {
        journalArticle: "مقاله ژورنالی",
        book: "کتاب",
        conferencePaper: "مقاله کنفرانسی",
        thesis: "پایان‌نامه",
        review: "مقاله مروری",
        report: "گزارش علمی",
      };

      let displayValue = String(value);
      if (key === "articleType" && typeof value === "string") {
        displayValue = articleTypes[value] || value;
      }

      return { key, value, label: filterNames[key] || key, displayValue };
    });

  const limit = +actualSearchParams.limit || PAGE_LIMIT;

  return (
    <div dir="rtl" className="bg-white">
      <Hero
        defaultSearchArrayValues={defaultSearchArrayValues}
        highlights={highlights}
      />

      <section id="results" className="w-full scroll-mt-24 bg-white pb-[120px] pt-10 lg:pt-[66px]">
        <div className="mx-auto w-full max-w-[1242px] px-4 md:px-8 lg:px-0">
          {/* Title */}
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-[26px] font-extrabold leading-[1.7] text-black lg:text-[32px]">
              نتایج جستجو
            </h2>
            <p className="text-[14px] font-semibold leading-[1.76] text-[#9A9AA1] lg:text-[16px]">
              مقالات بر اساس جستجوی پیشرفته ای که شما انجام دادید لیست شدند!
            </p>
          </div>

          {/* Active filters */}
          <div className="mt-5">
            <FilterDescription activeFilters={activeFilters} />
          </div>

          {/* Results */}
          {articles.success && articles.body.length > 0 ? (
            <>
              <div className="mt-8 lg:mt-[70px]">
                <ListCard>
                  {articles.body.map((item: Partial<articleSchema>) => (
                    <Card
                      key={item._id}
                      {...item}
                      isFavorite={favoriteIds.has(item._id!)}
                      level={me.success ? me.body.level : undefined}
                    />
                  ))}
                </ListCard>
              </div>

              <div className="flex items-center justify-center pt-12 lg:pt-[68px]">
                <Pagination
                  countPage={countDataArticle ? countDataArticle.qty : 0}
                  initialPage={+actualSearchParams.page || 1}
                  limit={limit}
                />
              </div>
            </>
          ) : (
            <div className="mt-16 flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#F8F8F9]">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="11" cy="11" r="7" stroke="#9A9AA1" strokeWidth="1.6" />
                  <path d="M16.5 16.5L21 21" stroke="#9A9AA1" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-[18px] font-bold text-black">هیچ مقاله‌ای پیدا نشد</p>
              <p className="max-w-[420px] text-[14px] font-medium leading-[1.9] text-[#9A9AA1]">
                عبارت جستجو یا فیلترها را تغییر دهید تا نتایج بیشتری مشاهده کنید.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
