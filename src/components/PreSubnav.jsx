"use client";

import { useEffect, useMemo, useState } from "react";

export default function PreSubnav({ items = [] }) {
  const [active, setActive] = useState(items?.[0]?.id ?? null);

  const ids = useMemo(() => items.map((i) => i.id).filter(Boolean), [items]);

  useEffect(() => {
    if (!ids.length) return;

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Escoge la sección con más “intersección” visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));

        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      {
        // Ajusta para header fijo: considera visible cuando entra un poco más abajo
        root: null,
        rootMargin: "-120px 0px -55% 0px",
        threshold: [0.12, 0.2, 0.35, 0.5, 0.65],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  const onClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    // scroll con offset por header
    const top = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="sticky top-[76px] z-40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-4 rounded-2xl border bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
          <div className="flex flex-wrap gap-1 p-2">
            {items.map((it) => {
              const isActive = it.id === active;
              return (
                <a
                  key={it.id}
                  href={`#${it.id}`}
                  onClick={(e) => onClick(e, it.id)}
                  className={[
                    "px-3 py-2 rounded-xl text-sm font-body transition",
                    "focus:outline-none focus:ring-2 focus:ring-black/20",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-black/5 text-foreground/80",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  {it.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
