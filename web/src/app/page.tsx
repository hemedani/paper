import { Card } from "@/components/organisms/Card";
import Footer from "@/components/organisms/footer";
import { Header } from "@/components/organisms/Header";
import { Navbar } from "@/components/organisms/Navbar";
import { ListCard } from "@/components/template/WraperCard";
import { articleSchema } from "@/types/declarations/selectInp";
import { getArticles } from "./actions/article/getArticles";
import Pagination from "@/components/molecules/Pagination";
import { getCountArticles } from "./actions/article/countArticle";
import { getMe } from "./actions/user/getMe";

export const dynamic = "force-dynamic";

export default async function Home(searchParams: {
  searchParams?: Record<string, string>;
}) {
  const searchQuery = searchParams.searchParams ?? {};

  const query = (await searchQuery).query ?? "";
  const page = (await searchQuery).page ?? "1";
  const title = (await searchQuery).title ?? "";
  const abstract = (await searchQuery).abstract ?? "";
  const tag = (await searchQuery).tag ?? "";
  const publication = (await searchQuery).publication ?? "";
  const authors = (await searchQuery).authors ?? "";
  const DOI = (await searchQuery).DOI ?? "";
  const ISBN = (await searchQuery).ISBN ?? "";
  const ISNN = (await searchQuery).ISNN ?? "";

  const set: Record<string, string> = {
    page,
    search: query,
    title,
    abstract,
    tag,
    publication,
    authors,
    DOI,
    ISBN,
    ISNN,
  };

  const data = await getArticles(set);
  const me = await getMe();
  const countDataArticle = await getCountArticles({
    abstract,
    authors,
    DOI,
    ISBN,
    ISNN,
    publication,
    tag,
    title,
    search: query,
  });

  // تبدیل لیست علاقه‌مندی‌ها به Set برای جستجوی سریع‌تر
  const favoriteIds = new Set(
    me?.favArticles?.map((fav: { _id: string }) => fav._id)
  );

  return (
    <>
      <Navbar />
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
                authors={item.authors!}
                isFavorite={favoriteIds.has(item._id!)} // بررسی علاقه‌مندی
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
