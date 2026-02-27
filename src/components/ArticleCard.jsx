import Link from "next/link";

function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

const ArticleCard = ({ article, variant = "default" }) => {
  if (!article) return null;

  // ✅ compat: mockData (image) + Sanity (coverImageUrl)
  const imageSrc = article.coverImageUrl || article.image || null;

  // ✅ compat: mockData (category) + Sanity (section)
  const label =
    article.section?.title ||
    article.category?.title ||
    article.category?.name ||
    article.category ||
    "Artículo";

  const date = article.publishedAt ? formatDate(article.publishedAt) : article.date || "";
  const author = article.author || "Redacción";
  const readTime = article.readTime || "—";

  if (variant === "featured") {
    return (
      <Link href={`/articulo/${article.slug}`} className="group block">
        <article className="relative overflow-hidden rounded-lg aspect-[16/9] bg-muted">
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}

          <div className="absolute inset-0 gradient-dark-overlay" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded-sm mb-3 font-body">
              {label}
            </span>

            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground leading-tight mb-2">
              {article.title}
            </h3>

            {article.excerpt ? (
              <p className="text-primary-foreground/80 text-sm font-body line-clamp-2 max-w-2xl">
                {article.excerpt}
              </p>
            ) : null}

            <div className="flex items-center gap-4 mt-3 text-primary-foreground/60 text-xs font-body">
              <span>{author}</span>
              <span>·</span>
              <span>{date}</span>
              <span>·</span>
              <span>{readTime} lectura</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/articulo/${article.slug}`} className="group flex gap-4">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={article.title}
            className="w-24 h-24 object-cover rounded-md flex-shrink-0 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-24 h-24 bg-muted rounded-md flex-shrink-0" />
        )}

        <div className="flex-1 min-w-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary font-body">
            {label}
          </span>
          <h4 className="font-display text-lg font-semibold text-foreground leading-snug mt-1 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h4>
          <p className="text-xs text-muted-foreground font-body mt-1">
            {date} · {readTime}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/articulo/${article.slug}`} className="group block">
      <article className="overflow-hidden">
        <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4 bg-muted">
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
        </div>

        <span className="text-xs font-semibold uppercase tracking-wider text-primary font-body">
          {label}
        </span>

        <h3 className="font-display text-xl font-bold text-foreground leading-snug mt-1 group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        {article.excerpt ? (
          <p className="text-sm text-muted-foreground font-body mt-2 line-clamp-2">
            {article.excerpt}
          </p>
        ) : null}

        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground font-body">
          <span>{author}</span>
          <span>·</span>
          <span>{date}</span>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
