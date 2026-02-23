import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity/client";

export const revalidate = 60;

export async function generateMetadata() {
  const title = "La Raza — Pastor Alemán";
  const description =
    "Historia, evolución, líneas y criterios modernos (salud y funcionalidad) del Pastor Alemán. Artículos técnicos y análisis del estándar.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ["/assets/la-raza-hero.png"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/la-raza-hero.png"],
    },
  };
}

async function getRazaArticles() {
  return client.fetch(
    `
    *[
      _type == "article"
      && defined(slug.current)
      && (
        lower(category->slug.current) == "la-raza"
        || lower(categoria->slug.current) == "la-raza"
        || lower(section->slug.current) == "la-raza"
        || lower(seccion->slug.current) == "la-raza"
      )
    ]
    | order(publishedAt desc, _createdAt desc)[0...12]{
      _id,
      title,
      excerpt,
      publishedAt,
      "slug": slug.current
    }
  `
  );
}

export default async function LaRazaPage() {
  const articles = await getRazaArticles();

  return (
    <main className="container mx-auto px-4 py-10">
      {/* Hero */}
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6">
          <p className="text-sm font-body uppercase tracking-[0.25em] text-muted-foreground">
            La Raza
          </p>

          <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold tracking-tight">
            El Pastor Alemán: evolución, líneas y criterios modernos
          </h1>

          <p className="mt-4 text-base md:text-lg text-muted-foreground font-body leading-relaxed">
            Esta sección reúne una lectura clara y actual del Pastor Alemán: de dónde viene,
            cómo han evolucionado las líneas, y por qué hoy el foco se mueve hacia un equilibrio
            real entre tipo, funcionalidad y salud.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border bg-card px-3 py-1 text-xs font-body text-muted-foreground">
              Historia & contexto
            </span>
            <span className="rounded-full border bg-card px-3 py-1 text-xs font-body text-muted-foreground">
              Líneas
            </span>
            <span className="rounded-full border bg-card px-3 py-1 text-xs font-body text-muted-foreground">
              Salud
            </span>
            <span className="rounded-full border bg-card px-3 py-1 text-xs font-body text-muted-foreground">
              Funcionalidad
            </span>
            <span className="rounded-full border bg-card px-3 py-1 text-xs font-body text-muted-foreground">
              Cultura SV
            </span>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative w-full overflow-hidden rounded-2xl border bg-card">
            <Image
              src="/assets/la-raza-hero.png"
              alt="La Raza — Pastor Alemán"
              width={1600}
              height={900}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </header>

      {/* Intro editorial */}
      <section className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="font-display text-2xl font-bold">
            Una guía para entender la raza sin ruido
          </h2>

          <p className="mt-3 text-sm md:text-base text-muted-foreground font-body leading-relaxed">
            En internet es fácil perderse entre opiniones, modas y “recortes” de información.
            Aquí priorizamos una lectura útil para criadores, propietarios y aficionados: qué mirar,
            qué preguntas hacer y qué criterios sostienen decisiones responsables a largo plazo.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border bg-background p-4">
              <h3 className="font-display font-bold">Tipo</h3>
              <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
                El “tipo” importa, pero tiene sentido cuando acompaña a una estructura coherente y
                un movimiento eficiente.
              </p>
            </div>

            <div className="rounded-xl border bg-background p-4">
              <h3 className="font-display font-bold">Funcionalidad</h3>
              <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
                El Pastor Alemán no es solo estética: estabilidad, utilidad y capacidad de trabajo
                forman parte de su identidad.
              </p>
            </div>

            <div className="rounded-xl border bg-background p-4">
              <h3 className="font-display font-bold">Salud</h3>
              <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
                La salud no es un “extra”: es condición de entrada. La selección moderna se apoya
                cada vez más en evidencias y consistencia.
              </p>
            </div>

            <div className="rounded-xl border bg-background p-4">
              <h3 className="font-display font-bold">Cultura SV</h3>
              <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
                En el ecosistema SV, el estándar se vive también a través de reglamentos, pruebas y
                cultura de club, influyendo en lo que se premia.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border bg-background p-4">
            <h3 className="font-display font-bold">Estado de esta guía</h3>
            <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
              Esta página se irá ampliando con una síntesis basada en documentación oficial y fuentes
              verificables. Mientras tanto, mantenemos aquí una visión editorial sin afirmaciones
              técnicas no verificadas.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-5 rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="font-display text-2xl font-bold">Líneas y evolución</h2>

          <p className="mt-3 text-sm md:text-base text-muted-foreground font-body leading-relaxed">
            La conversación sobre líneas tiene sentido cuando se conecta con resultados: consistencia,
            temperamento, funcionalidad y salud. Esta sección te ayudará a leer “la línea completa”
            y no solo el individuo.
          </p>

          <div className="mt-5 relative w-full overflow-hidden rounded-2xl border bg-background">
            <Image
              src="/assets/la-raza-lineas.png"
              alt="Líneas y evolución del Pastor Alemán"
              width={1400}
              height={1000}
              className="w-full h-auto"
            />
          </div>

          <div className="mt-5 rounded-xl border bg-background p-4">
            <h3 className="font-display font-bold">Checklist rápida</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground font-body leading-relaxed">
              <li>• Mirar la consistencia de la línea (no solo una foto o un vídeo).</li>
              <li>• Priorizar salud y temperamento estable con datos y transparencia.</li>
              <li>• Evitar decisiones guiadas por extremos o modas pasajeras.</li>
              <li>• Valorar a criadores que explican el “por qué” con claridad.</li>
            </ul>
          </div>
        </aside>
      </section>

      {/* Artículos relacionados */}
      <section className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              Artículos sobre “La Raza”
            </h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground font-body">
              Análisis, estándar, selección y cría responsable (categoría: La Raza).
            </p>
          </div>

          <Link href="/articulos" className="text-sm font-body underline underline-offset-4">
            Ver todos
          </Link>
        </div>

        {!articles || articles.length === 0 ? (
          <div className="mt-6 rounded-2xl border bg-card p-6 text-sm text-muted-foreground font-body">
            Aún no hay artículos en la categoría <b>La Raza</b>.
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a) => (
              <Link
                key={a._id}
                href={`/articulo/${a.slug}`}
                className="rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-display text-lg font-bold leading-snug">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
                  {a.excerpt || "Leer artículo"}
                </p>
                <div className="mt-4 text-sm font-body underline underline-offset-4">
                  Ver artículo
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}