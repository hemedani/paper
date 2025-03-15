import React from "react";

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="relative bg-cover bg-center h-72 md:h-96"
        style={{ backgroundImage: "url(/images/terms.jpg)" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            شرایط استفاده
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-4">
            1. پذیرش شرایط
          </h2>
          <p className="text-gray-700 leading-relaxed">
            استفاده از این وبسایت به منزله پذیرش کامل شرایط و ضوابط مندرج در این
            صفحه است.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-4">
            2. تغییرات در شرایط
          </h2>
          <p className="text-gray-700 leading-relaxed">
            ما حق داریم این شرایط را در هر زمان تغییر دهیم و تغییرات از طریق
            وبسایت اطلاع‌رسانی خواهد شد.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-4">
            3. استفاده مجاز
          </h2>
          <p className="text-gray-700 leading-relaxed">
            کاربران موظف‌اند از وبسایت به‌صورت قانونی استفاده کنند و از هرگونه
            فعالیت غیرمجاز خودداری کنند.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
