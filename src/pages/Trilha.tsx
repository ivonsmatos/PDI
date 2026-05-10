import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePdiStore } from '../store/usePdiStore';
import { BookOpen, Dumbbell, Video, Users, FolderKanban, CheckCircle2, Circle } from 'lucide-react';

// ── Tipos ─────────────────────────────────────────────────────────────────────
type TipoAtividade = 'leitura' | 'pratica' | 'curso' | 'mentoria' | 'projeto';

interface Atividade {
  titulo: string;
  descricao: string;
  tipo: TipoAtividade;
  tempo: string;
  url?: string;
}

const TIPO_ICON: Record<TipoAtividade, React.ReactNode> = {
  leitura:  <BookOpen className="w-4 h-4" />,
  pratica:  <Dumbbell className="w-4 h-4" />,
  curso:    <Video className="w-4 h-4" />,
  mentoria: <Users className="w-4 h-4" />,
  projeto:  <FolderKanban className="w-4 h-4" />,
};

const TIPO_COLOR: Record<TipoAtividade, string> = {
  leitura:  'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300',
  pratica:  'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300',
  curso:    'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300',
  mentoria: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300',
  projeto:  'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300',
};

// ── Soft Skills ───────────────────────────────────────────────────────────────
const SOFT_ATIVIDADES: Record<string, Atividade[]> = {
  'Inteligência Emocional': [
    { tipo: 'leitura',  titulo: 'Livro: Inteligência Emocional — Daniel Goleman', descricao: 'Fundamento teórico sobre reconhecer e gerir emoções no ambiente de trabalho.', tempo: '3h' },
    { tipo: 'pratica',  titulo: 'Diário de Emoções (30 dias)', descricao: 'Antes de dormir, escreva 3 emoções que sentiu e o que as causou. Simples e transformador.', tempo: '5 min/dia' },
    { tipo: 'mentoria', titulo: 'Conversa com alguém que você admira emocionalmente', descricao: 'Agende um café e pergunte como essa pessoa lida com situações difíceis no trabalho.', tempo: '1h' },
  ],
  'Comunicação': [
    { tipo: 'leitura',  titulo: 'Livro: Comunicação Não-Violenta — Marshall Rosenberg', descricao: 'Aprenda a fazer pedidos e dar feedback sem agressividade ou passividade.', tempo: '4h' },
    { tipo: 'pratica',  titulo: 'Modelo FINI em comunicações', descricao: 'Fato → Impacto → Necessidade → pedido (Intenção). Aplique em e-mails ou conversas difíceis.', tempo: '15 min/semana' },
    { tipo: 'curso',    titulo: 'Comunicação Assertiva (LinkedIn Learning)', descricao: 'Exercícios práticos de clareza, concisão e escuta ativa.', tempo: '6h', url: 'https://www.linkedin.com/learning/topics/communication' },
  ],
  'Trabalho em Equipe': [
    { tipo: 'pratica',  titulo: '1:1 informal com colega diferente a cada 2 semanas', descricao: 'Agende 15 minutos só para ouvir — sem agenda, sem julgamento, só conexão.', tempo: '15 min/quinzenal' },
    { tipo: 'projeto',  titulo: 'Voluntarie-se para um projeto multidisciplinar', descricao: 'Escolha um projeto fora da sua área de conforto que envolva outros times.', tempo: '2h/semana' },
    { tipo: 'leitura',  titulo: 'Livro: Os 5 Desafios das Equipes — Patrick Lencioni', descricao: 'Padrões que destroem e os que constroem equipes de alta performance.', tempo: '3h' },
  ],
  'Proatividade': [
    { tipo: 'pratica',  titulo: 'Regra dos 2 Minutos (GTD)', descricao: 'Se leva menos de 2 min, faça agora. Para o resto, reserve 1h/semana para agir em coisas importantes mas não urgentes.', tempo: 'Diário' },
    { tipo: 'curso',    titulo: 'Getting Things Done — Método GTD (Udemy)', descricao: 'Sistema completo de organização pessoal para ser mais proativo e focado.', tempo: '4h', url: 'https://www.udemy.com/topic/productivity/' },
    { tipo: 'projeto',  titulo: 'Resolva 1 problema da equipe por mês sem ser solicitado', descricao: 'Mapeie um gargalo visível e proponha uma solução concreta. Documente o resultado.', tempo: '2h/mês' },
  ],
  'Visão Sistêmica': [
    { tipo: 'pratica',  titulo: 'Leia os OKRs da empresa e do seu gestor', descricao: 'Entenda como o seu trabalho conecta aos objetivos estratégicos do negócio.', tempo: '1h' },
    { tipo: 'leitura',  titulo: 'Livro: A Quinta Disciplina — Peter Senge', descricao: 'Pensamento sistêmico aplicado às organizações de alta performance.', tempo: '5h' },
    { tipo: 'mentoria', titulo: 'Shadow de um executivo por um dia', descricao: 'Peça para acompanhar alguém de nível acima por um dia para entender a visão macro.', tempo: '8h' },
  ],
  'Capacidade de aprender': [
    { tipo: 'pratica',  titulo: 'Técnica Feynman — Explique o que aprendeu', descricao: 'Após estudar algo, tente explicar como se fosse para uma criança de 12 anos. Onde você travar = lacuna real.', tempo: '20 min/semana' },
    { tipo: 'curso',    titulo: 'Aprendendo a Aprender (Coursera — Barbara Oakley)', descricao: 'Técnicas científicas de memorização, foco e aprendizagem eficaz usadas por especialistas.', tempo: '8h', url: 'https://www.coursera.org/learn/learning-how-to-learn' },
    { tipo: 'pratica',  titulo: 'Estude 1 assunto novo por mês', descricao: 'Escolha um tema relevante para a sua área e gaste 30 min/dia por 4 semanas lendo documentação ou um livro.', tempo: '30 min/dia' },
  ],
  'Capacidade de mudar (Adaptabilidade)': [
    { tipo: 'leitura',  titulo: 'Livro: Mindset — Carol Dweck', descricao: 'A diferença entre mentalidade fixa e de crescimento, com exemplos práticos e científicos.', tempo: '3h' },
    { tipo: 'pratica',  titulo: 'Experimento de 30 dias: mude 1 rotina por dia', descricao: 'Pequenas mudanças de rotina (rota diferente, nova comida, novo horário) fortalecem o músculo da adaptabilidade.', tempo: '5 min/dia' },
    { tipo: 'pratica',  titulo: 'Substitua "não consigo" por "ainda não consigo"', descricao: 'Prática de linguagem que reprograma o cérebro ao longo do tempo. Simple, mas estatisticamente comprovada.', tempo: 'Contínuo' },
  ],
  'Capacidade de lidar com ambiguidade': [
    { tipo: 'pratica',  titulo: 'Técnica da Única Métrica', descricao: 'Quando tudo for incerto, defina qual é a ÚNICA métrica que importa agora e proteja ela de distrações.', tempo: '30 min/decisão' },
    { tipo: 'leitura',  titulo: 'Livro: Thinking in Bets — Annie Duke', descricao: 'Como tomar boas decisões mesmo com informações incompletas — visão de uma campeã de poker profissional.', tempo: '4h' },
    { tipo: 'pratica',  titulo: 'Pré-mortem em projetos importantes', descricao: 'Antes de executar, imagine que o projeto falhou: o que causou? Documente e mitigue os riscos.', tempo: '1h/projeto' },
  ],
  'Capacidade de estabelecer network': [
    { tipo: 'pratica',  titulo: 'Reconecte 2 contatos por mês', descricao: 'Envie uma mensagem genuína: compartilhe um artigo, parabenize por uma conquista. Networking é consistência.', tempo: '20 min/mês' },
    { tipo: 'pratica',  titulo: 'Participe de 1 evento da sua área por trimestre', descricao: 'Meetups, webinars ou conferências. Objetivo: conversar com pelo menos 3 pessoas novas.', tempo: '4h/trimestre', url: 'https://www.meetup.com' },
    { tipo: 'curso',    titulo: 'Personal Branding no LinkedIn', descricao: 'Otimize seu perfil e publique 2× por mês sobre sua área. 90 dias consistentes mudam sua visibilidade.', tempo: '3h', url: 'https://www.linkedin.com/learning/topics/personal-branding' },
  ],
};

// ── Hard Skills — lookup por keyword ─────────────────────────────────────────
type HardSkillTemplate = { keywords: string[]; atividades: Atividade[] };

const HARD_SKILL_TEMPLATES: HardSkillTemplate[] = [
  {
    keywords: ['python', 'django', 'flask', 'fastapi', 'pandas', 'numpy', 'scikit'],
    atividades: [
      { tipo: 'curso',    titulo: 'Python for Everybody (Coursera)', descricao: 'Especialização completa do zero ao intermediário com projetos reais.', tempo: '20h', url: 'https://www.coursera.org/specializations/python' },
      { tipo: 'pratica',  titulo: 'Construa um projeto pessoal com Python', descricao: 'Automatize uma tarefa do seu dia-a-dia (planilha, e-mail, relatório). Aprendizado real = uso real.', tempo: '2h/semana' },
      { tipo: 'leitura',  titulo: 'Documentação oficial Python (docs.python.org)', descricao: 'A documentação oficial é o melhor recurso. Leia 1 seção nova por semana.', tempo: '30 min/semana', url: 'https://docs.python.org/3/' },
    ],
  },
  {
    keywords: ['javascript', 'typescript', 'react', 'vue', 'angular', 'next', 'node', 'frontend', 'web'],
    atividades: [
      { tipo: 'curso',    titulo: 'The Odin Project (JavaScript Full Stack)', descricao: 'Currículo open-source completo, projeto-based, altamente reconhecido no mercado.', tempo: '40h+', url: 'https://www.theodinproject.com' },
      { tipo: 'projeto',  titulo: 'Clone de app real: Trello, Twitter ou Airbnb', descricao: 'Clonar UIs de apps conhecidos é o melhor exercício para solidificar conceitos de frontend.', tempo: '10h/projeto' },
      { tipo: 'leitura',  titulo: 'JavaScript.info — guia moderno completo', descricao: 'O melhor guia gratuito de JS moderno, cobrindo ES6+ com exemplos interativos.', tempo: '8h', url: 'https://javascript.info' },
    ],
  },
  {
    keywords: ['sql', 'postgres', 'mysql', 'oracle', 'banco de dados', 'database', 'query', 'mongodb'],
    atividades: [
      { tipo: 'curso',    titulo: 'SQL para Análise de Dados (Mode Analytics)', descricao: 'Curso gratuito e prático com exercícios em banco de dados real online.', tempo: '8h', url: 'https://mode.com/sql-tutorial/' },
      { tipo: 'pratica',  titulo: 'Resolva 30 desafios de SQL no HackerRank', descricao: 'Problemas práticos classificados por nível. Ideal para entrevistas e uso no dia-a-dia.', tempo: '5h', url: 'https://www.hackerrank.com/domains/sql' },
      { tipo: 'projeto',  titulo: 'Crie um dashboard em SQL com dados reais', descricao: 'Use um dataset público (Kaggle) e construa uma análise completa do zero.', tempo: '6h' },
    ],
  },
  {
    keywords: ['dados', 'data science', 'machine learning', 'ml', 'ia', 'inteligência artificial', 'bi', 'power bi', 'tableau', 'excel avançado'],
    atividades: [
      { tipo: 'curso',    titulo: 'Data Science Specialization (Coursera — Johns Hopkins)', descricao: 'Uma das especializações mais reconhecidas no mundo para ciência de dados.', tempo: '60h', url: 'https://www.coursera.org/specializations/jhu-data-science' },
      { tipo: 'pratica',  titulo: 'Participe de uma competição no Kaggle', descricao: 'Kaggle competitions (começando pelas "Getting Started") te forçam a aplicar tudo na prática.', tempo: '10h', url: 'https://www.kaggle.com/competitions' },
      { tipo: 'projeto',  titulo: 'Construa um dashboard de dados do seu trabalho', descricao: 'Escolha 3 métricas importantes da sua empresa e crie uma visualização em Power BI ou Looker Studio.', tempo: '8h' },
    ],
  },
  {
    keywords: ['cloud', 'aws', 'azure', 'gcp', 'google cloud', 'devops', 'docker', 'kubernetes', 'infraestrutura', 'linux', 'ci/cd'],
    atividades: [
      { tipo: 'curso',    titulo: 'AWS Cloud Practitioner Essentials (gratuito)', descricao: 'Curso oficial da AWS para entender os fundamentos de cloud. Preparatório para a certificação.', tempo: '6h', url: 'https://aws.amazon.com/training/learn-about/cloud-practitioner/' },
      { tipo: 'pratica',  titulo: 'Suba um projeto pessoal em cloud (free tier)', descricao: 'Use o free tier da AWS/GCP/Azure para hospedar um projeto. Aprendizado hands-on é o mais duradouro.', tempo: '5h' },
      { tipo: 'leitura',  titulo: 'Cloud Design Patterns (Microsoft Docs)', descricao: 'Padrões de arquitetura cloud essenciais para qualquer profissional de infra.', tempo: '4h', url: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/' },
    ],
  },
  {
    keywords: ['segurança', 'security', 'cibersegurança', 'pentest', 'soc', 'siem', 'firewall', 'criptografia'],
    atividades: [
      { tipo: 'curso',    titulo: 'Google Cybersecurity Certificate (Coursera)', descricao: 'Certificação profissional do Google, reconhecida pelo mercado, sem experiência prévia necessária.', tempo: '20h', url: 'https://www.coursera.org/professional-certificates/google-cybersecurity' },
      { tipo: 'pratica',  titulo: 'Pratique CTF (Capture the Flag) no TryHackMe', descricao: 'Plataforma gamificada para praticar segurança ofensiva e defensiva em ambientes controlados.', tempo: '3h/semana', url: 'https://tryhackme.com' },
      { tipo: 'leitura',  titulo: 'OWASP Top 10 — as principais vulnerabilidades web', descricao: 'Leitura obrigatória para qualquer profissional que mexe com sistemas web ou segurança.', tempo: '2h', url: 'https://owasp.org/www-project-top-ten/' },
    ],
  },
  {
    keywords: ['design', 'ux', 'ui', 'figma', 'product design', 'prototipagem', 'wireframe', 'user experience'],
    atividades: [
      { tipo: 'curso',    titulo: 'Google UX Design Certificate (Coursera)', descricao: 'Certificação em 7 cursos cobrindo todo o processo de UX, do Discovery ao Handoff.', tempo: '30h', url: 'https://www.coursera.org/professional-certificates/google-ux-design' },
      { tipo: 'pratica',  titulo: 'Redesenhe 1 tela de um app que você usa', descricao: 'Escolha uma tela que te irrita e recrie-a no Figma com suas melhorias. Publique no Behance.', tempo: '4h/semana' },
      { tipo: 'leitura',  titulo: 'Laws of UX — leis psicológicas do design', descricao: 'Coleção das principais leis de UX com exemplos reais de como aplicá-las.', tempo: '2h', url: 'https://lawsofux.com' },
    ],
  },
  {
    keywords: ['marketing', 'seo', 'growth', 'ads', 'google analytics', 'meta ads', 'copywriting', 'conteúdo', 'redes sociais'],
    atividades: [
      { tipo: 'curso',    titulo: 'Google Digital Marketing & E-Commerce (Coursera)', descricao: 'Certificação do Google cobrindo o ecossistema completo de marketing digital.', tempo: '20h', url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce' },
      { tipo: 'pratica',  titulo: 'Crie e analise 1 campanha real (mesmo que pequena)', descricao: 'Invista R$100 em tráfego pago ou 30 dias de SEO em um projeto próprio e meça os resultados.', tempo: '2h/semana' },
      { tipo: 'leitura',  titulo: 'Blog do Neil Patel — referência em marketing digital', descricao: 'Conteúdo técnico e atualizado sobre SEO, analytics e growth. Leia 2 artigos por semana.', tempo: '30 min/semana', url: 'https://neilpatel.com/blog/' },
    ],
  },
  {
    keywords: ['gestão', 'liderança', 'management', 'gestão de pessoas', 'rh', 'recursos humanos', 'okrs', 'agile', 'scrum', 'kanban'],
    atividades: [
      { tipo: 'leitura',  titulo: 'Livro: OKR — Faça Metas que Importam (John Doerr)', descricao: 'O livro que o Google, Intel e Spotify usaram para implementar OKRs. Prático e direto.', tempo: '4h' },
      { tipo: 'curso',    titulo: 'Gestão de Projetos com Scrum (Alura)', descricao: 'Fundamentos do framework ágil mais usado no mundo, com exercícios práticos.', tempo: '8h', url: 'https://www.alura.com.br/cursos-online-agile/scrum' },
      { tipo: 'pratica',  titulo: 'Conduza 1 reunião de feedback estruturado por mês', descricao: 'Use o modelo SBI (Situação-Comportamento-Impacto) para dar feedback claro e acionável.', tempo: '30 min/mês' },
    ],
  },
  {
    keywords: ['produto', 'product manager', 'pm', 'product', 'roadmap', 'backlog', 'discovery', 'user story', 'product owner'],
    atividades: [
      { tipo: 'leitura',  titulo: 'Livro: Inspired — Marty Cagan', descricao: 'A bíblia dos Product Managers. Como times de produto de Silicon Valley realmente trabalham.', tempo: '6h' },
      { tipo: 'curso',    titulo: 'Product Management Fundamentals (Reforge)', descricao: 'Cursos avançados de PM usados por profissionais do Google, Meta e Stripe.', tempo: '10h', url: 'https://www.reforge.com/product-management' },
      { tipo: 'pratica',  titulo: 'Escreva 1 PRD (Product Requirements Doc) completo', descricao: 'Escolha uma feature do seu produto atual ou de um app que você usa e escreva um PRD completo.', tempo: '4h' },
    ],
  },
  {
    keywords: ['finanças', 'financeiro', 'contabilidade', 'controladoria', 'fluxo de caixa', 'balanço', 'planejamento financeiro', 'valuation'],
    atividades: [
      { tipo: 'curso',    titulo: 'Fundamentos de Finanças Corporativas (Coursera — Wharton)', descricao: 'Módulo da renomada escola de negócios Wharton, gratuito no audit.', tempo: '12h', url: 'https://www.coursera.org/learn/wharton-finance' },
      { tipo: 'leitura',  titulo: 'Livro: O Investidor Inteligente — Benjamin Graham', descricao: 'Clássico absoluto sobre análise fundamentalista e gestão de risco financeiro.', tempo: '8h' },
      { tipo: 'pratica',  titulo: 'Monte um modelo financeiro de uma empresa real', descricao: 'Usando dados públicos (CVM, B3), construa um DCF simples de uma empresa listada.', tempo: '6h' },
    ],
  },
  {
    keywords: ['vendas', 'comercial', 'crm', 'salesforce', 'hubspot', 'negociação', 'inside sales', 'b2b'],
    atividades: [
      { tipo: 'leitura',  titulo: 'Livro: Receita Previsível — Aaron Ross', descricao: 'O livro que criou o processo de Sales Development (SDR/BDR) usado em toda startup.', tempo: '4h' },
      { tipo: 'curso',    titulo: 'HubSpot Academy — Inbound Sales (gratuito)', descricao: 'Certificação gratuita e reconhecida em metodologia de vendas consultiva.', tempo: '4h', url: 'https://academy.hubspot.com/courses/inbound-sales' },
      { tipo: 'pratica',  titulo: 'Grave e revise 5 ligações/reuniões de vendas', descricao: 'Com permissão, grave e analise suas próprias calls. O que funcionou? O que você faria diferente?', tempo: '3h/semana' },
    ],
  },
  {
    keywords: ['qualidade', 'qa', 'teste', 'testing', 'automação de testes', 'selenium', 'cypress', 'postman', 'api testing'],
    atividades: [
      { tipo: 'curso',    titulo: 'Test Automation University (Applitools — gratuito)', descricao: 'Cursos gratuitos de automação de testes com Selenium, Cypress, Appium e mais.', tempo: '10h', url: 'https://testautomationu.applitools.com' },
      { tipo: 'pratica',  titulo: 'Escreva testes para um projeto existente', descricao: 'Pegue qualquer projeto (seu ou open source) e adicione cobertura de testes unitários e de integração.', tempo: '3h/semana' },
      { tipo: 'leitura',  titulo: 'ISTQB Foundation Level Syllabus (gratuito)', descricao: 'Material oficial do principal certificado de QA do mundo. Referência para qualquer tester.', tempo: '6h', url: 'https://www.istqb.org/certifications/certified-tester-foundation-level' },
    ],
  },
];

/** Busca atividades específicas por nome de skill (case-insensitive partial match) */
function getAtividadesHard(skill: string, nivelAtual: number, nivelDesejado: number): Atividade[] {
  const skillLower = skill.toLowerCase();
  const found = HARD_SKILL_TEMPLATES.find(t =>
    t.keywords.some(kw => skillLower.includes(kw))
  );
  if (found) return found.atividades;

  // Fallback genérico com o nome da skill
  const gap = nivelDesejado - nivelAtual;
  return [
    {
      tipo: 'curso',
      titulo: `Curso focado em: ${skill}`,
      descricao: `Busque um curso ${gap >= 2 ? 'intermediário/avançado' : 'rápido e prático'} em "${skill}". Plataformas: Alura, Udemy, Coursera, LinkedIn Learning.`,
      tempo: gap >= 2 ? '10–20h' : '4–8h',
    },
    {
      tipo: 'pratica',
      titulo: `Projeto prático usando ${skill}`,
      descricao: `Crie ou contribua com um projeto real que exija "${skill}". Aprender na prática consolida 3× mais rápido do que só assistir aulas.`,
      tempo: '2h/semana por 4 semanas',
    },
    {
      tipo: 'mentoria',
      titulo: `Feedback de um especialista em ${skill}`,
      descricao: `Identifique alguém no seu ambiente que já domina "${skill}" e peça para revisar seu trabalho e apontar lacunas específicas.`,
      tempo: '1h',
    },
  ];
}

// ── Componente ────────────────────────────────────────────────────────────────
export const Trilha: React.FC = () => {
  const { inventario, trilhaProgresso, toggleTrilhaItem } = usePdiStore();

  const trilha = useMemo(() => {
    const itens: { id: string; skill: string; categoria: string; atividades: Atividade[] }[] = [];

    inventario.hardSkills
      .filter(s => s.nivelAtual < s.nivelDesejado)
      .forEach(s => {
        itens.push({
          id: `hard::${s.skill}`,
          skill: s.skill,
          categoria: `Hard Skill — gap ${s.nivelDesejado - s.nivelAtual} nível${s.nivelDesejado - s.nivelAtual > 1 ? 'is' : ''}`,
          atividades: getAtividadesHard(s.skill, s.nivelAtual, s.nivelDesejado),
        });
      });

    inventario.softSkills
      .filter(s => s.pontoForteOuMelhoria === 'Melhoria')
      .forEach(s => {
        itens.push({
          id: `soft::${s.atributo}`,
          skill: s.atributo,
          categoria: 'Soft Skill — área de melhoria',
          atividades: SOFT_ATIVIDADES[s.atributo] ?? [
            { tipo: 'leitura',  titulo: `Pesquise sobre: ${s.atributo}`, descricao: 'Leia 2 artigos ou 1 capítulo de livro sobre este atributo.', tempo: '1h' },
            { tipo: 'pratica',  titulo: `Exercite ${s.atributo} em uma situação real`, descricao: 'Aplique conscientemente este atributo na próxima semana e anote o resultado.', tempo: '1 semana' },
            { tipo: 'mentoria', titulo: `Converse com quem você admira neste atributo`, descricao: 'Aprenda como essa pessoa desenvolveu essa competência ao longo do tempo.', tempo: '30 min' },
          ],
        });
      });

    return itens;
  }, [inventario]);

  const totalAtividades = trilha.reduce((acc, t) => acc + t.atividades.length, 0);
  const concluidasTotal = trilha.reduce((acc, t) =>
    acc + t.atividades.filter((_, ai) => trilhaProgresso[`${t.id}::${ai}`]).length, 0
  );
  const pct = totalAtividades > 0 ? Math.round((concluidasTotal / totalAtividades) * 100) : 0;

  if (trilha.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">🎯</div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Trilha não gerada</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm">
          Nenhuma gap de skill identificada. Ou todas as suas hard skills estão no nível desejado e não há soft skills a melhorar — ou o inventário não foi preenchido.
        </p>
      </div>
    );
  }

  return (
    <div className="pb-24 lg:pb-0">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">Trilha de Desenvolvimento</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
          Gerada com base nas suas gaps de skill. Inclui recursos reais e curados. Marque conforme for concluindo.
        </p>
      </motion.div>

      {/* Barra de progresso geral */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm mb-8 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
            <span>Progresso geral</span>
            <span>{concluidasTotal}/{totalAtividades} atividades</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
        <span className="text-2xl font-black text-blue-600 dark:text-blue-400 shrink-0">{pct}%</span>
      </div>

      {/* Cards por skill */}
      <div className="space-y-6">
        {trilha.map((grupo, gi) => {
          const concluidas = grupo.atividades.filter((_, ai) => trilhaProgresso[`${grupo.id}::${ai}`]).length;
          const pctGrupo = Math.round((concluidas / grupo.atividades.length) * 100);

          return (
            <motion.div
              key={grupo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.06 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between p-5 border-b border-slate-100 dark:border-slate-700">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 block mb-1">
                    {grupo.categoria}
                  </span>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">{grupo.skill}</h3>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="text-sm font-black text-indigo-600 dark:text-indigo-400">{pctGrupo}%</div>
                  <div className="text-[10px] text-slate-400">{concluidas}/{grupo.atividades.length}</div>
                </div>
              </div>

              {/* Atividades */}
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {grupo.atividades.map((atv, ai) => {
                  const key = `${grupo.id}::${ai}`;
                  const done = !!trilhaProgresso[key];
                  return (
                    <button
                      key={ai}
                      onClick={() => toggleTrilhaItem(key)}
                      className={`w-full flex items-start gap-4 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${done ? 'opacity-60' : ''}`}
                    >
                      {done
                        ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
                        : <Circle className="w-5 h-5 shrink-0 mt-0.5 text-slate-300 dark:text-slate-600" />
                      }
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${TIPO_COLOR[atv.tipo]}`}>
                            {TIPO_ICON[atv.tipo]} {atv.tipo}
                          </span>
                          <span className="text-[10px] text-slate-400">⏱ {atv.tempo}</span>
                        </div>
                        <p className={`text-sm font-semibold mb-0.5 ${done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>
                          {atv.titulo}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{atv.descricao}</p>
                        {atv.url && !done && (
                          <a
                            href={atv.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-1 inline-block"
                          >
                            Acessar recurso →
                          </a>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
