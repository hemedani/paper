import { Card } from "@/components/organisms/Card";
import Footer from "@/components/organisms/footer";
import { Header } from "@/components/organisms/Header";
import { Navbar } from "@/components/organisms/Navbar";
import { ListCard } from "@/components/template/WraperCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type HomeProps = {
  searchParams: {
    query?: string;
  };
};


export default async function Home({searchParams: {query}}: HomeProps) {
  const token = (await cookies()).get("token");
  const statusStepUser = (await cookies()).get("verification_code");

  if (token) {
    if (statusStepUser && statusStepUser.value === "loggedIn") {
      redirect("/admin");
    } else if (statusStepUser && statusStepUser.value === "code") {
      redirect("login");
    } else if (statusStepUser && statusStepUser.value === "logout") {
      redirect("login");
    }
  } else {
    redirect("login");
  }


  return (
    <>
      <Navbar />
      <Header />
      <ListCard>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </ListCard>
      <Footer />
    </>
  );
}
