import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { getMe } from "./actions/user/getMe";
import { AuthProvider, UserLevel } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "پایگاه دانش | معماری و شهرسازی ایرانی اسلامی",
  description:
    "بانک جامع مقالات معماری و شهرسازی ایرانی اسلامی؛ جستجوی پیشرفته، نمودار بصری ارتباط مقالات و وبلاگ تخصصی.",
};

const VALID_LEVELS: UserLevel[] = ["Ghost", "Manager", "Editor", "Normal"];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The server's answer seeds the auth context, so the header can never claim a
  // session the API would reject.
  const me = await getMe();
  const isAuthenticated = Boolean(me?.success);
  const rawLevel = me?.success ? me.body.level : null;
  const userLevel = VALID_LEVELS.includes(rawLevel as UserLevel)
    ? (rawLevel as UserLevel)
    : null;

  return (
    <html lang="fa" dir="rtl">
      <body className="bg-white">
        <AuthProvider
          initialIsAuthenticated={isAuthenticated}
          initialUserLevel={userLevel}
        >
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </AuthProvider>
      </body>
    </html>
  );
}
