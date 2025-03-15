import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-72 md:h-96"
        style={{ backgroundImage: 'url(/about-hero.jpg)' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            درباره ما
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <section className="mb-12 text-center">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            ما تیمی هستیم که به ترویج معماری اسلامی و ارائه منابع آموزشی باکیفیت اختصاص یافته‌ایم. هدف ما ارتقای دانش و آگاهی در این حوزه است.
          </p>
        </section>

        <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-8 text-center">تیم ما</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="text-center bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <img
              src="/team1.jpg"
              alt="عضو تیم ۱"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-blue-900">احمد رضایی</h3>
            <p className="text-gray-600">طراح و پژوهشگر معماری</p>
          </div>
          <div className="text-center bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <img
              src="/team2.jpg"
              alt="عضو تیم ۲"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-blue-900">سارا محمدی</h3>
            <p className="text-gray-600">متخصص محتوا</p>
          </div>
          <div className="text-center bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <img
              src="/team3.jpg"
              alt="عضو تیم ۳"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-blue-900">علی حسینی</h3>
            <p className="text-gray-600">توسعه‌دهنده وب</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
