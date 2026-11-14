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

  const isAdmin = isAdminUser(user?.email);

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
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
    const totalDiario = rows.reduce((acc, r) => acc + (r.diarioCount || 0), 0);
    const totalCiclos = rows.reduce((acc, r) => acc + (r.ciclosCount || 0), 0);
    const saudeMedia = total > 0
      ? Math.round(rows.reduce((acc, r) => acc + (r.scoreSaude || 0), 0) / total)
      : 0;

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
      porArea,
      porNivel,
      porDia,
      funil,
    };
  }, [rows]);

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

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">Funil de Ativação e Uso</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Quantos usuários avançaram em cada etapa do produto.</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
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
            <ResponsiveContainer width="100%" height="100%">
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
            <ResponsiveContainer width="100%" height="100%">
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
            <ResponsiveContainer width="100%" height="100%">
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
      </div>
    </div>
  );
};
