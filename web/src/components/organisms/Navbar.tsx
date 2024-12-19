"use client"

import Link from "next/link";
import { HamburgerMenu, IconLogo, IconShare, IconTwitter, IconUser } from "../atoms/Icons";

export const Navbar = () => {
  return (
    <header className="bg-white shadow-xl">
      <div className="mx-auto flex justify-between items-center py-2 px-6">
        <div className="text-lg font-bold text-blue-600">
          <IconLogo />
        </div>

        <div className="hidden md:block">
          <nav className="hidden md:flex items-center space-x-10">
            {/* <div className="flex items-center gap-3 text-gray-600 hover:text-blue-500">
              <IconShare />
              <span>Share</span>
            </div> */}
            {/* <div className="flex items-center gap-3 text-gray-600 hover:text-blue-500">
              <IconTwitter />
              <span>Fallow</span>
            </div> */}
            {/* <a href="#about" className="text-gray-600 hover:text-blue-500">
              About
            </a> */}
            <Link href="/admin" className="text-gray-600 hover:text-blue-500">
              پنل ادمین
            </Link>
            <div className="flex items-center gap-10 text-gray-600 hover:text-blue-500">
              {/* <span>ورود</span>
              <IconUser /> */}
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
