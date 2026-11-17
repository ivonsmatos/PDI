import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';
import { PublicLayout } from '../components/PublicLayout';
import { usePageMeta } from '../hooks/usePageMeta';

const FAQS = [
  {
    q: 'O que é um Plano de Desenvolvimento Individual (PDI)?',
    a: 'Um Plano de Desenvolvimento Individual é um documento vivo que transforma uma meta de carreira em competências prioritárias, ações práticas, prazos e evidências. Ele deve ser revisado periodicamente em ciclos curtos ou em conversas 1:1 com liderança.',
  },
  {
    q: 'Qual é a diferença entre PDI e PDP?',
    a: 'O PDI (Plano de Desenvolvimento Individual) costuma focar na carreira completa do profissional, incluindo objetivos de médio e longo prazo. O PDP (Plano de Desenvolvimento Pessoal ou Profissional) geralmente é usado no contexto corporativo para metas ligadas ao ciclo de desempenho atual da empresa. Na prática, ambos compartilham objetivos, lacunas e plano de ação.',
  },
  {
    q: 'O que colocar em um PDI profissional?',
    a: 'Um PDI completo reúne: motivo/causa raiz do ciclo, autoavaliação de hard skills e soft skills, objetivos claros (educacional, funcional ou pessoal), plano de ação com prazos e recursos, barreiras previstas e registros contínuos de evidências no diário.',
  },
  {
    q: 'Como acompanhar a evolução de um PDI sem abandoná-lo?',
    a: 'Divida metas anuais em ações mensais com prazo definido, registre conquistas e aprendizados semanais em um diário de progresso e faça revisões ao final de cada ciclo comparando o nível atual com a meta desejada.',
  },
];

export const OQueEPdi: React.FC = () => {
  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: 'O que é PDI? Guia prático para criar seu Plano de Desenvolvimento Individual',
          inLanguage: 'pt-BR',
          datePublished: '2026-11-08',
          dateModified: '2026-11-17',
          author: { '@type': 'Organization', name: 'Equipe Editorial Meu PDI' },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://meupdi.app.br/' },
            { '@type': 'ListItem', position: 2, name: 'O que é PDI', item: 'https://meupdi.app.br/o-que-e-pdi' },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: FAQS.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
      ],
    }),
    [],
  );

  usePageMeta({
    title: 'O que é PDI? Guia prático para criar seu plano de carreira - Meu PDI',
    description:
      'Entenda o que é um Plano de Desenvolvimento Individual (PDI), a diferença para PDP, o que colocar no plano e como acompanhar sua evolução profissional.',
    canonicalPath: '/o-que-e-pdi',
    jsonLd,
  });

  return (
    <PublicLayout>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <header className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">Guia prático · Atualizado em 08/11/2026</p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            O que é PDI? Como montar um Plano de Desenvolvimento Individual que sai do papel
          </h1>
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 text-slate-800 leading-relaxed text-sm sm:text-base">
            <strong>Resumo direto:</strong> Um Plano de Desenvolvimento Individual (PDI) é um documento vivo que transforma metas de carreira em competências prioritárias, ações com prazo, recursos de aprendizagem e evidências concretas. Em vez de ficar engavetado após a avaliação anual, ele orienta decisões semanais e conversas 1:1.
          </div>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-extrabold text-slate-900">Para quem serve o PDI?</h2>
          <p className="text-slate-600 leading-relaxed">
            O PDI atende profissionais em qualquer momento de carreira no Brasil - de estagiários e juniores buscando base técnica a plenos, seniores e gestores mirando promoção, transição de área ou consolidação de liderança - além de equipes de RH que conduzem ciclos de desenvolvimento.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-900">Como montar seu PDI em 5 passos</h2>
          <ol className="space-y-3">
            {[
              { t: '1. Defina a causa raiz do ciclo', d: 'Documente por que este plano importa agora (ex.: promoção, transição de carreira, domínio de nova stack ou melhoria em gestão).' },
              { t: '2. Mapeie competências técnicas e comportamentais', d: 'Compare seu nível atual (autoavaliação de 1 a 5) com a meta desejada para identificar lacunas reais.' },
              { t: '3. Escolha objetivos claros', d: 'Separe metas educacionais, funcionais (entregas no trabalho) e pessoais, evitando listas genéricas.' },
              { t: '4. Quebre em ações com prazo e recursos', d: 'Cada objetivo precisa de ações específicas, data de entrega, curso ou projeto de apoio e barreiras mapeadas.' },
              { t: '5. Registre evidências e revise o ciclo', d: 'Anote aprendizados no diário de progresso, acompanhe prazos e feche ciclos comparando a evolução.' },
            ].map(step => (
              <li key={step.t} className="bg-white rounded-2xl p-4 border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">{step.t}</h3>
                  <p className="text-slate-600 text-sm mt-0.5">{step.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-indigo-600" /> Perguntas frequentes
          </h2>
          <div className="space-y-3">
            {FAQS.map(f => (
              <div key={f.q} className="bg-white rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base">{f.q}</h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-extrabold">Pronto para estruturar o seu?</h2>
            <p className="text-slate-300 text-sm mt-1">
              Use o wizard guiado do Meu PDI gratuitamente, com salvamento automático e currículo de competências em PDF.
            </p>
          </div>
          <Link
            to="/login"
            className="shrink-0 inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-5 py-3 rounded-xl transition-colors"
          >
            Criar meu PDI grátis <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <section className="border-t border-slate-200 pt-6 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Próximas leituras recomendadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Como fazer um PDI em 5 passos', to: '/como-fazer-um-pdi' },
              { label: 'PDI não é currículo: qual é a diferença?', to: '/pdi-e-curriculo' },
              { label: 'PDI ou PDP: qual termo usar?', to: '/pdi-ou-pdp' },
              { label: 'Ver exemplo de PDI preenchido', to: '/exemplo' },
              { label: 'Hard skills e soft skills: como avaliar', to: '/hard-skills-e-soft-skills' },
              { label: 'PDI para RH e gestores', to: '/para-rh' },
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

