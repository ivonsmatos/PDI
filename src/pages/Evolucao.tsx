import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { usePdiStore } from '../store/usePdiStore';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Legend, LineChart, Line, Cell,
} from 'recharts';
import { TrendingUp, Calendar, Target, Layers, Brain } from 'lucide-react';

export const Evolucao: React.FC = () => {
  const { historico, inventario, objetivos, planoDeAcao, planoAcaoStatus, usuario } = usePdiStore();
  const [abaRadar, setAbaRadar] = useState<'hard' | 'soft'>('hard');

  // ── Radar Hard Skills ──────────────────────────────────────────────────────
  const radarAtual = useMemo(() =>
    inventario.hardSkills.map(s => ({
      subject: s.skill.length > 12 ? s.skill.slice(0, 12) + '…' : s.skill,
      atual: s.nivelAtual,
      meta: s.nivelDesejado,
      fullMark: 5,
    })),
    [inventario.hardSkills]
  );

  const cicloAnterior = historico[historico.length - 1];
  const radarAnterior = useMemo(() => {
    if (!cicloAnterior) return [];
    return cicloAnterior.inventario.hardSkills.map(s => ({
      subject: s.skill.length > 12 ? s.skill.slice(0, 12) + '…' : s.skill,
      anterior: s.nivelAtual,
    }));
  }, [cicloAnterior]);

  const radarMerged = useMemo(() => {
    if (!radarAnterior.length) return radarAtual;
    const map = Object.fromEntries(radarAnterior.map(r => [r.subject, r.anterior]));
    return radarAtual.map(r => ({ ...r, anterior: map[r.subject] ?? null }));
  }, [radarAtual, radarAnterior]);

  // ── Gráfico Soft Skills (barras Forte vs Melhoria) ────────────────────────
  const softData = useMemo(() => {
    const forte = inventario.softSkills.filter(s => s.pontoForteOuMelhoria === 'Forte').length;
    const melhoria = inventario.softSkills.filter(s => s.pontoForteOuMelhoria === 'Melhoria').length;
    const neutro = inventario.softSkills.filter(s => s.pontoForteOuMelhoria === '').length;
    return [
      { name: 'Pontos Fortes', quantidade: forte, fill: '#10b981' },
      { name: 'A Melhorar', quantidade: melhoria, fill: '#f59e0b' },
      { name: 'Não avaliado', quantidade: neutro, fill: '#94a3b8' },
    ].filter(d => d.quantidade > 0);
  }, [inventario.softSkills]);

  const softList = useMemo(() => ({
    forte: inventario.softSkills.filter(s => s.pontoForteOuMelhoria === 'Forte').map(s => s.atributo),
    melhoria: inventario.softSkills.filter(s => s.pontoForteOuMelhoria === 'Melhoria').map(s => s.atributo),
  }), [inventario.softSkills]);

  // ── Progresso do plano por categoria ──────────────────────────────────────
  const progressoCategoria = useMemo(() => {
    const cats = ['educacional', 'funcional', 'pessoal'] as const;
    return cats.map(cat => {
      const acoesCat = planoDeAcao.filter(a => objetivos.find(o => o.id === a.objetivoId)?.categoria === cat);
      const conc = acoesCat.filter(a => planoAcaoStatus[a.id] === 'concluido').length;
      return { name: cat.charAt(0).toUpperCase() + cat.slice(1), total: acoesCat.length, concluidas: conc };
    }).filter(c => c.total > 0);
  }, [planoDeAcao, objetivos, planoAcaoStatus]);

  // ── Tendência de Health Score ─────────────────────────────────────────────
  const trendData = useMemo(() => {
    const pts = historico
      .filter(c => c.scoreSaude !== undefined)
      .map((c, i) => ({
        name: `Ciclo ${i + 1}`,
        score: c.scoreSaude!,
        data: new Date(c.dataSalvamento).toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }),
      }));
    return pts;
  }, [historico]);

  // ── Linha do tempo de ciclos ──────────────────────────────────────────────
  const temposCiclos = useMemo(() =>
    historico.map((c, i) => ({
      ciclo: `Ciclo ${i + 1}`,
      data: new Date(c.dataSalvamento).toLocaleDateString('pt-BR'),
      objetivos: c.objetivos.length,
      acoes: c.planoDeAcao.length,
      hardSkills: c.inventario.hardSkills.length,
      score: c.scoreSaude,
      retro: c.retrospectiva,
    })),
    [historico]
  );

  const totalAcoes = planoDeAcao.length;
  const acoesConc = planoDeAcao.filter(a => planoAcaoStatus[a.id] === 'concluido').length;
  const pctGeral = totalAcoes > 0 ? Math.round((acoesConc / totalAcoes) * 100) : 0;

  return (
    <div className="pb-24 lg:pb-0">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">Evolução</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          Acompanhe seu crescimento ao longo dos ciclos de PDI.
        </p>
      </motion.div>

      {/* Métricas */}
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

      {/* Radar Skills — aba Hard / Soft */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm mb-6"
      >
        {/* Tabs */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-500" /> Radar de Competências
          </h3>
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-700 rounded-xl p-1">
            {(['hard', 'soft'] as const).map(t => (
              <button key={t}
                onClick={() => setAbaRadar(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  abaRadar === t
                    ? 'bg-white dark:bg-slate-600 text-indigo-700 dark:text-indigo-300 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {t === 'hard' ? '💻 Hard Skills' : '🧠 Soft Skills'}
              </button>
            ))}
          </div>
        </div>

        {abaRadar === 'hard' ? (
          <>
            <p className="text-xs text-slate-400 mb-4">
              {cicloAnterior ? 'Ciclo atual vs ciclo anterior.' : 'Nível atual vs nível desejado.'}
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
          </>
        ) : (
          <>
            <p className="text-xs text-slate-400 mb-4">Distribuição dos atributos comportamentais avaliados.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mini bar chart */}
              <div className="h-52">
                {softData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={softData} layout="vertical" margin={{ left: 8, right: 16 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} allowDecimals={false} />
                      <YAxis type="category" dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} width={80} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                      <Bar dataKey="quantidade" name="Qtd." radius={[0, 6, 6, 0]}>
                        {softData.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 text-sm border-2 border-dashed rounded-xl border-slate-200 dark:border-slate-700">
                    Soft skills não avaliadas
                  </div>
                )}
              </div>

              {/* Listas */}
              <div className="space-y-3">
                {softList.forte.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                      <Brain className="w-3.5 h-3.5" /> Pontos Fortes
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {softList.forte.map(s => (
                        <span key={s} className="text-[11px] px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {softList.melhoria.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1.5 flex items-center gap-1">
                      🎯 A Desenvolver
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {softList.melhoria.map(s => (
                        <span key={s} className="text-[11px] px-2 py-0.5 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {softList.forte.length === 0 && softList.melhoria.length === 0 && (
                  <p className="text-sm text-slate-400">Preencha a auto-avaliação no wizard para ver os dados.</p>
                )}
              </div>
            </div>
          </>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Progresso por categoria */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" /> Ações por Categoria
          </h3>
          <p className="text-xs text-slate-400 mb-4">Total vs concluídas por tipo de objetivo.</p>

          {progressoCategoria.length > 0 ? (
            <>
              <div className="h-52">
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
            <div className="flex items-center justify-center h-52 text-slate-400 text-sm border-2 border-dashed rounded-xl border-slate-200 dark:border-slate-700">
              Nenhuma ação com categoria definida
            </div>
          )}
        </motion.div>

        {/* Tendência de Health Score */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" /> Tendência: Saúde do PDI
          </h3>
          <p className="text-xs text-slate-400 mb-4">Score de saúde ao longo dos ciclos anteriores.</p>

          {trendData.length >= 2 ? (
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 5, right: 16, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(v) => [`${v}%`, 'Score']}
                  />
                  <Line
                    type="monotone" dataKey="score" name="Saúde"
                    stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-52 text-center text-slate-400 text-sm border-2 border-dashed rounded-xl border-slate-200 dark:border-slate-700 px-4">
              <p className="text-2xl mb-2">📈</p>
              <p>
                {trendData.length === 0
                  ? 'Nenhum ciclo anterior com score salvo.'
                  : 'Complete mais 1 ciclo para ver a tendência.'}
              </p>
              <p className="text-xs mt-1 text-slate-300 dark:text-slate-600">
                O score é salvo automaticamente ao concluir um ciclo.
              </p>
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
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{c.ciclo} — {c.data}</span>
                  {c.score !== undefined && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      c.score > 80 ? 'bg-emerald-100 text-emerald-700' :
                      c.score > 50 ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>{c.score}% saúde</span>
                  )}
                  {c.retro?.nota && (
                    <span className="text-xs text-slate-400">{'⭐'.repeat(c.retro.nota)}</span>
                  )}
                </div>
                <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span>🎯 {c.objetivos} objetivos</span>
                  <span>🚀 {c.acoes} ações</span>
                  <span>💡 {c.hardSkills} hard skills</span>
                </div>
                {c.retro?.aprendizagem && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 italic">
                    💬 "{c.retro.aprendizagem}"
                  </p>
                )}
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
            Nenhum ciclo anterior salvo. Ao concluir um ciclo, a comparação temporal aparecerá aqui.
          </p>
        </div>
      )}
    </div>
  );
};
