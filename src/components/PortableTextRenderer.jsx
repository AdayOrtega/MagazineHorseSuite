import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/image";

function Img({ value, className = "" }) {
  if (!value?.asset) return null;
  const src = urlFor(value).width(1600).fit("max").auto("format").url();
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={value?.alt || ""} className={className} loading="lazy" />;
}

// Componentes “base” (para evitar recursión rara cuando renderizamos richText)
const baseComponents = {
  types: {
    image: ({ value }) => <Img value={value} className="w-full rounded-lg my-8" />,

    // ✅ Wrapper: richText { content: [portableText blocks...] }
    richText: ({ value }) => (
      <div className="article-prose">
        <PortableText value={value?.content || []} components={baseComponents} />
      </div>
    ),

    // ✅ Bloque “imagen + texto”
    mediaText: ({ value }) => {
      const isImageRight = value?.layout === "imageRight";
      return (
        <section className="my-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className={isImageRight ? "md:order-2" : "md:order-1"}>
            <Img value={value?.image} className="w-full rounded-xl" />
            {value?.caption ? (
              <p className="mt-2 text-xs text-muted-foreground font-body">{value.caption}</p>
            ) : null}
          </div>

          <div className={isImageRight ? "md:order-1" : "md:order-2"}>
            <div className="article-prose">
              <PortableText value={value?.content || []} components={baseComponents} />
            </div>
          </div>
        </section>
      );
    },

    // ✅ Bloque “callout”
    callout: ({ value }) => {
      const tone = value?.tone || "info";
      const toneClass =
        tone === "warning"
          ? "border-yellow-300 bg-yellow-50"
          : tone === "danger"
          ? "border-red-300 bg-red-50"
          : tone === "tip"
          ? "border-emerald-300 bg-emerald-50"
          : "border-slate-200 bg-slate-50";

      return (
        <aside className={`my-8 rounded-xl border p-5 ${toneClass}`}>
          {value?.title ? (
            <h4 className="font-display font-bold mb-2">{value.title}</h4>
          ) : null}
          <div className="article-prose">
            <PortableText value={value?.content || []} components={baseComponents} />
          </div>
        </aside>
      );
    },

    // ✅ Cita (por si la usas)
    quoteBlock: ({ value }) => (
      <figure className="my-10 border-l-4 pl-5 italic">
        <blockquote className="article-prose">
          <PortableText value={value?.quote || value?.content || []} components={baseComponents} />
        </blockquote>
        {value?.author ? (
          <figcaption className="mt-3 text-sm text-muted-foreground">— {value.author}</figcaption>
        ) : null}
      </figure>
    ),
  },

  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="underline"
      >
        {children}
      </a>
    ),
  },

  // ✅ Listas con estilo (para que no “desaparezcan” visualmente)
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="my-1">{children}</li>,
    number: ({ children }) => <li className="my-1">{children}</li>,
  },
};

export default function PortableTextRenderer({ value }) {
  return <PortableText value={value || []} components={baseComponents} />;
}
