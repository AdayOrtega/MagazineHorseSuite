export const categories = [
  { name: "PRE", slug: "pre", description: "Pura Raza Española: historia, selección y funcionalidad" },
  { name: "Doma clásica", slug: "doma-clasica", description: "Entrenamiento, pruebas, caballos y jinetes" },
  { name: "Salto", slug: "salto", description: "Técnica, preparación, recorridos y competición" },
  { name: "Doma vaquera", slug: "doma-vaquera", description: "Cultura, manejo y evolución deportiva" },
  { name: "Cuidado y salud", slug: "salud", description: "Bienestar, nutrición, herrado y prevención" },
  { name: "Entrenamiento", slug: "entrenamiento", description: "Métodos, psicología equina y trabajo diario" },
  { name: "Yeguadas", slug: "yeguadas", description: "Yeguadas, ganaderías y programas de cría" },
  { name: "Eventos", slug: "eventos", description: "Concursos, ferias, clínicas y calendarios" },
];

export const articles = [
  {
    id: "pre-estandar-seleccion-2024",
    title: "PRE: selección moderna sin perder tipo ni funcionalidad",
    excerpt:
      "Cómo equilibrar morfología, carácter y rendimiento en la cría del Pura Raza Española con una mirada moderna.",
    author: "Redacción",
    publishedAt: "2026-02-01",
    featured: true,
    tags: ["PRE", "Cría", "Selección", "Funcionalidad"],
    category: { title: "PRE", slug: "pre", description: "Pura Raza Española" },
    mainImage: "/assets/hero-horse.jpg",
    ogImage: "/assets/hero-horse.jpg",
    body: [
      {
        type: "paragraph",
        text:
          "El Pura Raza Española combina tradición, belleza y una capacidad atlética que lo hace brillar en disciplinas como la doma clásica y la vaquera. La selección moderna exige criterio: salud, mente estable y utilidad real.",
      },
      {
        type: "paragraph",
        text:
          "Esta guía es una base editorial. En la versión final, cada afirmación técnica se acompaña de referencias y datos verificables.",
      },
    ],
  },
  {
    id: "doma-clasica-progresion",
    title: "Doma clásica: cómo construir una progresión sólida (sin atajos)",
    excerpt:
      "Claves para planificar el trabajo semanal, evitar bloqueos y cuidar la biomecánica del caballo a medio plazo.",
    author: "Redacción",
    publishedAt: "2026-02-05",
    featured: true,
    tags: ["Doma clásica", "Entrenamiento", "Biomecánica"],
    category: { title: "Doma clásica", slug: "doma-clasica", description: "Entrenamiento y competición" },
    mainImage: "/assets/horse-training.jpg",
    ogImage: "/assets/horse-training.jpg",
    body: [
      { type: "paragraph", text: "La doma clásica no va de ‘trucos’: va de una progresión lógica y consistente." },
      {
        type: "paragraph",
        text:
          "Estructura, ritmo, relajación y claridad de ayudas. Si una pieza falla, el edificio tiembla.",
      },
    ],
  },
  {
    id: "salud-herrado-nutricion",
    title: "Salud no negociable: herrado, nutrición y prevención en caballos deportivos",
    excerpt:
      "Lo que más se repite en problemas crónicos suele ser lo básico: pies, alimentación y carga de trabajo.",
    author: "Redacción",
    publishedAt: "2026-02-10",
    featured: false,
    tags: ["Salud", "Nutrición", "Herrado"],
    category: { title: "Cuidado y salud", slug: "salud", description: "Bienestar equino" },
    mainImage: "/assets/horse-health.jpg",
    ogImage: "/assets/horse-health.jpg",
    body: [
      {
        type: "paragraph",
        text:
          "Antes de buscar soluciones ‘mágicas’, revisa lo esencial: pies, dieta, descanso y progresión de carga.",
      },
    ],
  },
  {
    id: "doma-vaquera-cultura",
    title: "Doma vaquera: cultura, técnica y evolución deportiva",
    excerpt:
      "Un vistazo a la doma vaquera moderna: qué se valora, cómo se entrena y cómo se preserva su esencia.",
    author: "Redacción",
    publishedAt: "2026-02-12",
    featured: false,
    tags: ["Doma vaquera", "Cultura", "Entrenamiento"],
    category: { title: "Doma vaquera", slug: "doma-vaquera", description: "Manejo y competición" },
    mainImage: "/assets/horse-vaquera.jpg",
    ogImage: "/assets/horse-vaquera.jpg",
    body: [
      { type: "paragraph", text: "La doma vaquera es técnica, cultura y una relación de trabajo muy particular." },
    ],
  },
];

export const breeders = [
  {
    id: "yeguada-estrella-del-sur",
    name: "Yeguada Estrella del Sur",
    country: "España",
    location: "Andalucía",
    description:
      "Programa centrado en temperamento, funcionalidad y buena conformación, con enfoque en rendimiento y bienestar.",
    website: "https://example.com",
    specialties: ["PRE", "Doma clásica", "Líneas funcionales"],
  },
  {
    id: "yeguada-atlantico",
    name: "Yeguada Atlántico",
    country: "España",
    location: "Canarias",
    description:
      "Selección orientada a caballos versátiles: morfología correcta, mente estable y aptitud deportiva.",
    website: "https://example.com",
    specialties: ["PRE", "Doma vaquera", "Caballo de deporte"],
  },
];

export const events = [
  {
    id: "cpto-doma-clasica-primavera",
    title: "Concurso de Doma Clásica — Primavera",
    type: "Concurso",
    country: "España",
    location: "Madrid",
    date: "2026-03-15",
    description: "Pruebas de doma clásica con categorías base y niveles medios.",
  },
  {
    id: "clinic-salto-tecnica",
    title: "Clínica de Salto: técnica y recorrido",
    type: "Clínica",
    country: "España",
    location: "Valencia",
    date: "2026-04-06",
    description: "Trabajo de barras, líneas y construcción de recorrido con enfoque progresivo.",
  },
  {
    id: "exhibicion-doma-vaquera",
    title: "Exhibición y Jornada de Doma Vaquera",
    type: "Jornada",
    country: "España",
    location: "Sevilla",
    date: "2026-05-02",
    description: "Exhibiciones, coloquios y jornada técnica.",
  },
];
