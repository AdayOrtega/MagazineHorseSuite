import Link from "next/link";
import { categories } from "@/data/mockData";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center">
                <span className="text-primary-foreground font-display text-sm font-bold">PA</span>
              </div>
              <span className="font-display text-xl font-bold">Magazine HorseSuite</span>
            </div>
            <p className="text-sm opacity-70 font-body leading-relaxed">
              Revista digital sobre el mundo del caballo: doma clásica, salto, doma vaquera, cría (PRE) y cultura ecuestre.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Secciones</h4>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/seccion/${cat.slug}`}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity font-body"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Comunidad</h4>
            <ul className="space-y-2">
              {["Yeguadas", "Eventos", "Entrevistas", "Articulos"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity font-body"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contacto</h4>
            <p className="text-sm opacity-70 font-body leading-relaxed">
              ¿Tienes una historia que contar? ¿Quieres colaborar con nosotros?
            </p>
            <p className="text-sm opacity-70 font-body mt-2">info@entusiastasdelpastoraleman.com</p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-xs opacity-50 font-body">
            © 2026 Magazine HorseSuite. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
