import { Card } from "@/components/organisms/Card";
import Footer from "@/components/organisms/footer";
import { Header } from "@/components/organisms/Header";
import { Navbar } from "@/components/organisms/Navbar";
import { ListCard } from "@/components/template/WraperCard";
import { articleSchema } from "@/types/declarations/selectInp";
// import Pagination from "@/components/molecules/Pagination";
import { getArticles } from "./actions/article/getArticles";

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
    page: page,
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

  return (
    <>
      <Navbar />
      <Header />
      {data?.length > 0 && (
        <>
          <ListCard>
            {data?.map((item: Partial<articleSchema>) => (
              <Card
                key={item._id}
                id={item._id!}
                title={item.title!}
                abstract={item.abstract!}
                authors={item.authors!}
              />
            ))}
          </ListCard>
          <div className="flex justify-center items-center gap-2">
            {/* <Pagination totalItems={data.length} initialPage={+set.page} /> */}
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
