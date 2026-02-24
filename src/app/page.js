import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getSections } from "@/lib/getSections";
import { getFeaturedArticles } from "@/lib/getFeaturedArticles";
import { getLatestArticles } from "@/lib/getLatestArticles";

export default async function HomePage() {
  const [sections, featuredArticles] = await Promise.all([
    getSections(),
    getFeaturedArticles(2),
  ]);

  const featuredIds = (featuredArticles || []).map((a) => a._id).filter(Boolean);
  const latestArticles = await getLatestArticles(4, featuredIds);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="container mx-auto px-4 py-14">
          <div className="max-w-3xl">
            <p className="text-sm font-body uppercase tracking-[0.25em] text-muted-foreground">
              Revista Digital
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
              Magazine HorseSuite
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground font-body leading-relaxed">
              Doma clásica, salto, doma vaquera, salud, entrenamiento, yeguadas y cultura ecuestre.
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl font-bold">Destacados</h3>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {(featuredArticles || []).length > 0 ? (
            featuredArticles.map((article) => (
              <ArticleCard
                key={article.slug || article._id}
                article={article}
                variant="featured"
              />
            ))
          ) : (
            <div className="col-span-full rounded-2xl border bg-card p-6 text-muted-foreground font-body">
              Aún no hay artículos publicados. Crea el primero en Sanity y aparecerá aquí.
            </div>
          )}
        </div>
      </section>

      {/* Sections */}
      <section className="container mx-auto px-4 py-10">
        <h3 className="font-display text-2xl font-bold">Explora Nuestras Secciones</h3>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {(sections || []).map((cat) => (
            <Link
              key={cat.slug}
              href={`/seccion/${cat.slug}`}
              className="block rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-black/20"
              aria-label={`Ir a la sección ${cat.title || cat.name}`}
            >
              <div className="text-sm font-body uppercase tracking-wide text-muted-foreground">
                {cat.title || cat.name}
              </div>
              {cat.description ? (
                <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
                  {cat.description}
                </p>
              ) : null}
            </Link>
          ))}
        </div>
      </section>

      {/* Latest */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl font-bold">Últimos Artículos</h3>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(latestArticles || []).length > 0 ? (
            latestArticles.map((article) => (
              <ArticleCard key={article.slug || article._id} article={article} />
            ))
          ) : (
            <div className="col-span-full rounded-2xl border bg-card p-6 text-muted-foreground font-body">
              Publica artículos en Sanity para verlos aquí.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
