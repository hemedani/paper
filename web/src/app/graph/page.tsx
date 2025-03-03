import { Graph } from "@/components/atoms/Chart";
import { getTags } from "../actions/tag/getTags";

const Page = async () => {
  const tags = await getTags({
    set: { page: 1, limit: 50 },
    get: { _id: 1, name: 1 },
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
