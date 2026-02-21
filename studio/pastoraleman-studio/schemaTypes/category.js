export default {
  name: "category",
  title: "Categoría",
  type: "document",
  fields: [
    { name: "title", title: "Nombre", type: "string", validation: (Rule) => Rule.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    },
  ],
};
