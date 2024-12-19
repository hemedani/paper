import { AdminSidebar } from "@/components/organisms/SideBar";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 bg-gray-300">{children}</div>
    </div>
  );
}
