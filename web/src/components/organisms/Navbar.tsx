"use client";

import { useState } from "react";
import Link from "next/link";
import { HamburgerMenu, IconLogo, IconUser } from "../atoms/Icons";
import { useAuth } from "@/context/AuthContext";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, userLevel, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md border-b border-gray-200 z-50">
      <div className="mx-auto max-w-7xl flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-700">
          <Link href="/" className="flex items-center gap-2">
            <IconLogo />
            <span className="hidden sm:inline">معماری اسلامی</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
          <Link
            href="/"
            className="text-gray-800 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1 transition-all duration-300"
          >
            خانه
          </Link>
          <Link
            href="/blog"
            className="text-gray-800 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1 transition-all duration-300"
          >
            وبلاگ
          </Link>
          <Link
            href="/graph"
            className="text-gray-800 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1 transition-all duration-300"
          >
            نمودار
          </Link>
          <Link
            href="/chatbot"
            className="text-gray-800 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1 transition-all duration-300"
          >
            چت‌بات
          </Link>
          {/* Dropdown for Additional Links */}
          <div className="relative group">
            <button className="text-gray-800 hover:text-blue-600 pb-1 transition-all duration-300">
              بیشتر
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:scale-100 scale-95 transition-all duration-300 z-10">
              <Link
                href="/faq"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                سوالات متداول
              </Link>
              <Link
                href="/about"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                درباره ما
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                تماس با ما
              </Link>
              <Link
                href="/terms"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                شرایط
              </Link>
              <Link
                href="/privacy"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                حریم خصوصی
              </Link>
            </div>
          </div>
        </nav>

        {/* User Links and Hamburger */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && (userLevel === "Ghost" || userLevel === "Manager" || userLevel === "Editor") && (
              <Link
                href="/admin"
                className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
              >
                پنل ادمین
              </Link>
            )}
            {isAuthenticated &&
              (userLevel === "Normal") && (
                <Link
                  href="/user"
                  className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
                >
                  پنل کاربری
                </Link>
              )}
            {isAuthenticated && (
              <button
                onClick={logout}
                className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors duration-300"
              >
                <span>خروج</span>
                <IconUser />
              </button>
            )}
            {!isAuthenticated && (
              <Link
                href="/login"
                className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors duration-300"
              >
                <span>ورود</span>
                <IconUser />
              </Link>
            )}
          </div>
          <button
            className="md:hidden text-gray-800 hover:text-blue-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <HamburgerMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-50">
          <nav className="flex flex-col items-center py-6 space-y-4">
            <Link
              href="/"
              className="text-gray-800 hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              خانه
            </Link>
            <Link
              href="/blog"
              className="text-gray-800 hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              وبلاگ
            </Link>
            <Link
              href="/graph"
              className="text-gray-800 hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              نمودار
            </Link>
            <Link
              href="/chatbot"
              className="text-gray-800 hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              چت‌بات
            </Link>
            <Link
              href="/faq"
              className="text-gray-800 hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              سوالات متداول
            </Link>
            <Link
              href="/about"
              className="text-gray-800 hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              درباره ما
            </Link>
            <Link
              href="/contact"
              className="text-gray-800 hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              تماس با ما
            </Link>
            <Link
              href="/terms"
              className="text-gray-800 hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              شرایط
            </Link>
            <Link
              href="/privacy"
              className="text-gray-800 hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              حریم خصوصی
            </Link>
            {isAuthenticated && (userLevel === "Ghost" || userLevel === "Manager" || userLevel === "Editor") && (
              <Link
                href="/admin"
                className="text-gray-800 hover:text-blue-600 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                پنل ادمین
              </Link>
            )}
            {isAuthenticated &&
              (userLevel === "Normal") && (
                <Link
                  href="/user"
                  className="text-gray-800 hover:text-blue-600 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  پنل کاربری
                </Link>
              )}
            {isAuthenticated ? (
              <button
                className="text-gray-800 hover:text-blue-600 py-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                }}
              >
                خروج
              </button>
            ) : (
              <Link
                href="/login"
                className="text-gray-800 hover:text-blue-600 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ورود
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
