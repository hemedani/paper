import { FormCreateArticle } from "@/components/template/FormCreateArticle";
import { cookies } from "next/headers";

const Page = async () => {
  const token = (await cookies()).get("token");
  const lesanUrl = process.env.LESAN_URL ? process.env.LESAN_URL : "http://localhost:1382"
  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">ایجاد مقاله</h1>
      <FormCreateArticle token={token?.value} lesanUrl={lesanUrl} />
    </div>
  );
};

export default Page;
