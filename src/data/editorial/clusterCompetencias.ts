import type { EditorialArticle } from './types';

export const CLUSTER_COMPETENCIAS: Record<string, Omit<EditorialArticle, 'publishedAt' | 'updatedAt'>> = {
  'como-definir-objetivos-profissionais': {
    slug: '/como-definir-objetivos-profissionais',
    cluster: 'Competências',
    seoTitle: 'Como definir objetivos profissionais claros no PDI - Meu PDI',
    metaDescription:
      'Aprenda a diferença entre desejo vago, atividade e objetivo profissional claro e mensurável usando critérios SMART no seu PDI.',
    kicker: 'Objetivos e Metas',
    h1: 'Como definir objetivos profissionais claros: diferença entre desejo, objetivo e resultado observável',
    directAnswer:
      'Um objetivo profissional claro descreve qual mudança ou entrega você pretende consolidar, em qual horizonte de tempo e por qual critério saberá que concluiu. Ele difere de um desejo vago ("crescer na carreira") e de uma simples tarefa ("fazer um curso"), conectando aprendizado a impacto real.',
    intro:
      'O erro mais comum ao iniciar um Plano de Desenvolvimento Individual é escrever desejos amplos que não podem ser acompanhados. Quando o objetivo é genérico, qualquer ação parece servir - e ao final do trimestre fica impossível saber se houve avanço real.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'desejo-vs-objetivo',
        title: 'Desejo, atividade e objetivo: como separar na prática',
        paragraphs: [
          'Antes de salvar um objetivo no Passo 3 do Meu PDI, teste se a frase sobrevive a três perguntas: o que muda na prática, como será medido e até quando?',
        ],
        bullets: [
          'Desejo vago: "Melhorar meu inglês" ou "Aprender liderança".',
          'Apenas atividade: "Assistir 20 aulas de inglês online".',
          'Objetivo claro: "Conduzir apresentações técnicas mensais em inglês para o time global com autonomia em até 6 meses".',
        ],
      },
      {
        id: 'exemplo-objetivo',
        title: 'Exemplo preenchido com validador SMART',
        paragraphs: [
          'No Meu PDI, o validador SMART avalia automaticamente especificidade, mensurabilidade, relevância e horizonte temporal.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Analista de Logística definindo meta funcional (dados fictícios)',
          situacaoAtual: 'Gasta 8 horas semanais consolidando planilhas manuais de frete com erros frequentes.',
          objetivo: 'Automatizar o controle de indicadores de frete e reduzir divergências de auditoria em 80% no trimestre.',
          acao: 'Estruturar base padronizada, criar painel automatizado e validar regras com o time financeiro.',
          prazo: '90 dias (curto prazo)',
          evidencia: 'Painel ativo + tempo operacional reduzido de 8h para 1h por semana.',
        },
      },
    ],
    checklist: [
      'Limitar o ciclo entre 2 e 4 objetivos simultâneos para proteger o foco.',
      'Combinar categorias funcional (entrega no trabalho), educacional e pessoal.',
      'Incluir um indicador, entrega concreta ou marco verificável na descrição.',
      'Justificar por que esse objetivo importa agora para sua carreira.',
    ],
    commonErrors: [
      'Criar 7 ou 8 objetivos para o mesmo trimestre e abandonar todos na metade.',
      'Confundir matrícula em curso com objetivo de carreira atingido.',
      'Definir metas que dependem 100% da decisão de terceiros sem ação sob seu controle.',
    ],
    faqs: [
      {
        q: 'Quantos objetivos devo ter por ciclo de PDI?',
        a: 'De 2 a 4 objetivos é a faixa recomendada. Acima de 5 objetivos simultâneos, o Assistente de Revisão do Meu PDI emite um alerta de dispersão de foco.',
      },
      {
        q: 'Qual a diferença entre objetivo educacional, funcional e pessoal?',
        a: 'Educacional envolve adquirir repertório técnico ou certificação; funcional aplica competências em projetos e processos do trabalho; pessoal trabalha hábitos, equilíbrio, energia e autogestão.',
      },
      {
        q: 'Posso ajustar um objetivo no meio do ciclo?',
        a: 'Sim. Se o contexto do time ou da empresa mudou, renegocie o escopo e registre o motivo no diário em vez de manter uma meta obsoleta.',
      },
      {
        q: 'Como saber se meu objetivo está genérico demais?',
        a: 'Se duas pessoas diferentes lerem a frase e imaginarem entregas completamente distintas ao final do prazo, o objetivo ainda precisa ficar mais específico.',
      },
    ],
    relatedLinks: [
      { label: 'Como criar ações de desenvolvimento com prazo', to: '/acoes-de-desenvolvimento-com-prazo' },
      { label: 'Como fazer um PDI em 5 passos', to: '/como-fazer-um-pdi' },
      { label: 'Como registrar evidências profissionais', to: '/como-registrar-evidencias-profissionais' },
      { label: 'Ver exemplo de PDI preenchido', to: '/exemplo' },
    ],
  },

  'acoes-de-desenvolvimento-com-prazo': {
    slug: '/acoes-de-desenvolvimento-com-prazo',
    cluster: 'Competências',
    seoTitle: 'Como criar ações de desenvolvimento com prazo - Meu PDI',
    metaDescription:
      'Saiba como desdobrar objetivos em ações com prazo, recursos, tipo de meta (atividade, entrega ou resultado) e acompanhamento semanal.',
    kicker: 'Execução do Plano',
    h1: 'Como criar ações de desenvolvimento com prazo: ação, recurso, data e evidência',
    directAnswer:
      'Uma ação de desenvolvimento eficaz traduz um objetivo em um passo executável vinculado ao objetivo correto, com data-limite realista, recursos necessários mapeados e distinção clara entre estudo, entrega de projeto e resultado de impacto.',
    intro:
      'Objetivos inspiram, mas são as ações semanais com prazo no calendário que geram movimento. Sem data de conclusão e sem recursos previstos, qualquer imprevisto da rotina empurra seu desenvolvimento para o mês seguinte.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'quatro-tipos-de-meta',
        title: 'Atividade, Entrega, Resultado e Evidência: equilibre seu plano',
        paragraphs: [
          'No Meu PDI, você classifica cada ação para evitar planos compostos 100% por consumo passivo de conteúdo:',
        ],
        bullets: [
          'Atividade (Estudo): concluir curso, livro técnico ou mentoria pontual.',
          'Entrega (Projeto): construir protótipo, documentar processo ou implantar melhoria.',
          'Resultado (Impacto): melhorar conversão, reduzir prazo, elevar qualidade ou economizar recursos.',
          'Evidência (Comprovação): publicar estudo, medir indicador antes/depois ou obter validação formal.',
        ],
      },
      {
        id: 'exemplo-acao',
        title: 'Exemplo prático de desdobramento de ações',
        paragraphs: [
          'Um único objetivo ganha tração quando quebrado em duas ou três ações sequenciais.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Ações para objetivo de Qualidade/QA (dados fictícios)',
          situacaoAtual: 'Testes regressivos feitos 100% manualmente antes de cada release.',
          objetivo: 'Automatizar fluxo crítico de checkout para reduzir tempo de validação pré-deploy.',
          acao: '1) Mapear 8 cenários críticos (15 dias); 2) Automatizar suíte em pipeline CI (45 dias); 3) Medir ganho de tempo em 3 releases (75 dias).',
          prazo: '75 dias com entregas quinzenais',
          evidencia: 'Suíte rodando no CI + tempo de regressão reduzido de 4 horas para 18 minutos.',
        },
      },
    ],
    checklist: [
      'Garantir que toda ação esteja associada ao objetivo correto.',
      'Definir data específica (evitando colocar todas as ações para o último dia do ano).',
      'Preencher o campo de recursos necessários (tempo reservado, acesso, orçamento ou apoio).',
      'Atualizar o status no quadro Kanban (Pendente, Em Andamento, Concluído ou Bloqueado).',
    ],
    commonErrors: [
      'Deixar objetivos órfãos sem nenhuma ação vinculada.',
      'Agendar cinco entregas complexas para a mesma semana.',
      'Ignorar ações com prazo vencido em vez de replanejar ou remover bloqueios.',
    ],
    faqs: [
      {
        q: 'O que fazer quando uma ação vence e não consegui concluir?',
        a: 'Não abandone o plano. No quadro de Plano de Ação do Meu PDI, avalie o motivo do atraso, renegocie uma nova data realista ou divida a ação em duas etapas menores.',
      },
      {
        q: 'Quantas ações devo criar para cada objetivo?',
        a: 'Entre 2 e 4 ações bem definidas por objetivo costumam dar clareza sem transformar o PDI em um microgerenciamento diário de tarefas.',
      },
      {
        q: 'Por que preencher o campo "recursos necessários" é tão importante?',
        a: 'Porque antecipa travas práticas - como licença de software, aprovação do gestor, 2 horas livres na agenda ou par para revisão - que derrubam a saúde estrutural do plano.',
      },
      {
        q: 'Curso conta como ação suficiente no PDI?',
        a: 'Curso é um ótimo ponto de partida (Atividade), mas só consolida competência quando acompanhado de uma ação de Entrega ou Resultado prático.',
      },
    ],
    relatedLinks: [
      { label: 'Curso, projeto ou prática: qual desenvolve melhor?', to: '/curso-projeto-ou-pratica-no-pdi' },
      { label: 'Como definir objetivos profissionais claros', to: '/como-definir-objetivos-profissionais' },
      { label: 'Como evitar que o PDI vire formulário esquecido', to: '/evitar-pdi-esquecido' },
      { label: 'Como transformar um curso em evidência', to: '/como-transformar-curso-em-evidencia' },
    ],
  },

  'como-identificar-lacunas-de-competencias': {
    slug: '/como-identificar-lacunas-de-competencias',
    cluster: 'Competências',
    seoTitle: 'Como identificar lacunas de competências (skill gap) - Meu PDI',
    metaDescription:
      'Descubra como mapear suas lacunas de competências (skill gaps) comparando seu nível atual com a exigência do próximo cargo ou área.',
    kicker: 'Diagnóstico de Carreira',
    h1: 'Como identificar lacunas de competências: diagnóstico atual versus nível desejado',
    directAnswer:
      'Identificar lacunas de competências (skill gaps) consiste em cruzar o nível de proficiência que você entrega hoje com os requisitos reais da sua posição atual ou do próximo nível. Um bom diagnóstico combina matriz de senioridade, feedbacks recebidos e análise de onde você perde autonomia.',
    intro:
      'Estudar o que você já gosta e domina é confortável, mas raramente destrava o próximo passo de carreira. O valor estratégico de mapear lacunas está em descobrir exatamente qual habilidade ausente está limitando seu escopo, sua remuneração ou sua transição.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'tres-fontes-de-diagnostico',
        title: 'Três fontes para descobrir seus gaps reais sem achismo',
        paragraphs: [
          'Cruze diferentes ângulos para não cair em pontos cegos da autoavaliação isolada:',
        ],
        bullets: [
          'Matriz da área e especialidade: compare as competências esperadas no seu nível e no nível seguinte.',
          'Gargalos recorrentes da rotina: tarefas que você adia, depende sempre de outra pessoa ou gera retrabalho.',
          'Feedbacks e descrições de vagas-alvo: padrões que aparecem repetidamente em avaliações 1:1 ou requisitos de mercado.',
        ],
      },
      {
        id: 'priorizacao-de-lacunas',
        title: 'Nem toda lacuna merece entrar neste ciclo',
        paragraphs: [
          'Separe lacunas críticas (que travam sua atuação hoje ou sua próxima movimentação) de lacunas secundárias. Concentre energia onde o salto de nível 2 para 4 gera maior alavancagem.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Diagnóstico de Comprador Pleno (dados fictícios)',
          situacaoAtual: 'Negociação operacional (4/5), mas Análise de TCO/Custo Total (2/5) e Contratos SLA (2/5).',
          objetivo: 'Fechar lacuna em análise de Custo Total de Propriedade (TCO) para assumir compras estratégicas.',
          acao: 'Aplicar matriz TCO nas 3 próximas concorrências acima de R$ 200 mil com validação da controladoria.',
          prazo: '90 dias',
          evidencia: '3 dossiês de sourcing aprovados com economia projetada de 11% no ciclo de vida dos contratos.',
        },
      },
    ],
    checklist: [
      'Usar o Comparador de Nível do Meu PDI para enxergar lacunas técnicas e comportamentais.',
      'Classificar honestamente entre competências prontas (4-5), em desenvolvimento (2-3) e lacunas iniciais (1).',
      'Priorizar no máximo 3 lacunas críticas para atacar no trimestre.',
      'Conectar cada lacuna escolhida a um objetivo concreto do plano.',
    ],
    commonErrors: [
      'Dar nota baixa em tudo por síndrome do impostor ou nota alta em tudo por receio de julgamento.',
      'Olhar apenas lacunas técnicas e ignorar lacunas comportamentais que impedem liderar projetos.',
      'Copiar as lacunas de um colega com objetivo de carreira diferente do seu.',
    ],
    faqs: [
      {
        q: 'O que é um skill gap?',
        a: 'Skill gap (lacuna de competência) é a distância entre a habilidade exigida para entregar determinado resultado ou ocupar um cargo e o seu domínio comprovado atual.',
      },
      {
        q: 'Devo corrigir pontos fracos ou potencializar pontos fortes?',
        a: 'Corrija primeiro pontos fracos que funcionam como bloqueadores diretos da sua função ou promoção, e alavanque seus pontos fortes nas entregas em que você quer se tornar referência.',
      },
      {
        q: 'Com que frequência devo refazer meu diagnóstico de lacunas?',
        a: 'A cada fechamento de ciclo (3 a 6 meses) ou sempre que mudar de cargo, escopo, especialidade ou objetivo de carreira.',
      },
      {
        q: 'E se minha área profissional não tiver uma régua oficial na minha empresa?',
        a: 'Utilize uma das 40 matrizes por nível do Meu PDI como referência de mercado e alinhe adaptações específicas com sua liderança.',
      },
    ],
    relatedLinks: [
      { label: 'Hard skills e soft skills: como avaliar', to: '/hard-skills-e-soft-skills' },
      { label: 'Como definir objetivos profissionais claros', to: '/como-definir-objetivos-profissionais' },
      { label: 'PDI para transição de carreira', to: '/pdi-transicao-de-carreira' },
      { label: 'Matriz de competências por área e senioridade', to: '/matriz-de-competencias-por-area-e-senioridade' },
    ],
  },

  'como-registrar-evidencias-profissionais': {
    slug: '/como-registrar-evidencias-profissionais',
    cluster: 'Competências',
    seoTitle: 'Como registrar evidências de desenvolvimento no PDI - Meu PDI',
    metaDescription:
      'Aprenda a montar fichas de evidências verificáveis (Situação, Ação, Resultado e Indicador) para comprovar competências em 1:1, promoções e entrevistas.',
    kicker: 'Desenvolvimento com Evidências',
    h1: 'Como registrar evidências de desenvolvimento profissional: resultados, entregas e validações',
    directAnswer:
      'Registrar evidências profissionais significa documentar fatos verificáveis que comprovam sua evolução em uma competência: qual era a situação, qual ação você realizou, qual resultado ou métrica alcançou, qual link ou artefato comprova a entrega e quem validou.',
    intro:
      'A diferença entre "eu acho que evoluí" e "aqui está a prova do que construí" muda completamente o peso de uma conversa de avaliação ou entrevista técnica. Sem registro contínuo, esquecemos até 70% dos detalhes e números das nossas próprias entregas poucos meses depois.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'anatomia-ficha-evidencia',
        title: 'Os 6 elementos de uma ficha de evidência forte',
        paragraphs: [
          'No Meu PDI, cada competência permite anexar fichas estruturadas com base no método STAR acrescido de métrica e validação:',
        ],
        bullets: [
          'Situação: qual problema, risco ou demanda precisava ser resolvido.',
          'Ação realizada: o que exatamente você fez (não apenas o que o grupo fez).',
          'Resultado alcançado: o efeito concreto gerado após a entrega.',
          'Indicador ou métrica: número, percentual, prazo economizado ou volume atendido.',
          'Link ou documento: relatório, pull request, apresentação, certificado ou ata (sem expor segredos confidenciais).',
          'Validação: nome ou papel do gestor, mentor, cliente ou colega que acompanhou o resultado.',
        ],
      },
      {
        id: 'exemplo-evidencia',
        title: 'Exemplo comparando registro fraco versus evidência sólida',
        paragraphs: [
          'Veja como sair de uma anotação genérica para uma evidência pronta para avaliação ou seleção.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Ficha de evidência em Gestão Hospitalar (dados fictícios)',
          situacaoAtual: 'Registro fraco antigo: "Ajudei a melhorar o atendimento da recepção".',
          objetivo: 'Reduzir tempo de espera na triagem ambulatorial.',
          acao: 'Redesenhei fluxo de pré-cadastro digital e treinei equipe de 12 recepcionistas no novo protocolo.',
          prazo: 'Concluído em Outubro/2026',
          evidencia: 'Tempo médio de espera caiu de 34 min para 14 min (-58%) em 30 dias; validado pela Coordenação Assistencial.',
        },
      },
    ],
    checklist: [
      'Dedicar 10 minutos na sexta-feira para anotar entregas relevantes no Diário de Progresso.',
      'Converter os melhores registros do diário em fichas de evidência nas competências correspondentes.',
      'Cuidar de sigilo empresarial: registrar percentuais e contexto sem vazar dados sensíveis de clientes.',
      'Usar as fichas registradas ao exportar seu Currículo de Competências.',
    ],
    commonErrors: [
      'Deixar para lembrar o que fez no ano inteiro apenas na véspera da avaliação de desempenho.',
      'Usar apenas "nós fizemos" sem deixar nítida sua contribuição específica.',
      'Achar que só áreas comerciais têm métricas (toda área tem prazo, erro, retrabalho, volume ou satisfação).',
    ],
    faqs: [
      {
        q: 'Como criar métricas quando minha área não mede indicadores formais?',
        a: 'Compare o antes e depois observável: horas gastas por semana em uma rotina, quantidade de erros corrigidos, número de pessoas treinadas, prazo de entrega ou feedbacks documentados.',
      },
      {
        q: 'Certificado de curso serve como evidência única de competência nível 4 ou 5?',
        a: 'Não. Certificado comprova exposição ao conteúdo (nível 1 ou 2). Níveis 4 e 5 exigem evidência de aplicação prática, resolução de problemas complexos e impacto.',
      },
      {
        q: 'Preciso colocar links confidenciais da empresa na evidência?',
        a: 'Nunca exponha documentos confidenciais em links externos. Descreva o contexto, a ação e o indicador em termos agregados e mantenha links internos apenas para uso corporativo autorizado.',
      },
      {
        q: 'Como a validação por gestor ou colega funciona na prática?',
        a: 'Ao concluir uma entrega relevante, peça um feedback rápido por escrito ou alinhe na reunião 1:1 e registre na ficha quem acompanhou e validou aquele resultado.',
      },
    ],
    relatedLinks: [
      { label: 'PDI não é currículo: entenda a relação', to: '/pdi-e-curriculo' },
      { label: 'Como transformar um curso em evidência', to: '/como-transformar-curso-em-evidencia' },
      { label: 'Reunião 1:1 baseada em evidências', to: '/reuniao-1-on-1-com-evidencias' },
      { label: 'Certificados, badges e portfólio', to: '/certificados-badges-e-portfolio' },
    ],
  },

  'como-acompanhar-evolucao-de-competencias': {
    slug: '/como-acompanhar-evolucao-de-competencias',
    cluster: 'Competências',
    seoTitle: 'Como acompanhar a evolução de competências no PDI - Meu PDI',
    metaDescription:
      'Aprenda a acompanhar sua evolução profissional ao longo do tempo usando ciclos trimestrais, radar comparativo, diário e retrospectivas.',
    kicker: 'Ciclos e Revisão',
    h1: 'Como acompanhar a evolução de competências ao longo do tempo: ciclos, revisão e comparação',
    directAnswer:
      'Acompanhar a evolução de competências exige fechar ciclos periódicos (a cada 3 a 6 meses), comparar o gráfico radar inicial com o atual, revisar quantas ações viraram entregas reais e registrar uma retrospectiva estruturada antes de abrir novas metas.',
    intro:
      'Desenvolvimento profissional acontece em camadas acumuladas. Sem guardar snapshots dos ciclos anteriores, você olha apenas para o que ainda falta aprender e perde a dimensão do quanto já avançou em um ou dois anos.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'ritmo-de-acompanhamento',
        title: 'Três cadências que mantêm o plano vivo',
        paragraphs: [
          'Combine rituais rápidos de execução com momentos de reflexão estratégica:',
        ],
        bullets: [
          'Semanal (5 a 10 min): atualizar status de ações e registrar aprendizados no Diário.',
          'Mensal (30 min): revisar prazos, destravar ações bloqueadas e alinhar em 1:1.',
          'Trimestral ou semestral (60 min): reavaliar notas de competências, preencher retrospectiva e salvar o ciclo no histórico.',
        ],
      },
      {
        id: 'retrospectiva-ciclo',
        title: 'Como fazer uma retrospectiva honesta antes de abrir novo ciclo',
        paragraphs: [
          'Ao clicar em Salvar Ciclo no Meu PDI, responda com franqueza: o que funcionou bem, o que travou sua execução e qual é a principal lição para não repetir o mesmo erro de planejamento no próximo período.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Evolução em 2 ciclos semestrais (dados fictícios)',
          situacaoAtual: 'Ciclo 1: Analista de RH com People Analytics em 1/5 e Comunicação Executiva em 2/5.',
          objetivo: 'Estruturar indicadores mensais de turnover e tempo de fechamento de vagas para a diretoria.',
          acao: 'Ciclo 1 focou em base de dados e indicadores; Ciclo 2 focou em apresentação executiva e planos de ação com gestores.',
          prazo: '2 ciclos de 120 dias',
          evidencia: 'Evolução documentada de 1/5 para 4/5 no histórico, com redução de 25% no tempo médio de contratação.',
        },
      },
    ],
    checklist: [
      'Revisar o gráfico de Evolução comparando ciclos fechados e ciclo atual.',
      'Passar pelo Assistente de Revisão do Ciclo antes de arquivar.',
      'Preservar o Diário de Progresso entre ciclos para manter memória histórica.',
      'Reajustar metas do novo ciclo com base na capacidade real observada.',
    ],
    commonErrors: [
      'Apagar o plano anterior por cima em vez de arquivar o ciclo no histórico.',
      'Subir notas de competências no radar sem ter concluído ações ou registrado evidências.',
      'Passar um ano inteiro sem olhar para o PDI após a criação inicial.',
    ],
    faqs: [
      {
        q: 'O que acontece com meu diário quando fecho um ciclo no Meu PDI?',
        a: 'Seu histórico de ciclos é salvo com snapshot completo de notas, objetivos e retrospectiva, e o Diário de Progresso permanece intacto para consulta contínua.',
      },
      {
        q: 'Qual a diferença entre Saúde do Plano e Progresso de Execução?',
        a: 'Saúde do Plano mede se o PDI está bem desenhado (objetivos com ações, recursos e forças mapeadas). Progresso de Execução mede o percentual de ações efetivamente concluídas.',
      },
      {
        q: 'É normal não concluir 100% das ações de um ciclo?',
        a: 'Sim. Taxas de conclusão entre 70% e 85% em metas desafiadoras costumam indicar bom equilíbrio entre ambição e realismo. Abaixo de 50% sinaliza excesso de metas ou falta de priorização.',
      },
      {
        q: 'Quando devo manter o mesmo objetivo para o próximo ciclo?',
        a: 'Quando a competência ainda não atingiu o nível-alvo necessário e continua prioritária, mas ajustando as ações a partir do que você aprendeu na retrospectiva.',
      },
    ],
    relatedLinks: [
      { label: 'Como evitar que o PDI vire formulário esquecido', to: '/evitar-pdi-esquecido' },
      { label: 'Como medir evolução sem transformar tudo em nota', to: '/medir-evolucao-do-pdi-sem-notas' },
      { label: 'Como registrar evidências profissionais', to: '/como-registrar-evidencias-profissionais' },
      { label: 'Glossário de desenvolvimento profissional', to: '/glossario' },
    ],
  },

  'competencias-de-comunicacao': {
    slug: '/competencias-de-comunicacao',
    cluster: 'Competências',
    seoTitle: 'Competências de comunicação no PDI: guia prático - Meu PDI',
    metaDescription:
      'Saiba como desenvolver comunicação assertiva, escrita estruturada e comunicação executiva no seu PDI com ações práticas e evidências observáveis.',
    kicker: 'Soft Skills na Prática',
    h1: 'Competências de comunicação para crescer na carreira: exemplos de comportamentos observáveis',
    directAnswer:
      'Desenvolver comunicação na carreira vai muito além de falar bem em público: envolve clareza na escrita assíncrona, escuta ativa, adaptação da linguagem ao interlocutor e síntese executiva para tomada de decisão. No PDI, ela deve ser treinada em situações reais de alinhamento, documentação e apresentação.',
    intro:
      'Quase todo profissional já recebeu ou se deu o feedback genérico "preciso melhorar comunicação". O problema é que comunicação engloba habilidades muito distintas: quem escreve ótimos documentos técnicos pode travar ao negociar prazos com um diretor. Especificar o recorte é o segredo para evoluir.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'quatro-frentes-comunicacao',
        title: 'Quatro dimensões observáveis da comunicação profissional',
        paragraphs: [
          'Identifique em qual destas situações ocorre o maior ruído hoje:',
        ],
        bullets: [
          'Comunicação assíncrona e escrita: e-mails, mensagens e documentos com contexto, proposta clara e pedido objetivo.',
          'Comunicação executiva (top-down): começar pela conclusão, impacto e recomendação antes de detalhar os bastidores técnicos.',
          'Alinhamento de expectativas: negociar prazos, comunicar riscos cedo e confirmar combinados por escrito.',
          'Escuta e facilitação: conduzir reuniões com pauta, sintetizar divergências e encerrar com próximos passos e responsáveis.',
        ],
      },
      {
        id: 'exemplo-comunicacao',
        title: 'Como operacionalizar comunicação no seu PDI',
        paragraphs: [
          'Troque metas subjetivas por rituais verificáveis no trabalho.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Especialista Técnico desenvolvendo Comunicação Executiva (dados fictícios)',
          situacaoAtual: 'Apresentações longas e excessivamente técnicas que atrasam decisões de investimento.',
          objetivo: 'Aprovar propostas técnicas junto à diretoria usando síntese executiva de 1 página.',
          acao: 'Adotar estrutura "Problema, Opções, Custo/Risco e Recomendação" nas próximas 4 propostas e pedir feedback direto a 2 pares.',
          prazo: '90 dias',
          evidencia: '3 propostas aprovadas na primeira reunião sem pedido de retrabalho de escopo.',
        },
      },
    ],
    checklist: [
      'Isolar qual recorte de comunicação será trabalhado neste ciclo (escrita, executiva, reuniões ou feedback).',
      'Usar modelos estruturados (como pirâmide de Minto ou resumo de 1 página) antes de reuniões críticas.',
      'Pedir feedback específico a uma pessoa de confiança logo após apresentações importantes.',
      'Guardar documentos ou apresentações bem-sucedidas como evidência de evolução.',
    ],
    commonErrors: [
      'Achar que ser comunicativo significa falar muito em reuniões.',
      'Fazer apenas um curso de oratória quando o problema real está na falta de estrutura escrita no trabalho remoto.',
      'Não registrar combinados ao final de conversas importantes.',
    ],
    faqs: [
      {
        q: 'Pessoas introvertidas têm desvantagem em competências de comunicação?',
        a: 'Não. Comunicação profissional eficaz depende de preparo, escuta, estrutura de raciocínio e clareza escrita - pontos em que perfis analíticos e introvertidos costumam se destacar quando usam método.',
      },
      {
        q: 'Como medir se minha comunicação melhorou?',
        a: 'Observe a queda em perguntas de retrabalho ("não entendi o que precisa ser feito"), decisões mais rápidas em reuniões que você conduz e feedbacks diretos de pares e gestores.',
      },
      {
        q: 'Qual é o jeito mais rápido de melhorar comunicação executiva?',
        a: 'Comece sempre pela resposta principal nas duas primeiras frases: qual decisão está em jogo, qual o impacto no negócio e qual opção você recomenda.',
      },
      {
        q: 'Onde marcar essa prioridade no Meu PDI?',
        a: 'No Passo 2 (aba Soft Skills & Contexto), marque Comunicação e selecione "Comunicação executiva" ou "Influência sem autoridade" para o ciclo.',
      },
    ],
    relatedLinks: [
      { label: 'Hard skills e soft skills: como avaliar', to: '/hard-skills-e-soft-skills' },
      { label: 'Inteligência emocional no trabalho', to: '/inteligencia-emocional-no-trabalho' },
      { label: 'PDI para profissional Pleno', to: '/pdi-profissional-pleno' },
      { label: 'Como preparar conversas de feedback', to: '/conversas-de-feedback-com-evidencias' },
    ],
  },

  'inteligencia-emocional-no-trabalho': {
    slug: '/inteligencia-emocional-no-trabalho',
    cluster: 'Competências',
    seoTitle: 'Inteligência emocional no PDI: ações práticas - Meu PDI',
    metaDescription:
      'Como transformar inteligência emocional no trabalho em comportamentos treináveis, gestão de conflitos e evidências concretas no seu PDI.',
    kicker: 'Autogestão e Relações',
    h1: 'Inteligência emocional no trabalho: como transformar um conceito amplo em ações de desenvolvimento',
    directAnswer:
      'No ambiente profissional, inteligência emocional traduz-se em comportamentos concretos: reconhecer gatilhos sob pressão, pausar antes de reagir a conflitos, separar críticas técnicas de ataques pessoais e manter clareza em cenários de mudança. No PDI, ela é desenvolvida com rituais de autorregulação e feedback.',
    intro:
      'Inteligência emocional não é suprimir emoções nem concordar com tudo para evitar atrito. É ter repertório para lidar com prazos apertados, divergências técnicas e frustrações sem destruir relações de confiança nem paralisar decisões necessárias.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'comportamentos-observaveis',
        title: 'Onde a inteligência emocional aparece no dia a dia',
        paragraphs: [
          'Para incluí-la no PDI sem cair em abstrações, observe momentos de tensão real na rotina:',
        ],
        bullets: [
          'Recebimento de críticas: ouvir até o fim, fazer perguntas de esclarecimento e agradecer antes de se justificar.',
          'Pressão e incidentes: focar em conter o problema e comunicar fatos, deixando análise de causas para o pós-incidente.',
          'Mediação de conflitos: explicitar o objetivo comum das duas partes antes de debater preferências individuais.',
        ],
      },
      {
        id: 'exemplo-ie',
        title: 'Exemplo prático de ação comportamental no ciclo',
        paragraphs: [
          'Pequenos protocolos pessoais geram mudanças perceptíveis rapidamente.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Líder de Operações trabalhando reação sob pressão (dados fictícios)',
          situacaoAtual: 'Respostas ríspidas em canais de mensagem durante picos operacionais, inibindo alertas precoces da equipe.',
          objetivo: 'Construir ambiente seguro de escalonamento rápido de problemas na operação.',
          acao: 'Adotar pausa obrigatória antes de responder incidentes por texto, migrar temas sensíveis para chamada de 5 min e conduzir pós-mortem sem caça a culpados.',
          prazo: '90 dias',
          evidencia: 'Aumento de alertas preventivos pela equipe e feedback positivo nas 1:1s do trimestre.',
        },
      },
    ],
    checklist: [
      'Mapear no Diário quais situações específicas geraram desgaste nas últimas semanas.',
      'Criar uma regra prática de resposta para momentos de alta pressão.',
      'Selecionar "Gestão de conflitos" ou "Tomada de decisão sob pressão" nas competências de contexto.',
      'Pedir percepção honesta a um par ou gestor ao final de 60 dias.',
    ],
    commonErrors: [
      'Confundir inteligência emocional com passividade ou omissão diante de problemas graves.',
      'Tentar mudar comportamento apenas lendo livros sem observar as próprias reações na semana.',
      'Discutir temas delicados por mensagens curtas de texto no calor do momento.',
    ],
    faqs: [
      {
        q: 'É possível medir evolução em inteligência emocional?',
        a: 'Sim, por indicadores indiretos e observáveis: redução de escaladas desnecessárias de conflito, qualidade das revisões pós-incidente e feedbacks recorrentes de pares e liderados.',
      },
      {
        q: 'Como usar o Diário do Meu PDI para desenvolver autogestão?',
        a: 'Use entradas privadas semanais para registrar situações tensas, como você reagiu e o que faria diferente na próxima vez. Esse registro permanece privado por padrão.',
      },
      {
        q: 'Por que essa competência pesa tanto em promoções para Sênior e Gestão?',
        a: 'Porque quanto maior a senioridade, mais ambíguos e politicamente sensíveis são os problemas; reatividade emocional em cargos-chave multiplica insegurança em todo o time.',
      },
      {
        q: 'Como lidar com colegas difíceis sem perder profissionalismo?',
        a: 'Traga a conversa para critérios objetivos, impactos no resultado comum e acordos documentados, evitando interpretar intenções pessoais sem fatos.',
      },
    ],
    relatedLinks: [
      { label: 'Competências de comunicação na carreira', to: '/competencias-de-comunicacao' },
      { label: 'PDI para liderança e gestores', to: '/pdi-para-lideranca' },
      { label: 'Como preparar conversas de feedback', to: '/conversas-de-feedback-com-evidencias' },
      { label: 'Hard skills e soft skills: como avaliar', to: '/hard-skills-e-soft-skills' },
    ],
  },

  'networking-profissional': {
    slug: '/networking-profissional',
    cluster: 'Competências',
    seoTitle: 'Networking como competência profissional no PDI - Meu PDI',
    metaDescription:
      'Desenvolva networking estratégico e genuíno no seu PDI com ações práticas para construir alianças internas e externas sem parecer interesseiro.',
    kicker: 'Alianças e Carreira',
    h1: 'Networking como competência profissional: ações práticas e evidências possíveis',
    directAnswer:
      'Networking profissional consistente é a construção contínua de relações de confiança e troca mútua dentro e fora da empresa, muito antes de precisar de um favor ou emprego. No PDI, ele entra como rotina intencional de trocas técnicas, alianças estratégicas e compartilhamento de aprendizados.',
    intro:
      'Muita gente evita trabalhar networking por associar o termo a abordagens forçadas em eventos ou pedidos de indicação de última hora. Quando tratado como troca genuína entre pares de profissão, o networking amplia sua visão de mercado e destrava projetos internos.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'interno-e-externo',
        title: 'Networking interno e externo: os dois lados da moeda',
        paragraphs: [
          'Não olhe apenas para fora da organização. Boa parte das oportunidades de projetos relevantes e promoções nasce da colaboração com áreas vizinhas.',
        ],
        bullets: [
          'Interno (Alianças): conhecer prioridades de outras áreas, compartilhar aprendizados úteis e ajudar a destravar dependências.',
          'Externo (Comunidade e mercado): trocar experiências com pares do mesmo setor, participar de grupos técnicos e publicar sínteses práticas.',
        ],
      },
      {
        id: 'exemplo-networking',
        title: 'Como transformar networking em ação concreta do ciclo',
        paragraphs: [
          'Estabeleça metas pequenas e sustentáveis, perfeitamente compatíveis com agendas cheias.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Especialista em Suprimentos ampliando rede setorial (dados fictícios)',
          situacaoAtual: 'Rede restrita apenas aos colegas imediatos da empresa atual há 4 anos.',
          objetivo: 'Construir rede qualificada de benchmarking em compras estratégicas e ESG.',
          acao: 'Realizar 2 conversas mensais de troca técnica (30 min) com pares do setor e publicar 1 resumo prático mensal de aprendizados.',
          prazo: '120 dias',
          evidencia: '8 trocas qualificadas realizadas + 1 prática de homologação ESG adaptada com sucesso na empresa.',
        },
      },
    ],
    checklist: [
      'Preencher o bloco de Alianças no Passo 5 (Campo de Forças) do seu PDI.',
      'Agendar conversas curtas com pauta clara e genuína curiosidade pelo trabalho do outro.',
      'Oferecer referência útil, artigo ou conexão sempre que possível antes de pedir algo.',
      'Manter contato periódico leve em vez de procurar pessoas só quando estiver desempregado.',
    ],
    commonErrors: [
      'Mandar mensagens genéricas pedindo "15 minutos para tomar um café" sem explicar o tema.',
      'Colecionar milhares de contatos em redes sociais sem cultivar nenhuma conversa real.',
      'Esquecer de agradecer e contar o resultado depois que alguém dá um conselho ou indicação.',
    ],
    faqs: [
      {
        q: 'Como fazer networking sendo tímido ou trabalhando 100% remoto?',
        a: 'Prefira interações 1 a 1 estruturadas ou comentários técnicos aprofundados em publicações da sua área. Conversas individuais de 20 minutos com pauta clara funcionam muito bem no remoto.',
      },
      {
        q: 'Qual é o papel das Alianças no Campo de Forças do Meu PDI?',
        a: 'Identificar mentores, pares de outras equipes e lideranças que podem apoiar, revisar ou patrocinar seus objetivos durante o ciclo.',
      },
      {
        q: 'Que evidência posso registrar em networking?',
        a: 'Benchmarkings realizados que geraram melhorias internas, mentorias estruturadas, palestras ou artigos compartilhados e projetos conjuntos entre áreas.',
      },
      {
        q: 'Com que frequência devo acionar minha rede?',
        a: 'Uma ou duas conversas intencionais por mês já geram até 20 conexões sólidas ao longo de um ano sem sobrecarregar sua rotina.',
      },
    ],
    relatedLinks: [
      { label: 'PDI para transição de carreira', to: '/pdi-transicao-de-carreira' },
      { label: 'Competências de comunicação na carreira', to: '/competencias-de-comunicacao' },
      { label: 'Como fazer um PDI em 5 passos', to: '/como-fazer-um-pdi' },
      { label: 'PDI para profissional Sênior', to: '/pdi-profissional-senior' },
    ],
  },

  'pensamento-analitico-e-decisao': {
    slug: '/pensamento-analitico-e-decisao',
    cluster: 'Competências',
    seoTitle: 'Pensamento analítico e tomada de decisão no PDI - Meu PDI',
    metaDescription:
      'Como desenvolver pensamento analítico, estruturação de problemas e tomada de decisão baseada em dados em qualquer área profissional.',
    kicker: 'Resolução de Problemas',
    h1: 'Pensamento analítico e tomada de decisão: exemplos de níveis e ações práticas',
    directAnswer:
      'Pensamento analítico é a capacidade de decompor problemas complexos em causas verificáveis, comparar hipóteses com dados e escolher caminhos explicitando riscos e trade-offs. Ele não pertence apenas a cientistas de dados: é decisivo em RH, Direito, Saúde, Vendas, Engenharia e Gestão.',
    intro:
      'Decidir apenas por intuição ou pelo argumento de quem fala mais alto custa caro às organizações. Incluir pensamento analítico no PDI ensina a formular boas perguntas antes de sair executando soluções apressadas.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'niveis-pensamento-analitico',
        title: 'Como o pensamento analítico evolui por senioridade',
        paragraphs: [
          'Veja o que diferencia cada estágio na hora de analisar cenários:',
        ],
        bullets: [
          'Júnior: coleta dados corretos, confere consistência básica e aponta variações visíveis.',
          'Pleno: cruza fontes diferentes, separa sintoma de causa raiz e propõe recomendação fundamentada.',
          'Sênior / Liderança: estrutura decisões sob incerteza, pondera custo de oportunidade e define métricas de sucesso.',
        ],
      },
      {
        id: 'exemplo-analitico',
        title: 'Exemplo prático fora da área de tecnologia',
        paragraphs: [
          'Qualquer área pode aplicar análise estruturada para tomar decisões melhores.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Business Partner de RH analisando rotatividade (dados fictícios)',
          situacaoAtual: 'Ações de retenção criadas por percepção subjetiva sem recorte por área ou tempo de casa.',
          objetivo: 'Reduzir desligamentos voluntários precoces (até 6 meses) com diagnóstico baseado em dados.',
          acao: 'Cruzar dados de saída por cargo, gestor e faixa salarial dos últimos 12 meses e propor plano focalizado nas 2 áreas críticas.',
          prazo: '90 dias',
          evidencia: 'Diagnóstico apresentado à diretoria + queda de 30% no turnover precoce das duas áreas no semestre seguinte.',
        },
      },
    ],
    checklist: [
      'Sempre escrever qual hipótese você quer testar antes de abrir uma planilha ou banco de dados.',
      'Apresentar ao menos duas alternativas viáveis com prós, contras e riscos em decisões relevantes.',
      'Definir qual indicador mostrará se a decisão deu certo após 30 ou 60 dias.',
      'Registrar decisões importantes e seus resultados reais como evidências no PDI.',
    ],
    commonErrors: [
      'Paralisia por análise: esperar ter 100% de certeza em decisões reversíveis de baixo risco.',
      'Buscar apenas números que confirmem a opinião que você já tinha antes.',
      'Apresentar tabelas gigantes sem explicar o que aqueles números recomendam fazer.',
    ],
    faqs: [
      {
        q: 'Preciso saber programar para desenvolver pensamento analítico?',
        a: 'Não. Ferramentas como SQL ou BI ampliam escala, mas o núcleo do pensamento analítico está em estruturar problemas, isolar variáveis, comparar cenários e interpretar indicadores.',
      },
      {
        q: 'Como treinar tomada de decisão sob pressão?',
        a: 'Classifique decisões entre reversíveis (decida rápido com 70% das informações) e irreversíveis (exigem análise profunda e revisão de pares).',
      },
      {
        q: 'Qual relação entre pensamento analítico e comunicação executiva?',
        a: 'A análise descobre a resposta certa; a comunicação executiva traduz essa descoberta em uma recomendação clara para quem decide.',
      },
      {
        q: 'Como comprovar pensamento analítico em entrevistas?',
        a: 'Conte casos reais em que os dados iniciais pareciam apontar para um caminho óbvio, mas sua investigação da causa raiz revelou outra solução mais eficaz.',
      },
    ],
    relatedLinks: [
      { label: 'Competências de comunicação executiva', to: '/competencias-de-comunicacao' },
      { label: 'IA no desenvolvimento profissional', to: '/ia-no-desenvolvimento-profissional' },
      { label: 'Hard skills e soft skills: como avaliar', to: '/hard-skills-e-soft-skills' },
      { label: 'PDI para profissional Sênior', to: '/pdi-profissional-senior' },
    ],
  },

  'ia-no-desenvolvimento-profissional': {
    slug: '/ia-no-desenvolvimento-profissional',
    cluster: 'Competências',
    seoTitle: 'IA no PDI: adoção responsável na carreira - Meu PDI',
    metaDescription:
      'Saiba como incluir inteligência artificial de forma prática, ética e verificável no seu PDI em qualquer área profissional.',
    kicker: 'Futuro do Trabalho',
    h1: 'IA no desenvolvimento profissional: como incluir adoção responsável de IA no PDI',
    directAnswer:
      'Incluir IA no PDI não significa virar engenheiro de machine learning em todas as profissões, mas aprender a usar ferramentas generativas e automação com critério crítico, proteção de dados sensíveis e ganho mensurável de qualidade ou produtividade nos fluxos reais da sua área.',
    intro:
      'Entre o hype exagerado e a resistência completa, os profissionais que mais se destacam usam o PDI para testar aplicações concretas e seguras de Inteligência Artificial no trabalho cotidiano, mantendo responsabilidade humana total sobre cada entrega.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'tres-camadas-ia',
        title: 'Três níveis de competência em IA conforme sua função',
        paragraphs: [
          'Escolha a profundidade alinhada à sua área de atuação entre as 40 matrizes do Meu PDI:',
        ],
        bullets: [
          'Fluência aplicada (todas as áreas): estruturação de contexto, revisão crítica de alucinações, síntese documental e automação de tarefas repetitivas.',
          'Integração em processos (Produto, Operações, Marketing, Finanças, Jurídico): desenho de fluxos assistidos com governança, LGPD e validação humana.',
          'Construção técnica (Tecnologia, Dados, Engenharia): arquiteturas RAG, avaliação de modelos, segurança, custo de inferência e MLOps.',
        ],
      },
      {
        id: 'exemplo-ia',
        title: 'Exemplo realista de meta de IA com governança',
        paragraphs: [
          'Foque sempre no problema resolvido e nos critérios de segurança adotados.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Advogada Corporativa aplicando IA com governança (dados fictícios)',
          situacaoAtual: 'Triagem inicial de minutas padrão consome 12 horas semanais da equipe.',
          objetivo: 'Reduzir tempo de triagem contratual mantendo 100% de conformidade com LGPD e sigilo.',
          acao: 'Criar checklist padronizado em ambiente corporativo homologado (sem envio de dados pessoais a modelos públicos) e auditar 30 minutas.',
          prazo: '90 dias',
          evidencia: 'Redução de 45% no tempo de triagem inicial com zero incidentes de privacidade, validada pelo jurídico sênior.',
        },
      },
    ],
    checklist: [
      'Nunca colar dados pessoais (LGPD), segredos industriais ou credenciais em ferramentas públicas não homologadas.',
      'Validar todas as fontes, cálculos e afirmações geradas por modelos antes de usar em entregas.',
      'Medir o ganho real (tempo economizado ou qualidade ampliada) em um fluxo específico.',
      'Compartilhar boas práticas e limites aprendidos com sua equipe.',
    ],
    commonErrors: [
      'Colocar "aprender IA" no PDI sem definir qual processo de trabalho será melhorado.',
      'Delegar pensamento crítico ao modelo e entregar textos ou códigos que você não sabe explicar.',
      'Ignorar políticas de segurança da informação e propriedade intelectual da empresa.',
    ],
    faqs: [
      {
        q: 'Qualquer profissão deve considerar fluência em IA no PDI?',
        a: 'Sim. De Saúde e Educação a Engenharia, Finanças e Setor Público, saber onde a IA ajuda e onde ela oferece risco tornou-se uma competência transversal básica.',
      },
      {
        q: 'Como provar competência prática em IA sem ser programador?',
        a: 'Documente um fluxo de trabalho antes e depois: mostre o critério de revisão humana utilizado, os cuidados de privacidade e a redução de tempo ou retrabalho obtida.',
      },
      {
        q: 'Existem cursos gratuitos confiáveis de IA para incluir no PDI?',
        a: 'Sim. Na página de Cursos e Credenciais Gratuitas do Meu PDI há trilhas oficiais de fundamentos de IA, engenharia de prompt e ética de provedores reconhecidos.',
      },
      {
        q: 'Usar IA para escrever meu PDI inteiro é uma boa ideia?',
        a: 'Você pode usar IA para lapidar redação, mas o diagnóstico das suas lacunas, a escolha de prioridades reais e o registro de evidências precisam vir da sua vivência concreta.',
      },
    ],
    relatedLinks: [
      { label: 'Cursos e credenciais gratuitas', to: '/certificacoes-gratuitas' },
      { label: 'Pensamento analítico e tomada de decisão', to: '/pensamento-analitico-e-decisao' },
      { label: 'Privacidade e LGPD em processos de desenvolvimento', to: '/privacidade-e-lgpd-no-desenvolvimento' },
      { label: 'Como registrar evidências profissionais', to: '/como-registrar-evidencias-profissionais' },
    ],
  },
};
