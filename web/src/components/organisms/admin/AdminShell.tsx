"use client";

import { useState, type ReactNode } from "react";
import { SiteHeader } from "@/components/organisms/SiteHeader";
import { AdminSidebar } from "@/components/organisms/SideBar";

/**
 * Shell for the admin + user panels: shared site header on top, collapsible
 * sidebar on the right, and a scrollable content column.
 */
export const AdminShell = ({
  children,
  title = "پنل مدیریت",
  menuItemsProps,
}: {
  children: ReactNode;
  title?: string;
  /** When provided, the sidebar shows this flat list instead of the admin groups. */
  menuItemsProps?: { label: string; href: string }[];
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-[#F8F8F9]">
      <SiteHeader
        bordered
        compact
        hideMobileToggle
        className="shrink-0"
        leading={
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="باز کردن منو"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#5C5C63] transition-colors hover:bg-[#F8F8F9] hover:text-black lg:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        }
      />

      <div className="flex min-h-0 flex-1">
        <AdminSidebar
          title={title}
          menuItemsProps={menuItemsProps}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1320px] px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminShell;
