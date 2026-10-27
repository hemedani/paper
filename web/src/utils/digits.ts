const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

/** 1234 → ۱۲۳۴ (for anything shown to the reader) */
export const toFaDigits = (value: string | number): string =>
  String(value).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);

/** ۱۲۳۴ / ١٢٣٤ → 1234 (for values sent to the API) */
export const toEnDigits = (value: string): string =>
  value
    .replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(AR_DIGITS.indexOf(d)));

/** Keep digits only, normalised to ASCII. */
export const onlyDigits = (value: string): string => toEnDigits(value).replace(/\D/g, "");

/** 59 → ۰۰:۵۹ */
export const formatClock = (seconds: number): string => {
  const safe = Math.max(0, seconds);
  const mm = String(Math.floor(safe / 60)).padStart(2, "0");
  const ss = String(safe % 60).padStart(2, "0");
  return toFaDigits(`${mm}:${ss}`);
};

/**
 * 12345 → ۱۲٬۳۴۵
 * Uses an explicit separator instead of Intl so server and client markup match.
 */
export const formatFaNumber = (value: number | string): string => {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return toFaDigits(String(value));
  return toFaDigits(String(Math.trunc(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "٬"));
};
