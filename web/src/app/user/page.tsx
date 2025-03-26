import { getMe } from "@/app/actions/user/getMe";
import UserProfileCard from "@/components/organisms/user/UserProfileCard";

const Page = async () => {
  const { body, success } = await getMe({
    _id: 1,
    first_name: 1,
    last_name: 1,
    gender: 1,
    mobile: 1,
    national_number: 1,
    personnel_number: 1,
    level: 1,
    father_name: 1,
    address: 1,
    summery: 1,
    birth_date: 1
  });

  return (
    <>
      {success ? (
        <UserProfileCard user={body} isAdminContext={false} />
      ) : (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          مشکلی در دریافت اطلاعات کاربر وجود دارد - {body.message}
        </div>
      )}
    </>
  );
};

export default Page;
