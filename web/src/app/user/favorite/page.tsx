import { getMe } from "@/app/actions/user/getMe";
import ClientArticleDashboard from "@/components/template/clientArticleDashboard";

const page = async () => {
  const me = await getMe();
  console.log(me);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">علاقه مندی ها</h1>
      <div className="flex justify-evenly items-center mt-10 gap-2">
        <ClientArticleDashboard articles={me?.favArticles} searchQuery={""} />
      </div>
    </div>
  );
};

export default page;
