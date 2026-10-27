import Link from "next/link";
import type { ReactNode } from "react";
import { formatFaNumber } from "@/utils/digits";

/* ═══════════════════════════════════════════════════════════════════════════
   Admin UI kit — the small set of primitives every admin screen is built from.
   Mirrors the public site: white panels, #F0F0F2 hairlines, 24px radii,
   teal #08A6AE accents and gold #D2A634 highlights.
   ═══════════════════════════════════════════════════════════════════════════ */

export const btn = {
  primary:
    "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[14px] bg-[#08A6AE] px-5 text-[13.5px] font-bold text-white transition-colors hover:bg-[#079aa2] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#08A6AE]/20",
  secondary:
    "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[14px] border border-[#F0F0F2] bg-white px-5 text-[13.5px] font-semibold text-[#5C5C63] transition-colors hover:bg-[#F8F8F9] hover:text-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/5",
  soft:
    "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[14px] bg-[#F8F8F9] px-5 text-[13.5px] font-semibold text-[#5C5C63] transition-colors hover:bg-[#F0F0F2] hover:text-black",
  danger:
    "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[14px] bg-[#FEF3F3] px-5 text-[13.5px] font-bold text-[#C2353D] transition-colors hover:bg-[#FCE7E8]",
} as const;

export const field =
  "h-11 w-full rounded-[14px] border-[1.5px] border-[#F0F0F2] bg-white px-4 text-[13.5px] font-medium text-black outline-none transition-all placeholder:text-[#C4C4CA] focus:border-[#08A6AE] focus:ring-4 focus:ring-[#08A6AE]/10";

export const fieldError =
  "border-[#E2555B] bg-[#FEF5F5] focus:border-[#E2555B] focus:ring-[#E2555B]/10";

/* ── Shared form layout strings ──────────────────────────────────────────── */
export const formGrid = "grid grid-cols-1 gap-4 md:grid-cols-2";
export const formGrid3 = "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3";
export const formFooter =
  "flex flex-col-reverse gap-2 border-t border-[#F0F0F2] pt-4 sm:flex-row sm:items-center sm:justify-end";

/* ── Labelled field ──────────────────────────────────────────────────────── */
export const AdminField = ({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className = "",
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-center gap-1 text-[12.5px] font-bold text-[#5C5C63]"
    >
      {label}
      {required && <span className="text-[#E2555B]">*</span>}
    </label>
    {children}
    {error ? (
      <p className="mt-1.5 flex items-center gap-1 text-[11.5px] font-semibold text-[#C2353D]">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 7.5v5.5M12 16.2v.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        {error}
      </p>
    ) : (
      hint && <p className="mt-1.5 text-[11.5px] font-medium text-[#9A9AA1]">{hint}</p>
    )}
  </div>
);

/* ── Segmented control (used for the hard-cascade yes/no) ────────────────── */
export const AdminSegmented = <T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
}) => (
  <div>
    {label && (
      <p className="mb-1.5 text-[12.5px] font-bold text-[#5C5C63]">{label}</p>
    )}
    <div className="inline-flex rounded-[14px] bg-[#F8F8F9] p-1">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={active}
            className={[
              "inline-flex h-9 items-center justify-center rounded-[10px] px-4 text-[12.5px] font-bold transition-all",
              active
                ? "bg-white text-[#08A6AE] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                : "text-[#9A9AA1] hover:text-[#5C5C63]",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  </div>
);

/* ── Back link used at the top of create/edit screens ────────────────────── */
export const AdminBackLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#9A9AA1] transition-colors hover:text-[#08A6AE]"
  >
    <span className="text-current">{AdminIcon.back}</span>
    {label}
  </Link>
);

/* ── Create / edit screen shell ──────────────────────────────────────────── */
export const AdminFormPage = ({
  title,
  subtitle,
  backHref,
  backLabel,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  backHref: string;
  backLabel: string;
  actions?: ReactNode;
  children: ReactNode;
}) => (
  <div className="space-y-5">
    <AdminBackLink href={backHref} label={backLabel} />
    <AdminPageHeader title={title} subtitle={subtitle} actions={actions} />
    {children}
  </div>
);

type Tone = "teal" | "gold" | "ink" | "soft";

const toneStyles: Record<Tone, { chip: string; value: string }> = {
  teal: { chip: "bg-[#EDFEFF] text-[#08A6AE]", value: "text-black" },
  gold: { chip: "bg-[#FAF6EB] text-[#B98F26]", value: "text-black" },
  ink: { chip: "bg-[#F8F8F9] text-[#3C3C42]", value: "text-black" },
  soft: { chip: "bg-[#F8F8F9] text-[#9A9AA1]", value: "text-black" },
};

/* ── Page header ─────────────────────────────────────────────────────────── */
export const AdminPageHeader = ({
  title,
  subtitle,
  badge,
  actions,
}: {
  title: string;
  subtitle?: string;
  /** Rendered inline next to the title (e.g. a record count). */
  badge?: ReactNode;
  actions?: ReactNode;
}) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h1 className="text-[22px] font-extrabold leading-[1.55] text-black lg:text-[26px]">
          {title}
        </h1>
        {badge}
      </div>
      {subtitle && (
        <p className="mt-1.5 text-[12.5px] font-medium leading-[1.9] text-[#9A9AA1] lg:text-[13.5px]">
          {subtitle}
        </p>
      )}
    </div>
    {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
  </div>
);

/* ── Panel ───────────────────────────────────────────────────────────────── */
export const AdminPanel = ({
  title,
  description,
  icon,
  actions,
  children,
  bodyClassName = "p-5",
  className = "",
}: {
  title?: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  bodyClassName?: string;
  className?: string;
}) => (
  <section
    className={`overflow-hidden rounded-[24px] border border-[#F0F0F2] bg-white ${className}`}
  >
    {(title || actions) && (
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0F0F2] px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          {icon && (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#EDFEFF] text-[#08A6AE]">
              {icon}
            </span>
          )}
          <div className="min-w-0">
            {title && <h2 className="truncate text-[14.5px] font-bold text-black">{title}</h2>}
            {description && (
              <p className="truncate text-[11.5px] font-medium text-[#9A9AA1]">{description}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </header>
    )}
    <div className={bodyClassName}>{children}</div>
  </section>
);

/* ── Stat tile ───────────────────────────────────────────────────────────── */
export const AdminStatTile = ({
  label,
  value,
  hint,
  icon,
  tone = "teal",
  href,
}: {
  label: string;
  value: number | string | undefined;
  hint?: string;
  icon?: ReactNode;
  tone?: Tone;
  href?: string;
}) => {
  const t = toneStyles[tone];
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="text-[12.5px] font-bold text-[#5C5C63]">{label}</span>
        {icon && (
          <span className={`flex h-9 w-9 items-center justify-center rounded-[12px] ${t.chip}`}>
            {icon}
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
        <span className={`text-[24px] font-extrabold leading-none sm:text-[28px] ${t.value}`}>
          {value === undefined || value === null ? "—" : formatFaNumber(value)}
        </span>
        {hint && (
          <span className="hidden pb-1 text-[11px] font-medium text-[#9A9AA1] sm:inline">
            {hint}
          </span>
        )}
      </div>
    </>
  );

  const shell =
    "block rounded-[20px] border border-[#F0F0F2] bg-white p-3.5 transition-all duration-200 sm:p-4";

  return href ? (
    <Link href={href} className={`${shell} hover:-translate-y-0.5 hover:border-[#08A6AE]/30 hover:shadow-[0_18px_36px_-28px_rgba(8,166,174,0.7)]`}>
      {inner}
    </Link>
  ) : (
    <div className={shell}>{inner}</div>
  );
};

/* ── Empty state ─────────────────────────────────────────────────────────── */
export const AdminEmptyState = ({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}) => (
  <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F8F8F9] text-[#C4C4CA]">
      {icon ?? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
    </span>
    <p className="text-[15px] font-bold text-black">{title}</p>
    {description && (
      <p className="max-w-[360px] text-[12.5px] font-medium leading-[1.9] text-[#9A9AA1]">
        {description}
      </p>
    )}
    {action}
  </div>
);

/* ── Count chip ──────────────────────────────────────────────────────────── */
export const AdminCountChip = ({ value, label }: { value: number; label: string }) => (
  <span className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#F8F8F9] px-3.5 text-[12px] font-bold text-[#5C5C63]">
    <span className="tabular-nums text-black">{formatFaNumber(value)}</span>
    {label}
  </span>
);

/* ── Icon-only action button (keeps card footers on a single row) ────────── */
type ActionTone = "teal" | "neutral" | "danger" | "gold";

const actionTone: Record<ActionTone, string> = {
  teal: "bg-[#EDFEFF] text-[#08A6AE] hover:bg-[#DBF7F9]",
  neutral: "bg-[#F8F8F9] text-[#5C5C63] hover:bg-[#F0F0F2] hover:text-black",
  danger: "bg-[#FEF3F3] text-[#C2353D] hover:bg-[#FCE7E8]",
  gold: "bg-[#FAF6EB] text-[#B98F26] hover:bg-[#F5EEDA]",
};

export const AdminIconButton = ({
  label,
  icon,
  tone = "neutral",
  onClick,
  href,
  className = "",
}: {
  label: string;
  icon: ReactNode;
  tone?: ActionTone;
  onClick?: () => void;
  href?: string;
  className?: string;
}) => {
  const cls = [
    "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] transition-colors",
    actionTone[tone],
    className,
  ].join(" ");

  return href ? (
    <Link href={href} title={label} aria-label={label} className={cls}>
      {icon}
    </Link>
  ) : (
    <button type="button" onClick={onClick} title={label} aria-label={label} className={cls}>
      {icon}
    </button>
  );
};

/* ── Small inline icon set (avoids pulling the legacy icon file) ─────────── */
export const AdminIcon = {
  plus: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  search: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  back: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M11 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  edit: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20h4l10-10a2.5 2.5 0 10-3.5-3.5L4.5 16.5 4 20z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  trash: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M9 7V5.5A1.5 1.5 0 0110.5 4h3A1.5 1.5 0 0115 5.5V7M6.5 7l.8 12a2 2 0 002 1.9h5.4a2 2 0 002-1.9L17.5 7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  link: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10 13.5a4 4 0 005.7 0l2.8-2.8a4 4 0 00-5.7-5.7L11.5 6.3M14 10.5a4 4 0 00-5.7 0L5.5 13.3a4 4 0 005.7 5.7l1.3-1.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  ),
  eye: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ),
  refresh: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 12a8 8 0 10-2.6 5.9M20 5v5h-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  empty: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 8.5A2.5 2.5 0 016.5 6h11A2.5 2.5 0 0120 8.5v7A2.5 2.5 0 0117.5 18h-11A2.5 2.5 0 014 15.5v-7z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M8 11h8M8 14.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  close: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  save: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 4.5h11l3 3V19a1.5 1.5 0 01-1.5 1.5h-12A1.5 1.5 0 014 19V6a1.5 1.5 0 011-1.5z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M8 4.5V9h7V4.5M8 15h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  image: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="9" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4.5 17l4.6-4.4a2 2 0 012.8 0l5.6 5.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  book: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 5.5A1.5 1.5 0 015.5 4H10a2 2 0 012 2v13a1.5 1.5 0 00-1.5-1.5H5.5A1.5 1.5 0 014 16V5.5z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M20 5.5A1.5 1.5 0 0018.5 4H14a2 2 0 00-2 2v13a1.5 1.5 0 011.5-1.5h5A1.5 1.5 0 0020 16V5.5z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  ),
  tag: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 11.2V5.5A1.5 1.5 0 015.5 4h5.7a2 2 0 011.4.6l7 7a2 2 0 010 2.8l-5.2 5.2a2 2 0 01-2.8 0l-7-7A2 2 0 014 11.2z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="8.4" cy="8.4" r="1.4" fill="currentColor" />
    </svg>
  ),
  key: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="8" cy="15.5" r="3.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10.6 12.9L19 4.5M16 7.5l2.2 2.2M18 5.5l2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  user: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8.5" r="3.7" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4.8 20c.6-3.5 3.6-5.6 7.2-5.6s6.6 2.1 7.2 5.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  news: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6.5A1.5 1.5 0 015.5 5h9A1.5 1.5 0 0116 6.5V18a1.5 1.5 0 001.5 1.5h1A1.5 1.5 0 0020 18V9h-4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M7.5 9h5M7.5 12.5h5M7.5 16h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  folder: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7.5A1.5 1.5 0 015.5 6h3.2a2 2 0 011.6.8l.9 1.2h6.3A1.5 1.5 0 0119 9.5v8A1.5 1.5 0 0117.5 19h-12A1.5 1.5 0 014 17.5v-10z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  ),
  rss: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="6.5" cy="17.5" r="1.8" fill="currentColor" />
      <path d="M5 11a8 8 0 018 8M5 5a14 14 0 0114 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};
