import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
});

export async function GET() {
  const sections = await sanity.fetch(
    `*[_type=="section"]|order(order asc){title, "slug": slug.current, order}`
  );

  const articles = await sanity.fetch(
    `*[_type=="article"]|order(publishedAt desc)[0...5]{title, "slug": slug.current, publishedAt}`
  );

  return Response.json({ ok: true, sections, articles });
}
