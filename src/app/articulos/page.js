import { client } from "@/lib/sanity/client";
import { articlesListQuery } from "@/lib/sanity/queries";
import ArticleCard from "@/components/ArticleCard";

export const revalidate = 60;

export default async function ArticulosPage() {
  const articles = await client.fetch(
    articlesListQuery,
    {},
    { next: { revalidate: 60 } }
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-display text-5xl font-bold text-center">Artículos</h1>
        <p className="text-center text-muted-foreground font-body mt-4">
          Guías, reportajes, entrevistas y contenidos prácticos sobre el mundo del caballo.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {(articles || []).map((a) => (
            <ArticleCard key={a._id || a.slug} article={a} />
          ))}
        </div>
      </div>
    </div>
  );
}
