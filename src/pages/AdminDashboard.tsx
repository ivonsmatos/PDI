import React, { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { ShieldCheck, Users, CheckCircle2, Activity, Target, RefreshCw, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { isAdminUser } from '../lib/admin';
import { loadAllTelemetry, type TelemetrySnapshot } from '../lib/firestore';

const AREA_NOMES: Record<string, string> = {
  tecnologia: 'Tecnologia',
  devops_infraestrutura: 'DevOps / Infra',
  seguranca_informacao: 'Segurança',
  qualidade_qa: 'QA / Qualidade',
  ciencia_de_dados: 'Dados / BI',
  gestao_de_produto: 'Produto',
  recursos_humanos: 'RH',
  marketing: 'Marketing',
  vendas: 'Vendas',
  gestao: 'Gestão',
  financas: 'Finanças',
  design: 'Design / UX',
};

const NIVEL_NOMES: Record<string, string> = {
  estagiario: 'Estagiário',
  junior: 'Júnior',
  pleno: 'Pleno',
  senior: 'Sênior',
  especialista: 'Especialista',
  gestor: 'Gestor',
};

const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<TelemetrySnapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nowMs, setNowMs] = useState(() => Date.now());

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

  const stats = useMemo(() => {
    const total = rows.length;
    const concluidos = rows.filter(r => r.wizardConcluido).length;
    const comObjetivos = rows.filter(r => r.objetivosCount > 0).length;
    const comAcoes = rows.filter(r => r.acoesCount > 0).length;
    const comAcaoConcluida = rows.filter(r => r.acoesConcluidasCount > 0).length;
    const comDiario = rows.filter(r => r.diarioCount > 0).length;

    const totalAcoes = rows.reduce((acc, r) => acc + (r.acoesCount || 0), 0);
    const totalAcoesConcluidas = rows.reduce((acc, r) => acc + (r.acoesConcluidasCount || 0), 0);
    const totalObjetivos = rows.reduce((acc, r) => acc + (r.objetivosCount || 0), 0);
    const totalDiario = rows.reduce((acc, r) => acc + (r.diarioCount || 0), 0);
    const totalCiclos = rows.reduce((acc, r) => acc + (r.ciclosCount || 0), 0);
    const saudeMedia = total > 0
      ? Math.round(rows.reduce((acc, r) => acc + (r.scoreSaude || 0), 0) / total)
      : 0;

    const ativos7d = rows.filter(r => {
      if (!r.ultimoAcesso) return false;
      const diffDays = (nowMs - new Date(`${r.ultimoAcesso}T00:00:00`).getTime()) / 86400000;
      return diffDays >= 0 && diffDays <= 7;
    }).length;
    const ativos30d = rows.filter(r => {
      if (!r.ultimoAcesso) return false;
      const diffDays = (nowMs - new Date(`${r.ultimoAcesso}T00:00:00`).getTime()) / 86400000;
      return diffDays >= 0 && diffDays <= 30;
    }).length;

    const saudeFaixas = [
      { faixa: '0–49% (Crítico)', usuarios: rows.filter(r => (r.scoreSaude || 0) < 50).length, fill: '#f43f5e' },
      { faixa: '50–79% (Atenção)', usuarios: rows.filter(r => (r.scoreSaude || 0) >= 50 && (r.scoreSaude || 0) < 80).length, fill: '#f59e0b' },
      { faixa: '80–100% (Saudável)', usuarios: rows.filter(r => (r.scoreSaude || 0) >= 80).length, fill: '#10b981' },
    ];

    const areaMap: Record<string, number> = {};
    const nivelMap: Record<string, number> = {};
    const diaMap: Record<string, number> = {};

    rows.forEach((r) => {
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
      saudeFaixas,
      porArea,
      porNivel,
      porDia,
      funil,
    };
  }, [rows, nowMs]);

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
            Métricas agregadas e <strong>100% anonimizadas</strong> — nenhum nome, e-mail, objetivo ou texto de diário é consultado ou exibido.
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
          <Users className="w-8 h-8 text-[#159A9C] shrink-0" />
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
