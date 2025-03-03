import { getUser } from "@/app/actions/user/getUser";
import { EditUserRelations } from "@/components/organisms/EditUserRelations";

const FormComponent = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const userData = await getUser(id);
  console.log(userData);

  return (
    <div className="w-full min-h-screen  mx-auto p-6 bg-white shadow-md rounded-lg">
      <EditUserRelations data={userData} id={id} />
    </div>
  );
};

export default FormComponent;
