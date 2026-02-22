"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";

function pickImage(event) {
  return event?.mainImage || event?.image || event?.coverImage || null;
}

function pickDate(event) {
  return event?.date || event?.startDate || null;
}

function formatDate(dateStr) {
  if (!dateStr) return "Sin fecha";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "Sin fecha";
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventsClientList({ events }) {
  const sorted = [...events].sort((a, b) => {
    const da = new Date(pickDate(a) || 0).getTime();
    const db = new Date(pickDate(b) || 0).getTime();
    return da - db;
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold">Calendario de Eventos</h1>
        <div className="section-divider mt-4" />
        <p className="text-muted-foreground font-body mt-6">
          Exposiciones, competiciones, seminarios y encuentros del mundo del Pastor Alemán.
        </p>
      </div>

      {sorted.length === 0 ? (
        <div className="max-w-2xl mx-auto rounded-2xl border bg-card p-6 shadow-sm text-center">
          <div className="font-display text-xl font-semibold">Aún no hay eventos</div>
          <p className="text-sm text-muted-foreground font-body mt-2">
            Publica un evento en Sanity y aparecerá aquí automáticamente.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((event) => {
            const img = pickImage(event);
            const date = pickDate(event);
            const href = event?.slug ? `/eventos/${event.slug}` : null;

            const CardInner = (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex gap-4">
                  {img ? (
                    <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-xl border">
                      <Image
                        src={urlFor(img).width(240).height(240).fit("crop").auto("format").url()}
                        alt={img?.alt || event.title || "Evento"}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  ) : null}

                  <div>
                    <div className="text-xs font-medium text-muted-foreground">
                      {[event.type, event.country, event.location].filter(Boolean).join(" · ")}
                    </div>

                    <div className="font-display text-xl font-semibold mt-1">{event.title}</div>

                    {event.description ? (
                      <div className="text-sm text-muted-foreground font-body mt-2">
                        {event.description}
                      </div>
                    ) : null}

                    {!href ? (
                      <div className="text-xs text-muted-foreground mt-3">
                        (Añade slug en Sanity para ver la página del evento)
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="text-sm font-body text-muted-foreground md:text-right">
                  {formatDate(date)}
                </div>
              </div>
            );

            return (
              <div key={event._id} className="rounded-2xl border bg-card p-5 shadow-sm">
                {href ? (
                  <Link
                    href={href}
                    className="block rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/40"
                    aria-label={`Abrir evento ${event.title}`}
                  >
                    {CardInner}
                  </Link>
                ) : (
                  <div>{CardInner}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
