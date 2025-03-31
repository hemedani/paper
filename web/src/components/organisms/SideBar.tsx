"use client";

import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  HomeIcon, UserIcon, BookOpenIcon, UsersIcon, TagIcon,
  KeyIcon, NewspaperIcon, RssIcon, FolderIcon,
  CogIcon, HeartIcon, LogoutIcon, ChevronLeftIcon, ChevronRightIcon
} from "@/components/atoms/Icons";

type MenuItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const defaultMenuItems: MenuItem[] = [
  { label: "داشبورد", href: "/admin", icon: <HomeIcon className="w-5 h-5" /> },
  { label: "مقالات", href: "/admin/articles", icon: <BookOpenIcon className="w-5 h-5" /> },
  { label: "کاربران", href: "/admin/users", icon: <UsersIcon className="w-5 h-5" /> },
  { label: "نویسندگان", href: "/admin/authors", icon: <UserIcon className="w-5 h-5" /> },
  { label: "برچسب", href: "/admin/tag", icon: <TagIcon className="w-5 h-5" /> },
  { label: "کلمات کلیدی", href: "/admin/keyword", icon: <KeyIcon className="w-5 h-5" /> },
  { label: "منتشر کننده ها", href: "/admin/publication", icon: <NewspaperIcon className="w-5 h-5" /> },
  { label: "بلاگ", href: "/admin/blog", icon: <RssIcon className="w-5 h-5" /> },
  { label: "دسته بندی (بلاگ)", href: "/admin/category", icon: <FolderIcon className="w-5 h-5" /> },
  { label: "پنل کاربری", href: "/user", icon: <CogIcon className="w-5 h-5" /> },
];

type TProps = {
  menuItemsProps?: { label: string; href: string }[];
  title?: string;
};

export const AdminSidebar: FC<TProps> = ({ menuItemsProps, title = "پنل ادمین" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const logOutHandler = async () => {
    logout();
  };

  // Map custom menu items to include icons
  const mappedMenuItems = menuItemsProps ? menuItemsProps.map(item => {
    if (item.href.includes('/user/favorite/blog')) {
      return { ...item, icon: <HeartIcon className="w-5 h-5" /> };
    } else if (item.href.includes('/user/favorite/article')) {
      return { ...item, icon: <HeartIcon className="w-5 h-5" /> };
    } else if (item.href === '/user') {
      return { ...item, icon: <UserIcon className="w-5 h-5" /> };
    } else if (item.href === '/admin') {
      return { ...item, icon: <CogIcon className="w-5 h-5" /> };
    }
    return { ...item, icon: <CogIcon className="w-5 h-5" /> };
  }) : defaultMenuItems;

  const handleToggleCollapse = () => {
    setIsTransitioning(true);
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [collapsed]);

  return (
    <aside
      className={`sticky top-16 h-[calc(100vh-5rem)] bg-gradient-to-b from-indigo-900 to-purple-900 text-white flex flex-col shadow-xl z-10 transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'
        }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-indigo-700/50">
        {!collapsed && (
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-blue-300 opacity-100 transition-opacity duration-300">
            {title}
          </div>
        )}
        <button
          onClick={handleToggleCollapse}
          className="p-2 rounded-full hover:bg-indigo-800/50 transition-all duration-300"
        >
          {collapsed ?
            <ChevronRightIcon className="w-5 h-5" /> :
            <ChevronLeftIcon className="w-5 h-5" />
          }
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-transparent">
        <ul className="space-y-1 p-3">
          {mappedMenuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${pathname === item.href
                  ? "bg-white/10 text-white shadow-lg"
                  : "hover:bg-white/5 text-gray-200"
                  }`}
              >
                <span className="text-indigo-300">{item.icon}</span>
                {!collapsed && (
                  <span className={`font-medium transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    {item.label}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-indigo-700/50 p-3 space-y-1">
        <button
          onClick={() => router.replace("/")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-300"
        >
          <span className="text-indigo-300"><HomeIcon className="w-5 h-5" /></span>
          {!collapsed && (
            <span className={`font-medium transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              خانه
            </span>
          )}
        </button>

        <button
          onClick={logOutHandler}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-300"
        >
          <span className="text-pink-300"><LogoutIcon className="w-5 h-5" /></span>
          {!collapsed && (
            <span className={`font-medium transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              خروج از حساب
            </span>
          )}
        </button>
      </div>

      {!collapsed && (
        <div className="p-4 text-center text-xs text-indigo-300/70">
          <span>© ۱۴۰۳ پنل مدیریت</span>
        </div>
      )}
    </aside>
  );
};
