import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Download, Plus, MessageSquare, ShieldCheck,
  TrendingUp, GitBranch, AlertTriangle, Link2, CheckCircle2, Trash2,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { loadPublicProfile } from '../lib/firestore';
import { isFirestoreProfileId, type PublicProfileData } from '../lib/publicProfile';
import { useToastStore } from '../store/useToastStore';

type RhMemberRecord = {
  id: string;
  codigoAnonimo: string;
  area: string;
  nivel: string;
  objetivosCount: number;
  acoesConcluidasCount: number;
  ciclosCount: number;
  visibilidade: string;
  consentimentoData: string;
  hardSkills: { skill: string; nivelAtual: number; nivelDesejado: number }[];
};

type OneOnOneNote = {
  id: string;
  codigoMembro: string;
  data: string;
  pauta: string;
  acordos: string;
};

type SuccessionPlan = {
  id: string;
  posicaoCritica: string;
  area: string;
  sucessorCodigo: string;
  prontidao: 'Pronto agora' | '6-12 meses' | '12+ meses';
  focoDesenvolvimento: string;
};

const DEMO_TEAM: RhMemberRecord[] = [
  {
    id: 'demo-1',
    codigoAnonimo: 'COLAB-01',
    area: 'Tecnologia',
    nivel: 'Pleno',
    objetivosCount: 3,
    acoesConcluidasCount: 5,
    ciclosCount: 2,
    visibilidade: 'Compartilhado com RH',
    consentimentoData: '2026-10-12',
    hardSkills: [
      { skill: 'Arquitetura de Software', nivelAtual: 3, nivelDesejado: 4 },
      { skill: 'Testes Automatizados', nivelAtual: 2, nivelDesejado: 4 },
      { skill: 'Cloud & CI/CD', nivelAtual: 3, nivelDesejado: 4 },
    ],
  },
  {
    id: 'demo-2',
    codigoAnonimo: 'COLAB-02',
    area: 'Gestão de Produto',
    nivel: 'Sênior',
    objetivosCount: 4,
    acoesConcluidasCount: 7,
    ciclosCount: 3,
    visibilidade: 'Compartilhado com RH',
    consentimentoData: '2026-10-20',
    hardSkills: [
      { skill: 'Product Discovery', nivelAtual: 4, nivelDesejado: 5 },
      { skill: 'Métricas & Analytics', nivelAtual: 3, nivelDesejado: 5 },
      { skill: 'Estratégia de Produto', nivelAtual: 4, nivelDesejado: 5 },
    ],
  },
  {
    id: 'demo-3',
    codigoAnonimo: 'COLAB-03',
    area: 'Ciência de Dados',
    nivel: 'Júnior',
    objetivosCount: 3,
    acoesConcluidasCount: 3,
    ciclosCount: 1,
    visibilidade: 'Compartilhado com gestor',
    consentimentoData: '2026-11-01',
    hardSkills: [
      { skill: 'SQL & Modelagem', nivelAtual: 3, nivelDesejado: 4 },
      { skill: 'Python para Dados', nivelAtual: 2, nivelDesejado: 4 },
      { skill: 'Testes Automatizados', nivelAtual: 2, nivelDesejado: 4 },
    ],
  },
];

const STORAGE_1ON1 = 'pdi-rh-1on1';
const STORAGE_SUCCESSION = 'pdi-rh-succession';

export const ModoRh: React.FC = () => {
  const { addToast } = useToastStore();
  const [members, setMembers] = useState<RhMemberRecord[]>(DEMO_TEAM);
  const [usingDemo, setUsingDemo] = useState(true);
  const [linkInput, setLinkInput] = useState('');
  const [importing, setImporting] = useState(false);

  const [notes, setNotes] = useState<OneOnOneNote[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_1ON1);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [noteForm, setNoteForm] = useState({ codigoMembro: 'COLAB-01', data: new Date().toISOString().slice(0, 10), pauta: '', acordos: '' });

  const [sucessoes, setSucessoes] = useState<SuccessionPlan[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_SUCCESSION);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [sucForm, setSucForm] = useState<Omit<SuccessionPlan, 'id'>>({
    posicaoCritica: '',
    area: 'Tecnologia',
    sucessorCodigo: 'COLAB-01',
    prontidao: '6-12 meses',
    focoDesenvolvimento: '',
  });

  const handleImportProfileLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = linkInput.trim();
    const match = trimmed.match(/\/p\/([A-Za-z0-9_-]+)/);
    const profileId = match ? match[1] : trimmed;
    if (!isFirestoreProfileId(profileId)) {
      addToast('Informe um link /p/ID ou ID válido de perfil compartilhado.', 'warning');
      return;
    }
    setImporting(true);
    try {
      const data: PublicProfileData | null = await loadPublicProfile(profileId);
      if (!data) {
        addToast('Perfil não encontrado, expirado ou revogado pelo profissional.', 'error');
        return;
      }
      if (data.visibilidade && data.visibilidade !== 'rh' && data.visibilidade !== 'gestor' && data.visibilidade !== 'publico') {
        addToast('Este link foi restrito apenas para recrutadores e não autoriza leitura no módulo RH.', 'warning');
        return;
      }
      const nextIndex = (usingDemo ? 0 : members.length) + 1;
      const novo: RhMemberRecord = {
        id: profileId,
        codigoAnonimo: `COLAB-${String(nextIndex).padStart(2, '0')}`,
        area: data.area,
        nivel: data.nivel,
        objetivosCount: data.objetivosCount,
        acoesConcluidasCount: data.acoesConcluidasCount,
        ciclosCount: data.ciclosCount,
        visibilidade: data.visibilidade || 'publico',
        consentimentoData: data.dataGeracao.slice(0, 10),
        hardSkills: data.hardSkills,
      };
      setMembers(prev => (usingDemo ? [novo] : [...prev.filter(m => m.id !== profileId), novo]));
      setUsingDemo(false);
      setLinkInput('');
      addToast('Perfil autorizado adicionado à visão consolidada (anonimizado).', 'success');
    } catch {
      addToast('Erro ao carregar perfil compartilhado.', 'error');
    } finally {
      setImporting(false);
    }
  };

  const gapsFrequentes = useMemo(() => {
    const map = new Map<string, { skill: string; count: number; gapMedio: number; totalGap: number }>();
    for (const m of members) {
      for (const h of m.hardSkills) {
        const gap = Math.max(0, h.nivelDesejado - h.nivelAtual);
        if (gap <= 0) continue;
        const cur = map.get(h.skill) ?? { skill: h.skill, count: 0, gapMedio: 0, totalGap: 0 };
        cur.count += 1;
        cur.totalGap += gap;
        cur.gapMedio = Math.round((cur.totalGap / cur.count) * 10) / 10;
        map.set(h.skill, cur);
      }
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count || b.gapMedio - a.gapMedio);
  }, [members]);

  const comparacaoAreas = useMemo(() => {
    const map = new Map<string, { area: string; membros: number; ciclos: number; acoesConcluidas: number }>();
    for (const m of members) {
      const cur = map.get(m.area) ?? { area: m.area, membros: 0, ciclos: 0, acoesConcluidas: 0 };
      cur.membros += 1;
      cur.ciclos += m.ciclosCount;
      cur.acoesConcluidas += m.acoesConcluidasCount;
      map.set(m.area, cur);
    }
    return Array.from(map.values());
  }, [members]);

  const handleExportAnon = () => {
    const payload = {
      exportadoEm: new Date().toISOString(),
      avisoPrivacidade: 'Exportação 100% anonimizada. Nomes e e-mails foram omitidos.',
      equipeResumo: members.map(({ codigoAnonimo, area, nivel, objetivosCount, acoesConcluidasCount, ciclosCount, visibilidade, consentimentoData }) => ({
        codigoAnonimo, area, nivel, objetivosCount, acoesConcluidasCount, ciclosCount, visibilidade, consentimentoData,
      })),
      gapsFrequentes,
      comparacaoAreas,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MeuPDI_RH_Anonimizado_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Relatório anonimizado exportado!', 'success');
  };

  const addOneOnOne = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteForm.pauta.trim()) return;
    const next = [{ id: Date.now().toString(), ...noteForm }, ...notes];
    setNotes(next);
    localStorage.setItem(STORAGE_1ON1, JSON.stringify(next));
    setNoteForm(f => ({ ...f, pauta: '', acordos: '' }));
    addToast('Registro de 1:1 salvo.', 'success');
  };

  const addSucessao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sucForm.posicaoCritica.trim()) return;
    const next = [{ id: Date.now().toString(), ...sucForm }, ...sucessoes];
    setSucessoes(next);
    localStorage.setItem(STORAGE_SUCCESSION, JSON.stringify(next));
    setSucForm(f => ({ ...f, posicaoCritica: '', focoDesenvolvimento: '' }));
    addToast('Plano de sucessão registrado.', 'success');
  };

  return (
    <div className="pb-24 lg:pb-0 space-y-6 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#51266E]" /> Modo RH & Liderança
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Visão consolidada por equipe, gaps recorrentes, ciclos, 1:1s e sucessão com privacidade controlada pelo profissional.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExportAnon}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#017AA1] hover:bg-[#016384] text-white text-xs font-bold shadow-sm"
        >
          <Download className="w-4 h-4" /> Exportar JSON Anonimizado
        </button>
      </motion.div>

      {usingDemo && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 p-4 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong>Cenário ilustrativo carregado:</strong> cole abaixo os links compartilhados com permissão <em>&quot;Compartilhado com RH&quot;</em> ou <em>&quot;Gestor&quot;</em> para substituir pelos dados reais autorizados da sua equipe.
          </div>
        </div>
      )}

      {/* Importação com consentimento */}
      <form onSubmit={handleImportProfileLink} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 flex-1">
          <Link2 className="w-4 h-4 text-[#017AA1] shrink-0" />
          <input
            type="text"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            placeholder="Cole o link /p/ID autorizado pelo colaborador para consolidar..."
            className="w-full text-sm bg-transparent focus:outline-none text-slate-800 dark:text-slate-100"
          />
        </div>
        <button
          type="submit"
          disabled={importing}
          className="px-4 py-2 rounded-xl bg-[#51266E] text-white text-xs font-bold hover:opacity-90 disabled:opacity-60 shrink-0"
        >
          {importing ? 'Validando...' : 'Adicionar à Equipe'}
        </button>
      </form>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
          <p className="text-[11px] font-bold uppercase text-slate-400">Profissionais na visão</p>
          <p className="text-2xl font-black text-[#51266E] mt-1">{members.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
          <p className="text-[11px] font-bold uppercase text-slate-400">Ciclos fechados (total)</p>
          <p className="text-2xl font-black text-[#017AA1] mt-1">{members.reduce((a, m) => a + m.ciclosCount, 0)}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
          <p className="text-[11px] font-bold uppercase text-slate-400">Ações concluídas</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{members.reduce((a, m) => a + m.acoesConcluidasCount, 0)}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
          <p className="text-[11px] font-bold uppercase text-slate-400">Conversas 1:1</p>
          <p className="text-2xl font-black text-[#539CBD] mt-1">{notes.length}</p>
        </div>
      </div>

      {/* Gráficos: Gaps + Comparação entre áreas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#017AA1]" /> Gaps Mais Frequentes da Equipe
          </h2>
          {gapsFrequentes.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">Nenhum gap mapeado.</p>
          ) : (
            <div className="space-y-2.5">
              {gapsFrequentes.slice(0, 6).map(g => (
                <div key={g.skill} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/40">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{g.skill}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">{g.count} pessoa(s)</span>
                    <span className="font-bold px-2 py-0.5 rounded-full bg-[#51266E]/10 text-[#51266E]">
                      Gap médio: +{g.gapMedio}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-3">
            Comparação entre Áreas (Ações concluídas e ciclos)
          </h2>
          <ResponsiveContainer width="100%" height={220} minWidth={0} minHeight={1}>
            <BarChart data={comparacaoAreas}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="area" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="acoesConcluidas" name="Ações concluídas" fill="#017AA1" radius={[6, 6, 0, 0]} />
              <Bar dataKey="ciclos" name="Ciclos" fill="#51266E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Registro de 1:1 e Sucessão */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#017AA1]" /> Registro de Conversas 1:1
          </h2>
          <form onSubmit={addOneOnOne} className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <select
                value={noteForm.codigoMembro}
                onChange={(e) => setNoteForm(f => ({ ...f, codigoMembro: e.target.value }))}
                className="rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2"
              >
                {members.map(m => (
                  <option key={m.id} value={m.codigoAnonimo}>{m.codigoAnonimo} ({m.area})</option>
                ))}
              </select>
              <input
                type="date"
                value={noteForm.data}
                onChange={(e) => setNoteForm(f => ({ ...f, data: e.target.value }))}
                className="rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2"
              />
            </div>
            <input
              type="text"
              placeholder="Pauta principal do 1:1"
              value={noteForm.pauta}
              onChange={(e) => setNoteForm(f => ({ ...f, pauta: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2"
            />
            <input
              type="text"
              placeholder="Acordos e próximos passos"
              value={noteForm.acordos}
              onChange={(e) => setNoteForm(f => ({ ...f, acordos: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2"
            />
            <button type="submit" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#017AA1] text-white font-bold">
              <Plus className="w-3.5 h-3.5" /> Registrar 1:1
            </button>
          </form>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {notes.map(n => (
              <div key={n.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700 text-xs flex justify-between gap-2">
                <div>
                  <span className="font-bold text-[#51266E]">{n.codigoMembro} · {n.data}</span>
                  <p className="font-medium text-slate-700 dark:text-slate-200 mt-0.5">{n.pauta}</p>
                  {n.acordos && <p className="text-slate-500 mt-0.5">Acordos: {n.acordos}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const next = notes.filter(x => x.id !== n.id);
                    setNotes(next);
                    localStorage.setItem(STORAGE_1ON1, JSON.stringify(next));
                  }}
                  className="text-slate-400 hover:text-rose-600 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-[#51266E]" /> Planos de Sucessão
          </h2>
          <form onSubmit={addSucessao} className="space-y-2 text-xs">
            <input
              type="text"
              placeholder="Posição crítica (ex: Tech Lead, Gerente de Operações)"
              value={sucForm.posicaoCritica}
              onChange={(e) => setSucForm(f => ({ ...f, posicaoCritica: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2"
            />
            <div className="grid grid-cols-2 gap-2">
              <select
                value={sucForm.sucessorCodigo}
                onChange={(e) => setSucForm(f => ({ ...f, sucessorCodigo: e.target.value }))}
                className="rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2"
              >
                {members.map(m => (
                  <option key={m.id} value={m.codigoAnonimo}>{m.codigoAnonimo}</option>
                ))}
              </select>
              <select
                value={sucForm.prontidao}
                onChange={(e) => setSucForm(f => ({ ...f, prontidao: e.target.value as SuccessionPlan['prontidao'] }))}
                className="rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2"
              >
                <option value="Pronto agora">Pronto agora</option>
                <option value="6-12 meses">6-12 meses</option>
                <option value="12+ meses">12+ meses</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Foco de desenvolvimento para sucessão"
              value={sucForm.focoDesenvolvimento}
              onChange={(e) => setSucForm(f => ({ ...f, focoDesenvolvimento: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2"
            />
            <button type="submit" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#51266E] text-white font-bold">
              <Plus className="w-3.5 h-3.5" /> Salvar Sucessão
            </button>
          </form>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {sucessoes.map(s => (
              <div key={s.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700 text-xs flex justify-between gap-2">
                <div>
                  <span className="font-bold text-[#017AA1]">{s.posicaoCritica}</span> · Sucessor: <strong>{s.sucessorCodigo}</strong> ({s.prontidao})
                  {s.focoDesenvolvimento && <p className="text-slate-500 mt-0.5">{s.focoDesenvolvimento}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const next = sucessoes.filter(x => x.id !== s.id);
                    setSucessoes(next);
                    localStorage.setItem(STORAGE_SUCCESSION, JSON.stringify(next));
                  }}
                  className="text-slate-400 hover:text-rose-600 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Histórico de Consentimento e Controle de Permissões */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
        <h2 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Controle de Permissões & Histórico de Consentimento
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 uppercase">
                <th className="py-2 pr-4">Código Anônimo</th>
                <th className="py-2 pr-4">Área / Nível</th>
                <th className="py-2 pr-4">Permissão Concedida</th>
                <th className="py-2">Último Consentimento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {members.map(m => (
                <tr key={m.id}>
                  <td className="py-2.5 pr-4 font-bold text-slate-700 dark:text-slate-200">{m.codigoAnonimo}</td>
                  <td className="py-2.5 pr-4 text-slate-600 dark:text-slate-300">{m.area} · {m.nivel}</td>
                  <td className="py-2.5 pr-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> {m.visibilidade}
                    </span>
                  </td>
                  <td className="py-2.5 text-slate-500">{m.consentimentoData}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
