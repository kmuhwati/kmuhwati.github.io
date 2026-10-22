import { profile, socials, education, skills } from "../data/portfolio.js";

/** Drop empty strings, nulls, empty arrays and empty objects so search engines only see real values. */
function compact(value) {
  if (Array.isArray(value)) {
    const items = value.map(compact).filter((item) => item !== undefined);
    return items.length ? items : undefined;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value)
      .map(([key, item]) => [key, compact(item)])
      .filter(([, item]) => item !== undefined);
    return entries.length ? Object.fromEntries(entries) : undefined;
  }
  return value === "" || value === null ? undefined : value;
}

/**
 * schema.org Person for search engines. Pure (no DOM), so the build script can write the
 * same data into dist/index.html and the page can refresh it at runtime.
 */
export function personJsonLd() {
  const location = profile.location || {};
  const sameAs = (socials?.links || []).map((link) => link.url).filter((url) => url && !url.startsWith("mailto:"));
  const skillNames = (skills?.categories || [])
    .flatMap((category) => category.items || [])
    .map((item) => (typeof item === "string" ? item : item.name));

  return compact({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.displayName,
    givenName: profile.givenName,
    familyName: profile.familyName,
    jobTitle: profile.role || profile.headline,
    description: profile.summary,
    email: profile.email,
    telephone: profile.phone,
    url: profile.siteUrl,
    // Absolute URL: crawlers resolve the photo against the public site, not the page's base
    image: profile.photo && profile.siteUrl ? new URL(profile.photo, profile.siteUrl).href : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: location.country,
    },
    alumniOf: (education?.items || []).map((school) => ({
      "@type": "CollegeOrUniversity",
      name: school.institution,
    })),
    knowsAbout: skillNames,
    sameAs,
  });
}

export function applyJsonLd() {
  const existing = document.getElementById("person-jsonld");
  if (existing) existing.remove();

  const script = document.createElement("script");
  script.id = "person-jsonld";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(personJsonLd());
  document.head.appendChild(script);
}
