"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BlogCard from "../organisms/BlogCard";
import { ToastNotify } from "@/utils/helper";
import { deleteBlog } from "@/app/actions/blog/deleteBlog";
import { DeleteModal } from "./DeleteModal";
import { blogSchema } from "@/types/declarations/selectInp";

type Props = {
  blogs: any[];
  lesanUrl: string;
};

const ClientDashboard = ({ blogs, lesanUrl }: Props) => {
  const router = useRouter();
  const [blogToDelete, setBlogToDelete] = useState<blogSchema | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHardCascade, setIsHardCascade] = useState(false);

  const confirmDelete = (blog: blogSchema) => {
    setBlogToDelete(blog);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;

    const result = await deleteBlog(blogToDelete._id!, isHardCascade);

    if (result.success) {
      ToastNotify("success", "بلاگ با موفقیت حذف شد");
      router.refresh();
    } else {
      ToastNotify("error", `خطا در حذف بلاگ - ${result.body.message.slice(0, 100)}`);
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

  return (
    <div className="mt-6">
      <div className="absolute top-4 left-4 mb-4 flex justify-end">
        <button
          onClick={() => router.push("/admin/blog/new-blog")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          افزودن بلاگ جدید
        </button>
      </div>

      <div className="space-y-4">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              _id={blog._id}
              title={blog.title}
              subtitle={blog.subtitle || ""}
              abstract={blog.abstract}
              pic={blog.pic}
              isInSwipper={blog.isInSwipper}
              onDelete={() => confirmDelete(blog)}
              lesanUrl={lesanUrl}
            />
          ))
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600">هیچ بلاگی یافت نشد</p>
          </div>
        )}
      </div>

      <DeleteModal
        isVisible={isModalOpen}
        onConfirm={handleDelete}
        onCancel={handleCancel}
        message={`آیا از حذف این بلاگ پست: "${blogToDelete?.title}" مطمئن هستید؟ این عملیات غیرقابل بازگشت است.`}
        isHardCascade={isHardCascade}
        onHardCascadeChange={setIsHardCascade}
      />
    </div>
  );
};

export default ClientDashboard;
