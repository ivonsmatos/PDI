import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CompetenciaEvidencia = {
  id: string;
  situacao: string;
  acao: string;
  resultado: string;
  indicador?: string;
  link?: string;
  data?: string;
  validadoPor?: string;
};

export type HardSkill = {
  skill: string;
  nivelAtual: number;
  nivelDesejado: number;
  evidencias?: CompetenciaEvidencia[];
};

export type SoftSkill = {
  atributo: string;
  pontoForteOuMelhoria: 'Forte' | 'Melhoria' | '';
  exemplo: string;
};

export type ObjetivoCategoria = 'educacional' | 'funcional' | 'pessoal' | '';

export type Objetivo = {
  id: string;
  descricao: string;
  prazo: 'curto' | 'medio' | 'longo' | '';
  justificativa: string;
  categoria: ObjetivoCategoria;
};

export type TipoMetaAcao = 'atividade' | 'entrega' | 'resultado' | 'evidencia';

export type PlanoAcaoItem = {
  id: string;
  objetivoId: string;
  acao: string;
  prazoData: string;
  recursos: string;
  tipoMeta?: TipoMetaAcao;
  evidenciaUrl?: string;
  resultadoEsperado?: string;
  notas?: string;
};

export type PlanoStatus = 'pendente' | 'em_andamento' | 'concluido' | 'bloqueado';

export type PlanoStatusHistorico = {
  status: PlanoStatus;
  data: string; // ISO string
};

export type DiarioEntry = {
  id: string;
  data: string;       // ISO string
  objetivoId?: string;
  texto: string;
  tags?: string[];
};

export type RetrospectivaData = {
  funcionou: string;
  naoFuncionou: string;
  aprendizagem: string;
  nota: number; // 1-5
};

export interface PdiFields {
  stepAtual: number;
  usuario: {
    nome: string;
    email: string;
    causa: string;
    areaAtuacao: string;   // chave de matrizDeCompetencias, ex: 'tecnologia'
    nivelCarreira: string; // 'estagiario' | 'junior' | 'pleno' | 'senior' | 'especialista' | 'gestor'
    areasComplementares?: string[];
    areaPersonalizada?: string;
    tipoMatriz?: 'generica' | 'especifica';
    especialidade?: string;
    objetivoCarreira?: string;
    competenciasContexto?: string[];
    areaSugeridaPlataforma?: string;
  };
  inventario: {
    hardSkills: HardSkill[];
    softSkills: SoftSkill[];
  };
  objetivos: Objetivo[];
  planoDeAcao: PlanoAcaoItem[];
  campoDeForcas: {
    impulsionadoras: string[];
    restritivas: string[];
    aliancas: string;
  };
}

export interface PdiCiclo extends Omit<PdiFields, 'stepAtual'> {
  dataSalvamento: string;
  idCiclo: string;
  scoreSaude?: number;
  retrospectiva?: RetrospectivaData;
}

export interface PdiState extends PdiFields {
  historico: PdiCiclo[];
  wizardConcluido: boolean;
  planoAcaoStatus: Record<string, PlanoStatus>;
  planoAcaoHistorico: Record<string, PlanoStatusHistorico[]>;
  trilhaProgresso: Record<string, boolean>;
  diario: DiarioEntry[];
  isDarkMode: boolean;
  notificacoesAtivas: boolean;
  uidProprietario: string | null;
  publicProfileId: string | null;

  // Ações wizard
  setStepAtual: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateUsuario: (dados: Partial<PdiFields['usuario']>) => void;
  updateCampoDeForcas: (dados: Partial<PdiFields['campoDeForcas']>) => void;
  setStoreItem: <K extends keyof PdiFields>(key: K, value: PdiFields[K]) => void;

  // Ações ciclo e limpeza
  salvarCiclo: (retro?: RetrospectivaData) => void;
  resetAtual: () => void;
  limparTudo: () => void;
  setWizardConcluido: (v: boolean) => void;
  setUidProprietario: (uid: string | null) => void;
  setPublicProfileId: (id: string | null) => void;

  // Ações plano de ação
  setPlanoItemStatus: (id: string, status: PlanoStatus) => void;
  updatePlanoAcaoItem: (id: string, dados: Partial<PlanoAcaoItem>) => void;
  removePlanoAcaoItem: (id: string) => void;

  // Ações trilha
  toggleTrilhaItem: (key: string) => void;

  // Ações diário
  addDiarioEntry: (entry: Omit<DiarioEntry, 'id'>) => void;
  updateDiarioEntry: (id: string, dados: Partial<Omit<DiarioEntry, 'id'>>) => void;
  removeDiarioEntry: (id: string) => void;
  restoreDiarioEntry: (entry: DiarioEntry) => void;

  // Preferências
  setIsDarkMode: (v: boolean) => void;
  setNotificacoesAtivas: (v: boolean) => void;

  // Histórico (não é keyof PdiFields - precisa de método dedicado)
  setHistorico: (ciclos: PdiCiclo[]) => void;

  // Gamificação
  conquistasVistas: string[];
  marcarConquistaVista: (id: string) => void;

  // Métricas de saúde do produto
  wizardIniciadoEm?: string | null;
  primeiroPdiCriadoEm?: string | null;
  exportacoesPdf?: number;
  usoComparador?: number;
  usoPerfilPublico?: number;
  marcarWizardIniciado: () => void;
  incrementMetric: (key: 'exportacoesPdf' | 'usoComparador' | 'usoPerfilPublico') => void;
}

const initialState: PdiFields = {
  stepAtual: 1,
  usuario: { nome: '', email: '', causa: '', areaAtuacao: '', nivelCarreira: '' },
  inventario: { hardSkills: [], softSkills: [] },
  objetivos: [],
  planoDeAcao: [],
  campoDeForcas: { impulsionadoras: [], restritivas: [], aliancas: '' },
};

/** Calcula health score dado o estado atual - mesma lógica do Dashboard e Passo6 */
function computeScore(state: PdiFields): number {
  if (state.objetivos.length === 0) return 0;
  let score = 100;
  const validObjIds = new Set(state.objetivos.map(o => o.id));
  const objetivosComAcao = new Set(
    state.planoDeAcao.map(p => p.objetivoId).filter(id => validObjIds.has(id))
  );
  score -= (state.objetivos.length - objetivosComAcao.size) * 20;
  score -= state.planoDeAcao.filter(p => !validObjIds.has(p.objetivoId)).length * 15;
  score -= state.planoDeAcao.filter(a => !a.recursos?.trim()).length * 10;
  if ((state.campoDeForcas.restritivas ?? []).length === 0) score -= 15;
  if ((state.campoDeForcas.aliancas ?? '').trim().length < 10) score -= 10;
  return Math.max(0, Math.min(100, score));
}

// No primeiro acesso, segue a preferência do sistema; depois o persist mantém a escolha do usuário
const prefersDark =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

export const usePdiStore = create<PdiState>()(
  persist(
    (set, get) => ({
      ...initialState,
      historico: [],
      wizardConcluido: false,
      planoAcaoStatus: {},
      planoAcaoHistorico: {},
      trilhaProgresso: {},
      diario: [],
      isDarkMode: prefersDark,
      notificacoesAtivas: false,
      uidProprietario: null,
      publicProfileId: null,
      conquistasVistas: [],
      wizardIniciadoEm: null,
      primeiroPdiCriadoEm: null,
      exportacoesPdf: 0,
      usoComparador: 0,
      usoPerfilPublico: 0,

      setStepAtual: (step) => set({ stepAtual: step }),
      nextStep: () => set((state) => ({ stepAtual: Math.min(state.stepAtual + 1, 6) })),
      prevStep: () => set((state) => ({ stepAtual: Math.max(state.stepAtual - 1, 1) })),
      updateUsuario: (dados) => set((state) => ({ usuario: { ...state.usuario, ...dados } })),
      updateCampoDeForcas: (dados) =>
        set((state) => ({ campoDeForcas: { ...state.campoDeForcas, ...dados } })),
      setStoreItem: (key, value) => set({ [key]: value }),

      setWizardConcluido: (v) =>
        set((state) => ({
          wizardConcluido: v,
          primeiroPdiCriadoEm: v && !state.primeiroPdiCriadoEm ? new Date().toISOString() : state.primeiroPdiCriadoEm,
        })),

      marcarWizardIniciado: () =>
        set((state) => ({
          wizardIniciadoEm: state.wizardIniciadoEm ?? new Date().toISOString(),
        })),

      incrementMetric: (key) =>
        set((state) => ({
          [key]: (state[key] ?? 0) + 1,
        })),

      salvarCiclo: (retro) => {
        const state = get();
        const novoCiclo: PdiCiclo = {
          idCiclo: Date.now().toString(),
          dataSalvamento: new Date().toISOString(),
          usuario: state.usuario,
          inventario: state.inventario,
          objetivos: state.objetivos,
          planoDeAcao: state.planoDeAcao,
          campoDeForcas: state.campoDeForcas,
          scoreSaude: computeScore(state),
          retrospectiva: retro,
        };
        set({ historico: [...state.historico, novoCiclo] });
      },

      resetAtual: () =>
        set({
          ...initialState,
          stepAtual: 1,
          wizardConcluido: false,
          planoAcaoStatus: {},
          planoAcaoHistorico: {},
          trilhaProgresso: {},
          // diario é mantido entre ciclos - o usuário não perde o histórico pessoal
        }),

      limparTudo: () => {
        set({
          ...initialState,
          historico: [],
          wizardConcluido: false,
          planoAcaoStatus: {},
          planoAcaoHistorico: {},
          trilhaProgresso: {},
          diario: [],
          conquistasVistas: [],
          notificacoesAtivas: false,
          uidProprietario: null,
          publicProfileId: null,
        });
        if (typeof window !== 'undefined') {
          try {
            localStorage.removeItem('pdi-storage');
            localStorage.removeItem('pdi-notif-last-check');
            Object.keys(localStorage).forEach(k => {
              if (k.startsWith('pdi-checkin-') || k.startsWith('pdi-onboarding')) {
                localStorage.removeItem(k);
              }
            });
          } catch {
            // ignora erro de acesso ao localStorage
          }
        }
      },

      setUidProprietario: (uid) => set({ uidProprietario: uid }),
      setPublicProfileId: (id) => set({ publicProfileId: id }),

      setPlanoItemStatus: (id, status) =>
        set((state) => ({
          planoAcaoStatus: { ...state.planoAcaoStatus, [id]: status },
          planoAcaoHistorico: {
            ...state.planoAcaoHistorico,
            [id]: [
              ...(state.planoAcaoHistorico[id] ?? []),
              { status, data: new Date().toISOString() },
            ].slice(-20),
          },
        })),

      updatePlanoAcaoItem: (id, dados) =>
        set((state) => ({
          planoDeAcao: state.planoDeAcao.map(a => (a.id === id ? { ...a, ...dados } : a)),
        })),

      removePlanoAcaoItem: (id) =>
        set((state) => {
          const nextStatus = { ...state.planoAcaoStatus };
          delete nextStatus[id];
          return {
            planoDeAcao: state.planoDeAcao.filter(a => a.id !== id),
            planoAcaoStatus: nextStatus,
          };
        }),

      toggleTrilhaItem: (key) =>
        set((state) => ({
          trilhaProgresso: {
            ...state.trilhaProgresso,
            [key]: !state.trilhaProgresso[key],
          },
        })),

      addDiarioEntry: (entry) =>
        set((state) => ({
          diario: [
            { ...entry, id: Date.now().toString() },
            ...state.diario,
          ],
        })),

      updateDiarioEntry: (id, dados) =>
        set((state) => ({
          diario: state.diario.map(e => (e.id === id ? { ...e, ...dados } : e)),
        })),

      removeDiarioEntry: (id) =>
        set((state) => ({
          diario: state.diario.filter(e => e.id !== id),
        })),

      restoreDiarioEntry: (entry) =>
        set((state) => ({
          diario: [entry, ...state.diario.filter(e => e.id !== entry.id)]
            .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()),
        })),

      setIsDarkMode: (v) => set({ isDarkMode: v }),

      setNotificacoesAtivas: (v) => set({ notificacoesAtivas: v }),

      setHistorico: (ciclos) => set({ historico: ciclos }),

      marcarConquistaVista: (id) =>
        set((state) => ({
          conquistasVistas: state.conquistasVistas.includes(id)
            ? state.conquistasVistas
            : [...state.conquistasVistas, id],
        })),
    }),
    {
      name: 'pdi-storage',
    }
  )
);
