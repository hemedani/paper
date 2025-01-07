"use client";

import Link from "next/link";
import { HamburgerMenu, IconLogo, IconUser } from "../atoms/Icons";
import Cookies from "js-cookie";

export const Navbar = () => {
  const token = Cookies.get("token");

  return (
    <header className="bg-white shadow-xl">
      <div className="mx-auto flex justify-between items-center py-2 px-6">
        <div className="text-lg font-bold text-blue-600">
          <IconLogo />
        </div>

        <div className="hidden md:block">
          <nav className="hidden md:flex items-center space-x-10">
            <div className="flex gap-10 items-center">
              {token && (
                <Link
                  href="/admin"
                  className="text-gray-600 hover:text-blue-500"
                >
                  پنل ادمین
                </Link>
              )}
              {!token && (
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
