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

export interface PdiFields {
  stepAtual: number;
  usuario: {
    nome: string;
    email: string;
    causa: string;
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
}

export interface PdiState extends PdiFields {
  historico: PdiCiclo[];
  wizardConcluido: boolean;
  planoAcaoStatus: Record<string, PlanoStatus>;
  trilhaProgresso: Record<string, boolean>;

  // Ações wizard
  setStepAtual: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateUsuario: (dados: Partial<PdiFields['usuario']>) => void;
  updateCampoDeForcas: (dados: Partial<PdiFields['campoDeForcas']>) => void;
  setStoreItem: <K extends keyof PdiFields>(key: K, value: PdiFields[K]) => void;

  // Ações ciclo
  salvarCiclo: () => void;
  resetAtual: () => void;
  setWizardConcluido: (v: boolean) => void;

  // Ações plano de ação
  setPlanoItemStatus: (id: string, status: PlanoStatus) => void;

  // Ações trilha
  toggleTrilhaItem: (key: string) => void;
}

const initialState: PdiFields = {
  stepAtual: 1,
  usuario: { nome: '', email: '', causa: '' },
  inventario: { hardSkills: [], softSkills: [] },
  objetivos: [],
  planoDeAcao: [],
  campoDeForcas: { impulsionadoras: [], restritivas: [], aliancas: '' },
};

export const usePdiStore = create<PdiState>()(
  persist(
    (set, get) => ({
      ...initialState,
      historico: [],
      wizardConcluido: false,
      planoAcaoStatus: {},
      trilhaProgresso: {},

      setStepAtual: (step) => set({ stepAtual: step }),
      nextStep: () => set((state) => ({ stepAtual: Math.min(state.stepAtual + 1, 6) })),
      prevStep: () => set((state) => ({ stepAtual: Math.max(state.stepAtual - 1, 1) })),
      updateUsuario: (dados) => set((state) => ({ usuario: { ...state.usuario, ...dados } })),
      updateCampoDeForcas: (dados) =>
        set((state) => ({ campoDeForcas: { ...state.campoDeForcas, ...dados } })),
      setStoreItem: (key, value) => set({ [key]: value }),

      setWizardConcluido: (v) => set({ wizardConcluido: v }),

      salvarCiclo: () => {
        const state = get();
        const novoCiclo: PdiCiclo = {
          idCiclo: Date.now().toString(),
          dataSalvamento: new Date().toISOString(),
          usuario: state.usuario,
          inventario: state.inventario,
          objetivos: state.objetivos,
          planoDeAcao: state.planoDeAcao,
          campoDeForcas: state.campoDeForcas,
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
    }),
    {
      name: 'pdi-storage',
    }
  )
);
