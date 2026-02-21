import ArticleCard from "@/components/ArticleCard";
import { articles, categories } from "@/data/mockData";

export default function HomePage() {
  const featuredArticles = articles.filter((a) => a.featured);
  const latestArticles = articles.filter((a) => !a.featured).slice(0, 4);

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
              El Portal de Referencia del Pastor Alemán en Español
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground font-body leading-relaxed">
              Belleza, trabajo, cría responsable, adiestramiento y la comunidad más apasionada.
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
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="featured" />
          ))}
        </div>
      </section>

      {/* Sections */}
      <section className="container mx-auto px-4 py-10">
        <h3 className="font-display text-2xl font-bold">Explora Nuestras Secciones</h3>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div key={cat.slug} className="rounded-2xl border bg-card p-5 shadow-sm">
              <div className="text-sm font-body uppercase tracking-wide text-muted-foreground">
                {cat.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl font-bold">Últimos Artículos</h3>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}
