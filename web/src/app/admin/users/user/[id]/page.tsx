import { getUser } from "@/app/actions/user/getUser";
import UserProfileCard from "@/components/organisms/user/UserProfileCard";
import {
  AdminEmptyState,
  AdminFormPage,
  AdminIcon,
  AdminPanel,
} from "@/components/organisms/admin/AdminUI";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const _id = (await params).id;
  const { body, success } = await getUser(_id);

  if (!success) {
    return (
      <AdminFormPage
        title="پروفایل کاربر"
        backHref="/admin/users"
        backLabel="بازگشت به فهرست کاربران"
      >
        <AdminPanel bodyClassName="p-4">
          <AdminEmptyState
            title="کاربر پیدا نشد"
            description={body?.message ?? "این حساب حذف شده یا شناسه آن معتبر نیست."}
            icon={AdminIcon.user}
          />
        </AdminPanel>
      </AdminFormPage>
    );
  }

  return (
    <AdminFormPage
      title="پروفایل کاربر"
      subtitle="اطلاعات کامل حساب کاربری و سطح دسترسی"
      backHref="/admin/users"
      backLabel="بازگشت به فهرست کاربران"
    >
      <UserProfileCard user={body} isAdminContext={true} />
    </AdminFormPage>
  );
};

export default Page;
