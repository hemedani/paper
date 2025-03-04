import { FormCreateBlog } from "@/components/organisms/FormCreateBlog";
import { cookies } from "next/headers";

const page = async () => {
  const token = (await cookies()).get("token");
  return <FormCreateBlog token={token?.value} />;
};

export default page;
