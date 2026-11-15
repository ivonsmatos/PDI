import { getConsentStatus } from './consent';

export type AnalyticsEventName =
  | 'sign_up_completed'
  | 'pdi_created'
  | 'wizard_step_completed'
  | 'objective_created'
  | 'action_created'
  | 'cycle_saved'
  | 'pdf_exported'
  | 'public_profile_created'
  | 'public_profile_shared'
  | 'course_opened'
  | 'evidence_added';

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

/**
 * Envia evento estruturado para GA4/GTM somente quando o usuário aceitou cookies/analytics.
 * Nunca envia PII (nome, e-mail, texto livre).
 */
export function trackEvent(eventName: AnalyticsEventName, params?: AnalyticsParams): void {
  if (typeof window === 'undefined') return;
  if (getConsentStatus() !== 'accepted') return;

  window.dataLayer = window.dataLayer || [];
  const cleanParams: Record<string, string | number | boolean> = {};
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) cleanParams[k] = v;
    }
  }

  window.dataLayer.push({
    event: eventName,
    ...cleanParams,
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, cleanParams);
  }
}
