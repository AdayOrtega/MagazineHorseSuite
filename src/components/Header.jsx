"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = ({ sections = [] }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const normalizedSections = (sections || [])
    .map((s) => {
      const slugStr = typeof s?.slug === "string" ? s.slug : s?.slug?.current;
      if (!slugStr) return null;

      return {
        slug: slugStr,
        name: s?.title || s?.name || slugStr,
        order: typeof s?.order === "number" ? s.order : 9999,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
              <span className="text-primary-foreground font-display text-xl font-bold">
                PA
              </span>
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-foreground leading-none">
                Magazine HorseSuite
              </h1>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-body">
                Revista Digital
              </p>
            </div>
          </Link>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Menú"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {normalizedSections.slice(0, 6).map((cat) => (
              <Link
                key={cat.slug}
                href={`/seccion/${cat.slug}`}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-body"
              >
                {cat.name}
              </Link>
            ))}

            <Link
              href="/articulos"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-body"
            >
              Artículos
            </Link>

            <Link
              href="/yeguadas"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-body"
            >
              Yeguadas
            </Link>

            <Link
              href="/eventos"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-body"
            >
              Eventos
            </Link>
            <Link
              href="https://www.horsesuite.app/login"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-body"
            >
              Iniciar Sesión
            </Link>
          </nav>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-2">
              {normalizedSections.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/seccion/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-body"
                >
                  {cat.name}
                </Link>
              ))}

              <Link
                href="/articulos"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-body"
              >
                Artículos
              </Link>

              <Link
                href="/yeguadas"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-body"
              >
                Yeguadas
              </Link>

              <Link
                href="/eventos"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-body"
              >
                Eventos
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
