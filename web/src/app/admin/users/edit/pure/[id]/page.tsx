import { getUser } from "@/app/actions/user/getUser";
import { EditUserPures } from "@/components/organisms/user/EditUserPures";
import {
  AdminEmptyState,
  AdminFormPage,
  AdminIcon,
  AdminPanel,
} from "@/components/organisms/admin/AdminUI";

const FormComponent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const foundedUser = await getUser(id);
  const lesanUrl = process.env.LESAN_URL ? process.env.LESAN_URL : "http://localhost:1382";

  if (!foundedUser.success) {
    return (
      <AdminFormPage
        title="ویرایش کاربر"
        backHref="/admin/users"
        backLabel="بازگشت به فهرست کاربران"
      >
        <AdminPanel bodyClassName="p-4">
          <AdminEmptyState
            title="کاربر پیدا نشد"
            description={foundedUser.body?.message ?? "این حساب حذف شده یا شناسه آن معتبر نیست."}
            icon={AdminIcon.user}
          />
        </AdminPanel>
      </AdminFormPage>
    );
  }

  return (
    <AdminFormPage
      title="ویرایش اطلاعات کاربر"
      subtitle={`اطلاعات هویتی «${foundedUser.body.first_name} ${foundedUser.body.last_name}» را به‌روزرسانی کنید.`}
      backHref="/admin/users"
      backLabel="بازگشت به فهرست کاربران"
    >
      <EditUserPures {...foundedUser.body} lesanUrl={lesanUrl} />
    </AdminFormPage>
  );
};

export default FormComponent;
