"use client";

import React, { FC } from "react";
import Link from "next/link";

const menuItems = [
  { label: "داشبورد", href: "/admin" },
  { label: "مقالات", href: "/admin/articles" },
  { label: "کاربران", href: "/admin/users" },
  { label: "دسته بندی ها", href: "/admin/tag" },
  { label: "منتشر کننده ها", href: "/admin/population" },
];

type TProps = {
  menuItemsProps?: { label: string; href: string }[];
};

export const AdminSidebar: FC<TProps> = ({ menuItemsProps }) => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col">
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
      <div className="p-4 border-t border-gray-700">
        <span className="text-sm">© 2024 پنل ادمین</span>
      </div>
    </aside>
  );
};
