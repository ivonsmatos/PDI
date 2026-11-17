import { CLUSTER_P0_P2 } from './editorial/p0AndP2';
import { CLUSTER_SENIORIDADE } from './editorial/clusterSenioridade';
import { CLUSTER_COMPETENCIAS } from './editorial/clusterCompetencias';
import { CLUSTER_RH } from './editorial/clusterRh';
import { CLUSTER_RECURSOS } from './editorial/clusterRecursos';
import type { EditorialArticle, EditorialCluster } from './editorial/types';

export type { EditorialArticle, EditorialCluster };

const RAW_ARTICLES: Record<string, Omit<EditorialArticle, 'publishedAt' | 'updatedAt'>> = {
  // P0 (Fundamentos)
  'pdi-e-curriculo': CLUSTER_P0_P2['pdi-e-curriculo'],
  'hard-skills-e-soft-skills': CLUSTER_P0_P2['hard-skills-e-soft-skills'],

  // P1 - Senioridade (7 a 14)
  ...CLUSTER_SENIORIDADE,

  // P1 - Competências (15 a 24)
  ...CLUSTER_COMPETENCIAS,

  // P1 - RH (25 a 34)
  'pdi-ou-pdp': CLUSTER_P0_P2['pdi-ou-pdp'],
  ...CLUSTER_RH,

  // P1 - Recursos (35 a 40)
  ...CLUSTER_RECURSOS,

  // P2 - Marca, Bastidores e Templates (41, 42, 43, 44, 46, 47, 48)
  'por-que-criamos-o-meu-pdi': CLUSTER_P0_P2['por-que-criamos-o-meu-pdi'],
  'diario-de-construcao-meu-pdi': CLUSTER_P0_P2['diario-de-construcao-meu-pdi'],
  'estudo-de-caso-pdi-estruturado': CLUSTER_P0_P2['estudo-de-caso-pdi-estruturado'],
  'pdi-na-pratica-por-diferentes-areas': CLUSTER_P0_P2['pdi-na-pratica-por-diferentes-areas'],
  'roteiros-rapidos-meu-pdi': CLUSTER_P0_P2['roteiros-rapidos-meu-pdi'],
  'templates-pdi-1on1-feedback-onboarding': CLUSTER_P0_P2['templates-pdi-1on1-feedback-onboarding'],
  glossario: CLUSTER_P0_P2['glossario'],
};

/**
 * Gera datas retroativas estritamente 2x por semana (terças e sextas)
 * terminando em 2026-11-17 (terça-feira), em ordem cronológica dos artigos.
 */
function buildScheduleDates(count: number, endIso = '2026-11-17'): string[] {
  const dates: string[] = [];
  const cursor = new Date(`${endIso}T12:00:00Z`);
  while (dates.length < count) {
    const dow = cursor.getUTCDay(); // 2 = Tue, 5 = Fri
    if (dow === 2 || dow === 5) {
      dates.push(cursor.toISOString().slice(0, 10));
    }
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return dates.reverse();
}

const keys = Object.keys(RAW_ARTICLES);
const scheduleDates = buildScheduleDates(keys.length, '2026-11-17');

export const EDITORIAL_ARTICLES: Record<string, EditorialArticle> = Object.fromEntries(
  keys.map((key, idx) => [
    key,
    {
      ...RAW_ARTICLES[key],
      publishedAt: scheduleDates[idx],
      updatedAt: scheduleDates[idx],
    },
  ])
);

export const EDITORIAL_KEYS = keys;
