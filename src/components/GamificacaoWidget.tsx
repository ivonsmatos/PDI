import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePdiStore } from '../store/usePdiStore';
import { Flame, Trophy, Lock, ChevronDown, TrendingUp } from 'lucide-react';

/* ── Tipos ─────────────────────────────────────────────────────────── */
type Conquista = {
  id: string;
  emoji: string;
  titulo: string;
  descricao: string;
  desbloqueada: boolean;
};

/* ── Helpers puros ──────────────────────────────────────────────────── */
function calcularStreak(diario: { data: string }[]): number {
  if (diario.length === 0) return 0;

  const diasComEntrada = new Set(
    diario.map(e => {
      const d = new Date(e.data);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    }),
  );

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  let streak = 0;
  const cursor = new Date(hoje);
  while (diasComEntrada.has(cursor.getTime())) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/* ── Componente ─────────────────────────────────────────────────────── */
export const GamificacaoWidget: React.FC = () => {
  const {
    diario, historico, planoAcaoStatus,
    conquistasVistas, marcarConquistaVista,
    usuario, inventario, objetivos, planoDeAcao, campoDeForcas,
  } = usePdiStore();

  const [expanded, setExpanded] = useState(false);

  /* streak */
  const streak = useMemo(() => calcularStreak(diario), [diario]);

  /* ações concluídas (todas, incluindo ciclos passados via planoAcaoStatus) */
  const acoesConcluidasTotal = useMemo(
    () => Object.values(planoAcaoStatus).filter(v => v === 'concluido').length,
    [planoAcaoStatus],
  );

  /* completude do perfil */
  const completude = useMemo(() => {
    let pts = 0;
    if (usuario.nome?.trim()) pts += 10;
    if (usuario.causa?.trim().length >= 20) pts += 15;
    if (usuario.areaAtuacao) pts += 5;
    if (usuario.nivelCarreira) pts += 5;
    if (inventario.hardSkills.length >= 3) pts += 15;
    if (inventario.softSkills.length >= 3) pts += 15;
    if (objetivos.length >= 1) pts += 15;
    if (planoDeAcao.length >= 1) pts += 10;
    if ((campoDeForcas.restritivas ?? []).length >= 1) pts += 5;
    if ((campoDeForcas.aliancas ?? '').trim().length >= 10) pts += 5;
    return Math.min(100, pts);
  }, [usuario, inventario, objetivos, planoDeAcao, campoDeForcas]);

  /* conquistas */
  const conquistas: Conquista[] = useMemo(() => [
    {
      id: 'primeira_reflexao',
      emoji: '📔',
      titulo: 'Primeira Reflexão',
      descricao: 'Escreveu sua primeira entrada no diário',
      desbloqueada: diario.length >= 1,
    },
    {
      id: 'streak_7',
      emoji: '🔥',
      titulo: '7 Dias Seguidos',
      descricao: `${streak} dias consecutivos de reflexão`,
      desbloqueada: streak >= 7,
    },
    {
      id: 'primeira_acao',
      emoji: '🎯',
      titulo: 'Primeira Ação',
      descricao: 'Concluiu a primeira ação do plano',
      desbloqueada: acoesConcluidasTotal >= 1,
    },
    {
      id: 'dez_acoes',
      emoji: '🏆',
      titulo: 'Máquina de Execução',
      descricao: '10 ações do plano concluídas',
      desbloqueada: acoesConcluidasTotal >= 10,
    },
    {
      id: 'ciclo_fechado',
      emoji: '🔄',
      titulo: 'Ciclo Completo',
      descricao: 'Fechou e revisou um ciclo de PDI',
      desbloqueada: historico.length >= 1,
    },
    {
      id: 'perfil_completo',
      emoji: '⭐',
      titulo: 'Perfil Completo',
      descricao: 'Preencheu 100% do PDI',
      desbloqueada: completude >= 100,
    },
  ], [diario.length, streak, acoesConcluidasTotal, historico.length, completude]);

  const novasConquistas = conquistas.filter(c => c.desbloqueada && !conquistasVistas.includes(c.id));
  const desbloqueadas = conquistas.filter(c => c.desbloqueada).length;

  const handleExpand = () => {
    setExpanded(v => !v);
    if (!expanded) {
      // Marca como vistas ao abrir
      novasConquistas.forEach(c => marcarConquistaVista(c.id));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm mb-6"
    >
      {/* Header ─ clicável para expandir */}
      <button
        className="w-full flex items-center justify-between p-5 text-left"
        onClick={handleExpand}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Flame className={`w-5 h-5 ${streak > 0 ? 'text-orange-500' : 'text-slate-300 dark:text-slate-600'}`} />
            <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">
              {streak > 0
                ? `🔥 ${streak} dia${streak > 1 ? 's' : ''} de streak`
                : 'Escreva hoje para iniciar um streak'}
            </span>
          </div>
          {novasConquistas.length > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full animate-bounce">
              {novasConquistas.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              {desbloqueadas}/{conquistas.length}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-5">
              {/* Barra de completude */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Completude do perfil
                  </span>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {completude}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${completude}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              {/* Grade de conquistas */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                  Conquistas
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {conquistas.map(c => (
                    <div
                      key={c.id}
                      className={`relative flex flex-col items-center text-center p-3 rounded-xl border transition-colors ${
                        c.desbloqueada
                          ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700'
                          : 'bg-slate-50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-700 opacity-50'
                      }`}
                    >
                      {!c.desbloqueada && (
                        <Lock className="w-3 h-3 text-slate-300 dark:text-slate-600 absolute top-2 right-2" />
                      )}
                      {c.desbloqueada && !conquistasVistas.includes(c.id) && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
                      )}
                      <span className="text-2xl mb-1 leading-none">{c.emoji}</span>
                      <span
                        className={`text-[11px] font-bold leading-tight ${
                          c.desbloqueada
                            ? 'text-amber-700 dark:text-amber-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {c.titulo}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight mt-0.5">
                        {c.descricao}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Link comparador */}
              <Link
                to="/comparador"
                className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                    Ver gap para o próximo nível
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-indigo-400 -rotate-90" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
