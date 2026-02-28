"use client";

import { useMemo, useState } from "react";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function PreTabs() {
  const tabs = useMemo(
    () => [
      {
        id: "uso",
        label: "Uso hoy",
        title: "Para qué brilla el PRE (y por qué)",
        lead:
          "El PRE se ha seleccionado durante siglos con un foco claro: equilibrio, manejabilidad y capacidad de reunión. Eso define dónde suele destacar.",
        items: [
          { k: "Doma clásica", v: "Especialmente en trabajos de reunión y expresión; si el plan es serio, prioriza calidad de galope y dorso." },
          { k: "Alta escuela", v: "Reunión + sensibilidad = gran aliado para trabajo de mano y doma académica." },
          { k: "Doma vaquera", v: "Puede encajar muy bien según líneas y preparación; busca funcionalidad real, no solo estética." },
          { k: "Enganches", v: "Tradición y presencia; requiere base de manejo sólida y entrenamiento específico." },
          { k: "Ocio exigente", v: "Si quieres un caballo “para disfrutar”, la cabeza y la salud mandan más que el gesto." },
        ],
      },
      {
        id: "morfologia",
        label: "Morfología",
        title: "Morfología funcional: lo que importa en la práctica",
        lead:
          "En una revista se habla de belleza; en un centro hípico hablamos de durabilidad. La morfología se traduce en qué fácil será sostener el trabajo sin romperse.",
        items: [
          { k: "Proporciones", v: "Tendencia a ser eumétrico y mesolíneo; lo clave es el equilibrio general del conjunto." },
          { k: "Dorso y lomo", v: "Buscamos un dorso que conecte y un lomo que sostenga; evita extremos (muy largo o muy hundido)." },
          { k: "Cuello", v: "No te enamores del “cuello de cisne”: mucha estética y poca conexión suele dar problemas." },
          { k: "Aplomos", v: "Imperfecto puede vivir; malo suele pasar factura. Si compites, el umbral de tolerancia baja." },
        ],
      },
      {
        id: "compra",
        label: "Compra inteligente",
        title: "Cómo decide un profesional (sin autoengaños)",
        lead:
          "Un caballo te puede impresionar 5 minutos. Un proyecto se mide en 12–24 meses de continuidad.",
        items: [
          { k: "1) Objetivo", v: "Define disciplina + nivel real + tiempo semanal. Si no puedes dar rutina, el PRE sensible se desordena." },
          { k: "2) Cabeza", v: "Curiosidad, calma recuperable y manejo fácil valen oro. Sin eso, todo cuesta el doble." },
          { k: "3) Funcionalidad", v: "Paso y galope mandan. Si el galope es pobre, el techo deportivo baja mucho." },
          { k: "4) Salud", v: "PPI seria con veterinario independiente (y Rx según uso). No es paranoia: es gestión de riesgo." },
        ],
      },
    ],
    []
  );

  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active) || tabs[0];

  return (
    <div className="rounded-2xl border bg-card shadow-sm">
      <div className="flex flex-wrap gap-2 p-3 border-b">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={cx(
              "px-3 py-2 rounded-xl text-sm font-body transition",
              active === t.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/70 text-foreground"
            )}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        <h3 className="font-display text-2xl md:text-3xl font-bold">{current.title}</h3>
        <p className="mt-3 text-muted-foreground font-body leading-relaxed">{current.lead}</p>

        <dl className="mt-6 grid gap-4 md:grid-cols-2">
          {current.items.map((it) => (
            <div key={it.k} className="rounded-2xl border bg-background p-4">
              <dt className="text-sm font-semibold font-body">{it.k}</dt>
              <dd className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
                {it.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
