import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import ShareButtons from "@/components/ShareButtons";

import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { articleBySlugQuery, articleSlugsQuery } from "@/lib/sanity/queries";

function normalizeSlugItem(item) {
  if (!item) return null;
  if (typeof item === "string") return item;
  if (typeof item.slug === "string") return item.slug;
  if (item.slug?.current) return item.slug.current;
  if (item.current) return item.current;
  return null;
}

function isValidSlug(slug) {
  return typeof slug === "string" && slug.trim().length > 0;
}

export async function generateStaticParams() {
  const slugs = await client.fetch(articleSlugsQuery);
  const list = Array.isArray(slugs) ? slugs : [];

  return list
    .map(normalizeSlugItem)
    .filter((s) => isValidSlug(s))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const p = await Promise.resolve(params);
  const slug = p?.slug;

  if (!isValidSlug(slug)) {
    return {
      title: "Artículo — Magazine HorseSuite",
      description: "Artículo de Magazine HorseSuite.",
    };
  }

  const article = await client.fetch(articleBySlugQuery, { slug });

  if (!article) {
    return {
      title: "Artículo no encontrado — Magazine HorseSuite",
      description: "El artículo solicitado no existe.",
    };
  }

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://magazine.horsesuite.app").replace(
    /\/$/,
    ""
  );

  const canonical = `${siteUrl}/articulo/${slug}`;

  const ogSource = article.ogImage ?? article.coverImage ?? article.mainImage;
  const ogImage = ogSource
    ? urlFor(ogSource).width(1200).height(630).fit("crop").auto("format").url()
    : undefined;

  const description = article.excerpt || "Artículo de Magazine HorseSuite.";

  return {
    title: `${article.title} — Magazine HorseSuite`,
    description,
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description,
      url: canonical,
      type: "article",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: article.title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

const ptComponents = {
  types: {
    image: ({ value }) => {
      const src = urlFor(value).width(1400).fit("max").auto("format").url();
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <figure className="my-8">
          <img
            src={src}
            alt={value?.alt || ""}
            className="w-full rounded-lg"
            loading="lazy"
          />
          {value?.caption ? (
            <figcaption className="mt-2 text-xs text-muted-foreground font-body">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },

    mediaText: ({ value }) => {
      const img = value?.image;
      const imgUrl = img ? urlFor(img).width(1200).fit("max").auto("format").url() : null;
      const isImageRight = value?.layout === "imageRight";
      const content = Array.isArray(value?.content) ? value.content : [];

      // Fallback: si no hay imagen, renderiza solo texto
      if (!imgUrl) {
        return (
          <div className="my-10">
            <PortableText value={content} components={ptComponents} />
          </div>
        );
      }

      return (
        <section className="my-10 grid gap-6 md:grid-cols-2 md:items-start">
          <div className={isImageRight ? "md:order-2" : "md:order-1"}>
            <div className="overflow-hidden rounded-lg bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgUrl}
                alt={img?.alt || ""}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            {img?.caption ? (
              <p className="mt-2 text-xs text-muted-foreground font-body">{img.caption}</p>
            ) : null}
          </div>

          <div className={isImageRight ? "md:order-1" : "md:order-2"}>
            <div className="article-prose">
              <PortableText value={content} components={ptComponents} />
            </div>
          </div>
        </section>
      );
    },
  },
};

export default async function ArticlePage({ params }) {
  const p = await Promise.resolve(params);
  const slug = p?.slug;

  if (!isValidSlug(slug)) return notFound();

  const article = await client.fetch(articleBySlugQuery, { slug });
  if (!article) return notFound();

  // Compat: section (nuevo) o category (viejo)
  const section = article.section || article.category || null;

  // Compat: coverImage (nuevo) o mainImage (viejo)
  const heroSource = article.coverImage ?? article.mainImage ?? null;

  const heroUrl = heroSource
    ? urlFor(heroSource).width(1600).height(900).fit("crop").auto("format").url()
    : null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href={section?.slug ? `/seccion/${section.slug}` : "/articulos"}
            className="text-xs font-semibold uppercase tracking-wider text-primary font-body"
          >
            {section?.title || "Artículos"}
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
              alt={heroSource?.alt || article.title}
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
