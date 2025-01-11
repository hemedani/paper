"use client";

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
  return (
    <div>
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
