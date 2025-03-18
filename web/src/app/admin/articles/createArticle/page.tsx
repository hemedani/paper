import { FormCreateArticle } from "@/components/template/FormCreateArticle";
import { cookies } from "next/headers";

const Page = async () => {
  const token = (await cookies()).get("token");
  const lesanUrl = process.env.LESAN_URL ? process.env.LESAN_URL : "http://localhost:1382"
  return (<FormCreateArticle token={token?.value} lesanUrl={lesanUrl} />);
};

export default Page;
