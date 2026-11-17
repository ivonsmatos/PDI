import type { EditorialArticle } from './types';

export const CLUSTER_SENIORIDADE: Record<string, Omit<EditorialArticle, 'publishedAt' | 'updatedAt'>> = {
  'pdi-primeiro-emprego': {
    slug: '/pdi-primeiro-emprego',
    cluster: 'Carreira e Senioridade',
    seoTitle: 'PDI para primeiro emprego: como montar o seu - Meu PDI',
    metaDescription:
      'Saiba como montar um PDI para primeiro emprego ou estágio, quais competências priorizar e como criar evidências práticas mesmo sem experiência prévia.',
    kicker: 'Início de Carreira',
    h1: 'PDI para primeiro emprego: competências, objetivos e ações para quem está começando',
    directAnswer:
      'Um PDI para primeiro emprego organiza o que você precisa dominar e comprovar antes da contratação: fundamentos técnicos da área escolhida, projetos práticos autorais e habilidades de comunicação e rotina profissional. Em vez de listar apenas cursos, ele foca em entregas reais que substituem a falta de histórico formal.',
    intro:
      'Quem busca a primeira oportunidade profissional costuma travar no dilema da experiência: as vagas pedem prática, mas você ainda não trabalhou na área. Estruturar um Plano de Desenvolvimento Individual resolve esse impasse ao transformar estudos soltos em um roteiro de 90 dias gerador de portfólio e evidências verificáveis.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'o-que-priorizar',
        title: 'Quais competências priorizar antes da primeira vaga',
        paragraphs: [
          'No nível Estagiário ou Aprendiz, recrutadores e gestores não esperam domínio estratégico avançado. Eles avaliam base técnica mínima, organização pessoal, capacidade de receber feedback e clareza ao comunicar dúvidas ou bloqueios.',
          'Escolha uma única área de atuação entre as 40 matrizes do Meu PDI e concentre energia nas 3 competências fundamentais do nível inicial.',
        ],
        bullets: [
          'Hard skills fundamentais: ferramentas essenciais do dia a dia da vaga pretendida.',
          'Autogestão: cumprir prazos combinados, documentar o que aprendeu e organizar tarefas.',
          'Comunicação objetiva: explicar como resolveu um problema e pedir ajuda com contexto.',
        ],
      },
      {
        id: 'como-gerar-evidencias-sem-emprego',
        title: 'Como criar evidências reais sem vínculo empregatício anterior',
        paragraphs: [
          'Evidência não exige carteira assinada. Projetos acadêmicos aplicados, simulações de problemas reais de empresas, trabalho voluntário estruturado ou automações pessoais funcionam como comprovação concreta.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: PDI de candidato a estágio em Dados (dados fictícios)',
          situacaoAtual: 'Estudante universitário com conhecimento básico de planilhas (2/5) e sem experiência em SQL (1/5).',
          objetivo: 'Construir portfólio prático de análise de dados para candidaturas de estágio em BI.',
          acao: 'Concluir trilha gratuita de SQL e publicar análise completa de dados abertos com painel interativo e resumo executivo.',
          prazo: '60 dias',
          evidencia: 'Repositório público documentado + dashboard publicado e revisado por um mentor da área.',
        },
      },
      {
        id: 'ritmo-semanal',
        title: 'Como manter consistência semanal até a contratação',
        paragraphs: [
          'Divida sua semana entre estudo dirigido (30%), construção prática de projetos (50%) e conexões com profissionais da área e candidaturas intencionais (20%). Registre cada avanço no diário de progresso para usar esses exemplos nas entrevistas.',
        ],
      },
    ],
    checklist: [
      'Definir uma área principal e o nível Estagiário/Aprendiz como referência.',
      'Selecionar no máximo 3 hard skills iniciais e 2 soft skills comportamentais.',
      'Vincular cada curso a uma entrega prática visível (projeto, estudo de caso ou texto técnico).',
      'Pedir revisão de pelo menos uma entrega para professor, mentor ou colega mais experiente.',
    ],
    commonErrors: [
      'Acumular dezenas de certificados introdutórios sem construir nenhum projeto aplicado.',
      'Atirar para cinco áreas profissionais diferentes ao mesmo tempo e não aprofundar nenhuma.',
      'Esquecer de documentar o raciocínio usado nos projetos para explicar em entrevistas.',
    ],
    faqs: [
      {
        q: 'Quem nunca trabalhou pode ter um PDI?',
        a: 'Sim. O PDI organiza a transição entre estudo e mercado, ajudando a identificar exatamente quais habilidades faltam para as vagas de entrada e quais projetos práticos construir.',
      },
      {
        q: 'Quantos objetivos devo colocar no PDI de primeiro emprego?',
        a: 'Mantenha de 2 a 3 objetivos em um ciclo de 60 a 90 dias: um focado em base técnica, um em projeto prático demonstrável e um em preparação para processos seletivos e networking.',
      },
      {
        q: 'Como apresentar meu PDI para recrutadores?',
        a: 'Você não precisa enviar o rascunho completo do plano. Use o Meu PDI para exportar seu currículo de competências ou gerar um link seletivo mostrando suas habilidades e projetos concluídos.',
      },
      {
        q: 'Vale incluir trabalho acadêmico como evidência?',
        a: 'Sim, desde que você descreva claramente o problema resolvido, sua ação individual, as ferramentas utilizadas e o resultado alcançado.',
      },
    ],
    relatedLinks: [
      { label: 'Como fazer um PDI em 5 passos', to: '/como-fazer-um-pdi' },
      { label: 'PDI para profissional Júnior', to: '/pdi-profissional-junior' },
      { label: 'Cursos e credenciais gratuitas', to: '/certificacoes-gratuitas' },
      { label: 'PDI não é currículo: entenda a diferença', to: '/pdi-e-curriculo' },
    ],
  },

  'pdi-profissional-junior': {
    slug: '/pdi-profissional-junior',
    cluster: 'Carreira e Senioridade',
    seoTitle: 'PDI para Júnior: como ganhar autonomia técnica - Meu PDI',
    metaDescription:
      'Guia prático de PDI para profissional Júnior: como sair da execução assistida, ganhar autonomia técnica e se preparar para o nível Pleno.',
    kicker: 'Evolução de Senioridade',
    h1: 'PDI para profissional Júnior: como sair da execução assistida para mais autonomia',
    directAnswer:
      'O PDI para profissional Júnior deve focar em consolidar a execução técnica com qualidade, reduzir a dependência de supervisão em tarefas recorrentes e compreender o contexto das entregas. A evolução para Pleno acontece quando você entrega com previsibilidade, antecipa dúvidas e documenta resultados.',
    intro:
      'O maior erro de quem está como Júnior é tentar pular direto para temas estratégicos antes de dominar o básico com consistência. Um bom PDI nessa etapa acelera sua curva de autonomia, organiza o que aprender no próprio trabalho e cria histórico concreto para conversas de evolução.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'salto-junior-pleno',
        title: 'O que muda da atuação Júnior para a expectativa de Pleno',
        paragraphs: [
          'Enquanto o Júnior recebe tarefas bem delimitadas e apoio frequente sobre o "como fazer", o Pleno recebe problemas de escopo médio, escolhe a abordagem adequada e garante a entrega de ponta a ponta.',
        ],
        bullets: [
          'Qualidade técnica: menos retrabalho em revisões e domínio das ferramentas padrão do time.',
          'Autonomia progressiva: pesquisar e testar hipóteses antes de escalar bloqueios simples.',
          'Visão do fluxo: entender quem usa sua entrega e qual indicador ela afeta.',
        ],
      },
      {
        id: 'exemplo-junior',
        title: 'Modelo prático de ciclo para Júnior',
        paragraphs: [
          'Combine aprendizado técnico com aplicação imediata nas demandas reais da sua sprint ou rotina mensal.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Desenvolvedora Júnior rumo a Pleno (dados fictícios)',
          situacaoAtual: 'Nível 2/5 em Testes Automatizados e 2/5 em Depuração de Incidentes; depende de apoio constante em code reviews.',
          objetivo: 'Entregar funcionalidades do módulo de faturamento com cobertura de testes e baixo índice de retrabalho.',
          acao: 'Implementar testes unitários e de integração nas próximas 4 entregas e revisar checklist técnico antes de abrir PR.',
          prazo: '90 dias',
          evidencia: 'Redução de comentários corretivos em revisões em 50% e zero regressões em produção nas 4 entregas.',
        },
      },
    ],
    checklist: [
      'Comparar seu nível atual com a matriz de Pleno da sua área no Comparador.',
      'Transformar feedbacks recorrentes do gestor em ações práticas do ciclo.',
      'Registrar aprendizados semanais e soluções de problemas difíceis no diário.',
      'Validar entregas concluídas nas conversas 1:1 mensais.',
    ],
    commonErrors: [
      'Medir evolução apenas por tempo de casa (ex.: "estou há 1 ano, já deveria ser Pleno").',
      'Esconder dúvidas por medo de parecer inseguro, atrasando entregas do time.',
      'Estudar tecnologias que não têm aplicação prática no contexto atual nem no próximo passo.',
    ],
    faqs: [
      {
        q: 'Quanto tempo dura um ciclo de PDI para Júnior?',
        a: 'Ciclos de 90 dias são ideais no nível Júnior porque o aprendizado é rápido e as prioridades técnicas mudam conforme você assume novas rotinas na equipe.',
      },
      {
        q: 'Preciso dominar 100% da matriz de Pleno antes de buscar promoção?',
        a: 'Não, mas você precisa demonstrar consistência nas competências centrais do nível Pleno na prática, entregando escopos completos sem supervisão constante.',
      },
      {
        q: 'Quais soft skills pesam mais para um profissional Júnior?',
        a: 'Capacidade de aprender rápido, escuta ativa em feedbacks, organização de prazos e comunicação clara sobre andamento e impedimentos.',
      },
      {
        q: 'Como levar meu PDI para a reunião 1:1 com meu líder?',
        a: 'Apresente seus 2 ou 3 objetivos do trimestre, mostre as ações em andamento e peça confirmação se aquelas entregas atendem às expectativas de evolução da área.',
      },
    ],
    relatedLinks: [
      { label: 'PDI para profissional Pleno', to: '/pdi-profissional-pleno' },
      { label: 'Hard skills e soft skills: como avaliar', to: '/hard-skills-e-soft-skills' },
      { label: 'Como registrar evidências profissionais', to: '/como-registrar-evidencias-profissionais' },
      { label: 'PDI para promoção', to: '/pdi-para-promocao' },
    ],
  },

  'pdi-profissional-pleno': {
    slug: '/pdi-profissional-pleno',
    cluster: 'Carreira e Senioridade',
    seoTitle: 'PDI para Pleno: impacto, priorização e evolução - Meu PDI',
    metaDescription:
      'Aprenda a estruturar um PDI para profissional Pleno focado em impacto no negócio, colaboração entre áreas e preparação para o nível Sênior.',
    kicker: 'Evolução de Senioridade',
    h1: 'PDI para profissional Pleno: como ampliar impacto, priorização e comunicação',
    directAnswer:
      'Um PDI para profissional Pleno desloca o foco da simples execução individual para o impacto das entregas, a colaboração entre áreas e a prevenção de riscos. Para avançar rumo a Sênior, o plano deve desenvolver pensamento sistêmico, influência sem autoridade e mentoria de colegas mais novos.',
    intro:
      'O platô do nível Pleno é um dos mais comuns na carreira: você já executa bem suas tarefas, mas sente dificuldade em entender o que falta para ser reconhecido como Sênior. A diferença raramente está em fazer mais volume operacional, e sim em ampliar escopo, clareza de decisão e influência.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'pilares-pleno',
        title: 'Os três pilares do PDI de quem já tem autonomia operacional',
        paragraphs: [
          'Quando a execução cotidiana está dominada, seu plano precisa mirar alavancas que multipliquem o resultado da equipe.',
        ],
        bullets: [
          'Priorização e trade-offs: saber explicar por que fazer X agora gera mais retorno do que fazer Y.',
          'Articulação transversal: alinhar dependências com áreas parceiras sem depender sempre do gestor.',
          'Elevação da barra técnica: criar documentação, padrões ou automações que facilitem o trabalho de todos.',
        ],
      },
      {
        id: 'exemplo-pleno',
        title: 'Exemplo realista de PDI no nível Pleno',
        paragraphs: [
          'Veja como combinar uma meta técnica/funcional com competência comportamental de influência.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Analista Financeiro Pleno (dados fictícios)',
          situacaoAtual: 'Domina fechamento mensal (4/5), mas tem nível 2/5 em Comunicação Executiva e modelagem preditiva.',
          objetivo: 'Estruturar projeção de caixa rolante de 90 dias adotada pelas diretorias operacionais.',
          acao: 'Criar modelo automatizado de cenários e conduzir reunião mensal de revisão de desvios com 3 gestores de área.',
          prazo: '120 dias',
          evidencia: 'Modelo implantado + redução do erro de previsão mensal de 14% para 5%, validada pelo CFO.',
        },
      },
    ],
    checklist: [
      'Incluir pelo menos um objetivo de impacto mensurável em indicador da área.',
      'Selecionar competências comportamentais de contexto (influência, negociação ou comunicação executiva).',
      'Apoiar ativamente o onboarding ou desenvolvimento de pelo menos uma pessoa Júnior.',
      'Documentar decisões difíceis e seus resultados como fichas de evidência.',
    ],
    commonErrors: [
      'Achar que ser Sênior significa apenas trabalhar mais horas ou acumular mais tarefas operacionais.',
      'Focar 100% em cursos teóricos e negligenciar projetos transversais dentro da própria empresa.',
      'Não alinhar com a liderança quais problemas estratégicos da área precisam de dono.',
    ],
    faqs: [
      {
        q: 'Por que tantos profissionais travam na passagem de Pleno para Sênior?',
        a: 'Porque continuam otimizando apenas a execução individual, enquanto o nível Sênior exige diagnosticar problemas ambíguos, alinhar stakeholders e multiplicar conhecimento no time.',
      },
      {
        q: 'Devo escolher trilha técnica ou gestão já como Pleno?',
        a: 'Como Pleno, vale consolidar primeiro a base Sênior de liderança técnica e influência. No Meu PDI, você já pode testar objetivos de carreira como Especialista Técnico ou Gestão de Pessoas para direcionar suas ações.',
      },
      {
        q: 'Qual proporção entre cursos e entregas usar no nível Pleno?',
        a: 'Priorize cerca de 70% em projetos reais e resolução de gargalos, 20% em trocas com referências seniores e mentorias e 10% em cursos pontuais de aprofundamento.',
      },
      {
        q: 'Como provar impacto quando meu trabalho é de suporte ou bastidor?',
        a: 'Meça redução de tempo de atendimento, queda em incidentes recorrentes, economia gerada, satisfação interna ou padronização adotada por outras pessoas.',
      },
    ],
    relatedLinks: [
      { label: 'PDI para profissional Sênior', to: '/pdi-profissional-senior' },
      { label: 'Como definir objetivos profissionais claros', to: '/como-definir-objetivos-profissionais' },
      { label: 'PDI para promoção', to: '/pdi-para-promocao' },
      { label: 'Competências de comunicação na carreira', to: '/competencias-de-comunicacao' },
    ],
  },

  'pdi-profissional-senior': {
    slug: '/pdi-profissional-senior',
    cluster: 'Carreira e Senioridade',
    seoTitle: 'PDI para Sênior: estratégia e liderança técnica - Meu PDI',
    metaDescription:
      'Como montar um PDI para profissional Sênior com foco em visão estratégica, arquitetura de decisões, influência executiva e carreira em Y.',
    kicker: 'Alta Senioridade',
    h1: 'PDI para profissional Sênior: liderança técnica, influência e visão estratégica',
    directAnswer:
      'No nível Sênior, o PDI deixa de listar ferramentas básicas e passa a organizar impacto sistêmico: decisão sob ambiguidade, influência entre áreas, formação de talentos e escolha consciente entre trilha de Especialista/Staff ou Gestão de Pessoas. As evidências devem refletir resultados sustentáveis de negócio.',
    intro:
      'Profissionais seniores frequentemente abandonam o próprio PDI por acharem que modelos tradicionais são operacionais demais. No entanto, é justamente nesse estágio que a falta de direção cobra o preço mais alto: estagnação, sobrecarga como "bombeiro oficial" do time e indefinição sobre o próximo passo.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'decisao-carreira-em-y',
        title: 'A bifurcação estratégica: Especialista Técnico vs. Gestão',
        paragraphs: [
          'Antes de definir ações, escolha o destino da sua trilha no Meu PDI. Um futuro Staff/Especialista precisa aprofundar arquitetura, governança e padrões cross-team; um futuro Coordenador/Gerente precisa desenvolver gestão de desempenho, orçamento, contratação e resolução de conflitos.',
        ],
      },
      {
        id: 'sair-do-modo-bombeiro',
        title: 'Como usar o PDI para deixar de ser gargalo operacional',
        paragraphs: [
          'Se todas as decisões críticas dependem exclusivamente de você, você não está pronto para avançar: está preso. Inclua objetivos explícitos de delegação estruturada, documentação de critérios e formação de sucessores Plenos.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Engenheiro Sênior mirando Especialista (dados fictícios)',
          situacaoAtual: 'Referência técnica acionada em todos os incidentes (4/5), mas baixa formalização de padrões transversais (2/5).',
          objetivo: 'Reduzir incidentes críticos entre 3 squads por meio de padrões de observabilidade e revisão arquitetural.',
          acao: 'Definir guia prático de resiliência, treinar referências técnicas de cada squad e acompanhar adoção por 2 meses.',
          prazo: '180 dias',
          evidencia: 'Queda de 40% no tempo médio de recuperação (MTTR) e autonomia das squads nas revisões.',
        },
      },
    ],
    checklist: [
      'Selecionar explicitamente a trilha de carreira (Especialista técnico, Gestão de pessoas ou Consultoria).',
      'Substituir metas de tarefa por metas de resultado e transferência de conhecimento.',
      'Mapear alianças estratégicas fora da própria equipe no Campo de Forças.',
      'Registrar evidências validadas por pares de outras áreas ou diretoria.',
    ],
    commonErrors: [
      'Preencher o PDI apenas com novos frameworks técnicos ignorando impacto financeiro e organizacional.',
      'Centralizar entregas complexas em vez de desenvolver autonomia nos profissionais Plenos.',
      'Assumir gestão de pessoas apenas como único caminho de remuneração, sem afinidade com rituais de liderança.',
    ],
    faqs: [
      {
        q: 'Qual horizonte de tempo usar em um PDI Sênior?',
        a: 'Ciclos semestrais (180 dias) costumam funcionar melhor para objetivos arquiteturais ou organizacionais, combinados a marcos intermediários mensais.',
      },
      {
        q: 'Como avaliar se devo seguir carreira de Especialista ou Gestão?',
        a: 'Observe o que gera energia no seu dia a dia: resolver problemas estruturais profundos e guiar padrões técnicos aponta para Especialista; destravar pessoas, mediar contextos e construir equipes aponta para Gestão.',
      },
      {
        q: 'Quais evidências têm mais peso para um Sênior?',
        a: 'Métricas de negócio afetadas, redução estrutural de custos ou riscos, projetos multi-área entregues e evolução comprovada de profissionais mentorados por você.',
      },
      {
        q: 'Sênior ainda precisa colocar cursos no PDI?',
        a: 'Apenas de forma cirúrgica (como regulação setorial, finanças executivas ou arquitetura avançada). A maior parte do desenvolvimento Sênior ocorre em projetos estratégicos e trocas de alto nível.',
      },
    ],
    relatedLinks: [
      { label: 'PDI para liderança e gestores', to: '/pdi-para-lideranca' },
      { label: 'Pensamento analítico e tomada de decisão', to: '/pensamento-analitico-e-decisao' },
      { label: 'Competências de comunicação executiva', to: '/competencias-de-comunicacao' },
      { label: 'IA no desenvolvimento profissional', to: '/ia-no-desenvolvimento-profissional' },
    ],
  },

  'pdi-transicao-de-carreira': {
    slug: '/pdi-transicao-de-carreira',
    cluster: 'Carreira e Senioridade',
    seoTitle: 'PDI para transição de carreira: guia prático - Meu PDI',
    metaDescription:
      'Saiba como fazer um PDI para transição de carreira aproveitando competências transferíveis, reduzindo riscos e construindo evidências na nova área.',
    kicker: 'Mobilidade Profissional',
    h1: 'PDI para transição de carreira: como mapear competências transferíveis e lacunas',
    directAnswer:
      'Um PDI de transição de carreira evita recomeçar do zero: ele identifica quais competências da sua trajetória atual são transferíveis para a nova área, isola as lacunas técnicas indispensáveis e cria projetos-ponte que provam capacidade de entrega no novo contexto antes da mudança definitiva.',
    intro:
      'Mudar de área profissional sem plano costuma gerar dois extremos perigosos: pedir demissão no impulso ou passar anos comprando cursos sem coragem de testar o mercado. Um PDI estruturado trata a transição como um projeto em fases, protegendo sua segurança financeira e aproveitando sua bagagem.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'competencias-transferiveis',
        title: 'Passo 1: separe o que você já leva na bagagem',
        paragraphs: [
          'Quem migra de Finanças para Dados já domina raciocínio quantitativo e indicadores; quem sai de Atendimento ou Vendas para Customer Success já domina escuta ativa e retenção; quem vem de Marketing para Produto já conhece funil e pesquisa de público.',
          'No Meu PDI, o Catálogo de Competências Transferíveis mostra automaticamente essas pontes entre as 40 áreas profissionais.',
        ],
      },
      {
        id: 'projetos-ponte',
        title: 'Passo 2: construa projetos-ponte na função atual',
        paragraphs: [
          'A transição mais segura começa dentro do contexto que você já conhece: automatize um relatório da sua área atual, lidere a interface com o time para onde deseja migrar ou resolva um problema híbrido.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Transição de Operações Administrativas para Produto (dados fictícios)',
          situacaoAtual: 'Forte domínio de processos internos (4/5), mas nível 1/5 em Product Discovery e priorização de backlog.',
          objetivo: 'Atuar como ponto focal de negócio na melhoria do sistema interno de compras e migrar para vaga de Product Owner.',
          acao: 'Mapear jornada de 15 usuários internos, documentar oportunidades com métricas de tempo gasto e acompanhar 3 sprints junto à tecnologia.',
          prazo: '120 dias',
          evidencia: 'Documento de discovery validado + redução de 35% no tempo de aprovação de pedidos.',
        },
      },
    ],
    checklist: [
      'Mapear área atual e adicionar a área-alvo como área complementar no perfil.',
      'Listar 3 competências transferíveis que diferenciam você de um iniciante absoluto.',
      'Focar apenas nas 3 hard skills mínimas exigidas pelas vagas da nova área.',
      'Realizar conversas exploratórias com 3 profissionais que já atuam no destino escolhido.',
    ],
    commonErrors: [
      'Ignorar toda a experiência anterior e se apresentar como se nunca tivesse trabalhado.',
      'Iniciar uma segunda graduação longa antes de validar o dia a dia real da nova profissão.',
      'Não mapear forças restritivas reais (tempo disponível, reserva financeira, eventual ajuste salarial).',
    ],
    faqs: [
      {
        q: 'Sempre preciso voltar para Júnior ao mudar de área?',
        a: 'Nem sempre. Quando você migra para uma área correlata aproveitando domínio de negócio e competências transferíveis (ex.: Finanças para FP&A Tech ou Marketing para Produto), muitas vezes consegue entrar como Pleno ou em função híbrida.',
      },
      {
        q: 'Quanto tempo leva uma transição de carreira planejada?',
        a: 'Em média, de 6 a 12 meses divididos em dois ciclos de PDI: o primeiro focado em base técnica e projetos-ponte, e o segundo em posicionamento, networking e movimentação interna ou externa.',
      },
      {
        q: 'Devo contar ao meu gestor atual que estou fazendo transição?',
        a: 'Se houver espaço de mobilidade interna na empresa, alinhar esse interesse após entregar bons resultados na função atual costuma abrir portas. Caso não haja espaço, mantenha seu PDI privado até consolidar suas evidências.',
      },
      {
        q: 'Como escolher para qual área migrar se estou em dúvida?',
        a: 'Use o Assistente de Recomendação de Área do Meu PDI para cruzar o que você gosta de fazer no dia a dia, ferramentas de interesse e tipo de resultado que prefere entregar.',
      },
    ],
    relatedLinks: [
      { label: 'Hard skills e soft skills: como avaliar', to: '/hard-skills-e-soft-skills' },
      { label: 'Como identificar lacunas de competências', to: '/como-identificar-lacunas-de-competencias' },
      { label: 'Networking como competência profissional', to: '/networking-profissional' },
      { label: 'Trilhas de desenvolvimento por área', to: '/trilhas-de-desenvolvimento-por-area' },
    ],
  },

  'pdi-para-promocao': {
    slug: '/pdi-para-promocao',
    cluster: 'Carreira e Senioridade',
    seoTitle: 'PDI para promoção: plano prático com evidências - Meu PDI',
    metaDescription:
      'Transforme a expectativa de promoção em critérios claros, entregas de impacto e evidências documentadas para comitês de avaliação e 1:1.',
    kicker: 'Crescimento Vertical',
    h1: 'PDI para promoção: como transformar expectativa de crescimento em plano verificável',
    directAnswer:
      'Um PDI voltado para promoção substitui conversas subjetivas por critérios acordados previamente com a liderança: ele compara sua entrega atual com a régua do próximo cargo, prioriza projetos de visibilidade e registra evidências mensuráveis que sustentam a defesa do seu nome em comitês de calibração.',
    intro:
      'Pedir promoção apenas com base em dedicação ou tempo no cargo costuma gerar frustração para os dois lados. Na maioria das empresas, o gestor precisa defender sua evolução diante de pares e RH com fatos concretos. Seu PDI deve entregar exatamente esses argumentos prontos.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'acordo-de-criterios',
        title: 'Alinhe a régua antes de correr a maratona',
        paragraphs: [
          'Use o Comparador de Nível do Meu PDI para listar as competências esperadas no próximo degrau e leve essa lista para uma conversa 1:1. Pergunte diretamente: "Se eu demonstrar consistência nestes 3 pontos nos próximos 4 meses, estarei pronto para o próximo nível?"',
        ],
      },
      {
        id: 'dossie-de-impacto',
        title: 'Construa seu dossiê de evidências ao longo do ciclo',
        paragraphs: [
          'A memória humana privilegia apenas as últimas semanas antes da avaliação (viés de recência). Registrar entregas, métricas e elogios de clientes ou pares mês a mês garante que nada importante fique de fora.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Coordenadora comercial buscando gerência (dados fictícios)',
          situacaoAtual: 'Bate metas da própria equipe (4/5), mas participa pouco do planejamento de receita e canais (2/5).',
          objetivo: 'Demonstrar prontidão gerencial estruturando o playbook de expansão de contas médias.',
          acao: 'Desenhar processo de upsell, treinar 6 executivos de vendas e acompanhar conversão do trimestre.',
          prazo: '90 dias',
          evidencia: 'Incremento de 22% na receita de expansão do segmento médio, documentado e validado pelo Diretor Comercial.',
        },
      },
    ],
    checklist: [
      'Mapear lacunas exatas entre seu nível atual e o próximo nível no Comparador.',
      'Validar prioridades e horizonte da promoção em reunião 1:1 com o gestor.',
      'Focar em metas de Resultado e Entrega, evitando um plano baseado só em cursos.',
      'Reunir fichas de evidência com números e validações antes do fechamento do ciclo.',
    ],
    commonErrors: [
      'Esperar a semana da avaliação de desempenho para perguntar o que faltava para subir.',
      'Confundir estar sobrecarregado de tarefas do nível atual com atuar no nível seguinte.',
      'Ignorar restrições orçamentárias ou de vagas da empresa no Campo de Forças.',
    ],
    faqs: [
      {
        q: 'Um bom PDI garante promoção imediata?',
        a: 'Nenhum plano controla orçamento ou abertura de cadeiras na empresa, mas um PDI com evidências elimina a dúvida técnica sobre sua prontidão e fortalece seu posicionamento interno e externo.',
      },
      {
        q: 'O que fazer se o gestor não der critérios claros?',
        a: 'Leve uma proposta estruturada baseada na matriz da sua área no Meu PDI e peça para ele ajustar ou validar. É muito mais fácil para um líder reagir a um plano concreto do que criar um do zero.',
      },
      {
        q: 'Quantas evidências devo reunir antes de uma avaliação?',
        a: 'Três a cinco entregas sólidas com contexto, ação e indicador de impacto valem muito mais do que uma lista extensa de pequenas tarefas rotineiras.',
      },
      {
        q: 'Posso compartilhar meu PDI diretamente com o gestor?',
        a: 'Sim. Use a função de compartilhamento com permissão "Compartilhado com gestor" para enviar apenas suas competências e progresso de ciclo com total controle.',
      },
    ],
    relatedLinks: [
      { label: 'Como conduzir 1:1 baseada em evidências', to: '/reuniao-1-on-1-com-evidencias' },
      { label: 'Como registrar evidências profissionais', to: '/como-registrar-evidencias-profissionais' },
      { label: 'PDI para profissional Pleno', to: '/pdi-profissional-pleno' },
      { label: 'PDI para profissional Sênior', to: '/pdi-profissional-senior' },
    ],
  },

  'pdi-para-lideranca': {
    slug: '/pdi-para-lideranca',
    cluster: 'Carreira e Senioridade',
    seoTitle: 'PDI para liderança e gestores: guia completo - Meu PDI',
    metaDescription:
      'Como estruturar um PDI para líderes, coordenadores e gerentes: delegação, rituais de gestão, feedback, clima e entrega de resultados pelo time.',
    kicker: 'Gestão e Liderança',
    h1: 'PDI para liderança: competências, rituais, feedback e desenvolvimento de equipe',
    directAnswer:
      'O PDI para liderança desenvolve a capacidade de alcançar resultados por meio de outras pessoas. Ele substitui metas de execução individual por competências de clareza estratégica, delegação, condução de 1:1s, gestão de conflitos, formação de sucessores e sustentabilidade das entregas do time.',
    intro:
      'A transição de especialista para líder - ou de gestor tático para líder de líderes - exige desapegar do orgulho de resolver tudo sozinho. Quando um gestor não tem seu próprio PDI, tende a repetir vícios de microgerenciamento ou evitar conversas difíceis de desempenho.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'competencias-do-lider',
        title: 'Competências críticas no PDI de quem lidera equipes',
        paragraphs: [
          'Bons planos de liderança equilibram três dimensões: direção de negócio (metas e prioridades), rituais de gestão (cadência, 1:1s e feedback) e saúde/evolução da equipe (retenção e sucessão).',
        ],
        bullets: [
          'Delegação com contexto: transferir responsabilidade definindo resultado esperado, limites e pontos de checagem.',
          'Feedback estruturado e tempestivo: corrigir rotas cedo sem atacar pessoas.',
          'Gestão de pipeline e sucessão: preparar o time para não depender do líder em férias ou imprevistos.',
        ],
      },
      {
        id: 'exemplo-lideranca',
        title: 'Exemplo prático de PDI para novo gestor',
        paragraphs: [
          'Veja como transformar desafios de gestão de equipe em ações verificáveis.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Coordenador de Engenharia em primeiro ano de gestão (dados fictícios)',
          situacaoAtual: 'Ainda assume tarefas críticas de código (centralização) e realiza 1:1s sem pauta nem registro (2/5).',
          objetivo: 'Estabelecer cadência quinzenal de 1:1 e plano de desenvolvimento ativo para 100% dos 7 liderados.',
          acao: 'Implantar roteiro padrão de 1:1, delegar liderança técnica das duas frentes principais e revisar entregas quinzenalmente.',
          prazo: '90 dias',
          evidencia: '100% do time com PDI ativo, queda de horas extras do líder e melhoria no índice de clareza da pesquisa interna.',
        },
      },
    ],
    checklist: [
      'Definir trilha "Gestão de pessoas" ou "Liderança executiva" no perfil.',
      'Medir sucesso pelos indicadores de entrega e evolução do time, não por tarefas individuais.',
      'Estabelecer cadência fixa de conversas 1:1 e feedbacks.',
      'Mapear plano de sucessão para funções críticas da equipe.',
    ],
    commonErrors: [
      'Competir tecnicamente com os próprios liderados em vez de destravar o trabalho deles.',
      'Adiar feedbacks corretivos por meses até que o problema se torne irreversível.',
      'Cuidar do PDI de toda a equipe e negligenciar completamente o próprio desenvolvimento.',
    ],
    faqs: [
      {
        q: 'Como saber se meu PDI de liderança está funcionando?',
        a: 'Observe três sinais: sua equipe toma decisões melhores sem precisar de aprovação a cada passo, os indicadores da área têm previsibilidade e as conversas de desempenho não trazem surpresas.',
      },
      {
        q: 'Líderes ainda precisam manter competências técnicas no PDI?',
        a: 'Sim, mas no nível de repertório arquitetural, leitura crítica de indicadores e tendências (como IA na área), e não na execução operacional diária.',
      },
      {
        q: 'Como acompanhar o PDI do meu time respeitando a privacidade?',
        a: 'Peça que cada pessoa compartilhe seu link do Meu PDI com permissão "Compartilhado com gestor" ou utilize o Modo RH/Liderança para consolidar lacunas autorizadas.',
      },
      {
        q: 'Qual é o maior desafio de quem vira líder de outros líderes?',
        a: 'Aprender a gerir por contexto, indicadores e alinhamento entre áreas, deixando de intervir diretamente na operação das equipes de ponta.',
      },
    ],
    relatedLinks: [
      { label: 'Solução Meu PDI para RH e gestores', to: '/para-rh' },
      { label: 'Como conduzir 1:1 baseada em evidências', to: '/reuniao-1-on-1-com-evidencias' },
      { label: 'Como preparar conversas de feedback', to: '/conversas-de-feedback-com-evidencias' },
      { label: 'Inteligência emocional no trabalho', to: '/inteligencia-emocional-no-trabalho' },
    ],
  },

  'pdi-onboarding-30-60-90': {
    slug: '/pdi-onboarding-30-60-90',
    cluster: 'Carreira e Senioridade',
    seoTitle: 'PDI de onboarding 30, 60 e 90 dias: modelo prático - Meu PDI',
    metaDescription:
      'Estruture seus primeiros 30, 60 e 90 dias em um novo emprego ou cargo com objetivos claros, entregas rápidas e evidências de adaptação.',
    kicker: 'Primeiros 90 Dias',
    h1: 'PDI para onboarding de 30, 60 e 90 dias: objetivos e evidências do período inicial',
    directAnswer:
      'Um PDI de 30, 60 e 90 dias organiza a entrada em um novo emprego ou cargo em três etapas progressivas: absorver contexto e ferramentas no primeiro mês, assumir entregas autônomas e pequenas melhorias no segundo, e consolidar ritmo, indicadores e próximos passos no terceiro mês.',
    intro:
      'Os primeiros três meses em uma nova função definem a percepção de confiança que o time e a liderança terão sobre você. Chegar com um plano estruturado de 30-60-90 dias reduz a ansiedade inicial e evita tanto a passividade quanto mudanças precipitadas sem entender a cultura.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'etapas-30-60-90',
        title: 'O que colocar em cada janela de 30, 60 e 90 dias',
        paragraphs: [
          'Trate cada bloco de 30 dias como uma meta progressiva dentro de um ciclo trimestral no Meu PDI:',
        ],
        bullets: [
          'Dias 1 a 30 (Contexto e diagnóstico): entender produto, processos, métricas da área, mapear stakeholders e realizar uma primeira entrega simples.',
          'Dias 31 a 60 (Execução autônoma): assumir escopo próprio, entregar projetos curtos sem supervisão diária e pedir primeiro feedback formal.',
          'Dias 61 a 90 (Impacto e próximo ciclo): propor melhoria fundamentada em dados/observação, atingir ritmo pleno e fechar revisão do período de experiência.',
        ],
      },
      {
        id: 'exemplo-onboarding',
        title: 'Exemplo preenchido de plano 30-60-90',
        paragraphs: [
          'Veja como organizar metas e evidências ao assumir uma cadeira nova.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Customer Success Manager recém-contratado (dados fictícios)',
          situacaoAtual: 'Experiência prévia em mercado correlato, mas domínio zero do produto e da carteira atual (1/5).',
          objetivo: 'Assumir integralmente carteira de 25 contas B2B com planos de sucesso revisados até o dia 90.',
          acao: 'Mês 1: shadowing em 10 reuniões e certificação interna; Mês 2: conduzir 15 reuniões solo; Mês 3: revisar risco de churn e apresentar diagnóstico da carteira.',
          prazo: '90 dias',
          evidencia: '25 contas mapeadas no CRM, CSAT médio de 4,8 nas reuniões conduzidas e aprovação na revisão de 90 dias.',
        },
      },
    ],
    checklist: [
      'Alinhar expectativas dos primeiros 90 dias com o gestor já na primeira semana.',
      'Mapear colegas-chave de apoio no bloco de Alianças do PDI.',
      'Anotar dúvidas resolvidas e processos aprendidos no Diário para não perguntar duas vezes.',
      'Agendar check-ins aos 30, 60 e 90 dias levando as evidências registradas.',
    ],
    commonErrors: [
      'Querer reformular processos inteiros na primeira semana sem entender por que foram criados.',
      'Passar 60 dias apenas lendo documentação sem realizar nenhuma entrega visível.',
      'Esperar o dia 89 do contrato de experiência para descobrir se está atendendo ao esperado.',
    ],
    faqs: [
      {
        q: 'Quem deve criar o plano 30-60-90: a empresa ou o profissional?',
        a: 'O cenário ideal é a construção conjunta. Se a empresa não entregar um roteiro estruturado, montar sua própria proposta no Meu PDI e validá-la com o gestor demonstra maturidade imediata.',
      },
      {
        q: 'Serve também para promoção interna ou mudança de time?',
        a: 'Sim. Mudar de cargo dentro da mesma empresa exige renegociar expectativas e abandonar rotinas da função anterior, o que um ciclo 30-60-90 organiza perfeitamente.',
      },
      {
        q: 'Quantas metas devo ter em cada bloco de 30 dias?',
        a: 'Duas a três ações claras por mês são suficientes: uma ligada a aprendizado/contexto, uma a entrega prática e uma a relacionamento com o time e pares.',
      },
      {
        q: 'O que fazer depois de concluir os 90 dias?',
        a: 'Salve a retrospectiva desse ciclo inicial no histórico do Meu PDI e inicie seu primeiro ciclo regular de desenvolvimento focado em evolução e impacto contínuo.',
      },
    ],
    relatedLinks: [
      { label: 'PDI no onboarding de colaboradores (visão RH)', to: '/pdi-no-onboarding-de-colaboradores' },
      { label: 'Templates de onboarding, 1:1 e feedback', to: '/templates-pdi-1on1-feedback-onboarding' },
      { label: 'Como fazer um PDI em 5 passos', to: '/como-fazer-um-pdi' },
      { label: 'Reunião 1:1 baseada em evidências', to: '/reuniao-1-on-1-com-evidencias' },
    ],
  },
};
