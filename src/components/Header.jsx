"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { categories } from "@/data/mockData";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

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
                Pastor Alemán
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
            {categories.slice(0, 6).map((cat) => (
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
              href="/criadores"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-body"
            >
              Criadores
            </Link>

            <Link
              href="/eventos"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-body"
            >
              Eventos
            </Link>
          </nav>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
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
                href="/criadores"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-body"
              >
                Criadores
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
