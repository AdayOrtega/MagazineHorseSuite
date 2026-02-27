import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/image";

const ptComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-10">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8">{children}</h3>,
    normal: ({ children }) => <p className="mt-4">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4">{children}</ul>,
    number: ({ children }) => <ol className="mt-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mt-2">{children}</li>,
    number: ({ children }) => <li className="mt-2">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      const src = value ? urlFor(value).width(1600).auto("format").url() : null;
      if (!src) return null;
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <figure className="my-8">
          <img src={src} alt={value?.alt || ""} className="w-full rounded-lg" loading="lazy" />
          {value?.caption ? (
            <figcaption className="mt-2 text-xs text-muted-foreground font-body">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },

    callout: ({ value }) => {
      const tone = value?.tone || "info"; // info|warning|danger|success
      const toneClass =
        tone === "warning"
          ? "border-yellow-400/60 bg-yellow-400/10"
          : tone === "danger"
          ? "border-red-400/60 bg-red-400/10"
          : tone === "success"
          ? "border-emerald-400/60 bg-emerald-400/10"
          : "border-primary/30 bg-primary/5";

      return (
        <aside className={`my-8 rounded-xl border p-5 ${toneClass}`}>
          {value?.title ? (
            <div className="font-display font-semibold text-foreground mb-2">{value.title}</div>
          ) : null}
          <div className="article-prose">
            <PortableText value={value?.content || []} components={ptComponents} />
          </div>
        </aside>
      );
    },

    quoteBlock: ({ value }) => {
      return (
        <blockquote className="my-8 border-l-4 border-primary/40 pl-5 italic">
          <div className="article-prose">
            <PortableText value={value?.content || []} components={ptComponents} />
          </div>
          {value?.author ? (
            <footer className="mt-3 text-sm not-italic text-muted-foreground">— {value.author}</footer>
          ) : null}
        </blockquote>
      );
    },

    mediaText: ({ value }) => {
      const layout = value?.layout || "imageLeft"; // imageLeft|imageRight
      const isImageRight = layout === "imageRight";
      const img = value?.image;
      const src = img ? urlFor(img).width(1400).auto("format").url() : null;

      return (
        <section className="my-10 grid gap-6 md:grid-cols-2 items-start">
          <div className={isImageRight ? "md:order-2" : "md:order-1"}>
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={value?.alt || img?.alt || ""} className="w-full rounded-lg" loading="lazy" />
            ) : (
              <div className="w-full aspect-[4/3] rounded-lg bg-muted" />
            )}
            {value?.caption ? (
              <p className="mt-2 text-xs text-muted-foreground font-body">{value.caption}</p>
            ) : null}
          </div>

          <div className={isImageRight ? "md:order-1" : "md:order-2"}>
            <div className="article-prose">
              <PortableText value={value?.content || []} components={ptComponents} />
            </div>
          </div>
        </section>
      );
    },
  },
};

export default function PortableTextRenderer({ value }) {
  return <PortableText value={value || []} components={ptComponents} />;
}
