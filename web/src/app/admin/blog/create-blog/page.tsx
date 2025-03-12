import { FormCreateBlog } from "@/components/organisms/FormCreateBlog";
import { cookies } from "next/headers";

const page = async () => {
  const token = (await cookies()).get("token");
  const lesanUrl = process.env.LESAN_URL ? process.env.LESAN_URL : "http://localhost:1382"

  return <FormCreateBlog token={token?.value} lesanUrl={lesanUrl} />;
};

export default page;
