import { getUsers } from "@/app/actions/user/getUsers";
import Pagination from "@/components/molecules/Pagination";
import SearchBox from "@/components/molecules/SearchBox";
import { ClientUserDashboard } from "@/components/template/clientUserDashboard";

const UserDashboard = async ({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) => {
  const searchQuery = (await searchParams).query || "";
  const currentPage = parseInt((await searchParams).page || "1");
  const users = await getUsers(searchQuery, currentPage);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">بخش کاربران</h1>
      <p className="text-gray-600">خوش آمدید!</p>
      <SearchBox defaultValue="" />
      <ClientUserDashboard searchQuery="" users={users} />
      <Pagination totalItems={users?.length} initialPage={currentPage} />
    </div>
  );
};

export default UserDashboard;
