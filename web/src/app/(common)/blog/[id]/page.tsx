import { getBlog } from "@/app/actions/blog/getBlog";
import { getBlogs } from "@/app/actions/blog/getBlogs";
import { getMe } from "@/app/actions/user/getMe";
import { blogSchema } from "@/types/declarations/selectInp";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns-jalali";
import { ShareButton } from "@/components/molecules/ShareButton";
import { DownloadButton } from "@/components/molecules/DownloadButton";
import { LikeButton } from "@/components/molecules/LikeButton";
import { RelatedBlogCard } from "@/components/organisms/blog/RelatedBlogCard";

const metaTextClass = "text-[13px] font-semibold leading-[1.76] text-[#3C3C43] lg:text-[15px]";

const BlogDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const blogId = (await params).id;
  const { body, success } = await getBlog(blogId);

  const me = await getMe({ _id: 1, favBlogs: { _id: 1 } });
  const favoriteIds: Set<string> = me.success
    ? new Set(me.body.favBlogs?.map((fav: { _id: string }) => fav._id))
    : new Set();

  if (!success) {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-[1600px] flex-col items-center justify-center px-4 py-16">
        <div className="mb-4 text-3xl font-bold text-[#08A6AE]">پست مورد نظر یافت نشد</div>
        <p className="mb-8 text-[#9A9AA1]">مقاله‌ای که به دنبال آن هستید در سیستم موجود نیست.</p>
        <Link
          href="/blog"
          className="rounded-[18px] bg-[#08A6AE] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#088f96]"
        >
          بازگشت به صفحه مقالات
        </Link>
      </div>
    );
  }

  const persianCreatedDate = body.createdAt ? format(new Date(body.createdAt), "dd MMMM yyyy") : "";
  const authorFullName = `${body.author.first_name} ${body.author.last_name}`;
  const categoryName = body.categories?.[0]?.name || "معماری اسلامی";

  const relatedArticlesResult = await getBlogs({
    set: { limit: 4, page: 1 },
    get: {
      _id: 1,
      title: 1,
      abstract: 1,
      pic: { name: 1 },
      author: { first_name: 1, last_name: 1 },
      categories: { name: 1 },
      createdAt: 1,
    },
  });

  const relatedArticles = relatedArticlesResult.success
    ? relatedArticlesResult.body.filter((article: { _id: string }) => article._id !== blogId)
    : [];

  const contentParagraphs = body.content.split("\n\n").filter((p: string) => p.trim());

  return (
    <div dir="rtl" className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1600px] px-4 pt-8 md:px-8 lg:px-[104px] lg:pt-[101px]">
        {/* Hero image */}
        <div className="relative h-[220px] w-full overflow-hidden rounded-[20px] bg-[#F8F8F9] sm:h-[320px] lg:h-[408px]">
          <Image
            src={`http://127.0.0.1:1382/uploads/images/${body.pic.name}`}
            alt={body.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1390px"
            className="object-cover"
            priority
          />
        </div>

        {/* Meta row — badge + author (right), category + date (left) */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 lg:mt-[52px]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:gap-x-8">
            <span className="flex h-9 items-center rounded-[12px] bg-[#EDFEFF] px-4 text-[13px] font-semibold text-[#08A6AE] lg:h-[38px] lg:px-[14px] lg:text-[15px]">
              مقاله ژورنالی
            </span>
            <div className="flex items-center gap-2">
              <span className={metaTextClass}>{authorFullName}</span>
              <Image src="/images/blog/author-icon.svg" alt="" width={22} height={22} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:gap-x-8">
            <div className="flex items-center gap-2">
              <span className={metaTextClass}>{categoryName}</span>
              <Image src="/images/blog/category-icon.svg" alt="" width={22} height={22} />
            </div>
            <div className="flex items-center gap-2">
              <span className={metaTextClass}>{persianCreatedDate}</span>
              <Image src="/images/blog/date-icon.svg" alt="" width={22} height={22} />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-5 text-right text-[24px] font-bold leading-[1.55] text-black lg:mt-7 lg:text-[32px]">
          {body.title}
        </h1>

        <div className="mt-8 h-px w-full bg-[#F0F0F2] lg:mt-10" />

        {/* Content */}
        <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:gap-11">
          {body.abstract && (
            <div className="flex flex-col gap-3">
              <h2 className="text-right text-[20px] font-bold leading-[1.7] text-[#D2A634] lg:text-[24px]">
                چکیده این مقاله
              </h2>
              <p className="text-justify text-[15px] font-medium leading-[2] text-[#9A9AA1] lg:text-[16px]">
                {body.abstract}
              </p>
            </div>
          )}

          {contentParagraphs.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-right text-[19px] font-bold leading-[1.7] text-black lg:text-[22px]">
                تیتر پاراگراف اینجا قرار میگیرد!
              </h2>
              <p className="text-justify text-[15px] font-medium leading-[2] text-[#9A9AA1] lg:text-[16px]">
                {contentParagraphs[0]}
              </p>
            </div>
          )}

          {contentParagraphs.length > 1 && (
            <div className="flex flex-col gap-3 rounded-[20px] border border-[#F0F0F2] bg-white p-6 lg:p-9">
              <h2 className="text-right text-[19px] font-bold leading-[1.7] text-black lg:text-[22px]">
                تیتر پاراگراف اینجا قرار میگیرد!
              </h2>
              <p className="text-justify text-[15px] font-medium leading-[2] text-[#9A9AA1] lg:text-[16px]">
                {contentParagraphs[1]}
              </p>
            </div>
          )}

          {contentParagraphs.length > 2 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-right text-[19px] font-bold leading-[1.7] text-black lg:text-[22px]">
                نکات تکمیلی و نتیجه‌گیری
              </h2>
              <div className="flex flex-col gap-4">
                {contentParagraphs.slice(2).map((paragraph: string, index: number) => (
                  <p
                    key={index}
                    className="text-justify text-[15px] font-medium leading-[2] text-[#9A9AA1] lg:text-[16px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="h-px w-full bg-[#F0F0F2]" />

          {/* Actions — like (right), download, share (left) */}
          <div className="flex flex-wrap items-center justify-end gap-3 lg:gap-[18px]">
            <LikeButton
              blogId={blogId}
              initialIsLiked={favoriteIds.has(blogId)}
              isLoggedIn={me.success}
            />
            <DownloadButton blogTitle={body.title} blogContent={body.content} />
            <ShareButton title={body.title} />
          </div>
        </div>

        {/* Consultation banner */}
        <div className="relative mt-12 overflow-hidden rounded-[20px] bg-[#F2FAFB] lg:mt-16">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to bottom left, #FFFFFF 0%, #E4F6F7 50%, #FFFFFF 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
            <Image src="/images/hero/hero-pattern.svg" alt="" fill className="object-cover" />
          </div>

          <div className="relative z-10 flex flex-col items-start gap-8 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-[60px] lg:py-[46px]">
            <p className="max-w-[540px] text-right text-[20px] font-extrabold leading-[1.6] text-[#08A6AE] lg:text-[26px] lg:leading-[1.55]">
              ماموریت ما ترویج معماری اسلامی و ارائه منابع آموزشی باکیفیت برای ارتقا دانش و آگاهی
              شماست
            </p>

            <div className="flex items-center gap-5 lg:gap-6">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[13px] font-medium text-[#9A9AA1] lg:text-[15px]">
                  مشاوره آنلاین
                </span>
                <span className="whitespace-nowrap text-[17px] font-extrabold text-black lg:text-[20px]">
                  +۹۸ ۹۱۷ ۵۴۴ ۰۸۵
                </span>
              </div>
              <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0px_12px_30px_-18px_rgba(8,166,174,0.6)] lg:h-[92px] lg:w-[92px]">
                <Image src="/images/blog/call-icon.svg" alt="" width={30} height={30} />
              </div>
            </div>
          </div>
        </div>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="mb-16 mt-14 flex flex-col gap-8 lg:mb-24 lg:mt-20 lg:gap-10">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-right text-[24px] font-extrabold leading-[1.6] text-black lg:text-[32px]">
                دیگر مقالات مرتبط
              </h2>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="مقالات قبلی"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F0F0F2] transition-colors hover:bg-[#F8F8F9]"
                >
                  <Image src="/images/pagination/arrow-right.svg" alt="" width={5} height={8} />
                </button>
                <button
                  type="button"
                  aria-label="مقالات بعدی"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F0F0F2] transition-colors hover:bg-[#F8F8F9]"
                >
                  <Image src="/images/pagination/arrow-left.svg" alt="" width={5} height={8} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10">
              {relatedArticles.slice(0, 3).map((article: blogSchema) => (
                <RelatedBlogCard key={article._id} {...article} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
