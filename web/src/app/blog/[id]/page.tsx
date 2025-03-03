import Image from "next/image";

interface Blog {
  id: string;
  image: string;
  title: string;
  description: string;
}

const blogs: Blog[] = [
  {
    id: "post1",
    image: "/path/to/image1.jpg",
    title: "اولین پست وبلاگ",
    description: "این توضیحات اولین پست وبلاگ است.",
  },
  {
    id: "post2",
    image: "/path/to/image2.jpg",
    title: "دومین پست وبلاگ",
    description: "این توضیحات دومین پست وبلاگ است.",
  },
  {
    id: "post3",
    image: "/path/to/image3.jpg",
    title: "سومین پست وبلاگ",
    description: "این توضیحات سومین پست وبلاگ است.",
  },
  {
    id: "post4",
    image: "/path/to/image4.jpg",
    title: "چهارمین پست وبلاگ",
    description: "این توضیحات چهارمین پست وبلاگ است.",
  },
  {
    id: "post5",
    image: "/path/to/image5.jpg",
    title: "پنجمین پست وبلاگ",
    description: "این توضیحات پنجمین پست وبلاگ است.",
  },
  {
    id: "post6",
    image: "/path/to/image6.jpg",
    title: "ششمین پست وبلاگ",
    description: "این توضیحات ششمین پست وبلاگ است.",
  },
  {
    id: "post7",
    image: "/path/to/image7.jpg",
    title: "هفتمین پست وبلاگ",
    description: "این توضیحات هفتمین پست وبلاگ است.",
  },
  {
    id: "post8",
    image: "/path/to/image8.jpg",
    title: "هشتمین پست وبلاگ",
    description: "این توضیحات هشتمین پست وبلاگ است.",
  },
  {
    id: "post9",
    image: "/path/to/image9.jpg",
    title: "نهمین پست وبلاگ",
    description: "این توضیحات نهمین پست وبلاگ است.",
  },
  {
    id: "post10",
    image: "/path/to/image10.jpg",
    title: "دهمین پست وبلاگ",
    description: "این توضیحات دهمین پست وبلاگ است.",
  },
];

const BlogDetail = ({ params }: { params: { id: string } }) => {
  const blog = blogs.find((b) => b.id === params.id);
  if (!blog)
    return <p className="text-center text-red-500">پست مورد نظر یافت نشد</p>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl text-right">
      <Image
        src={blog.image}
        alt={blog.title}
        width={600}
        height={350}
        className="w-full rounded-lg"
      />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white my-4">
        {blog.title}
      </h1>
      <p className="text-gray-700 dark:text-gray-300">{blog.description}</p>
    </div>
  );
};

export default BlogDetail;
    