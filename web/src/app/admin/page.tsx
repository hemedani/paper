import Image from "next/image";
import Link from "next/link";
import { getCounts } from "../actions/user/dashboardStatistic";
import { getMe } from "../actions/user/getMe";
import { AdminPageHeader, AdminStatTile, AdminIcon } from "@/components/organisms/admin/AdminUI";
import {
  BookOpenIcon,
  FolderIcon,
  KeyIcon,
  NewspaperIcon,
  RssIcon,
  TagIcon,
  UserIcon,
  UsersIcon,
} from "@/components/atoms/Icons";

const AdminDashboard = async () => {
  const [data, me] = await Promise.all([getCounts(), getMe({ first_name: 1, last_name: 1, level: 1 })]);
  const firstName = me.success ? me.body.first_name : "";

  const stats = [
    {
      label: "مقالات",
      value: data?.articles,
      hint: "مقاله ثبت‌شده",
      href: "/admin/articles",
      icon: <BookOpenIcon className="h-[18px] w-[18px]" />,
      tone: "teal" as const,
    },
    {
      label: "پست‌های وبلاگ",
      value: data?.blogs,
      hint: "پست منتشرشده",
      href: "/admin/blog",
      icon: <RssIcon className="h-[18px] w-[18px]" />,
      tone: "teal" as const,
    },
    {
      label: "کاربران",
      value: data?.users,
      hint: "کاربر سایت",
      href: "/admin/users",
      icon: <UsersIcon className="h-[18px] w-[18px]" />,
      tone: "gold" as const,
    },
    {
      label: "نویسندگان",
      value: data?.authors,
      hint: "نویسنده",
      href: "/admin/authors",
      icon: <UserIcon className="h-[18px] w-[18px]" />,
      tone: "gold" as const,
    },
    {
      label: "ناشران",
      value: data?.publications,
      hint: "ناشر",
      href: "/admin/publication",
      icon: <NewspaperIcon className="h-[18px] w-[18px]" />,
      tone: "ink" as const,
    },
    {
      label: "برچسب‌ها",
      value: data?.tags,
      hint: "برچسب",
      href: "/admin/tag",
      icon: <TagIcon className="h-[18px] w-[18px]" />,
      tone: "ink" as const,
    },
    {
      label: "کلمات کلیدی",
      value: data?.keywords,
      hint: "واژه کلیدی",
      href: "/admin/keyword",
      icon: <KeyIcon className="h-[18px] w-[18px]" />,
      tone: "soft" as const,
    },
    {
      label: "دسته‌بندی وبلاگ",
      value: data?.categories,
      hint: "دسته‌بندی",
      href: "/admin/category",
      icon: <FolderIcon className="h-[18px] w-[18px]" />,
      tone: "soft" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="داشبورد"
        subtitle="نمای کلی محتوای پایگاه دانش و میان‌برهای پرکاربرد"
        actions={
          <>
            <Link href="/admin/articles/createArticle" className="inline-flex h-11 items-center justify-center gap-2 rounded-[14px] bg-[#08A6AE] px-5 text-[13.5px] font-bold text-white transition-colors hover:bg-[#079aa2]">
              {AdminIcon.plus}
              مقاله جدید
            </Link>
            <Link href="/admin/blog/new-blog" className="inline-flex h-11 items-center justify-center gap-2 rounded-[14px] border border-[#F0F0F2] bg-white px-5 text-[13.5px] font-semibold text-[#5C5C63] transition-colors hover:bg-[#F8F8F9] hover:text-black">
              پست وبلاگ
            </Link>
          </>
        }
      />

      {/* Greeting */}
      <section
        className="relative isolate overflow-hidden rounded-[24px] px-6 py-7 lg:px-9 lg:py-8"
        style={{ backgroundImage: "linear-gradient(to bottom left, #3DB4BA 0%, #00B5BE 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
          <Image src="/images/hero/hero-pattern.svg" alt="" fill sizes="100vw" className="object-cover" priority />
        </div>
        <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#D2A634]/25 blur-[70px]" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="text-[11px] font-bold tracking-wide text-white/70">پنل مدیریت پایگاه دانش</p>
            <h2 className="mt-1.5 text-[20px] font-extrabold leading-[1.5] text-white lg:text-[26px]">
              {firstName ? `خوش آمدید، ${firstName}` : "خوش آمدید"}
            </h2>
            <p className="mt-2 max-w-[430px] text-[12.5px] font-medium leading-[1.95] text-white/80">
              محتوای سایت را از همین‌جا مدیریت کنید: مقالات علمی، پست‌های وبلاگ، کاربران و
              دسته‌بندی‌ها.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/admin/users/createUser"
              className="inline-flex h-11 items-center gap-2 rounded-[14px] bg-white/15 px-5 text-[13px] font-bold text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/25"
            >
              کاربر جدید
            </Link>
            <Link
              href="/admin/blog"
              className="inline-flex h-11 items-center gap-2 rounded-[14px] bg-white/15 px-5 text-[13px] font-bold text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/25"
            >
              مدیریت وبلاگ
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 xl:grid-cols-4">
        {stats.map((stat) => (
          <AdminStatTile key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
