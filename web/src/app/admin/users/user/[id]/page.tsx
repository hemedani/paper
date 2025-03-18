import { getUser } from "@/app/actions/user/getUser";
import { translateGender, translateLevel } from "@/utils/helper";
import { format } from "date-fns-jalali";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const userId = (await params).id;

  const { body, success } = await getUser(userId);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">

      {success ? (
        <>
          <h1 className="text-3xl text-gray-700 font-semibold mb-4">پنل کاربری</h1>
          <p className="text-gray-500 text-lg mb-6">خوش آمدید!</p>

          <div className="flex flex-col gap-6">
            <div className="flex justify-start w-full mb-6">
              <div className="border-4 border-dashed border-blue-500 w-32 h-32 rounded-lg bg-gradient-to-r from-blue-300 to-green-300 flex items-center justify-center text-white font-semibold text-2xl">
                {body.first_name}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <label className="block text-xs text-gray-600 mb-2">نام</label>
                <p className="text-gray-800 text-sm font-medium">
                  {body.first_name}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <label className="block text-xs text-gray-600 mb-2">
                  نام خانوادگی
                </label>
                <p className="text-gray-800 text-sm font-medium">
                  {body.last_name}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <label className="block text-xs text-gray-600 mb-2">نام پدر</label>
                <p className="text-gray-800 text-sm font-medium">
                  {body.father_name}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <label className="block text-xs text-gray-600 mb-2">
                  شماره تماس
                </label>
                <p className="text-gray-800 text-sm font-medium">{body.mobile}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <label className="block text-xs text-gray-600 mb-2">کد ملی</label>
                <p className="text-gray-800 text-sm font-medium">
                  {body.national_number}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <label className="block text-xs text-gray-600 mb-2">جنسیت</label>
                <p className="text-gray-800 text-sm font-medium">
                  {translateGender(body.gender)}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <label className="block text-xs text-gray-600 mb-2">مسئول</label>
                <p className="text-gray-800 text-sm font-medium">
                  {translateLevel(body.level)}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 col-span-2">
                <label className="block text-xs text-gray-600 mb-2">آدرس</label>
                <p className="text-gray-800 text-sm font-medium">{body.address}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <label className="block text-xs text-gray-600 mb-2">
                  شماره شخصی
                </label>
                <p className="text-gray-800 text-sm font-medium">
                  {body.personnel_number}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <label className="block text-xs text-gray-600 mb-2">
                  تاریخ تولد
                </label>
                <p className="text-gray-800 text-sm font-medium">
                  {body.birth_date ? format(new Date(body.birth_date), "dd MMMM yyyy") : "ثبت نشده است"}
                </p>
              </div>
            </div>
          </div>
        </>

      ) : (
        <div> مشکلی در دریاففت کاربر وجود دارد - {body.message}</div>
      )}
    </div>
  );
};

export default Page;
