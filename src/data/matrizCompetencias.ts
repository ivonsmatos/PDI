// Matriz de Competências por Área e Nível
// Hard Skills: 6 por nível | Soft Skills: 4 por nível
// Áreas: 23 trilhas de carreira

export const matrizDeCompetencias = {

  /* ─────────────────── TECNOLOGIA (DEV) ─────────────────── */
  tecnologia: {
    estagiario: {
      expectativa: "Foco total em aprendizado técnico e familiarização com o ambiente de desenvolvimento.",
      hardSkills: ["Lógica de Programação", "Git Básico", "HTML/CSS/JS Básico", "Noções de Banco de Dados", "Terminal/Linha de Comando", "Consumo de APIs REST"],
      softSkills: ["Curiosidade Intelectual", "Trabalho em Equipe", "Escuta Ativa", "Resiliência para Errar e Aprender"]
    },
    junior: {
      expectativa: "Entregas rotineiras e operacionais com necessidade de supervisão.",
      hardSkills: ["Frameworks Básicos (React/Node/Spring)", "APIs REST e integração", "Controle de Versão (Git Flow)", "SQL Intermediário", "Testes Unitários Básicos", "Documentação Técnica Básica"],
      softSkills: ["Organização", "Comunicação Clara", "Lidar com Feedback", "Gestão do Próprio Tempo"]
    },
    pleno: {
      expectativa: "Desenvolve features completas com autonomia média/alta e orienta os mais novos.",
      hardSkills: ["Arquitetura de Software Básica", "Testes Automatizados (Unit/Integration)", "Docker/Containers", "Otimização de Queries", "Observabilidade e Logs (Datadog/New Relic)", "Code Review e Boas Práticas"],
      softSkills: ["Resolução de Problemas", "Adaptabilidade", "Pensamento Crítico", "Comunicação Técnica com Não-Técnicos"]
    },
    senior: {
      expectativa: "Domínio técnico total, foco em problemas complexos e referência técnica da equipe.",
      hardSkills: ["Design de Sistemas Distribuídos", "Cloud (AWS/GCP/Azure)", "CI/CD Avançado", "Segurança no Desenvolvimento (OWASP)", "Incident Response e Postmortem", "Mentoria Técnica Estruturada"],
      softSkills: ["Visão Sistêmica", "Mentoria", "Tomada de Decisão sob Pressão", "Influência sem Autoridade Formal"]
    },
    especialista: {
      expectativa: "Profundo conhecimento em nicho específico, focado em inovação e pesquisa.",
      hardSkills: ["Arquitetura de Alta Disponibilidade", "Machine Learning Aplicado", "Performance Tuning Avançado", "Padrões Arquiteturais (Event-Driven, CQRS)", "Open Source Contribution", "Technical Due Diligence"],
      softSkills: ["Inovação", "Influência Técnica Ampla", "Pensamento Analítico Profundo", "Comunicação Executiva de Tecnologia"]
    },
    gestor: {
      expectativa: "Liderança estratégica de engenharia; pessoas e produto prevalecem sobre o código.",
      hardSkills: ["Gestão de Projetos Ágeis (Scrum/Kanban)", "Métricas de Engenharia (DORA/SPACE)", "Gestão de Orçamento e Headcount", "Estratégia de Produto e Roadmap Técnico", "Recrutamento e Seleção Técnica", "Gestão de Dívida Técnica"],
      softSkills: ["Liderança Servidora", "Gestão de Conflitos", "Visão de Negócio", "Desenvolvimento de Talentos"]
    }
  },

  /* ─────────────────── DEVOPS / INFRAESTRUTURA ─────────────────── */
  devops_infraestrutura: {
    estagiario: {
      expectativa: "Apoio em rotinas operacionais, monitoramento básico e aprendizado de ferramentas.",
      hardSkills: ["Linux/Terminal Básico", "Redes (TCP/IP, DNS, HTTP)", "Git Básico", "Noções de Virtualização (VMs)", "Scripting Bash Básico", "Fundamentos de Cloud (AWS/GCP Free Tier)"],
      softSkills: ["Curiosidade", "Atenção a Detalhes", "Trabalho em Equipe", "Comunicação Escrita"]
    },
    junior: {
      expectativa: "Execução de tarefas operacionais de infraestrutura e suporte a deploys.",
      hardSkills: ["Docker (containers básicos)", "CI/CD Básico (GitHub Actions/GitLab CI)", "Monitoramento Básico (Grafana/Zabbix)", "Gerenciamento de Servidores Linux", "Cloud IaaS (EC2, S3, VPCs básicas)", "Gestão de Acessos IAM"],
      softSkills: ["Organização", "Proatividade", "Resolução de Problemas", "Documentação Técnica"]
    },
    pleno: {
      expectativa: "Automatiza infraestrutura e garante disponibilidade dos ambientes.",
      hardSkills: ["Infrastructure as Code (Terraform/Pulumi)", "Kubernetes Intermediário", "Pipelines CI/CD Avançados", "Observabilidade (Prometheus, Grafana, Jaeger)", "Segurança em Pipelines (SAST/DAST)", "Gestão de Custos Cloud (FinOps Básico)"],
      softSkills: ["Pensamento Sistêmico", "Colaboração com Dev e QA", "Autonomia", "Gestão de Incidentes"]
    },
    senior: {
      expectativa: "Arquiteta soluções de infraestrutura escaláveis e lidera resposta a incidentes críticos.",
      hardSkills: ["Arquitetura Multi-cloud e Híbrida", "SRE (Site Reliability Engineering)", "Kubernetes Avançado (Operadores, Helm)", "Disaster Recovery e BCP", "FinOps Avançado", "Gestão de Mudanças (Change Management)"],
      softSkills: ["Liderança Técnica", "Comunicação de Risco para Stakeholders", "Mentoria", "Tomada de Decisão sob Pressão"]
    },
    especialista: {
      expectativa: "Referência em plataformas, define padrões de infraestrutura para toda a empresa.",
      hardSkills: ["Platform Engineering (Internal Developer Platform)", "GitOps e ArgoCD", "Segurança em Infraestrutura (Zero Trust)", "Service Mesh (Istio/Linkerd)", "FinOps e Otimização de Arquitetura", "Contribuição a Projetos Open Source de Infra"],
      softSkills: ["Inovação", "Influência Técnica Estratégica", "Visão de Produto de Plataforma", "Evangelização Técnica"]
    },
    gestor: {
      expectativa: "Dirige a estratégia de plataforma e confiabilidade; alinha infraestrutura aos objetivos de negócio.",
      hardSkills: ["Estratégia de Plataforma (Platform Strategy)", "Gestão de SLAs e SLOs Corporativos", "Orçamento de Infraestrutura", "Governança de Cloud", "Gestão de Equipes de SRE/DevOps", "Compliance e Auditoria de Infraestrutura"],
      softSkills: ["Liderança Estratégica", "Gestão de Orçamento", "Alinhamento C-Level", "Desenvolvimento de Equipes"]
    }
  },

  /* ─────────────────── SEGURANÇA DA INFORMAÇÃO ─────────────────── */
  seguranca_informacao: {
    estagiario: {
      expectativa: "Apoio em rotinas de segurança, monitoramento básico e gestão de acessos.",
      hardSkills: ["Fundamentos de Segurança (CIA Triad)", "Redes Básicas (TCP/IP, Firewall)", "Gestão de Senhas e MFA", "Noções de LGPD e GDPR", "Linux Básico para Segurança", "Fundamentos de Criptografia"],
      softSkills: ["Atenção a Detalhes", "Ética Profissional", "Curiosidade", "Comunicação Discreta"]
    },
    junior: {
      expectativa: "Suporte ao SOC, análise de logs e resposta a incidentes de baixa complexidade.",
      hardSkills: ["SIEM Básico (Splunk/QRadar)", "Análise de Logs e Eventos", "Gestão de Vulnerabilidades (Nessus)", "Políticas de Segurança (ISO 27001 Básico)", "Triage de Incidentes", "Segurança em Endpoints"],
      softSkills: ["Resolução de Problemas", "Organização", "Discrição", "Comunicação de Riscos"]
    },
    pleno: {
      expectativa: "Conduz análises de risco, implementa controles e responde a incidentes de média complexidade.",
      hardSkills: ["Pentest Básico (OWASP, Burp Suite)", "Threat Intelligence", "Gestão de Risco de Segurança", "Segurança em Nuvem (AWS Security, Azure Sentinel)", "SOAR (Security Orchestration)", "Compliance LGPD / ISO 27001"],
      softSkills: ["Pensamento Adversarial", "Colaboração com TI e Jurídico", "Comunicação Técnica", "Gestão de Crises Básica"]
    },
    senior: {
      expectativa: "Arquiteta estratégias de defesa, lidera red/blue team e orienta resposta a incidentes graves.",
      hardSkills: ["Red Team / Blue Team Avançado", "Forense Digital (DFIR)", "Arquitetura Zero Trust", "Gestão de Identidade (IAM/PAM Avançado)", "Cloud Security Architecture", "Incident Response & Postmortem"],
      softSkills: ["Liderança em Crise", "Visão Sistêmica de Risco", "Influência em C-Level", "Mentoria de Analistas"]
    },
    especialista: {
      expectativa: "Pesquisa de ameaças avançadas (APT), criação de ferramentas e influência no setor.",
      hardSkills: ["Malware Analysis e Reverse Engineering", "Bug Bounty e CVE Research", "Threat Hunting Avançado", "Security Architecture Review", "Criptografia Aplicada Avançada", "Publicação em Conferências (DEF CON/Black Hat)"],
      softSkills: ["Inovação em Segurança", "Pensamento Analítico Profundo", "Ética e Responsabilidade", "Influência na Comunidade de Segurança"]
    },
    gestor: {
      expectativa: "CISO ou gestor de segurança: alinha estratégia de segurança com objetivos corporativos e regulatórios.",
      hardSkills: ["Estratégia de Segurança Corporativa (ISMS)", "Gestão de Conformidade (LGPD, ISO 27001, SOC 2)", "Gestão de Budget de Segurança", "Comunicação de Risco ao Board", "Gestão de Fornecedores de Segurança", "Business Continuity Planning (BCP/DRP)"],
      softSkills: ["Liderança Executiva", "Negociação com C-Level e Board", "Gestão de Crises Graves", "Visão de Negócio e Risco Integrada"]
    }
  },

  /* ─────────────────── QUALIDADE / QA ─────────────────── */
  qualidade_qa: {
    estagiario: {
      expectativa: "Apoio na execução de casos de teste manuais e documentação de bugs.",
      hardSkills: ["Testes Manuais (Casos de Teste, Test Cases)", "Noções de SDLC", "Documentação de Bugs (Jira/Trello)", "HTML/CSS Básico para Inspecionar", "SQL Básico para Validação", "Noções de Metodologias Ágeis"],
      softSkills: ["Atenção a Detalhes", "Organização", "Comunicação Escrita", "Curiosidade"]
    },
    junior: {
      expectativa: "Executa testes funcionais, aprende automação básica e contribui em sprints.",
      hardSkills: ["Automação Web Básica (Selenium/Cypress)", "Testes de API (Postman)", "BDD Básico (Gherkin/Cucumber)", "Gestão de Defeitos", "Testes de Regressão", "Versionamento (Git)"],
      softSkills: ["Resolução de Problemas", "Colaboração com Devs", "Pensamento Crítico", "Gestão do Tempo"]
    },
    pleno: {
      expectativa: "Desenha estratégias de teste, automatiza suites completas e identifica riscos de qualidade.",
      hardSkills: ["Frameworks de Automação Avançados (Playwright/Robot)", "Testes de Performance (JMeter/K6)", "Testes de Segurança Básicos (OWASP)", "CI/CD integrado a testes", "Test Design Techniques (BVA, EP, Decision Table)", "Cobertura de Código e Métricas de Qualidade"],
      softSkills: ["Visão de Produto", "Comunicação de Risco de Qualidade", "Autonomia", "Colaboração Multidisciplinar"]
    },
    senior: {
      expectativa: "Define a estratégia de qualidade, lidera equipe de QA e integra qualidade ao processo de desenvolvimento.",
      hardSkills: ["Test Strategy e Test Planning Avançado", "Testes de Chaos Engineering", "Acessibilidade (WCAG 2.2)", "Testes de Usabilidade", "Quality Engineering (Shift-Left Testing)", "Análise de Causa Raiz de Defeitos"],
      softSkills: ["Liderança Técnica de Qualidade", "Influência Cultural (Quality Mindset)", "Mentoria", "Comunicação com Stakeholders"]
    },
    especialista: {
      expectativa: "Especialista em nicho de qualidade: performance, segurança, acessibilidade ou QA de IA.",
      hardSkills: ["Test Architecture para Sistemas Complexos", "QA para Modelos de IA/ML", "Testes de Contratos (Contract Testing/Pact)", "Automação Mobile Avançada (Appium/Espresso)", "Observabilidade em Qualidade", "Publicação e Conferências de QA"],
      softSkills: ["Inovação em Qualidade", "Pensamento Analítico Profundo", "Evangelização de Qualidade", "Visão Estratégica"]
    },
    gestor: {
      expectativa: "Lidera a função de qualidade, define processos e garante a cultura de qualidade em toda a organização.",
      hardSkills: ["Quality Management System (QMS)", "Métricas de Qualidade de Produto (Defect Density, MTTR)", "Gestão de Equipes de QA", "Orçamento e Ferramentas de Qualidade", "Compliance e Auditoria de Qualidade", "Integração QA ao DevOps/Agile"],
      softSkills: ["Liderança Inspiradora", "Gestão de Mudanças", "Visão de Negócio", "Desenvolvimento de Equipes"]
    }
  },

  /* ─────────────────── CIÊNCIA DE DADOS ─────────────────── */
  ciencia_de_dados: {
    estagiario: {
      expectativa: "Apoio em limpeza de dados, extrações SQL básicas e criação de dashboards simples.",
      hardSkills: ["SQL Básico", "Python/R Básico", "Limpeza de Dados (Pandas)", "Data Visualization Básico (Power BI/Tableau)", "Excel/Google Sheets Avançado", "Fundamentos de Estatística Descritiva"],
      softSkills: ["Atenção a Detalhes", "Curiosidade Intelectual", "Comunicação Escrita", "Organização"]
    },
    junior: {
      expectativa: "Análise exploratória de dados (EDA) e construção de relatórios com automação básica.",
      hardSkills: ["SQL Intermediário", "Análise Exploratória (EDA)", "Estatística Descritiva e Inferencial Básica", "Git Básico", "Automação de Relatórios (Python/R)", "Dashboards Intermediários (Power BI)"],
      softSkills: ["Pensamento Analítico", "Tradução de Dados em Linguagem de Negócio", "Organização", "Colaboração com Áreas de Negócio"]
    },
    pleno: {
      expectativa: "Modelagem preditiva básica, pipelines de dados e testes de hipóteses.",
      hardSkills: ["Machine Learning Básico (Scikit-Learn)", "Estatística Inferencial e Testes A/B", "Modelagem de Banco de Dados (Data Modeling)", "Pipelines de Dados (Airflow/Prefect)", "Visualização Avançada (Plotly, Seaborn)", "Governança e Qualidade de Dados Básica"],
      softSkills: ["Resolução de Problemas", "Comunicação de Resultados a Stakeholders", "Pensamento Crítico", "Autonomia"]
    },
    senior: {
      expectativa: "Desenvolvimento de modelos complexos, deploy em produção e estratégia de dados ligada ao negócio.",
      hardSkills: ["Machine Learning Avançado e Feature Engineering", "Deep Learning Básico (TensorFlow/PyTorch)", "MLOps Básico (MLflow, Vertex AI)", "Big Data (Spark/Databricks)", "LGPD e Privacidade em Dados", "Comunicação Executiva de Dados"],
      softSkills: ["Visão Sistêmica", "Mentoria Técnica", "Influência Estratégica com Dados", "Gestão de Projetos de Dados"]
    },
    especialista: {
      expectativa: "Criação de soluções de IA de ponta, algoritmos customizados e pesquisa avançada.",
      hardSkills: ["Redes Neurais / NLP / LLMs / Visão Computacional", "MLOps Avançado e Model Serving", "Pesquisa e Desenvolvimento (P&D)", "Otimização de Algoritmos Complexos", "Ética em IA e Fairness", "Publicação Científica / Conferências"],
      softSkills: ["Inovação em IA", "Precisão Absoluta", "Capacidade Analítica Profunda", "Comunicação Científica"]
    },
    gestor: {
      expectativa: "Lidera o time de dados e define a cultura Data-Driven da empresa.",
      hardSkills: ["Arquitetura de Dados Estratégica (Data Mesh/Fabric)", "Governança de Dados Corporativa", "Gestão de Projetos de Dados e IA", "Ética, LGPD e Compliance em IA", "Gestão de Orçamento e Ferramentas de Dados", "Estratégia de Democratização de Dados"],
      softSkills: ["Liderança Executiva", "Influência Organizacional com Dados", "Visão de Negócio", "Desenvolvimento de Equipes"]
    }
  },

  /* ─────────────────── GESTÃO DE PRODUTO ─────────────────── */
  gestao_de_produto: {
    estagiario: {
      expectativa: "Apoio em pesquisa de usuários, organização de backlog e escrita de user stories básicas.",
      hardSkills: ["Noções de Metodologias Ágeis (Scrum/Kanban)", "Apoio a Entrevistas de Usuário", "Ferramentas de Gestão (Jira/Notion/Linear)", "Benchmarking de Concorrentes", "Documentação de Produto Básica", "Noções de Analytics (Google Analytics)"],
      softSkills: ["Curiosidade", "Organização", "Comunicação", "Empatia com o Usuário"]
    },
    junior: {
      expectativa: "Gestão tática do backlog sob supervisão e acompanhamento do delivery.",
      hardSkills: ["Escrita de User Stories, Épicos e Critérios de Aceite", "Scrum / Kanban Praticante", "Priorização Básica (MoSCoW)", "Google Analytics / Mixpanel Básico", "Roadmap Tático", "Testes de Usabilidade Básicos"],
      softSkills: ["Empatia com o Usuário", "Colaboração com Dev e Design", "Capacidade Analítica", "Proatividade"]
    },
    pleno: {
      expectativa: "Gerencia o roadmap de uma feature ponta a ponta, alinhando Discovery e Delivery.",
      hardSkills: ["Product Discovery (Jobs to be Done, Design Sprint)", "Frameworks de Priorização (RICE, ICE, MoSCoW)", "Teste A/B e Experimentação", "Métricas de Produto (KPIs, OKRs)", "Prototipação e Validação Rápida", "Comunicação de Produto para Stakeholders"],
      softSkills: ["Negociação com Devs e Designers", "Pensamento Crítico", "Comunicação Clara", "Tomada de Decisão Baseada em Dados"]
    },
    senior: {
      expectativa: "Lidera produtos ou verticais inteiras, ligando visão de produto aos OKRs estratégicos.",
      hardSkills: ["Estratégia de Go-To-Market", "Roadmap Estratégico de Produto", "Análise de Dados Avançada (Amplitude/Mixpanel)", "Economia de Produto (CAC, LTV, Payback)", "Monetização e Estratégia de Preços", "Gestão de Portfólio de Features"],
      softSkills: ["Influência sem Autoridade Formal", "Visão Sistêmica", "Tomada de Decisão sob Incerteza", "Comunicação Executiva"]
    },
    especialista: {
      expectativa: "Principal PM: inovação radical em produtos complexos ou altamente técnicos.",
      hardSkills: ["Inovação Disruptiva e Jobs to be Done Avançado", "Arquitetura de Produto Complexo", "North Star Metric e métricas avançadas", "Design Organizacional de Produto", "Localização e Internacionalização de Produto", "Product-Led Growth (PLG)"],
      softSkills: ["Visão de Futuro", "Resolução de Problemas Complexos", "Mentoria de PMs", "Influência Estratégica"]
    },
    gestor: {
      expectativa: "GPM ou Diretor de Produto: gerencia PMs e alinha portfólio à diretoria.",
      hardSkills: ["Estratégia de Portfólio de Produtos", "Alocação de Recursos e Headcount", "Alinhamento C-Level e Board", "Modelagem Financeira de Produto", "Gestão de Cultura de Produto", "Recrutamento e Desenvolvimento de PMs"],
      softSkills: ["Liderança Executiva", "Visão de Negócio", "Gestão de Conflitos", "Desenvolvimento de Líderes de Produto"]
    }
  },

  /* ─────────────────── DESIGN ─────────────────── */
  design: {
    estagiario: {
      expectativa: "Apoio em peças gráficas, organização de assets e pesquisas com usuários.",
      hardSkills: ["Figma/Adobe CC Básico", "Princípios Visuais (Cor, Tipografia, Grid)", "Organização de Componentes e Assets", "Noções de Usabilidade", "Canva / Ferramentas de Conteúdo Visual", "Noções de Design System"],
      softSkills: ["Criatividade", "Receber e Incorporar Feedback", "Atenção a Detalhes", "Organização"]
    },
    junior: {
      expectativa: "Criação de telas e fluxos simples sob supervisão, seguindo o Design System.",
      hardSkills: ["Prototipação no Figma", "Wireframing e Fluxos de Usuário", "Design System (Consumo e Contribuição)", "Pesquisa Qualitativa Básica (Entrevistas)", "Acessibilidade WCAG Básica", "Handoff para Desenvolvimento"],
      softSkills: ["Empatia com Usuário", "Comunicação Visual", "Organização", "Colaboração com PMs e Devs"]
    },
    pleno: {
      expectativa: "Desenvolve fluxos complexos e interfaces de alta fidelidade com autonomia.",
      hardSkills: ["UX Research (Testes de Usabilidade, Card Sorting)", "Design de Interação e Microanimações", "Arquitetura da Informação", "Acessibilidade WCAG 2.1 AA", "Métricas de UX (SUS, NPS, CES)", "Responsive e Mobile-First Design"],
      softSkills: ["Defesa de Decisões de Design", "Pensamento Crítico", "Colaboração com Devs e PMs", "Autonomia"]
    },
    senior: {
      expectativa: "Lidera a estratégia de design de produto, unindo necessidade do usuário e negócio.",
      hardSkills: ["Design System (Criação e Governança)", "Estratégia de UX e Design de Produto", "Métricas de Produto (HEART, CES, Task Completion)", "Service Design e Blueprint", "DesignOps Básico", "Pesquisa Generativa e Diagnóstica"],
      softSkills: ["Visão de Negócio", "Mentoria de Designers", "Resolução de Conflitos", "Comunicação Executiva de Design"]
    },
    especialista: {
      expectativa: "Profundo em nicho: UX Writing, Design Ops, Acessibilidade ou Motion Avançado.",
      hardSkills: ["Design Ops (Processos, Ferramentas, Métricas de Design)", "Acessibilidade WCAG 2.2 e Teste com Tecnologias Assistivas", "Pesquisa Generativa Complexa (Etnografia)", "Design Comportamental e Persuasivo", "UX Writing e Conteúdo como Design", "Contribuição ao Design System Corporativo"],
      softSkills: ["Inovação em Design", "Influência Sistêmica", "Visão Estratégica", "Evangelização de UX"]
    },
    gestor: {
      expectativa: "Gerencia o time de design e promove a cultura centrada no usuário.",
      hardSkills: ["Design Leadership e Gestão de Time", "Gestão de Capacidade e Alocação", "Alinhamento Estratégico com C-Level", "Estratégia de Portfólio de Produtos (Design)", "Métricas de Saúde do Time de Design", "Recrutamento e Desenvolvimento de Designers"],
      softSkills: ["Liderança Inspiradora", "Visão Organizacional", "Negociação com Produto e Engenharia", "Desenvolvimento de Talentos"]
    }
  },

  /* ─────────────────── MARKETING ─────────────────── */
  marketing: {
    estagiario: {
      expectativa: "Apoio operacional em campanhas e gestão de mídias sociais.",
      hardSkills: ["Redes Sociais (Instagram, LinkedIn, TikTok)", "Canva / Adobe Express Básico", "Redação Criativa e Copywriting Básico", "Noções de SEO On-Page", "Planilhas de Controle de Campanhas", "Agendamento de Conteúdo (Buffer/Hootsuite)"],
      softSkills: ["Criatividade", "Trabalho em Equipe", "Atenção a Detalhes", "Organização"]
    },
    junior: {
      expectativa: "Execução de campanhas táticas e análise básica de métricas digitais.",
      hardSkills: ["Google Analytics (GA4)", "Copywriting e Marketing de Conteúdo", "Email Marketing (Mailchimp/RD Station)", "Gestão de Anúncios Básica (Meta Ads/Google Ads)", "SEO On e Off Page Básico", "CRM Básico"],
      softSkills: ["Comunicação Assertiva", "Organização", "Orientação a Dados", "Adaptabilidade"]
    },
    pleno: {
      expectativa: "Gere campanhas end-to-end e otimiza taxas de conversão (CRO).",
      hardSkills: ["Tráfego Pago Avançado (Meta Ads, Google Ads, LinkedIn Ads)", "Inbound Marketing e Funil Completo", "CRO (Otimização de Conversão)", "Automação de Marketing (HubSpot/RD Station)", "SEO Técnico e Link Building", "Análise de Concorrentes e Share of Voice"],
      softSkills: ["Pensamento Analítico", "Gestão do Tempo", "Adaptabilidade", "Colaboração com Vendas"]
    },
    senior: {
      expectativa: "Define estratégias de canal, orçamento e posicionamento de marca.",
      hardSkills: ["Estratégia Omnichannel", "Data-Driven Marketing e Marketing Mix Modeling", "Branding Estratégico e Gestão de Reputação", "Gestão de Orçamento (Budget e ROI)", "Marketing de Conteúdo e SEO Estratégico", "Marketing de Influência e Parcerias"],
      softSkills: ["Visão de Negócio", "Mentoria", "Negociação com Parceiros e Agências", "Comunicação Executiva"]
    },
    especialista: {
      expectativa: "Domínio profundo em Growth Hacking, MarTech ou Brand Strategy.",
      hardSkills: ["Growth Hacking e Experimentação", "Marketing Mix Modeling e Atribuição Avançada", "MarTech e Integrações de Stack de Marketing", "Análise de Coorte e Retenção", "Branding de Alto Nível (Arquitetura de Marcas)", "Marketing Baseado em Dados (1st Party Data Strategy)"],
      softSkills: ["Inovação em Marketing", "Pensamento Estratégico", "Influência Multifuncional", "Visão de Produto e Marca"]
    },
    gestor: {
      expectativa: "Lidera a direção de marca e alinha marketing às metas de vendas corporativas.",
      hardSkills: ["Planejamento de Marketing Anual e Orçamento", "Relações Públicas e Gestão de Crise de Marca", "Gestão de Times de Marketing (Brand, Performance, Content)", "Estratégia P&L de Marketing", "Parcerias Estratégicas e Co-Marketing", "Governança de Dados de Marketing (LGPD)"],
      softSkills: ["Liderança de Alta Performance", "Inteligência Emocional", "Visão de Futuro", "Negociação Estratégica"]
    }
  },

  /* ─────────────────── VENDAS ─────────────────── */
  vendas: {
    estagiario: {
      expectativa: "Apoio em inteligência comercial, qualificação inicial e organização de CRM.",
      hardSkills: ["Noções de CRM (Salesforce/HubSpot/Pipedrive)", "Pesquisa e Qualificação de Leads", "Pacote Office / Google Workspace", "Escrita Comercial e E-mail Frio", "Noções de Inside Sales", "Mapeamento de ICP (Ideal Customer Profile)"],
      softSkills: ["Escuta Ativa", "Resiliência Básica", "Comunicação", "Organização"]
    },
    junior: {
      expectativa: "Prospecção ativa (SDR/BDR) e condução de vendas de menor complexidade.",
      hardSkills: ["Cold Calling e Cold Email", "Social Selling (LinkedIn Sales Navigator)", "Gestão de Pipeline Básico no CRM", "SPIN Selling e BANT Básico", "Cadência de Prospecção", "Apresentação de Produto Básica"],
      softSkills: ["Persuasão", "Gestão de Rejeição", "Foco em Meta", "Adaptabilidade"]
    },
    pleno: {
      expectativa: "Ciclo completo de vendas (Closer) com autonomia técnica e negociação fluida.",
      hardSkills: ["Técnicas de Fechamento Avançadas (SPIN, Challenger Sale)", "Forecast de Vendas (MEDDIC/MEDDPICC)", "Negociação de Contratos e Gestão de Objeções", "Demonstração de Produto/POC", "Análise de Pipeline e Win/Loss", "Gestão do Tempo de Vendedor (Time Blocking)"],
      softSkills: ["Empatia Comercial", "Inteligência Emocional", "Gestão do Tempo", "Comunicação de Valor"]
    },
    senior: {
      expectativa: "Contas Enterprise (Key Account), ciclos longos e vendas de alta complexidade.",
      hardSkills: ["Vendas Complexas B2B Enterprise", "Gestão de Key Accounts e Executivos de Conta", "Cross-sell e Up-sell Estratégico", "Análise de ROI e Business Case para Cliente", "Account-Based Marketing (ABM) em conjunto com Marketing", "Elaboração de RFP/RFX e Licitações"],
      softSkills: ["Relacionamento Executivo (C-Level)", "Resolução de Problemas Complexos", "Visão Sistêmica", "Negociação de Alto Valor"]
    },
    especialista: {
      expectativa: "Arquiteto de soluções comerciais ou engenheiro de vendas.",
      hardSkills: ["Sales Enablement e Treinamento de Times", "Engenharia de Vendas (Pre-Sales/Sales Engineer)", "Modelagem de Pricing e Estratégia de Go-to-Market", "Design de Territórios e Segmentação", "Revenue Operations (RevOps) Básico", "Análise de Competidores (Battlecard)"],
      softSkills: ["Pensamento Estratégico", "Influência Técnica e Comercial", "Inovação em Processos de Vendas", "Liderança Informal"]
    },
    gestor: {
      expectativa: "Define metas, territórios, comissionamento e desenvolve o time de vendas.",
      hardSkills: ["Desenho de Plano de Comissionamento e Remuneração Variável", "Sales Ops e Operações de Vendas", "Previsão de Receita (Forecasting) e Pipeline Review", "Gestão de Equipes Comerciais (Coaching de Vendedores)", "Revenue Operations (RevOps) Avançado", "Estratégia de Canais de Vendas (Direto, Canal, Inside)"],
      softSkills: ["Liderança Motivacional", "Negociação Estratégica", "Gestão de Conflitos", "Desenvolvimento de Talentos Comerciais"]
    }
  },

  /* ─────────────────── CUSTOMER SUCCESS ─────────────────── */
  customer_success: {
    estagiario: {
      expectativa: "Apoio no monitoramento de chamados, onboarding e base de conhecimento.",
      hardSkills: ["Zendesk / Intercom Básico", "Noções de Atendimento ao Cliente", "Documentação de Conhecimento (Knowledge Base)", "Compreensão Básica do Produto", "Excel/Google Sheets Básico", "CRM Básico"],
      softSkills: ["Empatia", "Comunicação Escrita e Verbal", "Paciência", "Organização"]
    },
    junior: {
      expectativa: "Condução de Onboarding de clientes SMB e atendimento focado no sucesso de uso.",
      hardSkills: ["Processo de Onboarding Estruturado", "Gestão de Tickets e SLAs", "Análise Básica de Engajamento de Clientes", "Conhecimento Profundo do Produto/Solução", "Métricas de CS (CSAT, NPS Básico)", "CRM de CS (Gainsight/Totango Básico)"],
      softSkills: ["Didática", "Resiliência", "Escuta Ativa", "Proatividade com o Cliente"]
    },
    pleno: {
      expectativa: "Gestão de carteira Mid-Market, acompanhamento de health score e QBRs.",
      hardSkills: ["QBR (Quarterly Business Review)", "Análise de Health Score e Churn Risk", "Táticas de Retenção e Renovação", "Identificação de Upsell e Cross-sell", "Mapeamento de Stakeholders no Cliente", "Sucesso do Cliente em SaaS (MRR, ARR, NRR)"],
      softSkills: ["Negociação Interpessoal", "Proatividade Estratégica", "Inteligência Emocional", "Comunicação de Valor"]
    },
    senior: {
      expectativa: "Gestão de contas Enterprise, prevenção de churn estratégico e expansão de receita.",
      hardSkills: ["Estratégia Anti-Churn e Playbooks de Risco", "Mapeamento Completo da Jornada do Cliente", "Gestão de Contas Enterprise Críticas", "Customer Marketing e Advocacy", "CS Ops: Automação e Processos de CS", "Executive Sponsorship e C-Level Relationship"],
      softSkills: ["Visão de Negócio", "Resolução de Conflitos Complexos", "Influência Executiva", "Mentoria de Analistas de CS"]
    },
    especialista: {
      expectativa: "CS Ops, escalabilidade ou especialista em Tech Touch e automação.",
      hardSkills: ["CS Ops: Design de Processos e Automação", "Modelagem Avançada de Health Score", "Análise de Dados de Clientes (SQL, Gainsight)", "Jornadas Low/Tech Touch Escaláveis", "Revenue Retention Modeling (GRR, NRR)", "Design de Programas de Customer Education"],
      softSkills: ["Pensamento Analítico", "Inovação em CS", "Visão Sistêmica", "Influência Multifuncional"]
    },
    gestor: {
      expectativa: "Lidera o departamento de pós-venda garantindo retenção líquida positiva (NDR).",
      hardSkills: ["Gestão de P&L de Retenção e Receita Recorrente", "Estratégia de Customer Experience (CX)", "Desenho Organizacional de CS", "Previsão de Receita Recorrente (Churn Forecasting)", "Gestão de Equipes de CS (CSMs, Onboarding, Support)", "Voz do Cliente (VoC) e Estratégia de Feedback"],
      softSkills: ["Liderança Motivacional", "Visão Holística de Cliente", "Tomada de Decisão", "Desenvolvimento de Equipes de CS"]
    }
  },

  /* ─────────────────── RECURSOS HUMANOS ─────────────────── */
  recursos_humanos: {
    estagiario: {
      expectativa: "Apoio em triagem, onboarding e rotinas de departamento pessoal.",
      hardSkills: ["Sistemas ATS Básicos (Gupy/Kenoby)", "Apoio a Processos Seletivos e Triagem", "Noções de Legislação Trabalhista (CLT Básica)", "Onboarding Operacional", "Organização de Documentação de RH", "Pacote Office / Google Workspace"],
      softSkills: ["Empatia", "Organização", "Comunicação Discreta", "Confidencialidade"]
    },
    junior: {
      expectativa: "Condução de processos seletivos de volume e suporte a treinamentos.",
      hardSkills: ["Entrevista por Competências (CBI)", "Gestão de Benefícios Básica", "Treinamento e Desenvolvimento Operacional", "Métricas de RH Básicas (Turnover, Absenteísmo)", "Folha de Pagamento Básica (eSocial)", "Pesquisa e Aplicação de Testes Psicológicos Básicos"],
      softSkills: ["Escuta Ativa", "Resolução de Problemas", "Inteligência Emocional", "Comunicação Assertiva"]
    },
    pleno: {
      expectativa: "Business Partner júnior ou especialista em pilar específico (Rec&Sel, T&D, Comp&Ben).",
      hardSkills: ["Mapeamento e Avaliação de Competências", "Pesquisa de Clima Organizacional", "Avaliação de Desempenho e Feedback 360", "Estratégias de Retenção e Engajamento", "Legislação Trabalhista e Sindical Básica (Brasil)", "Employer Branding Tático"],
      softSkills: ["Negociação com Gestores", "Gestão de Conflitos", "Pensamento Crítico", "Influência sem Autoridade"]
    },
    senior: {
      expectativa: "HRBP consolidado, focado em cultura organizacional e desenvolvimento de lideranças.",
      hardSkills: ["Design Organizacional e Estruturas de Cargo", "Remuneração e Benefícios Avançado (Job Grading)", "People Analytics (Power BI + Dados de RH)", "Trilha de Liderança e Programas de Sucessão", "Gestão de Demissões Estratégicas e Crises Trabalhistas", "Compliance Trabalhista Avançado (eSocial, LGPD em RH)"],
      softSkills: ["Influência C-Level", "Visão Sistêmica de Pessoas", "Mentoria de HRBPs", "Gestão de Mudanças Organizacionais"]
    },
    especialista: {
      expectativa: "Especialista profundo em People Analytics, Cultura ou Remuneração Estratégica.",
      hardSkills: ["People Analytics Avançado (R/Python para RH)", "Estratégia de Employer Branding e EVP", "Desenho de Cultura e Transformação Cultural", "Políticas de Diversidade, Equidade e Inclusão (DEI)", "Certificações Internacionais (SHRM/CIPD)", "Gestão de Crises de Pessoas (Layoffs, Reestruturações)"],
      softSkills: ["Pensamento Analítico Aplicado a Pessoas", "Visão de Futuro", "Influência Organizacional", "Ética e Integridade em RH"]
    },
    gestor: {
      expectativa: "Alinha estratégia de pessoas aos objetivos do conselho de administração.",
      hardSkills: ["Estratégia de Capital Humano e Planejamento de Workforce", "Gestão Orçamentária de RH", "Sucessão de Lideranças e Talentos Críticos", "Compliance Trabalhista Total (eSocial, LGPD, NRs)", "Relações Sindicais e Negociação Coletiva", "Cultura Organizacional e Transformação (Change Management)"],
      softSkills: ["Liderança Executiva", "Visão de Negócio com Foco em Pessoas", "Ética e Integridade", "Desenvolvimento de Líderes"]
    }
  },

  /* ─────────────────── FINANÇAS ─────────────────── */
  financas: {
    estagiario: {
      expectativa: "Apoio em conciliação bancária, lançamentos e controle de planilhas.",
      hardSkills: ["Matemática Financeira Básica", "Excel / Google Sheets Intermediário", "Sistemas ERP Básico (SAP/Totvs)", "Noções de Contabilidade (Débito e Crédito)", "Fluxo de Caixa Básico", "Noções de Tributação Brasileira (Simples, Lucro Presumido)"],
      softSkills: ["Atenção a Detalhes", "Organização", "Responsabilidade", "Ética Profissional"]
    },
    junior: {
      expectativa: "Análise de contas a pagar/receber e elaboração de relatórios financeiros simples.",
      hardSkills: ["Análise de Fluxo de Caixa (DFC)", "Contabilidade Básica e Fechamento Mensal", "Excel Intermediário/Avançado (Tabela Dinâmica, Power Query)", "Conciliação Bancária", "Rotinas Fiscais Básicas (SPED, NFe)", "Análise de Capital de Giro"],
      softSkills: ["Foco e Concentração", "Comunicação Clara de Números", "Lidar com Prazos", "Organização"]
    },
    pleno: {
      expectativa: "Modelagem financeira, análise de variações (Realizado vs Orçado) e DRE.",
      hardSkills: ["Modelagem Financeira em Excel/Python", "Análise de DRE, Balanço e DFC", "Controladoria e Orçamento Empresarial (Budget)", "Power BI e Visualização de Dados Financeiros", "Análise de Variações (Budget vs Actual)", "Gestão de Tesouraria Básica"],
      softSkills: ["Pensamento Analítico", "Resolução de Problemas", "Visão Crítica de Números", "Comunicação com Áreas de Negócio"]
    },
    senior: {
      expectativa: "FP&A, valuation e viabilidade de projetos de investimento.",
      hardSkills: ["Valuation (DCF, Múltiplos)", "Orçamento Base Zero (OBZ) e FP&A", "Gestão de Tesouraria e Câmbio Avançada", "Compliance Financeiro (CVM, Banco Central)", "Análise de Cenários e Stress Testing", "Tributação Avançada (Planejamento Tributário Básico)"],
      softSkills: ["Visão Sistêmica de Negócio", "Influência sobre Líderes com Dados", "Tomada de Decisão", "Mentoria de Analistas"]
    },
    especialista: {
      expectativa: "M&A, estruturação de dívida, mercado de capitais ou auditoria profunda.",
      hardSkills: ["M&A e Due Diligence Financeira", "Normas IFRS e CPC (Contabilidade Internacional)", "Relação com Investidores (IR)", "Estruturação de Dívida e Instrumentos Financeiros", "Planejamento Tributário Estratégico (BEPS, Transfer Pricing)", "Ratings e Análise de Crédito Avançada"],
      softSkills: ["Capacidade Analítica Extrema", "Negociação Complexa", "Resiliência", "Comunicação Técnica a Não-Especialistas"]
    },
    gestor: {
      expectativa: "CFO ou Diretor Financeiro: saúde financeira e estratégia de capital.",
      hardSkills: ["Estratégia Corporativa Financeira (CFO Agenda)", "Gestão de Risco Financeiro e Cambial", "Governança Financeira e Auditoria Interna", "Alocação de Capital e Decisões de Investimento", "Gestão de Relacionamento com Bancos e Investidores", "Estratégia de Funding (Equity, Dívida, IPO)"],
      softSkills: ["Liderança Estratégica", "Gestão de Crises Financeiras", "Visão de Longo Prazo", "Credibilidade com Board e Investidores"]
    }
  },

  /* ─────────────────── CONTABILIDADE ─────────────────── */
  contabilidade: {
    estagiario: {
      expectativa: "Apoio em lançamentos contábeis, conciliações e escrituração fiscal básica.",
      hardSkills: ["Lançamentos Contábeis (Débito e Crédito)", "Conciliação Bancária", "Noções de Legislação Fiscal Brasileira (Simples Nacional)", "ERP Básico (TOTVS/SAP)", "Excel / Planilhas Fiscais", "Noções de Documentos Fiscais (NFe, NFSe)"],
      softSkills: ["Atenção a Detalhes", "Organização", "Ética e Sigilo", "Responsabilidade"]
    },
    junior: {
      expectativa: "Escrituração fiscal e contábil, apuração de impostos e fechamento mensal.",
      hardSkills: ["Apuração de Tributos (ICMS, PIS, COFINS, ISS)", "SPED Contábil e Fiscal", "Fechamento Mensal e Balancete", "Nota Fiscal Eletrônica (NFe) e Rotinas Fiscais", "Folha de Pagamento Básica (eSocial)", "Princípios Contábeis (NBC TG)"],
      softSkills: ["Foco", "Lidar com Prazos Fiscais", "Comunicação Escrita Técnica", "Organização"]
    },
    pleno: {
      expectativa: "Gestão contábil completa, conciliações complexas e compliance fiscal.",
      hardSkills: ["Contabilidade Societária e Demonstrações Financeiras (DRE, BP, DFC)", "Planejamento Tributário Básico (Lucro Real vs Presumido)", "Normas Contábeis CPC e IFRS Básico", "Escrituração do SPED Avançado", "Gestão de Ativos Imobilizados", "Compliance Fiscal: ECF, ECD"],
      softSkills: ["Pensamento Analítico Fiscal", "Comunicação com Auditores", "Autonomia", "Trabalho em Equipe com Financeiro"]
    },
    senior: {
      expectativa: "Controladoria, auditoria interna e gestão de compliance fiscal estratégico.",
      hardSkills: ["Controladoria e Gestão Orçamentária", "Auditoria Interna e Controles Internos (COSO/COBIT)", "Planejamento Tributário Avançado (IRPJ, CSLL)", "Consolidação de Demonstrações (Empresas do Grupo)", "Normas IFRS e Conversão de Demonstrações", "Gestão de Transfer Pricing Básico"],
      softSkills: ["Visão Sistêmica Fiscal e Contábil", "Liderança Técnica", "Influência em Decisões Gerenciais", "Tomada de Decisão com Risco Fiscal"]
    },
    especialista: {
      expectativa: "Especialista em normas internacionais, tributação complexa ou auditoria externa.",
      hardSkills: ["Normas IFRS Avançado (IFRS 16, IFRS 9, IFRS 15)", "Transfer Pricing Avançado e BEPS", "Tributação Internacional", "Auditoria Independente (CRC, CVM)", "Fusões e Aquisições (Due Diligence Contábil)", "Normas de Sustentabilidade (GRI/ESG Reporting)"],
      softSkills: ["Precisão Absoluta", "Capacidade Analítica Profunda", "Comunicação Técnica de Alta Complexidade", "Ética Contábil (CFC)"]
    },
    gestor: {
      expectativa: "Controller ou Diretor Contábil: gestão de compliance total e estratégia fiscal corporativa.",
      hardSkills: ["Gestão do Departamento Contábil e Fiscal", "Planejamento Tributário Estratégico Corporativo", "Relacionamento com Receita Federal, SEFAZ e Auditores", "Governança e Controles Internos (SOX/COSO)", "Orçamento e Gestão Financeira do Departamento", "ESG Reporting e Relatório Integrado"],
      softSkills: ["Liderança Executiva", "Ética e Integridade Corporativa", "Visão de Negócio com Compliance", "Desenvolvimento de Equipes Fiscais"]
    }
  },

  /* ─────────────────── ADMINISTRAÇÃO ─────────────────── */
  administracao: {
    estagiario: {
      expectativa: "Apoio nas rotinas administrativas e compreensão dos fluxos da empresa.",
      hardSkills: ["Pacote Office / Google Workspace", "Redação Empresarial e Protocolo", "Noções de Arquivo e Gestão Documental", "Atendimento ao Público e Telefônico", "Noções de Gestão de Agenda", "Controle Básico de Suprimentos e Almoxarifado"],
      softSkills: ["Atenção a Detalhes", "Pontualidade e Comprometimento", "Vontade de Aprender", "Comunicação Clara"]
    },
    junior: {
      expectativa: "Execução de processos de backoffice e relatórios padronizados.",
      hardSkills: ["Excel Intermediário (Tabelas, Funções Básicas)", "Sistemas ERP (Módulo Administrativo)", "Controle de Fluxo de Caixa Básico", "Gestão de Documentos e Contratos Simples", "Processos de Compras e Cotações", "Redação de Atas, Relatórios e Comunicados"],
      softSkills: ["Organização", "Proatividade", "Comunicação Escrita e Verbal", "Trabalho em Equipe"]
    },
    pleno: {
      expectativa: "Garante eficiência dos processos administrativos com autonomia.",
      hardSkills: ["Excel Avançado (Power Query, Dashboards)", "Análise e Melhoria de Processos (BPM Básico)", "Gestão de Contratos e Fornecedores", "Indicadores de Desempenho (KPIs Administrativos)", "Gestão de Custos Operacionais", "Legislação Trabalhista e Fiscal Básica"],
      softSkills: ["Gestão do Tempo", "Resolução de Problemas Operacionais", "Trabalho Interdepartamental", "Autonomia"]
    },
    senior: {
      expectativa: "Otimiza operações complexas e propõe melhorias estratégicas de custo e eficiência.",
      hardSkills: ["Modelagem e Mapeamento de Processos (BPMN)", "Compliance Básico e Boas Práticas Regulatórias", "Gestão de Fornecedores Estratégicos", "Auditoria Interna de Processos", "Gestão de Risco Operacional", "Gestão de Facilidades (Facilities Management)"],
      softSkills: ["Visão de Negócio Operacional", "Liderança de Projetos", "Tomada de Decisão", "Negociação com Fornecedores"]
    },
    especialista: {
      expectativa: "Referência em eficiência operacional, governança e normatizações.",
      hardSkills: ["BPMN Avançado e Automação de Processos (RPA Básico)", "Normas ISO (9001, 14001)", "Gestão de Riscos Operacionais Complexos", "Governança Corporativa Básica", "Lean Management / Six Sigma Green Belt", "Análise de Dados Operacionais (Power BI)"],
      softSkills: ["Pensamento Estratégico Operacional", "Influência Multifuncional", "Capacidade Analítica", "Visão de Longo Prazo"]
    },
    gestor: {
      expectativa: "Gerencia o backoffice inteiro alinhando operações aos objetivos da diretoria.",
      hardSkills: ["Planejamento Estratégico Operacional", "Gestão Orçamentária Corporativa do Backoffice", "Design Organizacional da Área Administrativa", "Gestão de Crises Operacionais", "Sustentabilidade Operacional (ESG Básico)", "Gestão de Contratos Complexos e SLAs"],
      softSkills: ["Liderança Executiva", "Visão Holística do Negócio", "Empatia com Times Operacionais", "Desenvolvimento de Processos Escaláveis"]
    }
  },

  /* ─────────────────── GESTÃO ─────────────────── */
  gestao: {
    estagiario: {
      expectativa: "Observação e suporte em análise de negócios e acompanhamento de metas.",
      hardSkills: ["Pesquisa de Mercado Básica", "Apoio na Elaboração de Apresentações Executivas", "Ferramentas de Gestão (Trello/Asana/Notion)", "Mapeamento e Documentação de Processos Básicos", "Noções de Análise SWOT", "Excel / Google Sheets para Análises Básicas"],
      softSkills: ["Curiosidade", "Escuta Ativa", "Comunicação", "Organização e Gestão do Próprio Tempo"]
    },
    junior: {
      expectativa: "Coleta e organização de dados para apoio à tomada de decisão gerencial.",
      hardSkills: ["Metodologias Ágeis Básicas (Scrum/Kanban)", "Dashboards Básicos (Power BI/Google Looker)", "Elaboração de Relatórios Gerenciais", "Análise SWOT e PESTEL", "OKRs: Definição e Acompanhamento Básico", "Facilitar Reuniões e Gestão de Atas"],
      softSkills: ["Proatividade", "Inteligência Emocional Básica", "Foco em Resultados", "Trabalho em Equipe"]
    },
    pleno: {
      expectativa: "Conduz projetos e iniciativas interligando diferentes áreas.",
      hardSkills: ["Gestão de Projetos (PMBOK/Scrum)", "Análise de Viabilidade de Projetos", "OKRs Avançados e Balaced Scorecard Básico", "Gestão de Mudança Básica (Change Management)", "Stakeholder Management", "Análise de Dados para Decisão (Power BI)"],
      softSkills: ["Negociação Interpessoal", "Pensamento Crítico", "Adaptabilidade", "Comunicação com Diferentes Perfis"]
    },
    senior: {
      expectativa: "Formula estratégias departamentais e resolve problemas de alto impacto.",
      hardSkills: ["Planejamento Estratégico (Balanced Scorecard, OKRs Estratégicos)", "Gestão Financeira para Gestores Não-Financeiros", "Gestão de Portfólio de Projetos", "Análise de Cenários e Gestão de Risco", "Change Management Avançado", "Facilitação de Workshops Estratégicos"],
      softSkills: ["Visão Sistêmica", "Resolução de Conflitos", "Influência C-Level", "Desenvolvimento de Times"]
    },
    especialista: {
      expectativa: "Expert em frameworks de gestão, atuando como consultor interno.",
      hardSkills: ["Governança Corporativa Avançada", "M&A e Reestruturações (Gestão de Projetos Complexos)", "Inovação Corporativa (Design Thinking, Lean Startup)", "Gestão de Complexidade Organizacional", "Análise de Dados Estratégica Avançada", "Metodologias de Transformação Organizacional"],
      softSkills: ["Resiliência", "Visão de Futuro", "Capacidade de Síntese e Simplificação", "Influência Organizacional"]
    },
    gestor: {
      expectativa: "Responsável pelo P&L e pela cultura da unidade de negócio.",
      hardSkills: ["Gestão Executiva de P&L (Lucros e Perdas)", "Desenvolvimento e Gestão de Lideranças", "Relações Institucionais e com Conselho", "Estratégia de Expansão e Crescimento", "Gestão de Crise Organizacional", "ESG e Sustentabilidade Estratégica"],
      softSkills: ["Liderança Inspiradora", "Tomada de Decisão em Crise", "Inteligência Emocional Avançada", "Desenvolvimento de Cultura Organizacional"]
    }
  },

  /* ─────────────────── LOGÍSTICA / SUPPLY CHAIN ─────────────────── */
  logistica_supply_chain: {
    estagiario: {
      expectativa: "Apoio no controle de estoque, rastreamento de fretes e documentação.",
      hardSkills: ["Controle de Planilhas de Estoque", "Noções de ERP (SAP/TOTVS Módulo Logístico)", "Documentação de Transporte (CT-e, MDFe)", "Noções de Inventário e Contagem Cíclica", "Rotinas de Recebimento e Expedição", "Noções de Gestão de Armazém"],
      softSkills: ["Organização", "Atenção a Detalhes", "Proatividade", "Trabalho sob Pressão"]
    },
    junior: {
      expectativa: "Programação de transporte, cotações e controle de KPIs operacionais básicos.",
      hardSkills: ["Gestão de Estoques Básico (FIFO/FEFO)", "Roteirização de Entregas Básica", "Análise e Cotação de Fretes", "Indicadores de Logística (OTIF, Giro de Estoque)", "Gestão de Devoluções e Avarias", "Noções de Comércio Exterior (Importação/Exportação Básica)"],
      softSkills: ["Gestão do Tempo", "Comunicação com Fornecedores e Transportadoras", "Resolução de Problemas Operacionais", "Organização"]
    },
    pleno: {
      expectativa: "Planejamento de demanda, gestão de armazéns e compras diretas.",
      hardSkills: ["S&OP (Planejamento de Vendas e Operações)", "Negociação com Fornecedores e Transportadoras", "Lean Logistics e Kaizen Operacional", "WMS (Warehouse Management System)", "Gestão de Nível de Serviço (SLA de Entrega)", "Análise de Custo Logístico Total (TCO)"],
      softSkills: ["Negociação", "Trabalho sob Pressão", "Visão Sistêmica da Cadeia", "Análise de Dados Operacionais"]
    },
    senior: {
      expectativa: "Desenho de malha logística, redução de custos e contratos complexos.",
      hardSkills: ["Modelagem de Malha Logística e Otimização", "Strategic Sourcing e Seleção de Fornecedores", "Gestão de Risco na Cadeia de Suprimentos", "Comércio Exterior Avançado (Drawback, Regimes Aduaneiros)", "Gestão de Contratos Logísticos Complexos", "Data Analytics para Supply Chain (Power BI/Python)"],
      softSkills: ["Tomada de Decisão Estratégica", "Liderança de Projetos Complexos", "Pensamento Estratégico", "Gestão de Stakeholders Externos"]
    },
    especialista: {
      expectativa: "Inovação logística, automação de armazéns ou sustentabilidade no Supply Chain.",
      hardSkills: ["Automação Logística (WMS Avançado, AGV, Robótica)", "Logística Reversa e Economia Circular", "Supply Chain Analytics Avançado (ML para Demanda)", "ESG na Cadeia de Suprimentos", "Blockchain e Rastreabilidade", "Torre de Controle de Supply Chain"],
      softSkills: ["Inovação Operacional", "Influência em Transformação Digital", "Capacidade Analítica", "Visão de Sustentabilidade"]
    },
    gestor: {
      expectativa: "Gestão integral da cadeia de suprimentos conectada à estratégia global.",
      hardSkills: ["Design Organizacional de Supply Chain", "Gestão Financeira de Supply (Budget, CAPEX/OPEX)", "Gestão de Crise de Desabastecimento", "Estratégia Global de Compras e Sourcing", "Governança de Fornecedores (SRM)", "Sustentabilidade e ESG no Supply Chain"],
      softSkills: ["Liderança Executiva de Operações", "Visão Holística de Cadeia", "Negociação de Alto Nível", "Desenvolvimento de Times de Operações"]
    }
  },

  /* ─────────────────── SAÚDE ─────────────────── */
  saude: {
    estagiario: {
      expectativa: "Apoio administrativo em rotinas clínicas, triagem e atendimento.",
      hardSkills: ["Sistemas de Prontuário Eletrônico Básico (Tasy/MV)", "Atendimento ao Paciente e Recepção Hospitalar", "Noções de Faturamento Médico (SUS/Convênios)", "Organização de Agendas e Escala Básica", "Noções de Vigilância Sanitária (ANVISA)", "Biossegurança Básica"],
      softSkills: ["Empatia", "Escuta Ativa", "Paciência", "Comunicação Clara com Pacientes"]
    },
    junior: {
      expectativa: "Gestão de leitos, faturamento inicial e apoio em qualidade hospitalar.",
      hardSkills: ["Faturamento SUS e Convênios Privados", "Gestão de Glosas Básica", "Normas de Vigilância Sanitária e ANVISA", "Indicadores Básicos de Saúde (Taxa de Ocupação, Média de Permanência)", "Gestão de Estoque de Medicamentos e OPME Básico", "Prontuário Eletrônico do Paciente (PEP)"],
      softSkills: ["Comunicação Assertiva com Equipe Multiprofissional", "Inteligência Emocional", "Organização Clínica", "Resiliência em Ambiente Hospitalar"]
    },
    pleno: {
      expectativa: "Coordenação de fluxos de pacientes, auditoria e controle de suprimentos médicos.",
      hardSkills: ["Auditoria de Contas Médicas Intermediária", "Gestão de Materiais e OPME", "Acreditação Hospitalar ONA (Nível 1 e 2)", "Gestão de Fluxo de Pacientes (Patient Flow)", "Indicadores de Qualidade Hospitalar (IQA, Taxa de Infecção)", "Lean Healthcare Básico"],
      softSkills: ["Resolução de Problemas Clínicos e Administrativos", "Trabalho sob Pressão", "Colaboração Interdisciplinar", "Comunicação com Médicos e Enfermeiros"]
    },
    senior: {
      expectativa: "Estratégia de operações de saúde, sinistralidade e compliance.",
      hardSkills: ["Gestão de Sinistralidade em Planos de Saúde", "Protocolos Clínicos Avançados e Medicina Baseada em Evidências", "Lean Healthcare Avançado e Gestão de Processos Hospitalares", "Gestão de Contratos com Operadoras de Saúde", "Telemedicina e Saúde Digital", "Acreditação ONA Nível 3 e JCI"],
      softSkills: ["Visão Sistêmica de Saúde", "Liderança Técnica em Ambiente Clínico", "Tomada de Decisão Ágil com Risco Clínico", "Influência sobre Equipes Médicas"]
    },
    especialista: {
      expectativa: "Consultor interno em qualidade, epidemiologia ou saúde digital.",
      hardSkills: ["Epidemiologia Analítica e Gestão de Surtos", "Saúde Digital / Telemedicina Estratégica", "Certificações Internacionais (JCI, Magnet)", "Gestão de Risco Clínico e Patient Safety", "Health Technology Assessment (HTA)", "Analytics em Saúde (SQL, Tableau, Power BI)"],
      softSkills: ["Pensamento Analítico Clínico", "Visão de Futuro em Saúde", "Capacidade de Síntese de Evidências", "Comunicação Científica"]
    },
    gestor: {
      expectativa: "Direção executiva do hospital ou clínica, alinhando medicina, negócios e ética.",
      hardSkills: ["Gestão Executiva Hospitalar e P&L", "Economia da Saúde e Finanças Hospitalares", "Planejamento Estratégico em Saúde", "Relações Governamentais e com Reguladores (ANS, ANVISA)", "ESG e Sustentabilidade em Saúde", "Transformação Digital em Saúde (Prontuário, AI Diagnóstica)"],
      softSkills: ["Liderança Executiva em Saúde", "Gestão de Crises Graves (Pandemia, Eventos Adversos)", "Empatia Estratégica", "Ética Médica e Corporativa"]
    }
  },

  /* ─────────────────── EDUCAÇÃO / T&D ─────────────────── */
  educacao: {
    estagiario: {
      expectativa: "Apoio na curadoria de materiais, formatação de cursos e suporte a alunos.",
      hardSkills: ["Pacote Office / Google Workspace", "Pesquisa e Curadoria de Conteúdo", "Noções de LMS (Moodle/Teachable/Hotmart)", "Edição Básica de Vídeo (Capcut/Loom)", "Noções de Design Instrucional (Storyboard Básico)", "Comunicação com Alunos (Suporte)"],
      softSkills: ["Vontade de Aprender", "Comunicação Escrita Didática", "Organização", "Empatia com o Aluno"]
    },
    junior: {
      expectativa: "Criação de módulos de treinamento e gestão de plataformas de ensino.",
      hardSkills: ["Design Instrucional Básico (ADDIE)", "Gestão de LMS e Trilhas de Aprendizagem", "Avaliação de Aprendizagem (Kirkpatrick Nível 1 e 2)", "Ferramentas de Autoria (Articulate Storyline/Rise Básico)", "Facilitação de Treinamentos Presenciais e Online", "Pesquisa de Necessidades de Treinamento (LNA)"],
      softSkills: ["Didática", "Empatia", "Gestão do Tempo", "Comunicação Oral em Público"]
    },
    pleno: {
      expectativa: "Desenho completo de trilhas de aprendizagem (Andragogia) e facilitação.",
      hardSkills: ["Andragogia / Heutagogia / Aprendizagem Autodirigida", "Design Instrucional Avançado (SAM, AGILE ID)", "Gamificação Aplicada ao Aprendizado", "Análise de Indicadores de T&D (ROI de Treinamento Básico)", "Liderança de Projetos de Treinamento", "Learning Experience Design (LXD)"],
      softSkills: ["Apresentação em Público com Impacto", "Pensamento Crítico sobre Aprendizado", "Adaptabilidade Metodológica", "Colaboração com Gestores e RH"]
    },
    senior: {
      expectativa: "Estratégia de Educação Corporativa alinhando desenvolvimento às necessidades do negócio.",
      hardSkills: ["Universidade Corporativa (Arquitetura e Governança)", "Cálculo de ROI de Treinamento (Kirkpatrick Nível 4)", "Curadoria Estratégica e Curation Tools", "Desenvolvimento de Programas de Liderança", "Competency-Based Learning", "Dados de Aprendizagem (Learning Analytics)"],
      softSkills: ["Visão de Negócio Aplicada a Educação", "Influência em Gestores e Diretores", "Mentoria de Profissionais de T&D", "Comunicação Executiva"]
    },
    especialista: {
      expectativa: "Foco em tecnologias imersivas, neurociência da aprendizagem ou Learning Analytics.",
      hardSkills: ["Neurociência Aplicada à Aprendizagem", "EdTech Avançado (VR/AR/Simulações)", "Learning Analytics Profundo (xAPI, LRS)", "Ecossistemas de Aprendizagem (Ecosystem Design)", "Coaching Executivo e Mentoring Profissional", "Pesquisa e Inovação em Educação Corporativa"],
      softSkills: ["Inovação em Aprendizagem", "Capacidade Analítica de Dados Educacionais", "Visão de Futuro do Trabalho", "Evangelização de Cultura de Aprendizagem"]
    },
    gestor: {
      expectativa: "Lidera iniciativas de aprendizado organizacional global e gestão do conhecimento.",
      hardSkills: ["Estratégia de Gestão do Conhecimento (KM)", "Gestão de Orçamento de T&D", "Alinhamento Estratégico de Cultura e Desenvolvimento", "Parcerias Acadêmicas e com Consultorias Externas", "Transformação Digital em Educação Corporativa", "ESG: Estratégias de Desenvolvimento Social e Inclusão"],
      softSkills: ["Liderança Inspiradora", "Visão de Futuro do Capital Humano", "Negociação com C-Level para Budget de T&D", "Desenvolvimento de Equipes de Educação"]
    }
  },

  /* ─────────────────── DIREITO ─────────────────── */
  direito: {
    estagiario: {
      expectativa: "Pesquisa de jurisprudência, diligências e elaboração de minutas simples.",
      hardSkills: ["Pesquisa Jurisprudencial (STF/STJ/TJs)", "Redação Jurídica Básica (Petições, Pareceres)", "Acompanhamento Processual (e-SAJ, PJe)", "Gestão de Prazos Processuais", "Pacote Office / Google Workspace para Jurídico", "Noções de Direito Processual Civil"],
      softSkills: ["Atenção a Detalhes", "Comunicação Escrita Precisa", "Ética Profissional (OAB)", "Organização"]
    },
    junior: {
      expectativa: "Análise de contratos rotineiros e consultoria jurídica a departamentos.",
      hardSkills: ["Análise Contratual Básica (Revisão, Redação)", "Direito Societário Básico (Constituição, Alterações)", "Direito do Trabalho Básico (CLT, eSocial)", "Sistemas de Gestão Jurídica (Softplan/SAJ GED)", "LGPD: Fundamentos e Adequação Básica", "Compliance Básico e Políticas Internas"],
      softSkills: ["Organização", "Comunicação Assertiva com Clientes Internos", "Gestão do Tempo e Prazos", "Proatividade"]
    },
    pleno: {
      expectativa: "Redação de contratos complexos, negociações extrajudiciais e gestão de processos.",
      hardSkills: ["Elaboração de Contratos Complexos (Empresariais, JV, SPA)", "Compliance e LGPD Avançado", "Negociação Jurídica e Resolução Alternativa de Disputas (ADR)", "Direito Tributário Básico Aplicado", "Gestão de Contratos no Sistema Jurídico", "Direito Digital e Contratos de Tecnologia"],
      softSkills: ["Resolução de Problemas Jurídicos Complexos", "Argumentação e Persuasão", "Trabalho Interdepartamental", "Gestão de Risco Jurídico"]
    },
    senior: {
      expectativa: "Gestão de litígios estratégicos, M&A e mitigação de riscos jurídicos profundos.",
      hardSkills: ["M&A e Estruturação Societária Complexa", "Gestão de Contencioso Estratégico (Teses Jurídicas)", "Governança Corporativa e Direito dos Sócios", "Gestão de Risco Legal e Compliance Avançado", "Arbitragem e Mediação Avançada", "Direito Regulatório Setorial (ANS, ANATEL, BACEN)"],
      softSkills: ["Visão de Negócio com Perspectiva Jurídica", "Tomada de Decisão com Risco Jurídico", "Gestão de Crises Jurídicas", "Influência em C-Level"]
    },
    especialista: {
      expectativa: "Profundo em área de risco vital: Tributário Avançado, Propriedade Intelectual ou Regulatório.",
      hardSkills: ["Planejamento Tributário Avançado (CARF, Teses Tributárias)", "Propriedade Intelectual, Marcas e Patentes (INPI)", "Direito Digital, IA e Cibersegurança Legal", "Direito Regulatório Internacional", "Estruturação de Operações Internacionais (Cross-border)", "Antitruste e Defesa da Concorrência (CADE)"],
      softSkills: ["Pensamento Analítico Jurídico Profundo", "Precisão Extrema e Zero Tolerância a Erros", "Influência Técnica no Setor Jurídico", "Comunicação de Risco Jurídico Complexo"]
    },
    gestor: {
      expectativa: "General Counsel / Diretor Jurídico: blinda a empresa e viabiliza negócios com segurança.",
      hardSkills: ["Estratégia Jurídica Corporativa e Prevenção de Riscos", "Gestão de Escritórios Jurídicos Terceirizados (Budget e KPIs)", "Relações Institucionais com Órgãos Reguladores e Governo", "Orçamento do Departamento Jurídico", "Governança de LGPD e Privacidade Corporativa", "Estratégia de Compliance Corporativo (Programa de Integridade)"],
      softSkills: ["Liderança Executiva Jurídica", "Visão Holística de Risco Corporativo", "Negociação de Alto Nível Estratégico", "Ética e Cultura de Integridade"]
    }
  },

  /* ─────────────────── ENGENHARIA ─────────────────── */
  engenharia: {
    estagiario: {
      expectativa: "Apoio em desenhos técnicos, levantamento de materiais e visitas a campo.",
      hardSkills: ["AutoCAD / Softwares de Desenho Técnico (Revit Básico)", "Leitura e Interpretação de Projetos", "Matemática Aplicada e Estatística Básica", "Noções de Segurança do Trabalho (NRs Básicas)", "Levantamento e Quantificação de Materiais", "Microsoft Project / Cronograma Básico"],
      softSkills: ["Curiosidade Técnica", "Atenção a Detalhes", "Trabalho em Equipe em Campo", "Responsabilidade"]
    },
    junior: {
      expectativa: "Acompanhamento de processos produtivos ou obras e relatórios técnicos.",
      hardSkills: ["Orçamentação Técnica e Composição de Preços Unitários", "Cronograma Físico-Financeiro (MS Project)", "Gestão de Qualidade Básica (5S, ISO 9001 Básico)", "Softwares Específicos (Revit/CYPECAD Básico)", "Normas Técnicas ABNT (aplicadas à área)", "Gestão de Subcontratados e Medições"],
      softSkills: ["Proatividade em Campo", "Resolução de Problemas Técnicos", "Organização de Projetos", "Comunicação Técnica"]
    },
    pleno: {
      expectativa: "Gestão autônoma de etapas de projeto ou obra e otimização de processos.",
      hardSkills: ["Gestão de Projetos de Engenharia (PMI/Agile Eng)", "Lean Manufacturing / Construção Enxuta", "Análise Estrutural / de Processos (FEA básico)", "Gestão de Fornecedores Técnicos e Contratos", "Segurança do Trabalho Avançada (PCMAT/PPRA/PGR)", "BIM (Building Information Modeling) Nível 2"],
      softSkills: ["Pensamento Analítico Técnico", "Liderança de Equipes em Campo", "Adaptabilidade a Imprevistos", "Comunicação com Clientes e Fiscalização"]
    },
    senior: {
      expectativa: "Design de soluções complexas, coordenação técnica e viabilidade financeira.",
      hardSkills: ["Viabilidade Técnica e Econômica de Projetos (TIR, VPL)", "Engenharia de Valor e Value Engineering", "Gestão de Obras/Fábricas de Grande Porte", "Normas Regulamentadoras Avançadas (NR 12, 35)", "Coordenação Multidisciplinar de Projetos (BIM NV 3)", "Gestão de Riscos em Engenharia"],
      softSkills: ["Visão Sistêmica de Projetos Complexos", "Tomada de Decisão Técnica e Financeira", "Negociação com Stakeholders e Clientes", "Mentoria Técnica"]
    },
    especialista: {
      expectativa: "Autoridade em nichos: Geotécnica, Automação Industrial, Energia ou Estrutural Avançado.",
      hardSkills: ["Cálculo Estrutural Avançado / Robótica Industrial", "Simulação de Sistemas Complexos (CAE, CFD)", "Patologias Construtivas e Manutenção Preditiva", "Materiais e Tecnologias Inovadoras", "Sustentabilidade em Engenharia (LEED, ESG)", "Pesquisa Aplicada e Publicação Técnica"],
      softSkills: ["Inovação Técnica", "Precisão Absoluta em Cálculos", "Influência Técnica no Setor", "Comunicação Científica e Técnica"]
    },
    gestor: {
      expectativa: "Diretor de Engenharia ou Operações: estratégia industrial e expansão de capacidade.",
      hardSkills: ["Planejamento Estratégico Industrial e de Infraestrutura", "Gestão de CAPEX e OPEX de Engenharia", "Sustentabilidade e ESG em Projetos de Engenharia", "Desenvolvimento de Novos Negócios e Propostas Técnicas", "Gestão de Múltiplos Projetos / PMO de Engenharia", "Compliance Técnico (NBR, CREA, CAU)"],
      softSkills: ["Liderança Executiva de Engenharia", "Visão de Longo Prazo", "Gestão de Crise em Obras/Operações", "Desenvolvimento de Equipes Técnicas"]
    }
  },

  /* ─────────────────── SUSTENTABILIDADE / ESG ─────────────────── */
  sustentabilidade_esg: {
    estagiario: {
      expectativa: "Apoio na coleta de dados ESG, elaboração de relatórios e pesquisas de sustentabilidade.",
      hardSkills: ["Fundamentos de ESG (E, S e G Básico)", "GRI Básico (Global Reporting Initiative)", "Coleta e Organização de Dados de Pegada de Carbono", "Noções de ODS (Objetivos de Desenvolvimento Sustentável)", "Excel para Dados de Sustentabilidade", "Pesquisa de Boas Práticas e Benchmarking ESG"],
      softSkills: ["Comprometimento com Propósito", "Atenção a Detalhes", "Curiosidade", "Comunicação Escrita"]
    },
    junior: {
      expectativa: "Apoia o inventário de emissões, programas de sustentabilidade e comunicação ESG.",
      hardSkills: ["Inventário de Emissões de GEE (GHG Protocol)", "Relatório de Sustentabilidade (GRI Standards Básico)", "Programas Internos de Sustentabilidade (Resíduos, Energia)", "Legislação Ambiental Básica (PNRS, CAR)", "Power BI / Excel para KPIs de ESG", "Comunicação de Sustentabilidade (Relatos, Redes Sociais)"],
      softSkills: ["Engajamento de Stakeholders", "Comunicação de Propósito", "Proatividade", "Trabalho Multidisciplinar"]
    },
    pleno: {
      expectativa: "Conduz programas de sustentabilidade, relatórios e engajamento de stakeholders.",
      hardSkills: ["Relatório Integrado (IIRC Framework)", "Gestão de Riscos e Oportunidades ESG (TCFD Básico)", "Programas de Eficiência Energética e Emissões (Scopo 1,2,3)", "Due Diligence ESG em Fornecedores", "Certificações de Sustentabilidade (ISO 14001, ISO 50001)", "Análise de Materialidade ESG"],
      softSkills: ["Pensamento Sistêmico de Impacto", "Comunicação de Sustentabilidade para Negócio", "Engajamento de Lideranças", "Resolução de Trade-offs ESG"]
    },
    senior: {
      expectativa: "Define estratégia ESG, lida com reguladores e conecta sustentabilidade ao negócio.",
      hardSkills: ["Estratégia ESG Corporativa (Materialidade, Metas Ambiciosas)", "TCFD Avançado e Risco Climático", "CSRD / Relatório de Sustentabilidade da UE", "Finanças Sustentáveis (Green Bonds, ESG Ratings)", "Programa de Carbon Neutrality e Net Zero", "ESG nas Cadeias de Fornecimento (Scope 3)"],
      softSkills: ["Visão de Negócio com Impacto", "Influência em C-Level sobre ESG", "Negociação com Investidores e Reguladores", "Liderança de Transformação Cultural"]
    },
    especialista: {
      expectativa: "Especialista profundo em clima, biodiversidade, economia circular ou impact investing.",
      hardSkills: ["Precificação de Carbono e Mercados Voluntários (VERRA/Gold Standard)", "Biodiversidade e TNFD (Taskforce Nature-related Disclosures)", "Economia Circular: Design e Implementação", "Impact Investing e Finanças de Impacto", "Assurance de Relatórios de Sustentabilidade (ISAE 3000)", "Pesquisa Avançada em Sustentabilidade Corporativa"],
      softSkills: ["Pensamento de Longo Prazo", "Capacidade Analítica de Impacto", "Influência no Setor", "Comunicação Científica de Sustentabilidade"]
    },
    gestor: {
      expectativa: "Diretor de Sustentabilidade ou CSO: alinha ESG à estratégia corporativa e ao Board.",
      hardSkills: ["Estratégia ESG de Longo Prazo (2030/2050)", "Governança de ESG (Comitê de Sustentabilidade, Políticas)", "Relação com Investidores ESG e Agências de Rating", "Regulamentação ESG e Compliance (CSRD, SEC Climate Rules)", "Gestão de Budget de Sustentabilidade", "Integração de ESG ao Planejamento Estratégico e M&A"],
      softSkills: ["Liderança Executiva de Propósito", "Influência no Board e com Investidores", "Visão de Futuro Sustentável", "Desenvolvimento de Cultura ESG na Empresa"]
    }
  },

  /* ─────────────────── COMUNICAÇÃO / RELAÇÕES PÚBLICAS ─────────────────── */
  comunicacao_relacoes_publicas: {
    estagiario: {
      expectativa: "Apoio em produção de conteúdo, monitoramento de mídia e eventos internos.",
      hardSkills: ["Redação Corporativa Básica", "Monitoramento de Mídia (Google Alerts, Clipagem)", "Redes Sociais Corporativas Básicas", "Noções de Imprensa e Release", "Canva e Ferramentas Visuais", "CRM de Comunicação Básico"],
      softSkills: ["Comunicação Escrita Clara", "Criatividade", "Atenção a Detalhes", "Organização"]
    },
    junior: {
      expectativa: "Produção de conteúdo institucional, assessoria de imprensa básica e eventos.",
      hardSkills: ["Redação de Press Releases e Pauta", "Assessoria de Imprensa Básica", "Gestão de Redes Sociais Institucionais", "Comunicação Interna (House Organ, Intranet)", "Organização de Eventos Corporativos", "Análise de Clipping e Métricas de Mídia"],
      softSkills: ["Escrita Persuasiva", "Networking com Jornalistas", "Proatividade", "Gestão do Tempo"]
    },
    pleno: {
      expectativa: "Gestão de campanhas de comunicação, relacionamento com mídia e crise básica.",
      hardSkills: ["Estratégia de Comunicação Integrada", "Gestão de Relacionamento com Veículos de Imprensa", "Comunicação em Crise (Plano de Crise Básico)", "Content Marketing Corporativo", "Métricas de PR (Share of Voice, AVE, Earned Media)", "Comunicação para Redes Sociais Executivas (LinkedIn do CEO)"],
      softSkills: ["Pensamento Estratégico de Comunicação", "Gestão de Múltiplos Stakeholders", "Persuasão", "Resiliência em Crises"]
    },
    senior: {
      expectativa: "Define estratégia de posicionamento de marca e gestão de reputação.",
      hardSkills: ["Estratégia de Reputação e Posicionamento de Marca Corporativa", "Gestão de Crise de Reputação Avançada", "Comunicação Executiva (Media Training, CEO Messaging)", "Relações Governamentais e com Órgãos Reguladores Básico", "Comunicação para Investidores (IR Comunicação)", "Gestão de Influenciadores e KOLs (Key Opinion Leaders)"],
      softSkills: ["Visão de Negócio Comunicacional", "Mentoria de Profissionais de Comunicação", "Negociação com Mídia", "Liderança em Situações de Crise"]
    },
    especialista: {
      expectativa: "Especialista em crise, relações governamentais, comunicação executiva ou PR digital.",
      hardSkills: ["Gestão Avançada de Crise Reputacional (Dark Site, War Room)", "Lobby e Relações Governamentais (Advocacy)", "Comunicação Política e Institucional", "PR Digital e ORM (Online Reputation Management)", "Mensuração de ROI de PR e Comunicação", "Produção de Conteúdo para Mídia de Alta Visibilidade"],
      softSkills: ["Influência Política e Midiática", "Pensamento Estratégico de Imagem Pública", "Resiliência Extrema em Crises", "Liderança de Times em Crise"]
    },
    gestor: {
      expectativa: "Diretor de Comunicação ou CCO: alinha comunicação à estratégia corporativa e ao Board.",
      hardSkills: ["Estratégia de Comunicação Corporativa Global", "Gestão de Times de Comunicação (PR, Comms, Imprensa)", "Budget de Comunicação e Agências", "Planejamento de Comunicação de Fusões e Aquisições", "Governança de Comunicação (Políticas, Porta-vozes)", "Comunicação de Resultados ao Board e Investidores"],
      softSkills: ["Liderança Executiva de Imagem Corporativa", "Visão Holística de Reputação", "Influência com Board e Investidores", "Desenvolvimento de Times de Comunicação"]
    }
  },

  /* ─────────────────── INOVAÇÃO / TRANSFORMAÇÃO DIGITAL ─────────────────── */
  inovacao_transformacao_digital: {
    estagiario: {
      expectativa: "Apoio em pesquisa de tendências, benchmarking e facilitação de workshops de inovação.",
      hardSkills: ["Pesquisa de Tendências e Foresight Básico", "Ferramentas de Ideação (Miro/FigJam)", "Noções de Design Thinking", "Benchmarking Competitivo", "Documentação de Projetos de Inovação", "Noções de Startups e Ecossistema de Inovação"],
      softSkills: ["Curiosidade e Mente Aberta", "Criatividade", "Comunicação Visual", "Trabalho Colaborativo"]
    },
    junior: {
      expectativa: "Facilita processos de inovação, apoia aceleradoras e laboratórios de inovação.",
      hardSkills: ["Design Thinking Aplicado (Empatia, Ideação, Prototipação)", "Lean Startup (MVP, Build-Measure-Learn)", "Facilitação de Workshops e Sprints", "Gestão de Projetos de Inovação (Ferramentas Ágeis)", "Mapeamento de Ecossistema de Startups", "Análise de Tendências Tecnológicas"],
      softSkills: ["Facilitação de Grupos", "Pensamento Criativo Estruturado", "Adaptabilidade", "Comunicação de Ideias"]
    },
    pleno: {
      expectativa: "Lidera projetos de transformação digital e iniciativas de inovação em áreas do negócio.",
      hardSkills: ["Design Thinking Avançado e Service Design", "Gestão de Portfólio de Inovação", "Estratégia de Transformação Digital (Mapa de Maturidade)", "Business Model Canvas e Value Proposition Design", "Open Innovation e Gestão de Parcerias com Startups", "Análise de ROI de Projetos de Inovação"],
      softSkills: ["Gestão de Mudanças e Resistências", "Comunicação de Inovação para Negócio", "Liderança de Projetos Ambíguos", "Pensamento Sistêmico"]
    },
    senior: {
      expectativa: "Define estratégia de inovação e transformação digital da empresa.",
      hardSkills: ["Estratégia de Inovação Corporativa (Horizonte 1, 2, 3)", "Corporate Venture Capital (CVC) Básico", "Transformação Digital: Cultura, Processos e Tecnologia", "Inovação Aberta e Ecossistemas (Hub, Lab, Aceleradora)", "Tecnologias Emergentes (IA, Blockchain, IoT) aplicadas ao negócio", "Gestão de Mudança em Escala (Change at Scale)"],
      softSkills: ["Visão Estratégica de Futuro", "Influência em C-Level sobre Inovação", "Tolerância à Ambiguidade", "Inspiração de Times para Inovar"]
    },
    especialista: {
      expectativa: "Especialista em venture building, corporate innovation ou tecnologias específicas disruptivas.",
      hardSkills: ["Venture Building e Criação de Novos Negócios Internos", "Corporate Venture Capital (CVC) Avançado", "Deep Tech: IA Generativa, Computação Quântica, Biotecnologia", "Futurismo e Cenários de Longo Prazo", "IP e Gestão de Propriedade Intelectual em Inovação", "Publicações e Speaking em Inovação"],
      softSkills: ["Pensamento Disruptivo", "Influência no Ecossistema de Inovação", "Visão de Futuro Estruturada", "Tolerância Extrema a Falhas e Pivots"]
    },
    gestor: {
      expectativa: "Chief Innovation Officer (CIO/CDO): lidera a agenda de inovação e transformação digital da empresa.",
      hardSkills: ["Estratégia de Transformação Digital Corporativa", "Gestão de Budget de Inovação e R&D", "Governança de Inovação (Comitê, KPIs, Stage-Gate)", "Parcerias Estratégicas com Universidades e Startups", "Criação de Cultura de Inovação e Intraempreendedorismo", "Comunicação de Inovação para Board e Investidores"],
      softSkills: ["Liderança Transformacional", "Visão de Ecossistema e Futuro", "Influência com Board e Parceiros Externos", "Desenvolvimento de Cultura Inovadora"]
    }
  },

  /* ─────────────────── COMPRAS / PROCUREMENT ─────────────────── */
  compras_procurement: {
    estagiario: {
      expectativa: "Apoio em cotações, cadastro de fornecedores e controle de pedidos.",
      hardSkills: ["Processo de Cotação e Comparação de Preços", "Cadastro e Homologação Básica de Fornecedores", "Sistemas de Compras (SAP MM / TOTVS Básico)", "Controle de Pedidos de Compra (PO)", "Excel / Planilhas de Controle de Suprimentos", "Noções de Gestão de Estoque e Demanda"],
      softSkills: ["Organização", "Atenção a Detalhes", "Comunicação com Fornecedores", "Proatividade"]
    },
    junior: {
      expectativa: "Condução de processos de cotação, negociações básicas e gestão de pedidos.",
      hardSkills: ["Negociação de Preços e Condições Básica", "Análise de Propostas e Comparativo de Fornecedores", "Gestão de Contratos de Fornecimento Simples", "Indicadores Básicos de Compras (Saving, Lead Time)", "Processos de RFQ / RFP Básico", "Compliance em Compras (Política de Compras da Empresa)"],
      softSkills: ["Negociação Básica", "Organização de Processos", "Comunicação Assertiva", "Ética em Compras"]
    },
    pleno: {
      expectativa: "Gestão de categorias de compra, negociações estratégicas e desenvolvimento de fornecedores.",
      hardSkills: ["Category Management (Gestão por Categorias)", "Negociação Avançada e TCO (Total Cost of Ownership)", "Desenvolvimento e Avaliação de Fornecedores (SRM)", "E-procurement e Leilão Reverso (Plataformas)", "Análise de Spend (Gasto por Categoria)", "Contratos de Fornecimento de Médio Porte"],
      softSkills: ["Negociação Estratégica", "Gestão de Relacionamento com Fornecedores", "Pensamento Analítico", "Influência Interna com Requisitantes"]
    },
    senior: {
      expectativa: "Define estratégia de sourcing, gestão de contratos críticos e desenvolvimento da base.",
      hardSkills: ["Strategic Sourcing Global", "Gestão de Contratos Complexos e SLAs", "Risk Management em Fornecedores", "Compras Públicas e Licitações (Lei 14.133/2021)", "Sustentabilidade na Cadeia de Fornecimento (ESG em Compras)", "Análise de Mercado de Fornecedores e Benchmarking"],
      softSkills: ["Visão Estratégica de Sourcing", "Negociação de Alto Valor", "Liderança de Times de Compradores", "Gestão de Risco de Fornecimento"]
    },
    especialista: {
      expectativa: "Especialista em categorias complexas, procurement digital ou compras internacionais.",
      hardSkills: ["Direct Sourcing e Compras Diretas (Matéria-Prima)", "Comércio Exterior em Compras (Importação Estratégica)", "Procurement Analytics (Python/SQL/Power BI)", "Gestão de Contratos de Alto Risco e Complexidade", "Procurement Digital (IA em Sourcing, Automatização)", "Modelos de Consórcio e Co-desenvolvimento com Fornecedores"],
      softSkills: ["Pensamento Estratégico de Supply", "Inovação em Procurement", "Influência Multifuncional", "Visão de Risco Global"]
    },
    gestor: {
      expectativa: "Lidera a estratégia de compras e o relacionamento com a base de fornecedores globais.",
      hardSkills: ["Estratégia de Procurement Corporativo (Make or Buy)", "Gestão de Budget de Compras e Metas de Saving", "Gestão de Times de Compradores", "Governança de Compras e Compliance (Anticorrupção, LGPD)", "Planejamento Estratégico de Sourcing (3–5 anos)", "Relacionamento Estratégico com Fornecedores Críticos"],
      softSkills: ["Liderança de Times de Compras", "Visão Holística de Cadeia de Valor", "Negociação Executiva de Alto Nível", "Desenvolvimento de Equipes de Procurement"]
    }
  },

  /* ─────────────────── AGRONEGÓCIO ─────────────────── */
  agronegocio: {
    estagiario: {
      expectativa: "Apoio em rotinas agrícolas, coleta de dados de campo e análise básica.",
      hardSkills: ["Noções de Agronomia ou Zootecnia (Bases Biológicas)", "Coleta de Dados de Campo (GPS, Planilhas)", "Noções de Solo e Nutrição de Plantas/Animais", "Excel para Dados Agrícolas", "Mapeamento Básico (Google Earth, Apps de Campo)", "Legislação Ambiental Rural Básica (CAR, APP, Reserva Legal)"],
      softSkills: ["Disposição para Trabalho em Campo", "Atenção a Detalhes", "Curiosidade Técnica", "Adaptabilidade ao Ambiente Rural"]
    },
    junior: {
      expectativa: "Execução de atividades técnicas de campo, análises e relatórios agronômicos.",
      hardSkills: ["Manejo de Culturas ou Criação Animal Básico", "Análise de Solo e Interpretação de Laudos", "Receituário Agronômico e Defensivos Agrícolas", "Máquinas e Implementos Agrícolas Básicos", "Gestão de Insumos e Estoque Rural", "Sistemas de Gestão Agrícola (Sap Rural/Agriness Básico)"],
      softSkills: ["Trabalho em Campo", "Comunicação com Produtores", "Proatividade", "Organização de Informações Técnicas"]
    },
    pleno: {
      expectativa: "Gestão autônoma de operações agrícolas ou pecuárias e análise de resultados.",
      hardSkills: ["Agricultura de Precisão (NDVI, Drones, Sensores)", "Gestão de Custos de Produção Agrícola", "Mercado de Commodities e Derivativos (Hedge Básico)", "RTIQ e Certificações de Qualidade (USDA, GlobalG.A.P)", "Gestão de Equipes Rurais", "BPAs (Boas Práticas Agrícolas) e Rastreabilidade"],
      softSkills: ["Visão Técnica e Econômica da Produção", "Liderança em Campo", "Análise de Dados Agrícolas", "Resolução de Problemas Fitossanitários"]
    },
    senior: {
      expectativa: "Define estratégias de produção, gestão de risco e relacionamento com mercado.",
      hardSkills: ["Gestão de Fazenda e P&L Agropecuário", "Estratégia de Comercialização de Commodities", "Gestão de Risco Climático e de Mercado (Seguro Rural)", "Sustentabilidade no Agro (ABC+, REDD, Regenerativo)", "Gestão de Projetos de Expansão Agrícola", "Financiamentos Rurais (PRONAF, PRONAMP, LCA/CRA)"],
      softSkills: ["Visão Sistêmica do Agronegócio", "Negociação com Trading e Cooperativas", "Tomada de Decisão com Risco Climático", "Liderança de Times no Campo"]
    },
    especialista: {
      expectativa: "Especialista em agricultura de precisão, sustentabilidade, genética ou mercado de carbono.",
      hardSkills: ["AgTech: IoT, IA e Big Data no Campo", "Mercado de Carbono Rural (REDD+, VCS)", "Melhoramento Genético e Biotecnologia Agrícola", "Agricultura Regenerativa e Manejo do Solo Avançado", "Gestão de Supply Chain Agroalimentar", "Análise de Dados Avançada para Agro (R/Python)"],
      softSkills: ["Inovação no Agro", "Pensamento Científico Aplicado", "Influência Técnica no Setor", "Sustentabilidade como Estratégia de Negócio"]
    },
    gestor: {
      expectativa: "Dirige operações agrícolas ou pecuárias de grande escala e define estratégia do negócio rural.",
      hardSkills: ["Gestão Estratégica de Fazenda/Agribusiness (P&L)", "Governança do Agronegócio e Sucessão Familiar", "Relações Institucionais (MAPA, EMBRAPA, CNA)", "Estratégia de Internacionalização do Agro (Export)", "ESG e Práticas Regenerativas como Diferencial Competitivo", "Gestão de Portfólio de Commodities e Diversificação"],
      softSkills: ["Liderança de Negócio Rural", "Visão de Mercado Global de Commodities", "Negociação com Cooperativas e Tradings", "Desenvolvimento de Times Técnicos Rurais"]
    }
  },

  /* ─────────────────── VAREJO / COMÉRCIO ─────────────────── */
  varejo: {
    estagiario: {
      expectativa: "Apoio em operações de loja, atendimento e controle de estoque.",
      hardSkills: ["Atendimento ao Cliente e Técnicas de Vendas Básicas", "Controle de Estoque Básico (FIFO)", "PDV (Ponto de Venda) e Sistemas de Caixa", "Visual Merchandising Básico", "Excel para Relatórios de Vendas", "Noções de Produto e Mix de Loja"],
      softSkills: ["Atendimento ao Público", "Comunicação Clara", "Trabalho em Equipe", "Resiliência em Ritmo de Loja"]
    },
    junior: {
      expectativa: "Gestão de seção ou departamento, análise de vendas e relacionamento com clientes.",
      hardSkills: ["Análise de Indicadores de Loja (Ticket Médio, Conversão, PA)", "Gestão de Estoque e Reposição", "Gestão de Equipe de Vendedores Básica", "Precificação e Gestão de Margens", "CRM de Varejo Básico", "E-commerce e Marketplace Básico (Shopee, Mercado Livre)"],
      softSkills: ["Orientação a Resultados", "Liderança de Equipe Pequena", "Organização Operacional", "Relacionamento com Clientes"]
    },
    pleno: {
      expectativa: "Gestão de loja ou canal completo, com autonomia em operações e pessoas.",
      hardSkills: ["Gestão de P&L de Loja", "Planejamento de Sortimento e Mix de Produtos", "Gestão de Perdas e Prevenção de Perdas", "Trade Marketing e Ativação de Ponto de Venda", "Análise de Dados de Varejo (BI/Dashboard)", "Gestão de Campanhas Sazonais (Natal, Black Friday)"],
      softSkills: ["Liderança de Equipes de Varejo", "Análise de Dados para Decisão Comercial", "Gestão de Conflitos com Clientes e Equipe", "Foco em Resultado e Metas"]
    },
    senior: {
      expectativa: "Gestão regional ou de múltiplas lojas, estratégia de canal e expansão.",
      hardSkills: ["Gestão de Múltiplas Lojas / Operação Regional", "Estratégia de Canal (Físico, Digital, Omnichannel)", "Gestão de Fornecedores e Negociação com Indústria", "Precificação Dinâmica e Estratégias de Promoção", "Análise de Mercado e Localização de Novas Lojas", "Customer Experience em Varejo (NPS, CX)"],
      softSkills: ["Visão Estratégica de Varejo", "Negociação com Indústria e Fornecedores", "Liderança Regional", "Desenvolvimento de Gerentes de Loja"]
    },
    especialista: {
      expectativa: "Especialista em omnichannel, pricing, category management ou retail analytics.",
      hardSkills: ["Category Management Avançado (ECRM, Planograma)", "Retail Analytics (Python/SQL/BI Avançado)", "Estratégia Omnichannel e Unified Commerce", "Dynamic Pricing e Estratégia de Promoções Avançada", "Supply Chain de Varejo (VMI, CPFR)", "D2C (Direct to Consumer) e E-commerce Avançado"],
      softSkills: ["Pensamento Analítico de Varejo", "Inovação em Experiência de Compra", "Influência Estratégica com Indústria e Franquias", "Visão de Futuro do Varejo (Phygital)"]
    },
    gestor: {
      expectativa: "Diretor Comercial ou de Operações de Varejo: define estratégia de expansão e rentabilidade.",
      hardSkills: ["Estratégia de Expansão e Novos Canais de Varejo", "Gestão de P&L Corporativo do Varejo", "Gestão de Times de Operações e Comercial", "Planejamento de Coleções / Calendário Comercial Anual", "Parcerias e Relacionamento com Grandes Marcas e Indústria", "ESG e Sustentabilidade no Varejo (Descarte, Embalagens)"],
      softSkills: ["Liderança Executiva Comercial", "Visão de Tendências de Consumo", "Negociação de Alto Nível com Indústria", "Desenvolvimento de Cultura de Resultado"]
    }
  }

};
