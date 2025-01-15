import { AdminSidebar } from "@/components/organisms/SideBar";
import React, { ReactNode } from "react";
import { getMe } from "../actions/user/getMe";

const UserLayout = async ({ children }: { children: ReactNode }) => {
  const me = await getMe();

  const menuItems = [
    { label: "اطلاعات کاربری", href: "/user" },
    { label: "علاقه مندی ها", href: "/user/favorite" },
    me.level === "Ghost" ? { label: "پنل ادمین", href: "/admin" } : null,
  ];

  const filteredMenuItems = menuItems.filter((item) => item !== null) as {
    label: string;
    href: string;
  }[];

  return (
    <div className="flex h-screen">
      <AdminSidebar menuItemsProps={filteredMenuItems} />
      <div className="flex-1 p-6 bg-gray-300">{children}</div>
    </div>
  );
};

export default UserLayout;
