import { StatCard } from "@/components/organisms/InfoBox";

const AdminDashboard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">پنل ادمین</h1>
      <p className="text-gray-600">خوش آمدید!</p>
      <div className="flex justify-evenly items-center mt-10 gap-2">
        <StatCard description="میزان بازدید در ماه" title="بازدیــد" value={10500} bgColor="bg-red-500"  />
        <StatCard description="تعداد کاربران سایت" title="کاربران" value={1000} bgColor="bg-blue-500"  />
        <StatCard description="مجموع مقالات ایجاد شده" title="مقالات" value={12500} bgColor="bg-green-500"  />
      </div>
    </div>
  );
};

export default AdminDashboard;
