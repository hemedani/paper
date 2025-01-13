import { getTags } from "@/app/actions/tag/getTags";
import { FormCreateArticle } from "@/components/template/FormCreateArticle";

const Page = async () => {
  const tags = await getTags({ set: { limit: 10, page: 1 }, get: { _id: 1, name: 1 } });
  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">ایجاد مقاله</h1>
      <FormCreateArticle defaultValues={tags} />
    </div>
  );
};

export default Page;
