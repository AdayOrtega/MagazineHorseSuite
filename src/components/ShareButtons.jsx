"use client";

import { useMemo, useState } from "react";

export default function ShareButtons({ title = "", canonicalUrl }) {
  const [copied, setCopied] = useState(false);

  const url = useMemo(() => {
    if (canonicalUrl) return canonicalUrl;
    if (typeof window !== "undefined") return window.location.href;
    return "";
  }, [canonicalUrl]);

  const encodedUrl = useMemo(() => encodeURIComponent(url), [url]);
  const encodedTitle = useMemo(() => encodeURIComponent(title || ""), [title]);

  const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const shareX = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const shareWhatsApp = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
  const shareTelegram = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // fallback
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

  const Btn = ({ href, children, className }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        "inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm hover:bg-muted transition " +
        (className || "")
      }
    >
      {children}
    </a>
  );

  return (
    <div className="flex flex-wrap gap-2">
      <Btn href={shareFacebook}>Facebook</Btn>
      <Btn href={shareX}>X</Btn>
      <Btn href={shareLinkedIn}>LinkedIn</Btn>
      <Btn href={shareWhatsApp}>WhatsApp</Btn>
      <Btn href={shareTelegram}>Telegram</Btn>

      <button
        type="button"
        onClick={copyToClipboard}
        className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm hover:bg-muted transition"
      >
        {copied ? "¡Copiado!" : "Copiar enlace"}
      </button>
    </div>
  );
}
