import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import ShareButtons from "@/components/ShareButtons";

import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { articleBySlugQuery, articleSlugsQuery } from "@/lib/sanity/queries";

export async function generateStaticParams() {
  const slugs = await client.fetch(articleSlugsQuery);
  return (slugs || []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await client.fetch(articleBySlugQuery, { slug });

  if (!article) {
    return {
      title: "Artículo no encontrado — Pastor Alemán",
      description: "El artículo solicitado no existe.",
    };
  }

  const ogSource = article.ogImage ?? article.mainImage;
  const ogUrl = ogSource
    ? urlFor(ogSource).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: `${article.title} — Pastor Alemán`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      images: ogUrl ? [{ url: ogUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: ogUrl ? [ogUrl] : [],
    },
  };
}

const ptComponents = {
  types: {
    image: ({ value }) => {
      const src = urlFor(value).width(1400).fit("max").auto("format").url();
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={value?.alt || ""} className="w-full rounded-lg my-8" loading="lazy" />;
    },
  },
};

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await client.fetch(articleBySlugQuery, { slug });

  if (!article) return notFound();

  const heroUrl = article.mainImage
    ? urlFor(article.mainImage).width(1600).height(900).fit("crop").auto("format").url()
    : null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href={article.category?.slug ? `/seccion/${article.category.slug}` : "/articulos"}
            className="text-xs font-semibold uppercase tracking-wider text-primary font-body"
          >
            {article.category?.title || "Artículos"}
          </Link>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mt-3">
            {article.title}
          </h1>

          {article.excerpt ? (
            <p className="text-lg text-muted-foreground font-body mt-4">{article.excerpt}</p>
          ) : null}

          <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-muted-foreground font-body">
            <span>{article.author || "Redacción"}</span>
            <span>·</span>
            <span>
              {article.publishedAt
                ? new Date(article.publishedAt).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : ""}
            </span>
          </div>
        </div>

        {heroUrl ? (
          <div className="relative overflow-hidden rounded-lg aspect-[16/9] mb-10 bg-muted">
            <Image
              src={heroUrl}
              alt={article.mainImage?.alt || article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          </div>
        ) : null}

        <article className="article-prose">
          <PortableText value={article.body || []} components={ptComponents} />
        </article>

        <ShareButtons title={article.title} />

        <div className="mt-12">
          <Link href="/articulos" className="text-primary font-body underline">
            Volver a artículos
          </Link>
        </div>
      </div>
    </div>
  );
}
