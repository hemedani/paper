import { AdminSidebar } from "@/components/organisms/SideBar";
import React, { ReactNode } from "react";
import { getMe } from "../actions/user/getMe";
import { Navbar } from "@/components/organisms/Navbar";

const UserLayout = async ({ children }: { children: ReactNode }) => {
  const me = await getMe();
  return (
    <div className="h-screen">
      <Navbar level={me.level} />
      <div className="flex-1 p-6 bg-gray-300">{children}</div>
    </div>
  );
};

export default UserLayout;
