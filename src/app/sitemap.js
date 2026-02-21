// src/app/sitemap.js
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://portalpastoraleman.com";

export default async function sitemap() {
  const now = new Date();
  const routes = ["", "/articulos", "/criadores", "/eventos"];

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
