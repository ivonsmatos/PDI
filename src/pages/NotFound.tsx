import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, Home, SearchX } from 'lucide-react';
import { PublicLayout } from '../components/PublicLayout';
import { usePageMeta } from '../hooks/usePageMeta';

export const NotFound: React.FC = () => {
  usePageMeta({
    title: 'Página não encontrada (404) — Meu PDI',
    description: 'A página solicitada não foi encontrada no Meu PDI.',
    canonicalPath: '/404',
    noindex: true,
  });

  return (
    <PublicLayout>
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
          <SearchX className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">Erro 404</p>
          <h1 className="text-3xl font-extrabold text-slate-900">Página não encontrada</h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            O endereço acessado não existe ou foi movido. Você pode voltar para a página inicial ou explorar o guia de PDI.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors"
          >
            <Home className="w-4 h-4" /> Ir para o início
          </Link>
          <Link
            to="/como-fazer-um-pdi"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-bold transition-colors"
          >
            <Compass className="w-4 h-4" /> Como fazer um PDI
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>
        </div>
      </section>
    </PublicLayout>
  );
};
