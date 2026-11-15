import type { matrizDeCompetencias } from './matrizCompetencias';

export type AreaId = keyof typeof matrizDeCompetencias;

export interface AreaMeta {
  value: AreaId;
  label: string;
  emoji: string;
  shortLabel: string;
  group: string;
}

export const AREAS_PROFISSIONAIS: AreaMeta[] = [
  // Tecnologia & Dados
  { value: 'tecnologia', label: 'Tecnologia / Desenvolvimento', emoji: '💻', shortLabel: 'Tecnologia', group: 'Tecnologia & Dados' },
  { value: 'devops_infraestrutura', label: 'DevOps & Infraestrutura', emoji: '⚙️', shortLabel: 'DevOps / Infra', group: 'Tecnologia & Dados' },
  { value: 'seguranca_informacao', label: 'Segurança da Informação', emoji: '🔒', shortLabel: 'Segurança', group: 'Tecnologia & Dados' },
  { value: 'qualidade_qa', label: 'Qualidade / QA', emoji: '🧪', shortLabel: 'QA / Qualidade', group: 'Tecnologia & Dados' },
  { value: 'ciencia_de_dados', label: 'Ciência de Dados / BI', emoji: '📊', shortLabel: 'Dados / BI', group: 'Tecnologia & Dados' },
  { value: 'gestao_de_produto', label: 'Gestão de Produto', emoji: '🗺️', shortLabel: 'Produto', group: 'Tecnologia & Dados' },
  { value: 'inovacao_transformacao_digital', label: 'Inovação & Transformação Digital', emoji: '🚀', shortLabel: 'Inovação', group: 'Tecnologia & Dados' },
  { value: 'telecomunicacoes', label: 'Telecomunicações', emoji: '📡', shortLabel: 'Telecom', group: 'Tecnologia & Dados' },

  // Negócios & Finanças
  { value: 'administracao', label: 'Administração', emoji: '🏢', shortLabel: 'Administração', group: 'Negócios & Finanças' },
  { value: 'gestao', label: 'Gestão & Liderança', emoji: '👥', shortLabel: 'Gestão', group: 'Negócios & Finanças' },
  { value: 'financas', label: 'Finanças', emoji: '💰', shortLabel: 'Finanças', group: 'Negócios & Finanças' },
  { value: 'contabilidade', label: 'Contabilidade', emoji: '📒', shortLabel: 'Contabilidade', group: 'Negócios & Finanças' },
  { value: 'servicos_financeiros_seguros', label: 'Serviços Financeiros e Seguros', emoji: '🏦', shortLabel: 'Serv. Financeiros', group: 'Negócios & Finanças' },
  { value: 'compras_procurement', label: 'Compras & Procurement', emoji: '🛒', shortLabel: 'Compras', group: 'Negócios & Finanças' },
  { value: 'logistica_supply_chain', label: 'Logística & Supply Chain', emoji: '🚚', shortLabel: 'Logística', group: 'Negócios & Finanças' },

  // Pessoas, Mercado & Comunicação
  { value: 'recursos_humanos', label: 'Recursos Humanos', emoji: '🤝', shortLabel: 'RH', group: 'Pessoas & Mercado' },
  { value: 'marketing', label: 'Marketing', emoji: '📣', shortLabel: 'Marketing', group: 'Pessoas & Mercado' },
  { value: 'vendas', label: 'Vendas', emoji: '🎯', shortLabel: 'Vendas', group: 'Pessoas & Mercado' },
  { value: 'customer_success', label: 'Customer Success', emoji: '⭐', shortLabel: 'Customer Success', group: 'Pessoas & Mercado' },
  { value: 'comunicacao_relacoes_publicas', label: 'Comunicação & Relações Públicas', emoji: '🗞️', shortLabel: 'Comunicação / RP', group: 'Pessoas & Mercado' },
  { value: 'design', label: 'Design / UX-UI', emoji: '🎨', shortLabel: 'Design / UX', group: 'Pessoas & Mercado' },
  { value: 'midia_audiovisual_entretenimento', label: 'Mídia, Audiovisual e Entretenimento', emoji: '🎬', shortLabel: 'Mídia / Audiovisual', group: 'Pessoas & Mercado' },
  { value: 'varejo', label: 'Varejo & E-commerce', emoji: '🛍️', shortLabel: 'Varejo', group: 'Pessoas & Mercado' },

  // Engenharia, Indústria & Infraestrutura
  { value: 'engenharia', label: 'Engenharia', emoji: '🏗️', shortLabel: 'Engenharia', group: 'Engenharia & Indústria' },
  { value: 'arquitetura_construcao', label: 'Arquitetura e Construção', emoji: '📐', shortLabel: 'Arquitetura / Constr.', group: 'Engenharia & Indústria' },
  { value: 'industria_manufatura', label: 'Indústria e Manufatura', emoji: '🏭', shortLabel: 'Indústria', group: 'Engenharia & Indústria' },
  { value: 'energia_oleo_gas', label: 'Energia, Óleo e Gás', emoji: '⚡', shortLabel: 'Energia / O&G', group: 'Engenharia & Indústria' },
  { value: 'transportes_mobilidade', label: 'Transportes e Mobilidade', emoji: '🚆', shortLabel: 'Transportes', group: 'Engenharia & Indústria' },
  { value: 'imobiliario_facilities', label: 'Imobiliário e Facilities', emoji: '🏙️', shortLabel: 'Imobiliário', group: 'Engenharia & Indústria' },
  { value: 'agronegocio', label: 'Agronegócio', emoji: '🌾', shortLabel: 'Agronegócio', group: 'Engenharia & Indústria' },
  { value: 'sustentabilidade_esg', label: 'Sustentabilidade & ESG', emoji: '🌱', shortLabel: 'ESG', group: 'Engenharia & Indústria' },

  // Saúde, Ciência, Setor Público & Serviços
  { value: 'saude', label: 'Saúde', emoji: '🏥', shortLabel: 'Saúde', group: 'Saúde, Ciência & Serviços' },
  { value: 'farmaceutica_biotecnologia', label: 'Farmacêutica e Biotecnologia', emoji: '🧬', shortLabel: 'Farma / Biotech', group: 'Saúde, Ciência & Serviços' },
  { value: 'educacao', label: 'Educação', emoji: '🎓', shortLabel: 'Educação', group: 'Saúde, Ciência & Serviços' },
  { value: 'pesquisa_ciencia_academia', label: 'Pesquisa, Ciência e Academia', emoji: '🔬', shortLabel: 'Pesquisa / Academia', group: 'Saúde, Ciência & Serviços' },
  { value: 'direito', label: 'Direito', emoji: '⚖️', shortLabel: 'Direito', group: 'Saúde, Ciência & Serviços' },
  { value: 'setor_publico_governo', label: 'Setor Público e Governo', emoji: '🏛️', shortLabel: 'Setor Público', group: 'Saúde, Ciência & Serviços' },
  { value: 'turismo_hotelaria_eventos', label: 'Turismo, Hotelaria e Eventos', emoji: '🏨', shortLabel: 'Turismo / Eventos', group: 'Saúde, Ciência & Serviços' },
  { value: 'gastronomia_alimentacao', label: 'Gastronomia e Alimentação', emoji: '🍽️', shortLabel: 'Gastronomia', group: 'Saúde, Ciência & Serviços' },
  { value: 'esportes_fitness_bem_estar', label: 'Esportes, Fitness e Bem-estar', emoji: '🏃', shortLabel: 'Esportes / Fitness', group: 'Saúde, Ciência & Serviços' },
];

export const AREA_OPTIONS = AREAS_PROFISSIONAIS.map(a => ({
  value: a.value,
  label: `${a.emoji} ${a.label}`,
}));

export const AREA_LABEL_MAP: Record<string, string> = Object.fromEntries(
  AREAS_PROFISSIONAIS.map(a => [a.value, a.label])
);

export const AREA_EMOJI_LABEL_MAP: Record<string, string> = Object.fromEntries(
  AREAS_PROFISSIONAIS.map(a => [a.value, `${a.emoji} ${a.label}`])
);

export const AREA_CURTO_MAP: Record<string, string> = Object.fromEntries(
  AREAS_PROFISSIONAIS.map(a => [a.value, a.shortLabel])
);
