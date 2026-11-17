import type { EditorialArticle } from './types';

export const CLUSTER_RH: Record<string, Omit<EditorialArticle, 'publishedAt' | 'updatedAt'>> = {
  'reuniao-1-on-1-com-evidencias': {
    slug: '/reuniao-1-on-1-com-evidencias',
    cluster: 'RH e Liderança',
    seoTitle: 'Reunião 1:1 baseada em evidências: guia prático - Meu PDI',
    metaDescription:
      'Saiba como conduzir reuniões 1:1 produtivas usando objetivos, bloqueios e evidências do PDI sem transformar a conversa em cobrança de status.',
    kicker: 'Rituais de Liderança',
    h1: 'Como conduzir uma reunião 1:1 baseada em evidências',
    directAnswer:
      'Uma reunião 1:1 baseada em evidências dedica tempo estruturado para ouvir o colaborador, destravar impedimentos e revisar avanços concretos do PDI a partir de entregas e aprendizados registrados, evitando que o encontro vire apenas cobrança de tarefas diárias ou bate-papo sem continuidade.',
    intro:
      'Muitas reuniões individuais entre líder e liderado perdem força após poucas semanas: ou são canceladas por urgências, ou viram repetição da reunião diária de status. Usar o PDI e evidências reais devolve profundidade e continuidade a esse ritual.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'roteiro-30-minutos',
        title: 'Estrutura prática para 30 minutos de 1:1',
        paragraphs: [
          'Divida a conversa em quatro blocos previsíveis para que os dois lados cheguem preparados:',
        ],
        bullets: [
          '10 min - Momento e energia da pessoa: contexto atual, carga de trabalho e prioridades.',
          '10 min - Progresso e evidências do PDI: revisão de uma ação em andamento ou entrega concluída.',
          '5 min - Feedback mútuo e desbloqueio: onde o gestor pode abrir portas ou ajustar escopo.',
          '5 min - Acordos registrados: 1 ou 2 compromissos claros até o próximo encontro.',
        ],
      },
      {
        id: 'exemplo-1on1',
        title: 'Exemplo de registro de 1:1 no Modo RH/Liderança',
        paragraphs: [
          'Registrar pauta e acordos evita esquecer promessas feitas ao time.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: 1:1 quinzenal em equipe de Produto (dados fictícios)',
          situacaoAtual: 'Designer Pleno está com ação de pesquisa com usuários bloqueada por falta de acesso a clientes.',
          objetivo: 'Destravar entrevistas de descoberta previstas no PDI do trimestre.',
          acao: 'Gestor conecta Designer ao líder de CS ainda nesta semana; colaborador conduz e documenta 5 entrevistas.',
          prazo: '14 dias (próxima 1:1)',
          evidencia: 'Síntese das 5 entrevistas apresentada ao squad e registrada na ficha de competência.',
        },
      },
    ],
    checklist: [
      'Manter dia e horário protegidos na agenda (evitar cancelamentos em série).',
      'Pedir que o colaborador traga 1 avanço e 1 bloqueio do seu PDI.',
      'Registrar pauta e acordos resumidos ao final da conversa.',
      'Revisar o combinado da reunião anterior nos primeiros 2 minutos.',
    ],
    commonErrors: [
      'Usar 100% do tempo falando de prazos de projetos operacionais do dia.',
      'O líder falar durante 25 dos 30 minutos sem fazer perguntas abertas.',
      'Não registrar os combinados e repetir a mesma discussão todo mês.',
    ],
    faqs: [
      {
        q: 'Qual a frequência ideal para reuniões 1:1?',
        a: 'Quinzenal de 30 minutos costuma ser o melhor ponto de equilíbrio para times de até 8 a 10 pessoas. Em período de onboarding (primeiros 60 dias), encontros semanais mais curtos aceleram a adaptação.',
      },
      {
        q: 'Em toda 1:1 preciso revisar o PDI inteiro?',
        a: 'Não. Revise o PDI completo uma vez por mês; nos demais encontros, olhe apenas para a ação prioritária do momento e eventuais bloqueios.',
      },
      {
        q: 'Quem é o dono da pauta da 1:1?',
        a: 'A 1:1 pertence prioritariamente ao colaborador, com co-responsabilidade do líder para trazer contexto estratégico e feedbacks.',
      },
      {
        q: 'Onde registrar os acordos no Meu PDI?',
        a: 'O colaborador registra aprendizados no seu Diário e ações no Plano, enquanto o líder ou RH pode consolidar pautas e acordos no bloco de Conversas 1:1 do Modo RH.',
      },
    ],
    relatedLinks: [
      { label: 'Solução Meu PDI para RH e gestores', to: '/para-rh' },
      { label: 'Como preparar conversas de feedback', to: '/conversas-de-feedback-com-evidencias' },
      { label: 'Templates de 1:1, feedback e onboarding', to: '/templates-pdi-1on1-feedback-onboarding' },
      { label: 'PDI para liderança', to: '/pdi-para-lideranca' },
    ],
  },

  'matriz-de-competencias-por-area-e-senioridade': {
    slug: '/matriz-de-competencias-por-area-e-senioridade',
    cluster: 'RH e Liderança',
    seoTitle: 'Como criar matriz de competências por senioridade - Meu PDI',
    metaDescription:
      'Guia para RH e líderes criarem uma matriz de competências clara por área, especialidade e senioridade sem burocracia excessiva.',
    kicker: 'Arquitetura de Carreira',
    h1: 'Como criar uma matriz de competências por área e senioridade',
    directAnswer:
      'Uma matriz de competências eficaz descreve as habilidades técnicas, comportamentais e expectativas de autonomia para cada nível de senioridade (Estagiário a Especialista/Gestor) em uma área. Ela deve ser enxuta, baseada em entregas observáveis e fácil de traduzir em planos individuais de desenvolvimento.',
    intro:
      'Empresas sem matriz de competências sofrem com percepção de injustiça em promoções; empresas com planilhas de 200 linhas sofrem com abandono porque ninguém consegue usar o material no dia a dia. O equilíbrio está na clareza operacional.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'estrutura-enxuta',
        title: 'Os elementos indispensáveis de uma boa matriz',
        paragraphs: [
          'Inspire-se na estrutura usada nas 40 áreas do Meu PDI para manter simplicidade e rigor:',
        ],
        bullets: [
          'Níveis bem diferenciados por escopo e autonomia (Estagiário, Júnior, Pleno, Sênior, Especialista e Liderança).',
          '5 a 8 hard skills essenciais por nível/especialidade, evitando listar dezenas de microferramentas passageiras.',
          'Soft skills conectadas ao contexto de desafio de cada degrau.',
          'Frase síntese de expectativa: qual problema aquele nível resolve sem supervisão.',
        ],
      },
      {
        id: 'exemplo-matriz',
        title: 'Exemplo de progressão de uma mesma competência entre níveis',
        paragraphs: [
          'Veja como diferenciar claramente os degraus para evitar ambiguidade.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Progressão em Gestão de Contratos (dados fictícios)',
          situacaoAtual: 'Time jurídico e de compras sem critério claro entre Júnior, Pleno e Sênior.',
          objetivo: 'Publicar régua transparente de evolução para 18 profissionais da área.',
          acao: 'Definir: Júnior revisa minutas padrão com checklist; Pleno negocia cláusulas de risco médio com autonomia; Sênior estrutura contratos estratégicos e padrões da área.',
          prazo: '45 dias',
          evidencia: 'Matriz validada pelas lideranças e adotada em 100% dos PDIs do ciclo seguinte.',
        },
      },
    ],
    checklist: [
      'Construir a matriz em parceria entre RH e referências técnicas de cada área.',
      'Considerar especialidades dentro de áreas amplas (ex.: Tecnologia, Saúde, Finanças).',
      'Testar a matriz com 2 ou 3 casos reais antes de lançar para toda a empresa.',
      'Revisar anualmente para atualizar mudanças tecnológicas ou regulatórias.',
    ],
    commonErrors: [
      'Criar descrições vagas que servem igualmente para Pleno e Sênior.',
      'Copiar matrizes estrangeiras sem adaptar ao porte e realidade da operação.',
      'Publicar a matriz em PDF estático sem conectá-la à ferramenta de PDI da equipe.',
    ],
    faqs: [
      {
        q: 'Quantas competências cada nível deve ter?',
        a: 'Entre 5 e 8 competências técnicas e 3 a 5 comportamentais por nível é o ideal. Acima disso, a avaliação vira um preenchimento mecânico de caixas.',
      },
      {
        q: 'Posso usar as 40 matrizes do Meu PDI como ponto de partida?',
        a: 'Sim. O Meu PDI já traz matrizes estruturadas para 40 áreas profissionais nos 6 níveis de carreira, permitindo que sua equipe comece imediatamente sem meses de consultoria prévia.',
      },
      {
        q: 'Como contemplar profissionais que não querem virar gestores?',
        a: 'Mantenha a carreira em Y a partir do nível Sênior, diferenciando claramente as expectativas de Especialista Técnico (impacto técnico transversal) e Gestor (impacto via liderança de pessoas).',
      },
      {
        q: 'Como lidar com cargos híbridos na matriz?',
        a: 'Permita combinar uma área principal com áreas complementares, avaliando o núcleo da função sem ignorar habilidades multidisciplinares.',
      },
    ],
    relatedLinks: [
      { label: 'Hard skills e soft skills: como avaliar', to: '/hard-skills-e-soft-skills' },
      { label: 'Solução Meu PDI para RH e gestores', to: '/para-rh' },
      { label: 'Como medir evolução sem transformar tudo em nota', to: '/medir-evolucao-do-pdi-sem-notas' },
      { label: 'PDI ou PDP: qual termo usar?', to: '/pdi-ou-pdp' },
    ],
  },

  'medir-evolucao-do-pdi-sem-notas': {
    slug: '/medir-evolucao-do-pdi-sem-notas',
    cluster: 'RH e Liderança',
    seoTitle: 'Como medir evolução do PDI além de notas - Meu PDI',
    metaDescription:
      'Saiba como RH e líderes podem acompanhar a efetividade dos PDIs combinando evidências práticas, saúde estrutural e conclusão de ciclos.',
    kicker: 'People Analytics com Contexto',
    h1: 'Como medir a evolução de um plano de desenvolvimento sem transformar tudo em nota',
    directAnswer:
      'Medir evolução de desenvolvimento sem burocratizar exige combinar três sinais complementares: consistência estrutural do plano (objetivos com ações e recursos), avanço na execução prática e qualidade das evidências entregues no trabalho real, evitando disputas artificiais por décimos de nota.',
    intro:
      'Quando o desenvolvimento vira apenas uma nota numérica atrelada diretamente a bônus, as pessoas param de declarar lacunas reais com medo de serem penalizadas. Separar nota punitiva de evidência de aprendizado devolve honestidade ao PDI.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'indicadores-qualitativos-e-estruturais',
        title: 'O que acompanhar no lugar de médias frias',
        paragraphs: [
          'Veja indicadores que mostram se o desenvolvimento está vivo na equipe:',
        ],
        bullets: [
          'Saúde estrutural do plano: os objetivos possuem ações vinculadas, prazos válidos e recursos previstos?',
          'Proporção de metas de impacto: quantas ações geram entregas e resultados reais versus apenas consumo de cursos?',
          'Evidências validadas: o colaborador consegue demonstrar o que mudou na sua entrega concreta?',
          'Continuidade de ciclos: a equipe revisa e fecha ciclos trimestrais ou abandona após o cadastro?',
        ],
      },
      {
        id: 'exemplo-medicao',
        title: 'Exemplo de leitura saudável pelo RH',
        paragraphs: [
          'Consolidar padrões ajuda o RH a investir orçamento de treinamento onde realmente há demanda.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Consolidação trimestral de People Development (dados fictícios)',
          situacaoAtual: 'Empresa media PDI apenas por "% de formulários preenchidos no sistema" (95% preenchido, quase zero executado).',
          objetivo: 'Acompanhar evolução real de 40 colaboradores respeitando autonomia.',
          acao: 'Adotar revisão trimestral com foco em ações concluídas, lacunas recorrentes da equipe e 1 evidência prática apresentada por pessoa.',
          prazo: '1 ciclo de 90 dias',
          evidencia: 'Identificação dos 3 gaps mais frequentes do time para treinamento dirigido e 68% de ações práticas concluídas.',
        },
      },
    ],
    checklist: [
      'Desvincular a declaração sincera de lacunas no PDI de penalizações imediatas.',
      'Olhar para tendências agregadas de gaps da equipe para planejar treinamentos coletivos.',
      'Valorizar fichas de evidência concretas nas conversas de calibração.',
      'Acompanhar bloqueios recorrentes que impedem os times de executar seus planos.',
    ],
    commonErrors: [
      'Cobrar 100% de preenchimento em uma sexta-feira e nunca mais tocar no assunto.',
      'Forçar ranking numérico de quem "tem o maior score de autoavaliação".',
      'Medir sucesso de T&D apenas por horas de aula assistidas.',
    ],
    faqs: [
      {
        q: 'Por que autoavaliação numérica isolada não serve para comparar duas pessoas?',
        a: 'Porque réguas subjetivas variam: um profissional rigoroso pode se dar 3/5 entregando mais do que outro menos crítico que se avalia como 5/5. O que calibra a leitura é a evidência concreta.',
      },
      {
        q: 'Então a régua de 1 a 5 não deve existir?',
        a: 'Ela é muito útil para a própria pessoa visualizar direção (nível atual vs. nível-alvo), desde que ancorada em critérios de autonomia e acompanhada de evidências.',
      },
      {
        q: 'Como o Modo RH do Meu PDI ajuda nessa medição?',
        a: 'Ele consolida de forma anonimizada os gaps mais frequentes, ações concluídas e ciclos fechados a partir dos perfis que os colaboradores autorizaram compartilhar.',
      },
      {
        q: 'Qual é o melhor sinal de que a cultura de PDI amadureceu?',
        a: 'Quando os próprios colaboradores trazem seus objetivos e evidências espontaneamente para as reuniões 1:1 sem precisar de campanha de cobrança do RH.',
      },
    ],
    relatedLinks: [
      { label: 'Como comparar ciclos sem expor pessoas', to: '/comparar-ciclos-sem-expor-pessoas' },
      { label: 'Como evitar que o PDI vire formulário esquecido', to: '/evitar-pdi-esquecido' },
      { label: 'Como registrar evidências profissionais', to: '/como-registrar-evidencias-profissionais' },
      { label: 'Solução Meu PDI para RH e gestores', to: '/para-rh' },
    ],
  },

  'pdi-no-onboarding-de-colaboradores': {
    slug: '/pdi-no-onboarding-de-colaboradores',
    cluster: 'RH e Liderança',
    seoTitle: 'Como usar PDI no onboarding de colaboradores - Meu PDI',
    metaDescription:
      'Veja como RH e gestores podem usar um PDI de onboarding para acelerar rampagem, alinhar expectativas e reduzir desligamentos precoces.',
    kicker: 'Onboarding Estruturado',
    h1: 'Como usar PDI no onboarding de novos colaboradores',
    directAnswer:
      'Usar o PDI já no onboarding conecta a integração institucional aos primeiros desafios reais do cargo: líder e novo colaborador alinham as competências prioritárias dos primeiros 90 dias, definem entregas progressivas e criam rituais claros de apoio e feedback antes do fim do período de experiência.',
    intro:
      'Muitas empresas fazem uma excelente primeira semana de boas-vindas e depois deixam a pessoa descobrir o resto no improviso. Conectar o onboarding a um primeiro ciclo curto de PDI reduz drasticamente a insegurança inicial e o turnover precoce.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'fluxo-rh-gestor',
        title: 'Papel do RH e papel do gestor no PDI de chegada',
        paragraphs: [
          'A divisão clara de responsabilidades evita sobrecarga para ambos:',
        ],
        bullets: [
          'Semana 1 (RH + Gestor): apresentar matriz da área, cultura e expectativas gerais da cadeira.',
          'Semana 2 (Gestor + Colaborador): definir 2 a 3 objetivos para os primeiros 90 dias e mapear padrinho/alianças internas.',
          'Dias 30, 60 e 90: check-ins curtos baseados nas entregas e aprendizados registrados.',
        ],
      },
      {
        id: 'exemplo-rh-onboarding',
        title: 'Exemplo de implantação em escala enxuta',
        paragraphs: [
          'Mesmo equipes pequenas de RH conseguem padronizar essa jornada.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Onboarding técnico estruturado (dados fictícios)',
          situacaoAtual: 'Novos contratados levavam quase 5 meses para entregar com autonomia por falta de roteiro pós-primeira semana.',
          objetivo: 'Reduzir tempo de rampagem para 90 dias com marcos verificáveis.',
          acao: 'Incluir criação do ciclo 30-60-90 no Meu PDI na segunda semana, com 1 entrega guiada no mês 1 e revisão formal no dia 45.',
          prazo: '90 dias por turma de entrada',
          evidencia: '100% dos novos membros realizaram entregas autônomas até o dia 60 e queda no desligamento em experiência.',
        },
      },
    ],
    checklist: [
      'Entregar a matriz da função e especialidade logo na primeira quinzena.',
      'Designar pelo menos um colega experiente como aliança de apoio técnico.',
      'Fazer revisão obrigatória de meio de ciclo (dia 45) para corrigir rota a tempo.',
      'Transicionar do ciclo de onboarding para o ciclo regular de PDI após os 90 dias.',
    ],
    commonErrors: [
      'Sobrecarregar o novato com 15 metas simultâneas enquanto ele ainda aprende acessos e sistemas.',
      'Deixar para dar o primeiro feedback real apenas na semana final do contrato de experiência.',
      'Tratar onboarding apenas como entrega de equipamentos e vídeos institucionais.',
    ],
    faqs: [
      {
        q: 'Em que momento do onboarding o PDI deve ser preenchido?',
        a: 'Entre o final da primeira e a segunda semana. Nos primeiros dias a pessoa ainda está absorvendo contexto básico; na segunda semana já consegue compreender prioridades com o gestor.',
      },
      {
        q: 'Qual a diferença entre checklist administrativo de onboarding e PDI de onboarding?',
        a: 'O checklist cobre acessos, políticas e treinamentos obrigatórios; o PDI de onboarding organiza o desenvolvimento das competências específicas da função e as primeiras entregas de valor.',
      },
      {
        q: 'Isso funciona para vagas operacionais e administrativas também?',
        a: 'Sim. Nas 40 áreas do Meu PDI há matrizes para Logística, Varejo, Indústria, Saúde, Administração, Gastronomia e diversas áreas operacionais e técnicas.',
      },
      {
        q: 'E se a pessoa já chegar muito sênior?',
        a: 'Para contratações seniores e liderança, o foco dos 90 dias muda de aprendizado técnico básico para diagnóstico de equipe, construção de alianças entre áreas e plano tático.',
      },
    ],
    relatedLinks: [
      { label: 'PDI de 30, 60 e 90 dias (visão do profissional)', to: '/pdi-onboarding-30-60-90' },
      { label: 'Templates de onboarding, 1:1 e feedback', to: '/templates-pdi-1on1-feedback-onboarding' },
      { label: 'Solução Meu PDI para RH e gestores', to: '/para-rh' },
      { label: 'Reunião 1:1 baseada em evidências', to: '/reuniao-1-on-1-com-evidencias' },
    ],
  },

  'conversas-de-feedback-com-evidencias': {
    slug: '/conversas-de-feedback-com-evidencias',
    cluster: 'RH e Liderança',
    seoTitle: 'Conversas de feedback com objetivos e evidências - Meu PDI',
    metaDescription:
      'Como preparar e conduzir conversas de feedback construtivas e sem subjetividade usando objetivos acordados e evidências registradas no PDI.',
    kicker: 'Cultura de Feedback',
    h1: 'Como preparar conversas de feedback com objetivos e evidências',
    directAnswer:
      'Uma conversa de feedback eficaz apoia-se em situações específicas, comportamentos observados, impacto gerado e conexão direta com os objetivos do PDI. Ao substituir rótulos pessoais por evidências concretas, o diálogo reduz defensividade e termina sempre com uma ação prática de evolução.',
    intro:
      'Tanto líderes quanto liderados costumam adiar conversas de feedback porque temem conflito ou injustiça. O desconforto quase sempre nasce da falta de fatos documentados: quando ambos olham para objetivos combinados e registros claros, o feedback vira ajuste natural de rota.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'estrutura-sci',
        title: 'Do rótulo vago ao fato observável (Situação, Comportamento, Impacto + Próximo Passo)',
        paragraphs: [
          'Nunca avalie a identidade da pessoa ("você é desorganizado"); descreva o evento concreto e construa a ação no PDI:',
        ],
        bullets: [
          'Situação: "Na entrega do relatório trimestral da última terça-feira..."',
          'Comportamento observável: "...os números de cancelamento foram enviados sem conferência cruzada com a base financeira..."',
          'Impacto: "...o que gerou necessidade de retificação diante da diretoria e atrasou a decisão em 2 dias."',
          'Conexão com PDI: "Vamos incluir uma etapa de validação prévia como ação do seu objetivo de confiabilidade analítica?"',
        ],
      },
      {
        id: 'exemplo-feedback',
        title: 'Exemplo de feedback de reconhecimento e expansão',
        paragraphs: [
          'Feedback baseado em evidência também serve para reforçar acertos e aumentar escopo.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Feedback positivo conectado à matriz Sênior (dados fictícios)',
          situacaoAtual: 'Analista Pleno conduziu migração crítica com comunicação exemplar entre três times.',
          objetivo: 'Consolidar competência de liderança técnica para próximo nível.',
          acao: 'Registrar a entrega como ficha de evidência validada no PDI e convidar o profissional para liderar o próximo projeto transversal.',
          prazo: 'Imediato na 1:1 pós-projeto',
          evidencia: 'Ficha validada no PDI + novo escopo acordado formalmente.',
        },
      },
    ],
    checklist: [
      'Reunir exemplos reais e recentes antes da conversa (nunca falar por ouvir dizer).',
      'Fazer perguntas para ouvir a perspectiva do colaborador sobre a situação.',
      'Conectar o ponto discutido a uma competência ou ação concreta do PDI.',
      'Dar feedbacks positivos com a mesma especificidade dedicada aos corretivos.',
    ],
    commonErrors: [
      'Guardar um incômodo de março para despejar apenas na avaliação formal de novembro.',
      'Usar o "sanduíche de elogio artificial" que confunde a mensagem central.',
      'Encerrar o feedback sem alinhar o que muda na prática a partir da próxima semana.',
    ],
    faqs: [
      {
        q: 'Qual a diferença entre feedback pontual e revisão de ciclo do PDI?',
        a: 'O feedback pontual deve acontecer logo após um evento relevante (em dias, não meses). A revisão de ciclo analisa o conjunto das evidências acumuladas ao longo de 3 a 6 meses.',
      },
      {
        q: 'Como pedir feedback quando meu líder quase não dá retorno?',
        a: 'Faça perguntas fechadas sobre uma entrega específica: "Na apresentação de hoje para o cliente, qual ponto funcionou bem e que ajuste você faria para a próxima?"',
      },
      {
        q: 'Devo registrar feedbacks recebidos no Meu PDI?',
        a: 'Sim. Use o Diário de Progresso para anotar feedbacks construtivos e adicione os feedbacks positivos de entregas concluídas nas suas fichas de evidência.',
      },
      {
        q: 'Como reagir a um feedback com o qual não concordo totalmente?',
        a: 'Ouça sem interromper, peça um exemplo concreto para entender a percepção do outro, compartilhe dados objetivos do contexto e proponha um combinado verificável.',
      },
    ],
    relatedLinks: [
      { label: 'Reunião 1:1 baseada em evidências', to: '/reuniao-1-on-1-com-evidencias' },
      { label: 'Templates de feedback, 1:1 e onboarding', to: '/templates-pdi-1on1-feedback-onboarding' },
      { label: 'Inteligência emocional no trabalho', to: '/inteligencia-emocional-no-trabalho' },
      { label: 'Como registrar evidências profissionais', to: '/como-registrar-evidencias-profissionais' },
    ],
  },

  'evitar-pdi-esquecido': {
    slug: '/evitar-pdi-esquecido',
    cluster: 'RH e Liderança',
    seoTitle: 'Como evitar que o PDI vire formulário esquecido - Meu PDI',
    metaDescription:
      'Descubra por que a maioria dos PDIs é abandonada após a avaliação anual e quais mudanças práticas mantêm o desenvolvimento ativo o ano todo.',
    kicker: 'Engajamento Real',
    h1: 'Como evitar que o PDI vire um formulário esquecido',
    directAnswer:
      'O PDI vira um documento esquecido quando é tratado como obrigação burocrática anual desconectada do trabalho diário. Para mantê-lo vivo, reduza a quantidade de metas, priorize ações integradas aos projetos reais do trimestre, estabeleça check-ins rápidos e dê propriedade real da ferramenta ao profissional.',
    intro:
      'Todo RH conhece a cena: na semana pós-avaliação de desempenho, todos preenchem planilhas de PDI às pressas; onze meses depois, ninguém lembra sequer onde o arquivo está salvo. O problema não é falta de interesse em crescer, e sim desenho ruim do processo.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'cinco-causas-abandono',
        title: 'As cinco causas reais do abandono de PDIs',
        paragraphs: [
          'Corrija a estrutura antes de cobrar adesão:',
        ],
        bullets: [
          'Excesso de metas: planos com 8 objetivos e 20 cursos que não cabem na agenda real.',
          'Desconexão com o trabalho: tratar PDI apenas como estudo fora do expediente.',
          'Ciclos longos demais: metas anuais perdem sentido quando as prioridades mudam em 90 dias.',
          'Falta de visibilidade de progresso: planilhas estáticas sem status, alertas de prazo nem histórico.',
          'Ausência de conversa: líderes que nunca perguntam sobre o plano nas 1:1s.',
        ],
      },
      {
        id: 'exemplo-reativacao',
        title: 'Como redesenhar o ritual em ciclos enxutos',
        paragraphs: [
          'Menos burocracia gera muito mais execução.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Redesenho de ciclo em empresa de tecnologia de 80 pessoas (dados fictícios)',
          situacaoAtual: 'Adesão inicial de 90% na planilha anual, mas apenas 12% de revisão seis meses depois.',
          objetivo: 'Elevar revisão ativa trimestral acima de 70% sem criar reuniões extras.',
          acao: 'Limitar PDI a no máximo 3 objetivos de 90 dias, integrar 10 min na 1:1 mensal e focar 70% das ações em projetos reais da sprint.',
          prazo: '1 trimestre',
          evidencia: '78% dos colaboradores atualizaram ações e fecharam retrospectiva do ciclo trimestral.',
        },
      },
    ],
    checklist: [
      'Adotar ciclos de 90 a 120 dias em vez de planos anuais imutáveis.',
      'Travar no máximo 3 a 4 objetivos ativos por pessoa.',
      'Ativar lembretes de prazo e check-ins semanais rápidos.',
      'Celebrar entregas práticas e evidências geradas, não apenas formulários enviados.',
    ],
    commonErrors: [
      'Criar formulários com 15 colunas obrigatórias que levam horas para preencher.',
      'Cobrar PDI dos liderados quando a própria liderança nunca atualiza o seu.',
      'Bloquear edição do plano durante o ano, impedindo adaptação a novos projetos.',
    ],
    faqs: [
      {
        q: 'Qual o tempo ideal que alguém deve gastar atualizando o PDI por semana?',
        a: 'Cinco a dez minutos por semana são suficientes para marcar avanço em uma ação ou registrar um aprendizado no diário.',
      },
      {
        q: 'Como recuperar um PDI que já está parado há meses?',
        a: 'Não tente cumprir tudo atrasado de uma vez. Revise o que ainda faz sentido hoje, descarte metas obsoletas, reagende 2 ações prioritárias para os próximos 30 dias e retome o ritmo.',
      },
      {
        q: 'Ferramenta dedicada faz diferença em relação a planilha?',
        a: 'Sim, porque automatiza cálculo de saúde do plano, alertas de vencimento, comparador de matriz, diário contínuo e preservação de histórico entre ciclos.',
      },
      {
        q: 'Como engajar líderes céticos sobre PDI?',
        a: 'Mostre que um PDI conectado aos desafios reais da área melhora a entrega das metas do próprio time e reduz dependência operacional sobre o gestor.',
      },
    ],
    relatedLinks: [
      { label: 'Autonomia do colaborador no próprio desenvolvimento', to: '/autonomia-do-colaborador-no-pdi' },
      { label: 'Reunião 1:1 baseada em evidências', to: '/reuniao-1-on-1-com-evidencias' },
      { label: 'Como criar ações de desenvolvimento com prazo', to: '/acoes-de-desenvolvimento-com-prazo' },
      { label: 'Como acompanhar evolução ao longo do tempo', to: '/como-acompanhar-evolucao-de-competencias' },
    ],
  },

  'autonomia-do-colaborador-no-pdi': {
    slug: '/autonomia-do-colaborador-no-pdi',
    cluster: 'RH e Liderança',
    seoTitle: 'Autonomia do colaborador no PDI: protagonismo real - Meu PDI',
    metaDescription:
      'Como desenvolver protagonismo real no PDI equilibrando autonomia do profissional com direcionamento estratégico da liderança e do RH.',
    kicker: 'Protagonismo e Cultura',
    h1: 'Como dar autonomia ao colaborador no próprio desenvolvimento',
    directAnswer:
      'Dar autonomia no desenvolvimento significa colocar o profissional como titular do seu PDI - escolhendo objetivos, trilhas e permissões de compartilhamento - enquanto gestor e RH atuam como patrocinadores que oferecem contexto estratégico, feedback honesto e oportunidades práticas de aplicação.',
    intro:
      'Existe uma grande diferença entre "protagonismo apoiado" e abandono disfarçado de autonomia. Dizer "a carreira é sua, vire-se" gera desorientação; impor cada linha do plano de cima para baixo gera cumprimento burocrático sem engajamento.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'equilibrio-protagonismo-apoio',
        title: 'O que cabe ao profissional e o que cabe à empresa',
        paragraphs: [
          'Quando os papéis são claros, a confiança aumenta:',
        ],
        bullets: [
          'Papel do profissional: fazer autoavaliação sincera, propor objetivos, executar ações no prazo e registrar suas evidências.',
          'Papel da liderança: dar visibilidade dos desafios da área, calibrar expectativas de senioridade e abrir espaço em projetos.',
          'Papel do RH: fornecer matrizes claras, rituais simples, curadoria de recursos e proteção de privacidade.',
        ],
      },
      {
        id: 'titularidade-da-conta',
        title: 'Por que a titularidade do histórico aumenta a adesão',
        paragraphs: [
          'Quando o plano fica preso em um sistema interno inacessível fora da empresa, muita gente o vê apenas como obrigação corporativa. Quando o profissional é dono do seu registro e escolhe o que compartilhar com RH e gestor, a dedicação à qualidade das evidências cresce naturalmente.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Co-criação de PDI em área de Atendimento/CS (dados fictícios)',
          situacaoAtual: 'Planos prescritos pelo supervisor tinham baixa execução (25%).',
          objetivo: 'Estimular autonomia com alinhamento às metas de retenção da área.',
          acao: 'Colaboradores montam proposta inicial no Meu PDI escolhendo especialidade e trilha, e validam 1 meta de impacto + 1 meta de carreira futura na 1:1.',
          prazo: 'Ciclo de 90 dias',
          evidencia: 'Aumento da conclusão de ações para 74% e maior aproveitamento em vagas internas.',
        },
      },
    ],
    checklist: [
      'Garantir que o profissional redija a primeira versão do seu plano antes da validação.',
      'Permitir pelo menos um objetivo ligado à visão de médio prazo da pessoa (inclusive mobilidade interna).',
      'Respeitar a privacidade do diário pessoal de aprendizados.',
      'Oferecer matrizes transparentes para que ninguém dependa de adivinhação.',
    ],
    commonErrors: [
      'Usar "protagonismo de carreira" como desculpa para ausência de feedback e falta de matriz.',
      'Rejeitar qualquer interesse de aprendizado que vá além da tarefa imediata da semana.',
      'Reescrever inteiramente o PDI da pessoa sem explicar o motivo.',
    ],
    faqs: [
      {
        q: 'E se o colaborador trouxer objetivos desconectados da realidade da área?',
        a: 'Papel da liderança é negociar o encontro dos dois mundos: manter 70% do foco nas lacunas que destravam entregas atuais e reservar espaço legítimo para ambições futuras.',
      },
      {
        q: 'Dar autonomia não cria planos cada um de um jeito impossíveis de acompanhar?',
        a: 'Não quando todos usam uma estrutura comum - como área, senioridade, objetivos SMART, ações com prazo e evidências verificáveis.',
      },
      {
        q: 'Como ajudar profissionais juniores que ainda não sabem por onde começar?',
        a: 'Ofereça o Template por Profissão e o Assistente de Recomendação de Área do Meu PDI como guia inicial, refinando juntos na primeira 1:1.',
      },
      {
        q: 'Autonomia aumenta risco de perda de talentos?',
        a: 'Pelo contrário: profissionais que enxergam evolução real e espaço de diálogo dentro da empresa permanecem mais tempo e entregam com maior engajamento.',
      },
    ],
    relatedLinks: [
      { label: 'Privacidade e LGPD em processos de desenvolvimento', to: '/privacidade-e-lgpd-no-desenvolvimento' },
      { label: 'Como evitar que o PDI vire formulário esquecido', to: '/evitar-pdi-esquecido' },
      { label: 'Solução Meu PDI para RH e gestores', to: '/para-rh' },
      { label: 'Matriz de competências por área e senioridade', to: '/matriz-de-competencias-por-area-e-senioridade' },
    ],
  },

  'privacidade-e-lgpd-no-desenvolvimento': {
    slug: '/privacidade-e-lgpd-no-desenvolvimento',
    cluster: 'RH e Liderança',
    seoTitle: 'Privacidade e LGPD no PDI e gestão de pessoas - Meu PDI',
    metaDescription:
      'Entenda como aplicar privacidade por padrão, consentimento granular e boas práticas de LGPD em planos de desenvolvimento profissional.',
    kicker: 'Privacidade e Governança',
    h1: 'Privacidade, LGPD e compartilhamento de dados em processos de desenvolvimento',
    directAnswer:
      'Aplicar a LGPD e privacidade por padrão em processos de desenvolvimento exige minimizar dados coletados, proteger anotações reflexivas do titular e garantir controle granular sobre quem acessa o perfil (gestor, RH ou recrutador), por quanto tempo e com possibilidade imediata de revogação ou exclusão.',
    intro:
      'Planos de desenvolvimento contêm informações sensíveis sobre inseguranças profissionais, dificuldades técnicas, feedbacks e planos de carreira. Sem segurança psicológica e controle real de acesso, o profissional esconde suas verdadeiras lacunas - e o PDI perde sua função.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão Jurídica e de Produto - Meu PDI',
    sections: [
      {
        id: 'principios-praticos',
        title: 'Quatro princípios de privacidade aplicados ao PDI',
        paragraphs: [
          'Veja como estruturar governança saudável em programas individuais e corporativos:',
        ],
        bullets: [
          'Privacidade por padrão (Privacy by Default): nenhum perfil, nota ou diário deve nascer público sem ação explícita do titular.',
          'Minimização e finalidade: compartilhar com RH ou gestor apenas competências, objetivos e ciclos necessários ao acompanhamento.',
          'Granularidade e revogação: links com validade definida, proteção opcional por senha, seleção de competências e revogação em 1 clique.',
          'Portabilidade e eliminação: direito de exportar backup completo em JSON e apagar todos os dados remotos quando desejar.',
        ],
      },
      {
        id: 'exemplo-governanca',
        title: 'Como conciliar visão de RH com proteção individual',
        paragraphs: [
          'O RH não precisa ler diários pessoais para planejar treinamentos da empresa.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Fluxo de consentimento em ciclo de desenvolvimento (dados fictícios)',
          situacaoAtual: 'Colaboradora usa o Diário para refletir sobre ansiedade em apresentações, mas quer mostrar evolução técnica ao RH.',
          objetivo: 'Compartilhar progresso do ciclo sem expor anotações pessoais.',
          acao: 'Gera link no Meu PDI com permissão "Compartilhado com RH", validade de 30 dias e opção "sem diário pessoal".',
          prazo: 'Configuração imediata',
          evidencia: 'Histórico de consentimento registrado e consolidação anonimizada no painel de RH.',
        },
      },
    ],
    checklist: [
      'Separar espaço privado de reflexão (Diário) do resumo compartilhável de competências.',
      'Utilizar relatórios agregados e anonimizados para análises de equipe.',
      'Definir prazo de expiração ao enviar links de perfil em processos seletivos.',
      'Evitar inserir dados pessoais de terceiros ou segredos de clientes nas descrições.',
    ],
    commonErrors: [
      'Deixar pastas de rede abertas onde qualquer pessoa lê a avaliação e o PDI de colegas.',
      'Gerar links públicos permanentes e indexáveis por buscadores sem aviso claro.',
      'Coletar dados pessoais desnecessários em relatórios de treinamento.',
    ],
    faqs: [
      {
        q: 'Perfis compartilhados no Meu PDI aparecem no Google?',
        a: 'Não. Os links compartilháveis (/p/ID) utilizam identificadores aleatórios de alta entropia, recebem diretiva noindex/nofollow e podem ser protegidos por senha, prazo de validade e revogação imediata.',
      },
      {
        q: 'Posso excluir todos os meus dados se quiser encerrar a conta?',
        a: 'Sim. Na página de Configurações do Meu PDI, você pode exportar um backup completo em JSON e acionar a exclusão definitiva dos dados na nuvem e da conta de acesso.',
      },
      {
        q: 'Como o RH analisa dados sem expor indivíduos?',
        a: 'No Modo RH, os perfis autorizados são consolidados sob códigos anônimos (ex.: COLAB-01) e exportados sem nome nem e-mail.',
      },
      {
        q: 'Cookies analíticos são obrigatórios para usar a plataforma?',
        a: 'Não. O Meu PDI bloqueia tags analíticas até que haja consentimento explícito no banner de privacidade, funcionando integralmente mesmo se você recusar cookies opcionais.',
      },
    ],
    relatedLinks: [
      { label: 'Política de Privacidade e LGPD do Meu PDI', to: '/privacidade' },
      { label: 'Como comparar ciclos sem expor pessoas', to: '/comparar-ciclos-sem-expor-pessoas' },
      { label: 'Autonomia do colaborador no PDI', to: '/autonomia-do-colaborador-no-pdi' },
      { label: 'Solução Meu PDI para RH e gestores', to: '/para-rh' },
    ],
  },

  'comparar-ciclos-sem-expor-pessoas': {
    slug: '/comparar-ciclos-sem-expor-pessoas',
    cluster: 'RH e Liderança',
    seoTitle: 'Como comparar ciclos de PDI sem expor pessoas - Meu PDI',
    metaDescription:
      'Aprenda a analisar tendências de competências, conclusão de ciclos e lacunas por área em RH preservando anonimato e segurança psicológica.',
    kicker: 'Análise Coletiva Ética',
    h1: 'Como comparar ciclos de desenvolvimento sem expor pessoas',
    directAnswer:
      'Comparar ciclos de desenvolvimento de forma ética significa agregar dados por área, nível ou competência para identificar gargalos coletivos e evolução organizacional, nunca exibindo rankings individuais públicos nem expondo fragilidades pessoais fora da relação direta de confiança com a liderança.',
    intro:
      'Gestores de RH precisam responder à diretoria se os programas de desenvolvimento estão surtindo efeito. O desafio é gerar essa inteligência coletiva sem transformar o PDI em um painel de exposição que intimide as equipes.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'o-que-comparar',
        title: 'Perguntas estratégicas que dados agregados respondem bem',
        paragraphs: [
          'Em vez de comparar João contra Maria, compare a evolução do sistema ao longo dos trimestres:',
        ],
        bullets: [
          'Quais são as 5 lacunas de competência mais frequentes em cada diretoria neste semestre?',
          'Qual área tem maior taxa de ações concluídas e onde as ações estão travando por falta de tempo ou recursos?',
          'Quantos ciclos completos foram fechados no trimestre atual em comparação ao anterior?',
          'As ações estão concentradas só em cursos ou evoluíram para entregas e resultados práticos?',
        ],
      },
      {
        id: 'exemplo-comparacao',
        title: 'Exemplo de decisão de orçamento guiada por ciclos anonimizados',
        paragraphs: [
          'Dados agregados evitam gastar orçamento em treinamentos genéricos que ninguém pediu.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Planejamento anual de T&D com dados anonimizados (dados fictícios)',
          situacaoAtual: 'Orçamento de treinamento era dividido em palestras genéricas com baixa aplicação prática.',
          objetivo: 'Direcionar investimento para as lacunas reais mapeadas nos ciclos de PDI.',
          acao: 'Exportar JSON anonimizado do Modo RH consolidando 35 perfis autorizados de 4 áreas.',
          prazo: 'Fechamento semestral',
          evidencia: '60% das lacunas concentravam-se em Análise de Indicadores e Gestão de Projetos; criação de oficina prática interna com 92% de aplicação em projetos.',
        },
      },
    ],
    checklist: [
      'Agrupar análises sempre com mínimo de 3 a 5 pessoas por recorte para evitar reidentificação indireta.',
      'Substituir nomes por códigos neutros em relatórios executivos.',
      'Compartilhar devolutiva agregada com os próprios times mostrando quais apoios serão criados.',
      'Verificar validade do consentimento dos perfis consolidados.',
    ],
    commonErrors: [
      'Apresentar tela com nome e nota baixa de colaboradores em reunião aberta de gestores.',
      'Filtrar grupo de 1 única pessoa em relatório "anônimo", permitindo identificação óbvia.',
      'Coletar dados de ciclos e nunca devolver nenhuma ação prática de apoio às equipes.',
    ],
    faqs: [
      {
        q: 'Qual o tamanho mínimo de grupo para apresentar dados anonimizados com segurança?',
        a: 'Como regra prática de People Analytics, evite divulgar recortes com menos de 4 ou 5 pessoas, pois a combinação de área e cargo pode revelar quem é o titular.',
      },
      {
        q: 'Como comparar áreas muito diferentes (ex.: Engenharia e Vendas)?',
        a: 'Não compare notas técnicas específicas entre áreas distintas; compare indicadores estruturais como cadência de ciclos fechados, clareza de recursos e percentual de ações concluídas.',
      },
      {
        q: 'Posso exportar esses indicadores no Meu PDI?',
        a: 'Sim. O Modo RH gera exportação em JSON 100% anonimizada contendo apenas códigos neutros, áreas, níveis, contadores de ciclo e gaps mais frequentes.',
      },
      {
        q: 'Como usar a comparação de ciclos na conversa individual?',
        a: 'Na conversa individual (1:1), compare a pessoa exclusivamente com ela mesma no ciclo anterior, celebrando competências que subiram de nível.',
      },
    ],
    relatedLinks: [
      { label: 'Privacidade e LGPD no desenvolvimento', to: '/privacidade-e-lgpd-no-desenvolvimento' },
      { label: 'Como medir evolução sem transformar tudo em nota', to: '/medir-evolucao-do-pdi-sem-notas' },
      { label: 'Solução Meu PDI para RH e gestores', to: '/para-rh' },
      { label: 'Como acompanhar evolução ao longo do tempo', to: '/como-acompanhar-evolucao-de-competencias' },
    ],
  },
};
