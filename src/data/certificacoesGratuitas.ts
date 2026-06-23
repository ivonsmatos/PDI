// Banco de certificações gratuitas — curado a partir do repositório
// github.com/ArslanYM/Free-Certifications (lista comunitária open source).
// Cada item é mapeado para uma ou mais áreas da matrizDeCompetencias e recebe
// keywords para casar com nomes de hard skills durante a geração da Trilha.

export type Certificacao = {
  nome: string;
  provedor: string;
  url: string;
  /** Chaves de matrizDeCompetencias em que faz sentido sugerir esta certificação */
  areas: string[];
  /** Termos (lowercase) para casar contra nomes de hard skills */
  keywords: string[];
};

export type GrupoCertificacao = {
  categoria: string;
  emoji: string;
  certificacoes: Certificacao[];
};

export const CERTIFICACOES_GRATUITAS: GrupoCertificacao[] = [
  {
    categoria: 'Plataformas Brasileiras (cursos + certificado)',
    emoji: '🇧🇷',
    certificacoes: [
      { nome: 'Escola Virtual — Fundação Bradesco', provedor: 'Fundação Bradesco', url: 'https://www.ev.org.br/', areas: ['tecnologia', 'administracao', 'financas', 'contabilidade', 'marketing', 'vendas', 'recursos_humanos', 'gestao', 'logistica_supply_chain', 'comunicacao_relacoes_publicas', 'educacao', 'design'], keywords: ['excel', 'finanças', 'administração', 'gestão', 'marketing', 'vendas', 'informática', 'lógica de programação', 'comunicação', 'liderança'] },
      { nome: 'Santander Open Academy', provedor: 'Santander', url: 'https://www.santanderopenacademy.com/pt_br/index.html', areas: ['tecnologia', 'administracao', 'financas', 'marketing', 'vendas', 'gestao', 'recursos_humanos', 'inovacao_transformacao_digital', 'ciencia_de_dados', 'comunicacao_relacoes_publicas'], keywords: ['negócios', 'liderança', 'dados', 'tecnologia', 'soft skills', 'idiomas', 'gestão', 'finanças'] },
      { nome: 'SEBRAE — Cursos para Empreendedores', provedor: 'SEBRAE', url: 'https://sebrae.com.br/sites/PortalSebrae/cursosonline', areas: ['administracao', 'gestao', 'marketing', 'vendas', 'financas', 'varejo', 'agronegocio', 'inovacao_transformacao_digital', 'logistica_supply_chain', 'compras_procurement'], keywords: ['empreendedorismo', 'negócios', 'gestão', 'finanças', 'marketing', 'vendas', 'plano de negócio', 'mei'] },
      { nome: 'FGV — Cursos Gratuitos Online', provedor: 'Fundação Getulio Vargas', url: 'https://educacao-executiva.fgv.br/cursos/gratuitos-online', areas: ['administracao', 'gestao', 'financas', 'contabilidade', 'direito', 'gestao_de_produto', 'recursos_humanos', 'marketing', 'sustentabilidade_esg'], keywords: ['gestão', 'finanças', 'administração', 'economia', 'direito', 'estratégia', 'liderança', 'projetos'] },
    ],
  },
  {
    categoria: 'Cloud & Infraestrutura',
    emoji: '☁️',
    certificacoes: [
      { nome: 'AZ-900: Azure Fundamentals', provedor: 'Microsoft', url: 'https://www.microsoft.com/en-ie/training-days#azure', areas: ['tecnologia', 'devops_infraestrutura'], keywords: ['cloud', 'azure', 'fundamentos de cloud'] },
      { nome: 'AWS Cloud Quest: Cloud Practitioner', provedor: 'AWS', url: 'https://explore.skillbuilder.aws/learn/course/11458/aws-cloud-quest-cloud-practitioner', areas: ['tecnologia', 'devops_infraestrutura'], keywords: ['cloud', 'aws', 'fundamentos de cloud'] },
      { nome: 'AWS re/Start Program', provedor: 'AWS', url: 'https://aws.amazon.com/training/restart/', areas: ['devops_infraestrutura', 'tecnologia'], keywords: ['cloud', 'aws', 'iaas'] },
      { nome: 'OCI 2022 Foundations Associate', provedor: 'Oracle', url: 'https://education.oracle.com/oracle-cloud-infrastructure-2022-foundations-associate/pexam_1Z0-1085-22', areas: ['devops_infraestrutura', 'tecnologia'], keywords: ['cloud', 'oracle', 'infraestrutura'] },
      { nome: 'Google Cloud — 30 dias Qwiklabs', provedor: 'Google Cloud', url: 'https://go.qwiklabs.com/googlecloudsolutions', areas: ['tecnologia', 'devops_infraestrutura'], keywords: ['cloud', 'gcp', 'google cloud'] },
      { nome: 'Azure DevOps Expert Certification', provedor: 'Microsoft', url: 'https://learn.microsoft.com/en-us/training/challenges?id=909beffb-ac11-414a-9287-a4158b5d6cf9', areas: ['devops_infraestrutura'], keywords: ['ci/cd', 'pipeline', 'devops', 'azure'] },
    ],
  },
  {
    categoria: 'DevOps, Kubernetes & Observabilidade',
    emoji: '⚙️',
    certificacoes: [
      { nome: 'Linux Foundation — 23 cursos gratuitos', provedor: 'The Linux Foundation', url: 'https://training.linuxfoundation.org/resources/?_sft_content_type=free-course', areas: ['devops_infraestrutura', 'tecnologia'], keywords: ['linux', 'terminal', 'kubernetes', 'container'] },
      { nome: 'GitOps Fundamentals (Argo)', provedor: 'Codefresh', url: 'https://codefresh.io/codefresh-news/get-gitops-certified-with-argo/', areas: ['devops_infraestrutura'], keywords: ['gitops', 'argocd', 'ci/cd', 'kubernetes'] },
      { nome: 'Kubernetes Training', provedor: 'Kasten by Veeam', url: 'https://learning.kasten.io/', areas: ['devops_infraestrutura'], keywords: ['kubernetes', 'container', 'k8s'] },
      { nome: 'Getting Started with Cilium', provedor: 'Isovalent', url: 'https://isovalent.com/labs/getting-started-with-cilium/', areas: ['devops_infraestrutura'], keywords: ['kubernetes', 'service mesh', 'redes', 'observabilidade'] },
      { nome: 'New Relic Full Stack Observability', provedor: 'New Relic', url: 'https://learn.newrelic.com/full-stack-observability-exam', areas: ['devops_infraestrutura', 'tecnologia'], keywords: ['observabilidade', 'logs', 'monitoramento'] },
      { nome: 'Elastic Stack — acesso gratuito', provedor: 'Elastic', url: 'https://www.elastic.co/training/free', areas: ['devops_infraestrutura', 'ciencia_de_dados'], keywords: ['observabilidade', 'logs', 'elastic', 'monitoramento'] },
      { nome: 'Gremlin Chaos Engineering Practitioner', provedor: 'Gremlin', url: 'https://gremlin.coassemble.com/unlock/7Jan8Su#/', areas: ['devops_infraestrutura'], keywords: ['chaos', 'sre', 'resiliência', 'disaster recovery'] },
    ],
  },
  {
    categoria: 'Programação & Desenvolvimento',
    emoji: '💻',
    certificacoes: [
      { nome: 'freeCodeCamp — Certificações', provedor: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', areas: ['tecnologia'], keywords: ['html', 'css', 'javascript', 'frameworks', 'react', 'node', 'apis'] },
      { nome: 'JetBrains Academy (Java, Kotlin, Python)', provedor: 'JetBrains', url: 'https://www.jetbrains.com/academy/', areas: ['tecnologia'], keywords: ['java', 'kotlin', 'python', 'lógica de programação'] },
      { nome: 'Apollo Graph Developer Associate', provedor: 'Apollo', url: 'https://odyssey.apollographql.com/certifications/apollo-graph-associate', areas: ['tecnologia'], keywords: ['graphql', 'apis', 'api rest'] },
      { nome: 'Selenium Advanced Certification', provedor: 'LambdaTest', url: 'https://www.lambdatest.com/certifications/', areas: ['qualidade_qa', 'tecnologia'], keywords: ['selenium', 'testes automatizados', 'automação'] },
    ],
  },
  {
    categoria: 'Segurança da Informação',
    emoji: '🔒',
    certificacoes: [
      { nome: 'Introduction to Cybersecurity', provedor: 'Cisco Networking Academy', url: 'https://www.netacad.com/courses/cybersecurity/introduction-cybersecurity', areas: ['seguranca_informacao'], keywords: ['segurança', 'cybersecurity', 'fundamentos de segurança'] },
      { nome: 'ISO/IEC 27001 Information Security Associate', provedor: 'SkillFront', url: 'https://www.skillfront.com/ISO-IEC-27001-Information-Security-Associate', areas: ['seguranca_informacao'], keywords: ['iso 27001', 'compliance', 'políticas de segurança'] },
      { nome: 'SC-900: Security, Compliance & Identity', provedor: 'Microsoft', url: 'https://www.microsoft.com/en-ie/training-days#security', areas: ['seguranca_informacao'], keywords: ['segurança', 'compliance', 'identidade', 'azure'] },
      { nome: 'Fortinet — Cursos de Segurança gratuitos', provedor: 'Fortinet', url: 'https://www.fortinet.com/training/cybersecurity-professionals', areas: ['seguranca_informacao', 'devops_infraestrutura'], keywords: ['firewall', 'redes', 'segurança de rede'] },
    ],
  },
  {
    categoria: 'Dados, BI & Inteligência Artificial',
    emoji: '📊',
    certificacoes: [
      { nome: 'Kaggle — 17 cursos de Data Science', provedor: 'Kaggle', url: 'https://www.kaggle.com/learn', areas: ['ciencia_de_dados', 'tecnologia'], keywords: ['python', 'machine learning', 'dados', 'pandas', 'sql'] },
      { nome: 'Deep Learning Specialization', provedor: 'DeepLearning.AI', url: 'https://www.coursera.org/specializations/deep-learning', areas: ['ciencia_de_dados', 'tecnologia'], keywords: ['machine learning', 'deep learning', 'ia', 'redes neurais'] },
      { nome: 'IBM Cognitive Class — Data Science', provedor: 'IBM', url: 'https://cognitiveclass.ai/', areas: ['ciencia_de_dados'], keywords: ['data science', 'dados', 'python', 'sql'] },
      { nome: 'DP-900: Azure Data Fundamentals', provedor: 'Microsoft', url: 'https://www.microsoft.com/en-ie/training-days#azure', areas: ['ciencia_de_dados', 'devops_infraestrutura'], keywords: ['dados', 'banco de dados', 'sql', 'azure'] },
      { nome: 'AI-900: Azure AI Fundamentals', provedor: 'Microsoft', url: 'https://www.microsoft.com/en-ie/training-days#azure', areas: ['ciencia_de_dados', 'inovacao_transformacao_digital'], keywords: ['ia', 'machine learning', 'inteligência artificial'] },
      { nome: 'Google Analytics Academy', provedor: 'Google', url: 'https://analytics.google.com/analytics/academy/', areas: ['ciencia_de_dados', 'marketing'], keywords: ['analytics', 'métricas', 'dados', 'analytics web'] },
      { nome: 'MongoDB University — 12 cursos', provedor: 'MongoDB', url: 'https://learn.mongodb.com/', areas: ['tecnologia', 'ciencia_de_dados'], keywords: ['mongodb', 'banco de dados', 'nosql', 'sql'] },
      { nome: 'Redis Certified Developer', provedor: 'Redis', url: 'https://redis.io/university/', areas: ['tecnologia', 'devops_infraestrutura'], keywords: ['redis', 'banco de dados', 'cache'] },
    ],
  },
  {
    categoria: 'Gestão de Projetos & Ágil',
    emoji: '📋',
    certificacoes: [
      { nome: 'Scrum Foundations Professional (SFPC)', provedor: 'CertiProf', url: 'https://certiprof.com/pages/scrum-foundations-professional-certificate-sfpc-english', areas: ['gestao_de_produto', 'gestao', 'administracao', 'tecnologia'], keywords: ['scrum', 'ágil', 'gestão de projetos', 'kanban'] },
      { nome: 'Six Sigma White Belt', provedor: 'Six Sigma Online', url: 'https://www.sixsigmaonline.org/six-sigma-white-belt-certification/', areas: ['gestao', 'administracao', 'logistica_supply_chain'], keywords: ['six sigma', 'processos', 'qualidade', 'lean'] },
      { nome: 'Scrum Fundamentals Certified (SFC)', provedor: 'ScrumStudy', url: 'https://www.scrumstudy.com/certification/scrum-fundamentals-certified', areas: ['gestao_de_produto', 'tecnologia', 'gestao'], keywords: ['scrum', 'ágil', 'agile'] },
      { nome: 'Project Management Essentials (PMEC)', provedor: 'MSI Certified', url: 'https://www.msicertified.com/free-project-management-certification.html', areas: ['gestao', 'administracao', 'gestao_de_produto'], keywords: ['gestão de projetos', 'project management', 'pmo'] },
      { nome: 'Business Intelligence Foundation (BIFPC)', provedor: 'CertiProf', url: 'https://certiprof.com/pages/business-intelligence-foundation-professional-certification-bifpc', areas: ['ciencia_de_dados', 'gestao', 'administracao'], keywords: ['bi', 'business intelligence', 'dados', 'métricas'] },
    ],
  },
  {
    categoria: 'Marketing & Vendas',
    emoji: '📣',
    certificacoes: [
      { nome: 'Fundamentos de Marketing Digital', provedor: 'Google', url: 'https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing', areas: ['marketing', 'vendas', 'comunicacao_relacoes_publicas'], keywords: ['marketing digital', 'seo', 'marketing', 'anúncios'] },
      { nome: 'HubSpot Academy — Marketing & Vendas', provedor: 'HubSpot', url: 'https://academy.hubspot.com/courses', areas: ['marketing', 'vendas', 'customer_success'], keywords: ['inbound', 'marketing', 'vendas', 'crm', 'funil'] },
      { nome: 'SEMrush — Marketing Digital', provedor: 'SEMrush', url: 'https://www.semrush.com/academy/', areas: ['marketing'], keywords: ['seo', 'sem', 'marketing digital', 'conteúdo'] },
      { nome: 'Microsoft Advertising Certified', provedor: 'Microsoft', url: 'https://about.ads.microsoft.com/en-us/resources/training/get-certified', areas: ['marketing', 'vendas'], keywords: ['ads', 'mídia paga', 'anúncios'] },
      { nome: 'Facebook & Instagram Marketing', provedor: 'DMAC', url: 'https://www.yourdmac.com/free-online-social-media-marketing-course', areas: ['marketing', 'comunicacao_relacoes_publicas'], keywords: ['social media', 'redes sociais', 'marketing'] },
    ],
  },
  {
    categoria: 'Negócios, RH & Colaboração',
    emoji: '🤝',
    certificacoes: [
      { nome: 'Remote Work & Virtual Collaboration', provedor: 'CertiProf', url: 'https://certiprof.com/pages/remote-work-and-virtual-collaboration-certificate-rwvcpc', areas: ['recursos_humanos', 'gestao', 'administracao', 'comunicacao_relacoes_publicas'], keywords: ['trabalho remoto', 'colaboração', 'comunicação'] },
      { nome: 'Business Model Canvas Essentials', provedor: 'CertiProf', url: 'https://certiprof.com/pages/business-model-canvas-essentials-bmce', areas: ['administracao', 'inovacao_transformacao_digital', 'gestao'], keywords: ['modelo de negócio', 'estratégia', 'canvas', 'empreendedorismo'] },
      { nome: 'Foundations of Business & Entrepreneurship', provedor: 'SkillFront', url: 'https://www.skillfront.com/Free-Business-Entrepreneurship-Program-Certification', areas: ['administracao', 'inovacao_transformacao_digital', 'gestao'], keywords: ['empreendedorismo', 'negócios', 'estratégia'] },
      { nome: 'Salesforce — Trailhead', provedor: 'Salesforce', url: 'https://trailhead.salesforce.com/en/home', areas: ['vendas', 'customer_success', 'marketing', 'tecnologia'], keywords: ['salesforce', 'crm', 'vendas'] },
      { nome: 'Slack — Skill Learning Paths', provedor: 'Slack', url: 'https://www.slackcertified.com/page/slack-skills', areas: ['administracao', 'comunicacao_relacoes_publicas', 'recursos_humanos'], keywords: ['colaboração', 'comunicação', 'ferramentas'] },
      { nome: 'Miro Essentials', provedor: 'Miro', url: 'https://academy.miro.com/learning-paths/miro-essentials', areas: ['gestao_de_produto', 'design', 'inovacao_transformacao_digital'], keywords: ['facilitação', 'colaboração', 'workshop', 'diagramas'] },
    ],
  },
];

/** Total de certificações no banco */
export const TOTAL_CERTIFICACOES = CERTIFICACOES_GRATUITAS.reduce(
  (acc, g) => acc + g.certificacoes.length,
  0,
);

/** Retorna as certificações relevantes para uma área de atuação */
export function getCertificacoesPorArea(area: string): Certificacao[] {
  if (!area) return [];
  return CERTIFICACOES_GRATUITAS.flatMap(g =>
    g.certificacoes.filter(c => c.areas.includes(area)),
  );
}

/**
 * Retorna certificações que casam com o nome de uma skill (keyword match).
 * Usado na Trilha e no Comparador para sugerir cert. específica do gap.
 */
export function getCertificacoesPorSkill(skill: string, area?: string): Certificacao[] {
  const s = skill.toLowerCase();
  return CERTIFICACOES_GRATUITAS.flatMap(g => g.certificacoes).filter(c => {
    const matchSkill = c.keywords.some(kw => s.includes(kw) || kw.includes(s));
    const matchArea = !area || c.areas.includes(area);
    return matchSkill && matchArea;
  });
}
