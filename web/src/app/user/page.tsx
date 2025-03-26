import { getMe } from "@/app/actions/user/getMe";
import UserProfileCard from "@/components/organisms/user/UserProfileCard";

const Page = async () => {
  const { body, success } = await getMe();

  return (
    <div className="p-6">
      {success ? (
        <UserProfileCard user={body} />
      ) : (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          مشکلی در دریافت اطلاعات کاربر وجود دارد - {body.message}
        </div>
      )}
    </div>
  );
};

export default Page;
