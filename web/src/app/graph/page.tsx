import { Graph } from "@/components/atoms/Chart";
import { getArticles } from "../actions/article/getArticles";

const Page = async () => {
  const tags = await getArticles({
    set: { page: 1, limit: 50 },
    get: { _id: 1, articleType: 1 },
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full h-full">
        <Graph tags={tags} />
      </div>
    </div>
  );
};

export default Page;
