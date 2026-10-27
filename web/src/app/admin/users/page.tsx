import Link from "next/link";
import { CountUsers } from "@/app/actions/user/countUsers";
import { getUsers } from "@/app/actions/user/getUsers";
import Pagination from "@/components/molecules/Pagination";
import ClientUserDashboard from "@/components/template/clientUserDashboard";
import { LevelFilter } from "@/components/molecules/LevelFilter";
import {
  AdminCountChip,
  AdminIcon,
  AdminPageHeader,
  AdminPanel,
  btn,
} from "@/components/organisms/admin/AdminUI";
import { ReqType } from "@/types/declarations/selectInp";

const UserDashboard = async ({
  searchParams,
}: {
  searchParams: Promise<ReqType["main"]["user"]["getUsers"]["set"]>;
}) => {
  const { limit = "20", page = "1", levels } = await searchParams;
  // An empty string fails the API validator, so normalise it away.
  const levelFilter = levels ? levels : undefined;

  const set: ReqType["main"]["user"]["getUsers"]["set"] = {
    limit: +limit || 20,
    page: +page,
    levels: levelFilter,
  };

  const get: ReqType["main"]["user"]["getUsers"]["get"] = {
    _id: 1,
    first_name: 1,
    last_name: 1,
    level: 1,
    national_number: 1,
  };

  const [users, countDataUsers] = await Promise.all([
    getUsers({ set, get }),
    CountUsers({ set: { levels: levelFilter }, get: { qty: 1 } }),
  ]);

  const list = Array.isArray(users) ? users : [];
  const total = countDataUsers?.qty ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="کاربران سایت"
        subtitle="مدیریت حساب‌های کاربری، سطح دسترسی و اطلاعات هویتی"
        badge={<AdminCountChip value={total} label="کاربر" />}
      />

      <AdminPanel
        title="فهرست کاربران"
        description="برای باریک کردن فهرست، سطح دسترسی را انتخاب کنید"
        icon={AdminIcon.search}
        actions={
          <Link href="/admin/users/createUser" className={btn.primary}>
            {AdminIcon.plus}
            کاربر جدید
          </Link>
        }
        bodyClassName="p-4 sm:p-5"
      >
        <div className="mb-4">
          <LevelFilter value={levelFilter ?? ""} />
        </div>

        <ClientUserDashboard searchQuery="" users={list} />
      </AdminPanel>

      <div className="flex justify-center">
        <Pagination countPage={total} initialPage={+page} />
      </div>
    </div>
  );
};

export default UserDashboard;
