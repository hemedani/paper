import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getMe } from "../actions/user/getMe";
import { AdminShell } from "@/components/organisms/admin/AdminShell";

const UserLayout = async ({ children }: { children: ReactNode }) => {
  const me = await getMe({ _id: 1, level: 1 });
  if (!me?.success) {
    const hadToken = Boolean((await cookies()).get("token"));
    redirect(hadToken ? "/login?expired=1" : "/login");
  }

  const menuItems = [
    { label: "اطلاعات کاربری", href: "/user" },
    { label: "پست‌های وبلاگ مورد علاقه", href: "/user/favorite/blog" },
    { label: "مقالات مورد علاقه", href: "/user/favorite/article" },
    me.body.level === "Ghost" || me.body.level === "Manager"
      ? { label: "پنل ادمین", href: "/admin" }
      : null,
  ];

  const filteredMenuItems = menuItems.filter((item) => item !== null) as {
    label: string;
    href: string;
  }[];

  return (
    <AdminShell title="پنل کاربری" menuItemsProps={filteredMenuItems}>
      {children}
    </AdminShell>
  );
};

export default UserLayout;
