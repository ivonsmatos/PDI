// Taxonomia de acesso e credencial para recursos externos (cursos/certificações).
// Objetivo: nunca afirmar "grátis" ou "certificação" sem qualificar o que é
// gratuito (curso, certificado, exame) e que tipo de credencial é gerada.

/** O que é gratuito no recurso */
export type AcessoRecurso =
  | 'gratuito_com_certificado'  // curso e certificado/declaração sem custo
  | 'gratuito'                  // conteúdo gratuito, sem certificado (ou certificado não incluso)
  | 'badge_gratuito'            // badge/credencial digital gratuita
  | 'auditoria'                 // acesso gratuito parcial; certificado é pago
  | 'condicionado'              // gratuito só em campanha, vaga ou programa
  | 'pago'                      // curso ou exame pago
  | 'nao_confirmado';           // condições não confirmadas — conferir no site

/** Tipo de credencial que o recurso pode gerar */
export type CredencialRecurso =
  | 'certificado_conclusao'
  | 'certificacao_exame'
  | 'badge'
  | 'declaracao'
  | 'nenhuma';

export const ACESSO_INFO: Record<AcessoRecurso, { label: string; descricao: string; className: string }> = {
  gratuito_com_certificado: {
    label: 'Gratuito c/ certificado',
    descricao: 'Conteúdo e certificado sem custo, segundo a última revisão.',
    className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  },
  gratuito: {
    label: 'Conteúdo gratuito',
    descricao: 'O conteúdo é gratuito; certificado não incluso ou não confirmado.',
    className: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
  },
  badge_gratuito: {
    label: 'Badge gratuito',
    descricao: 'Gera um badge/credencial digital sem custo (não é certificação por exame).',
    className: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
  },
  auditoria: {
    label: 'Acesso parcial · certificado pago',
    descricao: 'Pode ser cursado gratuitamente em modo auditoria; o certificado exige pagamento ou bolsa.',
    className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  },
  condicionado: {
    label: 'Gratuito sob condições',
    descricao: 'Gratuito apenas em campanhas, programas ou vagas específicas.',
    className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  },
  pago: {
    label: 'Pago',
    descricao: 'Curso e/ou exame com custo. Confira o valor no site oficial.',
    className: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  },
  nao_confirmado: {
    label: 'Custo a confirmar',
    descricao: 'Não confirmamos se curso e certificado são gratuitos. Verifique no site oficial.',
    className: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  },
};

export const CREDENCIAL_LABEL: Record<CredencialRecurso, string> = {
  certificado_conclusao: 'Certificado de conclusão',
  certificacao_exame: 'Certificação por exame',
  badge: 'Badge digital',
  declaracao: 'Declaração de participação',
  nenhuma: 'Sem credencial',
};

/** Data da última revisão editorial do catálogo (classificação de acesso/credencial). */
export const CATALOGO_REVISADO_EM = '2026-11-08';

export const formatarDataBR = (iso: string) => {
  const [a, m, d] = iso.split('-');
  return `${d}/${m}/${a}`;
};

/** Canal para o usuário reportar link quebrado ou informação incorreta. */
export const reportarRecursoUrl = (nome: string, url: string) =>
  `mailto:contato@meupdi.app.br?subject=${encodeURIComponent(`Recurso incorreto: ${nome}`)}&body=${encodeURIComponent(`Recurso: ${nome}\nLink: ${url}\n\nO que está incorreto?\n`)}`;

/**
 * Infere acesso/credencial de uma atividade da Trilha (templates sem classificação explícita).
 * Conservador: na dúvida, "Custo a confirmar".
 */
export function inferirAcessoAtividade(
  tipo: string,
  url: string | undefined,
  descricao: string,
  titulo: string,
): AcessoRecurso | null {
  if (!url) return null;
  const u = url.toLowerCase();
  const txt = `${titulo} ${descricao}`.toLowerCase();
  if (u.includes('coursera.org')) return 'auditoria';
  if (u.includes('udemy.com') || u.includes('alura.com')) return 'pago';
  if (tipo === 'certificacao') return 'pago';
  if (txt.includes('gratuit')) return 'gratuito';
  if (tipo === 'leitura' || tipo === 'pratica') return null; // documentação/exercícios — sem selo
  return 'nao_confirmado';
}

