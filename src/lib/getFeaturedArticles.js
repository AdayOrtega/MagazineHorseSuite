import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: true,
});

export async function getFeaturedArticles(limit = 2) {
  const query = `*[_type=="article"]|order(publishedAt desc)[0...$limit]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "section": section->{
      title,
      "slug": slug.current
    },
    "coverImageUrl": coverImage.asset->url
  }`;

  return sanity.fetch(query, { limit });
}
