import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import { getMe } from "@/app/actions/user/getMe";
import { AdminShell } from "@/components/organisms/admin/AdminShell";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // The panel is staff-only: without a valid session every action below would
  // fail anyway, so send the visitor to the login screen instead of crashing.
  const me = await getMe({ _id: 1, level: 1 });
  if (!me?.success) {
    // Only mention an expired session when a token was actually sent — an
    // anonymous visitor just gets the plain login screen.
    const hadToken = Boolean((await cookies()).get("token"));
    redirect(hadToken ? "/login?expired=1" : "/login");
  }

  return <AdminShell title="پنل مدیریت">{children}</AdminShell>;
}
