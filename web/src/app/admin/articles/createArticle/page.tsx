import { FormArticle } from "@/components/template/FormArticle";

const Page = async () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">ایجاد مقاله</h1>
      <FormArticle />
    </div>
  );
};

export default Page;
