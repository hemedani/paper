"use client";

import { translateArticleType } from "@/utils/helper";
import Tags from "../molecules/Tags";
import Authors from "../molecules/Authors";
import { useRouter } from "next/navigation";
import { articleSchema } from "@/types/declarations/selectInp";

export const DetailArticle = ({ article: {
  _id,
  key,
  articleType,
  publicationYear,
  title,
  abstract,
  ISBN,
  ISNN,
  DOI,
  URL,
  page,
  issue,
  volume,
  createdAt,
  updatedAt,
  registrar,
  avatar,
  doc,
  publication,
  authors,
  tags,
  keywords,
  favByUsers,
} }: { article: articleSchema }) => {
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
          {title}
        </h1>
        <p
          onClick={() => handleQuery("articleType", articleType)}
          className="cursor-pointer text-lg text-indigo-800 font-semibold italic"
        >
          {translateArticleType(articleType)}
        </p>
        <p
          onClick={() =>
            handleQuery("publicationYear", publicationYear.toString())
          }
          className="cursor-pointer mt-2 text-gray-700"
        >
          <span className="font-semibold">سال انتشار:</span>
          {publicationYear}
        </p>

        <p
          onClick={() =>
            handleQuery("key", key)
          }
          className="cursor-pointer mt-2 text-gray-700"
        >
          <span className="font-semibold">شماره مقاله :</span>
          {key}
        </p>

        <p
          onClick={() =>
            handleQuery("createdAt", createdAt as unknown as string)
          }
          className="cursor-pointer mt-2 text-gray-700"
        >
          <span className="font-semibold">تاریخ ثبت :</span>
          {createdAt as unknown as string}
        </p>

        <div className="border mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">خلاصه:</h2>
          <p className="text-gray-700 text-justify mt-4">{abstract}</p>
        </div>

        <div className="border mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">
            اطلاعات مقاله:
          </h2>
          <ul className="flex items-center gap-2 text-gray-700 mt-4">
            {DOI && <span
              onClick={() => handleQuery("DOI", DOI)}
              className="cursor-pointer bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-blue-300"
            >
              DOI:
              {DOI}
            </span>}

            {ISBN && <span
              onClick={() => handleQuery("ISBN", ISBN)}
              className="cursor-pointer bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-blue-300"
            >
              ISBN:
              {ISBN}
            </span>}

            {ISNN && <span
              onClick={() => handleQuery("ISNN", ISNN)}
              className="cursor-pointer bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-blue-300"
            >
              ISNN:
              {ISNN}
            </span>}

            {page && <span
              onClick={() => handleQuery("pageCount", page)}
              className="cursor-pointer bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-blue-300"
            >
              صفحات: {page}
            </span>}

            {issue && <span
              onClick={() => handleQuery("issue", issue.toString())}
              className="cursor-pointer bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-blue-300"
            >
              شماره: {issue}
            </span>}

            {volume && <span
              onClick={() => handleQuery("volume", volume.toString())}
              className="cursor-pointer bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-blue-300"
            >
              جلد: {volume}
            </span>}
          </ul>
        </div>

        <div className="border mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">نویسندگان:</h2>
          <Authors authors={authors} />
        </div>

        <div className="border mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">ثبت کننده:</h2>
          <span className="bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors mt-8 hover:bg-blue-300">
            {registrar.first_name} {registrar.last_name}
          </span>
        </div>

        {tags && <div className="border mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">برچسب‌ها:</h2>
          <Tags tags={tags} />
        </div>
        }
        {keywords && <div className="border mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">کلمات کلیدی :</h2>
          <Tags tags={keywords} />
        </div>
        }
        <div className="border mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">انتشارات:</h2>
          <p
            onClick={() =>
              handleQuery("publication", publication?.title!)
            }
            className="cursor-pointer text-gray-700 mt-4"
          >
            {publication?.title}
          </p>
        </div>

        <a
          href={URL}
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
