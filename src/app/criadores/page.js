import { breeders } from "@/data/mockData";

export const metadata = {
  title: "Criadores — Pastor Alemán",
  description:
    "Directorio de criadores de Pastor Alemán comprometidos con la excelencia y la cría responsable.",
};

export default function BreedersPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold">Directorio de Criadores</h1>
        <div className="section-divider mt-4" />
        <p className="text-muted-foreground font-body mt-6">
          Encuentra criadores comprometidos con la cría responsable, salud y temperamento.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {breeders.map((b) => (
          <div key={b.id} className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={b.image}
                alt={b.kennel}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-display text-lg font-semibold">{b.kennel}</div>
                  <div className="text-sm text-muted-foreground font-body">{b.name}</div>
                </div>
                <span className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                  {b.type}
                </span>
              </div>

              <div className="mt-3 text-sm text-muted-foreground font-body">
                {b.region}, {b.country}
              </div>

              <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed">
                {b.description}
              </p>

              <div className="mt-4">
                {b.available ? (
                  <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Camadas disponibles
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                    Sin camadas
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
