import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type HardSkill = {
  skill: string;
  nivelAtual: number;
  nivelDesejado: number;
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

export type PlanoAcaoItem = {
  id: string;
  objetivoId: string;
  acao: string;
  prazoData: string;
  recursos: string;
};

export type PlanoStatus = 'pendente' | 'em_andamento' | 'concluido';

export type DiarioEntry = {
  id: string;
  data: string;       // ISO string
  objetivoId?: string;
  texto: string;
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
  trilhaProgresso: Record<string, boolean>;
  diario: DiarioEntry[];
  isDarkMode: boolean;

  // Ações wizard
  setStepAtual: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateUsuario: (dados: Partial<PdiFields['usuario']>) => void;
  updateCampoDeForcas: (dados: Partial<PdiFields['campoDeForcas']>) => void;
  setStoreItem: <K extends keyof PdiFields>(key: K, value: PdiFields[K]) => void;

  // Ações ciclo
  salvarCiclo: (retro?: RetrospectivaData) => void;
  resetAtual: () => void;
  setWizardConcluido: (v: boolean) => void;

  // Ações plano de ação
  setPlanoItemStatus: (id: string, status: PlanoStatus) => void;

  // Ações trilha
  toggleTrilhaItem: (key: string) => void;

  // Ações diário
  addDiarioEntry: (entry: Omit<DiarioEntry, 'id'>) => void;
  removeDiarioEntry: (id: string) => void;

  // Dark mode
  setIsDarkMode: (v: boolean) => void;
}

const initialState: PdiFields = {
  stepAtual: 1,
  usuario: { nome: '', email: '', causa: '', areaAtuacao: '', nivelCarreira: '' },
  inventario: { hardSkills: [], softSkills: [] },
  objetivos: [],
  planoDeAcao: [],
  campoDeForcas: { impulsionadoras: [], restritivas: [], aliancas: '' },
};

/** Calcula health score dado o estado atual — mesma lógica do Dashboard e Passo6 */
function computeScore(state: PdiFields): number {
  if (state.objetivos.length === 0) return 0;
  let score = 100;
  const objetivosComAcao = new Set(state.planoDeAcao.map(p => p.objetivoId));
  score -= (state.objetivos.length - objetivosComAcao.size) * 20;
  score -= state.planoDeAcao.filter(a => !a.recursos?.trim()).length * 10;
  if ((state.campoDeForcas.restritivas ?? []).length === 0) score -= 15;
  if ((state.campoDeForcas.aliancas ?? '').trim().length < 10) score -= 10;
  return Math.max(0, Math.min(100, score));
}

export const usePdiStore = create<PdiState>()(
  persist(
    (set, get) => ({
      ...initialState,
      historico: [],
      wizardConcluido: false,
      planoAcaoStatus: {},
      trilhaProgresso: {},
      diario: [],
      isDarkMode: false,

      setStepAtual: (step) => set({ stepAtual: step }),
      nextStep: () => set((state) => ({ stepAtual: Math.min(state.stepAtual + 1, 6) })),
      prevStep: () => set((state) => ({ stepAtual: Math.max(state.stepAtual - 1, 1) })),
      updateUsuario: (dados) => set((state) => ({ usuario: { ...state.usuario, ...dados } })),
      updateCampoDeForcas: (dados) =>
        set((state) => ({ campoDeForcas: { ...state.campoDeForcas, ...dados } })),
      setStoreItem: (key, value) => set({ [key]: value }),

      setWizardConcluido: (v) => set({ wizardConcluido: v }),

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
          trilhaProgresso: {},
          // diario é mantido entre ciclos — o usuário não perde o histórico pessoal
        }),

      setPlanoItemStatus: (id, status) =>
        set((state) => ({
          planoAcaoStatus: { ...state.planoAcaoStatus, [id]: status },
        })),

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

      removeDiarioEntry: (id) =>
        set((state) => ({
          diario: state.diario.filter(e => e.id !== id),
        })),

      setIsDarkMode: (v) => set({ isDarkMode: v }),
    }),
    {
      name: 'pdi-storage',
    }
  )
);
