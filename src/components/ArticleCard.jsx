import Link from "next/link";

function getCategory(article) {
  return article?.section || article?.category || null;
}

function getCategoryLabel(article) {
  const cat = getCategory(article);
  return cat?.title ?? cat?.name ?? (typeof cat === "string" ? cat : "Artículo");
}

function getCategorySlug(article) {
  const cat = getCategory(article);
  return cat?.slug ?? cat?.slug?.current ?? null;
}

function getImage(article) {
  return (
    article?.coverImageUrl ||
    article?.image ||
    article?.mainImageUrl ||
    article?.heroUrl ||
    ""
  );
}

function formatDate(publishedAt) {
  if (!publishedAt) return "";
  try {
    return new Date(publishedAt).toLocaleDateString("es-ES", {
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

  const img = getImage(article);
  const label = getCategoryLabel(article);
  const slug = typeof article.slug === "string" ? article.slug : article?.slug?.current;
  const date = formatDate(article.publishedAt || article.date);
  const author = article.author || "Redacción";

  // Fallback visual cuando no hay imagen
  const Img = () =>
    img ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={img}
        alt={article.title || ""}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
    ) : (
      <div className="w-full h-full bg-muted" />
    );

  if (variant === "featured") {
    return (
      <Link href={`/articulo/${slug}`} className="group block">
        <article className="relative overflow-hidden rounded-lg aspect-[16/9]">
          <Img />
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
              {date ? (
                <>
                  <span>·</span>
                  <span>{date}</span>
                </>
              ) : null}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/articulo/${slug}`} className="group block">
      <article className="overflow-hidden">
        <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4">
          <Img />
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
          {date ? (
            <>
              <span>·</span>
              <span>{date}</span>
            </>
          ) : null}
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
