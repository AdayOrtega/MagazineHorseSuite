"use client";

import { useMemo } from "react";

export default function ShareButtons({ title }) {
  const url = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  const fbShare = url ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` : "#";
  const xShare = url
    ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title || "")}`
    : "#";
  const waShare = url
    ? `https://wa.me/?text=${encodeURIComponent(`${title ? title + " — " : ""}${url}`)}`
    : "#";

  const copy = async () => {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    alert("Enlace copiado ✅");
  };

  return (
    <div className="flex flex-wrap gap-3 mt-8">
      <a
        href={fbShare}
        target="_blank"
        rel="noreferrer"
        className="px-4 py-2 rounded-md bg-foreground text-primary-foreground text-sm font-medium"
      >
        Compartir en Facebook
      </a>

      <a
        href={xShare}
        target="_blank"
        rel="noreferrer"
        className="px-4 py-2 rounded-md border border-border text-sm font-medium"
      >
        Compartir en X
      </a>

      <a
        href={waShare}
        target="_blank"
        rel="noreferrer"
        className="px-4 py-2 rounded-md border border-border text-sm font-medium"
      >
        WhatsApp
      </a>

      <button
        onClick={copy}
        className="px-4 py-2 rounded-md border border-border text-sm font-medium"
      >
        Copiar link
      </button>
    </div>
  );
}
