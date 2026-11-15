import type { Objetivo, PlanoAcaoItem } from '../store/usePdiStore';

const STOPWORDS = new Set([
  'a', 'o', 'e', 'de', 'da', 'do', 'das', 'dos', 'em', 'no', 'na', 'nos', 'nas',
  'para', 'por', 'com', 'sem', 'um', 'uma', 'uns', 'umas', 'ao', 'aos', 'que',
  'como', 'mais', 'seu', 'sua', 'seus', 'suas', 'sobre', 'entre', 'ate', 'até',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 2 && !STOPWORDS.has(t));
}

export type VinculoSugerido = {
  acaoId: string;
  acaoTexto: string;
  objetivoAtualId: string;
  objetivoSugeridoId: string;
  objetivoSugeridoDesc: string;
};

export function sugerirObjetivoParaAcao(
  acao: PlanoAcaoItem,
  objetivos: Objetivo[]
): { objetivoId: string; score: number } | null {
  if (objetivos.length === 0) return null;
  const acaoTokens = new Set(tokenize(`${acao.acao} ${acao.resultadoEsperado ?? ''} ${acao.recursos ?? ''}`));
  if (acaoTokens.size === 0) return null;

  let bestId = objetivos[0].id;
  let bestScore = -1;

  for (const obj of objetivos) {
    const objTokens = tokenize(`${obj.descricao} ${obj.justificativa ?? ''}`);
    let score = 0;
    for (const t of objTokens) {
      if (acaoTokens.has(t)) score += t.length >= 4 ? 2 : 1;
    }
    if (score > bestScore) {
      bestScore = score;
      bestId = obj.id;
    }
  }

  return bestScore > 0 ? { objetivoId: bestId, score: bestScore } : null;
}

export function encontrarVinculosSugeridos(
  objetivos: Objetivo[],
  planoDeAcao: PlanoAcaoItem[]
): VinculoSugerido[] {
  if (objetivos.length < 2 || planoDeAcao.length === 0) return [];
  const validIds = new Set(objetivos.map(o => o.id));
  const semAcaoIds = new Set(
    objetivos
      .filter(o => !planoDeAcao.some(a => a.objetivoId === o.id))
      .map(o => o.id)
  );

  const sugestoes: VinculoSugerido[] = [];

  for (const acao of planoDeAcao) {
    const isOrfa = !validIds.has(acao.objetivoId);
    const match = sugerirObjetivoParaAcao(acao, objetivos);
    if (!match) continue;

    // Sugere troca se a ação é órfã OU se o melhor match é um objetivo que está sem nenhuma ação
    if (isOrfa || (match.objetivoId !== acao.objetivoId && semAcaoIds.has(match.objetivoId))) {
      const objSug = objetivos.find(o => o.id === match.objetivoId);
      if (objSug) {
        sugestoes.push({
          acaoId: acao.id,
          acaoTexto: acao.acao,
          objetivoAtualId: acao.objetivoId,
          objetivoSugeridoId: objSug.id,
          objetivoSugeridoDesc: objSug.descricao,
        });
      }
    }
  }

  return sugestoes;
}
