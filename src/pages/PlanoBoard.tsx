import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePdiStore } from '../store/usePdiStore';
import type { PlanoStatus } from '../store/usePdiStore';
import { useToastStore } from '../store/useToastStore';
import { STATUS_LABEL } from '../lib/constants';
import {
  Clock, Loader2, CheckCircle2, ChevronDown, Ban,
  CalendarClock, Trash2, ExternalLink, History,
} from 'lucide-react';

const COLUNAS: { status: PlanoStatus; label: string; color: string; bg: string; icon: React.ReactNode }[] = [
  {
    status: 'pendente',
    label: 'Pendente',
    color: 'text-slate-600 dark:text-slate-300',
    bg: 'bg-slate-100 dark:bg-slate-700',
    icon: <Clock className="w-4 h-4" />,
  },
  {
    status: 'em_andamento',
    label: 'Em Andamento',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-900/40',
    icon: <Loader2 className="w-4 h-4 animate-spin" />,
  },
  {
    status: 'concluido',
    label: 'Concluído',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-900/40',
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  {
    status: 'bloqueado',
    label: 'Bloqueado',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-100 dark:bg-rose-900/40',
    icon: <Ban className="w-4 h-4" />,
  },
];

const PRAZO_LABEL: Record<string, string> = { curto: '< 3 meses', medio: '3–6 meses', longo: '6–12 meses' };

export const PlanoBoard: React.FC = () => {
  const {
    planoDeAcao, objetivos, planoAcaoStatus, planoAcaoHistorico,
    setPlanoItemStatus, updatePlanoAcaoItem, removePlanoAcaoItem,
  } = usePdiStore();
  const { addToast } = useToastStore();

  const [filtro, setFiltro] = useState<'todos' | 'educacional' | 'funcional' | 'pessoal'>('todos');
  const [expandido, setExpandido] = useState<string | null>(null);
  const [reagendandoId, setReagendandoId] = useState<string | null>(null);
  const [novaData, setNovaData] = useState('');

  const acoesFiltradas = useMemo(() => {
    if (filtro === 'todos') return planoDeAcao;
    return planoDeAcao.filter(a => {
      const obj = objetivos.find(o => o.id === a.objetivoId);
      return obj?.categoria === filtro;
    });
  }, [planoDeAcao, objetivos, filtro]);

  const getStatus = (id: string): PlanoStatus => planoAcaoStatus[id] ?? 'pendente';
  const total = planoDeAcao.length;
  const conc  = planoDeAcao.filter(a => getStatus(a.id) === 'concluido').length;
  const pct   = total > 0 ? Math.round((conc / total) * 100) : 0;

  const alterarStatus = (id: string, novo: PlanoStatus) => {
    const anterior = getStatus(id);
    if (anterior === novo) return;
    setPlanoItemStatus(id, novo);
    addToast(
      `Status alterado para ${STATUS_LABEL[novo]}`,
      'info',
      {
        label: 'Desfazer',
        onClick: () => setPlanoItemStatus(id, anterior),
      },
    );
  };

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  if (planoDeAcao.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">📋</div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Plano de Ação vazio</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm">
          Nenhuma ação foi definida ainda. Volte ao wizard e preencha o Passo 4.
        </p>
      </div>
    );
  }

  return (
    <div className="pb-24 lg:pb-0">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">Plano de Ação</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Altere o status pelo seletor de cada ação ou abra Detalhes para registrar evidências, notas e reagendar prazos.
        </p>
      </motion.div>

      {/* Progresso geral + Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex-1 max-w-xs">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Concluído</span><span>{conc}/{total}</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.7 }}
              />
            </div>
          </div>
          <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{pct}%</span>
        </div>

        {/* Filtro de categoria */}
        <div className="flex gap-2 flex-wrap">
          {(['todos', 'educacional', 'funcional', 'pessoal'] as const).map(f => (
            <button
              type="button"
              key={f}
              onClick={() => setFiltro(f)}
              aria-pressed={filtro === f}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filtro === f
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {f === 'todos' ? 'Todos' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Alerta de associação ações <-> objetivos */}
      {(() => {
        const objIds = new Set(objetivos.map(o => o.id));
        const orfasCount = planoDeAcao.filter(a => !objIds.has(a.objetivoId)).length;
        const semAcaoCount = objetivos.filter(o => !planoDeAcao.some(a => a.objetivoId === o.id)).length;
        if (orfasCount === 0 && semAcaoCount === 0) return null;
        return (
          <div className="mb-5 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700 p-3.5 text-xs text-amber-900 dark:text-amber-200">
            <strong>Atenção à associação entre ações e objetivos:</strong>{' '}
            {orfasCount > 0 && `${orfasCount} ação(ões) sem objetivo válido vinculado. `}
            {semAcaoCount > 0 && `${semAcaoCount} objetivo(s) sem nenhuma ação vinculada. `}
            Use o seletor <em>&quot;Objetivo vinculado&quot;</em> nos cartões abaixo para corrigir e atualizar a Saúde do Plano.
          </div>
        );
      })()}

      {/* Board - 4 colunas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {COLUNAS.map((col) => {
          const itensColuna = acoesFiltradas.filter(a => getStatus(a.id) === col.status);

          return (
            <div key={col.status} className="flex flex-col gap-3">
              {/* Header coluna */}
              <div className={`flex items-center justify-between px-3 py-2 rounded-xl ${col.bg}`}>
                <div className={`flex items-center gap-2 font-semibold text-sm ${col.color}`}>
                  {col.icon} {col.label}
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white/60 dark:bg-black/20 ${col.color}`}>
                  {itensColuna.length}
                </span>
              </div>

              {/* Cards */}
              <AnimatePresence>
                {itensColuna.map((acao) => {
                  const obj = objetivos.find(o => o.id === acao.objetivoId);
                  const vencida = Boolean(acao.prazoData) && new Date(acao.prazoData) < hoje && col.status !== 'concluido' && col.status !== 'bloqueado';
                  const hist = planoAcaoHistorico[acao.id] ?? [];

                  return (
                    <motion.div
                      key={acao.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      className={`bg-white dark:bg-slate-800 rounded-xl border shadow-sm transition-shadow hover:shadow-md ${
                        vencida ? 'border-rose-300 dark:border-rose-800' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div className="p-4">
                        <p className={`text-sm font-semibold mb-1.5 ${
                          col.status === 'concluido' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'
                        }`}>
                          {acao.acao}
                        </p>

                        <div className="mb-2">
                          <label className="block text-[10px] font-semibold text-slate-400 mb-0.5">
                            Objetivo vinculado
                          </label>
                          <select
                            value={obj ? obj.id : ''}
                            onChange={(e) => {
                              updatePlanoAcaoItem(acao.id, { objetivoId: e.target.value });
                              addToast('Objetivo vinculado atualizado.', 'success');
                            }}
                            className={`w-full text-[11px] font-medium px-2 py-1 rounded-lg border truncate ${
                              obj
                                ? 'border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300'
                                : 'border-rose-300 bg-rose-50 text-rose-700'
                            }`}
                          >
                            {!obj && <option value="" disabled>Objetivo inexistente - selecione...</option>}
                            {objetivos.map(o => (
                              <option key={o.id} value={o.id}>{o.descricao}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap mb-3">
                          {obj?.categoria && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 capitalize">
                              {obj.categoria}
                            </span>
                          )}
                          {obj?.prazo && (
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">{PRAZO_LABEL[obj.prazo]}</span>
                          )}
                          {acao.prazoData && (
                            <span className={`text-[10px] font-semibold ml-auto ${vencida ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'}`}>
                              {vencida ? '⚠ Vencida · ' : ''}{new Date(acao.prazoData).toLocaleDateString('pt-BR')}
                            </span>
                          )}
                        </div>

                        {/* Controle explícito de status (evita mudança acidental ao clicar no card) */}
                        <div className="flex items-center gap-2">
                          <label htmlFor={`status-${acao.id}`} className="sr-only">
                            Status de {acao.acao}
                          </label>
                          <select
                            id={`status-${acao.id}`}
                            value={getStatus(acao.id)}
                            onChange={(e) => alterarStatus(acao.id, e.target.value as PlanoStatus)}
                            className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            {COLUNAS.map(c => (
                              <option key={c.status} value={c.status}>{c.label}</option>
                            ))}
                          </select>
                        </div>

                        {/* Fluxo de recuperação para ação vencida */}
                        {vencida && (
                          <div className="mt-3 p-2.5 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/40 space-y-2">
                            <p className="text-[11px] font-semibold text-rose-700 dark:text-rose-300">
                              Prazo vencido - escolha uma ação:
                            </p>
                            {reagendandoId === acao.id ? (
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="date"
                                  value={novaData}
                                  onChange={e => setNovaData(e.target.value)}
                                  aria-label="Nova data de prazo"
                                  className="flex-1 text-xs px-2 py-1 rounded border border-rose-300 dark:border-rose-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                                />
                                <button
                                  type="button"
                                  disabled={!novaData}
                                  onClick={() => {
                                    updatePlanoAcaoItem(acao.id, { prazoData: novaData });
                                    setReagendandoId(null);
                                    setNovaData('');
                                    addToast('Prazo reagendado.', 'success');
                                  }}
                                  className="text-[11px] font-bold px-2 py-1 rounded bg-indigo-600 text-white disabled:opacity-50"
                                >
                                  Salvar
                                </button>
                              </div>
                            ) : (
                              <div className="flex flex-wrap gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setReagendandoId(acao.id);
                                    setNovaData(acao.prazoData || '');
                                  }}
                                  className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-50"
                                >
                                  <CalendarClock className="w-3 h-3" /> Reagendar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => alterarStatus(acao.id, 'concluido')}
                                  className="text-[10px] font-bold px-2 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                                >
                                  Concluir
                                </button>
                                <button
                                  type="button"
                                  onClick={() => alterarStatus(acao.id, 'bloqueado')}
                                  className="text-[10px] font-bold px-2 py-1 rounded bg-amber-600 text-white hover:bg-amber-700"
                                >
                                  Bloquear
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    removePlanoAcaoItem(acao.id);
                                    addToast('Ação descartada do plano.', 'info');
                                  }}
                                  aria-label={`Descartar ação ${acao.acao}`}
                                  className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/40"
                                >
                                  <Trash2 className="w-3 h-3" /> Descartar
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Expandir detalhes */}
                      <button
                        type="button"
                        aria-expanded={expandido === acao.id}
                        className="w-full flex items-center justify-center py-1.5 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors rounded-b-xl gap-1"
                        onClick={() => setExpandido(expandido === acao.id ? null : acao.id)}
                      >
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandido === acao.id ? 'rotate-180' : ''}`} />
                        {expandido === acao.id ? 'Fechar' : 'Detalhes'}
                      </button>

                      <AnimatePresence>
                        {expandido === acao.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-2 space-y-2.5 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700">
                              {obj && (
                                <div>
                                  <span className="font-semibold text-slate-500 dark:text-slate-400">Objetivo: </span>
                                  {obj.descricao}
                                </div>
                              )}
                              {acao.recursos && (
                                <div>
                                  <span className="font-semibold text-slate-500 dark:text-slate-400">Recursos: </span>
                                  {acao.recursos}
                                </div>
                              )}

                              <div>
                                <label className="block font-semibold text-slate-500 dark:text-slate-400 mb-1">
                                  Resultado esperado
                                </label>
                                <input
                                  type="text"
                                  value={acao.resultadoEsperado ?? ''}
                                  onChange={(e) => updatePlanoAcaoItem(acao.id, { resultadoEsperado: e.target.value })}
                                  placeholder="Como você saberá que deu certo?"
                                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs"
                                />
                              </div>

                              <div>
                                <label className="block font-semibold text-slate-500 dark:text-slate-400 mb-1">
                                  Link de evidência (opcional)
                                </label>
                                <div className="flex gap-1.5">
                                  <input
                                    type="url"
                                    value={acao.evidenciaUrl ?? ''}
                                    onChange={(e) => updatePlanoAcaoItem(acao.id, { evidenciaUrl: e.target.value })}
                                    placeholder="https://..."
                                    className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs"
                                  />
                                  {acao.evidenciaUrl && /^https?:\/\//i.test(acao.evidenciaUrl) && (
                                    <a
                                      href={acao.evidenciaUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      aria-label="Abrir evidência em nova aba"
                                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-indigo-600 dark:text-indigo-400 hover:bg-slate-100"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                  )}
                                </div>
                              </div>

                              <div>
                                <label className="block font-semibold text-slate-500 dark:text-slate-400 mb-1">
                                  Notas de execução / bloqueios
                                </label>
                                <textarea
                                  rows={2}
                                  value={acao.notas ?? ''}
                                  onChange={(e) => updatePlanoAcaoItem(acao.id, { notas: e.target.value })}
                                  placeholder="Anotações, dependências ou motivo de bloqueio..."
                                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs resize-none"
                                />
                              </div>

                              {hist.length > 0 && (
                                <div className="pt-1 border-t border-slate-100 dark:border-slate-700">
                                  <p className="font-semibold text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
                                    <History className="w-3 h-3" /> Histórico recente
                                  </p>
                                  <ul className="space-y-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                                    {hist.slice(-3).reverse().map((h, idx) => (
                                      <li key={idx}>
                                        {STATUS_LABEL[h.status]} · {new Date(h.data).toLocaleDateString('pt-BR')}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {itensColuna.length === 0 && (
                <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                  Nenhuma ação aqui
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
