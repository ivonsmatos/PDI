import type { EditorialArticle } from './types';

export const CLUSTER_P0_P2: Record<string, Omit<EditorialArticle, 'publishedAt' | 'updatedAt'>> = {
  'pdi-e-curriculo': {
    slug: '/pdi-e-curriculo',
    cluster: 'Fundamentos',
    seoTitle: 'PDI não é currículo: qual é a diferença? - Meu PDI',
    metaDescription:
      'Entenda a diferença entre Plano de Desenvolvimento Individual (PDI) e currículo, quando usar cada um e como transformar evolução em evidências.',
    kicker: 'Fundamentos de Carreira',
    h1: 'PDI não é currículo: qual é a diferença na prática?',
    directAnswer:
      'O PDI (Plano de Desenvolvimento Individual) organiza o que você precisa aprender, entregar e comprovar nos próximos meses. Já o currículo resume experiências, formações e resultados que você já construiu. No Meu PDI, o currículo de competências nasce como consequência do desenvolvimento, e não o contrário.',
    intro:
      'Muita gente confunde o Plano de Desenvolvimento Individual com um currículo ampliado ou um portfólio pronto para vagas. Essa confusão faz o plano perder utilidade: em vez de orientar escolhas reais de crescimento, ele vira uma vitrine estática. Separar os dois papéis torna seu ciclo mais objetivo e fortalece o que você mostra ao mercado.',
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
          situacaoAtual: 'Analista de Marketing Pleno com nível 2/5 em Análise de Coorte e Retenção e nível-alvo 4/5.',
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
    cluster: 'Fundamentos',
    seoTitle: 'Hard skills e soft skills: como avaliar seu nível - Meu PDI',
    metaDescription:
      'Aprenda como avaliar hard skills e soft skills por senioridade com critérios observáveis e transforme autoavaliação em evidências no seu PDI.',
    kicker: 'Matriz de Competências',
    h1: 'Hard skills e soft skills: como avaliar seu nível atual com critérios observáveis',
    directAnswer:
      'Hard skills são conhecimentos técnicos mensuráveis de uma área, enquanto soft skills são comportamentos de comunicação, decisão e colaboração. Avaliar seu nível exige comparar o que você entrega com a expectativa da sua senioridade e registrar evidências concretas, evitando notas baseadas apenas em autopercepção.',
    intro:
      'Muitos planos de desenvolvimento falham logo na largada porque a autoavaliação é vaga. Dizer "tenho 4/5 em liderança" ou "preciso melhorar comunicação" não orienta o que estudar nem o que praticar amanhã. Quando você cruza competências técnicas e comportamentais por nível de carreira, o gap fica claro.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'diferenca-pratica',
        title: 'Como diferenciar hard skills e soft skills no plano de desenvolvimento',
        paragraphs: [
          'Hard skills variam conforme a área profissional e especialidade - como SQL e modelagem em Ciência de Dados, Lean Manufacturing na Indústria ou Gestão de Contratos no Setor Público. Já as soft skills aparecem no modo como você aplica a técnica no contexto da equipe.',
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
        a: 'Defina uma área principal e adicione até três áreas complementares - por exemplo, Marketing + Ciência de Dados ou Saúde + Tecnologia - e utilize o catálogo de competências transferíveis para aproveitar o que você já domina.',
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
    cluster: 'RH e Liderança',
    seoTitle: 'PDI ou PDP: qual termo usar e qual é a diferença? - Meu PDI',
    metaDescription:
      'Compare PDI (Plano de Desenvolvimento Individual) e PDP (Plano de Desenvolvimento Profissional/Pessoal) e veja como estruturar ambos na prática.',
    kicker: 'RH e Carreira',
    h1: 'PDI ou PDP: qual termo usar e qual é a diferença?',
    directAnswer:
      'PDI significa Plano de Desenvolvimento Individual e PDP significa Plano de Desenvolvimento Profissional ou Pessoal. Na prática, muitas empresas usam os termos como sinônimos, mas o PDI costuma enfatizar a jornada completa de carreira do profissional, enquanto o PDP é frequentemente ligado às metas de desempenho do ciclo corporativo atual.',
    intro:
      'Se você trabalha com RH, liderança ou está preenchendo um formulário de avaliação na sua empresa, provavelmente já encontrou as duas siglas. Entender a nuance entre PDI e PDP evita ruídos entre metas de curto prazo do negócio e ambições de longo prazo do profissional.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'comparacao-pdi-pdp',
        title: 'Diferenças práticas entre PDI e PDP nas empresas',
        paragraphs: [
          'Embora a estrutura técnica seja muito semelhante - competências atuais, objetivos, ações, prazos e acompanhamento - a ênfase costuma mudar conforme quem conduz o processo.',
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

  'por-que-criamos-o-meu-pdi': {
    slug: '/por-que-criamos-o-meu-pdi',
    cluster: 'Produto e Templates',
    seoTitle: 'Por que criamos o Meu PDI: visão do produto - Meu PDI',
    metaDescription:
      'Conheça a visão por trás do Meu PDI: por que planilhas anuais falham e como desenhamos uma plataforma gratuita focada em evidências e privacidade.',
    kicker: 'Visão de Produto',
    h1: 'Por que criamos o Meu PDI: visão do produto e o problema que resolvemos',
    directAnswer:
      'Criamos o Meu PDI para resolver o abandono crônico dos planos de carreira em planilhas estáticas e sistemas corporativos engessados. A plataforma devolve a propriedade do desenvolvimento ao profissional, unindo matrizes de 40 áreas, metas baseadas em evidências e privacidade por padrão.',
    intro:
      'Ao longo de anos acompanhando ciclos de carreira e conversas de avaliação, vimos dois problemas se repetirem: quem trabalha em empresas sem estrutura de RH fica sem nenhuma régua de evolução, e quem trabalha em grandes corporações preenche formulários anuais que somem na gaveta no dia seguinte.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Direção de Produto - Meu PDI',
    sections: [
      {
        id: 'tres-premissas',
        title: 'Três premissas que guiam todas as decisões do Meu PDI',
        paragraphs: [
          'Desde o primeiro protótipo, estabelecemos princípios inegociáveis:',
        ],
        bullets: [
          'O histórico pertence à pessoa, não ao cargo passageiro: você leva seus ciclos e evidências ao longo de toda a vida profissional.',
          'Evidência vale mais que autodeclaração: notas de 1 a 5 ganham lastro com fichas de Situação, Ação, Resultado e Indicador.',
          'Privacidade antes da exposição: nada é público até que o titular decida o que, para quem e por quanto tempo compartilhar.',
        ],
      },
      {
        id: 'para-quem-construimos',
        title: 'Do primeiro emprego à liderança e ao RH parceiro',
        paragraphs: [
          'Expandimos nossa cobertura para 40 áreas profissionais - incluindo Indústria, Saúde, Educação, Setor Público, Direito, Finanças, Agronegócio e Tecnologia - porque desenvolvimento estruturado não pode ser privilégio de um único setor.',
        ],
      },
    ],
    checklist: [
      'Uso individual gratuito para qualquer profissional no Brasil.',
      'Matrizes por nível (Estagiário a Gestor) e especialidades específicas.',
      'Currículo de competências gerado como consequência natural da execução.',
      'Modo RH focado em apoio, 1:1s e consolidação anonimizada.',
    ],
    commonErrors: [
      'Achar que tecnologia sozinha desenvolve alguém sem cadência de execução.',
      'Confundir ferramenta de desenvolvimento com rede social de autopromoção.',
    ],
    faqs: [
      {
        q: 'Por que o uso individual do Meu PDI é gratuito?',
        a: 'Porque acreditamos que todo profissional deve ter acesso a uma estrutura séria para planejar sua carreira, independentemente de trabalhar em uma empresa com orçamento robusto de RH.',
      },
      {
        q: 'O Meu PDI substitui o sistema de folha ou ATS da empresa?',
        a: 'Não. O Meu PDI não é sistema de folha nem de recrutamento em massa; é uma plataforma focada especificamente em desenvolvimento contínuo, evidências e conversas de evolução.',
      },
      {
        q: 'Meus dados ficam presos na plataforma?',
        a: 'Nunca. Você pode exportar tanto seu Currículo de Competências em PDF quanto o backup integral dos seus ciclos e diário em JSON legível a qualquer momento.',
      },
      {
        q: 'Como posso sugerir melhorias ou novas áreas?',
        a: 'Diretamente no seletor de área ("Minha área não está listada") ou pelos canais de contato na página Sobre.',
      },
    ],
    relatedLinks: [
      { label: 'Sobre o Meu PDI', to: '/sobre' },
      { label: 'Diário de construção do Meu PDI', to: '/diario-de-construcao-meu-pdi' },
      { label: 'Privacidade e LGPD no desenvolvimento', to: '/privacidade-e-lgpd-no-desenvolvimento' },
      { label: 'O que é PDI? Guia completo', to: '/o-que-e-pdi' },
    ],
  },

  'diario-de-construcao-meu-pdi': {
    slug: '/diario-de-construcao-meu-pdi',
    cluster: 'Produto e Templates',
    seoTitle: 'Diário de construção do Meu PDI: decisões reais - Meu PDI',
    metaDescription:
      'Bastidores técnicos e de produto do Meu PDI: como separamos saúde estrutural de progresso, criamos fichas de evidência e expandimos para 40 áreas.',
    kicker: 'Bastidores e Engenharia',
    h1: 'Diário de construção do Meu PDI: decisões, aprendizados e problemas resolvidos',
    directAnswer:
      'Construir o Meu PDI exigiu resolver armadilhas reais de produto: separar o indicador de saúde estrutural do percentual de ações concluídas, impedir metas incoerentes abaixo do nível atual, garantir vínculos íntegros entre objetivos e ações e pré-renderizar conteúdo público sem expor dados privados.',
    intro:
      'Compartilhar decisões reais de produto ajuda outros construtores e mostra aos usuários como cada detalhe da plataforma foi pensado. Abaixo estão quatro aprendizados práticos da evolução recente do Meu PDI.',
    author: 'Engenharia e Produto - Meu PDI',
    reviewer: 'Direção de Produto - Meu PDI',
    sections: [
      {
        id: 'saude-vs-progresso',
        title: '1. Por que separamos "Saúde do Plano" de "Progresso Concluído"',
        paragraphs: [
          'No início, misturar qualidade do planejamento com tarefas finalizadas confundia quem acabava de montar um ótimo PDI e via uma nota baixa. Separamos os conceitos: Saúde do Plano avalia se todos os objetivos têm ações válidas, recursos e forças mapeadas; Execução acompanha o que já foi entregue.',
        ],
      },
      {
        id: 'integridade-vinculos-e-metas',
        title: '2. Integridade entre objetivos, ações e níveis-alvo',
        paragraphs: [
          'Testes em uso real mostraram dois problemas clássicos: ações órfãs que distorciam o progresso por objetivo e usuários marcando nível-alvo inferior ao nível atual por clique acidental. Criamos reconciliação automática de vínculos, o Assistente de Revisão do Ciclo e trava direta contra metas regressivas.',
        ],
        example: {
          titulo: 'Caso real de engenharia de produto no Meu PDI',
          situacaoAtual: 'Planos antigos concentravam múltiplas ações no Objetivo 1, deixando Objetivos 2 e 3 zerados e saúde travada em 60%.',
          objetivo: 'Permitir correção imediata sem exigir recastro manual pelo usuário.',
          acao: 'Implementação de seletor rápido no Kanban + reconciliador semântico em 1 clique e bloqueio de fechamento com erros críticos.',
          prazo: 'Entregue em produção',
          evidencia: 'Recálculo instantâneo de progresso por objetivo e saúde estrutural consistente em todo o app.',
        },
      },
      {
        id: 'expansao-40-areas-privacidade',
        title: '3. De 26 para 40 áreas com telemetria 100% anonimizada',
        paragraphs: [
          'Ao expandir para 40 áreas com especialidades e Modo RH, mantivemos regras rígidas no banco de dados bloqueando qualquer gravação de nome, e-mail ou texto livre na coleção de métricas agregadas.',
        ],
      },
    ],
    checklist: [
      'Validar consistência de dados antes de salvar cada ciclo no histórico.',
      'Tratar privacidade com regras de banco de dados (Firestore Rules), não apenas escondendo botões na tela.',
      'Ouvir auditorias reais de uso para lapidar rótulos de gráficos, PDFs e acessibilidade.',
    ],
    commonErrors: [
      'Adicionar dezenas de áreas apenas no menu sem construir matriz completa para os 6 níveis.',
      'Medir métricas de produto coletando dados pessoais desnecessários.',
    ],
    faqs: [
      {
        q: 'Como o Meu PDI garante que o administrador não lê diários pessoais?',
        a: 'As regras de segurança do banco de dados permitem leitura de dados privados exclusivamente pelo próprio UID autenticado do usuário, restando ao painel administrativo apenas contadores numéricos anonimizados.',
      },
      {
        q: 'Por que as páginas públicas carregam rápido mesmo sendo um web app?',
        a: 'Utilizamos pré-renderização estática no build e divisão de pacotes sob demanda (code splitting), entregando HTML limpo nas rotas públicas e mantendo os gráficos pesados apenas onde são usados.',
      },
      {
        q: 'Como funciona o PWA do Meu PDI?',
        a: 'O aplicativo pode ser instalado na tela inicial do celular ou computador, com manifesto web e suporte a tema claro e escuro.',
      },
      {
        q: 'Novas funcionalidades quebram ciclos salvos anteriormente?',
        a: 'Não. Todos os novos campos (como especialidade, tipo de meta e fichas de evidência) foram desenhados de forma retrocompatível com ciclos antigos.',
      },
    ],
    relatedLinks: [
      { label: 'Por que criamos o Meu PDI', to: '/por-que-criamos-o-meu-pdi' },
      { label: 'Privacidade e LGPD no desenvolvimento', to: '/privacidade-e-lgpd-no-desenvolvimento' },
      { label: 'Trilhas de desenvolvimento nas 40 áreas', to: '/trilhas-de-desenvolvimento-por-area' },
      { label: 'Sobre o Meu PDI', to: '/sobre' },
    ],
  },

  'estudo-de-caso-pdi-estruturado': {
    slug: '/estudo-de-caso-pdi-estruturado',
    cluster: 'Produto e Templates',
    seoTitle: 'Estudo de caso de PDI: antes e depois na prática - Meu PDI',
    metaDescription:
      'Veja um estudo de caso ilustrativo e anonimizado comparando o antes e depois de transformar um PDI genérico em um ciclo estruturado com evidências.',
    kicker: 'Antes e Depois',
    h1: 'Estudo de caso ilustrativo: antes e depois de um PDI estruturado com evidências',
    directAnswer:
      'Este estudo de caso ilustrativo e anonimizado mostra como substituir um plano vago ("estudar gestão e melhorar inglês") por 3 objetivos mensuráveis, ações de impacto no trabalho e fichas de evidência transforma conversas 1:1 subjetivas em uma transição concreta de escopo em 120 dias.',
    intro:
      'Para preservar 100% da privacidade dos usuários, consolidamos abaixo um cenário composto e ilustrativo baseado nos padrões reais de transformação quando um profissional troca listas genéricas de cursos por metas de resultado.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'cenario-antes',
        title: 'O "Antes": plano genérico e sensação de estagnação',
        paragraphs: [
          'Perfil ilustrativo: Analista de Operações Logísticas Pleno, 3 anos no mesmo cargo. Seu plano anterior em planilha tinha duas linhas: "Fazer curso de Power BI" e "Ter mais visão estratégica", sem prazos intermediários nem vínculo com indicadores da operação.',
          'Resultado após 8 meses: curso assistido pela metade, nenhuma mudança percebida pela liderança e frustração na avaliação semestral.',
        ],
      },
      {
        id: 'cenario-depois',
        title: 'O "Depois": reestruturação em ciclo de 120 dias no Meu PDI',
        paragraphs: [
          'Ao refazer o plano seguindo os 6 passos do Meu PDI, o foco mudou da aula teórica para um gargalo crítico de atraso de entregas regionais.',
        ],
        example: {
          titulo: 'Comparativo estruturado do novo ciclo (cenário ilustrativo anonimizado)',
          situacaoAtual: 'Autoavaliação honesta: Roteirização (4/5), Análise de Indicadores S&OP (2/5), Comunicação Executiva (2/5).',
          objetivo: 'Reduzir atrasos de entrega na regional Sul por meio de painel semanal de desvios de transportadoras.',
          acao: 'Construir painel com dados reais (Entrega), conduzir rito quinzenal com 4 transportadoras (Resultado) e apresentar sumário mensal à gerência (Evidência).',
          prazo: '120 dias',
          evidencia: 'Taxa de entrega no prazo (OTIF) subiu de 84% para 93% na regional; profissional convidado a assumir coordenação de planejamento.',
        },
      },
    ],
    checklist: [
      'Trocar verbos vagos ("melhorar", "estudar") por entregas ligadas a dores reais da área.',
      'Reduzir a quantidade de metas simultâneas para ganhar profundidade.',
      'Levar o indicador antes/depois documentado para a conversa de fechamento de ciclo.',
    ],
    commonErrors: [
      'Esperar que o gestor adivinhe o impacto de um curso que você fez em silêncio.',
      'Desistir no primeiro bloqueio de dados em vez de acionar alianças internas.',
    ],
    faqs: [
      {
        q: 'Este caso expõe dados pessoais de algum usuário real?',
        a: 'Não. Conforme nossa política rígida de privacidade, jamais expomos dados individuais de usuários; este estudo é um cenário ilustrativo construído sobre padrões típicos de reestruturação de PDI.',
      },
      {
        q: 'Posso ver um exemplo interativo completo da tela do produto?',
        a: 'Sim! Acesse a página pública de Exemplo (/exemplo) para explorar um PDI completo preenchido na interface.',
      },
      {
        q: 'Quanto tempo leva para sentir diferença após estruturar o PDI?',
        a: 'Já nas primeiras 4 semanas a clareza de agenda melhora; em 90 a 120 dias surgem as primeiras evidências concretas de entrega para levar às reuniões 1:1.',
      },
      {
        q: 'Funciona mesmo em empresas pequenas sem plano formal de cargos?',
        a: 'Sim, porque organizar entregas mensuráveis aumenta seu valor percebido internamente e, ao mesmo tempo, constrói um currículo de competências muito mais forte para o mercado.',
      },
    ],
    relatedLinks: [
      { label: 'Ver exemplo interativo do Meu PDI', to: '/exemplo' },
      { label: 'Como definir objetivos profissionais claros', to: '/como-definir-objetivos-profissionais' },
      { label: 'Como registrar evidências profissionais', to: '/como-registrar-evidencias-profissionais' },
      { label: 'PDI para promoção', to: '/pdi-para-promocao' },
    ],
  },

  'pdi-na-pratica-por-diferentes-areas': {
    slug: '/pdi-na-pratica-por-diferentes-areas',
    cluster: 'Produto e Templates',
    seoTitle: 'PDI na prática em diferentes áreas profissionais - Meu PDI',
    metaDescription:
      'Veja exemplos práticos de objetivos, ações e evidências de PDI para Saúde, Direito, Engenharia/Indústria, Finanças, Educação e Tecnologia.',
    kicker: 'Exemplos Setoriais',
    h1: 'PDI na prática: como diferentes áreas profissionais estruturam objetivos e evidências',
    directAnswer:
      'Embora a estrutura de um bom PDI seja universal (diagnóstico, objetivo, ação, prazo e evidência), a forma de comprovar evolução muda radicalmente entre setores: protocolos clínicos na Saúde, segurança jurídica no Direito, eficiência operacional na Indústria e confiabilidade técnica na Tecnologia.',
    intro:
      'Muitos exemplos de carreira na internet falam apenas de startups e programação. Reunimos abaixo recortes práticos e ilustrativos mostrando como profissionais de setores tradicionais e especializados aplicam o Meu PDI.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão Setorial - Meu PDI',
    sections: [
      {
        id: 'saude-e-educacao',
        title: 'Saúde, Farmacêutica e Educação: protocolos, qualidade e aprendizagem',
        paragraphs: [
          'Nessas áreas, boas evidências conectam atualização técnico-científica à segurança do paciente, conformidade regulatória ou engajamento discente.',
        ],
        bullets: [
          'Saúde: implantação de checklist de segurança do paciente reduzindo eventos adversos no setor.',
          'Farmacêutica: revisão de Procedimentos Operacionais Padrão (POP) dentro das Boas Práticas de Fabricação (BPF) sem não-conformidades.',
          'Educação: aplicação de metodologia ativa em 3 turmas elevando participação e desempenho avaliativo.',
        ],
      },
      {
        id: 'industria-engenharia-financas',
        title: 'Indústria, Engenharia, Finanças e Direito: risco, custo e previsibilidade',
        paragraphs: [
          'Setores intensivos em capital, normas e contratos valorizam redução de variabilidade, economia comprovada e mitigação preventiva.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Engenheira de Manutenção Industrial Pleno (dados fictícios)',
          situacaoAtual: 'Alta proporção de manutenções corretivas emergenciais (nível 2/5 em Confiabilidade/PCM).',
          objetivo: 'Aumentar disponibilidade física dos equipamentos críticos da linha A no semestre.',
          acao: 'Implantar plano preventivo baseado em análise de falhas (FMEA) nos 5 equipamentos gargalo e treinar equipe de turno.',
          prazo: '150 dias',
          evidencia: 'Queda de 38% nas paradas não programadas da linha A, auditada pelo PCP.',
        },
      },
    ],
    checklist: [
      'Escolher a matriz exata do seu setor entre as 40 áreas do Meu PDI.',
      'Traduzir evidências para a linguagem que a liderança da sua área respeita (segurança, prazo, receita, conformidade ou qualidade).',
      'Respeitar normas éticas e sigilo profissional do seu conselho de classe ao registrar casos.',
    ],
    commonErrors: [
      'Forçar jargões de tecnologia em áreas que operam por protocolos regulatórios próprios.',
      'Achar que carreiras públicas ou educacionais não permitem registrar indicadores de impacto.',
    ],
    faqs: [
      {
        q: 'Profissionais autônomos ou liberais (arquitetos, advogados, consultores, saúde) podem usar PDI?',
        a: 'Sim! Selecione objetivos de carreira como Consultoria ou Empreendedorismo para equilibrar aprofundamento técnico com captação de clientes, posicionamento e gestão.',
      },
      {
        q: 'Como registrar evidências na Saúde ou no Direito sem violar sigilo?',
        a: 'Nunca mencione nomes de pacientes, partes ou números de processos sigilosos. Descreva sempre em termos agregados e institucionais (ex.: "padronização de tese contratual em 20 demandas").',
      },
      {
        q: 'Onde consulto as competências específicas de cada uma das 40 áreas?',
        a: 'Dentro do Passo 2 do Meu PDI ou no Template por Profissão, onde você seleciona área, especialidade e nível de carreira.',
      },
      {
        q: 'Posso combinar duas áreas tradicionais, como Engenharia + Finanças?',
        a: 'Sim. Escolha uma como área principal e marque a outra como área complementar para refletir sua atuação híbrida.',
      },
    ],
    relatedLinks: [
      { label: 'Trilhas de desenvolvimento por área profissional', to: '/trilhas-de-desenvolvimento-por-area' },
      { label: 'Como registrar evidências profissionais', to: '/como-registrar-evidencias-profissionais' },
      { label: 'Hard skills e soft skills: como avaliar', to: '/hard-skills-e-soft-skills' },
      { label: 'Ver exemplo interativo completo', to: '/exemplo' },
    ],
  },

  'roteiros-rapidos-meu-pdi': {
    slug: '/roteiros-rapidos-meu-pdi',
    cluster: 'Produto e Templates',
    seoTitle: 'Guias rápidos: como usar o Meu PDI passo a passo - Meu PDI',
    metaDescription:
      'Roteiros práticos de 5 minutos para montar seu primeiro PDI, usar o diário semanal, compartilhar com gestor/RH e fechar ciclos de evolução.',
    kicker: 'Passo a Passo do Produto',
    h1: 'Guias rápidos de uso: como montar o PDI, usar o diário, compartilhar e revisar ciclos',
    directAnswer:
      'Estes quatro roteiros rápidos mostram como extrair o máximo do Meu PDI em poucos minutos por semana: criação inicial em 6 etapas, registro semanal no Diário de Progresso, compartilhamento com privacidade granular para gestor ou RH e fechamento de ciclo com retrospectiva.',
    intro:
      'Uma ferramenta de desenvolvimento só cumpre seu papel quando cabe na rotina corrida. Use os quatro fluxos abaixo como guia rápido para cada momento do seu trimestre.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto - Meu PDI',
    sections: [
      {
        id: 'fluxo-1-montagem',
        title: 'Fluxo 1 (15 min): Montando seu primeiro PDI sem travar',
        paragraphs: [
          'Siga o Wizard em 6 passos curtos:',
        ],
        bullets: [
          'Passo 1 (Causa): escreva em 2 frases o motivo real deste ciclo agora.',
          'Passo 2 (Autoavaliação): selecione área, especialidade e nível (ou use o Recomendador), avalie suas skills e adicione evidências que já possua.',
          'Passos 3 e 4 (Objetivos e Ações): crie de 2 a 3 objetivos SMART e vincule ações com prazo, recurso e tipo de meta.',
          'Passos 5 e 6 (Campo de Forças e Revisão): mapeie barreiras e alianças, confira o Assistente de Revisão e conclua.',
        ],
      },
      {
        id: 'fluxo-2-e-3-rotina-e-compartilhamento',
        title: 'Fluxo 2 e 3 (5 min/semana): Diário, Kanban e compartilhamento seguro',
        paragraphs: [
          'Toda sexta-feira, atualize o status das ações no Plano de Ação e anote 1 aprendizado ou entrega no Diário. Antes de uma reunião 1:1 ou processo seletivo, clique no ícone Compartilhar no topo para gerar um link com permissão específica (Gestor, RH ou Recrutadores), prazo de validade e senha opcional.',
        ],
        example: {
          titulo: 'Fluxo 4 (20 min/trimestre): Fechando um ciclo com retrospectiva',
          situacaoAtual: 'Fim de um trimestre com 80% das ações concluídas e 2 novas fichas de evidência.',
          objetivo: 'Consolidar histórico e abrir próximo ciclo calibrado.',
          acao: 'Revisar notas no Radar, conferir alertas no Assistente de Revisão, preencher Retrospectiva (o que funcionou, o que travou e lição) e clicar em Salvar Ciclo.',
          prazo: 'A cada 90 a 180 dias',
          evidencia: 'Snapshot preservado na aba Evolução + Diário mantido intacto para o novo ciclo.',
        },
      },
    ],
    checklist: [
      'Ativar notificações de prazo nas Configurações se quiser avisos de vencimento.',
      'Usar o botão de reconciliação automática caso tenha objetivos sem ações vinculadas.',
      'Exportar o Currículo de Competências em PDF sempre que fechar entregas importantes.',
      'Revogar links antigos compartilhados quando encerrar um processo seletivo.',
    ],
    commonErrors: [
      'Tentar preencher 100% das fichas de evidência no primeiro dia em vez de construir ao longo das semanas.',
      'Usar "Limpar tudo" nas configurações quando queria apenas "Novo Ciclo" (use Novo Ciclo para preservar histórico).',
    ],
    faqs: [
      {
        q: 'Posso editar meu PDI depois de concluir o Wizard inicial?',
        a: 'Sim, a qualquer momento. Você pode atualizar ações direto no Kanban, registrar no Diário ou voltar a qualquer passo do Wizard para refinar competências e objetivos.',
      },
      {
        q: 'Meus dados sincronizam entre computador e celular?',
        a: 'Sim. Ao entrar com sua conta (Google ou e-mail), seu PDI atual, diário e histórico de ciclos são sincronizados automaticamente na nuvem.',
      },
      {
        q: 'Como funciona o acesso offline / instalação no celular?',
        a: 'O Meu PDI é um Progressive Web App (PWA): no navegador do celular ou desktop, escolha "Adicionar à tela inicial" ou "Instalar aplicativo" para acesso direto.',
      },
      {
        q: 'Onde encontro os modelos prontos de 1:1 e feedback?',
        a: 'Confira nosso guia de Templates Complementares (/templates-pdi-1on1-feedback-onboarding) com roteiros prontos para copiar e aplicar.',
      },
    ],
    relatedLinks: [
      { label: 'Templates de 1:1, feedback, onboarding e evidências', to: '/templates-pdi-1on1-feedback-onboarding' },
      { label: 'Como fazer um PDI em 5 passos', to: '/como-fazer-um-pdi' },
      { label: 'Ver exemplo interativo', to: '/exemplo' },
      { label: 'Privacidade e LGPD no desenvolvimento', to: '/privacidade-e-lgpd-no-desenvolvimento' },
    ],
  },

  'templates-pdi-1on1-feedback-onboarding': {
    slug: '/templates-pdi-1on1-feedback-onboarding',
    cluster: 'Produto e Templates',
    seoTitle: 'Templates gratuitos: 1:1, feedback, onboarding e PDI - Meu PDI',
    metaDescription:
      'Copie e use 4 templates práticos: roteiro de reunião 1:1, estrutura de feedback baseado em evidências, checklist 30-60-90 e ficha de competência.',
    kicker: 'Modelos Utilizáveis',
    h1: 'Templates complementares: checklist de 1:1, roteiro de feedback, onboarding e ficha de evidências',
    directAnswer:
      'Estes quatro templates prontos ajudam profissionais, gestores e RH a operacionalizar rituais de desenvolvimento imediatamente: pauta enxuta de reunião 1:1, roteiro de feedback objetivo, marcos de onboarding 30-60-90 dias e ficha padrão de evidência verificável.',
    intro:
      'Bons rituais falham quando dependem de página em branco toda semana. Utilize os quatro roteiros práticos abaixo diretamente nas suas reuniões, no seu Diário de Progresso ou no Modo RH do Meu PDI.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e RH - Meu PDI',
    sections: [
      {
        id: 'template-1on1-e-feedback',
        title: 'Template 1: Pauta de Reunião 1:1 + Template 2: Roteiro de Feedback SCI',
        paragraphs: [
          'Use nas conversas quinzenais entre liderança e profissional:',
        ],
        bullets: [
          '[1:1 - Check-in] Como estão energia, foco e prioridades desta quinzena?',
          '[1:1 - PDI] Qual ação avançou desde nosso último encontro e qual evidência gerou?',
          '[1:1 - Bloqueios] Que decisão, recurso ou alinhamento entre áreas precisa de apoio do líder?',
          '[1:1 - Próximo passo] Qual o principal compromisso até a próxima conversa?',
          '[Feedback SCI] Situação específica + Comportamento observável + Impacto gerado + Ação conectada ao PDI.',
        ],
      },
      {
        id: 'template-onboarding-e-evidencia',
        title: 'Template 3: Marcos 30-60-90 + Template 4: Ficha de Evidência',
        paragraphs: [
          'Use para estruturar chegadas em novos cargos e documentar conquistas técnicas ou comportamentais:',
        ],
        example: {
          titulo: 'Modelo copiável de Ficha de Evidência Profissional',
          situacaoAtual: 'Desafio/Contexto: [Qual problema ou meta exigia solução e quando ocorreu]',
          objetivo: 'Competência demonstrada: [Nome da Hard ou Soft Skill + nível atingido]',
          acao: 'Ação individual: [O que você estruturou, executou ou liderou diretamente]',
          prazo: 'Data da entrega: [Mês/Ano]',
          evidencia: 'Resultado + Indicador + Validação: [Métrica antes/depois + link comprobatório + quem validou]',
        },
      },
    ],
    checklist: [
      'Dia 30 do Onboarding: contexto absorvido, acessos prontos, stakeholders mapeados e 1ª entrega guiada.',
      'Dia 60 do Onboarding: escopo autônomo assumido, 1º feedback formal colhido e ajustes no PDI.',
      'Dia 90 do Onboarding: entrega de impacto concluída, revisão de experiência aprovada e novo ciclo aberto.',
      'Revisar fichas de evidência a cada mês para manter números frescos.',
    ],
    commonErrors: [
      'Transformar o roteiro de 1:1 em interrogatório mecânico sem escuta genuína.',
      'Preencher a ficha de evidência sem citar nenhum indicador ou resultado observável.',
    ],
    faqs: [
      {
        q: 'Esses modelos já existem dentro do aplicativo Meu PDI?',
        a: 'Sim! A Ficha de Evidência está integrada a cada competência no Passo 2, o registro de 1:1 e Sucessão está no Modo RH (/app/rh) e os templates de competências por cargo estão no seletor de 40 áreas.',
      },
      {
        q: 'Posso adaptar esses templates para a realidade da minha empresa?',
        a: 'Livremente. Recomendamos apenas manter sempre a conexão entre conversa, ação com prazo e evidência verificável.',
      },
      {
        q: 'Qual template usar primeiro se minha equipe nunca fez PDI?',
        a: 'Comece pelo Template por Profissão dentro do Meu PDI combinado à Pauta enxuta de 1:1 de 30 minutos uma vez por mês.',
      },
      {
        q: 'Onde encontro definições rápidas dos termos usados nesses templates?',
        a: 'Consulte nosso Glossário de Desenvolvimento Profissional (/glossario) com conceitos diretos de PDI, PDP, skill gap, senioridade e ciclos.',
      },
    ],
    relatedLinks: [
      { label: 'Reunião 1:1 baseada em evidências', to: '/reuniao-1-on-1-com-evidencias' },
      { label: 'Como preparar conversas de feedback', to: '/conversas-de-feedback-com-evidencias' },
      { label: 'PDI de onboarding 30, 60 e 90 dias', to: '/pdi-onboarding-30-60-90' },
      { label: 'Como registrar evidências profissionais', to: '/como-registrar-evidencias-profissionais' },
    ],
  },

  glossario: {
    slug: '/glossario',
    cluster: 'Fundamentos',
    seoTitle: 'Glossário de Desenvolvimento Profissional e PDI - Meu PDI',
    metaDescription:
      'Definições diretas de PDI, PDP, hard skills, soft skills, skill gap, senioridade, evidência, 1:1, onboarding e ciclo de desenvolvimento.',
    kicker: 'Referência Rápida',
    h1: 'Glossário de desenvolvimento profissional: termos essenciais do PDI',
    directAnswer:
      'Este glossário define os conceitos centrais usados no planejamento de carreira e gestão de pessoas - incluindo PDI, PDP, competências, skill gap, senioridade, evidência verificável, reunião 1:1, onboarding e ciclo de desenvolvimento - com critérios práticos de aplicação.',
    intro:
      'Padronizar a linguagem entre profissionais, gestores e RH evita mal-entendidos sobre metas, avaliações e planos de crescimento. Abaixo estão as definições objetivas adotadas na plataforma Meu PDI.',
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
      { label: 'Central de todos os guias', to: '/guias' },
    ],
  },
};
