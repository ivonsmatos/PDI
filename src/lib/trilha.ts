// Geração da Trilha de Desenvolvimento - fonte única usada pela página Trilha e pelo Dashboard.
import type { PdiFields } from '../store/usePdiStore';
import {
  HARD_SKILL_TEMPLATES, SOFT_ATIVIDADES,
  type TipoAtividade, type Atividade,
} from '../data/trilhaTemplates';
import { getCertificacoesPorSkill, type Certificacao } from '../data/certificacoesGratuitas';

/** Busca atividades específicas por nome de skill (keyword match) */
function getAtividadesHard(skill: string, nivelAtual: number, nivelDesejado: number): Atividade[] {
  const skillLower = skill.toLowerCase();
  const found = HARD_SKILL_TEMPLATES.find(t =>
    t.keywords.some(kw => skillLower.includes(kw))
  );
  if (found) return found.atividades;

  const gap = nivelDesejado - nivelAtual;
  return [
    {
      tipo: 'curso',
      titulo: `Curso focado em: ${skill}`,
      descricao: `Busque um curso ${gap >= 2 ? 'intermediário/avançado' : 'introdutório/prático'} em "${skill}". Plataformas: Alura, Udemy, Coursera, LinkedIn Learning.`,
      tempo: gap >= 2 ? '10–20h' : '4–8h',
      headhunterDica: 'Adicione o certificado ao LinkedIn em Licenças e Certificados com data de conclusão.',
    },
    {
      tipo: 'portfolio',
      titulo: `Projeto prático demonstrando ${skill}`,
      descricao: `Crie ou contribua com um projeto real que exija "${skill}". Publique no GitHub com README claro mostrando o problema resolvido e o resultado.`,
      tempo: '2h/semana por 4 semanas',
      headhunterDica: 'Repositório público com resultado mensurável. Cole o link no LinkedIn e na candidatura.',
    },
    {
      tipo: 'mentoria',
      titulo: `Feedback de um especialista em ${skill}`,
      descricao: `Identifique alguém no ambiente que já domina "${skill}" e peça para revisar seu trabalho apontando lacunas específicas.`,
      tempo: '1h',
      headhunterDica: 'Solicite um recommendation no LinkedIn sobre sua evolução nessa competência.',
    },
  ];
}

// ── Deduplicação ──────────────────────────────────────────────────────────────
type GrupoBruto = { id: string; skill: string; categoria: string; atividades: Atividade[]; certs: Certificacao[] };
export type GrupoTrilha = {
  id: string;
  skill: string;
  categoria: string;
  /** Atividades exclusivas deste grupo; `ai` = índice original (mantém a chave de progresso estável) */
  atividades: { atv: Atividade; ai: number; tambemPara: string[] }[];
  /** Atividades que já aparecem em outro grupo - exibidas só como referência, não contam no total */
  compartilhadas: { titulo: string; skillDona: string }[];
  certs: { cert: Certificacao; tambemPara: string[] }[];
};

/**
 * Um mesmo recurso (curso, projeto, certificação) pode casar com várias lacunas.
 * Exibe-o uma única vez - no primeiro grupo - indicando as demais competências que ele desenvolve.
 */
function deduplicarTrilha(itens: GrupoBruto[]): GrupoTrilha[] {
  const chaveAtv = (a: Atividade) => (a.url ? `u:${a.url}` : `t:${a.titulo}`);
  const donoAtv = new Map<string, string>();      // chave → skill dona
  const skillsAtv = new Map<string, string[]>();  // chave → todas as skills
  const donoCert = new Map<string, string>();
  const skillsCert = new Map<string, string[]>();

  for (const g of itens) {
    for (const a of g.atividades) {
      const k = chaveAtv(a);
      if (!donoAtv.has(k)) donoAtv.set(k, g.skill);
      skillsAtv.set(k, [...(skillsAtv.get(k) ?? []), g.skill]);
    }
    for (const c of g.certs) {
      if (!donoCert.has(c.url)) donoCert.set(c.url, g.skill);
      skillsCert.set(c.url, [...(skillsCert.get(c.url) ?? []), g.skill]);
    }
  }

  return itens.map(g => ({
    id: g.id,
    skill: g.skill,
    categoria: g.categoria,
    atividades: g.atividades
      .map((atv, ai) => ({ atv, ai, k: chaveAtv(atv) }))
      .filter(x => donoAtv.get(x.k) === g.skill)
      .map(({ atv, ai, k }) => ({
        atv, ai,
        tambemPara: [...new Set(skillsAtv.get(k) ?? [])].filter(s => s !== g.skill),
      })),
    compartilhadas: g.atividades
      .filter(a => donoAtv.get(chaveAtv(a)) !== g.skill)
      .map(a => ({ titulo: a.titulo, skillDona: donoAtv.get(chaveAtv(a)) ?? '' })),
    certs: g.certs
      .filter(c => donoCert.get(c.url) === g.skill)
      .map(cert => ({
        cert,
        tambemPara: [...new Set(skillsCert.get(cert.url) ?? [])].filter(s => s !== g.skill),
      })),
  }));
}

/** Gera os grupos da trilha (lacunas técnicas + comportamentais a desenvolver), já deduplicados. */
export function gerarTrilha(inventario: PdiFields['inventario'], area: string): GrupoTrilha[] {
  const itens: GrupoBruto[] = [];

  // Hard Skills com gap
  inventario.hardSkills
    .filter(s => s.nivelAtual < s.nivelDesejado)
    .forEach(s => {
      itens.push({
        id: `hard::${s.skill}`,
        skill: s.skill,
        categoria: `Habilidade técnica - lacuna de ${s.nivelDesejado - s.nivelAtual} ${s.nivelDesejado - s.nivelAtual > 1 ? 'níveis' : 'nível'}`,
        atividades: getAtividadesHard(s.skill, s.nivelAtual, s.nivelDesejado),
        certs: getCertificacoesPorSkill(s.skill, area).slice(0, 3),
      });
    });

  // Soft Skills marcadas como "A Melhorar"
  inventario.softSkills
    .filter(s => s.pontoForteOuMelhoria === 'Melhoria')
    .forEach(s => {
      const atividades = SOFT_ATIVIDADES[s.atributo] ?? [
        { tipo: 'leitura' as TipoAtividade, titulo: `Pesquise sobre: ${s.atributo}`, descricao: 'Leia 2 artigos ou 1 capítulo de livro sobre este atributo.', tempo: '1h' },
        { tipo: 'pratica' as TipoAtividade, titulo: `Exercite ${s.atributo} em situação real`, descricao: 'Aplique conscientemente este atributo na próxima semana e anote o resultado.', tempo: '1 semana', headhunterDica: 'Documente o resultado no Diário e use como exemplo em entrevistas.' },
        { tipo: 'mentoria' as TipoAtividade, titulo: `Converse com quem você admira neste atributo`, descricao: 'Aprenda como essa pessoa desenvolveu essa competência ao longo do tempo.', tempo: '30 min' },
      ];
      itens.push({
        id: `soft::${s.atributo}`,
        skill: s.atributo,
        categoria: 'Habilidade comportamental - a desenvolver',
        atividades,
        certs: [],
      });
    });

  return deduplicarTrilha(itens);
}

/** Conta atividades únicas da trilha e quantas estão concluídas. */
export function contarProgressoTrilha(trilha: GrupoTrilha[], progresso: Record<string, boolean>) {
  let total = 0;
  let concluidas = 0;
  for (const g of trilha) {
    for (const { ai } of g.atividades) {
      total++;
      if (progresso[`${g.id}::${ai}`]) concluidas++;
    }
  }
  return { total, concluidas };
}
