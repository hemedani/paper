import { getMe } from "@/app/actions/user/getMe";
import ClientBlogDashboard from "@/components/template/clientBlogDashboard";

const page = async () => {
  const me = await getMe({
    _id: 1,
    favBlogs: {
      _id: 1,
      title: 1,
      subtitle: 1,
      abstract: 1,
      pic: {
        _id: 1,
        name: 1,
      },
      isInSwipper: 1,
      createdAt: 1,
      updatedAt: 1,
      author: {
        _id: 1,
        first_name: 1,
        last_name: 1,
      },
    },
  });
  const lesanUrl = process.env.LESAN_URL
    ? process.env.LESAN_URL
    : "http://localhost:1382";

  return (
    <div className="relative">
      <div className="flex items-start">
        <div className="bg-blue-500 w-1 h-8 ml-3 rounded-full"></div>
        <div>
          <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
            بلاگ پست‌های مورد علاقه شما
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            در این بخش میتوانید تمامی بلاگ پست‌های مورد علاقه خود را ببینید
          </p>
        </div>
      </div>
      <ClientBlogDashboard blogs={me.success ? me.body.favBlogs : []} lesanUrl={lesanUrl} isOwn />
    </div>
  );
};

export default page;
