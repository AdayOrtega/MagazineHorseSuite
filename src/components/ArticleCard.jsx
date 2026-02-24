import Link from "next/link";

function getSlug(article) {
  return article?.slug?.current || article?.slug || article?.id || null;
}

function getImage(article) {
  // Sanity: coverImageUrl. Mock: image.
  return (
    article?.coverImageUrl ||
    article?.image ||
    article?.coverImage?.asset?.url ||
    null
  );
}

function getCategoryLabel(article) {
  // Sanity: section.title. Mock: category.title/name/string.
  return (
    article?.section?.title ||
    article?.category?.title ||
    article?.category?.name ||
    article?.category ||
    null
  );
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return null;
  }
}

const ArticleCard = ({ article, variant = "default" }) => {
  if (!article) return null;

  const slug = getSlug(article);
  const href = slug ? `/articulo/${slug}` : "#";

  const imageSrc = getImage(article);
  const categoryLabel = getCategoryLabel(article);

  // Sanity: publishedAt, Mock: date
  const dateLabel = formatDate(article?.publishedAt) || article?.date || null;

  // Mock: author/readTime. En Sanity no lo tienes -> no lo mostramos si falta
  const author = article?.author || null;
  const readTime = article?.readTime || null;

  const img = (className) =>
    imageSrc ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageSrc}
        alt={article?.title || "Artículo"}
        className={className}
        loading="lazy"
      />
    ) : (
      <div className={`${className} bg-muted`} aria-label="Sin imagen" />
    );

  if (variant === "featured") {
    return (
      <Link href={href} className="group block">
        <article className="relative overflow-hidden rounded-lg aspect-[16/9]">
          {img(
            "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          )}

          <div className="absolute inset-0 gradient-dark-overlay" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            {categoryLabel ? (
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded-sm mb-3 font-body">
                {categoryLabel}
              </span>
            ) : null}

            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground leading-tight mb-2">
              {article.title}
            </h3>

            {article.excerpt ? (
              <p className="text-primary-foreground/80 text-sm font-body line-clamp-2 max-w-2xl">
                {article.excerpt}
              </p>
            ) : null}

            {(author || dateLabel || readTime) && (
              <div className="flex items-center gap-4 mt-3 text-primary-foreground/60 text-xs font-body">
                {author ? <span>{author}</span> : null}
                {author && (dateLabel || readTime) ? <span>·</span> : null}
                {dateLabel ? <span>{dateLabel}</span> : null}
                {dateLabel && readTime ? <span>·</span> : null}
                {readTime ? <span>{readTime} lectura</span> : null}
              </div>
            )}
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={href} className="group flex gap-4">
        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
          {img(
            "w-24 h-24 object-cover transition-transform duration-500 group-hover:scale-105"
          )}
        </div>

        <div className="flex-1 min-w-0">
          {categoryLabel ? (
            <span className="text-xs font-semibold uppercase tracking-wider text-primary font-body">
              {categoryLabel}
            </span>
          ) : null}

          <h4 className="font-display text-lg font-semibold text-foreground leading-snug mt-1 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h4>

          {(dateLabel || readTime) && (
            <p className="text-xs text-muted-foreground font-body mt-1">
              {dateLabel ? dateLabel : ""}
              {dateLabel && readTime ? " · " : ""}
              {readTime ? readTime : ""}
            </p>
          )}
        </div>
      </Link>
    );
  }

  // default
  return (
    <Link href={href} className="group block">
      <article className="overflow-hidden">
        <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4">
          {img(
            "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          )}
        </div>

        {categoryLabel ? (
          <span className="text-xs font-semibold uppercase tracking-wider text-primary font-body">
            {categoryLabel}
          </span>
        ) : null}

        <h3 className="font-display text-xl font-bold text-foreground leading-snug mt-1 group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        {article.excerpt ? (
          <p className="text-sm text-muted-foreground font-body mt-2 line-clamp-2">
            {article.excerpt}
          </p>
        ) : null}

        {(author || readTime || dateLabel) && (
          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground font-body">
            {author ? <span>{author}</span> : null}
            {author && (dateLabel || readTime) ? <span>·</span> : null}
            {dateLabel ? <span>{dateLabel}</span> : null}
            {dateLabel && readTime ? <span>·</span> : null}
            {readTime ? <span>{readTime}</span> : null}
          </div>
        )}
      </article>
    </Link>
  );
};

export default ArticleCard;
