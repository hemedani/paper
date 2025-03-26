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
  isOwn?: boolean;
}

const ClientArticleDashboard: React.FC<ClientArticleProps> = ({ articles, isOwn }) => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isHardCascade, setIsHardCascade] = useState(false);

  const handleDeleteClick = (article: Article) => {
    setSelectedArticle(article);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedArticle) return;

    const deletedBlog = await deleteArticle(selectedArticle._id, isHardCascade);

    if (deletedBlog.success) {
      ToastNotify(
        "success",
        `مقاله "${selectedArticle.title}" با موفقیت حذف شد.`
      );
      router.refresh();
    } else {
      ToastNotify(
        "error",
        `ناموفق بود - ${deletedBlog.body.message.slice(0, 100)}`
      );
    }
    setIsModalVisible(false);
    setSelectedArticle(null);
    setIsHardCascade(false);
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setSelectedArticle(null);
    setIsHardCascade(false);
  };

  return (
    <div className="mt-2 relative">
      {isOwn === false || isOwn === undefined && (
        <div className="mb-6 flex justify-end">
          <Link
            href="/admin/articles/createArticle"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors shadow-sm flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            افزودن مقاله جدید
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard
                key={article._id}
                title={article.title}
                articleType={article.articleType}
                _id={article._id}
                isOwn={isOwn}
                onDelete={() => handleDeleteClick(article)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center border border-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-600 font-medium text-lg">
              هیچ مقاله‌ای یافت نشد
            </p>
            <p className="text-gray-500 mt-1">
              برای افزودن مقاله جدید از دکمه بالا استفاده کنید
            </p>
          </div>
        )}
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
