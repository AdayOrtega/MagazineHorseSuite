"use client";

import React, { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

function getSiteUrl() {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env) return env.replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}

function buildShareUrl(siteUrl, pathname) {
  if (!siteUrl) return "";
  if (!pathname) return siteUrl;
  return `${siteUrl}${pathname}`; // pathname ya empieza por /
}

function encode(u) {
  return encodeURIComponent(u || "");
}

export default function ShareButtons({ title = "", className = "" }) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const siteUrl = useMemo(() => getSiteUrl(), []);
  const shareUrl = useMemo(() => buildShareUrl(siteUrl, pathname), [siteUrl, pathname]);

  // IMPORTANTÍSIMO:
  // Facebook/Twitter/etc deben recibir una URL limpia SIN fragmentos (#...)
  // porque Chrome a veces añade #:~:text=... y rompe el preview/caché.
  const cleanShareUrl = useMemo(() => (shareUrl ? shareUrl.split("#")[0] : ""), [shareUrl]);

  // Re-renderiza widgets oficiales cuando cambia la URL (navegación client-side)
  useEffect(() => {
    // X (Twitter)
    if (typeof window !== "undefined" && window.twttr?.widgets?.load) {
      window.twttr.widgets.load();
    }
    // Facebook
    if (typeof window !== "undefined" && window.FB?.XFBML?.parse) {
      window.FB.XFBML.parse();
    }
  }, [cleanShareUrl]);

  const xText = title ? `${title}` : "Mira esto";

  // Links de share (URL limpia)
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encode(cleanShareUrl)}`;
  const xShareHref = `https://twitter.com/intent/tweet?url=${encode(cleanShareUrl)}&text=${encode(xText)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encode(cleanShareUrl)}`;
  const whatsappHref = `https://api.whatsapp.com/send?text=${encode(`${xText} ${cleanShareUrl}`)}`;
  const telegramHref = `https://t.me/share/url?url=${encode(cleanShareUrl)}&text=${encode(xText)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(cleanShareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      const el = document.createElement("textarea");
      el.value = cleanShareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  }

  if (!cleanShareUrl) return null;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {/* Facebook SDK (widget oficial) */}
      <div id="fb-root" />
      <Script
        id="facebook-jssdk"
        strategy="afterInteractive"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0"
      />

      {/* Opción 1: Botón oficial FB (a veces “caprichoso” según navegador) */}
      <div className="fb-share-button" data-href={cleanShareUrl} data-layout="button_count" data-size="small" />

      {/* Opción 2 (recomendada): enlace directo al share dialog (fiable) */}
      <a
        href={facebookHref}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 10px",
          borderRadius: 6,
          border: "1px solid rgba(0,0,0,0.15)",
          fontSize: 13,
          textDecoration: "none",
        }}
        aria-label="Compartir en Facebook"
        title="Compartir en Facebook"
      >
        Facebook
      </a>

      {/* X (Twitter) widget oficial */}
      <Script id="twitter-widgets" strategy="afterInteractive" src="https://platform.twitter.com/widgets.js" />
      <a
        className="twitter-share-button"
        href={xShareHref}
        data-size="small"
        data-text={xText}
        data-url={cleanShareUrl}
      >
        Tweet
      </a>

      {/* LinkedIn (share URL) */}
      <a
        href={linkedinHref}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 10px",
          borderRadius: 6,
          border: "1px solid rgba(0,0,0,0.15)",
          fontSize: 13,
          textDecoration: "none",
        }}
        aria-label="Compartir en LinkedIn"
        title="Compartir en LinkedIn"
      >
        LinkedIn
      </a>

      {/* WhatsApp */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 10px",
          borderRadius: 6,
          border: "1px solid rgba(0,0,0,0.15)",
          fontSize: 13,
          textDecoration: "none",
        }}
        aria-label="Compartir en WhatsApp"
        title="Compartir en WhatsApp"
      >
        WhatsApp
      </a>

      {/* Telegram */}
      <a
        href={telegramHref}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 10px",
          borderRadius: 6,
          border: "1px solid rgba(0,0,0,0.15)",
          fontSize: 13,
          textDecoration: "none",
        }}
        aria-label="Compartir en Telegram"
        title="Compartir en Telegram"
      >
        Telegram
      </a>

      {/* Copiar link */}
      <button
        type="button"
        onClick={copyLink}
        style={{
          padding: "6px 10px",
          borderRadius: 6,
          border: "1px solid rgba(0,0,0,0.15)",
          background: "white",
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        {copied ? "Copiado ✅" : "Copiar enlace"}
      </button>
    </div>
  );
}