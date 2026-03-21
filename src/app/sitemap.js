// src/app/sitemap.js
import { client } from "@/lib/sanity/client";
import { articleSlugsQuery } from "@/lib/sanity/queries";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://magazine.horsesuite.app";

function normalizeSlug(item) {
  if (!item) return null;
  if (typeof item === "string") return item.trim() || null;
  if (typeof item?.slug === "string") return item.slug.trim() || null;
  if (typeof item?.slug?.current === "string") return item.slug.current.trim() || null;
  if (typeof item?.current === "string") return item.current.trim() || null;
  return null;
}

export default async function sitemap() {
  const now = new Date();

  const staticRoutes = ["", "/articulos", "/criadores", "/eventos"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.8,
    })
  );

  let slugs = [];
try {
  const data = await client.fetch(articleSlugsQuery);
  console.log("SITEMAP articleSlugsQuery data:", data);
  slugs = Array.isArray(data) ? data : [];
} catch (err) {
  console.error("Error obteniendo slugs del sitemap:", err);
}

  const uniqueSlugs = [...new Set(slugs.map(normalizeSlug).filter(Boolean))];

  const articleRoutes = uniqueSlugs.map((slug) => ({
    url: `${siteUrl}/articulo/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const testRoute = [
  {
    url: `${siteUrl}/articulo/test-seo-manual`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  },
];


  return [...staticRoutes, ...articleRoutes, ...testRoute];
}