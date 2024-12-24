import { getArticleAction } from "@/app/actions/article/getArticle";

interface Article {
  id: string;
  title: string;
  articleType: string;
  publicationYear: number;
  abstract: string;
  DOI: string;
  URL: string;
  page: string;
  issue: number;
  volume: number;
  registrar: {
    first_name: string;
    last_name: string;
    registerArticles: { title: string }[];
  };
  publication: { title: string };
  tags: { name: string }[];
}
export default async function ArticlePage({
  params,
}: {
  params: { Id: string };
}) {
  const article = await getArticleAction(params.Id);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        {article?.title}
      </h1>
      <p className="text-gray-600 italic">{article?.articleType}</p>
      <p className="mt-2 text-gray-600">
        سال انتشار: {article?.publicationYear}
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-600">خلاصه:</h2>
        <p className="text-gray-700 mt-2">{article?.abstract}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-600">اطلاعات مقاله:</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li>DOI: {article?.DOI}</li>
          <li>صفحات: {article?.page}</li>
          <li>شماره: {article?.issue}</li>
          <li>جلد: {article?.volume}</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-600">ثبت‌کننده:</h2>
        <p className="text-gray-700">
          {article?.registrar?.first_name} {article?.registrar?.last_name}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-600">برچسب‌ها:</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {article?.tags?.map((tag: any) => (
            <span
              key={tag?.name}
              className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
            >
              {tag?.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-600">انتشارات:</h2>
        <p className="text-gray-700">{article?.publication?.title}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-600">مقالات مرتبط:</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          {article?.registrar?.registerArticles?.map(
            (item: any, index: number) => (
              <li key={index}>{item?.title}</li>
            )
          )}
        </ul>
      </div>

      <a
        href={article?.URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block text-blue-500 underline "
      >
        مشاهده مقاله اصلی
      </a>
    </div>
  );
}
