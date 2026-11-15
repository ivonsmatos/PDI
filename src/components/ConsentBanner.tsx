import React, { useEffect, useState } from 'react';
import { getConsentStatus, loadAnalyticsTags, setConsentStatus } from '../lib/consent';

export const ConsentBanner: React.FC = () => {
  const [status, setStatus] = useState(() => getConsentStatus());

  useEffect(() => {
    if (status === 'accepted') {
      loadAnalyticsTags();
    }
  }, [status]);

  if (status !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Preferências de privacidade e métricas"
      className="fixed bottom-4 left-4 right-4 z-[250] max-w-xl mx-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4"
    >
      <div className="flex-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <p className="font-bold text-slate-800 dark:text-slate-100 mb-1">
          Sua privacidade no Meu PDI
        </p>
        <p>
          Usamos armazenamento local essencial para manter seu plano funcionando. Com a sua permissão,
          carregamos métricas anônimas de acesso (Google Analytics/GTM) - nunca enviamos seu diário,
          competências ou e-mail.{' '}
          <a href="/privacidade" className="text-indigo-600 dark:text-indigo-400 underline font-semibold">
            Política de privacidade
          </a>
          .
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => {
            setConsentStatus('rejected');
            setStatus('rejected');
          }}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => {
            setConsentStatus('accepted');
            setStatus('accepted');
          }}
          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
        >
          Aceitar métricas
        </button>
      </div>
    </div>
  );
};
