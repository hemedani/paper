import { getUser } from "@/app/actions/user/getUser";
import { EditUserRelations } from "@/components/organisms/user/EditUserRelations";
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
        title="ویرایش رابطه‌های کاربر"
        backHref="/admin/users"
        backLabel="بازگشت به فهرست کاربران"
      >
        <AdminPanel bodyClassName="p-4">
          <AdminEmptyState
            title="کاربر پیدا نشد"
            description={foundedUser.body?.message ?? "این حساب حذف شده یا شناسه آن معتبر نیست."}
            icon={AdminIcon.link}
          />
        </AdminPanel>
      </AdminFormPage>
    );
  }

  return (
    <AdminFormPage
      title="ویرایش رابطه‌های کاربر"
      subtitle={`مقالات مورد علاقه «${foundedUser.body.first_name} ${foundedUser.body.last_name}» را مدیریت کنید.`}
      backHref="/admin/users"
      backLabel="بازگشت به فهرست کاربران"
    >
      <EditUserRelations {...foundedUser.body} lesanUrl={lesanUrl} />
    </AdminFormPage>
  );
};

export default FormComponent;
