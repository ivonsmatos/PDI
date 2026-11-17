export type EditorialCluster =
  | 'Fundamentos'
  | 'Carreira e Senioridade'
  | 'Competências'
  | 'RH e Liderança'
  | 'Cursos e Ações'
  | 'Produto e Templates';

export interface EditorialSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  example?: {
    titulo: string;
    situacaoAtual: string;
    objetivo: string;
    acao: string;
    prazo: string;
    evidencia: string;
  };
}

export interface EditorialFaq {
  q: string;
  a: string;
}

export interface EditorialLink {
  label: string;
  to: string;
}

export interface EditorialArticle {
  slug: string;
  cluster: EditorialCluster;
  seoTitle: string;
  metaDescription: string;
  kicker: string;
  h1: string;
  directAnswer: string;
  intro: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  reviewer: string;
  sections: EditorialSection[];
  checklist: string[];
  commonErrors: string[];
  faqs: EditorialFaq[];
  relatedLinks: EditorialLink[];
}
