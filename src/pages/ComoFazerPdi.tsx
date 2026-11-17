import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Compass, Layers, Target } from 'lucide-react';
import { PublicLayout } from '../components/PublicLayout';
import { usePageMeta } from '../hooks/usePageMeta';

const PASSOS = [
  {
    step: '1. Defina o objetivo de carreira (3 a 6 meses)',
    desc: 'Escolha uma direção concreta - como transição para liderança técnica, preparação para nível Sênior ou fortalecimento em análise de dados. Evite listas genéricas com 10 metas simultâneas.',
  },
  {
    step: '2. Mapeie lacunas de competências (técnicas e comportamentais)',
    desc: 'Compare seu nível atual com o que o próximo ciclo exige. Separe o que é habilidade técnica (hard skill) do que é comportamento e comunicação (soft skill).',
  },
  {
    step: '3. Transforme cada lacuna em ação com prazo',
    desc: 'Para cada prioridade, defina ações observáveis: um curso ou trilha específica, um projeto prático no trabalho, uma mentoria ou entrega mensurável com data.',
  },
  {
    step: '4. Registre evidências contínuas no diário',
    desc: 'Anote entregas, feedbacks recebidos, aprendizados e links de portfólio ao longo das semanas. Evidências tornam conversas 1:1 e avaliações muito mais objetivas.',
  },
  {
    step: '5. Revise e feche ciclos trimestralmente',
    desc: 'Reavalie suas competências ao fim do ciclo, arquive o histórico e ajuste as prioridades para o próximo período sem perder o que já foi construído.',
  },
];

const EXEMPLOS_NIVEL = [
  {
    nivel: 'Nível Júnior',
    foco: 'Consolidar base técnica e autonomia operacional',
    exemplo: 'Objetivo: dominar fundamentos de SQL e versionamento · Ação: concluir módulo prático e aplicar em 2 entregas reais até o fim do trimestre.',
  },
  {
    nivel: 'Nível Pleno',
    foco: 'Ampliar visão de negócio, arquitetura e colaboração entre áreas',
    exemplo: 'Objetivo: liderar iniciativa ponta a ponta · Ação: documentar proposta técnica, alinhar requisitos com produto e apresentar resultados.',
  },
  {
    nivel: 'Nível Sênior / Liderança',
    foco: 'Multiplicar impacto, mentoria e tomada de decisão estratégica',
    exemplo: 'Objetivo: estruturar ritos de desenvolvimento do time · Ação: conduzir revisões mensais e mentorar 2 pessoas júnior/pleno.',
  },
];

const COMO_FAZER_JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HowTo',
      name: 'Como fazer um Plano de Desenvolvimento Individual (PDI)',
      description: 'Passo a passo prático para montar, executar e acompanhar um PDI profissional com foco em competências, ações e evidências.',
      step: PASSOS.map((p, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        name: p.step,
        text: p.desc,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://meupdi.app.br/' },
        { '@type': 'ListItem', position: 2, name: 'O que é PDI', item: 'https://meupdi.app.br/o-que-e-pdi' },
        { '@type': 'ListItem', position: 3, name: 'Como fazer um PDI', item: 'https://meupdi.app.br/como-fazer-um-pdi' },
      ],
    },
  ],
};

export const ComoFazerPdi: React.FC = () => {
  usePageMeta({
    title: 'Como fazer um PDI profissional: passo a passo e exemplos - Meu PDI',
    description: 'Aprenda como fazer um Plano de Desenvolvimento Individual em 5 passos, veja exemplos por nível (Júnior, Pleno e Sênior) e crie seu plano gratuitamente.',
    canonicalPath: '/como-fazer-um-pdi',
    jsonLd: COMO_FAZER_JSONLD,
  });

  return (
    <PublicLayout>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-12">
        <header className="space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
            <Compass className="w-3.5 h-3.5" /> Guia Prático · Atualizado em Nov/2026
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            Como fazer um PDI profissional em 5 passos
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <strong>Resposta direta:</strong> Para fazer um PDI eficiente, defina de 1 a 3 objetivos de carreira para os próximos meses, identifique as lacunas de competências prioritárias, transforme cada lacuna em ações com prazo, registre evidências semanais no diário e revise o progresso em ciclos trimestrais.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" /> Passo a passo para montar seu PDI
          </h2>
          <div className="space-y-3">
            {PASSOS.map((item) => (
              <div key={item.step} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  {item.step}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" /> Exemplos de PDI por nível de carreira
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {EXEMPLOS_NIVEL.map((ex) => (
              <div key={ex.nivel} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
                <p className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">{ex.nivel}</p>
                <p className="text-sm font-bold text-slate-900">{ex.foco}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{ex.exemplo}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-indigo-600 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold">Monte seu PDI agora gratuitamente</h2>
            <p className="text-sm text-indigo-100">
              Use o assistente guiado do Meu PDI para mapear competências, gerar ações e exportar seu currículo em PDF.
            </p>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-extrabold px-5 py-3 rounded-xl text-sm hover:bg-indigo-50 transition-colors shrink-0"
          >
            Criar meu PDI grátis <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <section className="border-t border-slate-200 pt-6 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Aprofunde cada etapa do seu PDI</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Hard skills e soft skills: como avaliar seu nível', to: '/hard-skills-e-soft-skills' },
              { label: 'PDI não é currículo: qual é a diferença?', to: '/pdi-e-curriculo' },
              { label: 'Cursos e credenciais gratuitas por área', to: '/certificacoes-gratuitas' },
              { label: 'Ver exemplo interativo de PDI', to: '/exemplo' },
            ].map(l => (
              <Link
                key={l.to}
                to={l.to}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#017AA1] text-sm font-semibold text-slate-800 hover:text-[#017AA1] flex items-center justify-between transition-colors"
              >
                <span>{l.label}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      </article>
    </PublicLayout>
  );
};
