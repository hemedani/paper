import { CountUsers } from "@/app/actions/user/countUsers";
import { getUsers } from "@/app/actions/user/getUsers";
import Pagination from "@/components/molecules/Pagination";
import SearchBox from "@/components/molecules/SearchBox";
import { ClientUserDashboard } from "@/components/template/clientUserDashboard";
import { ReqType } from "@/types/declarations/selectInp";

const UserDashboard = async ({
  searchParams,
}: {
  searchParams: Promise<ReqType["main"]["user"]["getUsers"]["set"]>;
}) => {
  // const searchQuery = (await searchParams).query || "";
  // const currentPage = parseInt((await searchParams).page || "1");

  const { limit = "21", page = "1", levels } = await searchParams;
  const set: ReqType["main"]["user"]["getUsers"]["set"] = {
    limit: +limit || 21,
    page: +page,
    levels,
  };

  const get: ReqType["main"]["user"]["getUsers"]["get"] = {
    _id: 1,
    first_name: 1,
    last_name: 1,
    level: 1,
  };
  const users = await getUsers({ set, get });
  const countDataUsers = await CountUsers({
    set: { levels: levels },
    get: { qty: 1 },
  });
  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
      <h1 className="text-2xl text-gray-600 font-bold">بخش کاربران</h1>
      <p className="text-gray-600">خوش آمدید!</p>
      <SearchBox defaultValue="" />
      <ClientUserDashboard searchQuery="" users={users} />
      <Pagination countPage={countDataUsers.qty} initialPage={+page} />
    </div>
  );
};

export default UserDashboard;
