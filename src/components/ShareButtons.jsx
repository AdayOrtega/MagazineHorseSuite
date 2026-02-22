"use client";

import React, { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

function getCleanShareUrl() {
  if (typeof window === "undefined") return "";

  // Usamos la URL REAL del navegador (incluye el dominio correcto en prod)
  const u = new URL(window.location.href);

  // Limpieza: fuera query y hash (evita ?fbclid=... y #:~:text=...)
  u.search = "";
  u.hash = "";

  return u.toString();
}

function encode(u) {
  return encodeURIComponent(u || "");
}

export default function ShareButtons({ title = "", className = "" }) {
  const pathname = usePathname(); // solo para re-render al navegar
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => getCleanShareUrl(), []);

  // Re-renderiza widgets oficiales cuando cambia la URL (navegación client-side)
  useEffect(() => {
    if (!shareUrl) return;

    // X (Twitter)
    if (typeof window !== "undefined" && window.twttr?.widgets?.load) {
      window.twttr.widgets.load();
    }

    // Facebook
    if (typeof window !== "undefined" && window.FB?.XFBML?.parse) {
      window.FB.XFBML.parse();
    }
  }, [shareUrl]);

  const text = title ? `${title}` : "Mira esto";

  // X widget oficial (intent + widgets.js)
  const xShareHref = `https://twitter.com/intent/tweet?url=${encode(shareUrl)}&text=${encode(text)}`;

  // LinkedIn (share URL)
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encode(shareUrl)}`;
  const whatsappHref = `https://api.whatsapp.com/send?text=${encode(`${text} ${shareUrl}`)}`;
  const telegramHref = `https://t.me/share/url?url=${encode(shareUrl)}&text=${encode(text)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      const el = document.createElement("textarea");
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  }

  if (!shareUrl) return null;

  const btnStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 10px",
    borderRadius: 8,
    border: "1px solid rgba(0,0,0,0.15)",
    fontSize: 13,
    textDecoration: "none",
    background: "white",
    cursor: "pointer",
    lineHeight: 1,
  };

  return (
    <div
      className={className}
      style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginTop: 24 }}
    >
      {/* --- Facebook SDK (botón “oficial”) --- */}
      <div id="fb-root" />
      <Script
        id="facebook-jssdk"
        strategy="afterInteractive"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0"
      />

      {/* IMPORTANTE: Solo este Facebook. (Nada de otro botón “Facebook” extra) */}
      <div
        className="fb-share-button"
        data-href={shareUrl}
        data-layout="button_count"
        data-size="small"
      />

      {/* --- X (Twitter) widget oficial --- */}
      <Script id="twitter-widgets" strategy="afterInteractive" src="https://platform.twitter.com/widgets.js" />
      <a
        className="twitter-share-button"
        href={xShareHref}
        data-size="small"
        data-text={text}
        data-url={shareUrl}
      >
        Post
      </a>

      {/* --- LinkedIn --- */}
      <a href={linkedinHref} target="_blank" rel="noreferrer" style={btnStyle} aria-label="Compartir en LinkedIn">
        LinkedIn
      </a>

      {/* --- WhatsApp --- */}
      <a href={whatsappHref} target="_blank" rel="noreferrer" style={btnStyle} aria-label="Compartir en WhatsApp">
        WhatsApp
      </a>

      {/* --- Telegram --- */}
      <a href={telegramHref} target="_blank" rel="noreferrer" style={btnStyle} aria-label="Compartir en Telegram">
        Telegram
      </a>

      {/* --- Copiar --- */}
      <button type="button" onClick={copyLink} style={btnStyle}>
        {copied ? "Copiado ✅" : "Copiar enlace"}
      </button>
    </div>
  );
}