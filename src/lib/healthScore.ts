import type { PdiFields } from '../store/usePdiStore';

export interface HealthScoreResult {
  score: number;
  penalidades: { label: string; pts: number }[];
}

/** Fonte única da verdade para o cálculo de saúde do PDI. */
export function computeHealthScore(
  state: Pick<PdiFields, 'objetivos' | 'planoDeAcao' | 'campoDeForcas'>
): HealthScoreResult {
  if (state.objetivos.length === 0) return { score: 0, penalidades: [] };

  let score = 100;
  const penalidades: { label: string; pts: number }[] = [];

  const objetivosComAcao = new Set(state.planoDeAcao.map(p => p.objetivoId));
  const semAcao = state.objetivos.length - objetivosComAcao.size;
  if (semAcao > 0) {
    const pts = semAcao * 20;
    score -= pts;
    penalidades.push({ label: `${semAcao} objetivo(s) sem ação vinculada`, pts });
  }

  const semRecurso = state.planoDeAcao.filter(a => !a.recursos?.trim()).length;
  if (semRecurso > 0) {
    const pts = semRecurso * 10;
    score -= pts;
    penalidades.push({ label: `${semRecurso} ação(ões) sem recurso definido`, pts });
  }

  if ((state.campoDeForcas.restritivas ?? []).length === 0) {
    score -= 15;
    penalidades.push({ label: 'Nenhuma força restritiva mapeada (Passo 5)', pts: 15 });
  }

  if ((state.campoDeForcas.aliancas ?? '').trim().length < 10) {
    score -= 10;
    penalidades.push({ label: 'Alianças não descritas (Passo 5)', pts: 10 });
  }

  return { score: Math.max(0, Math.min(100, score)), penalidades };
}
