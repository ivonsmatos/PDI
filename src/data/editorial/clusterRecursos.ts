import type { EditorialArticle } from './types';

export const CLUSTER_RECURSOS: Record<string, Omit<EditorialArticle, 'publishedAt' | 'updatedAt'>> = {
  'cursos-gratuitos-para-pdi': {
    slug: '/cursos-gratuitos-para-pdi',
    cluster: 'Cursos e Ações',
    seoTitle: 'Cursos gratuitos para desenvolver competências no PDI - Meu PDI',
    metaDescription:
      'Veja como encontrar e organizar cursos gratuitos verificados para fechar lacunas de competências no seu PDI sem gastar orçamento.',
    kicker: 'Recursos Curados',
    h1: 'Cursos gratuitos para desenvolver competências profissionais no seu PDI',
    directAnswer:
      'Usar cursos gratuitos no PDI permite fechar lacunas técnicas e comportamentais sem travar por falta de orçamento, desde que você selecione fontes oficiais (universidades, escolas públicas e fabricantes de tecnologia) e vincule cada módulo estudado a uma entrega prática.',
    intro:
      'Falta de verba de treinamento é uma das forças restritivas mais citadas por profissionais no Brasil. Felizmente, hoje existem catálogos oficiais gratuitos de altíssima qualidade - o segredo está em separar o que é realmente gratuito do que cobra pelo certificado ou exige assinatura posterior.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'como-classificar-gratuidade',
        title: 'Três modalidades de acesso que você precisa conferir antes de começar',
        paragraphs: [
          'No catálogo curado do Meu PDI, classificamos explicitamente cada recurso para evitar surpresas:',
        ],
        bullets: [
          'Curso e certificado gratuitos: estudo completo e emissão de comprovante sem custo (ex.: ENAP, EV.G, FGV Online, Sebrae, Fundação Bradesco).',
          'Conteúdo gratuito com certificado pago: ótimo para aprender a competência prática, mesmo sem pagar pela emissão formal.',
          'Trilhas oficiais de fabricantes: documentação e laboratórios de provedores de nuvem, dados, design e gestão.',
        ],
      },
      {
        id: 'exemplo-uso-curso',
        title: 'Como conectar o curso gratuito ao objetivo do PDI',
        paragraphs: [
          'Nunca cadastre um curso solto sem objetivo associado.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Servidor público estruturando PDI sem verba extra (dados fictícios)',
          situacaoAtual: 'Assumiu fiscalização de contratos administrativos com nível 2/5 na nova legislação.',
          objetivo: 'Padronizar checklist de fiscalização contratual da unidade em 90 dias.',
          acao: 'Concluir trilha gratuita de Gestão e Fiscalização de Contratos na ENAP e implantar roteiro padrão nos 6 contratos vigentes.',
          prazo: '90 dias',
          evidencia: 'Certificado ENAP + checklist homologado pela chefia sem apontamentos da auditoria interna.',
        },
      },
    ],
    checklist: [
      'Consultar a página de Cursos e Credenciais Gratuitas filtrando pela sua lacuna.',
      'Confirmar idioma, carga horária e regras atuais diretamente no site oficial.',
      'Reservar blocos fixos na agenda semanal como recurso necessário da ação.',
      'Criar sempre uma segunda ação prática aplicando o conteúdo estudado.',
    ],
    commonErrors: [
      'Inscrever-se em 10 cursos gratuitos ao mesmo tempo e concluir zero.',
      'Escolher curso apenas pelo nome bonito sem checar se cobre a lacuna da sua matriz.',
      'Parar na aula teórica sem testar o aprendizado em um caso concreto.',
    ],
    faqs: [
      {
        q: 'Cursos gratuitos têm valor real para recrutadores e gestores?',
        a: 'Sim, especialmente quando vêm de instituições reconhecidas e vêm acompanhados de evidência prática mostrando como você aplicou aquele conhecimento.',
      },
      {
        q: 'Onde encontro a lista completa de cursos curados no Meu PDI?',
        a: 'Na página pública de Cursos e Credenciais Gratuitas (/certificacoes-gratuitas) e automaticamente na aba Trilha dentro do aplicativo, cruzada com seus gaps.',
      },
      {
        q: 'E se um link ou condição gratuita mudar no site do provedor?',
        a: 'Cada cartão do nosso catálogo traz a data da última revisão e um botão direto para reportar alteração de link ou condição.',
      },
      {
        q: 'Posso usar conteúdo gratuito sem certificado no PDI?',
        a: 'Com certeza. Quando você entrega um projeto real usando o que aprendeu, a entrega vale muito mais do que o PDF do certificado.',
      },
    ],
    relatedLinks: [
      { label: 'Catálogo de cursos e credenciais gratuitas', to: '/certificacoes-gratuitas' },
      { label: 'Como escolher um curso para colocar no PDI', to: '/como-escolher-curso-para-pdi' },
      { label: 'Como transformar um curso em evidência', to: '/como-transformar-curso-em-evidencia' },
      { label: 'Curso, projeto ou prática: qual escolher?', to: '/curso-projeto-ou-pratica-no-pdi' },
    ],
  },

  'como-escolher-curso-para-pdi': {
    slug: '/como-escolher-curso-para-pdi',
    cluster: 'Cursos e Ações',
    seoTitle: 'Como escolher um curso para colocar no PDI - Meu PDI',
    metaDescription:
      'Critérios objetivos para escolher cursos alinhados às suas lacunas de senioridade, tempo disponível e retorno prático para o seu PDI.',
    kicker: 'Curadoria Inteligente',
    h1: 'Como escolher um curso para colocar no PDI sem desperdiçar tempo nem dinheiro',
    directAnswer:
      'Escolher um bom curso para o PDI exige partir primeiro da lacuna diagnosticada na sua matriz de competências, verificar se a ementa ensina aplicação compatível com seu nível atual e confirmar se a carga horária cabe nas próximas 4 a 8 semanas para aplicação imediata.',
    intro:
      'Comprar cursos por impulso em promoções é a ilusão mais comum de produtividade profissional: dá sensação imediata de avanço, mas raramente vira competência aplicada. Um filtro de cinco minutos evita frustração e gastos desnecessários.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'cinco-criterios',
        title: 'Cinco perguntas antes de adicionar um curso ao plano',
        paragraphs: [
          'Passe qualquer curso, pós-graduação ou workshop por este crivo:',
        ],
        bullets: [
          'Qual lacuna específica do meu PDI este curso resolve agora?',
          'O nível do conteúdo combina com meu domínio atual (nem básico demais, nem avançado sem base)?',
          'Onde vou aplicar o que aprender nas duas semanas seguintes às aulas?',
          'A carga horária cabe na minha rotina real sem sacrificar entregas críticas?',
          'A fonte tem autoridade prática reconhecida no tema?',
        ],
      },
      {
        id: 'exemplo-escolha',
        title: 'Exemplo comparando uma escolha por impulso e uma escolha estratégica',
        paragraphs: [
          'Cursos curtos e focados quase sempre vencem formações genéricas no curto prazo.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Coordenadora de Marketing escolhendo formação (dados fictícios)',
          situacaoAtual: 'Precisa estruturar atribuição de mídia e CRM ainda neste semestre (lacuna 2/5 -> 4/5).',
          objetivo: 'Implantar régua de ativação e leitura de CAC por canal em 90 dias.',
          acao: 'Substituir MBA genérico de 18 meses por curso técnico focado de 24h em CRM/Analytics + projeto piloto nas campanhas atuais.',
          prazo: '60 dias',
          evidencia: 'Régua ativa e relatório de CAC por canal operando antes do fim do trimestre.',
        },
      },
    ],
    checklist: [
      'Diagnosticar o gap primeiro (Passo 2) e escolher o curso depois (Passo 4).',
      'Ler a ementa módulo por módulo, ignorando promessas exageradas de marketing.',
      'Limitar a 1 curso ativo por vez dentro do ciclo.',
      'Definir o projeto de aplicação antes mesmo de assistir à primeira aula.',
    ],
    commonErrors: [
      'Escolher pós-graduação longa quando a dor imediata é dominar uma ferramenta ou processo específico.',
      'Comprar cursos avançados sem ter consolidado os fundamentos do nível anterior.',
      'Não bloquear horário fixo de estudo na agenda semanal.',
    ],
    faqs: [
      {
        q: 'Quando vale colocar uma pós-graduação ou especialização no PDI?',
        a: 'Quando seu objetivo é de médio/longo prazo (ex.: exigência regulatória da área, docência, pesquisa ou aprofundamento estruturado em 12+ meses) e você já validou aderência à área.',
      },
      {
        q: 'Quantas horas semanais de estudo são sustentáveis para quem trabalha em tempo integral?',
        a: 'Entre 2 e 4 horas semanais bem protegidas costumam ser sustentáveis por todo o trimestre sem gerar esgotamento.',
      },
      {
        q: 'Como pedir patrocínio da empresa para um curso pago?',
        a: 'Apresente no seu PDI qual problema da área será resolvido, qual entrega prática você fará após o curso e como compartilhará o aprendizado com o restante da equipe.',
      },
      {
        q: 'Vale repetir curso de um tema que já estudei mas esqueci?',
        a: 'Em vez de reassistir dezenas de horas, revise resumos/documentação e vá direto para um projeto prático: a prática revela rapidamente quais pontos pontuais precisam de consulta.',
      },
    ],
    relatedLinks: [
      { label: 'Cursos gratuitos para desenvolver competências', to: '/cursos-gratuitos-para-pdi' },
      { label: 'Curso, projeto ou prática: qual escolher?', to: '/curso-projeto-ou-pratica-no-pdi' },
      { label: 'Como transformar um curso em evidência', to: '/como-transformar-curso-em-evidencia' },
      { label: 'Catálogo de cursos e credenciais gratuitas', to: '/certificacoes-gratuitas' },
    ],
  },

  'curso-projeto-ou-pratica-no-pdi': {
    slug: '/curso-projeto-ou-pratica-no-pdi',
    cluster: 'Cursos e Ações',
    seoTitle: 'Curso, projeto ou prática no PDI: modelo 70-20-10 - Meu PDI',
    metaDescription:
      'Entenda quando usar curso, mentoria/troca ou projeto prático no PDI seguindo a proporção 70-20-10 para desenvolver competências de verdade.',
    kicker: 'Método 70-20-10',
    h1: 'Curso, projeto ou prática: qual ação desenvolve melhor uma competência?',
    directAnswer:
      'Cursos são melhores para adquirir vocabulário e fundamentos iniciais (níveis 1 e 2), trocas e mentorias aceleram calibragem e repertório, mas projetos práticos no trabalho real são insubstituíveis para consolidar autonomia e impacto (níveis 3 a 5), seguindo a lógica 70-20-10.',
    intro:
      'Ninguém aprende a nadar apenas lendo manuais sobre natação, mas pular em águas profundas sem técnica também é arriscado. Combinar estudo, troca com pessoas experientes e execução real na medida certa multiplica a velocidade do seu PDI.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'regra-70-20-10',
        title: 'Como aplicar a proporção 70-20-10 sem rigidez burocrática',
        paragraphs: [
          'Use esta referência ao distribuir as ações do seu ciclo no Passo 4:',
        ],
        bullets: [
          '10% Educação formal (Atividade): cursos, livros, workshops e documentação para ganhar base conceitual rápida.',
          '20% Aprendizado social: pair work, shadowing, code/design review, mentoria e feedback estruturado.',
          '70% Experiência prática (Entrega e Resultado): liderar melhoria, resolver problema real, automatizar rotina ou conduzir negociação.',
        ],
      },
      {
        id: 'exemplo-combinado',
        title: 'Exemplo combinando os três formatos no mesmo objetivo',
        paragraphs: [
          'Veja como os três formatos se retroalimentam em 90 dias.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Engenheiro de Produção aprendendo Lean/Kaizen (dados fictícios)',
          situacaoAtual: 'Conhecimento apenas teórico de faculdade (2/5), sem liderança de evento Kaizen em fábrica.',
          objetivo: 'Reduzir desperdício de setup na linha de envase.',
          acao: '10%: curso curto de SMED (8h); 20%: acompanhar 1 rodada com especialista sênior; 70%: conduzir Kaizen na linha 2 medindo tempo antes/depois.',
          prazo: '90 dias',
          evidencia: 'Tempo médio de troca de lote reduzido em 28%, validado pela gerência industrial.',
        },
      },
    ],
    checklist: [
      'Verificar se pelo menos metade das ações do seu PDI envolve entregas práticas.',
      'Incluir uma pessoa de referência para revisar ou fazer shadowing em temas novos.',
      'Usar cursos curtos como alavanca inicial, não como linha de chegada.',
      'Classificar o tipo de meta (Atividade, Entrega, Resultado ou Evidência) em cada ação.',
    ],
    commonErrors: [
      'Montar um PDI com 100% das ações sendo "assistir curso X" ou "ler livro Y".',
      'Tentar assumir projeto crítico de altíssimo risco sem nenhuma base mínima nem par revisor.',
      'Subestimar o poder de acompanhar por 2 horas alguém que já faz aquilo com maestria.',
    ],
    faqs: [
      {
        q: 'Quando o curso deve vir obrigatoriamente antes da prática?',
        a: 'Em temas regulatórios, segurança do trabalho, normas técnicas (como NR, BPF, LGPD, contabilidade fiscal) ou quando seu nível atual na habilidade é zero.',
      },
      {
        q: 'E se minha empresa atual não me der espaço para projetos novos?',
        a: 'Comece melhorando a qualidade, documentação ou velocidade de uma entrega que já está sob sua responsabilidade, ou desenvolva um projeto aplicado autoral com dados públicos.',
      },
      {
        q: 'O que é shadowing e como colocá-lo no PDI?',
        a: 'Shadowing é acompanhar em tempo real um colega mais experiente conduzindo uma reunião, diagnóstico ou operação, fazendo debriefing de 10 minutos logo depois.',
      },
      {
        q: 'Como a Trilha do Meu PDI sugere esses formatos?',
        a: 'Para cada lacuna detectada, a Trilha combina leituras/cursos curados com sugestões de prática deliberada, projetos e mentoria.',
      },
    ],
    relatedLinks: [
      { label: 'Como criar ações de desenvolvimento com prazo', to: '/acoes-de-desenvolvimento-com-prazo' },
      { label: 'Como transformar um curso em evidência', to: '/como-transformar-curso-em-evidencia' },
      { label: 'Como escolher um curso para colocar no PDI', to: '/como-escolher-curso-para-pdi' },
      { label: 'Trilhas de desenvolvimento por área', to: '/trilhas-de-desenvolvimento-por-area' },
    ],
  },

  'como-transformar-curso-em-evidencia': {
    slug: '/como-transformar-curso-em-evidencia',
    cluster: 'Cursos e Ações',
    seoTitle: 'Como transformar um curso em evidência profissional - Meu PDI',
    metaDescription:
      'Não pare no certificado: veja 4 formas práticas de transformar qualquer curso concluído em evidência concreta de competência e resultado.',
    kicker: 'Do Estudo ao Impacto',
    h1: 'Como transformar um curso em evidência profissional verificável',
    directAnswer:
      'Transformar um curso em evidência profissional significa converter o conteúdo assistido em um artefato ou melhoria real em até 15 dias após as aulas: um projeto aplicado, um processo redesenhado, um guia compartilhado com a equipe ou um indicador melhorado.',
    intro:
      'Milhares de pessoas concluem exatamente os mesmos cursos online todas as semanas. O que diferencia você em uma entrevista ou comitê de promoção não é ter assistido às aulas, mas mostrar o que mudou no mundo real porque você estudou aquilo.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'quatro-conversores',
        title: 'Quatro maneiras simples de converter aula em evidência',
        paragraphs: [
          'Escolha pelo menos uma saída prática ao terminar qualquer formação:',
        ],
        bullets: [
          'Aplicação direta em gargalo atual: usar a técnica aprendida para resolver um problema real da sua rotina.',
          'Estudo de caso ou protótipo autoral: construir uma solução demonstrável com dados fictícios ou abertos.',
          'Multiplicação interna (Tech Talk / Resumo): apresentar os 3 aprendizados aplicáveis em 20 minutos para sua equipe.',
          'Padronização de playbook/checklist: criar um modelo reutilizável que melhore o trabalho dos seus colegas.',
        ],
      },
      {
        id: 'exemplo-conversao',
        title: 'Exemplo completo: do certificado à ficha de evidência',
        paragraphs: [
          'Veja a diferença na hora de registrar no seu PDI e Currículo de Competências.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Analista de Atendimento após curso de Experiência do Cliente (dados fictícios)',
          situacaoAtual: 'Concluiu curso gratuito de 20h sobre métricas de CX e jornada do cliente.',
          objetivo: 'Reduzir reincidência de chamados sobre dúvidas de cobrança.',
          acao: 'Reescreveu as 5 macros principais da central aplicando linguagem simples aprendida no curso e mediu reaberturas por 30 dias.',
          prazo: '30 dias pós-curso',
          evidencia: 'Queda de 24% na reabertura de tickets de cobrança + elogio formal da supervisão.',
        },
      },
    ],
    checklist: [
      'Anotar durante as aulas 3 ideias aplicáveis imediatamente no seu contexto.',
      'Executar pelo menos 1 aplicação prática em até duas semanas após o término.',
      'Medir ou documentar o estado anterior e o estado posterior à mudança.',
      'Anexar tanto o link do certificado quanto o resultado prático na Ficha de Evidência.',
    ],
    commonErrors: [
      'Postar apenas foto do certificado dizendo "mais uma conquista" sem explicar nenhuma aplicação.',
      'Esperar surgir o "projeto perfeito" para usar o conhecimento e esquecer tudo em dois meses.',
      'Guardar as anotações só para si em vez de compartilhar melhorias com o time.',
    ],
    faqs: [
      {
        q: 'E se eu estiver desempregado ou em transição de área?',
        a: 'Construa um estudo de caso público: escolha um problema real do setor desejado, aplique o método do curso com dados abertos/simulados e publique o passo a passo e as conclusões.',
      },
      {
        q: 'Apresentar um resumo do curso para meu time conta como evidência?',
        a: 'Sim! Ensinar consolida seu aprendizado, demonstra iniciativa e posiciona você como multiplicador de conhecimento dentro da equipe.',
      },
      {
        q: 'Onde salvo essa evidência dentro do Meu PDI?',
        a: 'No Passo 2 (aba Hard Skills & Evidências), abra a competência relacionada e clique em "Adicionar ficha de evidência", ou vincule o link diretamente na ação concluída.',
      },
      {
        q: 'Vale incluir cursos antigos de 5 anos atrás?',
        a: 'Priorize evidências e aplicações recentes (últimos 12 a 24 meses), mantendo certificações antigas apenas quando forem estruturantes ou regulatórias.',
      },
    ],
    relatedLinks: [
      { label: 'Como registrar evidências profissionais', to: '/como-registrar-evidencias-profissionais' },
      { label: 'Certificados, badges e portfólio', to: '/certificados-badges-e-portfolio' },
      { label: 'Curso, projeto ou prática: qual escolher?', to: '/curso-projeto-ou-pratica-no-pdi' },
      { label: 'PDI não é currículo: entenda a diferença', to: '/pdi-e-curriculo' },
    ],
  },

  'trilhas-de-desenvolvimento-por-area': {
    slug: '/trilhas-de-desenvolvimento-por-area',
    cluster: 'Cursos e Ações',
    seoTitle: 'Trilhas de desenvolvimento por área profissional - Meu PDI',
    metaDescription:
      'Conheça como funcionam as trilhas de desenvolvimento nas 40 áreas profissionais do Meu PDI, combinando especialidade, senioridade e objetivo.',
    kicker: '40 Áreas Profissionais',
    h1: 'Trilhas de desenvolvimento por área profissional: como personalizar sua rota',
    directAnswer:
      'Uma trilha de desenvolvimento por área cruza as competências técnicas e comportamentais exigidas no seu setor com sua especialidade, nível de senioridade e objetivo de carreira, transformando lacunas diagnosticadas em recomendações práticas de estudo, projetos e evidências.',
    intro:
      'Trilhas genéricas de carreira costumam frustrar quem atua fora do eixo tradicional de tecnologia ou negócios corporativos. Um profissional de Saúde, Indústria, Agronegócio, Setor Público ou Arquitetura precisa enxergar as competências e normas reais do seu próprio universo.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'quatro-camadas-personalizacao',
        title: 'Quatro camadas que tornam uma trilha precisa no Meu PDI',
        paragraphs: [
          'Duas pessoas da mesma área podem precisar de rotas completamente diferentes. Por isso o Meu PDI combina quatro filtros:',
        ],
        bullets: [
          '40 áreas profissionais: de Tecnologia, Dados, Produto e Finanças a Indústria, Energia, Farmacêutica, Educação, Direito, Setor Público e Varejo.',
          'Especialidade dentro da área: recorte fino (ex.: em Engenharia, Projetos vs. Manutenção; em Tecnologia, Backend vs. IA vs. Segurança).',
          '6 níveis de carreira: Estagiário, Júnior, Pleno, Sênior, Especialista e Liderança/Gestor.',
          '8 objetivos de carreira: Especialista técnico, Gestão de pessoas, Liderança executiva, Transição, Empreendedorismo, Consultoria, Academia ou Mudança de área.',
        ],
      },
      {
        id: 'exemplo-trilha',
        title: 'Exemplo de personalização para dois perfis na mesma área',
        paragraphs: [
          'Veja como o destino desejado altera as recomendações mesmo dentro do mesmo setor.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Duas farmacêuticas Plenas com destinos distintos (dados fictícios)',
          situacaoAtual: 'Ambas atuam em Garantia da Qualidade na Indústria Farmacêutica no nível Pleno.',
          objetivo: 'Perfil A mira Especialista em Assuntos Regulatórios; Perfil B mira Coordenação de Equipe de Qualidade.',
          acao: 'Trilha A prioriza dossiês técnicos ANVISA e auditorias; Trilha B prioriza gestão de desvios em equipe, 1:1s e indicadores operacionais.',
          prazo: 'Ciclo de 120 dias',
          evidencia: 'Cada profissional constrói portfólio de evidências alinhado exatamente ao próximo cargo desejado.',
        },
      },
    ],
    checklist: [
      'Selecionar área principal e especialidade (ou usar o Recomendador de Área se estiver em dúvida).',
      'Adicionar áreas complementares caso atue em função híbrida.',
      'Escolher o Objetivo de Carreira para calibrar a orientação da Trilha.',
      'Marcar progresso nas atividades sugeridas conforme concluir cada etapa.',
    ],
    commonErrors: [
      'Seguir trilha padrão da internet sem considerar seu nível atual de senioridade.',
      'Tentar estudar todas as especialidades de uma área ampla ao mesmo tempo.',
      'Abandonar o cadastro quando atua em nicho muito específico (use a opção "Minha área não está listada" com área-base semelhante).',
    ],
    faqs: [
      {
        q: 'Quais áreas profissionais existem hoje no Meu PDI?',
        a: 'São 40 áreas completas cobrindo Tecnologia, Dados, Produto, Design, Negócios, Finanças, RH, Marketing, Vendas, Engenharia, Indústria, Energia, Telecom, Saúde, Farma, Setor Público, Direito, Educação, Agro, Varejo, Construção, Serviços e mais.',
      },
      {
        q: 'E se minha profissão específica não estiver entre as 40?',
        a: 'No Passo 2 você pode selecionar "Minha área não está listada", informar o nome exato da sua atuação, escolher uma área-base semelhante e sugerir a inclusão oficial.',
      },
      {
        q: 'Posso mudar de trilha ou especialidade no próximo ciclo?',
        a: 'Sim. Ao fechar um ciclo, o histórico preserva sua trajetória anterior e você pode iniciar o novo ciclo apontando para uma nova especialidade ou transição.',
      },
      {
        q: 'A Trilha recomenda apenas cursos pagos?',
        a: 'Não. As recomendações priorizam práticas no trabalho e recursos oficiais gratuitos ou abertos sempre que disponíveis, indicando com transparência o tipo de acesso.',
      },
    ],
    relatedLinks: [
      { label: 'Hard skills e soft skills: como avaliar', to: '/hard-skills-e-soft-skills' },
      { label: 'PDI para transição de carreira', to: '/pdi-transicao-de-carreira' },
      { label: 'Catálogo de cursos e credenciais gratuitas', to: '/certificacoes-gratuitas' },
      { label: 'PDI na prática em diferentes áreas', to: '/pdi-na-pratica-por-diferentes-areas' },
    ],
  },

  'certificados-badges-e-portfolio': {
    slug: '/certificados-badges-e-portfolio',
    cluster: 'Cursos e Ações',
    seoTitle: 'Certificados, badges e portfólio: o que pesa mais? - Meu PDI',
    metaDescription:
      'Entenda o valor real de certificados, certificações oficiais, badges e portfólio de evidências em processos seletivos e promoções.',
    kicker: 'Sinalização de Competência',
    h1: 'Certificados, badges e portfólio: o que realmente demonstra evolução?',
    directAnswer:
      'Certificados de participação mostram interesse e vocabulário básico; certificações por exame comprovam domínio técnico padronizado; mas o portfólio de evidências práticas (problemas resolvidos e resultados medidos) é o que mais pesa para demonstrar senioridade e capacidade real de entrega.',
    intro:
      'Nem toda credencial tem o mesmo peso no mercado. Entender o que cada formato sinaliza evita frustração ao perceber que dezenas de certificados de conclusão rápida não abriram portas em vagas mais exigentes.',
    author: 'Equipe Editorial Meu PDI',
    reviewer: 'Revisão de Produto e Carreira - Meu PDI',
    sections: [
      {
        id: 'hierarquia-credenciais',
        title: 'Quando cada tipo de comprovação faz diferença',
        paragraphs: [
          'Combine as credenciais de acordo com sua área e objetivo:',
        ],
        bullets: [
          'Certificado de curso livre / badge: útil para comprovar atualização contínua e base conceitual inicial.',
          'Certificação oficial por prova (cloud, segurança, PMP, CPA/CEA, normas técnicas): forte filtro técnico e regulatório em diversas áreas.',
          'Portfólio e fichas de evidência (Situação, Ação, Resultado): decisivos em entrevistas técnicas, promoções internas e cargos Pleno/Sênior/Gestão.',
        ],
      },
      {
        id: 'exemplo-sinalizacao',
        title: 'Como combinar credencial formal + evidência aplicada',
        paragraphs: [
          'A combinação das duas camadas cria um posicionamento muito difícil de ignorar.',
        ],
        example: {
          titulo: 'Exemplo ilustrativo: Profissional de Cloud/DevOps estruturando comprovação (dados fictícios)',
          situacaoAtual: 'Possui 15 certificados de vídeos curtos, mas pouca tração em entrevistas Pleno.',
          objetivo: 'Comprovar domínio prático de infraestrutura em nuvem e redução de custos.',
          acao: 'Obter 1 certificação oficial de entrada + documentar projeto real de otimização FinOps no Currículo de Competências.',
          prazo: '90 dias',
          evidencia: 'Credencial verificável + redução documentada de 27% na fatura mensal de nuvem do ambiente de homologação.',
        },
      },
    ],
    checklist: [
      'Priorizar poucas credenciais reconhecidas na sua área em vez de volume indiscriminado.',
      'Acompanhar toda certificação de pelo menos um caso real ou projeto demonstrável.',
      'Manter links de verificação atualizados nas suas fichas de evidência.',
      'Deixar claro no currículo o que é certificação por exame e o que é curso livre.',
    ],
    commonErrors: [
      'Colocar certificados de 2 horas no topo do currículo achando que substituem entregas reais.',
      'Gastar alto em certificações internacionais que não são valorizadas no segmento em que você atua.',
      'Achar que áreas administrativas, jurídicas ou de saúde não podem ter "portfólio" (fichas de casos e indicadores cumprem exatamente esse papel).',
    ],
    faqs: [
      {
        q: 'Como ter portfólio se trabalho em área corporativa interna (Finanças, RH, Jurídico, Operações)?',
        a: 'Seu portfólio não precisa ser visual nem expor arquivos internos: uma coleção de 4 a 6 fichas estruturadas descrevendo desafio, ação conduzida e indicador melhorado funciona como excelente portfólio executivo.',
      },
      {
        q: 'Badges digitais valem a pena?',
        a: 'Badges emitidos com link público de verificação por fabricantes e instituições sérias facilitam a checagem de autenticidade por recrutadores.',
      },
      {
        q: 'Certificação substitui experiência prática?',
        a: 'Ela abre portas na triagem técnica e organiza fundamentos sólidos, mas na entrevista final e no dia a dia será a sua capacidade de resolver problemas reais que sustentará o cargo.',
      },
      {
        q: 'Como apresentar tudo isso de forma limpa?',
        a: 'No Meu PDI, você organiza competências, nível atual, meta e fichas de evidência com links em um Currículo de Competências exportável em PDF ou link seletivo.',
      },
    ],
    relatedLinks: [
      { label: 'Como transformar um curso em evidência', to: '/como-transformar-curso-em-evidencia' },
      { label: 'Como registrar evidências profissionais', to: '/como-registrar-evidencias-profissionais' },
      { label: 'PDI não é currículo: entenda a diferença', to: '/pdi-e-curriculo' },
      { label: 'Catálogo de cursos e credenciais gratuitas', to: '/certificacoes-gratuitas' },
    ],
  },
};
