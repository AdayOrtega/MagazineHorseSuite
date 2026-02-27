export const articleSlugsQuery = `*[_type=="article" && defined(slug.current)][]{ "slug": slug.current }`;

export const articleBySlugQuery = `*[_type=="article" && slug.current == $slug][0]{
  _id,
  title,
  excerpt,
  publishedAt,
  "slug": slug.current,

  // ✅ schema actual
  "section": section->{ title, "slug": slug.current },

  // ✅ portada
  coverImage,
  "coverImageUrl": coverImage.asset->url,

  // ✅ contenido clásico
  body,

  // ✅ contenido maquetación (si existe)
  bodyLayout
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
