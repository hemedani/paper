import { getMe } from "@/app/actions/user/getMe";
import { EditUserRelations } from "@/components/organisms/user/EditUserRelations";
import Link from "next/link";

const Page = async () => {
  const { body, success } = await getMe({
    _id: 1,
    avatar: {
      _id: 1,
      name: 1,
    },
    nationalCard: {
      _id: 1,
      name: 1
    }
  });
  const lesanUrl = process.env.LESAN_URL ? process.env.LESAN_URL : "http://localhost:1382"

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">ویرایش ارتباطات</h1>
            <Link
              href="/user"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
            >
              <span className="text-sm font-medium">بازگشت به پروفایل</span>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <EditUserRelations {...body} lesanUrl={lesanUrl} isOwn />
          ) : (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
              مشکلی در دریافت اطلاعات کاربر وجود دارد - {body.message}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
