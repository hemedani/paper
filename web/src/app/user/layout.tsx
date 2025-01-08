import { AdminSidebar } from "@/components/organisms/SideBar";
import React, { ReactNode } from "react";

const UserLayout = ({ children }: { children: ReactNode }) => {
    const menuItems = [
        { label: "اطلاعات کاربری", href: "/user" },
        { label: "علاقه مندی ها", href: "/user/favorite" },
      ];
  return (
    <div className="flex h-screen">
      <AdminSidebar menuItemsProps={menuItems} />
      <div className="flex-1 p-6 bg-gray-300">{children}</div>
    </div>
  );
};

export default UserLayout;
