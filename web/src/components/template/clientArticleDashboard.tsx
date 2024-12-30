"use client";

import ArticleCard from "../organisms/ArticleCard";
import ModalArticle from "./ModalArticle";

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
  const handleDelete = (id: string) => {
    // setArticleList((prevArticle) => prevArticle.filter((Article) => Article._id !== id));
  };

  const handleEdit = (id: string) => {
    // console.log(`ویرایش برچسب با آیدی ${id}`);
  };

  return (
    <div>
      <ModalArticle />
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
