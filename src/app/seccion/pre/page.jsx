import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title:
    "Pura Raza Española (PRE) — Historia, Estirpes, Morfología y Guía Definitiva | Magazine HorseSuite",
  description:
    "Guía definitiva del caballo Pura Raza Española (PRE): historia completa desde Felipe II, Cartujanos, Yeguada Militar, morfología funcional moderna, genética, líneas de sangre, usos, campeones olímpicos y cómo elegir un buen PRE.",
};

export default function PREPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO PREMIUM */}
      <section className="relative w-full h-[70vh] flex items-center justify-center pt-40">
        <Image
          src="/pre/reunion.jpg"
          alt="Caballo Pura Raza Española posado"
          fill
          className="object-cover brightness-[0.40]"
          priority
        />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white drop-shadow-lg">
            Pura Raza Española (PRE)
          </h1>
          <p className="text-white text-lg md:text-2xl mt-4 max-w-3xl mx-auto font-body drop-shadow">
            Historia, funcionalidad, legado deportivo y la guía más completa
            sobre el caballo español.
          </p>
        </div>
      </section>

      {/* VISIÓN GENERAL */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Un caballo con historia… y con criterio
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed font-body text-lg">
            El Pura Raza Española no es solo una raza: es un símbolo cultural,
            un caballo seleccionado durante siglos por su belleza, inteligencia,
            equilibrio y capacidad funcional. Su historia combina tradición
            monástica, decisiones reales estratégicas, mejora militar y
            refinamiento deportivo hasta convertirse en uno de los caballos más
            valorados del mundo.
          </p>
        </div>
      </section>

      {/* HISTORIA COMPLETA */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/pre/FelipeII.jpg"
              alt="Felipe II y origen del caballo español"
              fill
            className="object-contain"
            sizes="100vw"
            />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              De Córdoba al mundo: la historia del PRE
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed font-body">
              El PRE se consolidó en el siglo XVI cuando{" "}
              <strong>
                Felipe II fundó las Caballerizas Reales de Córdoba
              </strong>
              para crear un caballo ideal para la corte, la guerra y la
              representación. Se buscaba belleza, equilibrio y una capacidad
              natural para recoger el peso y realizar movimientos elevados.
            </p>

            <ul className="mt-6 space-y-4 text-muted-foreground">
              <li>• Siglo XVI: nacimiento oficial del “caballo español”.</li>
              <li>
                • Influencia directa en Lipizzanos, Lusitanos y caballos
                barrocos europeos.
              </li>
              <li>
                • Siglos XVII–XVIII: prestigio internacional, exportaciones a
                toda Europa.
              </li>
              <li>
                • Siglo XIX: la Yeguada Militar estructura la cría científica
                del PRE.
              </li>
              <li>
                • Siglo XX: ANCCE impulsa la modernización, el Libro Genealógico
                y SICAB.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ESTIRPE CARTUJANA */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center flex-row-reverse">
          <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/pre/cartujanos.jpg"
              alt="Caballos cartujanos Hierro del Bocado"
              fill
            className="object-contain"
            sizes="100vw"
            />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              La estirpe Cartujana
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              La línea Cartujana es uno de los tesoros genéticos del PRE. Criada
              y preservada por los monjes cartujos durante más de 300 años,
              destaca por su pureza, nobleza, perfil subconvexo y gran armonía.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              El famoso <strong>Hierro del Bocado</strong> es hoy uno de los
              patrimonios genéticos más reconocidos del caballo español.
            </p>
          </div>
        </div>
      </section>

      {/* YEGUADA MILITAR */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/pre/yeguadaMilitar.jpg"
              alt="Yeguada Militar PRE"
              fill
            className="object-contain"
            sizes="100vw"
            />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              La Yeguada Militar: ciencia y funcionalidad
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed font-body">
              Desde el siglo XIX, la Yeguada Militar introdujo criterios
              objetivos: morfología funcional, rendimiento, aptitudes y control
              genealógico. Esto consolidó un PRE más equilibrado, resistente y
              apto para el deporte moderno.
            </p>
          </div>
        </div>
      </section>

      {/* MORFOLOGÍA FUNCIONAL */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center">
          Morfología funcional del PRE
        </h2>

        <p className="max-w-3xl mx-auto text-center mt-6 text-muted-foreground leading-relaxed font-body">
          Más allá de su belleza, el PRE debe funcionar: dorso útil, grupa
          potente, cuello bien insertado, equilibrio natural y capacidad innata
          para la reunión. Esta morfología lo hace ideal para la doma clásica y
          disciplinas que requieren precisión y armonía.
        </p>

        <div className="relative h-[420px] mt-12 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/pre/morfologia1.jpg"
            alt="Morfología del caballo PRE"
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>
      </section>

      {/* LÍNEAS DE SANGRE */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center">
          Líneas de sangre del PRE
        </h2>

        <p className="max-w-3xl mx-auto text-center mt-6 text-muted-foreground leading-relaxed">
          El PRE moderno se desarrolla principalmente en cuatro grandes líneas:
          Cartujana, Militar, Terry y Guardiola. Cada una aporta características
          distintivas que hoy enriquecen la diversidad de la raza.
        </p>

        <div className="relative h-[420px] mt-12 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/pre/caballerizasReales.jpg"
            alt="Líneas de sangre PRE"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* CAMPEONES OLÍMPICOS */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center">
          PRE en la élite olímpica
        </h2>

        <p className="max-w-3xl mx-auto mt-6 text-center text-muted-foreground leading-relaxed">
          El PRE ha demostrado que puede competir con los mejores caballos
          Warmblood del mundo. Su expresividad y capacidad para recoger hacen
          que destaquen en doma clásica.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            {
              name: "Fuego XII",
              desc: "Emblemático por su expresividad en los Juegos Olímpicos.",
            },
            {
              name: "Oleaje",
              desc: "Potente y regular, referentes en la doma internacional.",
            },
            {
              name: "Invasor",
              desc: "Elegancia y precisión que marcaron una época.",
            },
          ].map((h) => (
            <div
              key={h.name}
              className="rounded-2xl border p-6 bg-card shadow-sm"
            >
              <h3 className="font-display text-xl font-bold">{h.name}</h3>
              <p className="text-muted-foreground mt-3">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CÓMO ELEGIR UN BUEN PRE */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center">
          Cómo elegir un buen PRE
        </h2>

        <p className="max-w-4xl mx-auto mt-6 text-muted-foreground text-lg leading-relaxed">
          Elegir un PRE requiere criterio técnico. La belleza no siempre
          equivale a funcionalidad. Un buen ejemplar debe mostrar equilibrio,
          dorso útil, posterior activo, cuello correctamente insertado y
          carácter colaborador.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 mt-16 items-center">
          <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/pre/aplomos.jpg"
              alt="Aplomos y morfología PRE"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="text-2xl font-display font-bold">
              Criterios esenciales
            </h3>
            <ul className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <li>• Dorso fuerte, no largo ni hundido.</li>
              <li>• Grupa musculada, ligeramente redondeada.</li>
              <li>• Cuello con buena base y salida natural.</li>
              <li>• Aplomos correctos, especialmente en posteriores.</li>
              <li>• Galope con proyección y buen ritmo.</li>
              <li>• Carácter sensible pero manejable.</li>
            </ul>

            <h3 className="text-2xl font-display font-bold mt-12">
              Señales de calidad funcional
            </h3>
            <ul className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <li>• Capacidad para reunirse con facilidad.</li>
              <li>• Cadera activa, que empuja de abajo hacia arriba.</li>
              <li>• Ritmo constante y cadencia natural.</li>
              <li>• Flexión suave del dorso durante el trabajo.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FUTURO DEL PRE */}
      <section className="container mx-auto px-6 py-20">
        <div className="rounded-2xl border bg-card p-10 shadow-md">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            El futuro del PRE
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Hoy el PRE avanza hacia una combinación perfecta entre belleza
            racial y funcionalidad moderna. El programa de mejora genética ANCCE
            impulsa características como salud, rendimiento, biomecánica y
            aptitud deportiva. Un caballo que respeta su tradición, pero
            evoluciona hacia el deporte internacional.
          </p>
        </div>
      </section>
    </main>
  );
}
