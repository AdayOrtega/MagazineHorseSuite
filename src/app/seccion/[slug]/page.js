import Link from "next/link";
import { categories, articles } from "@/data/mockData";
import ArticleCard from "@/components/ArticleCard";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const p = await params;
  const category = categories.find((c) => c.slug === p.slug);
  const title = category ? `${category.name} — Pastor Alemán` : "Sección — Pastor Alemán";
  const description = category?.description ?? "Sección del portal Pastor Alemán.";
  return { title, description };
}

export default async function SectionPage({ params }) {
  const p = await params;

  const category = categories.find((c) => c.slug === p.slug);
  if (!category) {
    return <div className="container mx-auto px-4 py-16">Sección no encontrada</div>;
  }

  const sectionArticles = articles.filter((a) => a.categorySlug === p.slug);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold">{category.name}</h1>
        <div className="section-divider mt-4" />
        <p className="text-muted-foreground font-body mt-6">{category.description}</p>
      </div>

      {sectionArticles.length > 0 ? (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {sectionArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground font-body">
          Próximamente más contenido en esta sección.
          <div className="mt-6">
            <Link href="/" className="text-primary underline underline-offset-4">
              Volver al inicio
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
