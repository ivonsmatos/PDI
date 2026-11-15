import { AREAS_PROFISSIONAIS, AREA_LABEL_MAP, type AreaId } from './areas';
import type { HardSkill, SoftSkill } from '../store/usePdiStore';

const getAreaLabel = (key: string): string => AREA_LABEL_MAP[key] || key;

export const ESPECIALIDADES_POR_AREA: Record<AreaId, string[]> = {
  tecnologia: ['Desenvolvimento', 'Arquitetura', 'Dados', 'IA', 'Produto técnico', 'Segurança', 'Infraestrutura'],
  devops_infraestrutura: ['Cloud & Kubernetes', 'CI/CD & Automação', 'Observabilidade & SRE', 'Infraestrutura como Código', 'FinOps & Confiabilidade'],
  seguranca_informacao: ['AppSec', 'Cloud Security', 'SOC & Resposta a Incidentes', 'GRC & LGPD', 'Red Team / Pentest'],
  qualidade_qa: ['Automação de Testes', 'QA Funcional & Exploratório', 'Performance & Carga', 'Qualidade Contínua & DevSecOps'],
  ciencia_de_dados: ['Analytics & BI', 'Engenharia de Dados', 'Ciência de Dados & ML', 'IA Generativa & MLOps', 'Governança de Dados'],
  gestao_de_produto: ['Product Discovery & Estratégia', 'Product Delivery & Growth', 'Plataforma & Produto Técnico', 'B2B / Enterprise Product'],
  design: ['UX/UI & Product Design', 'UX Research', 'Design Systems', 'Service Design', 'Brand & Visual Design'],
  marketing: ['Growth & Performance', 'Branding & Posicionamento', 'Conteúdo & SEO', 'CRM & Lifecycle', 'Product Marketing'],
  vendas: ['SDR / Prospecção', 'Account Executive (B2B)', 'Key Account & Enterprise', 'Inside Sales', 'Sales Ops & Enablement'],
  customer_success: ['Onboarding & Implantação', 'Gestão de Carteira (CSM)', 'Suporte Técnico Especializado', 'Customer Ops & Retenção'],
  recursos_humanos: ['Recrutamento & Seleção', 'Business Partner (HRBP)', 'Desenvolvimento & T&D', 'Cultura & Engajamento', 'People Analytics & Remuneração'],
  financas: ['FP&A & Orçamento', 'Controladoria', 'Tesouraria & Fluxo de Caixa', 'M&A & Investimentos', 'Risco & Compliance Financeiro'],
  contabilidade: ['Contabilidade Societária', 'Fiscal & Tributário', 'Auditoria & Controles Internos', 'Custos & Patrimônio'],
  administracao: ['Operações Administrativas', 'Processos & PMO', 'Planejamento & Controle', 'Governança Corporativa'],
  gestao: ['Gestão de Equipes', 'Gestão de Projetos (PMO)', 'Estratégia & Operações', 'Liderança Executiva'],
  logistica_supply_chain: ['Planejamento & S&OP', 'Transportes & Roteirização', 'Armazenagem & WMS', 'Comércio Exterior', 'Supply Chain Analytics'],
  saude: ['Assistência Clínica', 'Gestão Hospitalar', 'Saúde Digital & Telemedicina', 'Qualidade & Segurança do Paciente', 'Saúde Coletiva'],
  educacao: ['Docência & Metodologias Ativas', 'Design Instrucional & EdTech', 'Gestão Escolar / Acadêmica', 'Educação Corporativa'],
  direito: ['Direito Corporativo & Contratos', 'Trabalhista', 'Tributário', 'Direito Digital & LGPD', 'Contencioso & Arbitragem'],
  engenharia: ['Projetos & P&D', 'Processos & Melhoria Contínua', 'Manutenção & Confiabilidade', 'Qualidade & Normas', 'Gestão de Obras / Campo'],
  sustentabilidade_esg: ['Descarbonização & Clima', 'Governança & Compliance ESG', 'Impacto Social & Diversidade', 'Relatórios GRI / SASB'],
  comunicacao_relacoes_publicas: ['Comunicação Interna', 'Relações Públicas & Imprensa', 'Comunicação Corporativa & Crise', 'Conteúdo Institucional'],
  inovacao_transformacao_digital: ['Inovação Aberta & Startups', 'Transformação Digital', 'Agilidade Organizacional', 'Automação & IA nos Negócios'],
  compras_procurement: ['Strategic Sourcing', 'Gestão de Contratos & Fornecedores', 'Compras Indiretas / Capex', 'Procurement Analytics'],
  agronegocio: ['Produção Agrícola & Manejo', 'Agricultura de Precisão', 'Comercialização & Trading', 'Gestão de Fazenda & Agroindústria'],
  varejo: ['Operação de Loja & Expansão', 'E-commerce & Omnichannel', 'Visual Merchandising', 'Planejamento de Categorias & Estoque'],
  arquitetura_construcao: ['Projetos Arquitetônicos & BIM', 'Execução & Gestão de Obras', 'Urbanismo & Sustentabilidade', 'Interiores & Compatibilização'],
  industria_manufatura: ['Produção & Lean Manufacturing', 'Qualidade Industrial & Seis Sigma', 'Automação & Indústria 4.0', 'PCP & Manutenção Industrial'],
  energia_oleo_gas: ['Exploração & Produção (O&G)', 'Energias Renováveis', 'Transmissão, Distribuição & Mercado Livre', 'HSE & Eficiência Energética'],
  telecomunicacoes: ['Redes Móveis & 5G', 'Fibra Óptica & Infraestrutura', 'Operações NOC & Core', 'Produtos B2B & Conectividade'],
  transportes_mobilidade: ['Gestão de Frotas & Operações', 'Mobilidade Urbana & MaaS', 'Transporte Ferroviário / Aéreo / Marítimo', 'Segurança Viária & Telemetria'],
  turismo_hotelaria_eventos: ['Hotelaria & Hospitalidade', 'Eventos Corporativos & Feiras', 'Agenciamento & Experiência do Cliente', 'Revenue Management'],
  gastronomia_alimentacao: ['Cozinha & Produção Culinária', 'Gestão de A&B (Alimentos e Bebidas)', 'Segurança Alimentar & Boas Práticas', 'Engenharia de Cardápio'],
  midia_audiovisual_entretenimento: ['Produção Audiovisual', 'Direção, Roteiro & Pós-produção', 'Distribuição Digital & Streaming', 'Gestão de Projetos Culturais'],
  pesquisa_ciencia_academia: ['Pesquisa Básica & Aplicada', 'Docência Universitária & Orientação', 'Captação de Fomento & Publicações', 'Inovação Científica & Patentes'],
  setor_publico_governo: ['Gestão & Políticas Públicas', 'Licitações, Contratos & Orçamento', 'Controle Interno & Transparência', 'Governo Digital & Atendimento'],
  servicos_financeiros_seguros: ['Crédito & Risco', 'Seguros & Subscrição / Sinistros', 'Produtos Bancários & Meios de Pagamento', 'Wealth & Mercado de Capitais'],
  farmaceutica_biotecnologia: ['P&D & Pesquisa Clínica', 'Assuntos Regulatórios (ANVISA)', 'Garantia da Qualidade & BPF', 'Acesso ao Mercado & Medical Affairs'],
  imobiliario_facilities: ['Incorporação & Novos Negócios', 'Facilities & Manutenção Predial', 'Gestão Patrimonial & Contratos', 'Corretagem & Inteligência de Mercado'],
  esportes_fitness_bem_estar: ['Treinamento & Preparação Física', 'Gestão Esportiva & Clubes', 'Saúde, Nutrição & Bem-estar', 'Eventos & Negócios Fitness'],
};

export function getEspecialidadesParaArea(areaKey: string): string[] {
  return (ESPECIALIDADES_POR_AREA as Record<string, string[]>)[areaKey] ?? [
    'Atuação Generalista',
    'Especialista Técnico',
    'Gestão & Operações',
    'Estratégia & Projetos',
  ];
}

export type ObjetivoCarreiraOption = {
  id: string;
  label: string;
  descricao: string;
  focoTrilha: string;
};

export const OBJETIVOS_CARREIRA: ObjetivoCarreiraOption[] = [
  {
    id: 'especialista_tecnico',
    label: 'Especialista técnico',
    descricao: 'Aprofundar domínio técnico, arquitetura e referência em problemas complexos.',
    focoTrilha: 'Priorize certificações avançadas, entregas de alta complexidade e documentação técnica.',
  },
  {
    id: 'gestao_pessoas',
    label: 'Gestão de pessoas',
    descricao: 'Desenvolver liderança direta, feedback, 1:1s, delegação e formação de times.',
    focoTrilha: 'Combine métricas de entrega do time com competências comportamentais de mentoria e alinhamento.',
  },
  {
    id: 'lideranca_executiva',
    label: 'Liderança executiva',
    descricao: 'Expandir visão estratégica, influência entre áreas, P&L e tomada de decisão.',
    focoTrilha: 'Foque em metas de impacto no negócio, comunicação executiva e governança.',
  },
  {
    id: 'transicao_carreira',
    label: 'Transição de carreira',
    descricao: 'Migrar de função ou escopo aproveitando competências já consolidadas.',
    focoTrilha: 'Apoie-se nas competências transferíveis e construa evidências práticas na nova trilha.',
  },
  {
    id: 'empreendedorismo',
    label: 'Empreendedorismo',
    descricao: 'Estruturar negócio próprio, produto, vendas, caixa e validação de mercado.',
    focoTrilha: 'Equilibre visão comercial, entrega rápida para clientes e disciplina financeira.',
  },
  {
    id: 'consultoria',
    label: 'Consultoria',
    descricao: 'Atuar com diagnóstico, recomendação, gestão de stakeholders e entregas por projeto.',
    focoTrilha: 'Valorize comunicação executiva, estruturação de problemas e portfólio de resultados.',
  },
  {
    id: 'carreira_academica',
    label: 'Carreira acadêmica',
    descricao: 'Fortalecer pesquisa, publicações, docência, orientação e projetos de extensão.',
    focoTrilha: 'Registre produções científicas, metodologias e evidências de impacto acadêmico.',
  },
  {
    id: 'mudanca_area',
    label: 'Mudança de área',
    descricao: 'Entrar em um novo setor profissional a partir de uma área-base diferente.',
    focoTrilha: 'Use o comparador e o catálogo de competências transferíveis para acelerar a adaptação.',
  },
];

export type CompetenciaContextoOption = {
  id: string;
  label: string;
  contexto: string;
};

export const COMPETENCIAS_COMPORTAMENTAIS_CONTEXTO: CompetenciaContextoOption[] = [
  { id: 'lideranca_equipes', label: 'Liderança de equipes', contexto: 'Conduzir pessoas, dar clareza e sustentar entregas' },
  { id: 'influencia_sem_autoridade', label: 'Influência sem autoridade', contexto: 'Alinhar áreas parceiras e stakeholders sem hierarquia direta' },
  { id: 'negociacao', label: 'Negociação', contexto: 'Construir acordos sustentáveis com clientes, fornecedores ou times' },
  { id: 'gestao_conflitos', label: 'Gestão de conflitos', contexto: 'Mediar divergências técnicas ou interpessoais com objetividade' },
  { id: 'comunicacao_executiva', label: 'Comunicação executiva', contexto: 'Sintetizar riscos, recomendações e impacto para a liderança' },
  { id: 'decisao_sob_pressao', label: 'Tomada de decisão sob pressão', contexto: 'Priorizar com critério em cenários críticos ou incertos' },
  { id: 'pensamento_estrategico', label: 'Pensamento estratégico', contexto: 'Conectar decisões do dia a dia aos objetivos de médio/longo prazo' },
  { id: 'gestao_mudancas', label: 'Gestão de mudanças', contexto: 'Engajar pessoas em transições de processo, tecnologia ou estrutura' },
];

export type TransferenciaSugerida = {
  areaDestino: string;
  areaDestinoLabel: string;
  titulo: string;
  competenciasAproveitaveis: string[];
  motivo: string;
};

const PONTES_TRANSFERENCIA: Array<{
  origem: AreaId[];
  destino: AreaId;
  competencias: string[];
  motivo: string;
}> = [
  {
    origem: ['marketing', 'comunicacao_relacoes_publicas', 'design'],
    destino: 'gestao_de_produto',
    competencias: ['Pesquisa com usuários', 'Posicionamento e proposta de valor', 'Análise de funil e conversão', 'Comunicação entre áreas'],
    motivo: 'Experiência com público, métricas de adoção e narrativa acelera a transição para Gestão de Produto.',
  },
  {
    origem: ['customer_success', 'vendas', 'varejo', 'turismo_hotelaria_eventos'],
    destino: 'customer_success',
    competencias: ['Escuta ativa e diagnóstico', 'Gestão de expectativas', 'Negociação e retenção', 'Resolução estruturada de problemas'],
    motivo: 'Vivência direta com clientes traduz-se naturalmente em retenção, onboarding e expansão de contas.',
  },
  {
    origem: ['financas', 'contabilidade', 'servicos_financeiros_seguros', 'administracao'],
    destino: 'ciencia_de_dados',
    competencias: ['Modelagem quantitativa', 'Análise crítica de indicadores', 'Raciocínio analítico', 'Governança e precisão'],
    motivo: 'Domínio de métricas e planilhas avançadas cria uma base sólida para Analytics, BI e Ciência de Dados.',
  },
  {
    origem: ['administracao', 'compras_procurement', 'logistica_supply_chain', 'industria_manufatura'],
    destino: 'gestao',
    competencias: ['Gestão de processos', 'Controle de prazos e recursos', 'Alinhamento com fornecedores e pares', 'Melhoria contínua'],
    motivo: 'Forte repertório operacional facilita assumir papéis de PMO, Operações e Gestão.',
  },
  {
    origem: ['engenharia', 'arquitetura_construcao', 'energia_oleo_gas', 'telecomunicacoes'],
    destino: 'gestao',
    competencias: ['Planejamento técnico', 'Gestão de riscos e cronogramas', 'Visão sistêmica', 'Coordenação multidisciplinar'],
    motivo: 'Base analítica e coordenação de projetos complexos preparam bem para Gestão de Projetos e Operações.',
  },
  {
    origem: ['tecnologia', 'devops_infraestrutura', 'qualidade_qa'],
    destino: 'seguranca_informacao',
    competencias: ['Arquitetura de sistemas', 'Automação e análise de logs', 'Boas práticas de código e deploy', 'Pensamento de risco'],
    motivo: 'Conhecimento de infraestrutura e ciclo de software reduz a curva para AppSec, Cloud Security e GRC.',
  },
  {
    origem: ['tecnologia', 'ciencia_de_dados', 'engenharia'],
    destino: 'inovacao_transformacao_digital',
    competencias: ['Prototipação rápida', 'Visão de automação e IA', 'Resolução de gargalos', 'Trabalho em squads'],
    motivo: 'Capacidade técnica aliada a entregas iterativas sustenta iniciativas de Transformação Digital.',
  },
];

export function encontrarCompetenciasTransferiveis(
  areaPrincipal: string,
  hardSkills: HardSkill[],
  softSkills: SoftSkill[],
  areasComplementares: string[] = []
): TransferenciaSugerida[] {
  const sugestoes: TransferenciaSugerida[] = [];

  for (const ponte of PONTES_TRANSFERENCIA) {
    if (ponte.destino === areaPrincipal) continue;
    if (
      ponte.origem.includes(areaPrincipal as AreaId) ||
      areasComplementares.some(a => ponte.origem.includes(a as AreaId))
    ) {
      sugestoes.push({
        areaDestino: ponte.destino,
        areaDestinoLabel: getAreaLabel(ponte.destino),
        titulo: `${getAreaLabel(areaPrincipal)} -> ${getAreaLabel(ponte.destino)}`,
        competenciasAproveitaveis: ponte.competencias,
        motivo: ponte.motivo,
      });
    }
  }

  const skillsFortesUsuario = [
    ...hardSkills.filter(h => h.nivelAtual >= 3).map(h => h.skill),
    ...softSkills.filter(s => s.pontoForteOuMelhoria === 'Forte').map(s => s.atributo),
  ].slice(0, 4);

  if (sugestoes.length === 0) {
    const destinosFallback: AreaId[] = (['gestao', 'gestao_de_produto', 'inovacao_transformacao_digital', 'ciencia_de_dados'] as AreaId[])
      .filter(d => d !== areaPrincipal)
      .slice(0, 2);
    for (const dest of destinosFallback) {
      sugestoes.push({
        areaDestino: dest,
        areaDestinoLabel: getAreaLabel(dest),
        titulo: `${getAreaLabel(areaPrincipal)} -> ${getAreaLabel(dest)}`,
        competenciasAproveitaveis: skillsFortesUsuario.length > 0
          ? skillsFortesUsuario
          : ['Comunicação estruturada', 'Resolução de problemas', 'Visão de processos'],
        motivo: 'Suas competências atuais de análise, comunicação e execução podem ser reaproveitadas em projetos transversais dessa área.',
      });
    }
  } else if (skillsFortesUsuario.length > 0) {
    sugestoes[0] = {
      ...sugestoes[0],
      competenciasAproveitaveis: Array.from(new Set([...skillsFortesUsuario.slice(0, 2), ...sugestoes[0].competenciasAproveitaveis])).slice(0, 5),
    };
  }

  return sugestoes;
}

export type RespostasRecomendador = {
  diaADia: string;
  ferramentas: string;
  resultado: string;
  evolucao: string;
};

export type ResultadoRecomendador = {
  areaPrincipal: string;
  areaPrincipalLabel: string;
  especialidade: string;
  matrizAdequada: string;
  areasTransicao: { key: string; label: string }[];
  justificativa: string;
};

const KEYWORDS_AREA: Record<AreaId, string[]> = {
  tecnologia: ['codigo', 'código', 'software', 'api', 'backend', 'frontend', 'react', 'python', 'java', 'git', 'sistema', 'app', 'desenvolvimento'],
  devops_infraestrutura: ['cloud', 'aws', 'azure', 'kubernetes', 'docker', 'terraform', 'ci/cd', 'pipeline', 'deploy', 'infraestrutura', 'servidor'],
  seguranca_informacao: ['seguranca', 'segurança', 'lgpd', 'vulnerabilidade', 'pentest', 'soc', 'acesso', 'compliance', 'risco cibernetico'],
  qualidade_qa: ['teste', 'qa', 'qualidade', 'automacao', 'cypress', 'selenium', 'bug', 'regressao'],
  ciencia_de_dados: ['dados', 'sql', 'bi', 'power bi', 'tableau', 'machine learning', 'modelo', 'estatistica', 'analytics', 'dashboard', 'etl'],
  gestao_de_produto: ['produto', 'roadmap', 'backlog', 'discovery', 'usuario', 'usuário', 'pm', 'jira', 'kpi', 'feature'],
  design: ['design', 'figma', 'ux', 'ui', 'prototipo', 'protótipo', 'interface', 'pesquisa com usuario', 'identidade visual'],
  marketing: ['marketing', 'campanha', 'ads', 'seo', 'conteudo', 'conteúdo', 'branding', 'lead', 'funil', 'redes sociais', 'crm'],
  vendas: ['vendas', 'comercial', 'prospeccao', 'prospecção', 'negociacao', 'negociação', 'fechamento', 'pipeline', 'b2b', 'receita'],
  customer_success: ['cliente', 'suporte', 'onboarding', 'retencao', 'retenção', 'churn', 'nps', 'atendimento', 'implantacao'],
  recursos_humanos: ['rh', 'pessoas', 'recrutamento', 'selecao', 'seleção', 'treinamento', 'cultura', 'clima', 'folha', 'cargos'],
  financas: ['financeiro', 'financas', 'finanças', 'orcamento', 'orçamento', 'dre', 'fluxo de caixa', 'fp&a', 'valuation', 'custo'],
  contabilidade: ['contabil', 'contábil', 'fiscal', 'tributario', 'tributário', 'balanco', 'balanço', 'auditoria', 'sped'],
  administracao: ['administrativo', 'rotina', 'processo', 'planilha', 'escritorio', 'escritório', 'documento', 'organizacao'],
  gestao: ['gestao', 'gestão', 'equipe', 'lideranca', 'liderança', 'projeto', 'pmo', 'okr', 'meta', 'estrategia'],
  logistica_supply_chain: ['logistica', 'logística', 'estoque', 'transporte', 'frete', 'supply', 'cadeia', 'armazem', 'entrega'],
  saude: ['saude', 'saúde', 'paciente', 'clinica', 'clínica', 'hospital', 'enfermagem', 'medico', 'médico', 'prontuario'],
  educacao: ['ensino', 'aula', 'aluno', 'educacao', 'educação', 'curso', 'pedagogico', 'treinamento', 'didatica'],
  direito: ['juridico', 'jurídico', 'contrato', 'lei', 'processo judicial', 'parecer', 'compliance', 'oab'],
  engenharia: ['engenharia', 'cad', 'projeto mecanico', 'eletrica', 'civil', 'manutencao', 'planta', 'norma tecnica'],
  sustentabilidade_esg: ['esg', 'sustentabilidade', 'ambiental', 'carbono', 'social', 'governanca', 'impacto'],
  comunicacao_relacoes_publicas: ['imprensa', 'comunicacao', 'comunicação', 'jornalismo', 'evento', 'redacao', 'institucional'],
  inovacao_transformacao_digital: ['inovacao', 'inovação', 'startup', 'transformacao digital', 'agil', 'ágil', 'ia generativa'],
  compras_procurement: ['compras', 'fornecedor', 'cotacao', 'cotação', 'suprimentos', 'procurement', 'contrato de compra'],
  agronegocio: ['agro', 'fazenda', 'safra', 'agricola', 'pecuaria', 'colheita', 'insumo'],
  varejo: ['loja', 'varejo', 'ecommerce', 'e-commerce', 'pdv', 'venda direta', 'estoque de loja'],
  arquitetura_construcao: ['arquitetura', 'bim', 'revit', 'autocad', 'obra', 'edificacao', 'urbanismo', 'interiores'],
  industria_manufatura: ['fabrica', 'fábrica', 'producao', 'produção', 'manufatura', 'lean', 'seis sigma', 'maquina', 'chao de fabrica'],
  energia_oleo_gas: ['energia', 'solar', 'eolica', 'eletrica', 'oleo', 'gás', 'petroleo', 'subestacao', 'usina'],
  telecomunicacoes: ['telecom', 'fibra', '5g', 'rede', 'antena', 'operadora', 'noc', 'conectividade'],
  transportes_mobilidade: ['frota', 'mobilidade', 'transito', 'rodoviario', 'ferroviario', 'aereo', 'motorista'],
  turismo_hotelaria_eventos: ['hotel', 'turismo', 'viagem', 'hospitalidade', 'evento', 'hospedagem', 'reserva'],
  gastronomia_alimentacao: ['cozinha', 'restaurante', 'gastronomia', 'cardapio', 'alimento', 'chef', 'bebida'],
  midia_audiovisual_entretenimento: ['audiovisual', 'video', 'vídeo', 'cinema', 'edicao', 'edição', 'producao cultural', 'streaming'],
  pesquisa_ciencia_academia: ['pesquisa', 'artigo', 'laboratorio', 'laboratório', 'cientifico', 'mestrado', 'doutorado', 'academia'],
  setor_publico_governo: ['publico', 'público', 'prefeitura', 'governo', 'licitacao', 'licitação', 'servidor', 'politica publica'],
  servicos_financeiros_seguros: ['banco', 'credito', 'crédito', 'seguro', 'sinistro', 'corretora', 'investimento', 'fintech'],
  farmaceutica_biotecnologia: ['farmaceutica', 'farmacêutica', 'anvisa', 'medicamento', 'biotecnologia', 'clinico', 'bpf'],
  imobiliario_facilities: ['imobiliario', 'imobiliário', 'imovel', 'imóvel', 'condominio', 'facilities', 'predial', 'incorporacao'],
  esportes_fitness_bem_estar: ['esporte', 'academia', 'treino', 'fitness', 'atleta', 'bem-estar', 'fisiologia'],
};

export function recomendarAreaPorPerfil(respostas: RespostasRecomendador): ResultadoRecomendador {
  const texto = `${respostas.diaADia} ${respostas.ferramentas} ${respostas.resultado} ${respostas.evolucao}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const scores = AREAS_PROFISSIONAIS.map(area => {
    const kws = KEYWORDS_AREA[area.value] ?? [];
    let score = 0;
    for (const kw of kws) {
      const kwNorm = kw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (texto.includes(kwNorm)) {
        score += kwNorm.includes(' ') ? 3 : 2;
      }
    }
    const labelNorm = area.label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (texto.includes(labelNorm)) score += 4;
    return { key: area.value, label: area.label, score };
  }).sort((a, b) => b.score - a.score);

  const top = scores[0].score > 0 ? scores[0] : { key: 'administracao', label: getAreaLabel('administracao'), score: 1 };
  const especialidades = getEspecialidadesParaArea(top.key);
  let especialidadeEscolhida = especialidades[0];
  for (const esp of especialidades) {
    const espNorm = esp.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (espNorm.split(/[\s/&]+/).some(tok => tok.length > 3 && texto.includes(tok))) {
      especialidadeEscolhida = esp;
      break;
    }
  }

  const nivelHint = texto.includes('gerente') || texto.includes('lider') || texto.includes('diretor')
    ? 'Liderança / Gestão'
    : texto.includes('especialista') || texto.includes('senior')
      ? 'Sênior / Especialista'
      : 'Júnior / Pleno';

  const transicoes = scores
    .filter(s => s.key !== top.key)
    .slice(0, 3)
    .map(s => ({ key: s.key, label: s.label }));

  return {
    areaPrincipal: top.key,
    areaPrincipalLabel: top.label,
    especialidade: especialidadeEscolhida,
    matrizAdequada: `${top.label} (${nivelHint})`,
    areasTransicao: transicoes,
    justificativa: scores[0].score > 0
      ? `Com base nas suas atividades, ferramentas e resultados descritos, há maior aderência à matriz de ${top.label} com foco em ${especialidadeEscolhida}.`
      : `Não identificamos palavras-chave técnicas muito específicas; sugerimos iniciar pela matriz de ${top.label} ou escolher manualmente entre as 40 áreas.`,
  };
}
