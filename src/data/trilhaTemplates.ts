// ── Tipos ────────────────────────────────────────────────────────────────────
export type TipoAtividade =
  | 'leitura'
  | 'pratica'
  | 'curso'
  | 'mentoria'
  | 'projeto'
  | 'certificacao'
  | 'portfolio';

export interface Atividade {
  titulo: string;
  descricao: string;
  tipo: TipoAtividade;
  tempo: string;
  url?: string;
  /** Dica de como tornar essa atividade visível para recrutadores/headhunters */
  headhunterDica?: string;
}

export type HardSkillTemplate = {
  keywords: string[];
  area: string;
  atividades: Atividade[];
};

// ── Hard Skills ───────────────────────────────────────────────────────────────
export const HARD_SKILL_TEMPLATES: HardSkillTemplate[] = [
  // ── 1. Python / Data Engineering ──────────────────────────────────────────
  {
    keywords: ['python', 'django', 'flask', 'fastapi', 'pandas', 'numpy', 'scikit', 'pyspark'],
    area: 'Tecnologia',
    atividades: [
      { tipo: 'curso', titulo: 'Python for Everybody (Coursera)', descricao: 'Especialização completa, do zero ao intermediário, com projetos reais.', tempo: '20h', url: 'https://www.coursera.org/specializations/python', headhunterDica: 'Adicione o certificado ao LinkedIn em Licenças e Certificados.' },
      { tipo: 'portfolio', titulo: 'Projeto pessoal publicado no GitHub', descricao: 'Automatize uma tarefa real (ETL, bot, API). README claro com problem statement, solução e resultados.', tempo: '2h/semana', headhunterDica: 'Pin o repositório no GitHub e adicione o link na seção Projetos do LinkedIn.' },
      { tipo: 'pratica', titulo: 'Desafios LeetCode/HackerRank (Python)', descricao: 'Resolva 30 problemas de nível medium. Estruturas de dados e algoritmos são cobrados em entrevistas técnicas.', tempo: '5h', url: 'https://www.hackerrank.com/domains/python', headhunterDica: 'Compartilhe seu perfil público do HackerRank no LinkedIn.' },
      { tipo: 'leitura', titulo: 'Documentação oficial Python + PEP 8', descricao: 'Leia a documentação oficial e siga o guia de estilo PEP 8. Código limpo é diferencial em code reviews.', tempo: '1h/semana', url: 'https://docs.python.org/3/', headhunterDica: 'Contribua com um PR em projeto open source Python e mencione na experiência.' },
    ],
  },
  // ── 2. JavaScript / TypeScript / Frontend ─────────────────────────────────
  {
    keywords: ['javascript', 'typescript', 'react', 'vue', 'angular', 'next', 'node', 'frontend', 'web'],
    area: 'Tecnologia',
    atividades: [
      { tipo: 'curso', titulo: 'The Odin Project (Full Stack JavaScript)', descricao: 'Currículo open-source completo, orientado a projetos. Altamente reconhecido no mercado.', tempo: '40h+', url: 'https://www.theodinproject.com', headhunterDica: 'Suba todos os projetos do curso no GitHub.' },
      { tipo: 'portfolio', titulo: 'Clone de app real (Trello / Twitter / Airbnb)', descricao: 'Clonar UIs conhecidas é o melhor exercício para solidificar conceitos de frontend moderno.', tempo: '10h/projeto', headhunterDica: 'Publique em Vercel/Netlify com domínio próprio e adicione ao portfólio.' },
      { tipo: 'leitura', titulo: 'JavaScript.info — guia moderno ES6+', descricao: 'O melhor guia gratuito de JS moderno com exemplos interativos e exercícios.', tempo: '8h', url: 'https://javascript.info', headhunterDica: 'Escreva um artigo sobre algo que aprendeu e publique no dev.to ou LinkedIn.' },
      { tipo: 'certificacao', titulo: 'Meta Frontend Developer Certificate (Coursera)', descricao: 'Certificação profissional da Meta cobrindo React, HTML/CSS e UX fundamentals.', tempo: '30h', url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer', headhunterDica: 'Adicione badge digital ao LinkedIn — certificações Meta são reconhecidas globalmente.' },
    ],
  },
  // ── 3. SQL / Banco de Dados ───────────────────────────────────────────────
  {
    keywords: ['sql', 'postgres', 'mysql', 'oracle', 'banco de dados', 'database', 'query', 'mongodb', 'redis'],
    area: 'Dados',
    atividades: [
      { tipo: 'curso', titulo: 'SQL para Análise de Dados (Mode Analytics)', descricao: 'Curso gratuito e prático com exercícios em banco de dados real online.', tempo: '8h', url: 'https://mode.com/sql-tutorial/', headhunterDica: 'Faça um projeto de análise com dataset público e publique no GitHub.' },
      { tipo: 'pratica', titulo: 'HackerRank SQL Challenges (30 problemas)', descricao: 'Problemas classificados por nível. Cobrados em entrevistas de dados e backend.', tempo: '5h', url: 'https://www.hackerrank.com/domains/sql', headhunterDica: 'Compartilhe o badge de certificação SQL do HackerRank no LinkedIn.' },
      { tipo: 'portfolio', titulo: 'Dashboard analítico com SQL + Power BI/Looker', descricao: 'Use um dataset público do Kaggle, escreva queries avançadas e crie visualizações.', tempo: '8h', headhunterDica: 'Publique o projeto no GitHub com README e link para o dashboard interativo.' },
    ],
  },
  // ── 4. Data Science / Machine Learning / BI ───────────────────────────────
  {
    keywords: ['dados', 'data science', 'machine learning', 'ml', 'ia', 'inteligência artificial', 'bi', 'power bi', 'tableau', 'excel avançado', 'analytics', 'data analytics'],
    area: 'Dados',
    atividades: [
      { tipo: 'certificacao', titulo: 'Google Data Analytics Certificate (Coursera)', descricao: 'Certificação profissional do Google, reconhecida no mercado, cobre todo o ciclo de análise de dados.', tempo: '20h', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', headhunterDica: 'Badge digital verificável — adicione ao LinkedIn. Reconhecido globalmente.' },
      { tipo: 'pratica', titulo: 'Competição Kaggle (Getting Started)', descricao: 'Participe de uma competição básica do Kaggle. Força a aplicar ML em problemas reais com feedback da comunidade.', tempo: '10h', url: 'https://www.kaggle.com/competitions', headhunterDica: 'Adicione seu perfil Kaggle ao LinkedIn e GitHub. Medalhas são sinal de mercado.' },
      { tipo: 'portfolio', titulo: 'Dashboard de dados do trabalho', descricao: 'Escolha 3 métricas importantes da empresa e crie visualização em Power BI ou Looker Studio com insights acionáveis.', tempo: '8h', headhunterDica: 'Publique o dashboard (com dados fictícios/públicos) e descreva o impacto gerado na experiência.' },
      { tipo: 'leitura', titulo: 'Livro: Storytelling com Dados — Cole Nussbaumer', descricao: 'Como comunicar dados visualmente para audiências executivas. Habilidade altamente valorizada.', tempo: '5h', headhunterDica: 'Aplique as técnicas em uma apresentação real e mencione o resultado obtido na experiência.' },
    ],
  },
  // ── 5. Cloud / AWS / Azure / GCP ──────────────────────────────────────────
  {
    keywords: ['cloud', 'aws', 'azure', 'gcp', 'google cloud', 'nuvem'],
    area: 'Infraestrutura',
    atividades: [
      { tipo: 'certificacao', titulo: 'AWS Cloud Practitioner (CLF-C02)', descricao: 'Certificação oficial da AWS para fundamentos de cloud. Pré-requisito para qualquer carreira cloud.', tempo: '20h', url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/', headhunterDica: 'Certificações AWS são altamente buscadas por headhunters. Adicione o badge ao LinkedIn.' },
      { tipo: 'pratica', titulo: 'Suba um projeto real no free tier (AWS/GCP/Azure)', descricao: 'Hospede um projeto pessoal usando EC2, Lambda, S3 ou Cloud Run. Hands-on é o que conta.', tempo: '5h', headhunterDica: 'Documente a arquitetura no GitHub com diagrama e adicione ao portfólio.' },
      { tipo: 'leitura', titulo: 'Cloud Design Patterns (Microsoft Docs)', descricao: 'Padrões de arquitetura cloud essenciais: Circuit Breaker, CQRS, Event Sourcing, Saga.', tempo: '4h', url: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/', headhunterDica: 'Implemente 1 padrão em um projeto e escreva um artigo técnico no dev.to.' },
    ],
  },
  // ── 6. DevOps / Docker / Kubernetes ───────────────────────────────────────
  {
    keywords: ['devops', 'docker', 'kubernetes', 'k8s', 'containers', 'helm', 'container'],
    area: 'Infraestrutura',
    atividades: [
      { tipo: 'curso', titulo: 'Docker e Kubernetes: The Complete Guide (Udemy)', descricao: 'Curso mais completo do mercado sobre containerização e orquestração, com projetos reais.', tempo: '20h', url: 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/', headhunterDica: 'Contêinerize um projeto seu e publique no DockerHub. Link no GitHub.' },
      { tipo: 'certificacao', titulo: 'CKA — Certified Kubernetes Administrator (CNCF)', descricao: 'Certificação hands-on reconhecida globalmente pela Cloud Native Computing Foundation.', tempo: '40h', url: 'https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/', headhunterDica: 'CKA é uma das certificações mais buscadas em vagas de DevOps/SRE. Badge verificável.' },
      { tipo: 'pratica', titulo: 'Implemente um pipeline CI/CD completo', descricao: 'GitHub Actions ou GitLab CI: build → test → deploy automatizado para um projeto seu.', tempo: '6h', headhunterDica: 'Documente o pipeline no README do GitHub. Demonstra maturidade de engenharia.' },
    ],
  },
  // ── 7. CI/CD / Infrastructure as Code ────────────────────────────────────
  {
    keywords: ['terraform', 'infrastructure as code', 'iac', 'pulumi', 'ansible', 'ci/cd', 'github actions', 'gitlab ci', 'pipeline'],
    area: 'Infraestrutura',
    atividades: [
      { tipo: 'certificacao', titulo: 'HashiCorp Terraform Associate', descricao: 'Certificação oficial do Terraform, ferramenta padrão de IaC no mercado.', tempo: '20h', url: 'https://www.hashicorp.com/certification/terraform-associate', headhunterDica: 'Altamente buscada em vagas de DevOps e Cloud. Adicione ao LinkedIn.' },
      { tipo: 'portfolio', titulo: 'Infraestrutura completa no Terraform (GitHub)', descricao: 'Provisione uma arquitetura real (VPC + EC2 + RDS + S3) como código. Inclua módulos reutilizáveis.', tempo: '8h', headhunterDica: 'Repositório público com README detalhado mostra domínio prático aos recrutadores.' },
      { tipo: 'pratica', titulo: 'Automatize deploys com GitHub Actions', descricao: 'Crie um workflow completo: lint → test → build → deploy com rollback automático.', tempo: '4h', headhunterDica: 'Mostre o arquivo .github/workflows no portfólio e explique as decisões de design.' },
    ],
  },
  // ── 8. Observabilidade / SRE ──────────────────────────────────────────────
  {
    keywords: ['observabilidade', 'datadog', 'new relic', 'prometheus', 'grafana', 'sre', 'site reliability', 'monitoring', 'logs', 'tracing', 'opentelemetry'],
    area: 'Infraestrutura',
    atividades: [
      { tipo: 'curso', titulo: 'SRE Fundamentals (Google Cloud Skills Boost)', descricao: 'Curso oficial do Google sobre Site Reliability Engineering, SLOs e gestão de incidentes.', tempo: '10h', url: 'https://www.cloudskillsboost.google/paths/20', headhunterDica: 'Certificação Google Cloud é reconhecida globalmente.' },
      { tipo: 'pratica', titulo: 'Implemente stack Prometheus + Grafana', descricao: 'Monitore uma aplicação real com métricas customizadas, alertas e dashboards de SLO.', tempo: '6h', headhunterDica: 'Documente a stack e os alertas configurados. Mostre como reduziu MTTR.' },
      { tipo: 'leitura', titulo: 'Livro: Site Reliability Engineering (Google, gratuito)', descricao: 'O livro que definiu a disciplina de SRE. Disponível gratuitamente online.', tempo: '10h', url: 'https://sre.google/sre-book/table-of-contents/', headhunterDica: 'Implemente um processo de postmortem blameless e documente na experiência.' },
    ],
  },
  // ── 9. Arquitetura de Software / System Design ────────────────────────────
  {
    keywords: ['arquitetura de software', 'system design', 'microservices', 'event-driven', 'cqrs', 'ddd', 'domain driven', 'microsserviços', 'api design', 'rest api', 'grpc'],
    area: 'Tecnologia',
    atividades: [
      { tipo: 'leitura', titulo: 'Designing Data-Intensive Applications — Kleppmann', descricao: 'O livro mais importante de arquitetura moderna. Cobre sistemas distribuídos, consistência, escalabilidade.', tempo: '15h', headhunterDica: 'Aplique um conceito do livro em um projeto e escreva um artigo técnico.' },
      { tipo: 'pratica', titulo: 'System Design Interview Practice (excalidraw.com)', descricao: 'Pratique design de sistemas como URL shortener, feed de notícias, chat em tempo real. Cobrados em entrevistas senior+.', tempo: '2h/semana', url: 'https://github.com/donnemartin/system-design-primer', headhunterDica: 'Publique seus diagramas no GitHub ou no LinkedIn como demonstração de raciocínio arquitetural.' },
      { tipo: 'portfolio', titulo: 'Refatore um projeto para arquitetura de microsserviços', descricao: 'Separe um monolito em ao menos 3 serviços independentes com comunicação assíncrona (Kafka/RabbitMQ).', tempo: '10h', headhunterDica: 'Documente o ADR (Architecture Decision Record) no GitHub. Diferencia candidatos sênior.' },
    ],
  },
  // ── 10. Backend Java / Spring / .NET ──────────────────────────────────────
  {
    keywords: ['java', 'spring', 'spring boot', '.net', 'c#', 'asp.net', 'hibernate', 'jpa', 'backend'],
    area: 'Tecnologia',
    atividades: [
      { tipo: 'certificacao', titulo: 'Oracle Certified Professional: Java SE 17 (OCP)', descricao: 'Certificação Java mais reconhecida no mercado. Cobre features modernas como streams, lambdas, records.', tempo: '30h', url: 'https://education.oracle.com/java-se-17-developer/pexam_1Z0-829', headhunterDica: 'Certificação Oracle Java é diferencial em vagas enterprise. Adicione ao LinkedIn.' },
      { tipo: 'curso', titulo: 'Spring Boot 3 + Microservices (Udemy/Alura)', descricao: 'Construa APIs REST completas com Spring Boot, Security, Data JPA e deploy em cloud.', tempo: '20h', url: 'https://www.alura.com.br/cursos-online-java', headhunterDica: 'Suba o projeto no GitHub com documentação Swagger/OpenAPI.' },
      { tipo: 'portfolio', titulo: 'API REST completa com documentação OpenAPI', descricao: 'Implemente CRUD completo, autenticação JWT, testes unitários e de integração, deploy em cloud.', tempo: '10h', headhunterDica: 'Repositório público com README, diagrama de entidades e link para demo. Mostra maturidade.' },
    ],
  },
  // ── 11. Mobile (iOS / Android / React Native / Flutter) ───────────────────
  {
    keywords: ['ios', 'swift', 'android', 'kotlin', 'react native', 'flutter', 'mobile', 'app mobile', 'aplicativo'],
    area: 'Tecnologia',
    atividades: [
      { tipo: 'curso', titulo: 'Flutter & Dart — The Complete Guide (Udemy)', descricao: 'Flutter cobre iOS e Android com um único código. Demanda alta em 2025.', tempo: '25h', url: 'https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/', headhunterDica: 'Publique um app na Play Store ou App Store — mesmo gratuito, é evidência concreta.' },
      { tipo: 'portfolio', titulo: 'App publicado na Play Store / App Store', descricao: 'Desenvolva e publique um app real, mesmo simples. O processo de publicação já demonstra domínio completo do ciclo.', tempo: '20h', headhunterDica: 'Link para o app nas lojas no LinkedIn e GitHub. Evidência pública verificável.' },
      { tipo: 'certificacao', titulo: 'Associate Android Developer (Google)', descricao: 'Certificação oficial do Google para desenvolvimento Android com Kotlin.', tempo: '15h', url: 'https://developers.google.com/certification/associate-android-developer', headhunterDica: 'Badge verificável pelo Google. Diferencial em vagas Android.' },
    ],
  },
  // ── 12. IA Generativa / LLMs / Prompt Engineering ────────────────────────
  {
    keywords: ['ia generativa', 'llm', 'prompt engineering', 'rag', 'langchain', 'gpt', 'gemini', 'claude', 'openai', 'inteligência artificial generativa', 'agentes de ia', 'ai agents'],
    area: 'Dados / IA',
    atividades: [
      { tipo: 'curso', titulo: 'Prompt Engineering for Developers (DeepLearning.AI)', descricao: 'Curso oficial de Andrew Ng sobre como usar LLMs de forma eficaz em aplicações reais.', tempo: '4h', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/', headhunterDica: 'IA generativa é a skill mais buscada em 2025. Documente casos de uso reais no LinkedIn.' },
      { tipo: 'portfolio', titulo: 'Construa um agente de IA com RAG', descricao: 'Implemente um chatbot que consulta uma base de conhecimento interna usando LangChain + vector database (Pinecone/Chroma).', tempo: '10h', headhunterDica: 'Repositório público com demo em vídeo. Demonstra domínio prático de IA aplicada.' },
      { tipo: 'pratica', titulo: 'Fine-tuning ou avaliação de LLM em domínio específico', descricao: 'Use Hugging Face para fazer fine-tuning de um modelo pequeno ou implemente métricas de avaliação (RAGAS).', tempo: '8h', url: 'https://huggingface.co/learn', headhunterDica: 'Escreva um artigo técnico sobre os resultados e publique no LinkedIn ou Medium.' },
    ],
  },
  // ── 13. Segurança da Informação / Pentest ─────────────────────────────────
  {
    keywords: ['segurança', 'security', 'cibersegurança', 'pentest', 'soc', 'siem', 'firewall', 'criptografia', 'owasp', 'red team', 'blue team', 'forense', 'dfir'],
    area: 'Segurança',
    atividades: [
      { tipo: 'certificacao', titulo: 'CompTIA Security+ (SY0-701)', descricao: 'Certificação mais requisitada em vagas de segurança. Reconhecida pelo DoD americano e pelo mercado global.', tempo: '30h', url: 'https://www.comptia.org/certifications/security', headhunterDica: 'Security+ é requisito em muitas vagas enterprise e governo. Badge verificável.' },
      { tipo: 'pratica', titulo: 'TryHackMe / HackTheBox (paths guiados)', descricao: 'Plataformas gamificadas para praticar segurança ofensiva e defensiva em ambientes controlados e legais.', tempo: '3h/semana', url: 'https://tryhackme.com', headhunterDica: 'Compartilhe seu ranking e completed rooms no LinkedIn. Demonstra prática contínua.' },
      { tipo: 'certificacao', titulo: 'Google Cybersecurity Certificate (Coursera)', descricao: 'Certificação profissional do Google para iniciantes na área de segurança. Sem pré-requisitos.', tempo: '20h', url: 'https://www.coursera.org/professional-certificates/google-cybersecurity', headhunterDica: 'Boa entrada para o mercado. Complemente com lab prático no TryHackMe.' },
      { tipo: 'leitura', titulo: 'OWASP Top 10 — vulnerabilidades web críticas', descricao: 'Leitura obrigatória. Guia das 10 vulnerabilidades mais exploradas em aplicações web.', tempo: '2h', url: 'https://owasp.org/www-project-top-ten/', headhunterDica: 'Implemente correções de OWASP em um projeto e documente no GitHub.' },
    ],
  },
  // ── 14. LGPD / Compliance / ISO 27001 ────────────────────────────────────
  {
    keywords: ['lgpd', 'compliance', 'iso 27001', 'gdpr', 'privacidade', 'dados pessoais', 'proteção de dados', 'anpd', 'sox', 'pci dss'],
    area: 'Jurídico / Segurança',
    atividades: [
      { tipo: 'certificacao', titulo: 'EXIN Privacy & Data Protection Foundation (LGPD)', descricao: 'Certificação internacional de fundamentos de privacidade alinhada à LGPD/GDPR.', tempo: '15h', url: 'https://www.exin.com/certifications/exin-privacy-and-data-protection-foundation-exam', headhunterDica: 'LGPD é obrigatória em empresas com dados pessoais. Certificação é diferencial.' },
      { tipo: 'curso', titulo: 'LGPD na Prática (ANPD — gratuito)', descricao: 'Curso oficial da Autoridade Nacional de Proteção de Dados, gratuito e com certificado.', tempo: '8h', url: 'https://www.gov.br/anpd/pt-br', headhunterDica: 'Mencione em entrevistas casos de adequação à LGPD que você liderou ou apoiou.' },
      { tipo: 'pratica', titulo: 'Mapeie fluxos de dados pessoais (ROPA)', descricao: 'Crie um Registro de Operações de Processamento de Atividades da área onde atua. Entregável concreto de compliance.', tempo: '4h', headhunterDica: 'Documente o processo seguido e o resultado na experiência profissional.' },
    ],
  },
  // ── 15. Design / UX / UI ──────────────────────────────────────────────────
  {
    keywords: ['design', 'ux', 'ui', 'figma', 'product design', 'prototipagem', 'wireframe', 'user experience', 'user research', 'usabilidade', 'design system'],
    area: 'Design',
    atividades: [
      { tipo: 'certificacao', titulo: 'Google UX Design Certificate (Coursera)', descricao: 'Certificação em 7 módulos cobrindo todo o processo UX, do Discovery ao Handoff com Figma.', tempo: '30h', url: 'https://www.coursera.org/professional-certificates/google-ux-design', headhunterDica: 'Badge verificável do Google. Adicione ao LinkedIn e inclua os projetos do portfólio.' },
      { tipo: 'portfolio', titulo: 'Case study completo publicado no Behance/Dribbble', descricao: 'Documente todo o processo UX: problema → research → wireframes → protótipo → teste → resultado.', tempo: '8h', url: 'https://www.behance.net', headhunterDica: 'Case studies com métricas de resultado são o diferencial em entrevistas de design.' },
      { tipo: 'pratica', titulo: 'Redesenhe 1 tela de app real com justificativa', descricao: 'Escolha uma tela que te irrita, recrie no Figma com as leis de UX aplicadas e documente as decisões.', tempo: '4h', headhunterDica: 'Publique no LinkedIn com before/after. Posts de design têm alto engajamento.' },
      { tipo: 'leitura', titulo: 'Laws of UX (lawsofux.com)', descricao: 'Coleção das principais leis psicológicas do design com exemplos reais de aplicação.', tempo: '2h', url: 'https://lawsofux.com', headhunterDica: 'Cite as leis usadas nas suas decisões de design durante entrevistas.' },
    ],
  },
  // ── 16. Marketing Digital / Growth / SEO ──────────────────────────────────
  {
    keywords: ['marketing', 'seo', 'growth', 'ads', 'google analytics', 'meta ads', 'copywriting', 'conteúdo', 'redes sociais', 'inbound', 'outbound', 'email marketing'],
    area: 'Marketing',
    atividades: [
      { tipo: 'certificacao', titulo: 'Google Digital Marketing & E-Commerce (Coursera)', descricao: 'Certificação do Google cobrindo todo o ecossistema de marketing digital com 6 cursos.', tempo: '20h', url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce', headhunterDica: 'Certificação Google reconhecida globalmente. Adicione ao LinkedIn.' },
      { tipo: 'pratica', titulo: 'Campanha real com budget de R$100 e análise de resultado', descricao: 'Invista R$100 em tráfego pago (Meta Ads ou Google Ads) em um projeto próprio. Mensure CPC, CTR e conversão.', tempo: '2h/semana', headhunterDica: 'Documente os resultados com números reais na experiência. Dados vendem.' },
      { tipo: 'portfolio', titulo: 'Crescimento de canal orgânico documentado (SEO/conteúdo)', descricao: 'Crie ou otimize um blog/canal por 3 meses. Documente crescimento de tráfego com Google Analytics.', tempo: '3h/semana', headhunterDica: 'Screenshots do Google Analytics com crescimento são evidência poderosa para headhunters.' },
    ],
  },
  // ── 17. Gestão / Liderança / OKRs / Scrum ────────────────────────────────
  {
    keywords: ['gestão', 'liderança', 'management', 'gestão de pessoas', 'okrs', 'agile', 'scrum', 'kanban', 'people management'],
    area: 'Gestão',
    atividades: [
      { tipo: 'leitura', titulo: 'Livro: OKR — Faça Metas que Importam (John Doerr)', descricao: 'O livro que Google, Intel e Spotify usaram para implementar OKRs. Prático e direto.', tempo: '4h', headhunterDica: 'Implemente OKRs no seu time e documente o impacto na experiência.' },
      { tipo: 'certificacao', titulo: 'Professional Scrum Master I (PSM I — Scrum.org)', descricao: 'Certificação de Scrum Master mais reconhecida do mercado. Aprovação mínima de 85%.', tempo: '10h', url: 'https://www.scrum.org/assessments/professional-scrum-master-i-certification', headhunterDica: 'PSM I é requisito em muitas vagas ágeis. Badge verificável publicamente.' },
      { tipo: 'pratica', titulo: 'Feedback estruturado SBI com o time (mensal)', descricao: 'Aplique o modelo Situação → Comportamento → Impacto em feedbacks. Documente a evolução do time.', tempo: '30 min/mês', headhunterDica: 'Mencione em entrevistas casos onde feedback estruturado melhorou performance do time.' },
    ],
  },
  // ── 18. Gestão de Produto ─────────────────────────────────────────────────
  {
    keywords: ['produto', 'product manager', 'pm', 'product', 'roadmap', 'backlog', 'discovery', 'user story', 'product owner', 'prd', 'product requirements'],
    area: 'Produto',
    atividades: [
      { tipo: 'leitura', titulo: 'Livro: Inspired — Marty Cagan', descricao: 'A bíblia dos Product Managers. Como times de produto de Silicon Valley realmente trabalham.', tempo: '6h', headhunterDica: 'Aplique os frameworks do Continuous Discovery em um produto real e documente resultados.' },
      { tipo: 'certificacao', titulo: 'Professional Scrum Product Owner I (PSPO I)', descricao: 'Certificação de Product Owner reconhecida pelo mercado global. Valida conhecimento de backlog e valor.', tempo: '10h', url: 'https://www.scrum.org/assessments/professional-scrum-product-owner-i-certification', headhunterDica: 'PSPO I é diferencial em vagas de PM e PO. Badge verificável.' },
      { tipo: 'portfolio', titulo: 'PRD completo de uma feature (público no Notion/GitHub)', descricao: 'Escreva um Product Requirements Document completo: problema → solução → métricas de sucesso → critérios de aceite.', tempo: '4h', headhunterDica: 'PRD público demonstra capacidade de comunicação e pensamento estruturado para recrutadores.' },
    ],
  },
  // ── 19. Finanças Corporativas / Valuation ─────────────────────────────────
  {
    keywords: ['finanças', 'financeiro', 'fluxo de caixa', 'balanço', 'planejamento financeiro', 'valuation', 'dcf', 'fp&a', 'controladoria', 'budget', 'orçamento'],
    area: 'Finanças',
    atividades: [
      { tipo: 'curso', titulo: 'Fundamentos de Finanças Corporativas (Wharton/Coursera)', descricao: 'Módulo da renomada Wharton School, gratuito no audit. Cobre TVM, NPV, IRR e valuation.', tempo: '12h', url: 'https://www.coursera.org/learn/wharton-finance', headhunterDica: 'Certificação Wharton tem prestígio. Adicione ao LinkedIn.' },
      { tipo: 'portfolio', titulo: 'Modelo financeiro DCF de uma empresa pública', descricao: 'Use dados da CVM/B3 para construir um modelo de valuation por fluxo de caixa descontado.', tempo: '6h', headhunterDica: 'Publique o modelo (Excel/Google Sheets) no GitHub. Demonstra capacidade analítica concreta.' },
      { tipo: 'certificacao', titulo: 'CFA Level 1 (CFA Institute)', descricao: 'A certificação mais respeitada em finanças globalmente. Abre portas para mercado financeiro premium.', tempo: '300h', url: 'https://www.cfainstitute.org/programs/cfa', headhunterDica: 'Mesmo estar estudando para o CFA já é valorizado. Mencione o progresso no LinkedIn.' },
    ],
  },
  // ── 20. Contabilidade / CRC / IFRS ───────────────────────────────────────
  {
    keywords: ['contabilidade', 'contábil', 'crc', 'ifrs', 'auditoria', 'balanço patrimonial', 'dre', 'demonstrações financeiras', 'cfc', 'contador'],
    area: 'Contabilidade',
    atividades: [
      { tipo: 'certificacao', titulo: 'Certificação CRC (Conselho Regional de Contabilidade)', descricao: 'Habilitação profissional obrigatória para exercer a contabilidade no Brasil. Base da carreira.', tempo: '180h (graduação)', url: 'https://www.cfc.org.br', headhunterDica: 'CRC ativo é requisito em vagas de contador. Mantenha habilitação atualizada.' },
      { tipo: 'curso', titulo: 'IFRS — Normas Internacionais de Contabilidade (FIPECAFI)', descricao: 'As IFRS são obrigatórias para empresas de capital aberto. Domínio é diferencial em qualquer área contábil.', tempo: '20h', headhunterDica: 'Mencione experiência com IFRS no LinkedIn e na descrição de cargos.' },
      { tipo: 'pratica', titulo: 'Elabore um conjunto completo de demonstrações financeiras', descricao: 'Monte BP, DRE, DFC e DMPL de uma empresa fictícia ou do estágio. Exercício prático fundamental.', tempo: '8h', headhunterDica: 'Modelo limpo e bem estruturado pode ser mostrado em entrevistas técnicas.' },
    ],
  },
  // ── 21. Vendas / CRM / Inside Sales ──────────────────────────────────────
  {
    keywords: ['vendas', 'comercial', 'crm', 'salesforce', 'hubspot', 'negociação comercial', 'inside sales', 'b2b', 'sdr', 'bdr', 'account executive', 'pipeline de vendas'],
    area: 'Vendas',
    atividades: [
      { tipo: 'leitura', titulo: 'Livro: Receita Previsível — Aaron Ross', descricao: 'O livro que criou o processo SDR/BDR usado em toda startup. Fundamento de sales development.', tempo: '4h', headhunterDica: 'Aplique a metodologia e documente o impacto em pipeline gerado na experiência.' },
      { tipo: 'certificacao', titulo: 'HubSpot Sales Software Certification (gratuito)', descricao: 'Certificação gratuita e reconhecida em metodologia de vendas e uso de CRM HubSpot.', tempo: '4h', url: 'https://academy.hubspot.com/courses/hubspot-sales-software', headhunterDica: 'Badge verificável. Mostre no LinkedIn.' },
      { tipo: 'pratica', titulo: 'Grave e analise 5 reuniões de vendas', descricao: 'Com permissão, grave suas calls e analise: objeções, rapport, pitch. Use Gong, Chorus ou simplesmente re-assista.', tempo: '3h/semana', headhunterDica: 'Mencione na experiência a melhoria de taxa de conversão obtida com essa prática.' },
    ],
  },
  // ── 22. Customer Success ──────────────────────────────────────────────────
  {
    keywords: ['customer success', 'churn', 'nps', 'onboarding', 'health score', 'cs', 'sucesso do cliente', 'csm', 'expansão', 'renewal', 'gainsight', 'totango'],
    area: 'Customer Success',
    atividades: [
      { tipo: 'certificacao', titulo: 'SuccessHACKER Customer Success Certification', descricao: 'Uma das certificações mais reconhecidas no ecossistema de CS. Cobre todo o ciclo de vida do cliente.', tempo: '10h', url: 'https://www.successhacker.co/academy', headhunterDica: 'CS é uma das áreas que mais cresce. Certificação diferencia candidatos no Brasil.' },
      { tipo: 'pratica', titulo: 'Implemente um health score para sua carteira', descricao: 'Defina 5 métricas de saúde do cliente (adoção, engajamento, NPS, tickets, expansão). Automatize em planilha ou CRM.', tempo: '4h', headhunterDica: 'Documente a redução de churn obtida. Número de impacto é o que headhunters procuram.' },
      { tipo: 'leitura', titulo: 'Livro: The Customer Success Economy — Mehta & Steinman', descricao: 'A bíblia da área. Cobre estratégia de CS, métricas e construção de equipes.', tempo: '5h', headhunterDica: 'Implemente uma prática do livro e documente o resultado na experiência.' },
    ],
  },
  // ── 23. Recursos Humanos / People & Culture ───────────────────────────────
  {
    keywords: ['recursos humanos', 'rh', 'recrutamento', 'seleção', 'folha de pagamento', 'benefícios', 'hrbp', 'treinamento', 't&d', 'people', 'cultura organizacional', 'people analytics'],
    area: 'RH',
    atividades: [
      { tipo: 'certificacao', titulo: 'PHR / SHRM-CP (Society for Human Resource Management)', descricao: 'Certificações internacionais de RH reconhecidas globalmente. SHRM-CP é para profissionais operacionais.', tempo: '40h', url: 'https://www.shrm.org/certification', headhunterDica: 'Certificações SHRM são altamente buscadas por multinacionais. Badge verificável.' },
      { tipo: 'curso', titulo: 'People Analytics (Coursera — University of Pennsylvania)', descricao: 'Como usar dados para tomar decisões de RH melhores. Habilidade mais demandada em RH moderno.', tempo: '8h', url: 'https://www.coursera.org/learn/wharton-people-analytics', headhunterDica: 'People Analytics é o futuro do RH. Mencione projetos com dados no LinkedIn.' },
      { tipo: 'pratica', titulo: 'Implemente um processo de onboarding estruturado', descricao: 'Crie ou melhore o processo de entrada de novos colaboradores. Documente impacto em retenção (90 dias).', tempo: '4h', headhunterDica: 'Mencione na experiência a taxa de retenção obtida. É o KPI que recrutadores de RH buscam.' },
    ],
  },
  // ── 24. Supply Chain / Logística ──────────────────────────────────────────
  {
    keywords: ['logística', 'supply chain', 'wms', 'tms', 'estoque', 'armazenagem', 'transportadora', 'frete', 'demanda', 's&op', 'planejamento de demanda', 'inventário'],
    area: 'Supply Chain',
    atividades: [
      { tipo: 'certificacao', titulo: 'CSCP — APICS Certified Supply Chain Professional', descricao: 'Certificação mais reconhecida globalmente em supply chain. Requisito em multinacionais.', tempo: '60h', url: 'https://www.ascm.org/certifications/cscp/', headhunterDica: 'APICS/ASCM é o padrão global de supply chain. Badge verificável no LinkedIn.' },
      { tipo: 'curso', titulo: 'Supply Chain Management (Coursera — Rutgers)', descricao: 'Especialização cobrindo procurement, logística, operações e analytics de supply chain.', tempo: '20h', url: 'https://www.coursera.org/specializations/supply-chain-management', headhunterDica: 'Adicione o certificado ao LinkedIn e descreva como aplicou na experiência.' },
      { tipo: 'pratica', titulo: 'Mapeie e otimize um fluxo logístico real', descricao: 'Selecione um processo (recebimento, armazenagem ou expedição), meça lead time atual e proponha melhoria com dados.', tempo: '4h', headhunterDica: 'Documente a redução de lead time ou custo obtida. Números são o diferencial.' },
    ],
  },
  // ── 25. Saúde / Medicina / Enfermagem ────────────────────────────────────
  {
    keywords: ['saúde', 'medicina', 'enfermagem', 'farmácia', 'fisioterapia', 'hospitalar', 'sus', 'ans', 'prontuário', 'coren', 'crm médico', 'clínica', 'uti'],
    area: 'Saúde',
    atividades: [
      { tipo: 'certificacao', titulo: 'Título de Especialista (CFM/COFEN — área específica)', descricao: 'Especialização reconhecida pelo conselho profissional. Obrigatória para exercer especialidade.', tempo: 'Variável', url: 'https://www.cfm.org.br', headhunterDica: 'Título de especialista é o principal diferencial em contratações na saúde.' },
      { tipo: 'curso', titulo: 'Gestão em Saúde (FGV / Sírio-Libanês)', descricao: 'Formação em gestão hospitalar e de serviços de saúde. Abre portas para cargos de liderança clínica.', tempo: '40h', url: 'https://www.hospitalsiriolibanes.org.br/instituto-de-ensino-e-pesquisa', headhunterDica: 'Cursos do Sírio-Libanês são altamente valorizados em saúde de excelência.' },
      { tipo: 'pratica', titulo: 'Liderança de projeto de melhoria de qualidade (PDCA/Lean)', descricao: 'Conduza um ciclo PDCA em um processo clínico ou administrativo. Documente redução de erro ou tempo.', tempo: '2h/semana por 2 meses', headhunterDica: 'Projetos de qualidade com resultados mensuráveis são diferencial em cargos de gestão em saúde.' },
    ],
  },
  // ── 26. Educação / EAD / Instructional Design ─────────────────────────────
  {
    keywords: ['educação', 'docência', 'pedagogia', 'ead', 'instructional design', 'lms', 'moodle', 'canvas', 'aprendizagem', 'treinamento corporativo', 'e-learning'],
    area: 'Educação',
    atividades: [
      { tipo: 'certificacao', titulo: 'Instructional Design Foundations (ATD)', descricao: 'Certificação da Association for Talent Development, referência mundial em design instrucional corporativo.', tempo: '20h', url: 'https://www.td.org/certification', headhunterDica: 'ATD é padrão internacional em T&D corporativo. Abre portas em multinacionais.' },
      { tipo: 'portfolio', titulo: 'Curso EAD completo publicado (Hotmart/Udemy)', descricao: 'Crie e publique um minicurso com ao menos 5 aulas. Demonstra capacidade de curadoria e didática.', tempo: '20h', headhunterDica: 'Número de alunos e avaliações são evidência pública de qualidade. Link no LinkedIn.' },
      { tipo: 'pratica', titulo: 'Aplicação da Taxonomia de Bloom em um treinamento', descricao: 'Redesenhe um treinamento existente aplicando os níveis da Taxonomia de Bloom. Meça antes e depois.', tempo: '4h', headhunterDica: 'Mencione o impacto na retenção de conhecimento ou performance pós-treinamento.' },
    ],
  },
  // ── 27. Direito / Advocacia ───────────────────────────────────────────────
  {
    keywords: ['direito', 'advocacia', 'jurídico', 'contratos', 'trabalhista', 'tributário', 'penal', 'civil', 'oab', 'petição', 'processo judicial', 'compliance jurídico'],
    area: 'Direito',
    atividades: [
      { tipo: 'certificacao', titulo: 'OAB — Exame da Ordem dos Advogados do Brasil', descricao: 'Habilitação obrigatória para advogar. Base da carreira jurídica.', tempo: '200h', url: 'https://www.oab.org.br', headhunterDica: 'OAB ativo é requisito em vagas de advogado. Mencione especialidade e subseção.' },
      { tipo: 'curso', titulo: 'Especialização em Direito Empresarial / Trabalhista / Tributário', descricao: 'Pós-graduação lato sensu é o caminho padrão para especialização jurídica. Escolha a área de maior demanda.', tempo: '360h', headhunterDica: 'Área de especialização define o mercado de atuação. Tributário e trabalhista têm maior demanda.' },
      { tipo: 'pratica', titulo: 'Redija e publique artigos jurídicos no Jusbrasil/JOTA', descricao: 'Publique 2 artigos por mês sobre temas da sua área no Jusbrasil ou JOTA. Constrói autoridade pública.', tempo: '3h/artigo', url: 'https://www.jusbrasil.com.br', headhunterDica: 'Artigos publicados mostram pensamento crítico jurídico. Link no LinkedIn.' },
    ],
  },
  // ── 28. Engenharia Civil / BIM / AutoCAD ──────────────────────────────────
  {
    keywords: ['engenharia civil', 'bim', 'revit', 'autocad', 'estrutural', 'obra', 'canteiro', 'projetos', 'arquitetura', 'construção', 'msp', 'ms project', 'cronograma de obra'],
    area: 'Engenharia',
    atividades: [
      { tipo: 'certificacao', titulo: 'Autodesk Certified Professional: Revit (ACP)', descricao: 'Certificação oficial Autodesk para Revit, padrão BIM do mercado de construção civil.', tempo: '20h', url: 'https://www.autodesk.com/certification', headhunterDica: 'ACP Revit é diferencial em escritórios e construtoras que adotaram BIM.' },
      { tipo: 'curso', titulo: 'BIM Avançado — Coordenação de Projetos (SENAI/Alura)', descricao: 'Domínio do fluxo BIM completo: modelagem, clash detection, extração de quantitativos.', tempo: '20h', headhunterDica: 'BIM Level 2 e 3 são requisitos crescentes em grandes obras e concursos públicos.' },
      { tipo: 'portfolio', titulo: 'Projeto completo modelado em BIM (GitHub/Dropbox)', descricao: 'Modele um projeto residencial ou comercial completo com compatibilização de disciplinas.', tempo: '15h', headhunterDica: 'Portfólio BIM disponível online é diferencial em entrevistas de engenharia/arquitetura.' },
    ],
  },
  // ── 29. ESG / Sustentabilidade ────────────────────────────────────────────
  {
    keywords: ['esg', 'sustentabilidade', 'impacto social', 'gri', 'carbono', 'iso 14001', 'ghg protocol', 'relatório de sustentabilidade', 'economia circular', 'b corp'],
    area: 'ESG',
    atividades: [
      { tipo: 'certificacao', titulo: 'GRI Certified Sustainability Professional', descricao: 'Certificação do Global Reporting Initiative, padrão global de relatórios de sustentabilidade.', tempo: '20h', url: 'https://www.globalreporting.org', headhunterDica: 'GRI é o padrão exigido por investidores ESG. Diferencial crescente no Brasil.' },
      { tipo: 'curso', titulo: 'Sustainability and Development Goals (SDG Impact)', descricao: 'Entenda os ODS da ONU e como conectar estratégia empresarial às metas globais.', tempo: '10h', url: 'https://www.coursera.org/learn/sustainability', headhunterDica: 'Conhecimento de ODS e ESG é requisito em empresas com governança ESG madura.' },
      { tipo: 'portfolio', titulo: 'Relatório de Impacto (GRI Standards) de uma operação', descricao: 'Elabore um mini-relatório ESG seguindo os padrões GRI para uma área ou empresa.', tempo: '8h', headhunterDica: 'Relatório ESG publicado demonstra domínio prático. Compartilhe no LinkedIn.' },
    ],
  },
  // ── 30. Comunicação Corporativa / Relações Públicas ───────────────────────
  {
    keywords: ['assessoria de imprensa', 'relações públicas', 'comunicação corporativa', 'crise de imagem', 'media training', 'press release', 'comunicação institucional', 'rp'],
    area: 'Comunicação',
    atividades: [
      { tipo: 'certificacao', titulo: 'Registro Profissional de RP (CONFERP)', descricao: 'Habilitação profissional para Relações Públicas no Brasil. Obrigatória para uso do título.', tempo: '4 anos (graduação)', url: 'https://www.conferp.org.br', headhunterDica: 'Registro ativo é requisito em grandes empresas para a função de RP.' },
      { tipo: 'pratica', titulo: 'Media Training (treino com microfone e câmera)', descricao: 'Grave a si mesmo respondendo perguntas difíceis. Analise linguagem corporal, pausas e clareza da mensagem.', tempo: '2h/semana', headhunterDica: 'Habilidade de porta-voz é diferencial para cargos de comunicação sênior.' },
      { tipo: 'portfolio', titulo: 'Plano de Comunicação de Crise documentado', descricao: 'Elabore um manual de gestão de crise de comunicação para um setor específico. Entregável prático e valorizado.', tempo: '6h', headhunterDica: 'Portfólio de planos estratégicos demonstra senioridade em comunicação.' },
    ],
  },
  // ── 31. E-commerce / Varejo Digital ──────────────────────────────────────
  {
    keywords: ['e-commerce', 'vtex', 'shopify', 'woocommerce', 'marketplace', 'varejo', 'omnichannel', 'loja virtual', 'pagamento online', 'conversão', 'cart abandonment'],
    area: 'Varejo / E-commerce',
    atividades: [
      { tipo: 'certificacao', titulo: 'VTEX Commerce Architect Certification', descricao: 'Certificação da plataforma líder de e-commerce no Brasil. Alta demanda no mercado nacional.', tempo: '15h', url: 'https://community.vtex.com/s/certification', headhunterDica: 'VTEX domina o e-commerce enterprise no Brasil. Certificação é diferencial.' },
      { tipo: 'pratica', titulo: 'Otimize a taxa de conversão (CRO) de uma loja', descricao: 'Analise funil de compra com Google Analytics 4, identifique gargalos e implemente A/B tests.', tempo: '4h/semana', headhunterDica: 'Documente o aumento de conversão obtido em %. Números vendem em e-commerce.' },
      { tipo: 'curso', titulo: 'E-commerce Management (Fundação Getúlio Vargas)', descricao: 'Formação completa em gestão de operações de e-commerce: logística, marketing, tecnologia e finanças.', tempo: '40h', url: 'https://educacao-executiva.fgv.br', headhunterDica: 'FGV tem reconhecimento no Brasil. Adicione ao LinkedIn com descrição de projeto aplicado.' },
    ],
  },
  // ── 32. Agronegócio ───────────────────────────────────────────────────────
  {
    keywords: ['agro', 'agronegócio', 'agricultura', 'pecuária', 'commodities', 'fitossanidade', 'irrigação', 'cana', 'soja', 'milho', 'crea agro', 'engenharia agrícola', 'zootecnia'],
    area: 'Agronegócio',
    atividades: [
      { tipo: 'certificacao', titulo: 'CREA — Conselho Regional de Engenharia e Agronomia', descricao: 'Habilitação profissional para engenheiros agrônomos, florestais e áreas afins. Base da carreira.', tempo: '5 anos (graduação)', url: 'https://www.crea.org.br', headhunterDica: 'CREA ativo é requisito em vagas de campo e gestão agro.' },
      { tipo: 'curso', titulo: 'Agritech e Inovação no Agronegócio (ESALQ/USP)', descricao: 'Como tecnologia (drones, IoT, IA) está transformando o campo. Alta demanda por profissionais digitais no agro.', tempo: '20h', headhunterDica: 'Agritech é o segmento que mais cresce. Conhecimento digital diferencia profissionais do agro.' },
      { tipo: 'pratica', titulo: 'Analise a viabilidade econômica de uma cultura', descricao: 'Calcule custo de produção, ponto de equilíbrio e margem para uma safra específica. Exercício fundamental no agro.', tempo: '4h', headhunterDica: 'Capacidade analítica financeira no agro é diferencial para cargos de gestão rural.' },
    ],
  },
  // ── 33. QA / Testes Automatizados ────────────────────────────────────────
  {
    keywords: ['qualidade', 'qa', 'teste', 'testing', 'automação de testes', 'selenium', 'cypress', 'playwright', 'postman', 'api testing', 'jmeter', 'k6', 'appium'],
    area: 'Qualidade',
    atividades: [
      { tipo: 'certificacao', titulo: 'ISTQB® Certified Tester Foundation Level (CTFL)', descricao: 'Certificação de qualidade de software mais reconhecida no mundo, com 1 milhão de certificados emitidos.', tempo: '20h', url: 'https://www.istqb.org', headhunterDica: 'ISTQB é requisito em muitas vagas de QA enterprise. Badge verificável.' },
      { tipo: 'curso', titulo: 'Test Automation University (Applitools — gratuito)', descricao: 'Cursos gratuitos de automação com Selenium, Cypress, Playwright e Appium.', tempo: '10h', url: 'https://testautomationu.applitools.com', headhunterDica: 'Cursos e badges da Test Automation University são reconhecidos no mercado.' },
      { tipo: 'portfolio', titulo: 'Suite de testes automatizados em projeto real (GitHub)', descricao: 'Adicione cobertura de testes (unitários + integração + E2E) a um projeto open source ou pessoal.', tempo: '3h/semana', headhunterDica: 'Repositório com alta cobertura de testes demonstra maturidade de engenharia.' },
    ],
  },
  // ── 34. Compras / Procurement ─────────────────────────────────────────────
  {
    keywords: ['compras', 'procurement', 'sourcing', 'cotação', 'rfp', 'rfq', 'contratos de fornecimento', 'negociação com fornecedores', 'supply', 'strategic sourcing'],
    area: 'Compras',
    atividades: [
      { tipo: 'certificacao', titulo: 'CPSM — Certified Professional in Supply Management (ISM)', descricao: 'Certificação mais reconhecida em procurement e gestão de fornecedores a nível global.', tempo: '60h', url: 'https://www.ismworld.org/certification-and-training/certification/cpsm/', headhunterDica: 'CPSM é padrão em multinacionais. Reconhecida em mais de 90 países.' },
      { tipo: 'pratica', titulo: 'Conduza uma RFQ completa com análise de TCO', descricao: 'Execute um processo de cotação, analise Total Cost of Ownership além do preço e documente a economia obtida.', tempo: '4h', headhunterDica: 'Documente o % de saving obtido. Esse número é o principal KPI de recrutadores de compras.' },
      { tipo: 'leitura', titulo: 'Livro: Strategic Procurement — Caroline Booth', descricao: 'Da gestão operacional ao procurement estratégico. Visão de como compras cria vantagem competitiva.', tempo: '5h', headhunterDica: 'Pensamento estratégico em compras diferencia candidatos para vagas sênior.' },
    ],
  },
  // ── 35. Administração / Processos / BPM ───────────────────────────────────
  {
    keywords: ['administração', 'processos', 'bpm', 'melhoria contínua', 'lean', 'six sigma', 'qualidade total', 'iso 9001', 'indicadores', 'kpi', 'dashboard operacional'],
    area: 'Administração',
    atividades: [
      { tipo: 'certificacao', titulo: 'Lean Six Sigma Green Belt (ASQ / SBTI)', descricao: 'Certificação de melhoria de processos amplamente reconhecida em indústria, saúde, serviços e governo.', tempo: '40h', url: 'https://asq.org/cert/six-sigma-green-belt', headhunterDica: 'LSSGB é diferencial em vagas de melhoria contínua e excelência operacional.' },
      { tipo: 'curso', titulo: 'BPM — Gestão de Processos (ABPMP Brasil)', descricao: 'Fundamentos de modelagem e gestão de processos. Ferramenta BPMN 2.0 é o padrão do mercado.', tempo: '20h', url: 'https://www.abpmp-br.org', headhunterDica: 'Conhecimento de BPMN é requisito em vagas de analista de processos.' },
      { tipo: 'pratica', titulo: 'Mapeie e melhore 1 processo crítico (BPMN + métricas)', descricao: 'Selecione um processo, mapeie AS-IS, identifique desperdícios, proponha TO-BE e meça resultado em 30 dias.', tempo: '4h', headhunterDica: 'Documente a redução de tempo ou custo obtida. Resultado mensurável é o que recrutadores buscam.' },
    ],
  },
];

// ── Soft Skills ───────────────────────────────────────────────────────────────
export const SOFT_ATIVIDADES: Record<string, Atividade[]> = {
  // ── Já existentes (expandidas com headhunterDica) ─────────────────────────
  'Inteligência Emocional': [
    { tipo: 'leitura', titulo: 'Livro: Inteligência Emocional — Daniel Goleman', descricao: 'Fundamento teórico sobre reconhecer e gerir emoções no ambiente de trabalho.', tempo: '3h', headhunterDica: 'Aplique e mencione na experiência como IE impactou liderança ou resolução de conflitos.' },
    { tipo: 'pratica', titulo: 'Diário de Emoções (30 dias)', descricao: 'Antes de dormir, escreva 3 emoções que sentiu e o que as causou. Simples e transformador.', tempo: '5 min/dia' },
    { tipo: 'mentoria', titulo: 'Conversa com alguém que você admira emocionalmente', descricao: 'Agende um café e pergunte como essa pessoa lida com situações difíceis no trabalho.', tempo: '1h', headhunterDica: 'Peça um endorsement no LinkedIn destacando sua inteligência emocional.' },
  ],
  'Comunicação': [
    { tipo: 'leitura', titulo: 'Livro: Comunicação Não-Violenta — Marshall Rosenberg', descricao: 'Aprenda a fazer pedidos e dar feedback sem agressividade ou passividade.', tempo: '4h' },
    { tipo: 'pratica', titulo: 'Modelo FINI em comunicações', descricao: 'Fato → Impacto → Necessidade → Intenção. Aplique em e-mails ou conversas difíceis.', tempo: '15 min/semana' },
    { tipo: 'curso', titulo: 'Comunicação Assertiva (LinkedIn Learning)', descricao: 'Exercícios práticos de clareza, concisão e escuta ativa.', tempo: '6h', url: 'https://www.linkedin.com/learning/topics/communication', headhunterDica: 'Compartilhe no LinkedIn o certificado e como aplicou na prática.' },
    { tipo: 'portfolio', titulo: 'Palestra ou apresentação gravada (YouTube/LinkedIn)', descricao: 'Apresente um tema da sua área em 5-10 minutos. Grave e publique. Demonstra comunicação pública.', tempo: '3h', headhunterDica: 'Vídeo público é evidência poderosa de comunicação. Link no perfil LinkedIn.' },
  ],
  'Trabalho em Equipe': [
    { tipo: 'pratica', titulo: '1:1 informal com colega diferente a cada 2 semanas', descricao: 'Agende 15 minutos só para ouvir — sem agenda, sem julgamento, só conexão.', tempo: '15 min/quinzenal' },
    { tipo: 'projeto', titulo: 'Voluntarie-se para projeto multidisciplinar', descricao: 'Escolha um projeto fora da sua área de conforto que envolva outros times.', tempo: '2h/semana' },
    { tipo: 'leitura', titulo: 'Livro: Os 5 Desafios das Equipes — Patrick Lencioni', descricao: 'Padrões que destroem e os que constroem equipes de alta performance.', tempo: '3h', headhunterDica: 'Mencione na experiência o resultado de uma iniciativa de equipe que você liderou.' },
  ],
  'Proatividade': [
    { tipo: 'pratica', titulo: 'Regra dos 2 Minutos (GTD)', descricao: 'Se leva menos de 2 min, faça agora. Para o resto, reserve 1h/semana para agir em coisas importantes.', tempo: 'Diário' },
    { tipo: 'curso', titulo: 'Getting Things Done (Udemy)', descricao: 'Sistema completo de organização pessoal para ser mais proativo e focado.', tempo: '4h', url: 'https://www.udemy.com/topic/productivity/' },
    { tipo: 'projeto', titulo: 'Resolva 1 problema da equipe por mês sem ser solicitado', descricao: 'Mapeie um gargalo visível e proponha solução concreta. Documente o resultado.', tempo: '2h/mês', headhunterDica: 'Descreva esse comportamento com exemplos concretos na entrevista (método STAR).' },
  ],
  'Visão Sistêmica': [
    { tipo: 'pratica', titulo: 'Leia os OKRs da empresa e do gestor', descricao: 'Entenda como o seu trabalho conecta aos objetivos estratégicos do negócio.', tempo: '1h' },
    { tipo: 'leitura', titulo: 'Livro: A Quinta Disciplina — Peter Senge', descricao: 'Pensamento sistêmico aplicado às organizações de alta performance.', tempo: '5h', headhunterDica: 'Demonstre visão sistêmica em entrevistas conectando seu trabalho ao resultado do negócio.' },
    { tipo: 'mentoria', titulo: 'Shadow de um executivo por um dia', descricao: 'Peça para acompanhar alguém de nível acima por um dia para entender a visão macro.', tempo: '8h' },
  ],
  'Capacidade de aprender': [
    { tipo: 'pratica', titulo: 'Técnica Feynman — Explique o que aprendeu', descricao: 'Após estudar algo, explique como se fosse para uma criança de 12 anos. Onde travar = lacuna real.', tempo: '20 min/semana' },
    { tipo: 'curso', titulo: 'Aprendendo a Aprender (Coursera — Barbara Oakley)', descricao: 'Técnicas científicas de memorização e aprendizagem eficaz.', tempo: '8h', url: 'https://www.coursera.org/learn/learning-how-to-learn', headhunterDica: 'Mencione como seu processo de aprendizagem acelerada gerou resultado no trabalho.' },
    { tipo: 'pratica', titulo: 'Estude 1 assunto novo por mês (30 min/dia)', descricao: 'Escolha um tema relevante e gaste 30 min/dia por 4 semanas.', tempo: '30 min/dia' },
  ],
  'Capacidade de mudar (Adaptabilidade)': [
    { tipo: 'leitura', titulo: 'Livro: Mindset — Carol Dweck', descricao: 'A diferença entre mentalidade fixa e de crescimento com exemplos práticos.', tempo: '3h', headhunterDica: 'Traga exemplos de adaptação a mudanças usando o método STAR na entrevista.' },
    { tipo: 'pratica', titulo: 'Experimento de 30 dias: mude 1 rotina por dia', descricao: 'Pequenas mudanças de rotina fortalecem o músculo da adaptabilidade.', tempo: '5 min/dia' },
  ],
  'Capacidade de lidar com ambiguidade': [
    { tipo: 'pratica', titulo: 'Técnica da Única Métrica', descricao: 'Quando tudo for incerto, defina qual ÚNICA métrica importa agora e proteja ela de distrações.', tempo: '30 min/decisão' },
    { tipo: 'leitura', titulo: 'Livro: Thinking in Bets — Annie Duke', descricao: 'Como tomar boas decisões com informações incompletas.', tempo: '4h', headhunterDica: 'Demonstre em entrevistas exemplos de decisões tomadas bem sob incerteza.' },
    { tipo: 'pratica', titulo: 'Pré-mortem em projetos importantes', descricao: 'Antes de executar, imagine que o projeto falhou: o que causou? Mitigue os riscos.', tempo: '1h/projeto' },
  ],
  'Capacidade de estabelecer network': [
    { tipo: 'pratica', titulo: 'Reconecte 2 contatos por mês', descricao: 'Envie mensagem genuína: compartilhe artigo, parabenize por conquista. Networking é consistência.', tempo: '20 min/mês' },
    { tipo: 'pratica', titulo: 'Participe de 1 evento da área por trimestre', descricao: 'Meetups, webinars ou conferências. Objetivo: conversar com ao menos 3 pessoas novas.', tempo: '4h/trimestre', url: 'https://www.meetup.com' },
    { tipo: 'portfolio', titulo: 'Personal Branding: publique 2× por mês no LinkedIn', descricao: '90 dias de consistência mudam visibilidade. Posts sobre aprendizados e projetos geram conexões qualificadas.', tempo: '1h/post', headhunterDica: 'Perfil LinkedIn com publicações regulares aparece mais nas buscas de headhunters.' },
  ],

  // ── Novas soft skills ─────────────────────────────────────────────────────
  'Liderança': [
    { tipo: 'leitura', titulo: 'Livro: O Gerente Minuto — Blanchard & Johnson', descricao: 'Técnicas práticas de liderança situacional aplicáveis imediatamente no dia a dia.', tempo: '2h', headhunterDica: 'Descreva com métricas (retenção do time, NPS interno, entregas) o impacto da sua liderança.' },
    { tipo: 'pratica', titulo: '1:1 semanal estruturado com cada liderado', descricao: 'Agenda fixa: 10 min sobre o liderado, 10 min sobre projetos, 10 min sobre desenvolvimento. Documenta crescimento.', tempo: '30 min/pessoa/semana', headhunterDica: 'Mencione taxa de retenção do time e promoções geradas pela sua liderança.' },
    { tipo: 'curso', titulo: 'Leading Teams (Coursera — University of Michigan)', descricao: 'Como montar, motivar e liderar equipes de alta performance com base em pesquisa científica.', tempo: '8h', url: 'https://www.coursera.org/learn/leading-teams', headhunterDica: 'Adicione o certificado ao LinkedIn com um exemplo de aplicação real.' },
    { tipo: 'mentoria', titulo: 'Coaching individual com um liderado por ciclo', descricao: 'Dedique 1 ciclo de 3 meses para o desenvolvimento focado de um liderado. Documente o progresso.', tempo: '1h/semana', headhunterDica: 'Número de liderados promovidos ou desenvolvidos é o KPI mais poderoso de liderança.' },
  ],
  'Negociação': [
    { tipo: 'leitura', titulo: 'Livro: Como Chegar ao Sim — Fisher & Ury (Harvard)', descricao: 'O método de negociação baseada em princípios, usado em Harvard Negotiation Project. Clássico absoluto.', tempo: '4h', headhunterDica: 'Relate em entrevistas uma negociação complexa com resultado mensurável (% de desconto, contrato fechado).' },
    { tipo: 'pratica', titulo: 'Role-play de negociação (pelo menos 2× por mês)', descricao: 'Simule negociações difíceis com colegas: fornecedor, cliente exigente, salário. Grave e analise.', tempo: '1h/quinzenal', headhunterDica: 'Capacidade de negociação demonstrada em números (savings, deals fechados) é o que headhunters buscam.' },
    { tipo: 'curso', titulo: 'Successful Negotiation (Coursera — U. Michigan)', descricao: 'Fundamentos científicos de negociação: planejamento, BATNA, táticas, ética.', tempo: '8h', url: 'https://www.coursera.org/learn/negotiation-skills', headhunterDica: 'Adicione certificado ao LinkedIn e mencione resultado de negociação real que conduziu.' },
  ],
  'Tomada de Decisão': [
    { tipo: 'leitura', titulo: 'Livro: Rápido e Devagar — Daniel Kahneman', descricao: 'Como o cérebro toma decisões (sistemas 1 e 2). Essencial para decisões melhores sob pressão e vieses.', tempo: '6h', headhunterDica: 'Mencione como identificou e corrigiu um viés cognitivo em uma decisão de negócio.' },
    { tipo: 'pratica', titulo: 'Registre decisões em um Decision Log', descricao: 'Para cada decisão relevante: escreva contexto, alternativas, critérios e resultado esperado. Revise em 30 dias.', tempo: '15 min/decisão', headhunterDica: 'Demonstra pensamento estruturado. Pode ser compartilhado em processos seletivos.' },
    { tipo: 'pratica', titulo: 'Use a Matriz de Eisenhower semanalmente', descricao: 'Classifique todas as tarefas em Urgente/Importante × 2 e proteja o quadrante II (Importante, não urgente).', tempo: '15 min/semana', headhunterDica: 'Relate como a gestão de prioridades aumentou entregas de alto impacto.' },
  ],
  'Pensamento Crítico': [
    { tipo: 'leitura', titulo: 'Livro: O Andar do Bêbado — Leonard Mlodinow', descricao: 'Como a aleatoriedade e os vieses distorcem nossa percepção dos fatos. Afia o pensamento crítico.', tempo: '4h', headhunterDica: 'Relate em entrevistas como questionou premissas e evitou uma decisão ruim.' },
    { tipo: 'pratica', titulo: 'Steelmanning: defenda o argumento oposto', descricao: 'Para cada decisão importante, construa o melhor argumento contra sua própria posição. Elimina pontos cegos.', tempo: '20 min/decisão', headhunterDica: 'Demonstra maturidade intelectual valorizada em cargos de liderança e estratégia.' },
    { tipo: 'curso', titulo: 'Critical Thinking & Problem Solving (edX — Rochester)', descricao: 'Ferramentas formais de análise crítica aplicadas a problemas complexos de negócio.', tempo: '6h', url: 'https://www.edx.org/learn/critical-thinking', headhunterDica: 'Adicione o certificado ao LinkedIn com exemplo de aplicação real.' },
  ],
  'Resiliência': [
    { tipo: 'leitura', titulo: 'Livro: Grit — Angela Duckworth', descricao: 'A ciência por trás da perseverança. Como desenvolver resistência mental para atingir objetivos de longo prazo.', tempo: '4h', headhunterDica: 'Relate na entrevista um obstáculo significativo superado e o resultado obtido.' },
    { tipo: 'pratica', titulo: 'Protocolo de Reframe Cognitivo (90 segundos)', descricao: 'Quando algo der errado: 90 seg para sentir a emoção → nomear o que aconteceu → escolher a resposta.', tempo: 'Diário' },
    { tipo: 'mentoria', titulo: 'Converse com alguém que superou uma grande adversidade', descricao: 'Entenda como ela processou o fracasso e o transformou em aprendizado. Extraia 3 táticas concretas.', tempo: '1h', headhunterDica: 'Resiliência demonstrada com exemplos específicos é competência valorizada em liderança.' },
  ],
  'Empatia': [
    { tipo: 'leitura', titulo: 'Livro: O Dom da Imperfeição — Brené Brown', descricao: 'Como vulnerabilidade e empatia são forças, não fraquezas. Muda a percepção sobre conexão humana.', tempo: '3h', headhunterDica: 'Empatia documentada em feedbacks 360 é diferencial para cargos de liderança e CS.' },
    { tipo: 'pratica', titulo: 'Mapeie a Jornada do Usuário / Colaborador / Cliente', descricao: 'Para qualquer projeto, dedique 1h para se colocar no lugar de quem será impactado. Use um empathy map.', tempo: '1h/projeto', headhunterDica: 'Relate como empatia com o usuário/cliente levou a uma solução melhor.' },
    { tipo: 'pratica', titulo: 'Escuta Ativa: 70/30 rule (ouça 70% do tempo)', descricao: 'Em reuniões, practice falar apenas 30% do tempo. Faça perguntas abertas. Tome notas para mostrar que ouviu.', tempo: 'Contínuo' },
  ],
  'Criatividade e Inovação': [
    { tipo: 'curso', titulo: 'Design Thinking (IDEO/Coursera ou Alura)', descricao: 'Processo estruturado de inovação: Empatizar → Definir → Idear → Prototipar → Testar.', tempo: '10h', url: 'https://www.coursera.org/learn/design-thinking-innovation', headhunterDica: 'Relate um projeto onde Design Thinking gerou solução inovadora com resultado mensurável.' },
    { tipo: 'pratica', titulo: 'Sessão semanal de "How Might We?" (HMW)', descricao: 'Para qualquer problema, gere ao menos 10 perguntas HMW antes de buscar soluções. Expande espaço de solução.', tempo: '30 min/semana', headhunterDica: 'Documente uma inovação que você propôs e implantou. Impacto gerado é o que conta.' },
    { tipo: 'projeto', titulo: 'Participe de um Hackathon (interno ou externo)', descricao: 'Hackathons forçam criatividade sob restrição de tempo. Ambiente ideal para praticar inovação rápida.', tempo: '24-48h', url: 'https://www.hackathon.com', headhunterDica: 'Menção de hackathon + resultado (premiação, produto lançado) tem alto impacto em entrevistas de inovação.' },
  ],
  'Gestão de Conflitos': [
    { tipo: 'leitura', titulo: 'Livro: Conversas Difíceis — Stone, Patton & Heen (Harvard)', descricao: 'Como abordar conversas que evitamos mas que são necessárias. Técnica baseada em décadas de pesquisa.', tempo: '5h', headhunterDica: 'Relate uma situação de conflito que você mediou com sucesso. Use o método STAR.' },
    { tipo: 'pratica', titulo: 'Protocolo de Mediação de Conflito (3 passos)', descricao: '1) Ouça as duas partes separadamente. 2) Identifique o interesse por trás da posição. 3) Proponha solução que atenda os interesses.', tempo: '1h/conflito', headhunterDica: 'Líderes que resolvem conflitos bem são raros. Demonstre com exemplos específicos.' },
    { tipo: 'curso', titulo: 'Managing Conflicts on Teams (LinkedIn Learning)', descricao: 'Ferramentas práticas para identificar e resolver conflitos interpessoais em times de trabalho.', tempo: '4h', url: 'https://www.linkedin.com/learning/topics/conflict-resolution', headhunterDica: 'Adicione o certificado ao LinkedIn com descrição de aplicação real.' },
  ],
  'Pensamento Analítico': [
    { tipo: 'pratica', titulo: 'Framework MECE para estruturar problemas', descricao: 'Mutually Exclusive, Collectively Exhaustive. Usado por consultores McKinsey/BCG para estruturar qualquer problema.', tempo: '1h/problema importante', headhunterDica: 'Demonstre pensamento MECE ao estruturar problemas em entrevistas de caso.' },
    { tipo: 'leitura', titulo: 'Livro: O Raciocínio Mágico — Karl Albrecht', descricao: 'Como estruturar o pensamento analítico e evitar falácias lógicas no ambiente profissional.', tempo: '4h' },
    { tipo: 'pratica', titulo: 'Resolva 1 estudo de caso por semana (MBA-style)', descricao: 'Sites como Case in Point ou MIT Sloan disponibilizam casos gratuitos. Resolva com estrutura MECE + dados.', tempo: '1h/semana', url: 'https://mitsloan.mit.edu/ideas-made-to-matter', headhunterDica: 'Pensamento analítico demonstrado em casos é o padrão de entrevistas em consultoria e estratégia.' },
  ],
  'Influência sem Autoridade': [
    { tipo: 'leitura', titulo: 'Livro: Influência — Robert Cialdini', descricao: 'Os 7 princípios de influência psicológica. Essencial para quem precisa convencer sem ter poder hierárquico.', tempo: '5h', headhunterDica: 'Relate como influenciou uma decisão organizacional sem ter autoridade formal. Use método STAR.' },
    { tipo: 'pratica', titulo: 'Mapeie stakeholders e construa alianças estratégicas', descricao: 'Para cada projeto: identifique quem decide, quem influencia e quem será impactado. Construa relacionamento antes de precisar.', tempo: '1h/projeto', headhunterDica: 'Capacidade de navegar politicamente sem perder integridade é diferencial em cargos sênior.' },
    { tipo: 'mentoria', titulo: 'Identifique 1 aliado estratégico por trimestre', descricao: 'Construa uma relação genuína com alguém de área diferente que possa amplificar seu trabalho.', tempo: '1h/mês', headhunterDica: 'Rede interna forte é mencionada em recomendações e demonstra inteligência política.' },
  ],
  'Mentoria': [
    { tipo: 'pratica', titulo: 'Torne-se mentor de 1 pessoa por ciclo (3 meses)', descricao: 'Dedique 1h quinzenal para mentorar alguém mais júnior. Quem ensina aprende o dobro.', tempo: '1h/quinzenal', headhunterDica: 'Mencionar mentorias ativas e o desenvolvimento gerado é forte sinal de liderança madura.' },
    { tipo: 'pratica', titulo: 'Plano de desenvolvimento para cada liderado', descricao: 'Para cada pessoa no seu time, crie um IDP (Individual Development Plan) com objetivos de 3 e 12 meses.', tempo: '1h/pessoa/trimestre', headhunterDica: 'IDPs documentados e resultados de desenvolvimento são evidências de gestão de excelência.' },
    { tipo: 'leitura', titulo: 'Livro: O Gerente Coach — James Flaherty', descricao: 'Como adaptar princípios de coaching para a gestão cotidiana. Transforma relação líder-liderado.', tempo: '4h', headhunterDica: 'Relate o impacto do coaching na performance ou retenção de um liderado específico.' },
  ],
  'Gestão do Tempo': [
    { tipo: 'pratica', titulo: 'Time Blocking: bloqueie tempo no calendário para foco', descricao: 'Reserve blocos de 90 min para trabalho profundo (Deep Work). Sem reuniões, sem notificações.', tempo: 'Diário', headhunterDica: 'Produtividade alta com qualidade de vida é diferencial em cargos de alta demanda.' },
    { tipo: 'leitura', titulo: 'Livro: Deep Work — Cal Newport', descricao: 'Como o trabalho focado e sem distração produz resultado 10× melhor. Anti-fragmentação da atenção.', tempo: '4h', headhunterDica: 'Relate como disciplina de foco melhorou qualidade e velocidade de entregas.' },
    { tipo: 'pratica', titulo: 'Revisão semanal (GTD Weekly Review)', descricao: 'Todo domingo: processe inbox, revise projetos, defina as 3 prioridades da semana. 45 min que mudam tudo.', tempo: '45 min/semana' },
  ],
  'Escuta Ativa': [
    { tipo: 'pratica', titulo: 'Técnica de paráfrase ativa em reuniões', descricao: 'Após alguém falar, resuma o que entendeu antes de responder: "Deixa eu confirmar que entendi..." Valida e evita ruído.', tempo: 'Contínuo', headhunterDica: 'Escuta ativa demonstrada gera feedbacks positivos 360. Solicite avaliações e compartilhe.' },
    { tipo: 'pratica', titulo: 'Celular virado na mesa ou fora da vista em reuniões', descricao: 'Elimine a distração principal. Pesquisas mostram que o celular visível reduz capacidade cognitiva mesmo sem tocar.', tempo: 'Imediato' },
    { tipo: 'leitura', titulo: 'Livro: The Lost Art of Listening — Michael Nichols', descricao: 'Por que escutamos mal e como praticar escuta genuína. Transforma relações profissionais e pessoais.', tempo: '4h', headhunterDica: 'Escuta ativa é a base da liderança empática. Relacione com exemplos de melhora em equipe.' },
  ],
  'Ética Profissional': [
    { tipo: 'leitura', titulo: 'Livro: A Coragem de ser Imperfeito — Brené Brown', descricao: 'Como integridade e vulnerabilidade constroem confiança genuína em ambientes profissionais.', tempo: '3h', headhunterDica: 'Ética e integridade são mencionadas em recomendações LinkedIn. Incentive quem conhece você a citar.' },
    { tipo: 'pratica', titulo: 'Checklist de ética antes de decisões de impacto', descricao: '3 perguntas: (1) É legal? (2) É justo? (3) Como ficaria se publicado amanhã? Simples e eficaz.', tempo: '5 min/decisão crítica' },
    { tipo: 'curso', titulo: 'Ética nos Negócios (FGV — gratuito)', descricao: 'Fundamentos de ética corporativa, conflito de interesses e compliance.', tempo: '8h', url: 'https://educacao-executiva.fgv.br', headhunterDica: 'Compliance e ética são requisitos em empresas de capital aberto e multinacionais.' },
  ],
  'Foco em Resultados': [
    { tipo: 'pratica', titulo: 'OKR pessoal trimestral com revisão semanal', descricao: 'Defina 1 objetivo e 3 key results para o trimestre. Revise progresso toda segunda-feira em 15 minutos.', tempo: '15 min/semana', headhunterDica: 'Profissional orientado a resultados com métricas claras é o perfil mais buscado por headhunters.' },
    { tipo: 'pratica', titulo: 'Metodologia 3-3-1: 3 prioridades diárias, 3 semanais, 1 mensal', descricao: 'Toda manhã: escreva 3 coisas que farão esse dia ser um sucesso. Semanalmente: 3 resultados. Mensalmente: 1 grande avanço.', tempo: '5 min/dia' },
    { tipo: 'leitura', titulo: 'Livro: A Única Coisa — Gary Keller', descricao: 'Identifique a ÚNICA coisa que, se feita, torna tudo mais fácil ou desnecessário. Anti-multitasking.', tempo: '3h', headhunterDica: 'Relate como foco em resultado principal acelerou entrega de um projeto importante.' },
  ],
  'Autonomia': [
    { tipo: 'pratica', titulo: 'Documentação de decisões e comunicação proativa', descricao: 'Para cada decisão tomada autonomamente, documente o contexto, as alternativas e o resultado. Compartilhe com o líder.', tempo: '15 min/decisão', headhunterDica: 'Autonomia documentada e bem comunicada acelera crescimento. Demonstre em entrevistas com exemplos.' },
    { tipo: 'pratica', titulo: 'Regra: tente resolver por 20 min antes de perguntar', descricao: 'Antes de escalar qualquer problema, tente resolvê-lo por 20 minutos. Traga sempre uma proposta de solução.', tempo: 'Contínuo', headhunterDica: 'Profissional que resolve antes de escalar é muito valorizado em times remotos e distribuídos.' },
    { tipo: 'leitura', titulo: 'Livro: Drive — Daniel Pink', descricao: 'A ciência da motivação intrínseca: autonomia, maestria e propósito. Como cultivar os três.', tempo: '4h', headhunterDica: 'Mencione projetos liderados com autonomia e o resultado gerado.' },
  ],
};
