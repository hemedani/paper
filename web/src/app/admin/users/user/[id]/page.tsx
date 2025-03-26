import { getUser } from "@/app/actions/user/getUser";
import UserProfileCard from "@/components/organisms/user/UserProfileCard";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const userId = (await params).id;
  const { body, success } = await getUser(userId);

  return (
    <div className="p-6">
      {success ? (
        <UserProfileCard user={body} />
      ) : (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          مشکلی در دریافت کاربر وجود دارد - {body.message}
        </div>
      )}
    </div>
  );
};

export default Page;
