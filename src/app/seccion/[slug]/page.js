import Link from "next/link";
import Image from "next/image";

import ArticleCard from "@/components/ArticleCard";
import PreLanding from "@/components/pre/PreLanding";

import { client } from "@/lib/sanity/client";
import { articlesListQuery } from "@/lib/sanity/queries";

export const revalidate = 60;

const sectionSlugsQuery = `*[_type=="section" && defined(slug.current)][]{ "slug": slug.current }`;
const sectionBySlugQuery = `*[_type=="section" && slug.current==$slug][0]{ title, "slug": slug.current, order }`;

const articlesBySectionQuery = `*[_type=="article" && section->slug.current==$slug]|order(publishedAt desc){
  _id,
  title,
  excerpt,
  publishedAt,
  "slug": slug.current,
  "coverImageUrl": coverImage.asset->url
}`;

export async function generateStaticParams() {
  const slugs = await client.fetch(sectionSlugsQuery);
  return (slugs || []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const p = await Promise.resolve(params);
  const slug = p?.slug;

  const section = await client.fetch(sectionBySlugQuery, { slug });
  const title = section?.title ? `${section.title} — Magazine HorseSuite` : "Sección — Magazine HorseSuite";
  const description =
    slug === "pre"
      ? "Historia, morfología, usos y claves prácticas del Pura Raza Española (PRE)."
      : "Sección de Magazine HorseSuite.";

  return { title, description };
}

export default async function SectionPage({ params }) {
  const p = await Promise.resolve(params);
  const slug = p?.slug;

  // PRE = landing editorial + artículos PRE
  if (slug === "pre") {
    const section = await client.fetch(sectionBySlugQuery, { slug });
    const articles = await client.fetch(articlesBySectionQuery, { slug });

    // usa la portada del último artículo PRE como hero si existe
    const heroImageUrl = articles?.[0]?.coverImageUrl || null;

    return (
      <PreLanding
        sectionTitle={section?.title || "PRE"}
        heroImageUrl={heroImageUrl}
        articles={articles || []}
      />
    );
  }

  // resto de secciones = grid de artículos (Sanity)
  const section = await client.fetch(sectionBySlugQuery, { slug });
  if (!section) {
    return <div className="container mx-auto px-4 py-16">Sección no encontrada</div>;
  }

  // si ya tienes query específica por sección, úsala; aquí reusamos el listado y filtramos
  const allArticles = await client.fetch(articlesListQuery);
  const sectionArticles = (allArticles || []).filter((a) => a?.category?.slug === slug || a?.section?.slug === slug);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold">{section.title}</h1>
        <div className="section-divider mt-4" />
        <p className="text-muted-foreground font-body mt-6">
          Artículos y guías de {section.title}.
        </p>
      </div>

      {sectionArticles.length > 0 ? (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {sectionArticles.map((article) => (
            <ArticleCard key={article.slug || article._id} article={article} />
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
