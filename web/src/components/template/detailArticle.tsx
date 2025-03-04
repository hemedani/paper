"use client";

import { translateArticleType } from "@/utils/helper";
import Tags from "../molecules/Tags";
import Authors from "../molecules/Authors";
import { useRouter } from "next/navigation";

interface IProps {
  title: string;
  articleType: string;
  publicationYear: string;
  abstract: string;
  DOI: string;
  page: string;
  issue: string;
  volume: string;
  registrar: { _id: string; first_name: string; last_name: string };
  publication: { title: string };
  tags: { name: string }[];
  authors: { _id: string; first_name: string; last_name: string }[];
  URL: string;
}

export const DetailArticle = ({ article }: { article: IProps }) => {
  const router = useRouter();

  const handleQuery = (queryType: string, title: string) => {
    const query = new URLSearchParams();
    query.append(queryType, title);
    router.push(`/?${query}`);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200 min-h-screen flex justify-center items-center py-10 px-6">
      <div className="max-w-6xl w-full bg-white shadow-2xl rounded-xl p-8 border-4 ">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6 leading-tight">
          {article?.title}
        </h1>
        <p
          onClick={() => handleQuery("articleType", article.articleType)}
          className="cursor-pointer text-lg text-indigo-800 font-semibold italic"
        >
          {translateArticleType(article?.articleType)}
        </p>
        <p
          onClick={() =>
            handleQuery("publicationYear", article?.publicationYear)
          }
          className="cursor-pointer mt-2 text-gray-700"
        >
          <span className="font-semibold">سال انتشار:</span>
          {article?.publicationYear}
        </p>

        <div className="border mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">خلاصه:</h2>
          <p className="text-gray-700 text-justify mt-4">{article?.abstract}</p>
        </div>

        <div className="border mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">
            اطلاعات مقاله:
          </h2>
          <ul className="flex items-center gap-2 text-gray-700 mt-4">
            <span
              onClick={() => handleQuery("DOI", article.DOI)}
              className="cursor-pointer  bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-blue-300"
            >
              DOI:
              {article?.DOI}
            </span>
            <span
              onClick={() => handleQuery("pageCount", article.page)}
              className="cursor-pointer bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-blue-300"
            >
              صفحات: {article?.page}
            </span>
            <span
              onClick={() => handleQuery("issue", article.issue)}
              className="cursor-pointer bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-blue-300"
            >
              شماره: {article?.issue}
            </span>
            <span
              onClick={() => handleQuery("volume", article.volume)}
              className="cursor-pointer bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-blue-300"
            >
              جلد: {article?.volume}
            </span>
          </ul>
        </div>

        <div className="border mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">نویسندگان:</h2>
          <Authors authors={article.authors} />
        </div>

        <div className="border mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">ثبت کننده:</h2>
          <span className="bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors mt-8 hover:bg-blue-300">
            {article.registrar.first_name} {article.registrar.last_name}
          </span>
        </div>

        <div className="border mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">برچسب‌ها:</h2>x
          <Tags tags={article?.tags} />
        </div>

        <div className="border mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">انتشارات:</h2>
          <p
            onClick={() =>
              handleQuery("publication", article?.publication?.title)
            }
            className="cursor-pointer text-gray-700 mt-4"
          >
            {article?.publication?.title}
          </p>
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
  );
};
