/**
 * Runs after `vite build`. Everything here is for search engines; nothing visible changes.
 *
 *   - writes dist/sitemap.xml and adds its address to dist/robots.txt
 *   - writes the schema.org Person data (src/lib/jsonLd.js) into dist/index.html, so crawlers
 *     that do not run JavaScript still read it (the page refreshes the same data at runtime)
 *   - adds <meta name="google-site-verification"> when profile.googleSiteVerification is set
 *
 * The site's public address comes from, in order:
 *   1. the SITE_URL environment variable
 *   2. profile.siteUrl in src/data/portfolio.js
 *   3. GitHub Actions' GITHUB_REPOSITORY ("owner/repo"):
 *        owner/owner.github.io -> https://owner.github.io/
 *        owner/any-other-repo  -> https://owner.github.io/any-other-repo/
 * With none of these (e.g. a local build), it skips the sitemap rather than
 * writing a wrong address.
 */
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { config } from "dotenv";
import { profile } from "../src/data/portfolio.js";
import { personJsonLd } from "../src/lib/jsonLd.js";

config();

const distDir = path.resolve("dist");

function fromGithubRepository(value) {
  const [owner, repo] = (value || "").split("/");
  if (!owner || !repo) return "";
  const host = `${owner.toLowerCase()}.github.io`;
  return repo.toLowerCase() === host ? `https://${host}/` : `https://${host}/${repo}/`;
}

function resolveSiteUrl() {
  const url = process.env.SITE_URL || profile.siteUrl || fromGithubRepository(process.env.GITHUB_REPOSITORY);
  if (!url) return "";
  return url.endsWith("/") ? url : `${url}/`;
}

const siteUrl = resolveSiteUrl();

if (!siteUrl) {
  console.log("Sitemap skipped: set SITE_URL or profile.siteUrl (GitHub Actions sets it automatically).");
} else {
  const today = new Date().toISOString().slice(0, 10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`;
  await fs.writeFile(path.join(distDir, "sitemap.xml"), sitemap);

  // Point crawlers at the sitemap from robots.txt (copied into dist from public/)
  const robotsPath = path.join(distDir, "robots.txt");
  let robots = "";
  try {
    robots = await fs.readFile(robotsPath, "utf8");
  } catch {
    robots = "User-agent: *\nAllow: /\n";
  }
  robots = robots.replace(/^Sitemap:.*$\n?/gm, "").trimEnd();
  await fs.writeFile(robotsPath, `${robots}\n\nSitemap: ${siteUrl}sitemap.xml\n`);

  console.log(`Wrote dist/sitemap.xml for ${siteUrl}`);
}

// Structured data and Search Console verification, written into the built page's <head>
const indexPath = path.join(distDir, "index.html");
let html = await fs.readFile(indexPath, "utf8");
const jsonLd = JSON.stringify(personJsonLd()).replace(/</g, "\\u003c"); // so no "</script>" inside the data can end the tag early
const tags = [`<script type="application/ld+json" id="person-jsonld">${jsonLd}</script>`];
if (profile.googleSiteVerification) {
  tags.push(`<meta name="google-site-verification" content="${profile.googleSiteVerification}" />`);
}
html = html
  .replace(/\s*<script type="application\/ld\+json" id="person-jsonld">[\s\S]*?<\/script>/, "")
  .replace(/\s*<meta name="google-site-verification"[^>]*>/, "")
  .replace("</head>", `    ${tags.join("\n    ")}\n  </head>`);
await fs.writeFile(indexPath, html);
console.log(`Wrote structured data${profile.googleSiteVerification ? " and Search Console verification" : ""} into dist/index.html`);
