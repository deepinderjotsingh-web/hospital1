import { useEffect } from "react";
import { SITE } from "@/lib/site";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  /** Structured data (schema.org) injected as a page-level JSON-LD script. */
  jsonLd?: Record<string, unknown>;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

// Per-page <head> manager for the SPA: title, description, canonical and JSON-LD.
export default function Seo({ title, description, path = "/", jsonLd }: SeoProps) {
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertCanonical(`${SITE.domain}${path}`);
    upsertMeta("property", "og:url", `${SITE.domain}${path}`);

    const existing = document.getElementById("page-jsonld");
    if (jsonLdKey) {
      const script = (existing ?? document.createElement("script")) as HTMLScriptElement;
      script.id = "page-jsonld";
      script.type = "application/ld+json";
      script.textContent = jsonLdKey;
      if (script !== existing) document.head.appendChild(script);
    } else if (existing) {
      existing.remove();
    }
    return () => {
      document.getElementById("page-jsonld")?.remove();
    };
  }, [title, description, path, jsonLdKey]);

  return null;
}
