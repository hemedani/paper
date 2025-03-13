import { BLogList } from "@/components/organisms/BlogList";
import { getBlogs } from "../actions/blog/getBlogs";
import { ReqType } from "@/types/declarations/selectInp";

const BlogList = async () => {
  const set: ReqType["main"]["blog"]["gets"]["set"] = {
    limit: 20,
    page: 1,
  };

  const get: ReqType["main"]["blog"]["gets"]["get"] = {
    _id: 1,
    abstract: 1,
    content: 1,
    isInSwipper: 1,
    pic: { _id: 1, name: 1, type: 1 },
    subtitle: 1,
    title: 1,
    likes: 1,
  };

  const blogData = await getBlogs({ set, get });
  const mostLikedPosts = await getBlogs({ set: { ...set, sortByLikes: true }, get });
  const swiperBlogPosts = await getBlogs({ set: { ...set, isInSwipper: true }, get });
  const lesanUrl = process.env.LESAN_URL ? process.env.LESAN_URL : "http://localhost:1382"

  return (
    <div className="container mx-auto px-4 py-8">
      <BLogList blogs={blogData} mostLikedPosts={mostLikedPosts} lesanUrl={lesanUrl} swiperBlogPosts={swiperBlogPosts} />
    </div>
  );
};

export default BlogList;
