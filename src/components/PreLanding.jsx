import Image from "next/image";
import Link from "next/link";
import PreSubnav from "@/components/PreSubnav";

function Stat({ label, value, note }) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm p-5">
      <div className="text-xs font-body uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 font-display text-2xl md:text-3xl font-bold tracking-tight">
        {value}
      </div>
      {note ? (
        <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
          {note}
        </p>
      ) : null}
    </div>
  );
}

function SectionHeader({ kicker, title, subtitle }) {
  return (
    <header className="max-w-3xl">
      {kicker ? (
        <p className="text-xs font-body uppercase tracking-[0.26em] text-muted-foreground">
          {kicker}
        </p>
      ) : null}
      <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base md:text-lg text-muted-foreground font-body leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

function ArticleMiniCard({ a }) {
  const href = `/articulo/${a.slug}`;
  const img = a.coverImageUrl || a.image || null;

  return (
    <Link href={href} className="group block">
      <article className="overflow-hidden rounded-2xl border bg-card shadow-sm hover:shadow-md transition">
        <div className="relative aspect-[16/10] bg-muted">
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={img}
              alt={a.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : null}
        </div>
        <div className="p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary font-body">
            {a.section?.title || "PRE"}
          </div>
          <h3 className="mt-2 font-display text-lg font-bold leading-snug group-hover:text-primary transition-colors">
            {a.title}
          </h3>
          {a.excerpt ? (
            <p className="mt-2 text-sm text-muted-foreground font-body line-clamp-3">
              {a.excerpt}
            </p>
          ) : null}
        </div>
      </article>
    </Link>
  );
}

export default function PreLanding({ heroImageUrl, articles = [] }) {
  const nav = [
    { id: "intro", label: "Visión" },
    { id: "historia", label: "Historia" },
    { id: "caracter", label: "Carácter y aptitudes" },
    { id: "morfologia", label: "Morfología" },
    { id: "deporte", label: "Deporte" },
    { id: "articulos", label: "Artículos" },
  ];

  const latest = articles.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0">
          {heroImageUrl ? (
            <>
              <Image
                src={heroImageUrl}
                alt="PRE — Pura Raza Española"
                fill
                className="object-cover opacity-25"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/70 to-background" />
            </>
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(217,119,6,0.18),transparent_40%),radial-gradient(circle_at_85%_25%,rgba(0,0,0,0.08),transparent_35%)]" />
          )}
        </div>

        <div className="relative">
          <div className="container mx-auto px-4 pt-16 pb-10">
            <div className="max-w-3xl">
              <p className="text-xs font-body uppercase tracking-[0.28em] text-muted-foreground">
                PRE · Pura Raza Española
              </p>

              <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold tracking-tight">
                La raza que une historia, funcionalidad y sensibilidad
              </h1>

              <p className="mt-5 text-base md:text-lg text-muted-foreground font-body leading-relaxed">
                El PRE destaca por su equilibrio, su capacidad para reunirse y su conexión con el jinete. Bien elegido y bien entrenado,
                es un caballo “de por vida”: disfrutón, deportivo y con una presencia inconfundible.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#articulos"
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 transition"
                >
                  Explorar artículos de PRE
                </a>
                <Link
                  href="/eventos"
                  className="inline-flex items-center justify-center rounded-xl border bg-white/70 px-5 py-3 text-sm font-semibold hover:bg-white transition"
                >
                  Ver eventos
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Stat
                  label="Clave deportiva"
                  value="Reunión"
                  note="Capacidad de sentarse y sostener trabajo recogido con equilibrio."
                />
                <Stat
                  label="Estilo"
                  value="Expresión"
                  note="Presencia y “brillo” en los aires, muy valorado en doma."
                />
                <Stat
                  label="Relación"
                  value="Sensibilidad"
                  note="Ayudas finas; exige consistencia y manejo correcto."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUBNAV */}
      <PreSubnav items={nav} />

      <main className="container mx-auto px-4">
        {/* INTRO */}
        <section id="intro" className="scroll-mt-28 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <SectionHeader
                kicker="Para entender el PRE"
                title="Qué lo hace diferente"
                subtitle="Si quieres una página de revista pro, el secreto no es meter más texto: es ordenar la información como un reportaje, con ritmo visual y bloques claros."
              />

              <div className="mt-6 space-y-4 text-base text-foreground/90 font-body leading-relaxed">
                <p>
                  El PRE (Pura Raza Española) se asocia a una imagen potente —cuello, crines, presencia—,
                  pero lo que te interesa como jinete o aficionado serio es su combinación de{" "}
                  <strong>equilibrio, mente y funcionalidad</strong>.
                </p>

                <p>
                  En una buena línea y con entrenamiento correcto, el PRE brilla especialmente en trabajos de reunión
                  (doma clásica, alta escuela, doma vaquera) y en disciplinas donde la manejabilidad y la relación caballo-jinete
                  importan tanto como el motor.
                </p>

                <div className="rounded-2xl border bg-white shadow-sm p-5">
                  <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground font-body">
                    Principio de escuela
                  </p>
                  <p className="mt-2 font-display text-xl md:text-2xl font-bold">
                    “Compra el caballo con el que puedas entrenar con continuidad.”
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground font-body">
                    Continuidad = salud + cabeza + un plan realista.
                  </p>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="rounded-3xl border bg-white shadow-sm p-6">
                <p className="text-xs font-body uppercase tracking-[0.26em] text-muted-foreground">
                  Guía rápida
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold">
                  Si vas a comprar o empezar un proyecto
                </h3>

                <ul className="mt-4 space-y-3 text-sm text-muted-foreground font-body">
                  <li className="flex gap-2">
                    <span className="mt-[6px] h-2 w-2 rounded-full bg-primary shrink-0" />
                    Define disciplina + nivel real + tiempo semanal.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[6px] h-2 w-2 rounded-full bg-primary shrink-0" />
                    Prioriza mente y dorso funcional sobre “foto bonita”.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[6px] h-2 w-2 rounded-full bg-primary shrink-0" />
                    Haz revisión veterinaria completa (gestión de riesgo).
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[6px] h-2 w-2 rounded-full bg-primary shrink-0" />
                    Entrenador + rutina = progreso, no milagros.
                  </li>
                </ul>

                <div className="mt-6 rounded-2xl bg-black/5 p-5">
                  <p className="text-sm font-body text-foreground/90">
                    ¿Quieres que esta landing sea 100% “revista”? Lo ideal es que cada bloque (cita, imagen+texto, callout…)
                    lo puedas crear también desde Sanity como “Page Builder”. Eso es compatible y escalable.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* HISTORIA */}
        <section id="historia" className="scroll-mt-28 py-14 border-t">
          <SectionHeader
            kicker="Contexto"
            title="Historia en 4 escenas"
            subtitle="El PRE está ligado a la evolución del caballo en la Península Ibérica y a su influencia en Europa (cortes, caballería y equitación clásica)."
          />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <div className="rounded-3xl border bg-white shadow-sm p-7">
                <ol className="relative border-l pl-6 space-y-6">
                  <li>
                    <div className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full bg-primary" />
                    <p className="font-display text-lg font-bold">Raíces ibéricas</p>
                    <p className="mt-1 text-sm text-muted-foreground font-body leading-relaxed">
                      Selección y consolidación histórica ligada a la tradición ecuestre peninsular y su proyección internacional.
                    </p>
                  </li>
                  <li>
                    <div className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full bg-primary" />
                    <p className="font-display text-lg font-bold">Caballo de escuela</p>
                    <p className="mt-1 text-sm text-muted-foreground font-body leading-relaxed">
                      Su conformación y equilibrio lo hacen especialmente apto para equitación de reunión (base de la doma clásica y la alta escuela).
                    </p>
                  </li>
                  <li>
                    <div className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full bg-primary" />
                    <p className="font-display text-lg font-bold">Identidad de raza</p>
                    <p className="mt-1 text-sm text-muted-foreground font-body leading-relaxed">
                      El concepto de “Pura Raza Española” se asienta como referencia cultural y deportiva.
                    </p>
                  </li>
                  <li>
                    <div className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full bg-primary" />
                    <p className="font-display text-lg font-bold">PRE moderno</p>
                    <p className="mt-1 text-sm text-muted-foreground font-body leading-relaxed">
                      Hoy compite y se cría con objetivos diversos: deporte, funcionalidad, tradición y selección morfológica.
                    </p>
                  </li>
                </ol>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border bg-white shadow-sm p-7">
                <p className="text-xs font-body uppercase tracking-[0.26em] text-muted-foreground">
                  Nota editorial
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold">Cómo leer esta página</h3>
                <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed">
                  La historia completa y el marco oficial están en ANCCE. Aquí lo sintetizamos en formato “revista” para
                  ayudarte a entender el porqué de su morfología, su carácter y su rendimiento.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href="https://www.ancce.es/contenido/historia-y-caracteristicas-del-pre"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-black/5 transition"
                  >
                    Fuente: Historia ANCCE
                  </a>
                  <a
                    href="https://www.ancce.es/contenido/el-caballo-espanol"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-black/5 transition"
                  >
                    Fuente: Caballo español
                  </a>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border bg-white shadow-sm p-7">
                <p className="text-sm font-body text-muted-foreground leading-relaxed">
                  Tip de diseño: para que esto se vea “10/10”, mantenemos medidas de lectura cómodas, jerarquía clara y aire.
                  En UX se recomienda priorizar legibilidad y comprensión (si el usuario se cansa leyendo, se va). 
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CARÁCTER */}
        <section id="caracter" className="scroll-mt-28 py-14 border-t">
          <SectionHeader
            kicker="Mente y entrenamiento"
            title="Carácter: el motor invisible"
            subtitle="La sensibilidad del PRE es una virtud cuando el manejo es coherente. Si hay ruido (rutina irregular, manos duras, dolor), aparece tensión."
          />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-3xl border bg-white shadow-sm p-6">
              <h3 className="font-display text-xl font-bold">Lo que buscas</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground font-body">
                <li className="flex gap-2"><span className="mt-[6px] h-2 w-2 rounded-full bg-primary shrink-0" />Curiosidad + calma recuperable.</li>
                <li className="flex gap-2"><span className="mt-[6px] h-2 w-2 rounded-full bg-primary shrink-0" />Manejo fácil (pies, cabezada, silla).</li>
                <li className="flex gap-2"><span className="mt-[6px] h-2 w-2 rounded-full bg-primary shrink-0" />Transiciones sin subir de tensión.</li>
              </ul>
            </div>

            <div className="rounded-3xl border bg-white shadow-sm p-6">
              <h3 className="font-display text-xl font-bold">Red flags</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground font-body">
                <li className="flex gap-2"><span className="mt-[6px] h-2 w-2 rounded-full bg-primary shrink-0" />Hipervigilancia constante.</li>
                <li className="flex gap-2"><span className="mt-[6px] h-2 w-2 rounded-full bg-primary shrink-0" />Defensas en ensillado o contacto.</li>
                <li className="flex gap-2"><span className="mt-[6px] h-2 w-2 rounded-full bg-primary shrink-0" />Necesita “rituales” para estar montable.</li>
              </ul>
            </div>

            <div className="rounded-3xl border bg-white shadow-sm p-6">
              <h3 className="font-display text-xl font-bold">Cómo se entrena bien</h3>
              <p className="mt-4 text-sm text-muted-foreground font-body leading-relaxed">
                Plan semanal simple: base + transiciones + pausas reales. Si no puedes montar con regularidad,
                mejor un caballo más “autónomo” o ajustar expectativas.
              </p>
              <div className="mt-5 rounded-2xl bg-black/5 p-4">
                <p className="text-sm font-body">
                  Regla práctica: <strong>si tu semana es irregular, tu caballo será irregular</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MORFOLOGÍA */}
        <section id="morfologia" className="scroll-mt-28 py-14 border-t">
          <SectionHeader
            kicker="Funcionalidad"
            title="Morfología: belleza que debe trabajar"
            subtitle="La morfología importa cuando está al servicio de la salud y el rendimiento: dorso útil, equilibrio y aplomos correctos."
          />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 rounded-3xl border bg-white shadow-sm p-7">
              <h3 className="font-display text-2xl font-bold">Checklist morfológico (orientado a uso)</h3>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground font-body">
                <div className="rounded-2xl bg-black/5 p-4">
                  <p className="font-semibold text-foreground">Dorso + lomo</p>
                  <p className="mt-1">Conexión y capacidad de sostener, sin hundirse.</p>
                </div>
                <div className="rounded-2xl bg-black/5 p-4">
                  <p className="font-semibold text-foreground">Cuello</p>
                  <p className="mt-1">Inserción funcional (ojo con “cuello de cisne”).</p>
                </div>
                <div className="rounded-2xl bg-black/5 p-4">
                  <p className="font-semibold text-foreground">Grupa</p>
                  <p className="mt-1">Potencial para sentarse y empujar sin perder dorso.</p>
                </div>
                <div className="rounded-2xl bg-black/5 p-4">
                  <p className="font-semibold text-foreground">Extremidades</p>
                  <p className="mt-1">Aplomos correctos: base de longevidad deportiva.</p>
                </div>
              </div>

              <p className="mt-6 text-sm text-muted-foreground font-body leading-relaxed">
                ANCCE describe los rasgos morfológicos y criterios oficiales del PRE. Aquí lo convertimos a “lectura de pista”:
                que sea armónico está bien; que sea funcional y sano es lo que manda.
              </p>

              <div className="mt-5">
                <a
                  href="https://www.ancce.es/contenido/morfologia-del-pre"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-black/5 transition"
                >
                  Fuente: Morfología ANCCE
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-3xl border bg-white shadow-sm p-7">
              <p className="text-xs font-body uppercase tracking-[0.26em] text-muted-foreground">
                Tip de revista
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold">Lo que se ve vs lo que sirve</h3>
              <div className="mt-4 grid grid-cols-1 gap-3 text-sm font-body">
                <div className="rounded-2xl border p-4">
                  <p className="font-semibold">Parece</p>
                  <p className="mt-1 text-muted-foreground">Mucho gesto + mucha foto.</p>
                </div>
                <div className="rounded-2xl border p-4">
                  <p className="font-semibold">Sirve</p>
                  <p className="mt-1 text-muted-foreground">Paso correcto + dorso suelto + mente estable.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEPORTE */}
        <section id="deporte" className="scroll-mt-28 py-14 border-t">
          <SectionHeader
            kicker="Rendimiento"
            title="El PRE en el deporte moderno"
            subtitle="El PRE compite en varias disciplinas; su presencia es especialmente notable en doma y pruebas donde la equitación de escuela marca diferencias."
          />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-3xl border bg-white shadow-sm p-6">
              <h3 className="font-display text-xl font-bold">Dónde suele brillar</h3>
              <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed">
                Reunión, expresión y manejabilidad: base fuerte en doma clásica y trabajos de escuela.
              </p>
            </div>
            <div className="rounded-3xl border bg-white shadow-sm p-6">
              <h3 className="font-display text-xl font-bold">Qué exige</h3>
              <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed">
                Entrenamiento consistente, revisión física periódica y progresión sin atajos.
              </p>
            </div>
            <div className="rounded-3xl border bg-white shadow-sm p-6">
              <h3 className="font-display text-xl font-bold">Referencia</h3>
              <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed">
                ANCCE recopila resultados y presencia del PRE en el deporte. Úsalo como marco, y luego baja a tu “realidad de cuadra”.
              </p>
              <div className="mt-4">
                <a
                  href="https://www.ancce.es/contenido/exitos-deportivos-del-pre"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-black/5 transition"
                >
                  Fuente: Éxitos deportivos ANCCE
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ARTÍCULOS */}
        <section id="articulos" className="scroll-mt-28 py-14 border-t">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <SectionHeader
              kicker="Lectura recomendada"
              title="Artículos de PRE"
              subtitle="Los últimos artículos publicados en esta sección."
            />
            <Link
              href="/articulos"
              className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-black/5 transition"
            >
              Ver todos los artículos
            </Link>
          </div>

          {latest.length ? (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latest.map((a) => (
                <ArticleMiniCard key={a._id || a.slug} a={a} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border bg-white shadow-sm p-7 text-muted-foreground font-body">
              Próximamente más contenido en PRE.
            </div>
          )}

          <div className="my-14 rounded-3xl border bg-gradient-to-br from-white to-black/5 p-8">
            <h3 className="font-display text-2xl font-bold">¿Quieres un portal “nivel revista” de verdad?</h3>
            <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed max-w-2xl">
              El siguiente paso PRO es mover esta landing a Sanity como “Page document” (Page Builder),
              para que puedas diseñar bloques a voluntad sin tocar código.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/articulos"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 transition"
              >
                Publicar nuevo artículo
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-xl border bg-white/70 px-5 py-3 text-sm font-semibold hover:bg-white transition"
              >
                Contacto / Colabora
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
