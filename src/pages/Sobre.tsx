import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookCheck, Scale, ShieldCheck, Sparkles } from 'lucide-react';
import { PublicLayout } from '../components/PublicLayout';
import { usePageMeta } from '../hooks/usePageMeta';

const SOBRE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Sobre o Meu PDI',
  url: 'https://meupdi.app.br/sobre',
  description: 'Conheça o propósito, a metodologia de competências, os limites da autoavaliação e o modelo de privacidade do Meu PDI.',
  mainEntity: {
    '@type': 'Organization',
    '@id': 'https://meupdi.app.br/#organization',
    name: 'Meu PDI',
    url: 'https://meupdi.app.br/',
  },
};

export const Sobre: React.FC = () => {
  usePageMeta({
    title: 'Sobre o Meu PDI: metodologia, propósito e transparência',
    description: 'Entenda como o Meu PDI funciona, como a matriz de competências é estruturada, os limites da autoavaliação e nosso compromisso com privacidade.',
    canonicalPath: '/sobre',
    jsonLd: SOBRE_JSONLD,
  });

  return (
    <PublicLayout>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-10">
        <header className="space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
            <Sparkles className="w-3.5 h-3.5" /> Institucional & Metodologia
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Sobre o Meu PDI
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            O <strong>Meu PDI</strong> é uma aplicação web brasileira criada para ajudar profissionais, gestores e equipes de RH a transformar Planos de Desenvolvimento Individual em rotinas práticas com objetivos claros, ações com prazo e registro de evidências.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-6">
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-600" /> Matriz de competências e autoavaliação
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              As escalas de 0 a 5 e o comparador de nível utilizam matrizes referenciais por área e senioridade combinadas à autoavaliação do usuário. O resultado é uma ferramenta de apoio à reflexão e ao planejamento - não substitui avaliação formal de desempenho nem certificação independente.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <BookCheck className="w-4 h-4 text-emerald-600" /> Curadoria de cursos e recursos
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Os links exibidos na Trilha e na página pública de recursos distinguem acesso gratuito, emissão de certificado ou declaração e eventuais condições do provedor oficial, com data de verificação e canal para reportar links alterados.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-violet-600" /> Privacidade e controle do titular
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Seu PDI é privado por padrão. Perfis compartilháveis exigem geração explícita, podem ser revogados a qualquer momento e recebem diretiva <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">noindex</code>. Você também pode exportar backup JSON ou excluir conta e dados a qualquer momento em Configurações.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2">
            <h2 className="font-bold text-slate-900">Contato e transparência</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dúvidas sobre privacidade, correções de catálogo ou sugestões podem ser enviadas pelo canal de contato indicado em nossa{' '}
              <Link to="/privacidade" className="text-indigo-600 font-semibold hover:underline">
                Política de Privacidade
              </Link>.
            </p>
          </section>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/como-fazer-um-pdi"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-sm hover:bg-slate-100 transition-colors"
          >
            Ler guia: Como fazer um PDI
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors"
          >
            Começar gratuitamente <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </PublicLayout>
  );
};
