"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { translateArticleType } from "@/utils/helper";
import { articleSchema } from "@/types/declarations/selectInp";
import { useState, useEffect } from "react";

// Type definition for related articles props
type RelatedArticlesProps = {
  articles: articleSchema[];
  currentArticle: articleSchema;
};

export const DetailArticle = ({ article }: { article: articleSchema }) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  // Sample related articles - in a real app, these would come from an API or prop
  const [relatedArticles, setRelatedArticles] = useState<articleSchema[]>([]);

  useEffect(() => {
    setIsLoaded(true);
    // In a real implementation, you would fetch related articles here
    // This is a placeholder for demonstration purposes
    setRelatedArticles([]);
  }, []);

  const handleQuery = (queryType: string, value: string) => {
    const query = new URLSearchParams();
    query.append(queryType, value);
    router.push(`/?${query}`);
  };

  // Format date to Persian
  const formatDate = (dateString: string | Date) => {
    try {
      const date =
        typeof dateString === "string" ? new Date(dateString) : dateString;

      return date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "";
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-blue-50 to-white dir-rtl transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Hero Section with Parallax Effect */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('/patterns/topography.svg')]"></div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-28 md:py-32">
          <div className="flex flex-col items-center text-center">
            <div
              className="inline-block mb-6 px-4 py-1.5 bg-indigo-100 bg-opacity-20 backdrop-blur-sm rounded-full text-white text-sm font-medium transform hover:scale-105 transition duration-300 cursor-pointer"
              onClick={() => handleQuery("articleType", article.articleType)}
            >
              {translateArticleType(article.articleType)}
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight max-w-4xl">
              {article.title}
            </h1>

            <div className="flex items-center space-x-4 space-x-reverse mt-4">
              <div className="flex items-center">
                <span className="text-indigo-100 text-sm">
                  {article.createdAt && formatDate(article.createdAt)}
                </span>
              </div>

              {article.authors && article.authors.length > 0 && (
                <>
                  <div className="w-1 h-1 bg-indigo-200 rounded-full"></div>
                  <div className="flex items-center">
                    <span className="text-indigo-100 text-sm">
                      نویسندگان:{" "}
                      {article.authors.map((author, index) => (
                        <span
                          key={author._id}
                          className="cursor-pointer hover:text-white transition-colors duration-300"
                          onClick={() => handleQuery("authorIds", author._id!)}
                        >
                          {author.first_name} {author.last_name}
                          {index < (article.authors?.length || 0) - 1
                            ? "، "
                            : ""}
                        </span>
                      ))}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 mb-10 lg:mb-0">
            <div className="sticky top-10 space-y-8">
              {/* Article Info Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="bg-gradient-to-r from-indigo-700 to-purple-700 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">
                    اطلاعات مقاله
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  <InfoItem
                    label="شناسه مقاله"
                    value={article.key}
                    onClick={() => handleQuery("key", article.key)}
                  />

                  <InfoItem
                    label="سال انتشار"
                    value={article.publicationYear.toString()}
                    onClick={() =>
                      handleQuery(
                        "publicationYear",
                        article.publicationYear.toString()
                      )
                    }
                  />

                  {article.ISBN && (
                    <InfoItem
                      label="ISBN"
                      value={article.ISBN}
                      onClick={() => handleQuery("ISBN", article.ISBN)}
                    />
                  )}

                  {article.ISNN && (
                    <InfoItem
                      label="ISNN"
                      value={article.ISNN}
                      onClick={() => handleQuery("ISNN", article.ISNN)}
                    />
                  )}

                  {article.DOI && (
                    <InfoItem
                      label="DOI"
                      value={article.DOI}
                      onClick={() => handleQuery("DOI", article.DOI)}
                    />
                  )}

                  {article.page && (
                    <InfoItem
                      label="صفحات"
                      value={article.page}
                      onClick={() => handleQuery("pageCount", article.page)}
                    />
                  )}

                  {article.issue && (
                    <InfoItem
                      label="شماره"
                      value={article.issue.toString()}
                      onClick={() =>
                        handleQuery("issue", article.issue.toString())
                      }
                    />
                  )}

                  {article.volume && (
                    <InfoItem
                      label="جلد"
                      value={article.volume.toString()}
                      onClick={() =>
                        handleQuery("volume", article.volume.toString())
                      }
                    />
                  )}
                </div>
              </div>

              {/* Publication Card */}
              {article.publication && (
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="bg-gradient-to-r from-indigo-700 to-purple-700 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">انتشارات</h2>
                  </div>

                  <div className="p-6">
                    <span
                      className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full hover:bg-indigo-100 transition-colors duration-300 cursor-pointer"
                      onClick={() =>
                        article.publication?.title &&
                        handleQuery("publication", article.publication.title)
                      }
                    >
                      {article.publication.title}
                    </span>
                  </div>
                </div>
              )}

              {/* Download Button */}
              {article.URL && (
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
                  <a
                    href={article.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <span>دانلود مقاله</span>
                    <svg
                      className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Abstract Section */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 mb-8 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-r-4 border-indigo-500 pr-4">
                  خلاصه مقاله
                </h2>
                <p className="text-gray-700 text-justify leading-relaxed text-lg">
                  {article.abstract}
                </p>
              </div>
            </div>

            {/* Tags, Keywords and Metadata */}
            <div className="space-y-8">
              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-r-4 border-indigo-500 pr-4">
                    برچسب‌ها
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag._id}
                        className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors duration-300 cursor-pointer"
                        onClick={() => handleQuery("tagIds", tag._id!)}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Keywords */}
              {article.keywords && article.keywords.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-r-4 border-indigo-500 pr-4">
                    کلیدواژه‌ها
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {article.keywords.map((keyword) => (
                      <span
                        key={keyword._id}
                        className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors duration-300 cursor-pointer"
                        onClick={() => handleQuery("keywordIds", keyword._id!)}
                      >
                        {keyword.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Liked by users */}
              {article.favByUsers && article.favByUsers.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-r-4 border-indigo-500 pr-4">
                    کاربران علاقه‌مند
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {article.favByUsers.map((user) => (
                      <span
                        key={user._id}
                        className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full text-sm font-medium"
                      >
                        {user.first_name} {user.last_name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Registrar */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-r-4 border-indigo-500 pr-4">
                  ثبت‌کننده
                </h2>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {article.registrar.first_name.charAt(0)}
                  </div>
                  <span className="mr-3 text-gray-700">
                    {article.registrar.first_name} {article.registrar.last_name}
                  </span>
                </div>
              </div>

              {/* Dates Section */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-r-4 border-indigo-500 pr-4">
                  تاریخ‌ها
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {article.createdAt && (
                    <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-xl">
                      <span className="block text-indigo-900 font-semibold mb-1">
                        تاریخ ثبت:
                      </span>
                      <span className="text-indigo-700">
                        {formatDate(article.createdAt)}
                      </span>
                    </div>
                  )}
                  {article.updatedAt && (
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl">
                      <span className="block text-purple-900 font-semibold mb-1">
                        تاریخ به‌روزرسانی:
                      </span>
                      <span className="text-purple-700">
                        {formatDate(article.updatedAt)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Files Section */}
              {(article.avatar || article.doc) && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-r-4 border-indigo-500 pr-4">
                    فایل‌ها
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {article.avatar ? (
                      <div className="bg-blue-50 p-4 rounded-xl flex items-center">
                        <svg
                          className="w-8 h-8 text-blue-500 ml-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <div>
                          <span className="block text-blue-900 font-semibold">
                            تصویر:
                          </span>
                          <span className="text-blue-700 text-sm">
                            {article.avatar.name} (
                            {formatFileSize(article.avatar.size)})
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full w-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-white opacity-60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                    )}
                    {article.doc && (
                      <div className="bg-green-50 p-4 rounded-xl flex items-center">
                        <svg
                          className="w-8 h-8 text-green-500 ml-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          ></path>
                        </svg>
                        <div>
                          <span className="block text-green-900 font-semibold">
                            سند:
                          </span>
                          <span className="text-green-700 text-sm">
                            {article.doc.name} (
                            {formatFileSize(article.doc.size)})
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 mt-8 bg-gradient-to-b from-white to-blue-50 rounded-3xl">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-12 text-center relative">
          <span className="relative inline-block">
            مقالات مرتبط
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          </span>
        </h2>

        {/* From the same publisher */}
        {article.publication && (
          <RelatedArticlesSection
            title="از همین انتشارات"
            articles={relatedArticles.filter(
              (relArticle) =>
                relArticle.publication?._id === article.publication?._id &&
                relArticle._id !== article._id
            )}
            emptyMessage="در حال حاضر مقاله‌ای از این انتشارات موجود نیست"
            bgColor="from-indigo-50 to-indigo-100"
            iconColor="text-indigo-500"
          />
        )}

        {/* From the same authors */}
        {article.authors && article.authors.length > 0 && (
          <RelatedArticlesSection
            title="از همین نویسندگان"
            articles={relatedArticles.filter(
              (relArticle) =>
                relArticle.authors?.some((author) =>
                  article.authors?.some(
                    (currAuthor) => currAuthor._id === author._id
                  )
                ) && relArticle._id !== article._id
            )}
            emptyMessage="در حال حاضر مقاله‌ای از این نویسندگان موجود نیست"
            bgColor="from-purple-50 to-purple-100"
            iconColor="text-purple-500"
          />
        )}

        {/* With the same tags */}
        {article.tags && article.tags.length > 0 && (
          <RelatedArticlesSection
            title="با همین برچسب‌ها"
            articles={relatedArticles.filter(
              (relArticle) =>
                relArticle.tags?.some((tag) =>
                  article.tags?.some((currTag) => currTag._id === tag._id)
                ) && relArticle._id !== article._id
            )}
            emptyMessage="در حال حاضر مقاله‌ای با این برچسب‌ها موجود نیست"
            bgColor="from-blue-50 to-blue-100"
            iconColor="text-blue-500"
          />
        )}

        {/* With the same keywords */}
        {article.keywords && article.keywords.length > 0 && (
          <RelatedArticlesSection
            title="با همین کلیدواژه‌ها"
            articles={relatedArticles.filter(
              (relArticle) =>
                relArticle.keywords?.some((keyword) =>
                  article.keywords?.some(
                    (currKeyword) => currKeyword._id === keyword._id
                  )
                ) && relArticle._id !== article._id
            )}
            emptyMessage="در حال حاضر مقاله‌ای با این کلیدواژه‌ها موجود نیست"
            bgColor="from-teal-50 to-teal-100"
            iconColor="text-teal-500"
          />
        )}
      </div>
    </div>
  );
};

// Related Articles Section Component
const RelatedArticlesSection = ({
  title,
  articles,
  emptyMessage,
  bgColor,
  iconColor,
}: {
  title: string;
  articles: articleSchema[];
  emptyMessage: string;
  bgColor: string;
  iconColor: string;
}) => {
  return (
    <div className="mb-12 last:mb-0">
      <div className={`p-6 rounded-2xl bg-gradient-to-r ${bgColor} mb-6`}>
        <h3 className="text-xl font-bold flex items-center gap-2">
          <svg
            className={`w-6 h-6 ${iconColor}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          {title}
        </h3>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

// Article Card Component
const ArticleCard = ({ article }: { article: articleSchema }) => {
  // Format date to Persian - reused from parent component
  const formatDate = (dateString: string | Date) => {
    try {
      const date =
        typeof dateString === "string" ? new Date(dateString) : dateString;

      return date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "";
    }
  };

  return (
    <Link href={`/article/${article._id}`} passHref>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
        <div className="relative h-40 w-full">
          {article.avatar ? (
            <Image
              src={"/images/default-article.jpg"}
              alt={article.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white opacity-60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          )}
          {article.articleType && (
            <div className="absolute top-3 right-3 px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full">
              {translateArticleType(article.articleType)}
            </div>
          )}
        </div>

        <div className="p-5 flex-grow flex flex-col">
          <h4 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            {article.title}
          </h4>

          <p className="text-gray-600 mb-4 text-sm line-clamp-3">
            {article.abstract?.substring(0, 120)}...
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xs text-gray-500">
                {article.createdAt && formatDate(article.createdAt)}
              </span>
            </div>
            <span className="text-indigo-600 text-sm font-medium">
              مشاهده مقاله
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Helper Components
const InfoItem = ({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string;
  onClick?: () => void;
}) => (
  <div className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
    <span className="text-gray-500">{label}:</span>
    <span
      className="text-gray-800 hover:text-indigo-600 transition-colors duration-300 cursor-pointer font-medium"
      onClick={onClick}
    >
      {value}
    </span>
  </div>
);

// Helper Functions
const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + " بایت";
  const kb = bytes / 1024;
  if (kb < 1024) return kb.toFixed(1) + " کیلوبایت";
  const mb = kb / 1024;
  return mb.toFixed(1) + " مگابایت";
};
