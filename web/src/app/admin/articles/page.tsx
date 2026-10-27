import { getCountArticles } from "@/app/actions/article/countArticle";
import Pagination from "@/components/molecules/Pagination";
import ClientArticleDashboard from "@/components/template/clientArticleDashboard";
import ToggleAdvancedSearch from "@/components/molecules/ToggleAdvancedSearch";
import { GetArticleSetParams } from "@/utils/populateSetSearch";
import { prepareArticleSearch } from "@/utils/prepareArtticleSearch";
import {
  AdminCountChip,
  AdminIcon,
  AdminPageHeader,
  AdminPanel,
} from "@/components/organisms/admin/AdminUI";

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

  const list = articles.success && Array.isArray(articles.body) ? articles.body : [];
  const total = countDataArticle?.qty ?? 0;

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="مقالات"
        subtitle="مدیریت، جستجو و بررسی تمام مقالات سایت"
        badge={<AdminCountChip value={total} label="مقاله" />}
      />

      <AdminPanel
        title="جستجو و فیلتر"
        description="با برچسب، نویسنده، کلمه کلیدی یا مشخصات انتشار فیلتر کنید"
        icon={AdminIcon.search}
        bodyClassName="p-4"
      >
        <ToggleAdvancedSearch
          defaultSearchArrayValues={defaultSearchArrayValues}
          pageAddress="articles"
        />
      </AdminPanel>

      <ClientArticleDashboard articles={list} />

      <Pagination countPage={total} initialPage={+actualSearchParams.page || 1} />
    </div>
  );
};

export default ArticleDashboard;
