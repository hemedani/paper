import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { search: string };
}): Promise<Metadata> {
  return {
    title: `نتایج جستجو برای "${params.search}"`,
  };
}

const SearchResultsPage = async ({
  params,
}: {
  params: { search: string };
}) => {
  console.log({ search: params.search });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        نتایج جستجو برای: "{params.search}"
      </h1>
      {[].length > 0 ? (
        <ul className="space-y-4">
          {[].map((article) => (
            <li key={""} className="border-b pb-4">
              <h2 className="text-lg font-semibold">{""}</h2>
              <p className="text-gray-600">{""}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">هیچ مقاله‌ای یافت نشد.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
