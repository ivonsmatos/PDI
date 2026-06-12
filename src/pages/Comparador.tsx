import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePdiStore } from '../store/usePdiStore';
import { matrizDeCompetencias } from '../data/matrizCompetencias';
import {
  TrendingUp, CheckCircle2, AlertCircle, XCircle,
  ChevronRight, ArrowRight,
} from 'lucide-react';

const NIVEIS_ORDEM = ['estagiario', 'junior', 'pleno', 'senior', 'especialista', 'gestor'] as const;
type Nivel = typeof NIVEIS_ORDEM[number];

const NIVEL_LABEL: Record<string, string> = {
  estagiario: 'Estagiário',
  junior: 'Júnior',
  pleno: 'Pleno',
  senior: 'Sênior',
  especialista: 'Especialista',
  gestor: 'Gestor',
};

type HardStatus = 'pronto' | 'em_dev' | 'gap';
type SoftStatus = 'forte' | 'melhoria' | 'gap';

const card = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07 } }),
};

export const Comparador: React.FC = () => {
  const { usuario, inventario } = usePdiStore();

  const area = usuario.areaAtuacao as keyof typeof matrizDeCompetencias | '';
  const nivel = usuario.nivelCarreira as Nivel | '';
  const nivelIdx = nivel ? NIVEIS_ORDEM.indexOf(nivel) : -1;
  const proximoNivel: Nivel | null =
    nivelIdx >= 0 && nivelIdx < NIVEIS_ORDEM.length - 1
      ? NIVEIS_ORDEM[nivelIdx + 1]
      : null;

  const matrizArea = area ? matrizDeCompetencias[area] : null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dadosAtual = matrizArea && nivel ? (matrizArea as any)[nivel] : null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dadosProximo = matrizArea && proximoNivel ? (matrizArea as any)[proximoNivel] : null;

  const userHardMap = useMemo(
    () => Object.fromEntries(inventario.hardSkills.map(s => [s.skill, s])),
    [inventario.hardSkills],
  );
  const userSoftMap = useMemo(
    () => Object.fromEntries(inventario.softSkills.map(s => [s.atributo, s])),
    [inventario.softSkills],
  );

  const hardGap = useMemo((): { skill: string; status: HardStatus; nivelAtual: number }[] => {
    if (!dadosProximo?.hardSkills) return [];
    return dadosProximo.hardSkills.map((skill: string) => {
      const found = userHardMap[skill];
      if (!found || found.nivelAtual === 0) return { skill, status: 'gap' as HardStatus, nivelAtual: 0 };
      if (found.nivelAtual >= 4) return { skill, status: 'pronto' as HardStatus, nivelAtual: found.nivelAtual };
      return { skill, status: 'em_dev' as HardStatus, nivelAtual: found.nivelAtual };
    });
  }, [dadosProximo, userHardMap]);

  const softGap = useMemo((): { skill: string; status: SoftStatus }[] => {
    if (!dadosProximo?.softSkills) return [];
    return dadosProximo.softSkills.map((skill: string) => {
      const found = userSoftMap[skill];
      if (!found) return { skill, status: 'gap' as SoftStatus };
      if (found.pontoForteOuMelhoria === 'Forte') return { skill, status: 'forte' as SoftStatus };
      if (found.pontoForteOuMelhoria === 'Melhoria') return { skill, status: 'melhoria' as SoftStatus };
      return { skill, status: 'gap' as SoftStatus };
    });
  }, [dadosProximo, userSoftMap]);

  const prontoCount =
    hardGap.filter(s => s.status === 'pronto').length +
    softGap.filter(s => s.status === 'forte').length;
  const totalCount = hardGap.length + softGap.length;
  const gapScore = totalCount > 0 ? Math.round((prontoCount / totalCount) * 100) : 0;

  const gapColor =
    gapScore >= 70 ? 'text-emerald-500' : gapScore >= 40 ? 'text-amber-500' : 'text-rose-500';
  const gapBar =
    gapScore >= 70 ? 'bg-emerald-500' : gapScore >= 40 ? 'bg-amber-500' : 'bg-rose-500';

  /* ── Sem perfil configurado ────────────────────────────────── */
  if (!area || !nivel) {
    return (
      <div className="pb-24 lg:pb-0 max-w-3xl mx-auto">
        <div className="text-center py-16">
          <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-600 dark:text-slate-300 mb-2">
            Configure seu perfil primeiro
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Defina sua área e nível de carreira na auto-avaliação para usar o Comparador.
          </p>
          <Link
            to="/wizard"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Ir para Auto-avaliação <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  /* ── Nível máximo ──────────────────────────────────────────── */
  if (!proximoNivel) {
    return (
      <div className="pb-24 lg:pb-0 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-indigo-500" /> Comparador de Nível
          </h1>
        </motion.div>
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <span className="text-5xl mb-4 block">🏆</span>
          <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">
            Você está no nível máximo!
          </h2>
          <p className="text-slate-400 text-sm">
            Como Gestor, você atingiu o topo da progressão. Continue desenvolvendo e liderando talentos.
          </p>
        </div>
      </div>
    );
  }

  /* ── View principal ────────────────────────────────────────── */
  return (
    <div className="pb-24 lg:pb-0 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-indigo-500" /> Comparador de Nível
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          O que falta para ir de{' '}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {NIVEL_LABEL[nivel]}
          </span>{' '}
          para{' '}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {NIVEL_LABEL[proximoNivel]}
          </span>
          .
        </p>
      </motion.div>

      {/* Score de prontidão */}
      <motion.div
        custom={0} variants={card} initial="hidden" animate="show"
        className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm">
            Prontidão para {NIVEL_LABEL[proximoNivel]}
          </h3>
          <span className={`text-2xl font-black ${gapColor}`}>{gapScore}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${gapBar}`}
            initial={{ width: 0 }}
            animate={{ width: `${gapScore}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-2">
          {prontoCount} de {totalCount} competências do nível {NIVEL_LABEL[proximoNivel]} já consolidadas
        </p>
      </motion.div>

      {/* Expectativas lado a lado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <motion.div
          custom={1} variants={card} initial="hidden" animate="show"
          className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
            Nível atual — {NIVEL_LABEL[nivel]}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {dadosAtual?.expectativa}
          </p>
        </motion.div>
        <motion.div
          custom={2} variants={card} initial="hidden" animate="show"
          className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 border border-indigo-100 dark:border-indigo-800"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-2">
            Próximo nível — {NIVEL_LABEL[proximoNivel]} 🎯
          </p>
          <p className="text-sm text-indigo-700 dark:text-indigo-300 leading-relaxed">
            {dadosProximo?.expectativa}
          </p>
        </motion.div>
      </div>

      {/* Hard Skills gap */}
      <motion.div
        custom={3} variants={card} initial="hidden" animate="show"
        className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm mb-4"
      >
        <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 text-sm">
          Hard Skills — nível {NIVEL_LABEL[proximoNivel]}
        </h3>
        <div className="space-y-1">
          {hardGap.map(({ skill, status, nivelAtual }) => (
            <div
              key={skill}
              className="flex items-center justify-between gap-3 py-2.5 border-b border-slate-100 dark:border-slate-700/50 last:border-0"
            >
              <div className="flex items-center gap-2 min-w-0">
                {status === 'pronto' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : status === 'em_dev' ? (
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span
                  className={`text-sm truncate ${
                    status === 'pronto'
                      ? 'text-slate-700 dark:text-slate-200 font-medium'
                      : status === 'em_dev'
                      ? 'text-slate-600 dark:text-slate-300'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {skill}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {[1, 2, 3, 4, 5].map(v => (
                  <div
                    key={v}
                    className={`w-3.5 h-3.5 rounded-sm ${
                      nivelAtual >= v
                        ? status === 'pronto'
                          ? 'bg-emerald-500'
                          : 'bg-amber-400'
                        : 'bg-slate-100 dark:bg-slate-700'
                    }`}
                  />
                ))}
                <span
                  className={`text-[10px] font-bold ml-1.5 ${
                    status === 'gap'
                      ? 'text-slate-400'
                      : status === 'pronto'
                      ? 'text-emerald-500'
                      : 'text-amber-500'
                  }`}
                >
                  {status === 'gap' ? 'não avaliada' : status === 'pronto' ? 'pronto' : 'desenvolver'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Soft Skills gap */}
      <motion.div
        custom={4} variants={card} initial="hidden" animate="show"
        className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm mb-6"
      >
        <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 text-sm">
          Soft Skills — nível {NIVEL_LABEL[proximoNivel]}
        </h3>
        <div className="space-y-1">
          {softGap.map(({ skill, status }) => (
            <div
              key={skill}
              className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-700/50 last:border-0"
            >
              <div className="flex items-center gap-2">
                {status === 'forte' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : status === 'melhoria' ? (
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span
                  className={`text-sm ${
                    status === 'forte'
                      ? 'text-slate-700 dark:text-slate-200 font-medium'
                      : status === 'melhoria'
                      ? 'text-slate-600 dark:text-slate-300'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {skill}
                </span>
              </div>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  status === 'forte'
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                    : status === 'melhoria'
                    ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                }`}
              >
                {status === 'forte' ? '✓ Forte' : status === 'melhoria' ? '⚠ Desenvolver' : '○ Não avaliada'}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        custom={5} variants={card} initial="hidden" animate="show"
        className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl p-5 text-white shadow-lg"
      >
        <h3 className="font-bold mb-1">Trabalhe os gaps no seu PDI</h3>
        <p className="text-sm text-indigo-100 mb-4">
          Adicione as competências em gap como objetivos do ciclo atual e crie ações concretas para desenvolvê-las.
        </p>
        <Link
          to="/plano"
          className="inline-flex items-center gap-1.5 bg-white text-indigo-700 text-sm font-bold px-4 py-2 rounded-xl hover:bg-indigo-50 transition-colors"
        >
          Ir para o Plano de Ação <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
};
