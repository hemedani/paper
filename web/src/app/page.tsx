import { Card } from "@/components/organisms/Card";
import Footer from "@/components/organisms/footer";
import { Header } from "@/components/organisms/Header";
import { Navbar } from "@/components/organisms/Navbar";
import { ListCard } from "@/components/template/WraperCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { paperApi } from "@/services/api";
import { articleSchema } from "@/types/declarations/selectInp";

type HomeProps = {
  searchParams: {
    query?: string;
    page?: string;
  };
};

export default async function Home(props: {
  searchParams?: Promise<HomeProps>;
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

  const { query } = await props.searchParams;

  const set: Record<string, any> = {
    page: 1,
    limit: 12,
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
      {getArticles.success && (
        <ListCard>
          {getArticles.body.map((item: Partial<articleSchema>) => (
            <Card key={item._id} {...item} />
          ))}
        </ListCard>
      )}
      <Footer />
    </>
  );
}
