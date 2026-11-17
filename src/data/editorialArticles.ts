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
  external?: boolean;
}

export interface EditorialArticle {
  slug: string;
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
  externalSources?: EditorialLink[];
}

export const EDITORIAL_ARTICLES: Record<string, EditorialArticle> = {
  'pdi-e-curriculo': {
    slug: '/pdi-e-curriculo',
    seoTitle: 'PDI não é currículo: qual é a diferença? - Meu PDI',
    metaDescription:
      'Entenda a diferença entre Plano de Desenvolvimento Individual (PDI) e currículo, quando usar cada um e como transformar evolução em evidências.',
    kicker: 'Fundamentos de Carreira',
    h1: 'PDI não é currículo: qual é a diferença na prática?',
    directAnswer:
      'O PDI (Plano de Desenvolvimento Individual) organiza o que você precisa aprender, entregar e comprovar nos próximos meses. Já o currículo resume experiências, formações e resultados que você já construiu. No Meu PDI, o currículo de competências nasce como consequência do desenvolvimento, e não o contrário.',
    intro:
      'Muita gente confunde o Plano de Desenvolvimento Individual com um currículo ampliado ou um portfólio pronto para vagas. Essa confusão faz o plano perder utilidade: em vez de orientar escolhas reais de crescimento, ele vira uma vitrine estática. Separar os dois papéis torna seu ciclo mais objetivo e fortalece o que você mostra ao mercado.',
    publishedAt: '2026-11-17',
    updatedAt: '2026-11-17',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'papel-de-cada-documento',
        title: 'Qual é o papel do PDI e qual é o papel do currículo?',
        paragraphs: [
          'O PDI é um instrumento prospectivo e privado por padrão. Ele parte de um diagnóstico honesto das suas lacunas atuais (hard skills e soft skills), define objetivos claros para um ciclo de 3 a 6 meses e desdobra ações com prazos, recursos e critérios de evidência.',
          'O currículo é um documento retrospectivo e público para processos seletivos ou avaliações. Ele seleciona apenas o que já foi consolidado e validado para comunicar valor rapidamente a recrutadores, gestores ou clientes.',
        ],
        bullets: [
          'PDI: olha para frente, inclui fragilidades, riscos, forças restritivas e plano de ação.',
          'Currículo: olha para trás, destaca competências consolidadas, entregas e indicadores.',
          'Perfil compartilhável no Meu PDI: ponte opcional que expõe apenas competências e evidências autorizadas por você.',
        ],
      },
      {
        id: 'como-o-pdi-alimenta-o-curriculo',
        title: 'Como o desenvolvimento estruturado gera evidências para o currículo',
        paragraphs: [
          'Quando você executa uma ação de desenvolvimento e registra uma ficha de evidência (Situação, Ação, Resultado e Indicador), deixa de depender de autodescrições genéricas como "boa comunicação" ou "domínio de dados".',
          'Ao final de um ciclo, as competências que subiram de nível e os projetos concluídos podem ser exportados em PDF ou compartilhados seletivamente com RH e recrutadores, mantendo seu diário pessoal e suas dificuldades fora da visão externa.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: de lacuna no PDI a evidência no currículo (dados fictícios)',
          situacaoAtual: 'Analista de Marketing Pleno com nível 2/5 em Análise de Coorte e Retenção e nível 4/5 como alvo.',
          objetivo: 'Reduzir o churn de clientes nos primeiros 60 dias por meio de análise de coorte mensal.',
          acao: 'Construir painel de retenção por safra em SQL/BI e revisar fluxo de onboarding com Customer Success.',
          prazo: '90 dias (ciclo trimestral)',
          evidencia: 'Painel publicado + redução documentada de 18% para 12% no churn inicial em 2 meses, validada pela liderança.',
        },
      },
      {
        id: 'quando-usar-cada-um',
        title: 'Quando usar o PDI, o currículo ou os dois juntos',
        paragraphs: [
          'Use o PDI semanalmente para acompanhar ações, registrar aprendizados no diário de progresso e preparar conversas 1:1. Atualize seu currículo ou perfil compartilhável quando concluir entregas relevantes ou iniciar uma movimentação de carreira.',
        ],
        bullets: [
          'Em ciclos de avaliação de desempenho e 1:1: leve seu PDI e as evidências do ciclo.',
          'Em candidaturas externas: envie o currículo focado nos requisitos da vaga.',
          'Em processos internos de promoção ou mobilidade: combine o histórico de evolução do PDI com o currículo de competências.',
        ],
      },
    ],
    checklist: [
      'Manter o diagnóstico de fraquezas e o diário pessoal privados no PDI.',
      'Vincular cada objetivo a ações com prazo e entrega verificável, não apenas cursos.',
      'Registrar Situação, Ação, Resultado e Indicador ao concluir marcos importantes.',
      'Exportar ou compartilhar apenas competências e evidências coerentes com seu próximo passo.',
    ],
    commonErrors: [
      'Colocar no currículo competências em que você ainda está no nível inicial sem comprovação.',
      'Transformar o PDI em uma lista de palavras-chave para impressionar o gestor, escondendo lacunas reais.',
      'Compartilhar anotações pessoais ou restrições internas de equipe em links públicos para recrutadores.',
    ],
    faqs: [
      {
        q: 'Posso usar o Meu PDI apenas para gerar currículo?',
        a: 'Você pode exportar um currículo de competências em PDF, mas o principal ganho da plataforma está no processo anterior: diagnosticar lacunas em 40 áreas profissionais, planejar ações com prazo e registrar evidências verificáveis ao longo do ciclo.',
      },
      {
        q: 'Meu diário pessoal aparece quando compartilho meu perfil?',
        a: 'Não por padrão. No Meu PDI, o diário pessoal e as forças restritivas ficam privados. Ao gerar um link compartilhável, você escolhe o nível de visibilidade, validade, senha opcional e exatamente quais competências deseja exibir.',
      },
      {
        q: 'Qual é a diferença entre PDI e portfólio?',
        a: 'O portfólio reúne amostras de trabalhos prontos (projetos, códigos, campanhas). O PDI é o plano de trabalho que define quais competências você vai desenvolver primeiro para construir entregas de maior impacto.',
      },
      {
        q: 'Com que frequência devo atualizar meu PDI e meu currículo?',
        a: 'O PDI funciona melhor com check-ins semanais ou quinzenais e revisão formal a cada 3 a 6 meses. O currículo pode ser atualizado ao final de cada ciclo ou entrega de destaque.',
      },
    ],
    relatedLinks: [
      { label: 'O que é PDI? Guia completo', to: '/o-que-e-pdi' },
      { label: 'Como fazer um PDI em 5 passos', to: '/como-fazer-um-pdi' },
      { label: 'Ver exemplo de PDI preenchido', to: '/exemplo' },
      { label: 'PDI ou PDP: qual termo usar?', to: '/pdi-ou-pdp' },
    ],
  },

  'hard-skills-e-soft-skills': {
    slug: '/hard-skills-e-soft-skills',
    seoTitle: 'Hard skills e soft skills: como avaliar seu nível - Meu PDI',
    metaDescription:
      'Aprenda como avaliar hard skills e soft skills por senioridade com critérios observáveis e transforme autoavaliação em evidências no seu PDI.',
    kicker: 'Matriz de Competências',
    h1: 'Hard skills e soft skills: como avaliar seu nível atual com critérios observáveis',
    directAnswer:
      'Hard skills são conhecimentos técnicos mensuráveis de uma área, enquanto soft skills são comportamentos de comunicação, decisão e colaboração. Avaliar seu nível exige comparar o que você entrega com a expectativa da sua senioridade e registrar evidências concretas, evitando notas baseadas apenas em autopercepção.',
    intro:
      'Muitos planos de desenvolvimento falham logo na largada porque a autoavaliação é vaga. Dizer "tenho 4/5 em liderança" ou "preciso melhorar comunicação" não orienta o que estudar nem o que praticar amanhã. Quando você cruza competências técnicas e comportamentais por nível de carreira, o gap fica claro.',
    publishedAt: '2026-11-17',
    updatedAt: '2026-11-17',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'diferenca-pratica',
        title: 'Como diferenciar hard skills e soft skills no plano de desenvolvimento',
        paragraphs: [
          'Hard skills variam conforme a área profissional e especialidade — como SQL e modelagem em Ciência de Dados, Lean Manufacturing na Indústria ou Gestão de Contratos no Setor Público. Já as soft skills aparecem no modo como você aplica a técnica no contexto da equipe.',
          'No Meu PDI, a matriz de 40 áreas profissionais organiza hard skills e expectativas para seis níveis: Estagiário, Júnior, Pleno, Sênior, Especialista e Liderança/Gestor, além de competências comportamentais por contexto de desafio.',
        ],
      },
      {
        id: 'regua-de-proficiencia',
        title: 'Régua prática de 1 a 5 para avaliar proficiência sem autoengano',
        paragraphs: [
          'Para evitar inflar ou subestimar sua nota, use critérios de autonomia e impacto:',
        ],
        bullets: [
          'Nível 1 (Iniciante): conhece conceitos básicos, precisa de orientação constante para executar.',
          'Nível 2 (Em desenvolvimento): executa tarefas conhecidas com supervisão ou apoio de checklist.',
          'Nível 3 (Autônomo): entrega demandas do dia a dia com qualidade e resolve problemas recorrentes.',
          'Nível 4 (Referência no time): lida com cenários complexos, previne riscos e apoia pares.',
          'Nível 5 (Multiplicador / Estratégico): define padrões, forma outras pessoas e gera impacto mensurável no negócio.',
        ],
      },
      {
        id: 'sair-da-opiniao-para-evidencia',
        title: 'Como sair de "sou bom em comunicação" para evidências observáveis',
        paragraphs: [
          'Em competências comportamentais, associe a habilidade a um contexto real de desafio: influência sem autoridade, negociação, gestão de conflitos, comunicação executiva ou tomada de decisão sob pressão.',
          'Sempre que marcar uma competência em nível 4 ou 5, preencha uma ficha de evidência com Situação, Ação, Resultado, Indicador e quem pode validar aquela entrega (gestor, mentor ou colega).',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: transformando soft skill em evidência (dados fictícios)',
          situacaoAtual: 'Especialista de Produto avaliado com nível 3/5 em Influência sem Autoridade e nível-alvo 4/5.',
          objetivo: 'Alinhar roadmap de integrações entre Engenharia, Jurídico e Comercial sem atrasos no trimestre.',
          acao: 'Conduzir rito quinzenal de alinhamento com matriz de riscos e critérios compartilhados de priorização.',
          prazo: '60 dias',
          evidencia: 'Aprovação de 3 entregas regulatórias no prazo, registrada em ata e validada pela diretoria de Produto.',
        },
      },
    ],
    checklist: [
      'Definir área principal, especialidade e nível de carreira antes de dar notas.',
      'Evitar definir nível-alvo abaixo do nível atual de proficiência.',
      'Selecionar de 2 a 4 competências comportamentais ligadas aos desafios do próximo ciclo.',
      'Registrar ao menos uma evidência verificável para cada competência avaliada em nível 4 ou 5.',
    ],
    commonErrors: [
      'Avaliar todas as competências com nota máxima no nível-alvo, criando um plano impossível de executar.',
      'Tratar soft skills como traços de personalidade fixos em vez de comportamentos treináveis.',
      'Ignorar a mudança de expectativa entre Pleno e Sênior (foco passa de execução individual para multiplicação e decisão).',
    ],
    faqs: [
      {
        q: 'Devo focar mais em hard skills ou soft skills no meu PDI?',
        a: 'Em início de carreira (Estagiário e Júnior), hard skills costumam ter peso maior para garantir autonomia técnica. A partir de Pleno, Sênior e Liderança, lacunas de comunicação executiva, influência e priorização passam a ser decisivas.',
      },
      {
        q: 'Quantas lacunas devo priorizar por ciclo?',
        a: 'O ideal é escolher de 2 a 4 competências prioritárias por ciclo de 3 a 6 meses. Tentar fechar 10 lacunas ao mesmo tempo dilui tempo e energia e reduz a taxa de conclusão.',
      },
      {
        q: 'Como saber se minha autoavaliação está calibrada?',
        a: 'Compare sua percepção com feedbacks recentes de 1:1, resultados entregues e critérios da matriz da sua área. Se você não consegue citar uma situação concreta recente para uma nota 4 ou 5, provavelmente o nível ainda está em consolidação.',
      },
      {
        q: 'O que fazer quando atuo em uma área híbrida?',
        a: 'Defina uma área principal e adicione até três áreas complementares — por exemplo, Marketing + Ciência de Dados ou Saúde + Tecnologia — e utilize o catálogo de competências transferíveis para aproveitar o que você já domina.',
      },
    ],
    relatedLinks: [
      { label: 'Como fazer um PDI em 5 passos', to: '/como-fazer-um-pdi' },
      { label: 'PDI não é currículo: qual é a diferença?', to: '/pdi-e-curriculo' },
      { label: 'Cursos e credenciais gratuitas por área', to: '/certificacoes-gratuitas' },
      { label: 'Glossário de desenvolvimento profissional', to: '/glossario' },
    ],
  },

  'pdi-ou-pdp': {
    slug: '/pdi-ou-pdp',
    seoTitle: 'PDI ou PDP: qual termo usar e qual é a diferença? - Meu PDI',
    metaDescription:
      'Compare PDI (Plano de Desenvolvimento Individual) e PDP (Plano de Desenvolvimento Profissional/Pessoal) e veja como estruturar ambos na prática.',
    kicker: 'RH e Carreira',
    h1: 'PDI ou PDP: qual termo usar e qual é a diferença?',
    directAnswer:
      'PDI significa Plano de Desenvolvimento Individual e PDP significa Plano de Desenvolvimento Profissional ou Pessoal. Na prática, muitas empresas usam os termos como sinônimos, mas o PDI costuma enfatizar a jornada completa de carreira do profissional, enquanto o PDP é frequentemente ligado às metas de desempenho do ciclo corporativo atual.',
    intro:
      'Se você trabalha com RH, liderança ou está preenchendo um formulário de avaliação na sua empresa, provavelmente já encontrou as duas siglas. Entender a nuance entre PDI e PDP evita ruídos entre metas de curto prazo do negócio e ambições de longo prazo do profissional.',
    publishedAt: '2026-11-17',
    updatedAt: '2026-11-17',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'comparacao-pdi-pdp',
        title: 'Diferenças práticas entre PDI e PDP nas empresas',
        paragraphs: [
          'Embora a estrutura técnica seja muito semelhante — competências atuais, objetivos, ações, prazos e acompanhamento — a ênfase costuma mudar conforme quem conduz o processo.',
        ],
        bullets: [
          'PDI (Plano de Desenvolvimento Individual): foca no protagonismo do profissional, cobrindo competências da função atual, próximos passos de senioridade e até transição de área.',
          'PDP (Plano de Desenvolvimento Profissional / Pessoal): costuma ser adotado em ciclos de RH para conectar lacunas identificadas na avaliação de desempenho às entregas do semestre.',
          'Na prática: um bom plano integra as duas visões, garantindo valor tanto para o trabalho atual quanto para a carreira de médio prazo.',
        ],
      },
      {
        id: 'como-estruturar-para-rh-e-colaborador',
        title: 'Como evitar que o PDI ou PDP vire um formulário esquecido',
        paragraphs: [
          'O motivo número um de abandono não é a sigla escolhida, mas a desconexão com a rotina: objetivos genéricos, ausência de prazos reais e falta de espaço para registrar evidências entre uma avaliação anual e outra.',
          'No Meu PDI, o colaborador mantém a propriedade dos seus dados e escolhe o que compartilhar com gestor ou RH, permitindo que conversas 1:1 aconteçam sobre fatos e entregas concretas.',
        ],
      },
    ],
    checklist: [
      'Alinhar expectativas da empresa e objetivos pessoais em um único ciclo de 3 a 6 meses.',
      'Equilibrar ações de entrega no trabalho (70%), trocas/mentorias (20%) e cursos (10%).',
      'Definir como cada ação será comprovada antes de iniciar o ciclo.',
      'Respeitar a privacidade do titular ao compartilhar progresso com RH e liderança.',
    ],
    commonErrors: [
      'Tratar o PDP apenas como punição ou plano corretivo para quem foi mal avaliado.',
      'Criar dois documentos paralelos que competem por tempo e nunca são revisados.',
      'Exigir acesso ao diário pessoal do colaborador em vez de acompanhar apenas objetivos e evidências acordadas.',
    ],
    faqs: [
      {
        q: 'Qual sigla é mais buscada e usada no Brasil?',
        a: 'No Brasil, PDI (Plano de Desenvolvimento Individual) é o termo mais difundido entre profissionais, lideranças e áreas de Recursos Humanos, enquanto PDP aparece com frequência em empresas multinacionais ou modelos de gestão de pessoas.',
      },
      {
        q: 'Posso usar o Meu PDI se minha empresa chama de PDP?',
        a: 'Sim. A estrutura de diagnóstico de competências, objetivos, plano de ação, evidências e revisão de ciclo atende integralmente tanto modelos chamados de PDI quanto de PDP.',
      },
      {
        q: 'O RH precisa ter acesso irrestrito ao plano individual?',
        a: 'Não. A boa prática de privacidade e LGPD é permitir que o profissional controle o compartilhamento de competências e ciclos com RH ou gestor, mantendo reflexões íntimas no diário privado.',
      },
      {
        q: 'Qual a duração recomendada de um ciclo de PDI ou PDP?',
        a: 'Ciclos de 90 a 180 dias (trimestrais ou semestrais) funcionam melhor porque permitem concluir ações práticas, coletar evidências e recalibrar metas antes que o contexto do negócio mude.',
      },
    ],
    relatedLinks: [
      { label: 'O que é PDI? Guia completo', to: '/o-que-e-pdi' },
      { label: 'Solução Meu PDI para RH e gestores', to: '/para-rh' },
      { label: 'PDI não é currículo: qual é a diferença?', to: '/pdi-e-curriculo' },
      { label: 'Como fazer um PDI em 5 passos', to: '/como-fazer-um-pdi' },
    ],
  },

  glossario: {
    slug: '/glossario',
    seoTitle: 'Glossário de Desenvolvimento Profissional e PDI - Meu PDI',
    metaDescription:
      'Definições diretas de PDI, PDP, hard skills, soft skills, skill gap, senioridade, evidência, 1:1, onboarding e ciclo de desenvolvimento.',
    kicker: 'Referência Rápida',
    h1: 'Glossário de desenvolvimento profissional: termos essenciais do PDI',
    directAnswer:
      'Este glossário define os conceitos centrais usados no planejamento de carreira e gestão de pessoas — incluindo PDI, PDP, competências, skill gap, senioridade, evidência verificável, reunião 1:1, onboarding e ciclo de desenvolvimento — com critérios práticos de aplicação.',
    intro:
      'Padronizar a linguagem entre profissionais, gestores e RH evita mal-entendidos sobre metas, avaliações e planos de crescimento. Abaixo estão as definições objetivas adotadas na plataforma Meu PDI.',
    publishedAt: '2026-11-17',
    updatedAt: '2026-11-17',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'termos-de-planejamento',
        title: 'Planejamento: PDI, PDP, Ciclo e Objetivo',
        paragraphs: [
          'PDI (Plano de Desenvolvimento Individual): plano estruturado que mapeia competências atuais, metas de evolução, ações com prazo e evidências de progresso.',
          'PDP (Plano de Desenvolvimento Profissional): termo frequentemente usado em contextos corporativos como equivalente ao PDI, com foco em lacunas ligadas ao ciclo de desempenho.',
          'Ciclo de desenvolvimento: janela definida (geralmente 3 a 6 meses) em que objetivos são executados, acompanhados e revisados antes de iniciar uma nova etapa.',
        ],
      },
      {
        id: 'termos-de-competencias',
        title: 'Competências: Hard Skills, Soft Skills, Skill Gap e Senioridade',
        paragraphs: [
          'Hard skills: conhecimentos e habilidades técnicas específicas de uma área profissional, avaliáveis por entregas, projetos ou testes.',
          'Soft skills: competências comportamentais e relacionais (comunicação, negociação, inteligência emocional, liderança) observáveis em situações de trabalho.',
          'Skill gap (lacuna de competência): diferença entre o nível atual de proficiência e o nível-alvo exigido para a função atual ou próxima posição.',
          'Senioridade: estágio de autonomia, complexidade e impacto esperado (Estagiário, Júnior, Pleno, Sênior, Especialista e Liderança/Gestor).',
        ],
      },
      {
        id: 'termos-de-acompanhamento',
        title: 'Acompanhamento: Evidência, 1:1 e Onboarding',
        paragraphs: [
          'Evidência profissional: registro verificável que comprova evolução em uma competência, contendo situação, ação realizada, resultado, indicador e validação por gestor, mentor ou colega.',
          'Reunião 1:1 (one-on-one): conversa periódica individual entre liderança e profissional para acompanhar bloqueios, progresso do PDI e alinhamento de expectativas.',
          'Onboarding (30-60-90 dias): período estruturado de integração de novos colaboradores com metas iniciais de aprendizado, entrega e conexão com a equipe.',
        ],
      },
    ],
    checklist: [
      'Usar "nível de proficiência" para o domínio atual e "nível-alvo" para a meta.',
      'Diferenciar atividade (curso concluído) de resultado (impacto gerado).',
      'Registrar evidências logo após cada entrega relevante para não esquecer métricas.',
    ],
    commonErrors: [
      'Confundir carga horária de cursos com evolução real de competência.',
      'Usar "PDI" apenas como lista de desejos sem data nem critério de conclusão.',
    ],
    faqs: [
      {
        q: 'Qual é a diferença entre nível atual e nível-alvo?',
        a: 'Nível atual (ou nível de proficiência) indica o quanto você já domina e aplica uma competência hoje, de 1 a 5. Nível-alvo é o patamar que você deseja alcançar até o fim do ciclo, devendo ser igual ou superior ao nível atual.',
      },
      {
        q: 'O que caracteriza uma boa evidência de competência?',
        a: 'Uma evidência sólida responde qual era a situação ou desafio, qual ação você executou, qual resultado ou indicador foi atingido e quem pode validar aquela entrega (gestor, mentor ou par).',
      },
      {
        q: 'O que são competências transferíveis?',
        a: 'São habilidades já consolidadas em uma área (como análise de indicadores, gestão de projetos ou comunicação com clientes) que podem ser reaproveitadas ao migrar para outra área profissional.',
      },
      {
        q: 'Como funciona a saúde do plano no Meu PDI?',
        a: 'A saúde do plano avalia o equilíbrio estrutural do PDI: se todos os objetivos têm ações vinculadas, se as ações têm recursos definidos e se forças restritivas e alianças foram mapeadas.',
      },
    ],
    relatedLinks: [
      { label: 'O que é PDI? Guia completo', to: '/o-que-e-pdi' },
      { label: 'Hard skills e soft skills: como avaliar', to: '/hard-skills-e-soft-skills' },
      { label: 'PDI não é currículo', to: '/pdi-e-curriculo' },
      { label: 'Ver exemplo preenchido', to: '/exemplo' },
    ],
  },
};
