"use client";

import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
  FolderIcon,
  HomeIcon,
  KeyIcon,
  LogoutIcon,
  NewspaperIcon,
  RssIcon,
  TagIcon,
  UserIcon,
  UsersIcon,
} from "@/components/atoms/Icons";

type MenuItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

const icon = (node: React.ReactNode) => <span className="shrink-0">{node}</span>;

const ADMIN_GROUPS: MenuGroup[] = [
  {
    title: "مرور کلی",
    items: [{ label: "داشبورد", href: "/admin", icon: icon(<HomeIcon className="h-5 w-5" />) }],
  },
  {
    title: "محتوای علمی",
    items: [
      {
        label: "مقالات",
        href: "/admin/articles",
        icon: icon(<BookOpenIcon className="h-5 w-5" />),
      },
      { label: "ناشران", href: "/admin/publication", icon: icon(<NewspaperIcon className="h-5 w-5" />) },
      { label: "برچسب‌ها", href: "/admin/tag", icon: icon(<TagIcon className="h-5 w-5" />) },
      { label: "کلمات کلیدی", href: "/admin/keyword", icon: icon(<KeyIcon className="h-5 w-5" />) },
      { label: "نویسندگان", href: "/admin/authors", icon: icon(<UserIcon className="h-5 w-5" />) },
    ],
  },
  {
    title: "وبلاگ",
    items: [
      { label: "پست‌های وبلاگ", href: "/admin/blog", icon: icon(<RssIcon className="h-5 w-5" />) },
      { label: "دسته‌بندی وبلاگ", href: "/admin/category", icon: icon(<FolderIcon className="h-5 w-5" />) },
    ],
  },
  {
    title: "کاربران",
    items: [
      { label: "کاربران سایت", href: "/admin/users", icon: icon(<UsersIcon className="h-5 w-5" />) },
      { label: "پنل کاربری", href: "/user", icon: icon(<CogIcon className="h-5 w-5" />) },
    ],
  },
];

const customIcon = (href: string) => {
  if (href.includes("/user/favorite/")) return icon(<TagIcon className="h-5 w-5" />);
  if (href === "/user") return icon(<UserIcon className="h-5 w-5" />);
  if (href === "/admin") return icon(<CogIcon className="h-5 w-5" />);
  return icon(<CogIcon className="h-5 w-5" />);
};

const isActivePath = (pathname: string, href: string) =>
  href === "/admin" || href === "/user"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

type TProps = {
  menuItemsProps?: { label: string; href: string }[];
  title?: string;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

export const AdminSidebar: FC<TProps> = ({
  menuItemsProps,
  title = "پنل مدیریت",
  mobileOpen = false,
  onMobileClose,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    onMobileClose?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const groups: MenuGroup[] = menuItemsProps
    ? [
        {
          title: "حساب کاربری",
          items: menuItemsProps.map((item) => ({
            ...item,
            icon: customIcon(item.href),
          })),
        },
      ]
    : ADMIN_GROUPS;

  const itemClass = (active: boolean, collapsedRail: boolean) =>
    [
      "group relative flex h-11 items-center gap-3 rounded-[14px] px-3 text-[13.5px] font-semibold transition-colors",
      collapsedRail ? "justify-center px-0" : "",
      active
        ? "bg-[#EDFEFF] text-[#08A6AE]"
        : "text-[#5C5C63] hover:bg-[#F8F8F9] hover:text-black",
    ].join(" ");

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="بستن منو"
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 right-0 z-50 flex h-full w-[280px] shrink-0 flex-col border-l border-[#F0F0F2] bg-white transition-[transform,width] duration-300 ease-out",
          "lg:static lg:z-auto lg:translate-x-0",
          collapsed ? "lg:w-[78px]" : "lg:w-[264px]",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        aria-label={title}
      >
        {/* Header */}
        <div
          className={[
            "flex h-[68px] shrink-0 items-center gap-2 border-b border-[#F0F0F2] px-4",
            collapsed ? "lg:justify-center lg:px-0" : "justify-between",
          ].join(" ")}
        >
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-[14.5px] font-extrabold text-black">{title}</p>
              <p className="truncate text-[10.5px] font-medium text-[#9A9AA1]">پایگاه دانش</p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "باز کردن منو" : "جمع کردن منو"}
            className="hidden h-9 w-9 items-center justify-center rounded-full text-[#9A9AA1] transition-colors hover:bg-[#F8F8F9] hover:text-black lg:flex"
          >
            {collapsed ? (
              <ChevronLeftIcon className="h-5 w-5" />
            ) : (
              <ChevronRightIcon className="h-5 w-5" />
            )}
          </button>

          <button
            type="button"
            onClick={onMobileClose}
            aria-label="بستن منو"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#9A9AA1] hover:bg-[#F8F8F9] lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="pd-scroll flex-1 overflow-y-auto px-3 py-4">
          {groups.map((group) => (
            <div key={group.title} className="mb-5 last:mb-0">
              {!collapsed && (
                <p className="mb-2 px-3 text-[10.5px] font-bold uppercase tracking-wide text-[#B4B4BB]">
                  {group.title}
                </p>
              )}
              <ul className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        title={collapsed ? item.label : undefined}
                        className={itemClass(active, collapsed)}
                      >
                        {active && !collapsed && (
                          <span
                            className="absolute -left-3 top-1/2 hidden h-6 w-[3px] -translate-y-1/2 rounded-full bg-[#08A6AE] lg:block"
                            aria-hidden
                          />
                        )}
                        <span className={active ? "text-[#08A6AE]" : "text-[#9A9AA1]"}>
                          {item.icon}
                        </span>
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-[#F0F0F2] p-3">
          <button
            type="button"
            onClick={() => router.push("/")}
            className={`w-full ${itemClass(false, collapsed)}`}
          >
            <span className="text-[#9A9AA1]">
              <HomeIcon className="h-5 w-5" />
            </span>
            {!collapsed && <span>بازگشت به سایت</span>}
          </button>
          <button
            type="button"
            onClick={logout}
            className={`mt-1 w-full ${itemClass(false, collapsed)} hover:bg-[#FEF3F3] hover:text-[#C2353D]`}
          >
            <span className="text-[#9A9AA1]">
              <LogoutIcon className="h-5 w-5" />
            </span>
            {!collapsed && <span>خروج از حساب</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
