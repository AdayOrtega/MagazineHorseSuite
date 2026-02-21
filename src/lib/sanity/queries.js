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
