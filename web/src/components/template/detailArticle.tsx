"use client";

import { useRouter } from "next/navigation";
import { translateArticleType } from "@/utils/helper";
import { articleSchema } from "@/types/declarations/selectInp";

export const DetailArticle = ({ article }: { article: articleSchema }) => {
  const router = useRouter();

  const handleQuery = (queryType: string, value: string) => {
    const query = new URLSearchParams();
    query.append(queryType, value);
    router.push(`/?${query}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-8 px-4 sm:px-6 lg:px-8 dir-rtl">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-fade-in">
        {/* Header Section with enhanced gradient and animation */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-500 opacity-90" />
          <div className="relative p-8 sm:p-12">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-4 animate-slide-down">
              {article.title}
            </h1>
            <p
              className="text-xl font-medium text-white/90 hover:text-white cursor-pointer transition-all duration-300 animate-fade-in-delay"
              onClick={() => handleQuery("articleType", article.articleType)}
            >
              {translateArticleType(article.articleType)}
            </p>
          </div>
        </div>

        {/* Main Content with enhanced sections */}
        <div className="p-8 space-y-12">
          {/* Abstract Section */}
          <section className="bg-gradient-to-r from-indigo-50/50 to-cyan-50/50 p-6 rounded-2xl animate-slide-up">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4 border-r-4 border-indigo-500 pr-4">
              خلاصه مقاله
            </h2>
            <p className="text-gray-700 text-justify leading-relaxed text-lg">
              {article.abstract}
            </p>
          </section>

          {/* Article Metadata with Grid Layout */}
          <section className="bg-white p-6 rounded-2xl shadow-lg animate-slide-up-delay">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-r-4 border-indigo-500 pr-4">
              اطلاعات مقاله
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetadataItem
                label="شماره مقاله"
                value={article.key}
                onClick={() => handleQuery("key", article.key)}
              />
              <MetadataItem
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
                <MetadataItem
                  label="ISBN"
                  value={article.ISBN}
                  onClick={() => handleQuery("ISBN", article.ISBN)}
                />
              )}
              {article.ISNN && (
                <MetadataItem
                  label="ISNN"
                  value={article.ISNN}
                  onClick={() => handleQuery("ISNN", article.ISNN)}
                />
              )}
              {article.DOI && (
                <MetadataItem
                  label="DOI"
                  value={article.DOI}
                  onClick={() => handleQuery("DOI", article.DOI)}
                />
              )}
              {article.page && (
                <MetadataItem
                  label="صفحات"
                  value={article.page}
                  onClick={() => handleQuery("pageCount", article.page)}
                />
              )}
              {article.issue && (
                <MetadataItem
                  label="شماره"
                  value={article.issue.toString()}
                  onClick={() => handleQuery("issue", article.issue.toString())}
                />
              )}
              {article.volume && (
                <MetadataItem
                  label="جلد"
                  value={article.volume.toString()}
                  onClick={() =>
                    handleQuery("volume", article.volume.toString())
                  }
                />
              )}
            </div>
          </section>

          {article.authors && article.authors.length > 0 && (
            <section className="bg-gradient-to-r from-indigo-50/50 to-cyan-50/50 p-6 rounded-2xl animate-slide-up-delay-6">
              <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-r-4 border-indigo-500 pr-4">
                نویسندگان
              </h2>
              {article.authors.map((author) => (
                <p
                  key={author._id}
                  className="text-lg text-indigo-700 cursor-pointer hover:text-indigo-900 transition-all duration-300 bg-white px-6 py-3 rounded-full inline-block shadow-sm hover:shadow-md hover:scale-105"
                  onClick={() => handleQuery("authorIds", author._id!)}
                >
                  {author.first_name} {author.last_name}
                </p>
              ))}
            </section>
          )}

          {/* Favorite Users with Enhanced Visual */}
          {article.favByUsers && article.favByUsers.length > 0 && (
            <section className="bg-gradient-to-r from-indigo-50/50 to-cyan-50/50 p-6 rounded-2xl animate-slide-up-delay-4">
              <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-r-4 border-indigo-500 pr-4">
                کاربران علاقه‌مند
              </h2>
              <div className="flex flex-wrap gap-3">
                {article.favByUsers.map((user, index) => (
                  <span
                    key={user._id}
                    className="bg-white px-4 py-2 rounded-full text-indigo-700 font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 animate-pop-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {user.first_name} {user.last_name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Publication Info */}
          {article.publication && (
            <section className="bg-gradient-to-r from-indigo-50/50 to-cyan-50/50 p-6 rounded-2xl animate-slide-up-delay-6">
              <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-r-4 border-indigo-500 pr-4">
                انتشارات
              </h2>
              <p
                className="text-lg text-indigo-700 cursor-pointer hover:text-indigo-900 transition-all duration-300 bg-white px-6 py-3 rounded-full inline-block shadow-sm hover:shadow-md hover:scale-105"
                onClick={() => {
                  if (article.publication?.title) {
                    handleQuery("publication", article.publication.title);
                  }
                }}
              >
                {article.publication.title}
              </p>
            </section>
          )}

          {article.tags && article.tags.length > 0 && (
            <section className="bg-gradient-to-r from-indigo-50/50 to-cyan-50/50 p-6 rounded-2xl animate-slide-up-delay-6">
              <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-r-4 border-indigo-500 pr-4">
                برچسب ها
              </h2>
              {article.tags.map((tag) => (
                <p
                  key={tag._id}
                  className="text-lg text-indigo-700 cursor-pointer hover:text-indigo-900 transition-all duration-300 bg-white px-6 py-3 rounded-full inline-block shadow-sm hover:shadow-md hover:scale-105"
                  onClick={() => handleQuery("tagIds", tag._id!)}
                >
                  {tag.name}
                </p>
              ))}
            </section>
          )}

          {article.keywords && article.keywords.length > 0 && (
            <section className="bg-gradient-to-r from-indigo-50/50 to-cyan-50/50 p-6 rounded-2xl animate-slide-up-delay-6">
              <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-r-4 border-indigo-500 pr-4">
                کلمات کلیدی
              </h2>
              {article.keywords.map((keyword) => (
                <p
                  key={keyword._id}
                  className="text-lg text-indigo-700 cursor-pointer hover:text-indigo-900 transition-all duration-300 bg-white px-6 py-3 rounded-full inline-block shadow-sm hover:shadow-md hover:scale-105"
                  onClick={() => handleQuery("keywordIds", keyword._id!)}
                >
                  {keyword.name}
                </p>
              ))}
            </section>
          )}

          {/* Dates Section */}
          <section className="bg-white p-6 rounded-2xl shadow-lg animate-slide-up-delay-7">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-r-4 border-indigo-500 pr-4">
              تاریخ‌ها
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {article.createdAt && (
                <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 p-4 rounded-xl transform transition-all duration-300 hover:scale-[1.02]">
                  <span className="block text-indigo-900 font-semibold mb-2">
                    تاریخ ثبت:
                  </span>
                  <span className="text-indigo-700">
                    {new Date(article.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                </div>
              )}
              {article.updatedAt && (
                <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 p-4 rounded-xl transform transition-all duration-300 hover:scale-[1.02]">
                  <span className="block text-indigo-900 font-semibold mb-2">
                    تاریخ به‌روزرسانی:
                  </span>
                  <span className="text-indigo-700">
                    {new Date(article.updatedAt).toLocaleDateString("fa-IR")}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* Files Section */}
          {(article.avatar || article.doc) && (
            <section className="bg-gradient-to-r from-indigo-50/50 to-cyan-50/50 p-6 rounded-2xl animate-slide-up-delay-8">
              <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-r-4 border-indigo-500 pr-4">
                فایل‌ها
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {article.avatar && (
                  <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                    <span className="block text-indigo-900 font-semibold mb-2">
                      آواتار:
                    </span>
                    <span className="text-gray-700">
                      {article.avatar.name} (
                      {formatFileSize(article.avatar.size)})
                    </span>
                  </div>
                )}
                {article.doc && (
                  <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                    <span className="block text-indigo-900 font-semibold mb-2">
                      سند:
                    </span>
                    <span className="text-gray-700">
                      {article.doc.name} ({formatFileSize(article.doc.size)})
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}

          <section className="bg-white p-6 rounded-2xl shadow-lg animate-slide-up-delay-3">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-r-4 border-indigo-500 pr-4">
              ثبت‌کننده
            </h2>
            <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 p-6 rounded-xl transform transition-all duration-300 hover:scale-[1.02]">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <span className="bg-white px-4 py-2 rounded-full text-indigo-700 font-medium shadow-sm">
                    {article.registrar.first_name} {article.registrar.last_name}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Download Button */}
          {article.URL && (
            <div className="text-center mt-12 animate-bounce-in">
              <a
                href={article.URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-full font-bold text-lg hover:from-indigo-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                دانلود مقاله
                <svg
                  className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:translate-y-1"
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
    </div>
  );
};

// Helper Components
const MetadataItem = ({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string;
  onClick?: () => void;
}) => (
  <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 p-4 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-105">
    <span className="block text-indigo-900 font-semibold mb-2">{label}:</span>
    <span
      className="text-indigo-700 cursor-pointer hover:text-indigo-900 transition-colors duration-300"
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
