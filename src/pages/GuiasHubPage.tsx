import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Search } from 'lucide-react';
import { PublicLayout } from '../components/PublicLayout';
import { usePageMeta } from '../hooks/usePageMeta';
import { EDITORIAL_ARTICLES, type EditorialCluster } from '../data/editorialArticles';

const CLUSTERS: ('Todos' | EditorialCluster)[] = [
  'Todos',
  'Fundamentos',
  'Carreira e Senioridade',
  'Competências',
  'RH e Liderança',
  'Cursos e Ações',
  'Produto e Templates',
];

export const GuiasHubPage: React.FC = () => {
  const [clusterAtivo, setClusterAtivo] = useState<'Todos' | EditorialCluster>('Todos');
  const [busca, setBusca] = useState('');

  const todosArtigos = useMemo(
    () =>
      Object.entries(EDITORIAL_ARTICLES)
        .map(([key, art]) => ({ key, ...art }))
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    []
  );

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return todosArtigos.filter(a => {
      if (clusterAtivo !== 'Todos' && a.cluster !== clusterAtivo) return false;
      if (!q) return true;
      return (
        a.h1.toLowerCase().includes(q) ||
        a.directAnswer.toLowerCase().includes(q) ||
        a.kicker.toLowerCase().includes(q)
      );
    });
  }, [todosArtigos, clusterAtivo, busca]);

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Central de Guias sobre PDI e Desenvolvimento Profissional - Meu PDI',
      description:
        'Guias práticos sobre Plano de Desenvolvimento Individual (PDI), senioridade, competências, evidências, reuniões 1:1, liderança e RH.',
      url: 'https://meupdi.app.br/guias',
      inLanguage: 'pt-BR',
    }),
    []
  );

  usePageMeta({
    title: 'Guias de PDI, Carreira, Competências e RH - Meu PDI',
    description:
      'Explore guias práticos, exemplos preenchidos e templates sobre Plano de Desenvolvimento Individual (PDI), senioridade, competências e RH.',
    canonicalPath: '/guias',
    jsonLd,
  });

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <header className="space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#51266E]/10 text-[#51266E]">
            <BookOpen className="w-3.5 h-3.5" /> Biblioteca Editorial ({todosArtigos.length + 3} guias)
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Guias práticos sobre PDI, competências e desenvolvimento com evidências
          </h1>
          <p className="text-slate-600 max-w-3xl leading-relaxed">
            Conteúdos diretos ao ponto para estruturar seu Plano de Desenvolvimento Individual em qualquer senioridade, transformar cursos em entregas verificáveis e conduzir conversas de carreira em RH e liderança.
          </p>
        </header>

        {/* Páginas-pilar em destaque */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { to: '/o-que-e-pdi', title: 'O que é PDI?', desc: 'Conceito, estrutura essencial e perguntas frequentes.' },
            { to: '/como-fazer-um-pdi', title: 'Como fazer um PDI em 5 passos', desc: 'Tutorial prático com exemplos para Júnior, Pleno e Sênior.' },
            { to: '/exemplo', title: 'Exemplo de PDI preenchido', desc: 'Demonstração realista de objetivos, ações e evidências.' },
          ].map(p => (
            <Link
              key={p.to}
              to={p.to}
              className="rounded-2xl p-5 bg-gradient-to-br from-[#51266E] to-[#017AA1] text-white hover:opacity-95 transition-opacity space-y-1.5"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#BAB1BD]">Página-pilar</span>
              <h2 className="text-base font-extrabold flex items-center justify-between gap-2">
                <span>{p.title}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </h2>
              <p className="text-xs text-slate-200 leading-relaxed">{p.desc}</p>
            </Link>
          ))}
        </section>

        {/* Busca e filtro por cluster */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar tema (ex: Júnior, Sênior, 1:1, evidências, transição, LGPD, IA...)"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#017AA1]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CLUSTERS.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setClusterAtivo(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                  clusterAtivo === c
                    ? 'bg-[#017AA1] text-white border-[#017AA1]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#017AA1]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de artigos */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtrados.map(art => (
            <Link
              key={art.key}
              to={art.slug}
              className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-[#017AA1] hover:shadow-sm transition-all flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="font-bold uppercase tracking-wider text-[#51266E]">{art.cluster}</span>
                  <span className="text-slate-400">{art.publishedAt}</span>
                </div>
                <h2 className="text-base font-extrabold text-slate-900 leading-snug">{art.h1}</h2>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{art.directAnswer}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#017AA1]">
                Ler guia completo <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </section>
      </div>
    </PublicLayout>
  );
};
