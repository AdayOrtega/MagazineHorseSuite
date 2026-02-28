import Image from "next/image";
import Link from "next/link";
import PreTabs from "@/components/pre/PreTabs";

const cx = (...c) => c.filter(Boolean).join(" ");

function Section({ id, eyebrow, title, lead, children }) {
  return (
    <section id={id} className="scroll-mt-28 py-10">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-xs font-body uppercase tracking-[0.25em] text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
          {title}
        </h2>
        {lead ? (
          <p className="mt-4 text-base md:text-lg text-muted-foreground font-body leading-relaxed">
            {lead}
          </p>
        ) : null}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Toc() {
  const items = [
    { id: "intro", label: "Visión general" },
    { id: "historia", label: "Historia" },
    { id: "rasgos", label: "Rasgos y carácter" },
    { id: "morfologia", label: "Morfología" },
    { id: "deporte", label: "Éxitos deportivos" },
    { id: "recursos", label: "Recursos" },
    { id: "articulos", label: "Artículos PRE" },
  ];

  return (
    <>
      {/* Mobile: pills */}
      <div className="lg:hidden -mx-4 px-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className="shrink-0 rounded-full border bg-background px-3 py-2 text-sm font-body hover:bg-muted transition"
            >
              {it.label}
            </a>
          ))}
        </div>
      </div>

      {/* Desktop: sticky toc */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-body uppercase tracking-[0.25em] text-muted-foreground">
            Índice
          </p>
          <nav className="mt-3 flex flex-col gap-1">
            {items.map((it) => (
              <a
                key={it.id}
                href={`#${it.id}`}
                className="rounded-xl px-3 py-2 text-sm font-body hover:bg-muted transition"
              >
                {it.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default function PreLanding({ sectionTitle = "PRE", heroImageUrl, articles = [] }) {
  const heroHasImage = Boolean(heroImageUrl);

  return (
    <div className="relative">
      {/* HERO */}
      <header className="relative overflow-hidden border-b">
        <div className="absolute inset-0">
          {heroHasImage ? (
            <>
              <Image
                src={heroImageUrl}
                alt="Pura Raza Española (PRE)"
                fill
                className="object-cover opacity-35"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background" />
            </>
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.06),transparent_60%),linear-gradient(to_bottom,rgba(0,0,0,0.04),transparent_40%)]" />
          )}
        </div>

        <div className="relative container mx-auto px-4 pt-16 md:pt-20 pb-10">
          <div className="max-w-3xl">
            <p className="text-xs font-body uppercase tracking-[0.25em] text-muted-foreground">
              Sección · Caballo Español
            </p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold tracking-tight">
              Pura Raza Española (PRE)
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground font-body leading-relaxed">
              Historia, morfología, usos y claves prácticas para entender por qué el PRE es una de las razas más influyentes de la equitación.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#articulos"
                className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition"
              >
                Ver artículos PRE
              </a>
              <a
                href="#recursos"
                className="inline-flex items-center justify-center rounded-2xl border bg-background px-5 py-3 text-sm font-semibold hover:bg-muted transition"
              >
                Fuentes y recursos
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-2xl border bg-background/80 p-4">
                <p className="text-xs font-body uppercase tracking-wide text-muted-foreground">Equilibrio</p>
                <p className="mt-1 font-display text-lg font-bold">Reunión</p>
              </div>
              <div className="rounded-2xl border bg-background/80 p-4">
                <p className="text-xs font-body uppercase tracking-wide text-muted-foreground">Carácter</p>
                <p className="mt-1 font-display text-lg font-bold">Nobleza</p>
              </div>
              <div className="rounded-2xl border bg-background/80 p-4">
                <p className="text-xs font-body uppercase tracking-wide text-muted-foreground">Presencia</p>
                <p className="mt-1 font-display text-lg font-bold">Expresión</p>
              </div>
              <div className="rounded-2xl border bg-background/80 p-4">
                <p className="text-xs font-body uppercase tracking-wide text-muted-foreground">Deporte</p>
                <p className="mt-1 font-display text-lg font-bold">Doma</p>
              </div>
            </div>
          </div>

          <div className="mt-8" />
          <Toc />
        </div>
      </header>

      {/* CONTENT */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-10">
          <Toc />

          <main className="min-w-0">
            <Section
              id="intro"
              eyebrow="Visión general"
              title="Un caballo con historia… y con criterio"
              lead="Lo “pro” no es decir que es bonito: es entender qué lo hace funcional, qué tipo de jinete lo aprovecha y cómo evitar errores clásicos al elegirlo."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                  <h3 className="font-display text-xl font-bold">Idea clave (mentalidad de alto nivel)</h3>
                  <p className="mt-3 text-muted-foreground font-body leading-relaxed">
                    Un buen PRE es el que te permite entrenar con continuidad. Si cada sesión “negocias” con el caballo (tensión, sustos, defensas),
                    el proyecto se rompe antes de empezar.
                  </p>
                </div>
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                  <h3 className="font-display text-xl font-bold">Qué vas a encontrar aquí</h3>
                  <ul className="mt-3 list-disc pl-5 text-muted-foreground font-body space-y-2">
                    <li>Historia y por qué se fija el tipo de caballo español.</li>
                    <li>Morfología explicada “para uso real”.</li>
                    <li>Usos actuales y dónde suele destacar.</li>
                    <li>Hitos deportivos del PRE en doma.</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section
              id="historia"
              eyebrow="Historia"
              title="De Córdoba al mundo"
              lead="El PRE se consolida en el Renacimiento y evoluciona sobreviviendo a crisis, cambios económicos y demandas deportivas."
            >
              <ol className="relative border-l pl-6 space-y-6">
                <li>
                  <span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-primary" />
                  <p className="text-sm font-body text-muted-foreground uppercase tracking-wide">Siglo XVI</p>
                  <p className="mt-2 font-body">
                    Felipe II impulsa las bases del PRE y organiza la cría en las Caballerizas Reales de Córdoba, seleccionando animales en la zona del Guadalquivir.
                  </p>
                </li>
                <li>
                  <span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-primary" />
                  <p className="text-sm font-body text-muted-foreground uppercase tracking-wide">Renacimiento</p>
                  <p className="mt-2 font-body">
                    Se popularizan los espectáculos ecuestres y se atribuyen beneficios a la práctica de la equitación; se busca un caballo bello y ágil, distinto del medieval.
                  </p>
                </li>
                <li>
                  <span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-primary" />
                  <p className="text-sm font-body text-muted-foreground uppercase tracking-wide">Siglos XIX–XX</p>
                  <p className="mt-2 font-body">
                    Periodos críticos (invasiones, industrialización) y un hito: el registro-matrícula impulsado por Alfonso XIII.
                  </p>
                </li>
                <li>
                  <span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-primary" />
                  <p className="text-sm font-body text-muted-foreground uppercase tracking-wide">1972 y 1991</p>
                  <p className="mt-2 font-body">
                    Nace ANCCE y, tras la peste equina, se impulsa SICAB como gran escaparate internacional del PRE.
                  </p>
                </li>
              </ol>
            </Section>

            <Section
              id="rasgos"
              eyebrow="Rasgos"
              title="Carácter, expresión y equilibrio"
              lead="El PRE suele describirse como brioso y a la vez noble: reactivo a ayudas finas, pero con predisposición a colaborar cuando el manejo es correcto."
            >
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                  <p className="text-xs font-body uppercase tracking-[0.25em] text-muted-foreground">Carácter</p>
                  <h3 className="mt-2 font-display text-xl font-bold">Sensibilidad útil</h3>
                  <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed">
                    Bien gestionada: precisión. Mal gestionada: tensión. Por eso la rutina y la progresión importan.
                  </p>
                </div>
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                  <p className="text-xs font-body uppercase tracking-[0.25em] text-muted-foreground">Movimiento</p>
                  <h3 className="mt-2 font-display text-xl font-bold">Expresión</h3>
                  <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed">
                    Busca elasticidad real y dorso que “respira”, no solo rodilla.
                  </p>
                </div>
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                  <p className="text-xs font-body uppercase tracking-[0.25em] text-muted-foreground">Entrenamiento</p>
                  <h3 className="mt-2 font-display text-xl font-bold">Reunión</h3>
                  <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed">
                    Uno de sus sellos: capacidad de sentarse y sostener trabajo recogido.
                  </p>
                </div>
              </div>
            </Section>

            <Section
              id="morfologia"
              eyebrow="Morfología"
              title="Lo que dice el estándar… y lo que te interesa como jinete"
              lead="El estándar habla de proporciones y tipo racial. Tú úsalo para anticipar facilidad (o dificultad) en el trabajo diario."
            >
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border bg-background p-5">
                    <h3 className="font-display text-lg font-bold">Resumen práctico</h3>
                    <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground font-body space-y-2">
                      <li>Equilibrio general antes que “foto bonita”.</li>
                      <li>Dorso y lomo que sostienen: menos lesiones.</li>
                      <li>Cuello funcional ≠ cuello espectacular.</li>
                      <li>Aplomos: si compites, sé exigente.</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border bg-background p-5">
                    <h3 className="font-display text-lg font-bold">Dato orientativo</h3>
                    <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed">
                      El estándar describe al PRE como eumétrico y mesolíneo, con perfil subconvexo, y un temperamento
                      vivo pero noble y equilibrado.
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed">
                      La alzada típica del estándar se sitúa aproximadamente entre 1,55 m y 1,72 m.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <PreTabs />
              </div>
            </Section>

            <Section
              id="deporte"
              eyebrow="Competición"
              title="Éxitos deportivos del PRE en doma"
              lead="El PRE ha dejado hitos claros en la historia reciente de la doma española."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                  <h3 className="font-display text-xl font-bold">Olimpiadas</h3>
                  <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground font-body space-y-2">
                    <li>Atlanta 1996: primera final del equipo español con presencia de PRE (Evento, Flamenco, Invasor como suplente).</li>
                    <li>Atenas 2004: plata por equipos con PRE (Invasor y Oleaje).</li>
                    <li>Pekín 2008: presencia de Fuego XII.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                  <h3 className="font-display text-xl font-bold">Mundiales</h3>
                  <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground font-body space-y-2">
                    <li>Jerez 2002: bronce por equipos (con Invasor y Distinguido).</li>
                    <li>Kentucky 2010: por primera vez, 3 PRE en el equipo; Fuego XII 4º individual.</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section
              id="recursos"
              eyebrow="Recursos"
              title="Lecturas recomendadas"
              lead="Si quieres profundizar con fuentes oficiales, aquí tienes enlaces directos."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <a
                  className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition"
                  href="https://www.ancce.es/contenido/el-caballo-espanol"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="text-xs font-body uppercase tracking-[0.25em] text-muted-foreground">ANCCE</p>
                  <h3 className="mt-2 font-display text-xl font-bold">El Caballo Español</h3>
                  <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed">
                    Visión general del caballo español y contexto.
                  </p>
                </a>

                <a
                  className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition"
                  href="https://www.ancce.es/contenido/historia-y-caracteristicas-del-pre"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="text-xs font-body uppercase tracking-[0.25em] text-muted-foreground">ANCCE</p>
                  <h3 className="mt-2 font-display text-xl font-bold">Historia y características</h3>
                  <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed">
                    Cronología y evolución de la raza.
                  </p>
                </a>

                <a
                  className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition"
                  href="https://www.ancce.es/contenido/morfologia-del-pre"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="text-xs font-body uppercase tracking-[0.25em] text-muted-foreground">ANCCE</p>
                  <h3 className="mt-2 font-display text-xl font-bold">Morfología del PRE</h3>
                  <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed">
                    Estándar racial y rasgos morfológicos.
                  </p>
                </a>

                <a
                  className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition"
                  href="https://www.ancce.es/contenido/exitos-deportivos-del-pre"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="text-xs font-body uppercase tracking-[0.25em] text-muted-foreground">ANCCE</p>
                  <h3 className="mt-2 font-display text-xl font-bold">Éxitos deportivos</h3>
                  <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed">
                    Hitos en doma y otras disciplinas.
                  </p>
                </a>
              </div>
            </Section>

            <Section
              id="articulos"
              eyebrow="Artículos"
              title="Últimos artículos de PRE"
              lead="Lecturas recientes publicadas en la revista."
            >
              {articles?.length ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {articles.slice(0, 6).map((a) => (
                    <Link
                      key={a._id || a.slug}
                      href={`/articulo/${a.slug}`}
                      className="group rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition"
                    >
                      <p className="text-xs font-body uppercase tracking-[0.25em] text-muted-foreground">
                        {sectionTitle}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-bold group-hover:text-primary transition-colors">
                        {a.title}
                      </h3>
                      {a.excerpt ? (
                        <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed line-clamp-3">
                          {a.excerpt}
                        </p>
                      ) : null}
                      <p className="mt-4 text-xs text-muted-foreground font-body">
                        {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString("es-ES") : ""}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border bg-card p-8 text-muted-foreground font-body">
                  Próximamente más artículos en PRE.
                </div>
              )}
            </Section>
          </main>
        </div>
      </div>
    </div>
  );
}
