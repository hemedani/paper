"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BlogCard from "../organisms/BlogCard";
import { ToastNotify } from "@/utils/helper";
import { deleteBlog } from "@/app/actions/blog/deleteBlog";
import { DeleteModal } from "./DeleteModal";
import { blogSchema } from "@/types/declarations/selectInp";
import Link from "next/link";
import {
  AdminEmptyState,
  AdminIcon,
  AdminPanel,
  btn,
} from "../organisms/admin/AdminUI";

type Props = {
  blogs: blogSchema[];
  lesanUrl: string;
  isOwn?: boolean;
};

const ClientDashboard = ({ blogs, lesanUrl, isOwn }: Props) => {
  const router = useRouter();
  const [blogToDelete, setBlogToDelete] = useState<blogSchema | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHardCascade, setIsHardCascade] = useState(false);

  const canManage = isOwn === false || isOwn === undefined;

  const confirmDelete = (blog: blogSchema) => {
    setBlogToDelete(blog);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;

    const result = await deleteBlog(blogToDelete._id!, isHardCascade);

    if (result.success) {
      ToastNotify("success", "پست وبلاگ با موفقیت حذف شد");
      router.refresh();
    } else {
      ToastNotify("error", `خطا در حذف پست وبلاگ - ${result.body.message.slice(0, 100)}`);
    }

    setIsModalOpen(false);
    setBlogToDelete(null);
    setIsHardCascade(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setBlogToDelete(null);
    setIsHardCascade(false);
  };

  const createButton = canManage ? (
    <Link href="/admin/blog/new-blog" className={btn.primary}>
      {AdminIcon.plus}
      پست وبلاگ جدید
    </Link>
  ) : null;

  return (
    <>
      <AdminPanel
        title="فهرست پست‌های وبلاگ"
        description={blogs?.length ? undefined : "هنوز پستی ثبت نشده است"}
        icon={AdminIcon.rss}
        actions={createButton}
        bodyClassName="p-4"
      >
        {blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                {...blog}
                onDelete={() => confirmDelete(blog)}
                lesanUrl={lesanUrl}
                isOwn={isOwn}
              />
            ))}
          </div>
        ) : (
          <AdminEmptyState
            title="هیچ پستی یافت نشد"
            description="برای افزودن پست جدید از دکمه زیر استفاده کنید یا عبارت جستجو را تغییر دهید."
            icon={AdminIcon.rss}
            action={createButton}
          />
        )}
      </AdminPanel>

      <DeleteModal
        isVisible={isModalOpen}
        onConfirm={handleDelete}
        onCancel={handleCancel}
        title="حذف پست وبلاگ"
        subject={blogToDelete?.title}
        message="این عملیات قابل بازگشت نیست و پست وبلاگ برای همیشه حذف می‌شود."
        isHardCascade={isHardCascade}
        onHardCascadeChange={setIsHardCascade}
      />
    </>
  );
};

export default ClientDashboard;
