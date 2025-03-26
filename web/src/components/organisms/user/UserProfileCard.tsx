import { format } from "date-fns-jalali";
import { translateGender, translateLevel } from "@/utils/helper";
import { userSchema } from "@/types/declarations/selectInp";
import {
  UserIcon,
  PhoneIcon,
  IdCardIcon,
  CalendarIcon,
  MapPinIcon,
  EditIcon,
  UpdateIcon,
} from "@/components/atoms/Icons";
import Link from "next/link";

interface UserProfileCardProps {
  user: userSchema;
  showAvatar?: boolean;
  className?: string;
}

const UserProfileCard = ({
  user,
  showAvatar = true,
  className = "",
}: UserProfileCardProps) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md ${className}`}
    >
      {/* Header Section with Gradient Background */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 p-8">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

        {/* Avatar and Name Section */}
        <div className="relative flex flex-col items-center">
          {showAvatar && (
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-sm border-4 border-white/20 flex items-center justify-center text-white text-3xl font-bold shadow-lg transition-transform duration-300 hover:scale-105">
                {user.first_name?.[0] || "U"}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
            </div>
          )}

          <h2 className="text-2xl font-bold text-white text-center mb-2">
            {user.first_name} {user.last_name}
          </h2>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full">
            <span className="text-white/90 text-sm font-medium">
              {translateLevel(user.level)}
            </span>
          </div>

          {/* Edit Buttons */}
          <div className="flex gap-3 mt-4">
            <Link
              href={`/admin/users/edit/pure/${user._id}`}
              className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
            >
              <UpdateIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium">ویرایش اطلاعات اصلی</span>
            </Link>
            <Link
              href={`/admin/users/edit/relation/${user._id}`}
              className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
            >
              <EditIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium">ویرایش روابط</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <div className="group bg-gray-50/50 hover:bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <UserIcon className="w-5 h-5" />
                </div>
                <label className="text-sm font-medium text-gray-600">
                  نام پدر
                </label>
              </div>
              <p className="text-gray-800 font-medium pr-11">
                {user.father_name}
              </p>
            </div>

            <div className="group bg-gray-50/50 hover:bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <UserIcon className="w-5 h-5" />
                </div>
                <label className="text-sm font-medium text-gray-600">
                  جنسیت
                </label>
              </div>
              <p className="text-gray-800 font-medium pr-11">
                {translateGender(user.gender)}
              </p>
            </div>

            <div className="group bg-gray-50/50 hover:bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <label className="text-sm font-medium text-gray-600">
                  تاریخ تولد
                </label>
              </div>
              <p className="text-gray-800 font-medium pr-11">
                {user.birth_date
                  ? format(new Date(user.birth_date), "dd MMMM yyyy")
                  : "ثبت نشده است"}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="group bg-gray-50/50 hover:bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <label className="text-sm font-medium text-gray-600">
                  شماره تماس
                </label>
              </div>
              <p className="text-gray-800 font-medium pr-11">{user.mobile}</p>
            </div>

            <div className="group bg-gray-50/50 hover:bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <IdCardIcon className="w-5 h-5" />
                </div>
                <label className="text-sm font-medium text-gray-600">
                  کد ملی
                </label>
              </div>
              <p className="text-gray-800 font-medium pr-11">
                {user.national_number}
              </p>
            </div>

            <div className="group bg-gray-50/50 hover:bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <IdCardIcon className="w-5 h-5" />
                </div>
                <label className="text-sm font-medium text-gray-600">
                  شماره پرسنلی
                </label>
              </div>
              <p className="text-gray-800 font-medium pr-11">
                {user.personnel_number}
              </p>
            </div>
          </div>

          {/* Address Section - Full Width */}
          <div className="col-span-full">
            <div className="group bg-gray-50/50 hover:bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <MapPinIcon className="w-5 h-5" />
                </div>
                <label className="text-sm font-medium text-gray-600">
                  آدرس
                </label>
              </div>
              <p className="text-gray-800 font-medium pr-11">{user.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
