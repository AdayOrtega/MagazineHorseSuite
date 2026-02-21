import { events } from "@/data/mockData";

export const metadata = {
  title: "Eventos — Pastor Alemán",
  description:
    "Calendario de exposiciones, competiciones, seminarios y encuentros del mundo del Pastor Alemán.",
};

export default function EventsPage() {
  const sorted = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold">Calendario de Eventos</h1>
        <div className="section-divider mt-4" />
        <p className="text-muted-foreground font-body mt-6">
          Exposiciones, competiciones, seminarios y encuentros del mundo del Pastor Alemán.
        </p>
      </div>

      <div className="space-y-4">
        {sorted.map((event) => (
          <div key={event.id} className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div className="text-xs font-medium text-muted-foreground">
                  {event.type} · {event.country} · {event.location}
                </div>
                <div className="font-display text-xl font-semibold mt-1">{event.title}</div>
                <div className="text-sm text-muted-foreground font-body mt-2">{event.description}</div>
              </div>
              <div className="text-sm font-body text-muted-foreground md:text-right">
                {formatDate(event.date)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
