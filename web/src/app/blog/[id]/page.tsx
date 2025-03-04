import { getBlog } from "@/app/actions/blog/getBlog";
import Image from "next/image";
// import Image from "next/image";

// interface Blog {
//   id: string;
//   image: string;
//   title: string;
//   description: string;
// }

const BlogDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const blogId = (await params).id;

  const blog = await getBlog(blogId);
  console.log(blog.content);

  if (!blog)
    return <p className="text-center text-red-500">پست مورد نظر یافت نشد</p>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl text-right">
      <Image
        src={`http://127.0.0.1:1382/uploads/images/${blog.pic.name}`}
        alt={blog.title}
        width={600}
        height={350}
        className="w-full rounded-lg"
      />
      <h1 className="text-3xl font-bold text-gray-900 ">{blog.title}</h1>
      <p className="text-gray-700 ">{blog.content}</p>
    </div>
  );
};

export default BlogDetail;
