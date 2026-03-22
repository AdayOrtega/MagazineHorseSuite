"use client";

import { useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function Pill({ as = "a", href, onClick, children }) {
  const base =
    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium " +
    "bg-white/60 backdrop-blur hover:bg-white transition " +
    "shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-black/20";

  if (as === "button") {
    return (
      <button type="button" onClick={onClick} className={base}>
        {children}
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={base}>
      {children}
    </a>
  );
}

function Icon({ children }) {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border bg-white">
      <span className="text-[11px] leading-none">{children}</span>
    </span>
  );
}

export default function ShareButtons({ title = "", canonicalUrl = "" }) {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://magazine.horsesuite.app";

  const url = useMemo(() => {
    if (canonicalUrl?.trim()) return canonicalUrl.trim();

    const path = pathname || "";
    const queryString = searchParams?.toString();
    const query = queryString ? `?${queryString}` : "";

    return `${siteUrl}${path}${query}`;
  }, [canonicalUrl, pathname, searchParams, siteUrl]);

  const encodedUrl = useMemo(() => encodeURIComponent(url), [url]);
  const encodedTitle = useMemo(() => encodeURIComponent(title || ""), [title]);

  const shareFacebook = url
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    : "#";

  const shareX = url
    ? `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
    : "#";

  const shareLinkedIn = url
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    : "#";

  const shareWhatsApp = url
    ? `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`.trim())}`
    : "#";

  const shareTelegram = url
    ? `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
    : "#";

  const copyToClipboard = async () => {
    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Pill href={shareFacebook}>
        <Icon>f</Icon> Facebook
      </Pill>

      <Pill href={shareX}>
        <Icon>X</Icon> X
      </Pill>

      <Pill href={shareLinkedIn}>
        <Icon>in</Icon> LinkedIn
      </Pill>

      <Pill href={shareWhatsApp}>
        <Icon>wa</Icon> WhatsApp
      </Pill>

      <Pill href={shareTelegram}>
        <Icon>tg</Icon> Telegram
      </Pill>

      <Pill as="button" onClick={copyToClipboard}>
        <Icon>⧉</Icon> {copied ? "¡Copiado!" : "Copiar enlace"}
      </Pill>
    </div>
  );
}
