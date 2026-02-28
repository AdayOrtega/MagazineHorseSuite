"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const SECTIONS = [
  { id: "historia", label: "Historia" },
  { id: "usos", label: "Usos" },
  { id: "morfologia", label: "Morfología" },
  { id: "deporte", label: "Deporte" },
  { id: "checklist", label: "Checklist" },
  { id: "faq", label: "FAQ" },
];

function clsx(...a) {
  return a.filter(Boolean).join(" ");
}

function Icon({ name }) {
  const common = "h-5 w-5";
  switch (name) {
    case "spark":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2l1.2 5.4L18 9l-4.8 1.6L12 16l-1.2-5.4L6 9l4.8-1.6L12 2Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5 14l.6 2.7L8 18l-2.4.8L5 22l-.6-3.2L2 18l2.4-1.3L5 14Z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "shield":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 12l2 2 4-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "map":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M9 3v15" stroke="currentColor" strokeWidth="1.6" />
          <path d="M15 6v15" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "bolt":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M13 2L3 14h8l-1 8 11-14h-8l0-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "trophy":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8 4h8v3a4 4 0 0 1-8 0V4Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M6 4H4v2a5 5 0 0 0 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M18 4h2v2a5 5 0 0 1-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12 11v4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 20h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M10 15h4v5h-4v-5Z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    default:
      return null;
  }
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs font-body text-muted-foreground shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border bg-white/70 px-3 py-1 text-xs font-body text-muted-foreground hover:bg-white transition">
      {children}
    </span>
  );
}

function SoftCard({ children, className }) {
  return (
    <div
      className={clsx(
        "rounded-3xl border bg-white/70 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl border bg-white/70 p-4 shadow-sm">
      <div className="font-display text-2xl font-bold tracking-tight">{value}</div>
      <div className="mt-1 text-xs md:text-sm text-muted-foreground font-body leading-snug">{label}</div>
    </div>
  );
}

function SectionHeading({ kicker, title, desc, id }) {
  return (
    <div id={id} className="scroll-mt-28">
      {kicker ? (
        <p className="text-xs font-body uppercase tracking-[0.25em] text-muted-foreground">{kicker}</p>
      ) : null}
      <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {desc ? <p className="mt-4 text-muted-foreground font-body leading-relaxed">{desc}</p> : null}
    </div>
  );
}

function EditorialCard({ icon, title, children }) {
  return (
    <div className="group rounded-3xl border bg-white/70 p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl border bg-white/70 p-3 text-primary shadow-sm">
          <Icon name={icon} />
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-xl font-bold leading-snug">{title}</h3>
          <p className="mt-2 text-sm md:text-base text-muted-foreground font-body leading-relaxed">
            {children}
          </p>
        </div>
      </div>
      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      <div className="mt-4 text-xs font-body text-muted-foreground">
        Consejo editorial: prioriza <span className="text-foreground">funcionalidad</span> sobre estética.
      </div>
    </div>
  );
}

function TimelineItem({ label, title, children }) {
  return (
    <li className="relative pl-10">
      <span className="absolute left-0 top-1.5 grid h-7 w-7 place-items-center rounded-2xl border bg-white/70 shadow-sm text-primary">
        <Icon name="spark" />
      </span>
      <div className="text-xs font-body uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-lg font-semibold">{title}</div>
      <div className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">{children}</div>
    </li>
  );
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids?.[0] ?? "historia");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // el más visible
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (best?.target?.id) setActive(best.target.id);
      },
      {
        root: null,
        threshold: [0.15, 0.25, 0.35, 0.5, 0.65],
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  return active;
}

export default function PreLanding() {
  const stats = useMemo(
    () => [
      { label: "Ventaja clásica", value: "Reunión" },
      { label: "Apto para", value: "Alta escuela" },
      { label: "Clave de selección", value: "Funcionalidad" },
      { label: "Factor decisivo", value: "Mente" },
    ],
    []
  );

  const active = useActiveSection(SECTIONS.map((s) => s.id));

  return (
    <div className="relative overflow-hidden border-b">
      {/* BACKGROUND ART */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 left-10 h-[420px] w-[420px] rounded-full bg-amber-300/20 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/70 via-white to-transparent" />
      </div>

      {/* HERO */}
      <section className="relative container mx-auto px-4 pt-14 pb-10">
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7">
            <Badge>Sección PRE — Pura Raza Española</Badge>

            <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold tracking-tight">
              El PRE, contado como una revista:
              <span className="block text-primary">historia, uso y criterio técnico</span>
            </h1>

            <p className="mt-5 text-base md:text-lg text-muted-foreground font-body leading-relaxed">
              Aquí no venimos a decir “qué bonito”. Venimos a entender por qué el PRE se mueve como se mueve,
              para qué se seleccionó históricamente y cómo tomar decisiones prácticas: disciplina, morfología,
              entrenamiento y salud.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Chip>Doma clásica</Chip>
              <Chip>Alta escuela</Chip>
              <Chip>Trabajo a la mano</Chip>
              <Chip>Doma vaquera</Chip>
              <Chip>Selección funcional</Chip>
              <Chip>Salud + continuidad</Chip>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#articulos"
                className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition"
              >
                Ver artículos de PRE
              </a>
              <a
                href="#historia"
                className="inline-flex items-center justify-center rounded-2xl border bg-white/70 px-6 py-3 text-sm font-semibold hover:bg-white transition"
              >
                Empezar por la historia
              </a>
            </div>

            {/* “Key takeaways” editorial */}
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border bg-white/70 p-5 shadow-sm">
                <div className="flex items-center gap-2 text-primary">
                  <Icon name="shield" />
                  <div className="font-display font-semibold">Regla de oro</div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
                  Compra el caballo que puedas entrenar con continuidad. La estética impresiona; la funcionalidad
                  construye carrera.
                </p>
              </div>

              <div className="rounded-2xl border bg-white/70 p-5 shadow-sm">
                <div className="flex items-center gap-2 text-primary">
                  <Icon name="map" />
                  <div className="font-display font-semibold">Orden correcto</div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
                  Propósito → mente → morfología útil → salud → papeles. Ese orden te ahorra dinero y frustración.
                </p>
              </div>
            </div>
          </div>

          {/* COVER CARD tipo revista */}
          <aside className="lg:col-span-5">
            <SoftCard className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-display text-lg font-bold">Guía editorial PRE</div>
                  <p className="mt-1 text-sm text-muted-foreground font-body">
                    Una portada “de revista”: limpia, jerárquica y con navegación útil.
                  </p>
                </div>
                <div className="rounded-full border bg-white/70 px-3 py-1 text-xs font-body text-muted-foreground">
                  v1
                </div>
              </div>

              {/* Navegación sticky en desktop (dentro del card) */}
              <nav className="mt-5 grid gap-2">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={clsx(
                      "rounded-2xl border px-4 py-3 text-sm font-body transition",
                      active === s.id
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-white/70 hover:bg-white"
                    )}
                  >
                    {s.label}
                  </a>
                ))}
              </nav>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <MiniStat key={s.label} label={s.label} value={s.value} />
                ))}
              </div>

              <div className="mt-6 rounded-2xl border bg-gradient-to-r from-amber-50 to-white/70 p-4">
                <div className="flex items-center gap-2 text-primary">
                  <Icon name="bolt" />
                  <div className="font-display font-semibold">Tip rápido</div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
                  Si el paso es pobre o el galope no es utilizable, el proyecto se complica. En lo simple se ve lo real.
                </p>
              </div>
            </SoftCard>
          </aside>
        </div>
      </section>

      {/* BODY */}
      <section className="relative container mx-auto px-4 pb-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-12">
            <SectionHeading
              id="historia"
              kicker="Contexto"
              title="Historia: la función explica la forma"
              desc="Para entender el PRE hay que entender el porqué de su selección: equilibrio, agilidad y capacidad de reunirse."
            />

            <div className="rounded-3xl border bg-white/70 p-6 shadow-sm">
              <ol className="relative space-y-8">
                <div className="pointer-events-none absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-black/10 to-transparent" />
                <TimelineItem label="S. XVI" title="Bases del PRE moderno">
                  En torno a la cría organizada en España se consolidan criterios que buscan un caballo equilibrado, ágil y expresivo.
                </TimelineItem>
                <TimelineItem label="S. XIX–XX" title="Adaptación y continuidad">
                  La raza atraviesa cambios históricos y evoluciona hacia usos modernos, manteniendo identidad y cultura ecuestre.
                </TimelineItem>
                <TimelineItem label="1970s–1990s" title="Proyección y eventos">
                  La organización del sector y el escaparate competitivo refuerzan la visibilidad y el estándar del PRE.
                </TimelineItem>
                <TimelineItem label="Hoy" title="Identidad + rendimiento">
                  La selección tiende a equilibrar morfología y funcionalidad: más “caballo útil”, sin perder sello racial.
                </TimelineItem>
              </ol>
            </div>

            <SectionHeading
              id="usos"
              kicker="Aplicación práctica"
              title="Usos: dónde brilla (y por qué)"
              desc="No es marketing. Es biomecánica + cabeza + método de entrenamiento."
            />

            <div className="grid gap-5 md:grid-cols-2">
              <EditorialCard icon="spark" title="Doma clásica / Alta escuela">
                Cuando se entrena sin tensión, el PRE puede ofrecer reunión progresiva, expresividad y un contacto fino. El secreto no es “más gesto”: es dorso útil y transiciones claras.
              </EditorialCard>

              <EditorialCard icon="map" title="Doma vaquera / trabajo">
                Con líneas funcionales y preparación correcta, encaja en ejercicios que exigen agilidad, equilibrio y cambios de ritmo. Sin base física, se rompe el proyecto.
              </EditorialCard>

              <EditorialCard icon="shield" title="Trabajo a la mano">
                Gran entorno para construir rectitud, movilidad lateral y educación mental. Es donde se ve si hay calidad real en lo simple.
              </EditorialCard>

              <EditorialCard icon="bolt" title="Disfrute y paseo">
                Si el temperamento y el manejo son correctos, es un caballo espectacular para disfrutar. El factor crítico: rutina y coherencia (no “dos días sí, cinco no”).
              </EditorialCard>
            </div>

            <SectionHeading
              id="morfologia"
              kicker="Selección funcional"
              title="Morfología: leer el cuerpo para predecir la carrera"
              desc="Lo estético se vende fácil. Lo funcional te da salud y continuidad."
            />

            <div className="grid gap-5 md:grid-cols-2">
              <SoftCard className="p-6">
                <div className="flex items-center gap-2 text-primary">
                  <Icon name="shield" />
                  <div className="font-display font-semibold">Equilibrio general</div>
                </div>
                <p className="mt-3 text-sm md:text-base text-muted-foreground font-body leading-relaxed">
                  ¿Se sostiene o se cae hacia delante? Si el caballo nace desequilibrado, todo el entrenamiento será “remar” para compensar.
                </p>
              </SoftCard>

              <SoftCard className="p-6">
                <div className="flex items-center gap-2 text-primary">
                  <Icon name="bolt" />
                  <div className="font-display font-semibold">Dorso + lomo</div>
                </div>
                <p className="mt-3 text-sm md:text-base text-muted-foreground font-body leading-relaxed">
                  Dorso que trabaja, lomo que transmite. Si hay hundimiento crónico o falta de musculatura útil, aparecerán defensas o lesiones.
                </p>
              </SoftCard>

              <SoftCard className="p-6">
                <div className="flex items-center gap-2 text-primary">
                  <Icon name="spark" />
                  <div className="font-display font-semibold">Cuello e inserción</div>
                </div>
                <p className="mt-3 text-sm md:text-base text-muted-foreground font-body leading-relaxed">
                  Un cuello “bonito” puede engañar. Importa la inserción y la facilidad real para conectar nuca–dorso sin tensión.
                </p>
              </SoftCard>

              <SoftCard className="p-6">
                <div className="flex items-center gap-2 text-primary">
                  <Icon name="map" />
                  <div className="font-display font-semibold">Aplomos y cascos</div>
                </div>
                <p className="mt-3 text-sm md:text-base text-muted-foreground font-body leading-relaxed">
                  Sin base no hay rendimiento. Evalúa cascos, simetrías y coherencia del apoyo. Un “pequeño defecto” depende del uso y gestión.
                </p>
              </SoftCard>
            </div>

            <SectionHeading
              id="deporte"
              kicker="Rendimiento"
              title="Deporte: por qué el PRE compite"
              desc="Más allá de titulares: competitividad = binomio + método + salud."
            />

            <SoftCard className="p-7">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl border bg-white/70 p-3 text-primary shadow-sm">
                  <Icon name="trophy" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">La clave está en lo entrenable</h3>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground font-body leading-relaxed">
                    El PRE se proyecta bien en disciplinas donde la reunión y la técnica importan. Lo decisivo es el binomio:
                    un caballo con mente estable, galope utilizable y un programa que construye fuerza sin tensión.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/seccion/doma-clasica"
                      className="rounded-xl border bg-white/70 px-4 py-2 text-sm font-body hover:bg-white transition"
                    >
                      Ver Doma clásica
                    </Link>
                    <Link
                      href="/seccion/doma-vaquera"
                      className="rounded-xl border bg-white/70 px-4 py-2 text-sm font-body hover:bg-white transition"
                    >
                      Ver Doma vaquera
                    </Link>
                    <Link
                      href="/seccion/entrenamiento"
                      className="rounded-xl border bg-white/70 px-4 py-2 text-sm font-body hover:bg-white transition"
                    >
                      Ver Entrenamiento
                    </Link>
                  </div>
                </div>
              </div>
            </SoftCard>
          </div>

          {/* Sidebar editorial */}
          <aside className="lg:col-span-5 space-y-6">
            <div id="checklist" className="scroll-mt-28" />
            <SoftCard className="p-6 sticky top-24">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold">Checklist de compra (pro)</h3>
                <span className="rounded-full border bg-white/70 px-3 py-1 text-xs font-body text-muted-foreground">
                  2 min
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
                Esto es lo que usamos en un centro hípico para filtrar rápido sin autoengaños.
              </p>

              <div className="mt-5 space-y-4">
                {[
                  ["Propósito", "Disciplina + horizonte de 6–12 meses. Sin objetivo, no hay compra inteligente."],
                  ["Mente", "Manejo fácil, recupera calma, no acumula tensión al trabajar."],
                  ["Movimiento", "Paso útil + galope utilizable + transiciones sin caos."],
                  ["Salud", "Veterinario independiente, radiografías según uso y edad."],
                  ["Papeles", "Titularidad clara, historial y contrato por escrito."],
                ].map(([t, d]) => (
                  <div key={t} className="rounded-2xl border bg-white/70 p-4">
                    <div className="font-display font-semibold">{t}</div>
                    <div className="mt-1 text-sm text-muted-foreground font-body leading-relaxed">{d}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border bg-gradient-to-r from-amber-50 to-white/70 p-4">
                <div className="font-display font-semibold">Frase de pista</div>
                <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
                  “El caballo bueno es el que puedes entrenar martes… y también viernes… igual de montable.”
                </p>
              </div>
            </SoftCard>

            <div id="faq" className="scroll-mt-28" />
            <SoftCard className="p-6">
              <h3 className="font-display text-xl font-bold">FAQ</h3>
              <div className="mt-4 space-y-3">
                {[
                  {
                    q: "¿El PRE es para principiantes?",
                    a: "Depende del individuo y su educación. Un PRE sensible sin base puede dificultar el aprendizaje. Para iniciación, prioriza caballo “hecho” y tranquilo de manejo.",
                  },
                  {
                    q: "¿Qué rompe más proyectos?",
                    a: "La tensión sostenida: trabajo con prisa, manos duras, o falta de rutina. Solución: progresión, dorsos fuertes, transiciones claras.",
                  },
                  {
                    q: "¿Qué no debería negociar?",
                    a: "Paso útil, galope funcional, y una salud coherente con tu uso. Lo estético se maquilla; lo estructural y mental no.",
                  },
                ].map(({ q, a }) => (
                  <details key={q} className="rounded-2xl border bg-white/70 p-4">
                    <summary className="cursor-pointer font-body font-semibold">{q}</summary>
                    <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">{a}</p>
                  </details>
                ))}
              </div>
            </SoftCard>

            <SoftCard className="p-6">
              <h3 className="font-display text-xl font-bold">Fuentes</h3>
              <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
                Contenido editorial basado en documentación de ANCCE (resumido y adaptado).
              </p>
              <p className="mt-3 text-xs text-muted-foreground font-body">
                Si quieres, te lo conecto a Sanity para editar esta landing como “page builder” también.
              </p>
            </SoftCard>
          </aside>
        </div>
      </section>
    </div>
  );
}
