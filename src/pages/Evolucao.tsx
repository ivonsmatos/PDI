import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePdiStore } from '../store/usePdiStore';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Legend,
} from 'recharts';
import { TrendingUp, Calendar, Target, Layers } from 'lucide-react';

export const Evolucao: React.FC = () => {
  const { historico, inventario, objetivos, planoDeAcao, planoAcaoStatus, usuario } = usePdiStore();

  // Radar do ciclo atual
  const radarAtual = useMemo(() =>
    inventario.hardSkills.map(s => ({
      subject: s.skill.length > 12 ? s.skill.slice(0, 12) + '…' : s.skill,
      atual: s.nivelAtual,
      meta:  s.nivelDesejado,
      fullMark: 5,
    })),
    [inventario.hardSkills]
  );

  // Radar do ciclo anterior (se existir)
  const cicloAnterior = historico[historico.length - 1];
  const radarAnterior = useMemo(() => {
    if (!cicloAnterior) return [];
    return cicloAnterior.inventario.hardSkills.map(s => ({
      subject: s.skill.length > 12 ? s.skill.slice(0, 12) + '…' : s.skill,
      anterior: s.nivelAtual,
      fullMark: 5,
    }));
  }, [cicloAnterior]);

  // Merge radar atual + anterior por skill
  const radarMerged = useMemo(() => {
    if (!radarAnterior.length) return radarAtual;
    const map = Object.fromEntries(radarAnterior.map(r => [r.subject, r.anterior]));
    return radarAtual.map(r => ({ ...r, anterior: map[r.subject] ?? null }));
  }, [radarAtual, radarAnterior]);

  // Progresso do plano de ação por categoria
  const progressoCategoria = useMemo(() => {
    const cats = ['educacional', 'funcional', 'pessoal'] as const;
    return cats.map(cat => {
      const acoesCat = planoDeAcao.filter(a => objetivos.find(o => o.id === a.objetivoId)?.categoria === cat);
      const conc = acoesCat.filter(a => planoAcaoStatus[a.id] === 'concluido').length;
      return { name: cat.charAt(0).toUpperCase() + cat.slice(1), total: acoesCat.length, concluidas: conc };
    }).filter(c => c.total > 0);
  }, [planoDeAcao, objetivos, planoAcaoStatus]);

  // Linha do tempo dos ciclos
  const temposCiclos = useMemo(() =>
    historico.map((c, i) => ({
      ciclo: `Ciclo ${i + 1}`,
      data: new Date(c.dataSalvamento).toLocaleDateString('pt-BR'),
      objetivos: c.objetivos.length,
      acoes: c.planoDeAcao.length,
      hardSkills: c.inventario.hardSkills.length,
    })),
    [historico]
  );

  const totalAcoes = planoDeAcao.length;
  const acoesConc  = planoDeAcao.filter(a => planoAcaoStatus[a.id] === 'concluido').length;
  const pctGeral   = totalAcoes > 0 ? Math.round((acoesConc / totalAcoes) * 100) : 0;

  return (
    <div className="pb-24 lg:pb-0">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">Evolução</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          Acompanhe seu crescimento ao longo dos ciclos de PDI.
        </p>
      </motion.div>

      {/* Métricas do ciclo atual */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Hard Skills mapeadas', value: inventario.hardSkills.length, icon: <TrendingUp className="w-5 h-5 text-indigo-500" /> },
          { label: 'Objetivos definidos',  value: objetivos.length,             icon: <Target className="w-5 h-5 text-emerald-500" /> },
          { label: 'Ações no plano',       value: totalAcoes,                   icon: <Layers className="w-5 h-5 text-amber-500" /> },
          { label: 'Ciclos anteriores',    value: historico.length,             icon: <Calendar className="w-5 h-5 text-blue-500" /> },
        ].map((m, i) => (
          <motion.div key={m.label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <div className="flex justify-between mb-2">{m.icon}<span className="text-xs text-slate-400 font-medium text-right max-w-[100px] leading-tight">{m.label}</span></div>
            <div className="text-3xl font-black text-slate-800 dark:text-slate-100">{m.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Radar atual */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-500" /> Radar de Hard Skills
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            {cicloAnterior ? 'Comparando ciclo atual vs ciclo anterior.' : 'Nível atual vs nível desejado.'}
          </p>
          <div className="h-72">
            {radarMerged.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarMerged}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                  <Radar name="Atual" dataKey="atual" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.55} />
                  <Radar name="Meta" dataKey="meta" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.3} />
                  {cicloAnterior && (
                    <Radar name="Ciclo anterior" dataKey="anterior" stroke="#f97316" fill="#f97316" fillOpacity={0.2} strokeDasharray="4 2" />
                  )}
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-sm border-2 border-dashed rounded-xl border-slate-200 dark:border-slate-700">
                Nenhuma hard skill preenchida
              </div>
            )}
          </div>
        </motion.div>

        {/* Progresso por categoria */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" /> Ações por Categoria
          </h3>
          <p className="text-xs text-slate-400 mb-4">Total vs concluídas por tipo de objetivo.</p>

          {progressoCategoria.length > 0 ? (
            <>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={progressoCategoria} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} allowDecimals={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="total" name="Total" fill="#e0e7ff" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="concluidas" name="Concluídas" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{pctGeral}%</span>
                <span className="text-xs text-slate-400">de conclusão geral</span>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-56 text-slate-400 text-sm border-2 border-dashed rounded-xl border-slate-200 dark:border-slate-700">
              Nenhuma ação com categoria definida
            </div>
          )}
        </motion.div>
      </div>

      {/* Linha do tempo de ciclos */}
      {temposCiclos.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" /> Histórico de Ciclos de {usuario.nome?.split(' ')[0] || 'você'}
          </h3>
          <div className="relative border-l-2 border-indigo-100 dark:border-indigo-900 ml-3 pl-6 space-y-6">
            {temposCiclos.map((c, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-800 border-4 border-indigo-500" />
                <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-0.5">{c.ciclo} — {c.data}</div>
                <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span>🎯 {c.objetivos} objetivos</span>
                  <span>🚀 {c.acoes} ações</span>
                  <span>💡 {c.hardSkills} hard skills</span>
                </div>
              </div>
            ))}
            {/* Ciclo atual */}
            <div className="relative">
              <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-4 border-indigo-200 dark:border-indigo-900 ring-2 ring-indigo-400" />
              <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-0.5">Ciclo Atual ← você está aqui</div>
              <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span>🎯 {objetivos.length} objetivos</span>
                <span>🚀 {totalAcoes} ações</span>
                <span>✅ {acoesConc} concluídas</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {historico.length === 0 && (
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 text-center border border-dashed border-slate-200 dark:border-slate-700">
          <div className="text-3xl mb-2">📈</div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Nenhum ciclo anterior salvo. Ao concluir um ciclo e salvar, a comparação temporal aparecerá aqui.
          </p>
        </div>
      )}
    </div>
  );
};
