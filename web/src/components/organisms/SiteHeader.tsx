"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

/**
 * The single header used by every page of the site.
 *
 * - `variant="teal"` paints the transparent header that sits on the home hero.
 * - `leading` drops a control before the logo (the chatbot history toggle).
 * - `actions` replaces the account CTA on the end side.
 * - `bordered` adds the divider used by full-height app shells.
 */
export type SiteHeaderProps = {
  variant?: "light" | "teal";
  leading?: ReactNode;
  actions?: ReactNode;
  bordered?: boolean;
  /** Denser layout for app shells (admin / user panels). */
  compact?: boolean;
  /** App shells supply their own drawer, so the site menu button is redundant. */
  hideMobileToggle?: boolean;
  className?: string;
};

const NAV_LINKS = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/blog", label: "وبلاگ" },
  { href: "/graph", label: "نمودار" },
  { href: "/chatbot", label: "چت بات", badge: "جدید" },
];

const POLICY_LINKS = [
  { href: "/privacy", label: "حریم خصوصی" },
  { href: "/terms", label: "شرایط و قوانین" },
  { href: "/faq", label: "سوالات متداول" },
];

export const SiteHeader = ({
  variant,
  leading,
  actions,
  bordered = false,
  compact = false,
  hideMobileToggle = false,
  className = "",
}: SiteHeaderProps) => {
  const pathname = usePathname();
  const { isAuthenticated, userLevel, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [policiesOpen, setPoliciesOpen] = useState(false);
  const policiesRef = useRef<HTMLDivElement>(null);

  // The home page paints the hero behind the header, every other page sits on white.
  const onTeal = (variant ?? (pathname === "/" ? "teal" : "light")) === "teal";

  useEffect(() => {
    setMobileOpen(false);
    setPoliciesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!policiesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (policiesRef.current && !policiesRef.current.contains(e.target as Node)) {
        setPoliciesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [policiesOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const isPolicyActive = POLICY_LINKS.some((l) => pathname.startsWith(l.href));

  const panelHref =
    userLevel === "Ghost" || userLevel === "Manager" || userLevel === "Editor" ? "/admin" : "/user";
  const panelLabel =
    userLevel === "Ghost" || userLevel === "Manager" || userLevel === "Editor"
      ? "پنل مدیریت"
      : "پنل کاربری";

  const linkBase = [
    "whitespace-nowrap font-semibold leading-[1.76] transition-opacity duration-200",
    compact ? "text-[13.5px]" : "text-[15px] xl:text-[16px]",
  ].join(" ");
  const linkColor = onTeal ? "text-white/85 hover:text-white" : "text-[#5C5C63] hover:text-black";
  const linkActive = onTeal ? "text-white" : "text-black";

  const ctaBase =
    "flex shrink-0 items-center gap-[10px] rounded-[18px] font-semibold transition-colors";
  const ctaSize = compact
    ? "h-11 px-4 text-[13px]"
    : "h-[56px] px-5 text-[15px] xl:h-[68px] xl:px-7 xl:text-[16px]";

  return (
    <header
      dir="rtl"
      className={[
        "z-40 w-full",
        onTeal ? "absolute inset-x-0 top-0 bg-transparent" : "relative bg-white",
        bordered ? "border-b border-[#F0F0F2]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          "mx-auto w-full max-w-[1600px]",
          compact ? "px-4 sm:px-6 lg:px-8" : "px-5 sm:px-8 lg:px-[104px]",
          bordered && !compact ? "pb-4 lg:pb-5" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          className={[
            "flex items-center justify-between gap-4",
            compact ? "py-3" : "pt-5 lg:pt-[50px]",
          ].join(" ")}
        >
          {/* ── Logo (right in RTL) ───────────────────────────────── */}
          <div className="flex min-w-0 items-center gap-3">
            {leading}
            <Link href="/" className="flex shrink-0 items-center" aria-label="پایگاه دانش">
              <Image
                src={onTeal ? "/images/hero/logo.svg" : "/images/hero/logo-dark.svg"}
                alt="پایگاه دانش"
                width={161}
                height={51}
                priority
                className={
                  compact
                    ? "h-[30px] w-auto lg:h-[32px]"
                    : "h-[38px] w-auto lg:h-[44px] xl:h-[51px]"
                }
              />
            </Link>
          </div>

          {/* ── Desktop navigation (centered) ─────────────────────── */}
          <nav className={compact ? "hidden items-center gap-5 lg:flex" : "hidden items-center gap-[24px] lg:flex xl:gap-[42px]"}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={[
                  linkBase,
                  "flex items-center gap-2",
                  isActive(link.href) ? linkActive : linkColor,
                ].join(" ")}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="rounded-[12px] bg-[#D2A634] px-2 py-[2px] text-[11px] font-semibold leading-[1.6] text-white xl:text-[12px]">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            {/* Policies dropdown */}
            <div className="relative" ref={policiesRef}>
              <button
                type="button"
                onClick={() => setPoliciesOpen((v) => !v)}
                aria-expanded={policiesOpen}
                className={[
                  linkBase,
                  "flex items-center gap-2",
                  isPolicyActive || policiesOpen ? linkActive : linkColor,
                ].join(" ")}
              >
                <span>سیاست ها</span>
                <svg
                  width="9"
                  height="6"
                  viewBox="0 0 9 6"
                  fill="none"
                  aria-hidden
                  className={`transition-transform duration-200 ${policiesOpen ? "rotate-180" : ""}`}
                >
                  <path
                    d="M1 1L4.5 4.5L8 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {policiesOpen && (
                <div className="absolute left-1/2 top-full z-50 mt-4 w-[210px] -translate-x-1/2 overflow-hidden rounded-[18px] border border-[#F0F0F2] bg-white py-2 shadow-[0px_24px_48px_-16px_rgba(0,0,0,0.18)]">
                  {POLICY_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-5 py-3 text-right text-[15px] font-semibold text-[#5C5C63] transition-colors hover:bg-[#F8F8F9] hover:text-black"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* ── Account / custom actions (left in RTL) ────────────── */}
          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            {actions ??
              (isAuthenticated ? (
                <>
                  <Link
                    href={panelHref}
                    className={[
                      ctaBase,
                      ctaSize,
                      onTeal
                        ? "bg-white/[0.18] text-white hover:bg-white/25"
                        : "bg-[#08A6AE] text-white hover:bg-[#088f96]",
                    ].join(" ")}
                  >
                    <span>{panelLabel}</span>
                    <Image src="/images/hero/user-icon.svg" alt="" width={24} height={24} />
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className={[
                      "flex shrink-0 items-center gap-2 rounded-[18px] font-semibold transition-colors",
                      compact ? "h-11 px-4 text-[13px]" : "h-[56px] px-5 text-[15px] xl:h-[68px] xl:px-6",
                      onTeal
                        ? "bg-white/10 text-white hover:bg-white/20"
                        : "bg-[#F8F8F9] text-[#5C5C63] hover:bg-[#EFEFF1] hover:text-black",
                    ].join(" ")}
                  >
                    <span>خروج</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M15 17l5-5-5-5M20 12H9M12 21H6a2 2 0 01-2-2V5a2 2 0 012-2h6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className={[
                    ctaBase,
                    ctaSize,
                    "px-6 xl:px-8",
                    onTeal
                      ? "bg-white/[0.18] text-white hover:bg-white/25"
                      : "bg-[#08A6AE] text-white hover:bg-[#088f96]",
                  ].join(" ")}
                >
                  <span>ورود و ثبت نام</span>
                  <Image src="/images/hero/user-icon.svg" alt="" width={24} height={24} />
                </Link>
              ))}
          </div>

          {/* ── Mobile toggle ─────────────────────────────────────── */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={mobileOpen}
            className={`shrink-0 lg:hidden ${onTeal ? "text-white" : "text-black"} ${hideMobileToggle ? "hidden" : ""}`}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              {mobileOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        {/* ── Mobile menu ─────────────────────────────────────────── */}
        {mobileOpen && (
          <div
            className={[
              "mt-4 flex flex-col gap-1 rounded-[20px] p-3 lg:hidden",
              onTeal
                ? "bg-black/20 backdrop-blur-sm"
                : "border border-[#F0F0F2] bg-white shadow-[0px_24px_48px_-24px_rgba(0,0,0,0.2)]",
            ].join(" ")}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={[
                  "flex items-center justify-between rounded-[14px] px-4 py-3 text-[15px] font-semibold",
                  onTeal
                    ? "text-white hover:bg-white/10"
                    : isActive(link.href)
                      ? "bg-[#EDFEFF] text-[#08A6AE]"
                      : "text-[#3C3C42] hover:bg-[#F8F8F9]",
                ].join(" ")}
              >
                <span className="flex items-center gap-2">
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="rounded-[10px] bg-[#D2A634] px-2 py-[1px] text-[11px] font-semibold text-white">
                      {link.badge}
                    </span>
                  )}
                </span>
              </Link>
            ))}

            <div
              className={`my-1 h-px w-full ${onTeal ? "bg-white/20" : "bg-[#F0F0F2]"}`}
              aria-hidden
            />

            {POLICY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "rounded-[14px] px-4 py-3 text-[15px] font-semibold",
                  onTeal ? "text-white/85 hover:bg-white/10" : "text-[#5C5C63] hover:bg-[#F8F8F9]",
                ].join(" ")}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  href={panelHref}
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-[16px] bg-[#08A6AE] px-6 py-4 text-[15px] font-semibold text-white"
                >
                  <span>{panelLabel}</span>
                  <Image src="/images/hero/user-icon.svg" alt="" width={20} height={20} />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                  }}
                  className={[
                    "mt-1 flex items-center justify-center gap-2 rounded-[16px] px-6 py-4 text-[15px] font-semibold",
                    onTeal ? "bg-white/10 text-white" : "bg-[#F8F8F9] text-[#5C5C63]",
                  ].join(" ")}
                >
                  خروج
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-[16px] bg-[#08A6AE] px-6 py-4 text-[15px] font-semibold text-white"
              >
                <span>ورود و ثبت نام</span>
                <Image src="/images/hero/user-icon.svg" alt="" width={20} height={20} />
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
