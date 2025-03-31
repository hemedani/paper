import { getMe } from "@/app/actions/user/getMe";
import ClientArticleDashboard from "@/components/template/clientArticleDashboard";

const page = async () => {
  const me = await getMe();

  return (
    <div className="relative">
      <div className="flex items-start">
        <div className="bg-blue-500 w-1 h-8 ml-3 rounded-full"></div>
        <div>
          <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
            مقالات مورد علاقه شما
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            در این بخش میتوانید تمامی مقالات مورد علاقه خود را ببینید
          </p>
        </div>
      </div>

      <ClientArticleDashboard articles={me.success ? me.body.favArticles : []} isOwn />

    </div>
  );
};

export default page;
