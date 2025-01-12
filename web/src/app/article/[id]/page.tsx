import { getArticleAction } from "@/app/actions/article/getArticle";
import { getMe } from "@/app/actions/user/getMe";
import Tags from "@/components/molecules/Tags";
import { Navbar } from "@/components/organisms/Navbar";
import { ReqType } from "@/types/declarations/selectInp";
import { translateArticleType } from "@/utils/helper";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const articleId = (await params).id;

  const set: ReqType["main"]["article"]["getArticle"]["set"] = {
    _id: articleId,
  };
  const get: ReqType["main"]["article"]["getArticle"]["get"] = {
    _id: 1,
    title: 1,
    articleType: 1,
    publicationYear: 1,
    abstract: 1,
    DOI: 1,
    page: 1,
    issue: 1,
    volume: 1,
    registrar: { _id: 1, first_name: 1, last_name: 1 },
    publication: { title: 1 },
    tags: { name: 1 },
    URL: 1,
  };
  const article = await getArticleAction({ set, get });
  const me = await getMe();

  return (
    <>
      <Navbar level={me?.level} />
      <div className="bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200 min-h-screen flex justify-center items-center py-10 px-6">
        <div className="max-w-6xl w-full bg-white shadow-2xl rounded-xl p-8 border-4 ">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-6 leading-tight">
            {article?.title}
          </h1>
          <p className="text-lg text-indigo-800 font-semibold italic">
            {translateArticleType(article?.articleType)}
          </p>
          <p className="mt-2 text-gray-700">
            <span className="font-semibold">سال انتشار:</span>{" "}
            {article?.publicationYear}
          </p>

          <div className="border mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800">خلاصه:</h2>
            <p className="text-gray-700 text-justify mt-4">
              {article?.abstract}
            </p>
          </div>

          <div className="border mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800">
              اطلاعات مقاله:
            </h2>
            <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
              <li>DOI: {article?.DOI}</li>
              <li>صفحات: {article?.page}</li>
              <li>شماره: {article?.issue}</li>
              <li>جلد: {article?.volume}</li>
            </ul>
          </div>

          <div className="border mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800">ثبت‌کننده:</h2>
            <p className="text-gray-700 mt-4">
              {article?.registrar?.first_name} {article?.registrar?.last_name}
            </p>
          </div>

          <div className="border mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800">برچسب‌ها:</h2>
            <Tags tags={article?.tags} />
          </div>

          <div className="border mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800">انتشارات:</h2>
            <p className="text-gray-700 mt-4">{article?.publication?.title}</p>
          </div>

          <a
            href={article?.URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block text-indigo-600 font-semibold text-lg underline hover:text-indigo-800"
          >
            دانلود مقاله
          </a>
        </div>
      </div>
    </>
  );
}
