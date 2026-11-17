import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, AlertTriangle, HelpCircle,
  BookOpen, ChevronRight, UserCheck,
} from 'lucide-react';
import { PublicLayout } from '../components/PublicLayout';
import { usePageMeta } from '../hooks/usePageMeta';
import { EDITORIAL_ARTICLES } from '../data/editorialArticles';

interface Props {
  slugKey: keyof typeof EDITORIAL_ARTICLES;
}

export const EditorialArticlePage: React.FC<Props> = ({ slugKey }) => {
  const article = EDITORIAL_ARTICLES[slugKey];

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: article.h1,
          description: article.metaDescription,
          inLanguage: 'pt-BR',
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          author: { '@type': 'Organization', name: article.author },
          publisher: {
            '@type': 'Organization',
            name: 'Meu PDI',
            url: 'https://meupdi.app.br/',
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://meupdi.app.br/' },
            { '@type': 'ListItem', position: 2, name: 'O que é PDI', item: 'https://meupdi.app.br/o-que-e-pdi' },
            { '@type': 'ListItem', position: 3, name: article.h1, item: `https://meupdi.app.br${article.slug}` },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: article.faqs.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
      ],
    }),
    [article],
  );

  usePageMeta({
    title: article.seoTitle,
    description: article.metaDescription,
    canonicalPath: article.slug,
    jsonLd,
  });

  return (
    <PublicLayout>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
          <Link to="/" className="hover:text-[#017AA1]">Início</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/o-que-e-pdi" className="hover:text-[#017AA1]">Guias de PDI</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-700 font-semibold truncate">{article.kicker}</span>
        </nav>

        {/* Header + Resposta Direta (AEO 40-60 palavras) */}
        <header className="space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#51266E]/10 text-[#51266E]">
            <BookOpen className="w-3.5 h-3.5" /> {article.kicker}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {article.h1}
          </h1>

          <div className="bg-[#539CBD]/15 border border-[#017AA1]/25 rounded-2xl p-5 text-slate-800 leading-relaxed text-sm sm:text-base">
            <strong className="text-[#017AA1] block text-xs uppercase tracking-wider mb-1">
              Resposta direta
            </strong>
            {article.directAnswer}
          </div>

          <p className="text-slate-600 leading-relaxed text-base">
            {article.intro}
          </p>
        </header>

        {/* Sumário clicável (SXO) */}
        <nav aria-label="Sumário" className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Neste guia</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {article.sections.map(s => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-[#017AA1] font-semibold hover:underline inline-flex items-center gap-1.5">
                  <span>•</span> {s.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#checklist" className="text-[#017AA1] font-semibold hover:underline inline-flex items-center gap-1.5">
                <span>•</span> Checklist prático
              </a>
            </li>
            <li>
              <a href="#erros-comuns" className="text-[#017AA1] font-semibold hover:underline inline-flex items-center gap-1.5">
                <span>•</span> Erros comuns a evitar
              </a>
            </li>
            <li>
              <a href="#faq" className="text-[#017AA1] font-semibold hover:underline inline-flex items-center gap-1.5">
                <span>•</span> Perguntas frequentes
              </a>
            </li>
          </ul>
        </nav>

        {/* Seções principais */}
        {article.sections.map(sec => (
          <section key={sec.id} id={sec.id} className="space-y-4 scroll-mt-24">
            <h2 className="text-2xl font-extrabold text-slate-900">{sec.title}</h2>
            {sec.paragraphs.map((p, idx) => (
              <p key={idx} className="text-slate-600 leading-relaxed">
                {p}
              </p>
            ))}
            {sec.bullets && (
              <ul className="space-y-2.5 pt-1">
                {sec.bullets.map(b => (
                  <li key={b} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 bg-white border border-slate-200 rounded-xl p-3.5">
                    <CheckCircle2 className="w-4 h-4 text-[#017AA1] shrink-0 mt-1" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {sec.example && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#51266E]">{sec.example.titulo}</p>
                <div className="grid grid-cols-1 gap-2 text-sm text-slate-700">
                  <p><strong>Situação atual:</strong> {sec.example.situacaoAtual}</p>
                  <p><strong>Objetivo:</strong> {sec.example.objetivo}</p>
                  <p><strong>Ação:</strong> {sec.example.acao}</p>
                  <p><strong>Prazo:</strong> {sec.example.prazo}</p>
                  <p><strong>Evidência esperada:</strong> {sec.example.evidencia}</p>
                </div>
              </div>
            )}
          </section>
        ))}

        {/* Checklist */}
        <section id="checklist" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-extrabold text-slate-900">Checklist rápido de aplicação</h2>
          <ul className="space-y-2">
            {article.checklist.map(item => (
              <li key={item} className="flex items-start gap-2.5 bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 text-sm text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Erros comuns */}
        <section id="erros-comuns" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-extrabold text-slate-900">Erros comuns e limites</h2>
          <ul className="space-y-2">
            {article.commonErrors.map(err => (
              <li key={err} className="flex items-start gap-2.5 bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-sm text-slate-800">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{err}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ visível (espelha FAQPage JSON-LD) */}
        <section id="faq" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#017AA1]" /> Perguntas frequentes
          </h2>
          <div className="space-y-3">
            {article.faqs.map(f => (
              <div key={f.q} className="bg-white rounded-2xl p-5 border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900">{f.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTAs contextualizados */}
        <section className="bg-gradient-to-r from-[#51266E] to-[#017AA1] text-white rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-extrabold">Pronto para estruturar seu plano com evidências?</h2>
            <p className="text-[#BAB1BD] text-sm mt-1">
              Mapeie suas competências em 40 áreas profissionais e acompanhe sua evolução em ciclos gratuitos.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-white text-[#51266E] font-bold px-5 py-3 rounded-xl hover:bg-slate-100 transition-colors text-sm"
            >
              Criar meu PDI gratuitamente <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/exemplo"
              className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white font-bold px-4 py-3 rounded-xl hover:bg-white/25 transition-colors text-sm"
            >
              Ver exemplo preenchido
            </Link>
          </div>
        </section>

        {/* Links relacionados do cluster */}
        <section className="border-t border-slate-200 pt-6 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Leituras relacionadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {article.relatedLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#017AA1] text-sm font-semibold text-slate-800 hover:text-[#017AA1] flex items-center justify-between transition-colors"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* Metadados editoriais (E-E-A-T) */}
        <footer className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#017AA1]" />
            <span>
              <strong>Autor:</strong> {article.author} · <strong>Revisão:</strong> {article.reviewer}
            </span>
          </div>
          <div>
            Publicado em {article.publishedAt} · Atualizado em {article.updatedAt}
          </div>
        </footer>
      </article>
    </PublicLayout>
  );
};
