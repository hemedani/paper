import { Card } from "@/components/organisms/Card";
import Footer from "@/components/organisms/footer";
import { Header } from "@/components/organisms/Header";
import { Navbar } from "@/components/organisms/Navbar";
import { ListCard } from "@/components/template/WraperCard";
import { articleSchema, ReqType } from "@/types/declarations/selectInp";
import { getArticles } from "./actions/article/getArticles";
import Pagination from "@/components/molecules/Pagination";
import { getMe } from "./actions/user/getMe";
import { getCountArticles } from "./actions/article/countArticle";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<ReqType["main"]["article"]["getArticles"]["set"]>;
}) {
  const {
    search = "",
    page = "1",
    limit = "20",
    title = "",
    abstract = "",
    tags = [],
    publication = "",
    DOI = "",
    ISBN = "",
    ISNN = "",
    authorIds = [],
  } = await searchParams;

  const set: ReqType["main"]["article"]["getArticles"]["set"] = {
    page: +page,
    limit: +limit || 20,
    search,
    title,
    abstract,
    tags,
    publication,
    authorIds,
    DOI,
    ISBN,
    ISNN,
  };

  const data = await getArticles({
    set,
    get: {
      _id: 1,
      title: 1,
      articleType: 1,
      abstract: 1,
      tags: {
        name: 1,
      },
      registrar: {
        first_name: 1,
        last_name: 1,
      },
      publication: {
        title: 1,
      },
    },
  });

  const me = await getMe();

  const countDataArticle = await getCountArticles({
    set: {
      abstract,
      DOI,
      ISBN,
      ISNN,
      publication,
      tags,
      title,
      search,
      authorIds,
    },
    get: { qty: 1 },
  });

  // تبدیل لیست علاقه‌مندی‌ها به Set برای جستجوی سریع‌تر
  const favoriteIds = new Set(
    me?.favArticles?.map((fav: { _id: string }) => fav._id)
  );

  return (
    <>
      <Navbar level={me?.level} />
      <Header />
      {data?.length > 0 && (
        <>
          <ListCard>
            {data.map((item: Partial<articleSchema>) => (
              <Card
                key={item._id}
                id={item._id!}
                title={item.title!}
                abstract={item.abstract!}
                isFavorite={favoriteIds.has(item._id!)}
                level={me?.level}
              />
            ))}
          </ListCard>
          <div className="flex justify-center items-center gap-2">
            <Pagination
              countPage={countDataArticle.qty}
              initialPage={+set.page}
            />
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
