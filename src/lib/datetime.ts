// Locale-aware date formatting helper. Bans hardcoded month arrays —
// every UI date must go through Intl.DateTimeFormat with the active locale.

export function formatDate(
  value: Date | string | number,
  locale: string,
  opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" },
): string {
  try {
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat(locale || "fr", opts).format(d);
  } catch {
    return "";
  }
}

export function formatDateTime(value: Date | string | number, locale: string): string {
  return formatDate(value, locale, {
    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}
