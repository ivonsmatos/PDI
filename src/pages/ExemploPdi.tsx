import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock, Eye, FileText, LayoutDashboard, ListChecks, Sparkles, Target } from 'lucide-react';
import { PublicLayout } from '../components/PublicLayout';
import { usePageMeta } from '../hooks/usePageMeta';

type Tab = 'dashboard' | 'plano' | 'curriculo';

const DEMO_SKILLS = [
  { skill: 'Análise de Dados & GA4', atual: 3, meta: 5 },
  { skill: 'SEO Técnico & Conteúdo', atual: 4, meta: 5 },
  { skill: 'CRO (Otimização de Conversão)', atual: 2, meta: 4 },
  { skill: 'Automação de Marketing', atual: 3, meta: 4 },
  { skill: 'Comunicação Executiva', atual: 4, meta: 5 },
];

const DEMO_ACOES = [
  {
    titulo: 'Concluir módulo de Google Analytics 4 e montar painel semanal',
    categoria: 'Educacional',
    prazo: '30/11/2026',
    status: 'Concluído',
    evidencia: 'Painel publicado e apresentado na reunião 1:1',
  },
  {
    titulo: 'Executar 2 testes A/B na página de cadastro para reduzir abandono',
    categoria: 'Funcional',
    prazo: '15/12/2026',
    status: 'Em andamento',
    evidencia: 'Hipótese documentada · experimento em coleta',
  },
  {
    titulo: 'Liderar revisão trimestral de métricas com equipe de Produto',
    categoria: 'Pessoal',
    prazo: '20/12/2026',
    status: 'Pendente',
    evidencia: 'Pauta em preparação',
  },
];

export const ExemploPdi: React.FC = () => {
  const [tab, setTab] = useState<Tab>('dashboard');

  usePageMeta({
    title: 'Exemplo de PDI pronto: veja painel, plano de ação e currículo - Meu PDI',
    description: 'Explore uma demonstração interativa com dados fictícios de um Plano de Desenvolvimento Individual no Meu PDI antes de criar sua conta.',
    canonicalPath: '/exemplo',
  });

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <header className="space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-100 text-amber-800">
            <Eye className="w-3.5 h-3.5" /> Demonstração Interativa · Dados Fictícios Ilustrativos
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Veja como fica seu PDI na prática
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
            Navegue pelas abas abaixo para visualizar um exemplo completo de painel, plano de ação e currículo de competências antes mesmo de criar sua conta gratuita.
          </p>
        </header>

        {/* Seletor de abas */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Visões da demonstração">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'dashboard'}
            onClick={() => setTab('dashboard')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
              tab === 'dashboard' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Painel & Competências
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'plano'}
            onClick={() => setTab('plano')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
              tab === 'plano' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ListChecks className="w-4 h-4" /> Plano de Ação
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'curriculo'}
            onClick={() => setTab('curriculo')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
              tab === 'curriculo' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" /> Currículo de Competências
          </button>
        </div>

        {/* Conteúdo da aba */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Perfil ilustrativo</p>
              <h2 className="text-xl font-extrabold text-slate-900">Marina Costa · Marketing Digital (Pleno → Sênior)</h2>
              <p className="text-xs text-slate-500 mt-0.5">Objetivo do ciclo: estruturar decisões orientadas a dados e testes de conversão.</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" /> Completude do PDI: 100%
            </span>
          </div>

          {tab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-xs font-semibold text-slate-500">Objetivos ativos</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">2</p>
                </div>
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-xs font-semibold text-slate-500">Ações concluídas</p>
                  <p className="text-2xl font-extrabold text-emerald-600 mt-1">1 de 3</p>
                </div>
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-xs font-semibold text-slate-500">Entradas no diário</p>
                  <p className="text-2xl font-extrabold text-indigo-600 mt-1">6 registros</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Mapa de Competências (Atual vs. Meta)</h3>
                <div className="space-y-3">
                  {DEMO_SKILLS.map((s) => (
                    <div key={s.skill} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{s.skill}</span>
                        <span>Atual {s.atual}/5 · Meta {s.meta}/5</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden relative">
                        <div className="absolute inset-y-0 left-0 bg-indigo-200 rounded-full" style={{ width: `${(s.meta / 5) * 100}%` }} />
                        <div className="relative h-full bg-indigo-600 rounded-full" style={{ width: `${(s.atual / 5) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'plano' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Ações e Evidências do Ciclo</h3>
              <div className="space-y-3">
                {DEMO_ACOES.map((a) => (
                  <div key={a.titulo} className="rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">{a.categoria}</span>
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="w-3.5 h-3.5" /> Prazo: {a.prazo}
                        </span>
                      </div>
                      <p className="font-bold text-slate-900 text-sm">{a.titulo}</p>
                      <p className="text-xs text-slate-600">Evidência: {a.evidencia}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full shrink-0 ${
                        a.status === 'Concluído'
                          ? 'bg-emerald-100 text-emerald-700'
                          : a.status === 'Em andamento'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {a.status === 'Concluído' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'curriculo' && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Prévia do resumo exportável em PDF</p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Você escolhe exatamente quais campos incluir antes de baixar o PDF ou gerar um link compartilhável (sem expor e-mail ou diário privado por padrão).
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 p-4 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" /> Competências consolidadas
                  </p>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• SEO Técnico & Conteúdo (4/5)</li>
                    <li>• Comunicação Executiva (4/5)</li>
                    <li>• Análise de Dados & GA4 (3/5)</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Evidências recentes
                  </p>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• Painel GA4 semanal em operação</li>
                    <li>• Experimentos de conversão documentados</li>
                    <li>• Revisão trimestral com Produto</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-indigo-600 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-extrabold">Pronto para montar o seu?</h2>
            <p className="text-sm text-indigo-100 mt-1">Leva poucos minutos para começar e você pode salvar e continuar quando quiser.</p>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-extrabold px-5 py-3 rounded-xl text-sm hover:bg-indigo-50 transition-colors shrink-0"
          >
            Criar meu PDI grátis <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
};
