import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePdiStore, PlanoStatus } from '../store/usePdiStore';
import { Clock, Loader2, CheckCircle2, ChevronDown } from 'lucide-react';

const COLUNAS: { status: PlanoStatus; label: string; color: string; bg: string; icon: React.ReactNode }[] = [
  {
    status: 'pendente',
    label: 'Pendente',
    color: 'text-slate-500 dark:text-slate-400',
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
];

const NEXT_STATUS: Record<PlanoStatus, PlanoStatus> = {
  pendente:    'em_andamento',
  em_andamento: 'concluido',
  concluido:   'pendente',
};

const PRAZO_LABEL: Record<string, string> = { curto: '< 3 meses', medio: '3–6 meses', longo: '6–12 meses' };

export const PlanoBoard: React.FC = () => {
  const { planoDeAcao, objetivos, planoAcaoStatus, setPlanoItemStatus } = usePdiStore();
  const [filtro, setFiltro] = useState<'todos' | 'educacional' | 'funcional' | 'pessoal'>('todos');
  const [expandido, setExpandido] = useState<string | null>(null);

  // Ações filtradas por categoria do objetivo
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

  const isVencida = (prazoData: string) => prazoData && new Date(prazoData) < new Date() && getStatus(prazoData) !== 'concluido';

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
          Clique em qualquer ação para avançar o status: Pendente → Em andamento → Concluído.
        </p>
      </motion.div>

      {/* Progresso geral + Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex-1 max-w-xs">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
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
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filtro === f
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {f === 'todos' ? 'Todos' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Board — 3 colunas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  const vencida = acao.prazoData && new Date(acao.prazoData) < new Date() && col.status !== 'concluido';

                  return (
                    <motion.div
                      key={acao.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      className={`bg-white dark:bg-slate-800 rounded-xl border shadow-sm cursor-pointer transition-shadow hover:shadow-md ${
                        vencida ? 'border-rose-200 dark:border-rose-800' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {/* Área clicável para avançar status */}
                      <div
                        className="p-4"
                        onClick={() => setPlanoItemStatus(acao.id, NEXT_STATUS[getStatus(acao.id)])}
                      >
                        <p className={`text-sm font-semibold mb-2 ${
                          col.status === 'concluido' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'
                        }`}>
                          {acao.acao}
                        </p>

                        <div className="flex items-center gap-2 flex-wrap">
                          {obj?.categoria && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 capitalize">
                              {obj.categoria}
                            </span>
                          )}
                          {obj?.prazo && (
                            <span className="text-[10px] text-slate-400">{PRAZO_LABEL[obj.prazo]}</span>
                          )}
                          {acao.prazoData && (
                            <span className={`text-[10px] font-semibold ml-auto ${vencida ? 'text-rose-500' : 'text-slate-400'}`}>
                              {vencida ? '⚠ ' : ''}{new Date(acao.prazoData).toLocaleDateString('pt-BR')}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Expandir detalhes */}
                      <button
                        className="w-full flex items-center justify-center py-1.5 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors rounded-b-xl gap-1"
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
                            <div className="px-4 pb-4 pt-2 space-y-2 text-xs text-slate-600 dark:text-slate-400">
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
                              <div className="flex gap-2 pt-1">
                                {(['pendente', 'em_andamento', 'concluido'] as PlanoStatus[]).map((s) => (
                                  <button
                                    key={s}
                                    onClick={() => setPlanoItemStatus(acao.id, s)}
                                    className={`flex-1 py-1 rounded-lg text-[10px] font-bold capitalize transition-all ${
                                      getStatus(acao.id) === s
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                                    }`}
                                  >
                                    {s === 'em_andamento' ? 'Andando' : s === 'concluido' ? 'Feito' : 'Pendente'}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {itensColuna.length === 0 && (
                <div className="text-center py-8 text-slate-300 dark:text-slate-600 text-xs border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
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
