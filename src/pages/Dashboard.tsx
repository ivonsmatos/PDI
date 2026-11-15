import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePdiStore } from '../store/usePdiStore';
import type { PlanoStatus } from '../store/usePdiStore';
import { computeMetricas } from '../lib/healthScore';
import { gerarTrilha, contarProgressoTrilha } from '../lib/trilha';
import { STATUS_LABEL, STATUS_COLOR } from '../lib/constants';
import { useToastStore } from '../store/useToastStore';
import { encontrarVinculosSugeridos } from '../lib/reconcileObjetivos';
import {
  Map, CheckSquare, TrendingUp, Target,
  Rocket, AlertTriangle, Calendar, ArrowRight, CheckCircle2,
  ChevronDown, Clock, Loader2, BookOpen, Shield, Globe, Lock, History, Zap,
} from 'lucide-react';

const card = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
};

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}


const NEXT_STATUS_MAP: Record<PlanoStatus, PlanoStatus> = {
  pendente: 'em_andamento',
  em_andamento: 'concluido',
  concluido: 'pendente',
  bloqueado: 'pendente',
};

export const Dashboard: React.FC = () => {
  const {
    usuario, objetivos, planoDeAcao, inventario, campoDeForcas,
    planoAcaoStatus, trilhaProgresso, setPlanoItemStatus, updatePlanoAcaoItem,
    diario, historico, publicProfileId,
  } = usePdiStore();
  const { addToast } = useToastStore();

  const sugestoesVinculo = useMemo(
    () => encontrarVinculosSugeridos(objetivos, planoDeAcao),
    [objetivos, planoDeAcao]
  );

  const [showScoreDrill, setShowScoreDrill] = useState(false);

  // -- Métricas --
  const totalAcoes = planoDeAcao.length;
  const acoesConc = planoDeAcao.filter(a => planoAcaoStatus[a.id] === 'concluido').length;
  const acoesProg = planoDeAcao.filter(a => planoAcaoStatus[a.id] === 'em_andamento').length;
  const pctPlano = totalAcoes > 0 ? Math.round((acoesConc / totalAcoes) * 100) : 0;

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const acoesVencidas = useMemo(() =>
    planoDeAcao.filter(a => {
      const st = planoAcaoStatus[a.id];
      return st !== 'concluido' && st !== 'bloqueado' && a.prazoData && new Date(a.prazoData) < hoje;
    }),
    [planoDeAcao, planoAcaoStatus] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const acoesBloqueadas = useMemo(
    () => planoDeAcao.filter(a => planoAcaoStatus[a.id] === 'bloqueado').length,
    [planoDeAcao, planoAcaoStatus]
  );

  const acoesSemana = useMemo(() => {
    const limite = new Date(hoje);
    limite.setDate(limite.getDate() + 7);
    return planoDeAcao.filter(a => {
      const st = planoAcaoStatus[a.id];
      if (st === 'concluido' || st === 'bloqueado' || !a.prazoData) return false;
      const dt = new Date(a.prazoData);
      return dt >= hoje && dt <= limite;
    }).length;
  }, [planoDeAcao, planoAcaoStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  const topGaps = useMemo(() => {
    return [...inventario.hardSkills]
      .map(s => ({ ...s, gap: Math.max(0, s.nivelDesejado - s.nivelAtual) }))
      .filter(s => s.gap > 0)
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 3);
  }, [inventario.hardSkills]);

  const mediaHardAtual = useMemo(() => {
    if (inventario.hardSkills.length === 0) return null;
    const sum = inventario.hardSkills.reduce((acc, s) => acc + s.nivelAtual, 0);
    return (sum / inventario.hardSkills.length).toFixed(1);
  }, [inventario.hardSkills]);

  const mediaHardMeta = useMemo(() => {
    if (inventario.hardSkills.length === 0) return null;
    const sum = inventario.hardSkills.reduce((acc, s) => acc + s.nivelDesejado, 0);
    return (sum / inventario.hardSkills.length).toFixed(1);
  }, [inventario.hardSkills]);

  const progressoPorObjetivo = useMemo(() => {
    return objetivos.map(o => {
      const acoesObj = planoDeAcao.filter(a => a.objetivoId === o.id);
      const concluidas = acoesObj.filter(a => planoAcaoStatus[a.id] === 'concluido').length;
      const pct = acoesObj.length > 0 ? Math.round((concluidas / acoesObj.length) * 100) : 0;
      return { id: o.id, descricao: o.descricao, total: acoesObj.length, concluidas, pct };
    });
  }, [objetivos, planoDeAcao, planoAcaoStatus]);

  const ultimoDiario = useMemo(() => {
    if (diario.length === 0) return null;
    return [...diario].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())[0];
  }, [diario]);

  const { total: totalTrilha, concluidas: trilhaConc } = useMemo(() => {
    const trilha = gerarTrilha(inventario, usuario.areaAtuacao);
    return contarProgressoTrilha(trilha, trilhaProgresso);
  }, [inventario, usuario.areaAtuacao, trilhaProgresso]);
  const pctTrilha = totalTrilha > 0 ? Math.round((trilhaConc / totalTrilha) * 100) : 0;

  // Métricas separadas (Completude, Execução, Saúde do plano, Risco)
  const metricas = useMemo(
    () => computeMetricas({ usuario, inventario, objetivos, planoDeAcao, campoDeForcas }, planoAcaoStatus),
    [usuario, inventario, objetivos, planoDeAcao, campoDeForcas, planoAcaoStatus]
  );
  const scoreInfo = metricas.saude;

  // Banner de plano incompleto
  const itensIncompletos = useMemo(() => {
    const itens: string[] = [];
    if (inventario.hardSkills.length === 0) itens.push('Hard skills não avaliadas');
    if (inventario.softSkills.length === 0)  itens.push('Soft skills não avaliadas');
    if (objetivos.length === 0)              itens.push('Nenhum objetivo definido');
    if (planoDeAcao.length === 0)            itens.push('Plano de ação vazio');
    return itens;
  }, [inventario, objetivos, planoDeAcao]);

  const { score: scoreSaude, penalidades, positivos } = scoreInfo;
  const ultimoCiclo = historico[historico.length - 1];
  const deltaSaudeCiclo = ultimoCiclo?.scoreSaude !== undefined ? scoreSaude - ultimoCiclo.scoreSaude : null;

  // Próximas ações (não concluídas, por data)
  const proximasAcoes = useMemo(() =>
    [...planoDeAcao]
      .filter(a => planoAcaoStatus[a.id] !== 'concluido')
      .sort((a, b) => new Date(a.prazoData).getTime() - new Date(b.prazoData).getTime())
      .slice(0, 4),
    [planoDeAcao, planoAcaoStatus]
  );

  const saorColor = scoreSaude > 80 ? 'text-emerald-500' : scoreSaude > 50 ? 'text-amber-500' : 'text-rose-500';
  const saorBg = scoreSaude > 80
    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
    : scoreSaude > 50
    ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
    : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800';

  const firstName = usuario.nome?.split(' ')[0] || 'você';

  return (
    <div className="pb-24 lg:pb-0">
      {/* Saudação dinâmica */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">
          {getGreeting()}, {firstName}! 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          Aqui está um resumo do seu desenvolvimento hoje.
        </p>
      </motion.div>

      {/* Banner de reconciliação automática de vínculos ação <-> objetivo */}
      {sugestoesVinculo.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#539CBD]/15 border border-[#017AA1]/30"
        >
          <div className="text-xs text-slate-800 dark:text-slate-100">
            <strong className="text-[#017AA1]">Vínculos desatualizados detectados:</strong>{' '}
            Encontramos {sugestoesVinculo.length} ação(ões) que correspondem a objetivos sem ações vinculadas. Corrija em 1 clique para atualizar o progresso por objetivo e a saúde do plano.
          </div>
          <button
            type="button"
            onClick={() => {
              sugestoesVinculo.forEach(s => updatePlanoAcaoItem(s.acaoId, { objetivoId: s.objetivoSugeridoId }));
              addToast(`${sugestoesVinculo.length} vínculo(s) atualizado(s) e saúde do plano recalculada!`, 'success');
            }}
            className="shrink-0 px-3.5 py-2 rounded-xl bg-[#017AA1] hover:bg-[#016384] text-white text-xs font-bold transition-colors"
          >
            Corrigir vínculos agora ({sugestoesVinculo.length})
          </button>
        </motion.div>
      )}

      {/* Banner de plano incompleto */}
      {itensIncompletos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-start gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
        >
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">
              Seu PDI ainda não está completo
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-400">
              {itensIncompletos.join(' · ')}
            </p>
          </div>
          <Link
            to="/wizard"
            className="shrink-0 text-xs font-bold text-amber-700 dark:text-amber-300 hover:underline whitespace-nowrap"
          >
            Completar →
          </Link>
        </motion.div>
      )}

      {/* Cards de métricas - agora 5 (com vencidas) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {[
          {
            label: 'Objetivos',
            value: objetivos.length,
            icon: <Target className="w-5 h-5 text-indigo-500" />,
            sub: null as string | null,
          },
          {
            label: 'Ações concluídas',
            value: `${acoesConc}/${totalAcoes}`,
            icon: <Rocket className="w-5 h-5 text-emerald-500" />,
            sub: null,
          },
          {
            label: 'Em andamento',
            value: acoesProg,
            icon: <Loader2 className="w-5 h-5 text-amber-500" />,
            sub: null,
          },
          {
            label: 'Ações vencidas',
            value: acoesVencidas.length,
            icon: <AlertTriangle className={`w-5 h-5 ${acoesVencidas.length > 0 ? 'text-rose-500' : 'text-slate-300'}`} />,
            sub: acoesVencidas.length > 0 ? 'requer atenção' : 'tudo em dia',
          },
          {
            label: 'Trilha concluída',
            value: `${trilhaConc}/${totalTrilha}`,
            icon: <Map className="w-5 h-5 text-blue-500" />,
            sub: null,
          },
        ].map((m, i) => (
          <motion.div
            key={m.label} custom={i} variants={card} initial="hidden" animate="show"
            className={`bg-white dark:bg-slate-800 rounded-2xl p-4 border shadow-sm ${
              m.label === 'Ações vencidas' && acoesVencidas.length > 0
                ? 'border-rose-200 dark:border-rose-800'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide leading-tight">{m.label}</span>
              {m.icon}
            </div>
            <div className={`text-2xl font-black ${
              m.label === 'Ações vencidas' && acoesVencidas.length > 0
                ? 'text-rose-500'
                : 'text-slate-800 dark:text-slate-100'
            }`}>{m.value}</div>
            {m.sub && (
              <p className={`text-[10px] mt-0.5 ${
                m.label === 'Ações vencidas' && acoesVencidas.length > 0
                  ? 'text-rose-400'
                  : 'text-slate-400'
              }`}>{m.sub}</p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Progresso Plano de Ação */}
        <motion.div custom={5} variants={card} initial="hidden" animate="show"
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-indigo-500" /> Plano de Ação
            </h3>
            <Link to="/app/plano" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
              Ver tudo <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{pctPlano}%</span>
            <span className="text-xs text-slate-400 mb-1">concluído</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pctPlano}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">{acoesConc} de {totalAcoes} ações concluídas</p>
        </motion.div>

        {/* Progresso Trilha */}
        <motion.div custom={6} variants={card} initial="hidden" animate="show"
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
              <Map className="w-4 h-4 text-blue-500" /> Trilha de Desenvolvimento
            </h3>
            <Link to="/app/trilha" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
              Ver tudo <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-3xl font-black text-blue-600 dark:text-blue-400">{pctTrilha}%</span>
            <span className="text-xs text-slate-400 mb-1">concluído</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pctTrilha}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">{trilhaConc} de {totalTrilha} atividades concluídas</p>
        </motion.div>

        {/* Saúde do plano com drill-down e separação de métricas */}
        <motion.div custom={7} variants={card} initial="hidden" animate="show"
          className={`rounded-2xl p-5 border shadow-sm ${saorBg}`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Saúde do plano
            </h3>
            <button
              type="button"
              onClick={() => setShowScoreDrill(!showScoreDrill)}
              aria-expanded={showScoreDrill}
              className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-0.5 hover:underline"
            >
              {showScoreDrill ? 'Fechar' : 'Detalhar'}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showScoreDrill ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className={`text-4xl font-black mb-1 ${saorColor}`}>
            {scoreSaude}<span className="text-xl">%</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            {scoreSaude > 80 ? '✅ Estrutura equilibrada e viável' :
             scoreSaude > 50 ? '⚠️ Faltam recursos ou mapeamento' :
             '🚨 Estrutura precisa de atenção - volte ao wizard'}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug">
            Mede o equilíbrio estrutural do plano (objetivos, ações, recursos e forças). Não mede seu nível profissional nem o quanto já foi concluído.
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
            <span>Completude: {metricas.completudePct}% ({metricas.etapasPreenchidas}/{metricas.totalEtapas})</span>
            <span>·</span>
            <span>Execução: {metricas.execucaoPct}%</span>
            {metricas.acoesVencidas > 0 && (
              <>
                <span>·</span>
                <span className="text-rose-600 dark:text-rose-400">Risco: {metricas.acoesVencidas} vencida(s)</span>
              </>
            )}
          </div>

          <AnimatePresence>
            {showScoreDrill && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                  {positivos.map((pos, i) => (
                    <div key={`pos-${i}`} className="flex items-center justify-between text-xs">
                      <span className="text-emerald-700 dark:text-emerald-400 leading-tight">✓ {pos}</span>
                    </div>
                  ))}
                  {penalidades.map((p, i) => (
                    <div key={`pen-${i}`} className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 dark:text-slate-400 leading-tight">− {p.label}</span>
                      <span className="text-rose-600 dark:text-rose-400 font-bold shrink-0 ml-2">-{p.pts}pts</span>
                    </div>
                  ))}
                  {metricas.acoesVencidas > 0 && (
                    <Link
                      to="/app/plano"
                      className="inline-block text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline pt-1"
                    >
                      Resolver {metricas.acoesVencidas} ação(ões) vencida(s) no Plano →
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Próximas ações - com botões de status inline */}
      <motion.div custom={8} variants={card} initial="hidden" animate="show"
        className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-500" /> Próximas Ações
          </h3>
          <Link to="/app/plano" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
            Ver plano completo <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {proximasAcoes.length > 0 ? (
          <div className="space-y-2">
            {proximasAcoes.map((acao) => {
              const obj = objetivos.find(o => o.id === acao.objetivoId);
              const isVencida = acao.prazoData && new Date(acao.prazoData) < hoje;
              const status: PlanoStatus = planoAcaoStatus[acao.id] ?? 'pendente';

              return (
                <div
                  key={acao.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                    isVencida
                      ? 'bg-rose-50/60 dark:bg-rose-900/10 border-rose-100 dark:border-rose-800/30'
                      : 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-700'
                  }`}
                >
                  {/* Botão explícito para alterar status (com Desfazer) */}
                  <button
                    type="button"
                    onClick={() => {
                      const prev = status;
                      const next = NEXT_STATUS_MAP[status];
                      setPlanoItemStatus(acao.id, next);
                      useToastStore.getState().addToast(
                        `Status alterado para ${STATUS_LABEL[next]}`,
                        'info',
                        { label: 'Desfazer', onClick: () => setPlanoItemStatus(acao.id, prev) },
                      );
                    }}
                    aria-label={`Alterar status de "${acao.acao}" (atual: ${STATUS_LABEL[status]})`}
                    title={`Atual: ${STATUS_LABEL[status]} - clique para alterar`}
                    className="shrink-0 hover:scale-110 transition-transform"
                  >
                    {status === 'concluido'
                      ? <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      : status === 'em_andamento'
                      ? <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
                      : <Clock className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                    }
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{acao.acao}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{obj?.descricao || 'Objetivo'}</p>
                      <span className={`text-[10px] font-semibold shrink-0 ${STATUS_COLOR[status]}`}>
                        {STATUS_LABEL[status]}
                      </span>
                    </div>
                  </div>

                  {acao.prazoData && (
                    <span className={`text-xs font-semibold shrink-0 ${isVencida ? 'text-rose-500' : 'text-slate-400'}`}>
                      {isVencida && '⚠ '}
                      {new Date(acao.prazoData).toLocaleDateString('pt-BR')}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400 text-sm">
            🎉 Todas as ações foram concluídas! Inicie um novo ciclo.
          </div>
        )}
      </motion.div>

      {/* Gaps de Hard Skills + Progresso por Objetivo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Maiores Gaps de Hard Skills */}
        <motion.div custom={9} variants={card} initial="hidden" animate="show"
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" /> Maiores Gaps de Competência
            </h3>
            <Link to="/app/comparador" className="text-xs text-[#017AA1] hover:underline flex items-center gap-1">
              Comparar <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {mediaHardAtual && mediaHardMeta && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Média atual <strong className="text-slate-700 dark:text-slate-200">{mediaHardAtual}/5</strong> · Meta média{' '}
              <strong className="text-slate-700 dark:text-slate-200">{mediaHardMeta}/5</strong>
            </p>
          )}
          {topGaps.length > 0 ? (
            <div className="space-y-3">
              {topGaps.map(s => (
                <div key={s.skill}>
                  <div className="flex items-center justify-between text-xs mb-1 gap-2">
                    <span className="font-semibold text-slate-700 dark:text-slate-200 truncate">{s.skill}</span>
                    <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 shrink-0">
                      {s.nivelAtual}/5 → {s.nivelDesejado}/5 (-{s.gap})
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#017AA1] rounded-full"
                      style={{ width: `${Math.round((s.nivelAtual / Math.max(1, s.nivelDesejado)) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 py-4">
              {inventario.hardSkills.length > 0
                ? 'Todas as hard skills cadastradas atingiram a meta desejada.'
                : 'Nenhuma hard skill cadastrada ainda.'}
            </p>
          )}
        </motion.div>

        {/* Progresso por Objetivo */}
        <motion.div custom={10} variants={card} initial="hidden" animate="show"
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-500" /> Progresso por Objetivo
            </h3>
            <div className="flex items-center gap-2 text-[11px]">
              {acoesSemana > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-semibold">
                  {acoesSemana} na semana
                </span>
              )}
              {acoesBloqueadas > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 font-semibold">
                  {acoesBloqueadas} bloqueada(s)
                </span>
              )}
            </div>
          </div>
          {progressoPorObjetivo.length > 0 ? (
            <div className="space-y-3">
              {progressoPorObjetivo.map((obj, idx) => (
                <div key={obj.id}>
                  <div className="flex items-center justify-between text-xs mb-1 gap-2">
                    <span className="font-medium text-slate-700 dark:text-slate-200 truncate">
                      {idx + 1}. {obj.descricao}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                      {obj.concluidas}/{obj.total} ({obj.pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all"
                      style={{ width: `${obj.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 py-4">Nenhum objetivo cadastrado ainda.</p>
          )}
        </motion.div>
      </div>

      {/* Diário + Ciclos/Forças + Perfil Público */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div custom={11} variants={card} initial="hidden" animate="show"
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-violet-500" /> Diário de Progresso
            </h3>
            <Link to="/app/diario" className="text-xs text-[#017AA1] hover:underline">Abrir</Link>
          </div>
          <p className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {diario.length} <span className="text-xs font-medium text-slate-400">registro(s)</span>
          </p>
          {ultimoDiario ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
              Último em {new Date(ultimoDiario.data).toLocaleDateString('pt-BR')}: “{ultimoDiario.texto}”
            </p>
          ) : (
            <p className="text-xs text-slate-400 mt-1.5">Registre aprendizados e evidências da semana.</p>
          )}
        </motion.div>

        <motion.div custom={12} variants={card} initial="hidden" animate="show"
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-500" /> Ciclos & Campo de Forças
            </h3>
            <Link to="/app/evolucao" className="text-xs text-[#017AA1] hover:underline">Evolução</Link>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-black text-slate-800 dark:text-slate-100">
              {historico.length} <span className="text-xs font-medium text-slate-400">ciclo(s)</span>
            </p>
            {deltaSaudeCiclo !== null && (
              <span className={`text-xs font-bold ${deltaSaudeCiclo >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                ({deltaSaudeCiclo >= 0 ? `+${deltaSaudeCiclo}` : deltaSaudeCiclo} pts saúde)
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {campoDeForcas.impulsionadoras.length} impulsionadora(s) · {campoDeForcas.restritivas.length} restritiva(s)
          </p>
        </motion.div>

        <motion.div custom={13} variants={card} initial="hidden" animate="show"
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
              {publicProfileId ? <Globe className="w-4 h-4 text-[#017AA1]" /> : <Lock className="w-4 h-4 text-slate-400" />}
              Perfil Público
            </h3>
            <Link to="/app/config" className="text-xs text-[#017AA1] hover:underline">Configurar</Link>
          </div>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
            {publicProfileId ? 'Ativo e compartilhável' : 'Privado por padrão'}
          </p>
          {publicProfileId ? (
            <Link
              to={`/p/${publicProfileId}`}
              className="inline-flex items-center gap-1 text-xs text-[#017AA1] hover:underline mt-1.5"
            >
              Abrir /p/{publicProfileId} <ArrowRight className="w-3 h-3" />
            </Link>
          ) : (
            <p className="text-xs text-slate-400 mt-1.5">
              Ative em Configurações para gerar seu link revogável.
            </p>
          )}
        </motion.div>
      </div>

      {/* Atalhos */}
      <motion.div custom={9} variants={card} initial="hidden" animate="show"
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {[
          { to: '/app/trilha',   label: 'Trilha',     desc: 'Atividades de desenvolvimento', icon: <Map className="w-5 h-5" />,        color: 'from-blue-600 to-cyan-600' },
          { to: '/app/plano',    label: 'Plano',      desc: 'Gerencie suas ações',           icon: <CheckSquare className="w-5 h-5" />, color: 'from-indigo-600 to-blue-600' },
          { to: '/app/evolucao', label: 'Evolução',   desc: 'Progresso ao longo do tempo',   icon: <TrendingUp className="w-5 h-5" />, color: 'from-emerald-600 to-teal-600' },
          { to: '/app/diario',   label: 'Diário',     desc: 'Registre suas reflexões',       icon: <BookOpen className="w-5 h-5" />,   color: 'from-violet-600 to-purple-600' },
        ].map((s) => (
          <Link key={s.to} to={s.to}
            className={`bg-gradient-to-br ${s.color} rounded-2xl p-4 text-white hover:opacity-90 transition-opacity shadow-lg`}
          >
            <div className="flex items-center gap-2 font-bold mb-1 text-sm">
              {s.icon} {s.label}
            </div>
            <p className="text-[11px] text-white/70">{s.desc}</p>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};
