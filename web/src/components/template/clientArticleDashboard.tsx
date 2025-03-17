"use client";

import React, { useState } from "react";
import ArticleCard from "../organisms/ArticleCard";
import { DeleteModal } from "./DeleteModal";
import { deleteArticle } from "@/app/actions/article/removeArticle";
import { ToastNotify } from "@/utils/helper";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Article {
  _id: string;
  title: string;
  articleType: string;
}

interface ClientArticleProps {
  articles: Article[];
}

const ClientArticleDashboard: React.FC<ClientArticleProps> = ({ articles }) => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // State for hard cascade
  const [isHardCascade, setIsHardCascade] = useState(false);

  const handleDeleteClick = (article: Article) => {
    setSelectedArticle(article);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedArticle) return;

    try {
      const isSuccess = await deleteArticle(selectedArticle._id, isHardCascade);
      if (isSuccess) {
        ToastNotify(
          "success",
          `مقاله "${selectedArticle.title}" با موفقیت حذف شد.`
        );
        router.refresh();
      }
    } catch (error) {
      console.error("خطا در حذف مقاله:", error);
      alert("مشکلی در حذف مقاله به وجود آمده است.");
    } finally {
      setIsModalVisible(false);
      setSelectedArticle(null);
      setIsHardCascade(false); // Reset hard cascade
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setSelectedArticle(null);
    setIsHardCascade(false); // Reset hard cascade
  };

  return (
    <div>
      <Link
        href="/admin/articles/createArticle"
        className="absolute top-1 left-5 mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" >
        ایجاد مقاله جدید
      </Link>


      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles?.map((article) => (
          <ArticleCard
            key={article._id}
            title={article.title}
            articleType={article.articleType}
            _id={article._id}
            onDelete={() => handleDeleteClick(article)}
          />
        ))}
      </div>

      <DeleteModal
        isVisible={isModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message={`آیا از حذف مقاله "${selectedArticle?.title}" مطمئن هستید؟ این عملیات غیرقابل بازگشت است.`}
        isHardCascade={isHardCascade}
        onHardCascadeChange={setIsHardCascade}
      />
    </div>
  );
};

export default ClientArticleDashboard;
