"use client";

import { useRouter } from "next/navigation";
import ArticleCard from "../organisms/ArticleCard";

interface Article {
  _id: string;
  title: string;
  articleType: string;
}

interface ClientArticleProps {
  articles: Article[];
  searchQuery: string;
}

const ClientArticleDashboard: React.FC<ClientArticleProps> = ({ articles }) => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => router.push("/admin/articles/createArticle")}
        className="px-6 h-10 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-semibold rounded-md shadow hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
      >
        ایجاد مقاله جدید
      </button>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles?.map((article) => (
          <ArticleCard
            key={article._id}
            title={article.title}
            articleType={article.articleType}
            _id={article._id}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientArticleDashboard;
