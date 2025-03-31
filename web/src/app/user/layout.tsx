import { AdminSidebar } from "@/components/organisms/SideBar";
import React, { ReactNode } from "react";
import { getMe } from "../actions/user/getMe";

const UserLayout = async ({ children }: { children: ReactNode }) => {
  const me = await getMe();

  const menuItems = [
    { label: "اطلاعات کاربری", href: "/user" },
    { label: "پست‌های وبلاگ مورد علاقه", href: "/user/favorite/blog" },
    { label: "مقالات مورد علاقه", href: "/user/favorite/article" },
    me.success && (me.body.level === "Ghost" || me.body.level === "Manager") ? { label: "پنل ادمین", href: "/admin" } : null,
  ];

  const filteredMenuItems = menuItems.filter((item) => item !== null) as {
    label: string;
    href: string;
  }[];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar menuItemsProps={filteredMenuItems} title="پنل کاربری" />
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
