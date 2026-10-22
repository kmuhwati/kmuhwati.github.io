export function assetUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${path.replace(/^\//, "")}`;
}

/** True for absolute http(s) URLs that should open in a new tab. */
export function isExternal(url) {
  return /^https?:\/\//.test(url || "");
}
