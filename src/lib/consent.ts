// Gerenciamento de consentimento para métricas opcionais (GA4 / GTM).
// Nenhuma tag de analytics é carregada antes do aceite explícito do usuário.

export type ConsentStatus = 'accepted' | 'rejected';

const STORAGE_KEY = 'pdi-consent';
const GTM_ID = 'GTM-TSJV4P8V';
const GA_ID = 'G-5XXHW9CYWX';

declare global {
  interface Window {
    dataLayer?: unknown[];
    __pdiAnalyticsLoaded?: boolean;
  }
}

export function getConsentStatus(): ConsentStatus | null {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    return val === 'accepted' || val === 'rejected' ? val : null;
  } catch {
    return null;
  }
}

export function setConsentStatus(status: ConsentStatus): void {
  try {
    localStorage.setItem(STORAGE_KEY, status);
  } catch {
    // ignora erro de storage
  }
  if (status === 'accepted') {
    loadAnalyticsTags();
  }
}

export function clearConsentStatus(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignora
  }
}

/** Injeta GTM e GA4 sob demanda após aceite. Idempotente. */
export function loadAnalyticsTags(): void {
  if (typeof window === 'undefined' || window.__pdiAnalyticsLoaded) return;
  window.__pdiAnalyticsLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  const gtmScript = document.createElement('script');
  gtmScript.async = true;
  gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(gtmScript);

  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(gaScript);

  const gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });
}

