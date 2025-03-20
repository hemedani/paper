import { Card } from "@/components/organisms/Card";
import { Header } from "@/components/organisms/Header";
import { ListCard } from "@/components/template/WraperCard";
import { articleSchema, } from "@/types/declarations/selectInp";
import Pagination from "@/components/molecules/Pagination";
import { getMe } from "./actions/user/getMe";
import { getCountArticles } from "./actions/article/countArticle";
import { GetArticleSetParams } from "@/utils/populateSetSearch";
import { prepareArticleSearch } from "@/utils/prepareArtticleSearch";


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<GetArticleSetParams>;
}) {
  const actualSearchParams = await searchParams;
  const { defaultSearchArrayValues, articles, setSearch } = await prepareArticleSearch(actualSearchParams)

  const me = await getMe();

  const countDataArticle = await getCountArticles({
    set: setSearch,
    get: { qty: 1 },
  });

  const favoriteIds: Set<string> = me.success ? new Set(
    me.body.favArticles?.map((fav: { _id: string }) => fav._id)
  ) : new Set();

  return (
    <>
      <Header defaultSearchArrayValues={defaultSearchArrayValues} />
      {articles?.length > 0 && (
        <div className="bg-gray-300">
          <ListCard>
            {articles.map((item: Partial<articleSchema>) => (
              <Card
                key={item._id}
                {...item}
                isFavorite={favoriteIds.has(item._id!)}
                level={me.success ? me.body.level : undefined}
              />
            ))}
          </ListCard>
          <div className="flex justify-center items-center gap-2 pb-6">
            <Pagination
              countPage={countDataArticle ? countDataArticle.qty : 0}
              initialPage={+actualSearchParams.page || 1}
            />
          </div>
        </div>
      )}
    </>
  );
}
