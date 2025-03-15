"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const ChatbotPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Effect to toggle body overflow based on modal state
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup: Remove class when component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-indigo-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-15%] right-[-15%] w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-20 px-4 md:pt-24 md:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6 animate-fade-in">
            چت‌بات هوشمند آینده
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed animate-fade-in delay-200">
            تجربه‌ای متفاوت با هوش مصنوعی پیشرفته که به زودی در دسترس شما قرار خواهد گرفت.
          </p>
          <div className="flex justify-center">
            <span className="inline-block px-6 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium animate-fade-in delay-400">
              به زودی ...
            </span>
          </div>
        </div>
      </section>

      {/* Feature Preview Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">پاسخگویی سریع</h3>
            <p className="text-gray-600 text-sm">پاسخ‌هایی دقیق و فوری به سوالات شما.</p>
          </div>
          <div className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">هوشمند و انعطاف‌پذیر</h3>
            <p className="text-gray-600 text-sm">یادگیری مداوم برای تجربه‌ای بهتر.</p>
          </div>
          <div className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">پشتیبانی 24/7</h3>
            <p className="text-gray-600 text-sm">همیشه در کنار شما، بدون وقفه.</p>
          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60 backdrop-blur-md transition-all duration-500">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 transform scale-100 transition-transform duration-300 animate-modal-in">
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-4 text-center">
              در حال آماده سازی ...
            </h2>
            <p className="text-gray-600 text-center mb-6">
              این قابلیت به زودی در دسترس خواهد بود. از صبر شما سپاسگزاریم!
            </p>
            <Link
              href="/"
              className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => setIsModalOpen(false)} // Close modal when clicking the link
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPage;
