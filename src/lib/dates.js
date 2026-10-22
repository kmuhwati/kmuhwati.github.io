const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** @param {string | null | undefined} iso YYYY-MM or YYYY-MM-DD */
export function formatMonthYear(iso) {
  if (!iso) return "";
  const [year, month] = iso.split("-").map(Number);
  if (!month) return String(year);
  return `${MONTHS[month - 1]} ${year}`;
}

export function formatYear(iso) {
  if (!iso) return "";
  return iso.slice(0, 4);
}

/** @param {string | null} start  null when unknown @param {string | null} end  null = ongoing */
export function formatDateRange(start, end) {
  const from = formatMonthYear(start);
  const to = end ? formatMonthYear(end) : "Present";
  if (!from) return end ? to : "In progress";
  return `${from} – ${to}`;
}

export function formatLocation(location) {
  if (!location) return "";
  return [location.city, location.region, location.country]
    .filter(Boolean)
    .join(", ");
}
