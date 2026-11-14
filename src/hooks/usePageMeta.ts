import { useEffect } from 'react';

export interface PageMetaOptions {
  title: string;
  description: string;
  canonicalPath?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

const BASE_URL = 'https://meupdi.app.br';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Updates document title, description, canonical URL, robots directive,
 * Open Graph tags, and optional page-level JSON-LD for each route.
 */
export function usePageMeta({
  title,
  description,
  canonicalPath = '/',
  noindex = false,
  jsonLd,
}: PageMetaOptions) {
  useEffect(() => {
    document.title = title;
    const canonicalUrl = `${BASE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;

    const existingScript = document.getElementById('page-jsonld');
    if (jsonLd) {
      const script = existingScript ?? document.createElement('script');
      script.id = 'page-jsonld';
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(jsonLd);
      if (!existingScript) {
        document.head.appendChild(script);
      }
    } else if (existingScript) {
      existingScript.remove();
    }
  }, [title, description, canonicalPath, noindex, jsonLd]);
}
