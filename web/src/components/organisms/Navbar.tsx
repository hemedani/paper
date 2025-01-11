"use client";

import Link from "next/link";
import { HamburgerMenu, IconLogo, IconUser } from "../atoms/Icons";

export const Navbar = ({ level }: { level: string }) => {

  return (
    <header className="bg-white shadow-xl">
      <div className="mx-auto flex justify-between items-center py-2 px-6">
        <div className="flex justify-between items-center gap-3 text-bold">
          <div className="text-lg font-bold text-blue-600">
            <IconLogo />
          </div>
          <div className="text-lg font-bold text-blue-600">
            <Link href={"/"}>خانه</Link>
          </div>
        </div>
        <div className="hidden md:block">
          <nav className="hidden md:flex items-center space-x-10">
            <div className="flex gap-10 items-center">
              {level === "Ghost" && (
                <Link
                  href="/admin"
                  className="text-gray-600 hover:text-blue-500"
                >
                  پنل ادمین
                </Link>
              )}
              {(level === "Manager" || level === "Editor") && (
                <Link
                  href="/user"
                  className="text-gray-600 hover:text-blue-500"
                >
                  پنل کاربری
                </Link>
              )}
              {!level && (
                <div className="flex items-center gap-10 text-gray-600 hover:text-blue-500">
                  <Link href={"/login"} className="flex items-center gap-3">
                    <span>ورود</span>
                    <IconUser />
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="md:hidden">
          <button className="text-gray-600 hover:text-blue-500">
            <HamburgerMenu />
          </button>
        </div>
      </div>
    </header>
  );
};
