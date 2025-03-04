"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Blog {
  _id: string;
  abstract: string;
  pic: { _id: string; name: string; type: string };
  isInSwipper: string;
  title: string;
  subtitle: string;
}

interface ClientDashboardProps {
  blogs: Blog[];
}

const ClientBlogDashboard: React.FC<ClientDashboardProps> = ({ blogs }) => {
  const router = useRouter();
  // const [hardCascade, setHardCascade] = useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() => router.push("/admin/blog/create-blog")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        ایجاد وبلاگ جدید
      </button>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs?.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-xl shadow-md overflow-hidden w-64"
          >
            <img
              src={`http://127.0.0.1:1382 /uploads/images/${blog.pic.name}`}
              alt={blog.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold truncate">{blog.title}</h2>
              <p className="text-gray-600 text-sm line-clamp-2">
                {blog.abstract}
              </p>
              <a
                href={`/blog/${blog._id}`}
                className="text-blue-500 text-sm mt-2 inline-block"
              >
                ادامه مطلب ←
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientBlogDashboard;

interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}
export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  image,
  link,
}) => {
  return <div></div>;
};
