import { getUser } from "@/app/actions/user/getUser";
import { EditUserRelations } from "@/components/organisms/user/EditUserRelations";
import Link from "next/link";

const FormComponent = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const foundedUser = await getUser(id)
  const lesanUrl = process.env.LESAN_URL ? process.env.LESAN_URL : "http://localhost:1382"

  return (
    <div className="w-full min-h-screen  mx-auto p-6 bg-white shadow-md rounded-lg">
      {foundedUser.success ? (
        <EditUserRelations {...foundedUser.body} lesanUrl={lesanUrl} />
      ) : (
        <div>
          مشکلی در یافتن کاربر وجود دارد - {foundedUser.body.message}

          <Link
            href="/admin/users"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            بازگشت
          </Link>

        </div>
      )}
    </div>
  );
};

export default FormComponent;
