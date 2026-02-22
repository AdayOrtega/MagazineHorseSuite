import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";
import { eventBySlugQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import ShareButtons from "@/components/ShareButtons";
import { PortableText } from "@portabletext/react";

export const revalidate = 60;

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

function pickImage(event) {
  return event?.mainImage || event?.image || event?.coverImage || null;
}

function pickDate(event) {
  return event?.date || event?.startDate || null;
}

function pickDescription(event) {
  return event?.description || event?.descriptionShort || event?.excerpt || "";
}

function pickExternalUrl(event) {
  return event?.url || event?.externalUrl || event?.link || "";
}

function pickPortableContent(event) {
  // En tu studio se llama “Contenido (opcional)”. Puede mapear a body/content/contenido según schema.
  return event?.content || event?.body || event?.contenido || null;
}

function formatDate(dateStr) {
  if (!dateStr) return "Sin fecha";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "Sin fecha";
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const portableComponents = {
  block: {
    h2: ({ children }) => <h2 className="text-2xl font-display font-bold mt-8 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-display font-bold mt-6 mb-2">{children}</h3>,
    normal: ({ children }) => <p className="text-base font-body text-muted-foreground leading-relaxed mt-3">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mt-3 space-y-2 text-muted-foreground">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="text-foreground">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noreferrer" className="underline">
        {children}
      </a>
    ),
  },
};

export async function generateMetadata(props) {
  const { params } = props || {};
  const resolvedParams = typeof params?.then === "function" ? await params : params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {
      title: "Evento no encontrado — Pastor Alemán",
      description: "Slug no proporcionado.",
      robots: { index: false, follow: false },
    };
  }

  const event = await client.fetch(eventBySlugQuery, { slug });

  if (!event) {
    return {
      title: "Evento no encontrado — Pastor Alemán",
      description: "Este evento no existe o no está publicado.",
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `${siteUrl()}/eventos/${slug}`;
  const img = pickImage(event);
  const desc = pickDescription(event) || "Evento del mundo del Pastor Alemán.";

  const ogImage = img
    ? urlFor(img).width(1200).height(630).fit("crop").auto("format").url()
    : undefined;

  return {
    title: `${event.title} — Eventos — Pastor Alemán`,
    description: desc,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: event.title,
      description: desc,
      url: canonicalUrl,
      type: "article",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: event.title,
      description: desc,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function EventDetailPage(props) {
  const { params } = props || {};
  const resolvedParams = typeof params?.then === "function" ? await params : params;
  const slug = resolvedParams?.slug;

  if (!slug) return notFound();

  const event = await client.fetch(eventBySlugQuery, { slug });
  if (!event) return notFound();

  const img = pickImage(event);
  const date = pickDate(event);
  const desc = pickDescription(event);
  const canonicalUrl = `${siteUrl()}/eventos/${slug}`;
  const externalUrl = pickExternalUrl(event);
  const portable = pickPortableContent(event);

  // Imagen: más pequeña
  const imageSrc = img ? urlFor(img).width(1000).auto("format").url() : null;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        {imageSrc ? (
          <div className="rounded-2xl border bg-card p-3 md:p-4">
            <Image
              src={imageSrc}
              alt={img?.alt || event.title || "Evento"}
              width={1000}
              height={800}
              className="w-full h-auto rounded-xl"
              priority
            />
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-4">
          <div className="text-sm text-muted-foreground">
            {[event.type, event.country, event.location].filter(Boolean).join(" · ")}
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold">{event.title}</h1>

          <div className="text-sm text-muted-foreground">{formatDate(date)}</div>

          {desc ? (
            <p className="text-base font-body text-muted-foreground leading-relaxed mt-2">{desc}</p>
          ) : null}

          {/* Contenido largo (Portable Text) */}
          {portable ? (
            <div className="mt-6">
              <PortableText value={portable} components={portableComponents} />
            </div>
          ) : null}

          {externalUrl ? (
            <div className="mt-6">
              <a
                href={externalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-xl border px-4 py-2 text-sm hover:bg-muted"
              >
                Ir a la web oficial del evento
              </a>
            </div>
          ) : null}

          <div className="mt-8">
            <ShareButtons title={event.title} canonicalUrl={canonicalUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
