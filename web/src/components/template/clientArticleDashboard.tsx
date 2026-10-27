"use client";

import React, { useState } from "react";
import ArticleCard from "../organisms/ArticleCard";
import { DeleteModal } from "./DeleteModal";
import { deleteArticle } from "@/app/actions/article/removeArticle";
import { ToastNotify } from "@/utils/helper";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AdminEmptyState,
  AdminIcon,
  AdminPanel,
  btn,
} from "../organisms/admin/AdminUI";

interface Article {
  _id: string;
  title: string;
  articleType: string;
}

interface ClientArticleProps {
  articles: Article[];
  isOwn?: boolean;
}

const ClientArticleDashboard: React.FC<ClientArticleProps> = ({
  articles,
  isOwn,
}) => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isHardCascade, setIsHardCascade] = useState(false);

  const canManage = isOwn === false || isOwn === undefined;

  const handleDeleteClick = (article: Article) => {
    setSelectedArticle(article);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedArticle) return;

    const deletedBlog = await deleteArticle(selectedArticle._id, isHardCascade);

    if (deletedBlog.success) {
      ToastNotify("success", `مقاله "${selectedArticle.title}" با موفقیت حذف شد.`);
      router.refresh();
    } else {
      ToastNotify("error", `ناموفق بود - ${deletedBlog.body.message.slice(0, 100)}`);
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

  const createButton = canManage ? (
    <Link href="/admin/articles/createArticle" className={btn.primary}>
      {AdminIcon.plus}
      مقاله جدید
    </Link>
  ) : null;

  return (
    <>
      <AdminPanel
        title="فهرست مقالات"
        description={articles?.length ? undefined : "هنوز مقاله‌ای ثبت نشده است"}
        icon={AdminIcon.book}
        actions={createButton}
        bodyClassName="p-4"
      >
        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
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
          <AdminEmptyState
            title="هیچ مقاله‌ای یافت نشد"
            description="برای افزودن مقاله جدید از دکمه زیر استفاده کنید یا فیلترهای جستجو را تغییر دهید."
            icon={AdminIcon.book}
            action={createButton}
          />
        )}
      </AdminPanel>

      <DeleteModal
        isVisible={isModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="حذف مقاله"
        subject={selectedArticle?.title}
        message="این عملیات قابل بازگشت نیست و مقاله برای همیشه حذف می‌شود."
        isHardCascade={isHardCascade}
        onHardCascadeChange={setIsHardCascade}
      />
    </>
  );
};

export default ClientArticleDashboard;
