import { getTags } from "@/app/actions/tag/getTags";
import { FormCreateArticle } from "@/components/template/FormCreateArticle";
import { cookies } from "next/headers";

const Page = async () => {
  const tags = await getTags({
    set: { limit: 10, page: 1, name: "" },
    get: { _id: 1, name: 1 },
  });
  const token = (await cookies()).get("token");
  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">ایجاد مقاله</h1>
      <FormCreateArticle defaultValues={tags} token={token?.value} />
    </div>
  );
};

export default Page;
