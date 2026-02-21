export default {
  name: "article",
  title: "Artículo",
  type: "document",
  fields: [
    { name: "title", title: "Título", type: "string", validation: (Rule) => Rule.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Extracto (para SEO y previews)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: "category",
      title: "Categoría",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      title: "Autor",
      type: "string",
      initialValue: "Redacción",
    },
    {
      name: "mainImage",
      title: "Imagen principal (hero)",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", title: "Alt text", type: "string", validation: (Rule) => Rule.required() },
        { name: "caption", title: "Pie de foto", type: "string" },
        { name: "credit", title: "Créditos", type: "string" },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "ogImage",
      title: "OG Image (opcional, para redes)",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
      description: "Si no se rellena, se usará la imagen principal.",
    },
    {
      name: "tags",
      title: "Etiquetas",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "featured",
      title: "Destacado",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "body",
      title: "Contenido (maquetación tipo revista)",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alt text", type: "string", validation: (Rule) => Rule.required() },
            { name: "caption", title: "Pie de foto", type: "string" },
            { name: "credit", title: "Créditos", type: "string" },
          ],
        },
        {
          name: "callout",
          title: "Recuadro / Tip",
          type: "object",
          fields: [
            { name: "title", title: "Título", type: "string" },
            { name: "text", title: "Texto", type: "text", rows: 4 },
          ],
        },
        {
          name: "gallery",
          title: "Galería",
          type: "object",
          fields: [
            {
              name: "images",
              title: "Imágenes",
              type: "array",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    { name: "alt", title: "Alt text", type: "string" },
                    { name: "caption", title: "Pie de foto", type: "string" },
                  ],
                },
              ],
              validation: (Rule) => Rule.min(2).max(8),
            },
          ],
        },
        {
          name: "twoColumn",
          title: "2 columnas (texto + imagen)",
          type: "object",
          fields: [
            {
              name: "text",
              title: "Texto",
              type: "array",
              of: [{ type: "block" }],
            },
            {
              name: "image",
              title: "Imagen",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt text", type: "string" }],
            },
            {
              name: "imageSide",
              title: "Lado de la imagen",
              type: "string",
              options: { list: ["left", "right"], layout: "radio" },
              initialValue: "right",
            },
          ],
        },
      ],
    },
  ],
};
