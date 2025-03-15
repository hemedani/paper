import React from "react";

const ContactUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="relative bg-cover bg-center h-72 md:h-96"
        style={{ backgroundImage: "url(/images/contact.jpg)" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            تماس با ما
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center mb-12 max-w-2xl mx-auto">
          ما مشتاق شنیدن نظرات و سوالات شما هستیم. از طریق فرم زیر یا اطلاعات
          تماس با ما در ارتباط باشید.
        </p>

        <form className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 mb-12">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              نام
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-700 font-semibold mb-2"
            >
              پیام
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ارسال پیام
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">ایمیل</h3>
            <p className="text-gray-700">info@example.com</p>
          </div>
          <div className="text-center bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">تلفن</h3>
            <p className="text-gray-700">+98 912 345 6789</p>
          </div>
          <div className="text-center bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">آدرس</h3>
            <p className="text-gray-700">تهران، خیابان نمونه، پلاک ۱۲</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
