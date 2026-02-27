/* =========================
   Artículos
   ========================= */

export const articleSlugsQuery = `*[_type=="article" && defined(slug.current)][]{ "slug": slug.current }`;

export const articleBySlugQuery = `*[_type=="article" && slug.current==$slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "section": section->{title, "slug": slug.current},
  "category": section->{title, "slug": slug.current},
  coverImage,
  "mainImage": coverImage,
  "coverImageUrl": coverImage.asset->url,

  // ✅ Page builder REAL (lo que estás usando en Studio)
  content[]{
    ...,
    _type == "mediaText" => {
      ...,
      image{..., asset->},
      content[]
    },
    _type == "richText" => { ..., content[] },
    _type == "callout" => { ..., content[] },
    _type == "quoteBlock" => { ... }
  },

  // ✅ compat (por si tienes artículos antiguos)
  body,
  bodyLayout[]{
    ...,
    _type == "mediaText" => { ..., image{..., asset->}, content[] },
    _type == "richText" => { ..., content[] },
    _type == "callout" => { ..., content[] },
    _type == "quoteBlock" => { ... }
  }
}`;

export const latestArticlesQuery = `*[_type=="article"]|order(publishedAt desc)[0...$limit]{
  _id,
  title,
  excerpt,
  publishedAt,
  "slug": slug.current,
  "section": section->{ title, "slug": slug.current },
  "coverImageUrl": coverImage.asset->url
}`;

/* =========================
   Eventos
   ========================= */

export const eventsSlugsQuery = `*[_type=="event" && defined(slug.current)][]{ "slug": slug.current }`;

export const eventBySlugQuery = `*[_type=="event" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  description,
  startDate,
  endDate,
  location,
  coverImage,
  "coverImageUrl": coverImage.asset->url,
  body
}`;

export const eventsListQuery = `*[_type=="event"]|order(startDate desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  startDate,
  endDate,
  location,
  "coverImageUrl": coverImage.asset->url
}`;

/* =========================
   Artículos (listado)
   ========================= */

export const articlesListQuery = `*[_type=="article"]|order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "section": section->{title, "slug": slug.current},
  "category": section->{title, "slug": slug.current},
  "coverImageUrl": coverImage.asset->url
}`;
