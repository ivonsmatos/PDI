import type { HardSkill, Objetivo, PlanoAcaoItem } from '../store/usePdiStore';

export type PdiReviewSeverity = 'error' | 'warning' | 'tip';

export type PdiReviewItem = {
  id: string;
  severity: PdiReviewSeverity;
  titulo: string;
  descricao: string;
  rotaSugerida?: string;
  passoSugerido?: number;
};

const GENERIC_PATTERNS = [
  /^melhorar$/i,
  /^crescer$/i,
  /^estudar$/i,
  /^aprender$/i,
  /^evoluir$/i,
  /^ser melhor$/i,
  /^fazer curso$/i,
];

export function revisarPdi(input: {
  objetivos: Objetivo[];
  planoDeAcao: PlanoAcaoItem[];
  hardSkills: HardSkill[];
}): PdiReviewItem[] {
  const { objetivos, planoDeAcao, hardSkills } = input;
  const items: PdiReviewItem[] = [];
  const hoje = new Date().toISOString().slice(0, 10);
  const objetivoIds = new Set(objetivos.map(o => o.id));

  // 9. Excesso de objetivos para o mesmo ciclo
  if (objetivos.length > 5) {
    items.push({
      id: 'excesso-objetivos',
      severity: 'warning',
      titulo: `Excesso de objetivos no ciclo (${objetivos.length})`,
      descricao: 'Mais de 5 objetivos simultâneos dilui o foco. Priorize de 2 a 4 objetivos de maior impacto.',
      passoSugerido: 3,
      rotaSugerida: '/wizard',
    });
  }

  // 1. Objetivo sem ação + 5. Objetivo genérico
  for (const obj of objetivos) {
    const acoesDoObj = planoDeAcao.filter(a => a.objetivoId === obj.id);
    if (acoesDoObj.length === 0) {
      items.push({
        id: `obj-sem-acao-${obj.id}`,
        severity: 'error',
        titulo: `Objetivo sem ação vinculada: "${obj.descricao.slice(0, 48)}${obj.descricao.length > 48 ? '...' : ''}"`,
        descricao: 'Todo objetivo precisa de pelo menos uma ação concreta no plano para sair do papel.',
        passoSugerido: 4,
        rotaSugerida: '/app/plano',
      });
    }

    const descTrim = obj.descricao.trim();
    if (descTrim.length < 15 || GENERIC_PATTERNS.some(rx => rx.test(descTrim))) {
      items.push({
        id: `obj-generico-${obj.id}`,
        severity: 'warning',
        titulo: `Objetivo genérico: "${descTrim}"`,
        descricao: 'Especifique o resultado esperado, o contexto ou o critério de sucesso para tornar a meta mensurável.',
        passoSugerido: 3,
        rotaSugerida: '/wizard',
      });
    }
  }

  // 2. Ação sem prazo, 3. Prazo vencido, 4. Recurso ausente, 8. Ação vinculada ao objetivo errado/inexistente
  for (const acao of planoDeAcao) {
    const label = acao.acao.slice(0, 44) + (acao.acao.length > 44 ? '...' : '');
    if (!acao.objetivoId || !objetivoIds.has(acao.objetivoId)) {
      items.push({
        id: `acao-orfa-${acao.id}`,
        severity: 'error',
        titulo: `Ação vinculada a objetivo inexistente: "${label}"`,
        descricao: 'Reassocie esta ação a um objetivo ativo do ciclo atual.',
        passoSugerido: 4,
        rotaSugerida: '/app/plano',
      });
    }

    if (!acao.prazoData) {
      items.push({
        id: `acao-sem-prazo-${acao.id}`,
        severity: 'warning',
        titulo: `Ação sem prazo definido: "${label}"`,
        descricao: 'Defina uma data-limite para viabilizar lembretes e acompanhamento semanal.',
        passoSugerido: 4,
        rotaSugerida: '/app/plano',
      });
    } else if (acao.prazoData < hoje) {
      items.push({
        id: `acao-vencida-${acao.id}`,
        severity: 'warning',
        titulo: `Prazo vencido (${acao.prazoData}): "${label}"`,
        descricao: 'Atualize a data ou conclua/replaneje esta ação antes de fechar o ciclo.',
        passoSugerido: 4,
        rotaSugerida: '/app/plano',
      });
    }

    if (!acao.recursos || !acao.recursos.trim()) {
      items.push({
        id: `acao-sem-recurso-${acao.id}`,
        severity: 'tip',
        titulo: `Recurso de apoio ausente: "${label}"`,
        descricao: 'Indique livro, curso, mentor ou documentação necessária para destravar a execução.',
        passoSugerido: 4,
        rotaSugerida: '/app/plano',
      });
    }
  }

  // 6. Competência sem evidência + 7. Meta incompatível com o nível atual
  for (const skill of hardSkills) {
    const evidenciasCount = skill.evidencias?.length ?? 0;
    if (skill.nivelAtual >= 4 && evidenciasCount === 0) {
      items.push({
        id: `skill-sem-evidencia-${skill.skill}`,
        severity: 'tip',
        titulo: `Competência alta sem evidência: "${skill.skill}" (${skill.nivelAtual}/5)`,
        descricao: 'Registre uma ficha de evidência (Situação, Ação, Resultado) para comprovar sua proficiência para RH e processos seletivos.',
        passoSugerido: 2,
        rotaSugerida: '/wizard',
      });
    }

    if (skill.nivelDesejado < skill.nivelAtual) {
      items.push({
        id: `meta-menor-${skill.skill}`,
        severity: 'error',
        titulo: `Nível-alvo menor que o atual em "${skill.skill}"`,
        descricao: `O nível de proficiência (${skill.nivelAtual}) está acima do nível-alvo (${skill.nivelDesejado}). Ajuste a meta desejada.`,
        passoSugerido: 2,
        rotaSugerida: '/wizard',
      });
    } else if (skill.nivelDesejado - skill.nivelAtual >= 3 && planoDeAcao.length === 0) {
      items.push({
        id: `meta-salto-grande-${skill.skill}`,
        severity: 'warning',
        titulo: `Salto ambicioso sem plano de ação: "${skill.skill}" (${skill.nivelAtual} -> ${skill.nivelDesejado})`,
        descricao: 'Um salto de 3+ níveis no mesmo ciclo exige ações intermediárias claras.',
        passoSugerido: 4,
        rotaSugerida: '/app/plano',
      });
    }
  }

  return items;
}
