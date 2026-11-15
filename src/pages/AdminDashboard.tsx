import React, { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { ShieldCheck, Users, CheckCircle2, Activity, Target, RefreshCw, AlertTriangle, Filter, Calendar, RotateCcw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { isAdminUser } from '../lib/admin';
import { loadAllTelemetry, type TelemetrySnapshot } from '../lib/firestore';
import { AREA_CURTO_MAP as AREA_NOMES } from '../data/areas';

const NIVEL_NOMES: Record<string, string> = {
  estagiario: 'Estagiário',
  junior: 'Júnior',
  pleno: 'Pleno',
  senior: 'Sênior',
  especialista: 'Especialista',
  gestor: 'Gestor',
};

const COLORS = ['#51266E', '#017AA1', '#539CBD', '#6C8D94', '#BAB1BD', '#10b981'];

type PeriodPreset =
  | 'all'
  | 'today'
  | 'yesterday'
  | 'this_week'
  | 'last_7d'
  | 'last_week'
  | 'last_28d'
  | 'last_30d'
  | 'this_month'
  | 'last_month'
  | 'last_90d'
  | 'this_quarter'
  | 'this_year'
  | 'last_year'
  | 'custom';

const PERIOD_OPTIONS: { value: PeriodPreset; label: string }[] = [
  { value: 'all', label: 'Todo o período' },
  { value: 'today', label: 'Hoje' },
  { value: 'yesterday', label: 'Ontem' },
  { value: 'this_week', label: 'Esta semana (Dom - Hoje)' },
  { value: 'last_7d', label: 'Últimos 7 dias' },
  { value: 'last_week', label: 'Semana passada (Dom - Sáb)' },
  { value: 'last_28d', label: 'Últimos 28 dias' },
  { value: 'last_30d', label: 'Últimos 30 dias' },
  { value: 'this_month', label: 'Este mês' },
  { value: 'last_month', label: 'Mês passado' },
  { value: 'last_90d', label: 'Últimos 90 dias' },
  { value: 'this_quarter', label: 'Acumulado no trimestre' },
  { value: 'this_year', label: 'Este ano (janeiro – hoje)' },
  { value: 'last_year', label: 'Ano passado' },
  { value: 'custom', label: 'Personalizado' },
];

function toYmd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getPeriodBounds(
  preset: PeriodPreset,
  nowMs: number,
  customStart: string,
  customEnd: string
): { start: string; end: string } | null {
  if (preset === 'all') return null;
  if (preset === 'custom') {
    if (!customStart && !customEnd) return null;
    return { start: customStart || '0000-01-01', end: customEnd || '9999-12-31' };
  }

  const today = new Date(nowMs);
  today.setHours(0, 0, 0, 0);
  const todayStr = toYmd(today);

  if (preset === 'today') return { start: todayStr, end: todayStr };

  if (preset === 'yesterday') {
    const d = new Date(today);
    d.setDate(d.getDate() - 1);
    const s = toYmd(d);
    return { start: s, end: s };
  }

  if (preset === 'this_week') {
    const start = new Date(today);
    start.setDate(start.getDate() - start.getDay());
    return { start: toYmd(start), end: todayStr };
  }

  if (preset === 'last_week') {
    const end = new Date(today);
    end.setDate(end.getDate() - end.getDay() - 1);
    const start = new Date(end);
    start.setDate(start.getDate() - 6);
    return { start: toYmd(start), end: toYmd(end) };
  }

  if (preset === 'last_7d' || preset === 'last_28d' || preset === 'last_30d' || preset === 'last_90d') {
    const days = preset === 'last_7d' ? 6 : preset === 'last_28d' ? 27 : preset === 'last_30d' ? 29 : 89;
    const start = new Date(today);
    start.setDate(start.getDate() - days);
    return { start: toYmd(start), end: todayStr };
  }

  if (preset === 'this_month') {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    return { start: toYmd(start), end: todayStr };
  }

  if (preset === 'last_month') {
    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const end = new Date(today.getFullYear(), today.getMonth(), 0);
    return { start: toYmd(start), end: toYmd(end) };
  }

  if (preset === 'this_quarter') {
    const qMonth = Math.floor(today.getMonth() / 3) * 3;
    const start = new Date(today.getFullYear(), qMonth, 1);
    return { start: toYmd(start), end: todayStr };
  }

  if (preset === 'this_year') {
    return { start: `${today.getFullYear()}-01-01`, end: todayStr };
  }

  // last_year
  const prevYear = today.getFullYear() - 1;
  return { start: `${prevYear}-01-01`, end: `${prevYear}-12-31` };
}

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<TelemetrySnapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [period, setPeriod] = useState<PeriodPreset>('all');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [areaFilter, setAreaFilter] = useState('all');
  const [nivelFilter, setNivelFilter] = useState('all');

  const isAdmin = isAdminUser(user?.email);

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    setNowMs(Date.now());
    try {
      const data = await loadAllTelemetry();
      setRows(data);
    } catch (err) {
      console.error('[Admin] Erro ao carregar telemetria:', err);
      setError('Sem permissão para ler a coleção telemetry. Publique o arquivo firestore.rules atualizado no Firebase Console e confirme que seu e-mail está verificado.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) return;
    let active = true;
    loadAllTelemetry()
      .then((data) => {
        if (!active) return;
        setRows(data);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        console.error('[Admin] Erro ao carregar telemetria:', err);
        setError('Sem permissão para ler a coleção telemetry. Publique o arquivo firestore.rules atualizado no Firebase Console e confirme que seu e-mail está verificado.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [isAdmin]);

  const availableAreas = useMemo(() => {
    const keys = Array.from(new Set(rows.map(r => r.areaAtuacao || 'nao_informado')));
    return keys
      .map(k => ({ value: k, label: AREA_NOMES[k] || k }))
      .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));
  }, [rows]);

  const availableNiveis = useMemo(() => {
    const keys = Array.from(new Set(rows.map(r => r.nivelCarreira || 'nao_informado')));
    return keys
      .map(k => ({ value: k, label: NIVEL_NOMES[k] || k }))
      .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));
  }, [rows]);

  const filteredRows = useMemo(() => {
    const bounds = getPeriodBounds(period, nowMs, customStart, customEnd);
    return rows.filter(r => {
      if (bounds) {
        if (!r.ultimoAcesso || r.ultimoAcesso < bounds.start || r.ultimoAcesso > bounds.end) {
          return false;
        }
      }
      if (areaFilter !== 'all' && (r.areaAtuacao || 'nao_informado') !== areaFilter) {
        return false;
      }
      if (nivelFilter !== 'all' && (r.nivelCarreira || 'nao_informado') !== nivelFilter) {
        return false;
      }
      return true;
    });
  }, [rows, period, nowMs, customStart, customEnd, areaFilter, nivelFilter]);

  const hasActiveFilters = period !== 'all' || areaFilter !== 'all' || nivelFilter !== 'all';

  const stats = useMemo(() => {
    const total = filteredRows.length;
    const concluidos = filteredRows.filter(r => r.wizardConcluido).length;
    const comObjetivos = filteredRows.filter(r => r.objetivosCount > 0).length;
    const comAcoes = filteredRows.filter(r => r.acoesCount > 0).length;
    const comAcaoConcluida = filteredRows.filter(r => r.acoesConcluidasCount > 0).length;
    const comDiario = filteredRows.filter(r => r.diarioCount > 0).length;

    const totalAcoes = filteredRows.reduce((acc, r) => acc + (r.acoesCount || 0), 0);
    const totalAcoesConcluidas = filteredRows.reduce((acc, r) => acc + (r.acoesConcluidasCount || 0), 0);
    const totalObjetivos = filteredRows.reduce((acc, r) => acc + (r.objetivosCount || 0), 0);
    const totalDiario = filteredRows.reduce((acc, r) => acc + (r.diarioCount || 0), 0);
    const totalCiclos = filteredRows.reduce((acc, r) => acc + (r.ciclosCount || 0), 0);
    const saudeMedia = total > 0
      ? Math.round(filteredRows.reduce((acc, r) => acc + (r.scoreSaude || 0), 0) / total)
      : 0;

    const ativos7d = filteredRows.filter(r => {
      if (!r.ultimoAcesso) return false;
      const diffDays = (nowMs - new Date(`${r.ultimoAcesso}T00:00:00`).getTime()) / 86400000;
      return diffDays >= 0 && diffDays <= 7;
    }).length;
    const ativos30d = filteredRows.filter(r => {
      if (!r.ultimoAcesso) return false;
      const diffDays = (nowMs - new Date(`${r.ultimoAcesso}T00:00:00`).getTime()) / 86400000;
      return diffDays >= 0 && diffDays <= 30;
    }).length;

    const saudeFaixas = [
      { faixa: '0–49% (Crítico)', usuarios: filteredRows.filter(r => (r.scoreSaude || 0) < 50).length, fill: '#f43f5e' },
      { faixa: '50–79% (Atenção)', usuarios: filteredRows.filter(r => (r.scoreSaude || 0) >= 50 && (r.scoreSaude || 0) < 80).length, fill: '#f59e0b' },
      { faixa: '80–100% (Saudável)', usuarios: filteredRows.filter(r => (r.scoreSaude || 0) >= 80).length, fill: '#10b981' },
    ];

    const areaMap: Record<string, number> = {};
    const nivelMap: Record<string, number> = {};
    const diaMap: Record<string, number> = {};

    filteredRows.forEach((r) => {
      const areaKey = AREA_NOMES[r.areaAtuacao] || r.areaAtuacao || 'Não informado';
      areaMap[areaKey] = (areaMap[areaKey] || 0) + 1;

      const nivelKey = NIVEL_NOMES[r.nivelCarreira] || r.nivelCarreira || 'Não informado';
      nivelMap[nivelKey] = (nivelMap[nivelKey] || 0) + 1;

      if (r.ultimoAcesso) {
        diaMap[r.ultimoAcesso] = (diaMap[r.ultimoAcesso] || 0) + 1;
      }
    });

    const porArea = Object.entries(areaMap)
      .map(([name, quantidade]) => ({ name, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade);

    const porNivel = Object.entries(nivelMap)
      .map(([name, quantidade]) => ({ name, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade);

    const porDia = Object.entries(diaMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-14)
      .map(([dia, usuarios]) => ({
        dia: dia.slice(5).split('-').reverse().join('/'),
        usuarios,
      }));

    const funil = [
      { etapa: 'Iniciaram', usuarios: total },
      { etapa: 'Wizard OK', usuarios: concluidos },
      { etapa: 'Objetivos', usuarios: comObjetivos },
      { etapa: 'Ações', usuarios: comAcoes },
      { etapa: 'Concluiu 1+', usuarios: comAcaoConcluida },
      { etapa: 'Diário', usuarios: comDiario },
    ];

    const naoConcluidos = filteredRows.filter(r => !r.wizardConcluido && typeof r.stepAtual === 'number');
    const stepAbandonoCount: Record<number, number> = {};
    naoConcluidos.forEach(r => {
      const s = r.stepAtual!;
      stepAbandonoCount[s] = (stepAbandonoCount[s] || 0) + 1;
    });
    const topAbandono = Object.entries(stepAbandonoCount).sort((a, b) => b[1] - a[1])[0];
    const etapaMaiorAbandono = topAbandono ? `Passo ${topAbandono[0]} (${topAbandono[1]})` : 'Sem abandono registrado';

    const temposPdi = filteredRows
      .map(r => r.tempoAtePrimeiroPdiMin)
      .filter((t): t is number => typeof t === 'number' && t >= 0);
    const tempoMedioPrimeiroPdi = temposPdi.length > 0
      ? `${(temposPdi.reduce((a, b) => a + b, 0) / temposPdi.length).toFixed(1)} min`
      : 'Aguardando novos ciclos';

    const totalEvidencias = filteredRows.reduce((a, r) => a + (r.evidenciasCount || 0), 0);
    const usuariosPdf = filteredRows.filter(r => (r.exportacoesPdf || 0) > 0).length;
    const usuariosComparador = filteredRows.filter(r => (r.usoComparador || 0) > 0).length;
    const usuariosPerfilPub = filteredRows.filter(r => (r.usoPerfilPublico || 0) > 0).length;

    return {
      total,
      concluidos,
      taxaWizard: total > 0 ? Math.round((concluidos / total) * 100) : 0,
      saudeMedia,
      totalAcoes,
      totalAcoesConcluidas,
      taxaAcoes: totalAcoes > 0 ? Math.round((totalAcoesConcluidas / totalAcoes) * 100) : 0,
      totalDiario,
      totalCiclos,
      ativos7d,
      ativos30d,
      mediaObjetivos: total > 0 ? (totalObjetivos / total).toFixed(1) : '0.0',
      mediaAcoes: total > 0 ? (totalAcoes / total).toFixed(1) : '0.0',
      mediaDiario: total > 0 ? (totalDiario / total).toFixed(1) : '0.0',
      acoesPorCiclo: totalCiclos > 0 ? (totalAcoes / totalCiclos).toFixed(1) : (total > 0 ? (totalAcoes / total).toFixed(1) : '0.0'),
      etapaMaiorAbandono,
      tempoMedioPrimeiroPdi,
      totalEvidencias,
      taxaExportacaoPdf: total > 0 ? Math.round((usuariosPdf / total) * 100) : 0,
      taxaUsoComparador: total > 0 ? Math.round((usuariosComparador / total) * 100) : 0,
      taxaUsoPerfilPublico: total > 0 ? Math.round((usuariosPerfilPub / total) * 100) : 0,
      saudeFaixas,
      porArea,
      porNivel,
      porDia,
      funil,
    };
  }, [filteredRows, nowMs]);

  if (!isAdmin) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="pb-24 lg:pb-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-indigo-500" /> Painel do Admin Geral
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Métricas agregadas e <strong>100% anonimizadas</strong> - nenhum nome, e-mail, objetivo ou texto de diário é consultado ou exibido.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchMetrics}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </button>
      </div>

      {error && (
        <div className="rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 p-4 flex items-start gap-3 text-sm text-amber-800 dark:text-amber-300">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Filtros */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm flex flex-wrap items-end gap-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mr-1 self-center">
          <Filter className="w-3.5 h-3.5 text-[#017AA1]" /> Filtros
        </div>

        <label className="flex flex-col gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> Período</span>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as PeriodPreset)}
            className="rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-medium px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#017AA1]"
          >
            {PERIOD_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>

        {period === 'custom' && (
          <>
            <label className="flex flex-col gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <span>De</span>
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-medium px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#017AA1]"
              />
            </label>
            <label className="flex flex-col gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <span>Até</span>
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-medium px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#017AA1]"
              />
            </label>
          </>
        )}

        <label className="flex flex-col gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          <span>Área de atuação</span>
          <select
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
            className="rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-medium px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#017AA1]"
          >
            <option value="all">Todas as áreas</option>
            {availableAreas.map(a => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          <span>Nível de carreira</span>
          <select
            value={nivelFilter}
            onChange={(e) => setNivelFilter(e.target.value)}
            className="rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-medium px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#017AA1]"
          >
            <option value="all">Todos os níveis</option>
            {availableNiveis.map(n => (
              <option key={n.value} value={n.value}>{n.label}</option>
            ))}
          </select>
        </label>

        <div className="ml-auto flex items-center gap-3 self-center">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Exibindo <strong className="text-slate-800 dark:text-slate-100">{filteredRows.length}</strong> de {rows.length}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setPeriod('all');
                setCustomStart('');
                setCustomEnd('');
                setAreaFilter('all');
                setNivelFilter('all');
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Limpar
            </button>
          )}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Usuários ativos</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-3xl font-black text-slate-800 dark:text-slate-100">{stats.total}</p>
          <p className="text-[11px] text-slate-500 mt-1">Com telemetria sincronizada</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Conclusão Wizard</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{stats.taxaWizard}%</p>
          <p className="text-[11px] text-slate-500 mt-1">{stats.concluidos} de {stats.total} concluíram</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Saúde média PDI</span>
            <Activity className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-3xl font-black text-blue-600 dark:text-blue-400">{stats.saudeMedia}%</p>
          <p className="text-[11px] text-slate-500 mt-1">{stats.totalCiclos} ciclo(s) fechado(s)</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Execução de Ações</span>
            <Target className="w-4 h-4 text-violet-500" />
          </div>
          <p className="text-3xl font-black text-violet-600 dark:text-violet-400">{stats.taxaAcoes}%</p>
          <p className="text-[11px] text-slate-500 mt-1">{stats.totalAcoesConcluidas}/{stats.totalAcoes} ações · {stats.totalDiario} diários</p>
        </div>
      </div>

      {/* KPIs secundários: Retenção e Médias */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Retenção Recente</p>
            <p className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mt-1">
              {stats.ativos7d} ativo(s) em 7d · {stats.ativos30d} em 30d
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {stats.total > 0 ? `${Math.round((stats.ativos7d / stats.total) * 100)}% dos usuários voltaram nos últimos 7 dias` : 'Sem dados ainda'}
            </p>
          </div>
          <Users className="w-8 h-8 text-[#017AA1] shrink-0" />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Médias por Usuário</p>
            <p className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mt-1">
              {stats.mediaObjetivos} objetivos · {stats.mediaAcoes} ações · {stats.mediaDiario} diários
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Engajamento médio entre os {stats.total} usuário(s) sincronizado(s)
            </p>
          </div>
          <Activity className="w-8 h-8 text-indigo-500 shrink-0" />
        </div>
      </div>

      {/* Saúde do Produto (Indicadores de Adoção e Valor) */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Saúde do Produto · Adoção, Atrito e Evidências
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40">
            <span className="text-slate-400 block">Maior abandono</span>
            <strong className="text-slate-800 dark:text-slate-100 text-sm">{stats.etapaMaiorAbandono}</strong>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40">
            <span className="text-slate-400 block">Tempo até 1º PDI</span>
            <strong className="text-slate-800 dark:text-slate-100 text-sm">{stats.tempoMedioPrimeiroPdi}</strong>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40">
            <span className="text-slate-400 block">Ações / ciclo</span>
            <strong className="text-slate-800 dark:text-slate-100 text-sm">{stats.acoesPorCiclo}</strong>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40">
            <span className="text-slate-400 block">Evidências</span>
            <strong className="text-[#51266E] dark:text-[#BAB1BD] text-sm">{stats.totalEvidencias}</strong>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40">
            <span className="text-slate-400 block">Exportação PDF</span>
            <strong className="text-[#017AA1] text-sm">{stats.taxaExportacaoPdf}%</strong>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40">
            <span className="text-slate-400 block">Comparador / Perfil</span>
            <strong className="text-emerald-600 text-sm">{stats.taxaUsoComparador}% / {stats.taxaUsoPerfilPublico}%</strong>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">Funil de Ativação e Uso</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Quantos usuários avançaram em cada etapa do produto.</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={1}>
              <BarChart data={stats.funil}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="etapa" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="usuarios" name="Usuários" radius={[8, 8, 0, 0]} fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">Atividade Recente (Últimos 14 dias)</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Contagem agregada de usuários ativos por dia.</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={1}>
              <BarChart data={stats.porDia}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="dia" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="usuarios" name="Usuários ativos" radius={[8, 8, 0, 0]} fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">Distribuição por Área de Atuação</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Áreas profissionais mais presentes na plataforma.</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={1}>
              <BarChart data={stats.porArea} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="quantidade" name="Usuários" radius={[0, 8, 8, 0]}>
                  {stats.porArea.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">Distribuição por Nível de Carreira</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Senioridade informada pelos usuários.</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={1}>
              <BarChart data={stats.porNivel}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="quantidade" name="Usuários" radius={[8, 8, 0, 0]} fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm lg:col-span-2">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">Distribuição do Score de Saúde</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Quantos usuários estão em faixa crítica, de atenção ou saudável.</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={1}>
              <BarChart data={stats.saudeFaixas}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="faixa" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="usuarios" name="Usuários" radius={[8, 8, 0, 0]}>
                  {stats.saudeFaixas.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
};
