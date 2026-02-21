const gsdWork = "/assets/gsd-work.jpg";
const gsdBeauty = "/assets/gsd-beauty.jpg";
const gsdPuppies = "/assets/gsd-puppies.jpg";
const gsdTraining = "/assets/gsd-training.jpg";


export const categories = [
  { name: "La Raza", slug: "la-raza", description: "Historia, estándar y genética del Pastor Alemán" },
  { name: "Belleza y Estructura", slug: "belleza", description: "Morfología, exposiciones y líneas de belleza" },
  { name: "Trabajo y Deporte", slug: "trabajo", description: "IPO, Schutzhund, rastro, obediencia deportiva" },
  { name: "Cría Responsable", slug: "cria", description: "Selección, salud, genética y reproducción" },
  { name: "Adiestramiento", slug: "adiestramiento", description: "Técnicas, metodologías y guías prácticas" },
  { name: "Entrevistas", slug: "entrevistas", description: "Conversaciones con criadores, jueces y expertos" },
  { name: "Reportajes", slug: "reportajes", description: "Reportajes a fondo sobre el mundo del Pastor Alemán" },
  { name: "Noticias", slug: "noticias", description: "Últimas noticias del mundo del Pastor Alemán" },
];

export const articles = [
  {
    slug: "estandar-sv-2024-actualizacion",
    title: "El Estándar SV 2024: Cambios Clave y su Impacto en la Cría Moderna",
    excerpt:
      "Analizamos las últimas modificaciones al estándar de la raza publicadas por el Verein für Deutsche Schäferhunde y cómo afectarán la selección en los próximos años.",
    category: "La Raza",
    categorySlug: "la-raza",
    image: gsdBeauty,
    author: "Dr. Carlos Mendoza",
    date: "15 Ene 2026",
    readTime: "12 min",
    featured: true,
    tags: ["Estándar", "SV", "Morfología", "Genética"],
    content: [
      {
        id: "introduccion",
        title: "Introducción",
        body:
          "El Verein für Deutsche Schäferhunde (SV), club rector de la raza a nivel mundial, ha publicado una serie de actualizaciones a su estándar oficial que buscan reorientar la cría del Pastor Alemán hacia un perro más funcional y saludable. Estas modificaciones, las más significativas en la última década, reflejan una creciente preocupación por el bienestar animal y la preservación de la versatilidad que define a esta raza.",
      },
      {
        id: "cambios-morfologicos",
        title: "Cambios Morfológicos",
        body:
          "Entre los cambios más destacados se encuentra una mayor énfasis en la línea dorsal moderada, alejándose de las angulaciones extremas que caracterizaron a muchos ejemplares de líneas de belleza en las últimas dos décadas. El nuevo estándar especifica con mayor precisión los ángulos de la grupa y la articulación del corvejón, buscando un equilibrio entre la elegancia del movimiento y la funcionalidad locomotora.",
      },
      {
        id: "impacto-salud",
        title: "Impacto en la Salud",
        body:
          "Las nuevas directrices incorporan requisitos más estrictos en materia de salud, incluyendo protocolos actualizados para la evaluación de displasia de cadera y codo. Se introduce por primera vez una valoración obligatoria de la capacidad pulmonar y cardíaca para reproductores, un paso que muchos expertos consideran largo tiempo esperado.",
      },
      {
        id: "reacciones",
        title: "Reacciones del Mundo Cinófilo",
        body:
          "La respuesta de criadores y jueces ha sido mixta. Mientras que los defensores de las líneas de trabajo celebran un retorno a los principios fundacionales de Max von Stephanitz, algunos criadores de líneas de alta competición expresan preocupación por el impacto en sus programas de cría establecidos.",
      },
    ],
  },
  {
    slug: "ipo3-preparacion-completa",
    title: "Preparación Integral para IPO3: De la Base al Ring de Competición",
    excerpt:
      "Una guía exhaustiva sobre el camino hacia el título IPO3, desde los fundamentos del cachorro hasta la estrategia de competición a nivel élite.",
    category: "Trabajo y Deporte",
    categorySlug: "trabajo",
    image: gsdWork,
    author: "Hans Müller",
    date: "8 Ene 2026",
    readTime: "18 min",
    featured: true,
    tags: ["IPO", "Schutzhund", "Competición", "Entrenamiento"],
    content: [
      {
        id: "fundamentos",
        title: "Fundamentos del Trabajo",
        body:
          "El camino hacia el IPO3 comienza mucho antes de que el perro pise un campo de entrenamiento formal. La selección genética adecuada, la socialización temprana y el desarrollo de los instintos naturales durante las primeras semanas de vida son los cimientos sobre los que se construirá todo el programa de entrenamiento posterior.",
      },
      {
        id: "rastro",
        title: "Fase de Rastro",
        body:
          "El rastro en IPO3 exige un nivel de concentración y persistencia que solo se logra a través de un entrenamiento metódico y progresivo. El perro debe seguir una pista de 600 pasos con un mínimo de 30 minutos de antigüedad, incluyendo tres esquinas y tres objetos.",
      },
      {
        id: "obediencia",
        title: "Obediencia Avanzada",
        body:
          "La obediencia en IPO3 va más allá de la simple ejecución de ejercicios. Se busca una obediencia alegre, precisa y voluntaria que demuestre la conexión entre guía y perro. Cada ejercicio debe reflejar la capacidad del binomio para trabajar como una unidad armoniosa.",
      },
    ],
  },
  {
    slug: "cria-responsable-seleccion-reproductores",
    title: "Selección de Reproductores: Más Allá de la Belleza y los Títulos",
    excerpt:
      "Criterios científicos y prácticos para elegir los mejores reproductores, considerando salud, temperamento, estructura y líneas de sangre.",
    category: "Cría Responsable",
    categorySlug: "cria",
    image: gsdPuppies,
    author: "Dra. Lucía Fernández",
    date: "2 Ene 2026",
    readTime: "15 min",
    tags: ["Cría", "Genética", "Salud", "Reproducción"],
    content: [
      {
        id: "criterios",
        title: "Criterios de Selección",
        body:
          "La selección de reproductores en el Pastor Alemán debe considerar múltiples factores que van mucho más allá de los resultados en exposiciones o competiciones deportivas.",
      },
    ],
  },
  {
    slug: "adiestramiento-positivo-pastor-aleman",
    title: "Adiestramiento Moderno: Ciencia y Tradición en el Pastor Alemán",
    excerpt:
      "Cómo combinar las técnicas basadas en evidencia científica con la experiencia tradicional para sacar el máximo potencial de tu Pastor Alemán.",
    category: "Adiestramiento",
    categorySlug: "adiestramiento",
    image: gsdTraining,
    author: "María García",
    date: "28 Dic 2025",
    readTime: "10 min",
    tags: ["Adiestramiento", "Técnicas", "Obediencia"],
    content: [
      {
        id: "ciencia",
        title: "La Ciencia del Aprendizaje",
        body:
          "El Pastor Alemán es una raza excepcionalmente inteligente que responde de forma notable al adiestramiento estructurado y consistente.",
      },
    ],
  },
  {
    slug: "bundessieger-2025-cronica",
    title: "Bundessieger 2025: Crónica Completa del Evento del Año",
    excerpt:
      "Todo lo que sucedió en la exposición más importante del mundo del Pastor Alemán. Resultados, análisis de jueces y las tendencias que marcaron esta edición.",
    category: "Reportajes",
    categorySlug: "reportajes",
    image: gsdBeauty,
    author: "Pedro Sánchez",
    date: "20 Dic 2025",
    readTime: "20 min",
    tags: ["Bundessieger", "Exposición", "Resultados"],
    content: [
      {
        id: "contexto",
        title: "El Contexto",
        body:
          "La Bundessieger Zuchtschau 2025 llegó cargada de expectativas tras los cambios en el estándar y las nuevas directrices de la SV.",
      },
    ],
  },
  {
    slug: "nueva-normativa-bienestar-animal",
    title: "Nueva Normativa Europea de Bienestar Animal: Implicaciones para Criadores",
    excerpt:
      "La UE endurece las regulaciones sobre cría canina. Analizamos qué cambiará para los criadores de Pastor Alemán.",
    category: "Noticias",
    categorySlug: "noticias",
    image: gsdPuppies,
    author: "Redacción",
    date: "10 Dic 2025",
    readTime: "7 min",
    tags: ["Normativa", "Europa", "Bienestar"],
    content: [
      {
        id: "regulacion",
        title: "La Nueva Regulación",
        body:
          "El Parlamento Europeo ha aprobado un nuevo paquete legislativo que modifica sustancialmente el marco regulatorio de la cría canina.",
      },
    ],
  },
];

export const breeders = [
  {
    id: "1",
    name: "Karl Hoffmann",
    kennel: "vom Haus Hoffmann",
    country: "Alemania",
    region: "Baviera",
    type: "belleza",
    available: true,
    description: "Criadero con más de 30 años de experiencia en líneas de alta competición SV.",
    image: gsdBeauty,
  },
  {
    id: "2",
    name: "Ana Martínez",
    kennel: "de la Sierra Dorada",
    country: "España",
    region: "Andalucía",
    type: "mixto",
    available: true,
    description: "Criadora especializada en líneas mixtas con énfasis en salud y temperamento.",
    image: gsdTraining,
  },
  {
    id: "3",
    name: "Ricardo López",
    kennel: "del Valle Bravo",
    country: "México",
    region: "Jalisco",
    type: "trabajo",
    available: false,
    description: "Líneas de trabajo europeas importadas, enfocado en IPO/IGP.",
    image: gsdWork,
  },
  {
    id: "4",
    name: "Franz Weber",
    kennel: "von der Schwarzwald",
    country: "Alemania",
    region: "Baden-Württemberg",
    type: "trabajo",
    available: true,
    description: "Especialista en líneas DDR y líneas checas de trabajo.",
    image: gsdWork,
  },
  {
    id: "5",
    name: "Laura Gómez",
    kennel: "del Río de Plata",
    country: "Argentina",
    region: "Buenos Aires",
    type: "belleza",
    available: true,
    description: "Referente en la cría de belleza en Sudamérica con múltiples campeones.",
    image: gsdBeauty,
  },
  {
    id: "6",
    name: "Miguel Torres",
    kennel: "de la Tierra Firme",
    country: "Colombia",
    region: "Antioquia",
    type: "mixto",
    available: false,
    description: "Programa de cría integral con pruebas de salud completas.",
    image: gsdPuppies,
  },
];

export const events = [
  {
    id: "1",
    title: "Exposición Nacional RSCE 2026",
    date: "2026-03-15",
    location: "Madrid",
    country: "España",
    type: "Exposición",
    description: "Exposición nacional de la Real Sociedad Canina de España.",
  },
  {
    id: "2",
    title: "Campeonato IPO Regional Sur",
    date: "2026-04-20",
    location: "Sevilla",
    country: "España",
    type: "IPO/IGP",
    description: "Campeonato regional de IPO zona sur.",
  },
  {
    id: "3",
    title: "Bundessieger Zuchtschau 2026",
    date: "2026-09-05",
    location: "Núremberg",
    country: "Alemania",
    type: "Exposición",
    description: "La exposición más importante del mundo del Pastor Alemán.",
  },
  {
    id: "4",
    title: "Seminario de Cría SV",
    date: "2026-05-10",
    location: "Augsburgo",
    country: "Alemania",
    type: "Seminario",
    description: "Seminario oficial de la SV sobre cría y genética.",
  },
  {
    id: "5",
    title: "Copa Latinoamericana IGP",
    date: "2026-06-22",
    location: "Buenos Aires",
    country: "Argentina",
    type: "IPO/IGP",
    description: "Competición continental de IGP.",
  },
  {
    id: "6",
    title: "Jornada de Valoración de Cría",
    date: "2026-07-14",
    location: "Ciudad de México",
    country: "México",
    type: "Valoración",
    description: "Jornada de körung y valoración de reproductores.",
  },
];
