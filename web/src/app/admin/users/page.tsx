"use client";
import ModalArticle from "@/components/template/ModalArticle";
import React, { useState } from "react";

const ArticleDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">بخش کاربران</h1>
      <p className="text-gray-600">خوش آمدید!</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => setIsModalOpen(true)}
      >
        ایجاد کاربر جدید
      </button>
      <ModalArticle isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default ArticleDashboard;
