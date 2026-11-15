import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Search, ShieldCheck, ArrowRight } from 'lucide-react';
import { PublicLayout } from '../components/PublicLayout';
import { usePageMeta } from '../hooks/usePageMeta';
import { CERTIFICACOES_GRATUITAS, TOTAL_CERTIFICACOES } from '../data/certificacoesGratuitas';
import { ACESSO_INFO, CATALOGO_REVISADO_EM, CREDENCIAL_LABEL, formatarDataBR, reportarRecursoUrl, type AcessoRecurso } from '../lib/recursos';

export const CertificacoesPublicas: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [filtroAcesso, setFiltroAcesso] = useState<AcessoRecurso | 'todos'>('todos');

  usePageMeta({
    title: 'Cursos e credenciais gratuitas curadas - Meu PDI',
    description:
      'Catálogo curado de cursos, trilhas e badges gratuitos com provedor oficial, status de acesso, idioma, tipo de credencial e data de verificação.',
    canonicalPath: '/certificacoes-gratuitas',
  });

  const gruposFiltrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return CERTIFICACOES_GRATUITAS.map(g => ({
      ...g,
      certificacoes: g.certificacoes.filter(c => {
        const matchAcesso = filtroAcesso === 'todos' || c.acesso === filtroAcesso;
        const matchBusca =
          !q ||
          c.nome.toLowerCase().includes(q) ||
          c.provedor.toLowerCase().includes(q) ||
          c.keywords.some(k => k.includes(q));
        return matchAcesso && matchBusca;
      }),
    })).filter(g => g.certificacoes.length > 0);
  }, [busca, filtroAcesso]);

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            {TOTAL_CERTIFICACOES} recursos oficiais curados · Verificado em {formatarDataBR(CATALOGO_REVISADO_EM)}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Cursos, trilhas e credenciais gratuitas para seu PDI
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
            Cada recurso abaixo distingue explicitamente acesso gratuito ao conteúdo, emissão de certificado/declaração/badge e eventuais condições do provedor. Nenhuma oferta preparatória é rotulada como certificação profissional por exame sem evidência oficial.
          </p>
        </header>

        {/* Filtros */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Buscar por tema, ferramenta ou provedor (ex.: Power BI, AWS, FGV)..."
              aria-label="Buscar recursos por tema ou provedor"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={filtroAcesso}
            onChange={e => setFiltroAcesso(e.target.value as AcessoRecurso | 'todos')}
            aria-label="Filtrar por modalidade de acesso"
            className="px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="todos">Todas as modalidades</option>
            <option value="gratuito_com_certificado">Gratuito c/ certificado</option>
            <option value="gratuito">Conteúdo gratuito</option>
            <option value="badge_gratuito">Badge gratuito</option>
            <option value="auditoria">Acesso parcial / auditoria</option>
            <option value="condicionado">Gratuito sob condições</option>
          </select>
        </div>

        {/* Lista */}
        <div className="space-y-8">
          {gruposFiltrados.map(grupo => (
            <section key={grupo.categoria} className="space-y-3">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <span>{grupo.emoji}</span> {grupo.categoria}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {grupo.certificacoes.map(cert => {
                  const info = ACESSO_INFO[cert.acesso];
                  return (
                    <div key={cert.url} className="bg-white rounded-2xl p-5 border border-slate-200 flex flex-col justify-between gap-3">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${info.className}`}>
                            {info.label}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {CREDENCIAL_LABEL[cert.credencial]}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase">
                            {cert.idioma}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base">{cert.nome}</h3>
                        <p className="text-xs text-slate-500 font-medium">
                          Fonte oficial: {cert.provedor}{cert.parceiro ? ` (parceiro: ${cert.parceiro})` : ''}
                        </p>
                        {cert.observacoes && (
                          <p className="text-xs text-slate-600 leading-relaxed">{cert.observacoes}</p>
                        )}
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#159A9C] hover:opacity-80"
                        >
                          Abrir fonte oficial <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                          <span>Última revisão: {formatarDataBR(CATALOGO_REVISADO_EM)}</span>
                          <a
                            href={reportarRecursoUrl(cert.nome, cert.url)}
                            className="hover:text-rose-600 underline decoration-dotted"
                          >
                            Reportar link alterado
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <section className="bg-[#159A9C] text-white rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-extrabold">Quer receber recomendações filtradas pelos seus gaps?</h2>
            <p className="text-[#DEEFE7] text-sm mt-1">
              No Meu PDI, sua trilha cruza automaticamente suas lacunas de competência com estes recursos oficiais. Gratuito para uso individual.
            </p>
          </div>
          <Link
            to="/login"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-[#159A9C] font-bold px-5 py-3 rounded-xl hover:bg-[#DEEFE7] transition-colors"
          >
            Criar meu PDI grátis <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </PublicLayout>
  );
};

