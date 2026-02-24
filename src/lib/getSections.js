import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
});

export async function getSections() {
  return sanity.fetch(
    `*[_type=="section"]|order(order asc, title asc){
      _id,
      title,
      "slug": slug.current,
      order,
      description
    }`
  );
}
