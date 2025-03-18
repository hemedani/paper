"use client";

import React, { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menuItems = [
  { label: "داشبورد", href: "/admin" },
  { label: "مقالات", href: "/admin/articles" },
  { label: "کاربران", href: "/admin/users" },
  { label: "نویسندگان", href: "/admin/authors" },
  { label: "دسته بندی ها", href: "/admin/tag" },
  { label: "کلمات کلیدی", href: "/admin/keyword" },
  { label: "منتشر کننده ها", href: "/admin/publication" },
  { label: "بلاگ", href: "/admin/blog" },
  { label: "پنل کاربری", href: "/user" },
];

type TProps = {
  menuItemsProps?: { label: string; href: string }[];
};

export const AdminSidebar: FC<TProps> = ({ menuItemsProps }) => {
  const router = useRouter();

  const logOutHandler = async () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.replace("/");
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-xl font-semibold border-b border-gray-700">
        پنل ادمین
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          {!menuItemsProps
            ? menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 rounded-md hover:bg-gray-700 transition"
                >
                  {item.label}
                </Link>
              </li>
            ))
            : menuItemsProps.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 rounded-md hover:bg-gray-700 transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      <div
        onClick={() => router.replace("/")}
        className="block cursor-pointer px-5 py-2 rounded-md hover:bg-gray-700 transition"
      >
        <span>خانه</span>
      </div>
      <div
        onClick={logOutHandler}
        className="block cursor-pointer px-5 py-2 rounded-md hover:bg-gray-700 transition"
      >
        <span>خروج از حساب</span>
      </div>
      <div className="p-4 border-t border-gray-700">
        <span className="text-sm">© 2024 پنل ادمین</span>
      </div>
    </aside>
  );
};
