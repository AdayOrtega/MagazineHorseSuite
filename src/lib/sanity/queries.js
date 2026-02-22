export const articlesListQuery = `
*[_type == "article" && defined(slug.current)]
| order(publishedAt desc){
  _id,
  title,
  excerpt,
  author,
  publishedAt,
  featured,
  tags,
  "slug": slug.current,
  category->{
    title,
    "slug": slug.current,
    description
  },
  mainImage,
  ogImage
}
`;

export const articleBySlugQuery = `
*[_type == "article" && slug.current == $slug][0]{
  _id,
  title,
  excerpt,
  author,
  publishedAt,
  featured,
  tags,
  "slug": slug.current,
  category->{
    title,
    "slug": slug.current,
    description
  },
  mainImage,
  ogImage,
  body
}
`;

export const articleSlugsQuery = `
*[_type == "article" && defined(slug.current)][]{
  "slug": slug.current
}
`;

// src/lib/sanity/queries.js

export const eventsListQuery = `
*[
  _type in ["event", "evento", "events", "eventos"]
  && defined(title)
]
| order(coalesce(date, startDate, publishedAt, _createdAt) asc){
  _id,
  title,
  description,
  type,
  country,
  location,
  date,
  startDate,
  endDate,
  "slug": slug.current,

  // imágenes: soporta distintos nombres posibles según schema
  mainImage,
  image,
  coverImage
}
`;
export const eventBySlugQuery = `
*[
  _type in ["event", "evento", "events", "eventos"]
  && slug.current == $slug
][0]{
  _id,
  title,
  description,
  type,
  country,
  location,
  date,
  startDate,
  endDate,
  "slug": slug.current,
  mainImage,
  image,
  coverImage,
  content,
  body,
  contenido
}

`;
