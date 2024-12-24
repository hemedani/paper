import { Card } from "@/components/organisms/Card";
import Footer from "@/components/organisms/footer";
import { Header } from "@/components/organisms/Header";
import { Navbar } from "@/components/organisms/Navbar";
import { ListCard } from "@/components/template/WraperCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { paperApi } from "@/services/api";
import { articleSchema } from "@/types/declarations/selectInp";
import { AdvancedSearch } from "@/components/organisms/AdvancedSearch";

type HomeProps = {
  searchParams: {
    query?: string;
    page?: string;
  };
};

export default async function Home(props: {
  searchParams?: HomeProps["searchParams"];
}) {
  // const token = (await cookies()).get("token");
  // const statusStepUser = (await cookies()).get("verification_code");

  // if (token) {
  //   if (statusStepUser && statusStepUser.value === "loggedIn") {
  //     redirect("/admin");
  //   } else if (statusStepUser && statusStepUser.value === "code") {
  //     redirect("login");
  //   } else if (statusStepUser && statusStepUser.value === "logout") {
  //     redirect("login");
  //   }
  // } else {
  //   redirect("login");
  // }

  // const { query } = await props.searchParams;
  const searchParams = props.searchParams ?? {};
  const query = searchParams.query ?? "";

  const set: Record<string, any> = {
    page: 1,
    limit: 15,
  };

  if (query) {
    set.search = query;
  }

  const getArticles = await paperApi().send({
    service: "main",
    model: "article",
    act: "getArticles",
    details: {
      set,
      get: {
        _id: 1,
        title: 1,
        authors: 1,
        abstract: 1,
      },
    },
  });

  return (
    <>
      <Navbar />
      <Header />
      {/* <AdvancedSearch /> */}
      {getArticles.success && (
        <ListCard>
          {getArticles.body.map((item: Partial<articleSchema>) => (
            <Card
              key={item._id}
              id={item._id!}
              title={item.title!}
              abstract={item.abstract!}
              authors={item.authors!}
            />
          ))}
        </ListCard>
      )}
      <Footer />
    </>
  );
}
