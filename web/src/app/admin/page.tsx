import { StatCard } from "@/components/organisms/InfoBox";
import { getCounts } from "../actions/user/dashboardStatistic";

const AdminDashboard = async () => {
  const data = await getCounts();
  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">پنل ادمین</h1>
      <p className="text-gray-600">خوش آمدید!</p>
      <div className="grid grid-cols-4 mt-10 gap-2">
        <StatCard
          description="دسته بندی های مربوطه"
          title="دسته بندی"
          value={data?.tags}
          bgColor="bg-red-500"
        />
        <StatCard
          description="تعداد کاربران سایت"
          title="کاربران"
          value={data?.users}
          bgColor="bg-blue-500"
        />
        <StatCard
          description="مجموع مقالات ایجاد شده"
          title="مقالات"
          value={data?.articles}
          bgColor="bg-green-500"
        />
        <StatCard
          description="مجموع انتشارات ایجاد شده"
          title="انتشارات"
          value={data?.publications}
          bgColor="bg-yellow-500"
        />
        <StatCard
          description="تعداد وبلاگ های سایت"
          title="وبلاگ"
          value={data?.blogs}
          bgColor="bg-blue-500"
        />
        <StatCard
          description="مجموع واژه های کلیدی ایجاد شده"
          title="واژه های کلیدی"
          value={data?.keywords}
          bgColor="bg-green-500"
        />
        <StatCard
          description="تعداد نویسندگان"
          title="نویسندگان"
          value={data?.authors}
          bgColor="bg-yellow-500"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
