import { client } from "@/lib/sanity/client";
import { articlesListQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import Link from "next/link";

export const metadata = {
  title: "Artículos — Pastor Alemán",
  description: "Explora todos los artículos del portal Pastor Alemán.",
};

export default async function ArticulosPage() {
  const items = await client.fetch(articlesListQuery);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold">Artículos</h1>
        <div className="section-divider mt-4" />
        <p className="text-muted-foreground font-body mt-6">
          Guías, reportajes, entrevistas y noticias sobre el Pastor Alemán.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {items.map((a) => {
          const img = a?.mainImage ? urlFor(a.mainImage).width(1200).height(900).url() : null;

          return (
            <Link key={a._id} href={`/articulo/${a.slug}`} className="group block">
              <article className="overflow-hidden">
                <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4 bg-muted">
                  {img ? (
                    <img
                      src={img}
                      alt={a.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : null}
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-primary font-body">
                  {a.category?.title ?? "Artículo"}
                </span>

                <h3 className="font-display text-xl font-bold text-foreground leading-snug mt-1 group-hover:text-primary transition-colors">
                  {a.title}
                </h3>

                <p className="text-sm text-muted-foreground font-body mt-2 line-clamp-2">
                  {a.excerpt}
                </p>

                <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground font-body">
                  <span>{a.author ?? "Redacción"}</span>
                  <span>·</span>
                  <span>
                    {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString("es-ES") : ""}
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
