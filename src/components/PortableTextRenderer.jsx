"use client";

import { PortableText } from "@portabletext/react";

const listStyleByLevel = (level = 1, type = "number") => {
  // type: "number" | "bullet"
  if (type === "bullet") {
    // bullets: •, ◦, ▪
    if (level === 1) return "list-disc";
    if (level === 2) return "list-circle";
    return "list-square";
  }

  // numbers: 1., a., i.
  if (level === 1) return "list-decimal";
  if (level === 2) return "list-[lower-alpha]";
  return "list-[lower-roman]";
};

export default function PortableTextRenderer({ value }) {
  const components = {
    block: {
      normal: ({ children }) => (
        <p className="my-4 text-base leading-7 text-foreground">{children}</p>
      ),
      h2: ({ children }) => (
        <h2 className="mt-10 mb-4 font-display text-2xl font-bold">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="mt-8 mb-3 font-display text-xl font-bold">{children}</h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-6 border-l-4 border-border pl-4 italic text-muted-foreground">
          {children}
        </blockquote>
      ),
    },

    list: {
      bullet: ({ children }) => (
        <ul className="my-4 ml-6 space-y-2 list-disc">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="my-4 ml-6 space-y-2 list-decimal">{children}</ol>
      ),
    },

    // Aquí controlamos nivel (level) y estilo por nivel
    listItem: {
      bullet: ({ children, value }) => {
        const level = value?.level || 1;
        const cls = listStyleByLevel(level, "bullet");
        return <li className={`ml-4 ${cls}`}>{children}</li>;
      },
      number: ({ children, value }) => {
        const level = value?.level || 1;
        const cls = listStyleByLevel(level, "number");
        return <li className={`ml-4 ${cls}`}>{children}</li>;
      },
    },

    marks: {
      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ children, value }) => (
        <a
          href={value?.href}
          target={value?.href?.startsWith("http") ? "_blank" : undefined}
          rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
          className="underline underline-offset-4 hover:text-primary"
        >
          {children}
        </a>
      ),
    },
  };

  return <PortableText value={value} components={components} />;
}
