import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePdiStore } from '../store/usePdiStore';
import {
  Map, CheckSquare, TrendingUp, Target,
  Rocket, AlertTriangle, Calendar, ArrowRight, CheckCircle2,
} from 'lucide-react';

const card = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
};

export const Dashboard: React.FC = () => {
  const { usuario, objetivos, planoDeAcao, inventario, campoDeForcas, planoAcaoStatus, trilhaProgresso } = usePdiStore();

  // -- Métricas --
  const totalAcoes = planoDeAcao.length;
  const acoesConc = planoDeAcao.filter(a => planoAcaoStatus[a.id] === 'concluido').length;
  const acoesProg = planoDeAcao.filter(a => planoAcaoStatus[a.id] === 'em_andamento').length;
  const pctPlano = totalAcoes > 0 ? Math.round((acoesConc / totalAcoes) * 100) : 0;

  const totalTrilha = useMemo(() => {
    const gaps = inventario.hardSkills.filter(s => s.nivelAtual < s.nivelDesejado).length;
    const softs = inventario.softSkills.filter(s => s.pontoForteOuMelhoria === 'Melhoria').length;
    return (gaps + softs) * 3; // 3 atividades por skill
  }, [inventario]);
  const trilhaConc = Object.values(trilhaProgresso).filter(Boolean).length;
  const pctTrilha = totalTrilha > 0 ? Math.round((trilhaConc / totalTrilha) * 100) : 0;

  // Score de saúde
  const scoreSaude = useMemo(() => {
    let score = 100;
    if (objetivos.length === 0) return 0;
    const objetivosComAcao = new Set(planoDeAcao.map(p => p.objetivoId));
    score -= (objetivos.length - objetivosComAcao.size) * 20;
    score -= planoDeAcao.filter(a => !a.recursos?.trim()).length * 10;
    if (campoDeForcas.restritivas.length === 0) score -= 15;
    if (campoDeForcas.aliancas.trim().length < 10) score -= 10;
    return Math.max(0, Math.min(100, score));
  }, [objetivos, planoDeAcao, campoDeForcas]);

  // Próximas ações (não concluídas, por data)
  const proximasAcoes = useMemo(() =>
    [...planoDeAcao]
      .filter(a => planoAcaoStatus[a.id] !== 'concluido')
      .sort((a, b) => new Date(a.prazoData).getTime() - new Date(b.prazoData).getTime())
      .slice(0, 3),
    [planoDeAcao, planoAcaoStatus]
  );

  const saorColor = scoreSaude > 80 ? 'text-emerald-500' : scoreSaude > 50 ? 'text-amber-500' : 'text-rose-500';
  const saorBg   = scoreSaude > 80 ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' :
                   scoreSaude > 50 ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' :
                                     'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800';

  const firstName = usuario.nome?.split(' ')[0] || 'você';

  return (
    <div className="pb-24 lg:pb-0">
      {/* Saudação */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">
          Bom dia, {firstName}! 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          Aqui está um resumo do seu desenvolvimento hoje.
        </p>
      </motion.div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Objetivos', value: objetivos.length, icon: <Target className="w-5 h-5 text-indigo-500" />, color: 'indigo' },
          { label: 'Ações', value: `${acoesConc}/${totalAcoes}`, icon: <Rocket className="w-5 h-5 text-emerald-500" />, color: 'emerald' },
          { label: 'Em andamento', value: acoesProg, icon: <CheckSquare className="w-5 h-5 text-amber-500" />, color: 'amber' },
          { label: 'Trilha concluída', value: `${trilhaConc}/${totalTrilha}`, icon: <Map className="w-5 h-5 text-blue-500" />, color: 'blue' },
        ].map((m, i) => (
          <motion.div key={m.label} custom={i} variants={card} initial="hidden" animate="show"
            className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">{m.label}</span>
              {m.icon}
            </div>
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{m.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Progresso Plano de Ação */}
        <motion.div custom={4} variants={card} initial="hidden" animate="show"
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-indigo-500" /> Plano de Ação
            </h3>
            <Link to="/plano" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
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
        <motion.div custom={5} variants={card} initial="hidden" animate="show"
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
              <Map className="w-4 h-4 text-blue-500" /> Trilha de Desenvolvimento
            </h3>
            <Link to="/trilha" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
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

        {/* Saúde do PDI */}
        <motion.div custom={6} variants={card} initial="hidden" animate="show"
          className={`rounded-2xl p-5 border shadow-sm ${saorBg}`}
        >
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Saúde do PDI
          </h3>
          <div className={`text-4xl font-black mb-1 ${saorColor}`}>{scoreSaude}<span className="text-xl">%</span></div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {scoreSaude > 80 ? '✅ Plano equilibrado e viável!' :
             scoreSaude > 50 ? '⚠️ Faltam métricas ou ações!' :
             '🚨 Plano precisa de atenção — volte ao wizard'}
          </p>
        </motion.div>
      </div>

      {/* Próximas ações */}
      <motion.div custom={7} variants={card} initial="hidden" animate="show"
        className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-500" /> Próximas Ações
          </h3>
          <Link to="/plano" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
            Ver plano completo <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {proximasAcoes.length > 0 ? (
          <div className="space-y-3">
            {proximasAcoes.map((acao) => {
              const obj = objetivos.find(o => o.id === acao.objetivoId);
              const isVencida = acao.prazoData && new Date(acao.prazoData) < new Date();
              return (
                <div key={acao.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700">
                  <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${
                    planoAcaoStatus[acao.id] === 'em_andamento' ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{acao.acao}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{obj?.descricao || 'Objetivo'}</p>
                  </div>
                  {acao.prazoData && (
                    <span className={`text-xs font-semibold shrink-0 ${isVencida ? 'text-rose-500' : 'text-slate-400'}`}>
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

      {/* Atalhos */}
      <motion.div custom={8} variants={card} initial="hidden" animate="show"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          { to: '/trilha', label: 'Acessar Trilha',   desc: 'Veja atividades sugeridas para suas gaps de skill', icon: <Map className="w-5 h-5" />, color: 'from-blue-600 to-cyan-600' },
          { to: '/plano',  label: 'Gerenciar Plano',  desc: 'Atualize o status das suas ações', icon: <CheckSquare className="w-5 h-5" />, color: 'from-indigo-600 to-blue-600' },
          { to: '/evolucao', label: 'Ver Evolução',   desc: 'Compare seu progresso ao longo do tempo', icon: <TrendingUp className="w-5 h-5" />, color: 'from-emerald-600 to-teal-600' },
        ].map((s) => (
          <Link key={s.to} to={s.to}
            className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 text-white hover:opacity-90 transition-opacity shadow-lg group`}
          >
            <div className="flex items-center gap-2 font-bold mb-1">
              {s.icon} {s.label}
            </div>
            <p className="text-xs text-white/70">{s.desc}</p>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};
