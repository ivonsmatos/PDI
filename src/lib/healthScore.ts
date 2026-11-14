import type { PdiFields, PlanoStatus } from '../store/usePdiStore';

export interface HealthScoreResult {
  score: number;
  penalidades: { label: string; pts: number }[];
  positivos: string[];
}

export interface PdiMetricas {
  completudePct: number;
  etapasPreenchidas: number;
  totalEtapas: number;
  execucaoPct: number;
  acoesConcluidas: number;
  totalAcoes: number;
  acoesVencidas: number;
  saude: HealthScoreResult;
}

/**
 * Fonte única da verdade para o cálculo de saúde estrutural do plano.
 * Mede equilíbrio entre objetivos, ações, recursos e campo de forças —
 * não mede progresso concluído nem nível profissional.
 */
export function computeHealthScore(
  state: Pick<PdiFields, 'objetivos' | 'planoDeAcao' | 'campoDeForcas'>
): HealthScoreResult {
  if (state.objetivos.length === 0) {
    return { score: 0, penalidades: [{ label: 'Nenhum objetivo definido ainda', pts: 100 }], positivos: [] };
  }

  let score = 100;
  const penalidades: { label: string; pts: number }[] = [];
  const positivos: string[] = [];

  const objetivosComAcao = new Set(state.planoDeAcao.map(p => p.objetivoId));
  const semAcao = state.objetivos.length - objetivosComAcao.size;
  if (semAcao > 0) {
    const pts = semAcao * 20;
    score -= pts;
    penalidades.push({ label: `${semAcao} objetivo(s) sem ação vinculada`, pts });
  } else {
    positivos.push('Todos os objetivos têm ações vinculadas');
  }

  const semRecurso = state.planoDeAcao.filter(a => !a.recursos?.trim()).length;
  if (semRecurso > 0) {
    const pts = semRecurso * 10;
    score -= pts;
    penalidades.push({ label: `${semRecurso} ação(ões) sem recurso definido`, pts });
  } else if (state.planoDeAcao.length > 0) {
    positivos.push('Todas as ações têm recursos definidos');
  }

  if ((state.campoDeForcas.restritivas ?? []).length === 0) {
    score -= 15;
    penalidades.push({ label: 'Nenhuma força restritiva mapeada (Passo 5)', pts: 15 });
  } else {
    positivos.push('Forças restritivas mapeadas');
  }

  if ((state.campoDeForcas.aliancas ?? '').trim().length < 10) {
    score -= 10;
    penalidades.push({ label: 'Alianças não descritas (Passo 5)', pts: 10 });
  } else {
    positivos.push('Rede de alianças descrita');
  }

  return { score: Math.max(0, Math.min(100, score)), penalidades, positivos };
}

/** Calcula métricas separadas: Completude do PDI, Execução, Saúde do plano e Risco. */
export function computeMetricas(
  state: Pick<PdiFields, 'usuario' | 'inventario' | 'objetivos' | 'planoDeAcao' | 'campoDeForcas'>,
  planoAcaoStatus: Record<string, PlanoStatus>,
): PdiMetricas {
  const etapas = [
    Boolean(state.usuario.nome?.trim() && state.usuario.areaAtuacao && state.usuario.nivelCarreira),
    state.inventario.hardSkills.length > 0,
    state.inventario.softSkills.length > 0,
    state.objetivos.length > 0,
    state.planoDeAcao.length > 0,
    (state.campoDeForcas.restritivas?.length ?? 0) > 0 || (state.campoDeForcas.aliancas?.trim().length ?? 0) >= 10,
  ];
  const etapasPreenchidas = etapas.filter(Boolean).length;
  const totalEtapas = etapas.length;
  const completudePct = Math.round((etapasPreenchidas / totalEtapas) * 100);

  const totalAcoes = state.planoDeAcao.length;
  const acoesConcluidas = state.planoDeAcao.filter(a => planoAcaoStatus[a.id] === 'concluido').length;
  const execucaoPct = totalAcoes > 0 ? Math.round((acoesConcluidas / totalAcoes) * 100) : 0;

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const acoesVencidas = state.planoDeAcao.filter(a =>
    planoAcaoStatus[a.id] !== 'concluido' &&
    Boolean(a.prazoData) &&
    new Date(a.prazoData) < hoje
  ).length;

  return {
    completudePct,
    etapasPreenchidas,
    totalEtapas,
    execucaoPct,
    acoesConcluidas,
    totalAcoes,
    acoesVencidas,
    saude: computeHealthScore(state),
  };
}
