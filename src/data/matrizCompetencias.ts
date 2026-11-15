// Matriz de Competências por Área e Nível
// Hard Skills: 6 por nível | Soft Skills: 4 por nível
// Áreas: 40 trilhas de carreira

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
  },

  /* ─────────────────── ARQUITETURA E CONSTRUÇÃO ─────────────────── */
  arquitetura_construcao: {
    estagiario: {
      expectativa: "Apoio em levantamentos, detalhamentos e modelagem sob supervisão técnica.",
      hardSkills: ["AutoCAD 2D", "SketchUp / Modelagem 3D Básica", "Leitura de Plantas e Cortes", "Noções de BIM (Revit Básico)", "Levantamento de Quantitativos Simples", "Normas ABNT Introdutórias (NBR 9050, NBR 6492)"],
      softSkills: ["Atenção a Detalhes", "Curiosidade Técnica", "Organização de Pranchas", "Trabalho em Equipe"]
    },
    junior: {
      expectativa: "Desenvolve projetos executivos de menor complexidade e acompanha visitas a obra.",
      hardSkills: ["Revit / ArchiCAD (BIM Intermediário)", "Detalhamento Executivo e Marcenaria", "Compatibilização Básica de Projetos", "Orçamento de Obra (SINAPI/TCPO Básico)", "Renderização (Lumion/Enscape/V-Ray)", "Aprovação Legal em Prefeituras e Bombeiros"],
      softSkills: ["Comunicação Clara com Clientes", "Gestão de Prazos", "Receptividade a Feedback", "Resolução Prática de Problemas"]
    },
    pleno: {
      expectativa: "Conduz projetos completos e coordena interfaces com engenharia e fornecedores.",
      hardSkills: ["Coordenação BIM (Navisworks/Solibri)", "Gestão de Obra e Cronograma Físico-Financeiro", "Especificação Técnica de Materiais e Sistemas", "Conforto Ambiental e Eficiência Energética", "Gestão de Contratos e Medições de Empreiteiros", "Compatibilização Multidisciplinar (Estrutura/MEP)"],
      softSkills: ["Negociação com Fornecedores e Obra", "Autonomia", "Comunicação Assertiva", "Visão Estética e Funcional"]
    },
    senior: {
      expectativa: "Lidera grandes empreendimentos, define partido arquitetônico e mitiga riscos técnicos.",
      hardSkills: ["Arquitetura Corporativa, Comercial ou Residencial Complexa", "Gestão de Portfólio de Obras e CapEx", "Certificações Sustentáveis (LEED, AQUA, EDGE)", "Análise de Viabilidade Técnica e Legal de Terrenos", "Engenharia de Valor e Otimização Construtiva", "Gestão de Riscos e Aditivos de Obra"],
      softSkills: ["Liderança Técnica de Equipe", "Influência com Incorporadoras e Clientes", "Tomada de Decisão sob Pressão", "Mentoria de Arquitetos"]
    },
    especialista: {
      expectativa: "Referência técnica em BIM, sustentabilidade, patrimônio ou tecnologia construtiva.",
      hardSkills: ["BIM Management e Padronização Corporativa (ISO 19650)", "Parametrização e Design Computacional (Grasshopper/Dynamo)", "Construção Modular, Steel Frame e Pré-fabricados", "Acústica, Luminotécnica ou Fachadas Avançadas", "Simulações Energéticas e Análise de Ciclo de Vida", "Inovação em Materiais e Construtechs"],
      softSkills: ["Pensamento Analítico Avançado", "Inovação Contínua", "Comunicação Técnica Executiva", "Educação e Disseminação de Padrões"]
    },
    gestor: {
      expectativa: "Dirige escritório ou diretoria técnica, equilibrando rentabilidade, prazo e qualidade.",
      hardSkills: ["Gestão Financeira e Precificação de Projetos/Obras", "Desenvolvimento de Novos Negócios e Licitações", "Gestão de Equipes Multidisciplinares de Projeto e Obra", "Governança de Qualidade e Segurança do Trabalho (NR-18)", "Relacionamento com Investidores e Incorporadores", "Estratégia de Crescimento e Parcerias"],
      softSkills: ["Liderança Estratégica", "Visão de Negócio Imobiliário", "Gestão de Conflitos", "Formação de Lideranças"]
    }
  },

  /* ─────────────────── INDÚSTRIA E MANUFATURA ─────────────────── */
  industria_manufatura: {
    estagiario: {
      expectativa: "Apoio à rotina de chão de fábrica, coleta de indicadores e aprendizado de processos.",
      hardSkills: ["Noções de Lean Manufacturing (5S, Kaizen)", "Leitura de Desenho Técnico e Metrologia", "Excel Intermediário para Produção", "Noções de Segurança do Trabalho (NR-12/EPIs)", "Apontamento de Produção e Refugo", "Controle Estatístico Básico"],
      softSkills: ["Disciplina Operacional", "Atenção à Segurança", "Trabalho em Equipe", "Curiosidade Industrial"]
    },
    junior: {
      expectativa: "Executa análises de processo, apoio ao PCP e melhorias pontuais na linha.",
      hardSkills: ["PCP (Planejamento e Controle da Produção)", "Ferramentas da Qualidade (Pareto, Ishikawa, 5 Porquês)", "Cronoanálise e Balanceamento de Linha", "ERP Industrial (SAP PP/MM ou TOTVS)", "Cálculo de OEE e Eficiência de Linha", "Mapeamento de Fluxo de Valor (VSM Básico)"],
      softSkills: ["Comunicação com Operadores", "Organização", "Proatividade", "Resolução de Problemas"]
    },
    pleno: {
      expectativa: "Lidera células ou projetos de melhoria contínua, reduzindo perdas e variabilidade.",
      hardSkills: ["Lean Six Sigma (Green Belt)", "Manutenção Produtiva Total (TPM)", "FMEA e Controle Estatístico de Processo (CEP)", "Automação Industrial e CLP/SCADA Básico", "Gestão de Turno e Indicadores de Produtividade", "Redução de Setup (SMED)"],
      softSkills: ["Liderança de Chão de Fábrica", "Influência sem Autoridade", "Análise Crítica", "Foco em Resultado"]
    },
    senior: {
      expectativa: "Otimiza plantas industriais, conduz projetos de CapEx e eleva padrões de qualidade.",
      hardSkills: ["Lean Six Sigma (Black Belt)", "Indústria 4.0 (MES, IIoT, Gêmeos Digitais)", "Gestão de Orçamento Industrial e Custo de Conversão", "Certificações ISO 9001, IATF 16949 ou ISO 14001", "Planejamento de Capacidade e Layout Fabril", "Gestão de Segurança Operacional e Riscos"],
      softSkills: ["Liderança Multifuncional", "Tomada de Decisão sob Pressão", "Negociação com Sindicatos e Fornecedores", "Mentoria Técnica"]
    },
    especialista: {
      expectativa: "Referência corporativa em excelência operacional, automação ou engenharia de processos.",
      hardSkills: ["Arquitetura de Manufatura Inteligente (IIoT/IA)", "Modelagem e Simulação de Processos Industriais", "Robótica Colaborativa e Visão Computacional", "Descarbonização e Eficiência Energética Industrial", "Auditoria e Padronização Global de Manufatura", "Engenharia de Confiabilidade Avançada"],
      softSkills: ["Pensamento Sistêmico", "Inovação Industrial", "Comunicação Executiva", "Influência Corporativa"]
    },
    gestor: {
      expectativa: "Gerente ou Diretor Industrial: responde por P&L fabril, segurança, pessoas e entregas.",
      hardSkills: ["Gestão Integral de Planta (P&L Fabril e EBITDA)", "S&OP e Integração com Supply Chain e Comercial", "Estratégia de Investimentos Industriais (CapEx)", "Governança de EHS (Saúde, Segurança e Meio Ambiente)", "Gestão de Múltiplos Turnos e Lideranças", "Transformação Cultural Lean"],
      softSkills: ["Liderança Executiva", "Gestão de Crises Operacionais", "Visão Estratégica de Negócio", "Desenvolvimento de Gestores"]
    }
  },

  /* ─────────────────── ENERGIA, ÓLEO E GÁS ─────────────────── */
  energia_oleo_gas: {
    estagiario: {
      expectativa: "Apoio técnico em análises operacionais, dados de geração/produção e normas de SMS.",
      hardSkills: ["Fundamentos de Sistemas Energéticos / O&G", "Excel e Análise de Dados Básicos", "Noções de SMS (Saúde, Meio Ambiente e Segurança)", "Leitura de Fluxogramas (PFD/P&ID Básico)", "Noções de Regulação (ANEEL/ANP)", "Relatórios Técnicos de Acompanhamento"],
      softSkills: ["Cultura de Segurança", "Rigor Técnico", "Curiosidade", "Trabalho em Equipe"]
    },
    junior: {
      expectativa: "Acompanha operações, manutenção e conformidade regulatória em campo ou escritório.",
      hardSkills: ["Operação e Manutenção de Ativos Energéticos", "Análise de Dados Operacionais (PI System/Power BI)", "Gestão de Permissões de Trabalho e Análise de Risco (APR)", "Fundamentos de Subestações / Dutos / Plantas", "Contratos de Energia (ACL/ACR) Básicos", "Normas Técnicas (NR-10, NR-13, NR-35)"],
      softSkills: ["Atenção a Procedimentos", "Comunicação em Campo", "Organização", "Resolução de Problemas"]
    },
    pleno: {
      expectativa: "Conduz projetos de geração, transmissão, O&G ou eficiência com foco em confiabilidade.",
      hardSkills: ["Engenharia de Confiabilidade e Integridade de Ativos", "Estudos Elétricos / Termodinâmicos / Reservatórios", "Comercialização e Leilões de Energia (CCEE)", "Gestão de Paradas Programadas (Turnaround)", "Licenciamento Ambiental e Relacionamento Regulatório", "Automação e Telemetria (SCADA)"],
      softSkills: ["Gestão de Riscos", "Autonomia Técnica", "Colaboração Multidisciplinar", "Comunicação Objetiva"]
    },
    senior: {
      expectativa: "Lidera empreendimentos de alto porte, otimiza portfólio de ativos e responde por SMS crítico.",
      hardSkills: ["Estruturação de Projetos de Energia Renovável (Solar/Eólica/BESS)", "Gestão de Risco Operacional e Segurança de Processo (PSM)", "Modelagem Econômico-Financeira de Ativos (VPL/TIR)", "Gestão de Contratos EPC e O&M", "Estratégia Regulatória (ANEEL/ONS/ANP)", "Transição Energética e Hidrogênio / Biometano"],
      softSkills: ["Liderança em Ambientes Críticos", "Tomada de Decisão sob Pressão", "Negociação com Órgãos e Parceiros", "Mentoria Técnica"]
    },
    especialista: {
      expectativa: "Referência em tecnologia energética, transição de matriz ou integridade complexa.",
      hardSkills: ["Sistemas de Armazenamento (BESS) e Smart Grids", "Captura de Carbono (CCUS) e Descarbonização", "Análise Avançada de Confiabilidade e IA Preditiva", "Engenharia Submarina / Refino / Alta Tensão Avançada", "Due Diligence Técnica para M&A de Ativos", "P&D Regulado (ANEEL/ANP)"],
      softSkills: ["Visão Sistêmica do Setor", "Inovação Tecnológica", "Influência Técnica Executiva", "Pensamento Analítico Profundo"]
    },
    gestor: {
      expectativa: "Dirige operações, engenharia ou unidade de negócios com foco em segurança, retorno e ESG.",
      hardSkills: ["Gestão de P&L de Ativos de Geração/O&G", "Estratégia de Portfólio e PPA Corporativos", "Governança de SMS Zero Acidentes", "Gestão de CapEx Bilionário e Financiamento de Projetos", "Relações Institucionais e Governamentais", "Estratégia de Transição Energética Corporativa"],
      softSkills: ["Liderança Executiva", "Gestão de Crise", "Visão Geopolítica e de Mercado", "Desenvolvimento de Lideranças"]
    }
  },

  /* ─────────────────── TELECOMUNICAÇÕES ─────────────────── */
  telecomunicacoes: {
    estagiario: {
      expectativa: "Apoio em monitoramento de rede, documentação de topologias e atendimento técnico.",
      hardSkills: ["Fundamentos de Redes (TCP/IP, OSI, VLAN)", "Noções de Fibra Óptica (FTTH/GPON) e RF", "Monitoramento NOC Básico", "Linux e CLI de Roteadores Básico", "Documentação de Topologias e Inventário", "Noções de Regulação Anatel"],
      softSkills: ["Curiosidade Técnica", "Atenção a Detalhes", "Trabalho em Equipe", "Comunicação Clara"]
    },
    junior: {
      expectativa: "Executa configurações, troubleshooting de primeiro/segundo nível e ativação de links.",
      hardSkills: ["Roteamento e Switching (OSPF, BGP Básico, MPLS)", "Redes Ópticas (DWDM, OLT/ONT, OTDR)", "Redes Móveis (4G/LTE, 5G NSA/SA Básico)", "Ferramentas de Monitoramento (Zabbix, Grafana, PRTG)", "Automação de Rede Básica (Python/Ansible)", "Gestão de Chamados e SLA"],
      softSkills: ["Agilidade sob Pressão", "Organização", "Comunicação com Campo", "Resolução de Problemas"]
    },
    pleno: {
      expectativa: "Projeta e otimiza redes de acesso, transporte ou core garantindo alta disponibilidade.",
      hardSkills: ["Engenharia de Tráfego (BGP Avançado, MPLS, Segment Routing)", "Planejamento de RF e Otimização 4G/5G", "Core de Rede e Virtualização (NFV, SDN)", "Segurança de Redes de Telecom (DDoS, CGNAT, Firewall)", "Capacity Planning e Análise de Qualidade (QoS/QoE)", "Gestão de Projetos de Implantação de Rede"],
      softSkills: ["Autonomia Técnica", "Colaboração entre Áreas", "Gestão de Incidentes", "Pensamento Analítico"]
    },
    senior: {
      expectativa: "Arquiteta backbones, redes 5G ou infraestrutura crítica e lidera resposta a crises.",
      hardSkills: ["Arquitetura de Backbone Nacional e Interconexão (IX/Peering)", "Redes 5G Standalone, Network Slicing e Edge Computing", "Automação de Rede em Escala (NetDevOps)", "Arquitetura de Alta Disponibilidade e Redundância", "Negociação de Capacidade, Trânsito IP e Torres", "Conformidade Regulatória Anatel e Qualidade"],
      softSkills: ["Liderança Técnica", "Tomada de Decisão em Crises", "Comunicação Executiva", "Mentoria de Engenheiros"]
    },
    especialista: {
      expectativa: "Referência em arquitetura de telecom, Open RAN, óptica avançada ou automação autônoma.",
      hardSkills: ["Open RAN e Desagregação de Rede", "Sistemas Ópticos Coerentes de Ultra Capacidade", "Redes Privativas 5G Industriais e IoT Massivo", "AIOps e Redes Autônomas (Zero-Touch)", "Arquitetura IPv6 e Segurança BGP (RPKI)", "Due Diligence de Infraestrutura Telecom"],
      softSkills: ["Inovação em Conectividade", "Influência Estratégica", "Visão Sistêmica", "Pensamento Analítico Profundo"]
    },
    gestor: {
      expectativa: "Dirige engenharia, operações ou negócios de telecom equilibrando CapEx, cobertura e SLA.",
      hardSkills: ["Gestão de CapEx/OpEx de Infraestrutura de Rede", "Estratégia de Expansão de Cobertura e Mercado", "Gestão de NOC, Campo e Fornecedores/Empreiteiras", "Governança de SLA, Churn Técnico e Experiência", "Parcerias de Compartilhamento de Infraestrutura (RAN Sharing)", "Estratégia Regulatória e Espectro"],
      softSkills: ["Liderança Executiva", "Gestão de Crises Nacionais", "Visão de Negócio", "Desenvolvimento de Talentos"]
    }
  },

  /* ─────────────────── TRANSPORTES E MOBILIDADE ─────────────────── */
  transportes_mobilidade: {
    estagiario: {
      expectativa: "Apoio no acompanhamento de frota, planilhas operacionais e indicadores de pontualidade.",
      hardSkills: ["Excel para Controle de Frota e Rotas", "Noções de Telemetria e Rastreamento", "Indicadores Operacionais (OTIF, Ocupação, Consumo)", "Noções de Legislação de Trânsito e ANTT/ARTESP", "Apoio a Escalas e Programação de Viagens", "Georreferenciamento Básico (QGIS/Maps)"],
      softSkills: ["Organização", "Atenção a Prazos", "Comunicação Clara", "Trabalho em Equipe"]
    },
    junior: {
      expectativa: "Monitora operações diárias, roteirização e manutenção preventiva de frota.",
      hardSkills: ["Sistemas TMS e Gestão de Frotas", "Roteirização e Otimização de Malha", "Controle de Manutenção Preventiva e Pneus/Combustível", "Gestão de Sinistros e Segurança Viária", "Apuração de Custos por Km Rodado", "Atendimento a Ocorrências em Rota"],
      softSkills: ["Agilidade na Decisão", "Empatia com Motoristas/Passageiros", "Resolução de Problemas", "Proatividade"]
    },
    pleno: {
      expectativa: "Otimiza redes de transporte, reduz custos operacionais e implementa melhorias de serviço.",
      hardSkills: ["Planejamento de Malha e Dimensionamento de Frota", "Análise de Dados de Mobilidade (BI/SQL/GIS)", "Gestão de Contratos de Terceiros e Agregados", "Segurança Viária e Programas de Direção Defensiva", "Modelagem de Demanda e Tarifa / Frete", "Mobilidade Urbana e Integração Multimodal"],
      softSkills: ["Liderança Operacional", "Negociação com Parceiros", "Pensamento Sistêmico", "Foco em Eficiência"]
    },
    senior: {
      expectativa: "Lidera operações regionais, projetos de expansão e transição para frotas mais limpas.",
      hardSkills: ["Estratégia de Descarbonização (Elétricos, GNV, Biometano)", "Gestão de P&L de Operação de Transporte", "Torre de Controle e Automação Logística/Mobilidade", "Concessões Públicas e Parcerias Público-Privadas (PPPs)", "Gestão de Risco e Continuidade Operacional", "Pricing de Frete / Bilhetagem"],
      softSkills: ["Liderança de Grandes Equipes", "Tomada de Decisão sob Pressão", "Influência Institucional", "Mentoria"]
    },
    especialista: {
      expectativa: "Referência em engenharia de tráfego, eletrificação, MaaS ou otimização matemática.",
      hardSkills: ["Pesquisa Operacional e Otimização de Rotas (VRP)", "Infraestrutura de Recarga e Eletrificação de Frotas", "MaaS (Mobility as a Service) e Bilhetagem Inteligente", "Simulação de Tráfego e Fluxo de Passageiros", "Telemetria Preditiva e IA em Segurança Viária", "Modelagem Econômica de Concessões"],
      softSkills: ["Pensamento Analítico Avançado", "Inovação em Mobilidade", "Comunicação Executiva", "Visão de Futuro"]
    },
    gestor: {
      expectativa: "Dirige operações de transporte ou mobilidade com foco em rentabilidade, segurança e nível de serviço.",
      hardSkills: ["Estratégia Corporativa de Mobilidade e Logística", "Gestão de CapEx de Renovação de Frota", "Relações Governamentais, Sindicais e Regulatórias", "Governança de Segurança Viária e ESG", "Expansão de Corredores e Novos Contratos", "Transformação Digital de Operações"],
      softSkills: ["Liderança Executiva", "Gestão de Crise", "Visão Estratégica", "Desenvolvimento de Lideranças"]
    }
  },

  /* ─────────────────── TURISMO, HOTELARIA E EVENTOS ─────────────────── */
  turismo_hotelaria_eventos: {
    estagiario: {
      expectativa: "Apoio em atendimento ao hóspede/participante, reservas e logística operacional.",
      hardSkills: ["Atendimento ao Cliente e Hospitalidade", "Sistemas PMS/Reservas Básicos", "Apoio à Logística de Eventos e Check-in", "Comunicação em Inglês/Espanhol Básico", "Planilhas de Controle de Convidados e Fornecedores", "Noções de Etiqueta e Protocolo"],
      softSkills: ["Simpatia e Empatia", "Organização", "Calma sob Pressão", "Trabalho em Equipe"]
    },
    junior: {
      expectativa: "Conduz rotinas de recepção, produção de eventos ou vendas turísticas com autonomia.",
      hardSkills: ["Gestão de Reservas, OTAs e Canais de Distribuição", "Produção Executiva de Eventos Corporativos/Sociais", "Orçamentação e Cotação de Fornecedores", "Idiomas Aplicados ao Atendimento (Inglês/Espanhol)", "Experiência do Hóspede / Participante (NPS)", "Noções de A&B (Alimentos e Bebidas) e Governança"],
      softSkills: ["Resolução Rápida de Imprevistos", "Comunicação Encantadora", "Proatividade", "Flexibilidade de Horários"]
    },
    pleno: {
      expectativa: "Coordena áreas hoteleiras, grandes eventos ou produtos turísticos com foco em receita.",
      hardSkills: ["Revenue Management e Precificação Dinâmica (RevPAR, ADR)", "Gestão de Equipes de Recepção, Eventos ou Operações", "Planejamento Completo de Feiras, Congressos e Experiências", "Marketing Turístico e Parcerias Comerciais", "Gestão de Contratos, Alvarás e Segurança de Eventos", "Análise de P&L de Eventos e Diárias"],
      softSkills: ["Liderança de Serviço", "Negociação com Fornecedores", "Gestão do Estresse", "Foco em Experiência"]
    },
    senior: {
      expectativa: "Gerencia operações completas de hotéis, resorts, agências ou grandes produções.",
      hardSkills: ["Gestão Geral de Hotelaria (GOPPAR, P&L Completo)", "Estratégia Comercial MICE (Meetings, Incentives, Conferences)", "Expansão de Destinos, Roteiros e Parcerias Internacionais", "Gestão de Crise e Reputação (TripAdvisor/Reviews)", "Eventos Sustentáveis e Acessíveis (ESG)", "Automação da Jornada do Hóspede"],
      softSkills: ["Liderança Inspiradora", "Tomada de Decisão em Tempo Real", "Relacionamento Executivo", "Mentoria de Equipes"]
    },
    especialista: {
      expectativa: "Referência em revenue management, curadoria de experiências ou hospitalidade de luxo.",
      hardSkills: ["Revenue Management Avançado e Distribuição Global", "Design de Experiências Memoráveis e Hospitalidade de Luxo", "Estratégia de Turismo Sustentável e Regenerativo", "Tecnologia para Eventos (Híbridos, Credenciamento, Dados)", "Implantação e Pré-abertura de Empreendimentos Hoteleiros", "Consultoria de Padrões de Serviço (Forbes/AAA)"],
      softSkills: ["Sensibilidade Cultural", "Inovação em Experiência", "Influência Estratégica", "Excelência em Detalhes"]
    },
    gestor: {
      expectativa: "Dirige redes hoteleiras, operadoras ou empresas de eventos com foco em marca e retorno.",
      hardSkills: ["Estratégia de Expansão, Franquias e Bandeiras Hoteleiras", "Gestão de Portfólio e Rentabilidade Multi-unidade", "Relações Institucionais com Trade Turístico e Destinos", "Gestão de Grandes Orçamentos e Patrocínios", "Transformação Digital e Fidelização", "Cultura de Hospitalidade de Alta Performance"],
      softSkills: ["Liderança Executiva", "Visão de Tendências Globais", "Negociação de Alto Nível", "Desenvolvimento de Líderes"]
    }
  },

  /* ─────────────────── GASTRONOMIA E ALIMENTAÇÃO ─────────────────── */
  gastronomia_alimentacao: {
    estagiario: {
      expectativa: "Aprendizado de praças de cozinha, pré-preparo e boas práticas de higiene.",
      hardSkills: ["Mise en Place e Cortes Básicos", "Boas Práticas de Fabricação e Higiene (RDC 216 ANVISA)", "Armazenamento, PVPS e Controle de Validade", "Operação Segura de Equipamentos de Cozinha", "Noções de Técnicas Clássicas de Cocção", "Organização e Limpeza de Praça"],
      softSkills: ["Disciplina", "Agilidade", "Trabalho sob Pressão", "Respeito à Hierarquia de Cozinha"]
    },
    junior: {
      expectativa: "Assume praça específica com padronização de receitas e ritmo de serviço.",
      hardSkills: ["Execução de Fichas Técnicas e Padronização", "Domínio de Praça (Quente, Fria, Confeitaria, Bar)", "Controle de Desperdício e Porcionamento", "Segurança Alimentar (APPCC/Controle de Temperatura)", "Atendimento e Ritmo de Serviço (A la Carte/Buffet)", "Noções de Custos de Insumos"],
      softSkills: ["Consistência na Entrega", "Comunicação em Serviço", "Resistência Física e Emocional", "Colaboração"]
    },
    pleno: {
      expectativa: "Coordena turnos de cozinha ou salão, cria fichas técnicas e controla CMV.",
      hardSkills: ["Engenharia de Cardápio e Cálculo de CMV", "Gestão de Estoque, Compras e Fornecedores Locais", "Criação de Receitas e Desenvolvimento de Pratos", "Liderança de Brigada em Turno de Pico", "Padronização para Delivery e Escala", "Auditoria Interna de Qualidade e Vigilância Sanitária"],
      softSkills: ["Liderança de Brigada", "Criatividade com Viabilidade", "Gestão de Conflitos", "Organização Operacional"]
    },
    senior: {
      expectativa: "Chef Executivo ou Gerente de A&B: responde por conceito, equipe e margem da operação.",
      hardSkills: ["Gestão Financeira de Restaurantes / Cozinhas Industriais (DRE)", "Planejamento Sazonal de Cardápios e Fornecimento", "Treinamento Técnico Contínuo da Brigada", "Projetos de Cozinha, Fluxo e Equipamentos", "Estratégia de Marca Gastronômica e Experiência do Cliente", "Gestão de Múltiplos Pontos ou Catering"],
      softSkills: ["Liderança Inspiradora", "Visão de Negócio Gastronômico", "Tomada de Decisão Rápida", "Mentoria de Cozinheiros"]
    },
    especialista: {
      expectativa: "Referência em pesquisa gastronômica, P&D de alimentos, panificação ou nutrição aplicada.",
      hardSkills: ["P&D de Alimentos, Fermentação e Técnicas Avançadas", "Gastronomia Funcional, Inclusiva e Restrições Alimentares", "Consultoria de Implantação e Turnaround de Operações", "Tecnologia de Alimentos e Vida Útil (Shelf Life)", "Curadoria de Terroir e Sustentabilidade Alimentar", "Padronização Industrial para Redes e Franquias"],
      softSkills: ["Inovação Culinária", "Rigor Científico-Gastronômico", "Comunicação Didática", "Visão Cultural"]
    },
    gestor: {
      expectativa: "Dirige grupos de restaurantes, redes de food service ou operações corporativas de alimentação.",
      hardSkills: ["Expansão de Redes, Franquias e Dark Kitchens", "Gestão de P&L Multi-unidade e Supply Chain Alimentar", "Negociação Corporativa com Indústrias e Distribuidores", "Governança de Segurança Alimentar em Escala", "Estratégia de Marca, Delivery e Omnichannel", "Desenvolvimento de Chefs e Gerentes de Unidade"],
      softSkills: ["Liderança Executiva", "Visão Estratégica de Food Service", "Negociação de Alto Nível", "Cultura de Excelência"]
    }
  },

  /* ─────────────────── MÍDIA, AUDIOVISUAL E ENTRETENIMENTO ─────────────────── */
  midia_audiovisual_entretenimento: {
    estagiario: {
      expectativa: "Apoio em decupagem, edição básica, captação e organização de arquivos de produção.",
      hardSkills: ["Edição Básica (Premiere/DaVinci/CapCut)", "Organização de Mídia, Proxy e Backup", "Noções de Captação de Áudio e Vídeo", "Pesquisa de Referências e Roteiro Básico", "Legendas, Cortes para Redes Sociais e Formatos", "Direitos Autorais e Licenciamento Básico"],
      softSkills: ["Criatividade", "Atenção ao Ritmo e Detalhes", "Curiosidade Cultural", "Trabalho em Equipe"]
    },
    junior: {
      expectativa: "Produz, edita ou opera equipamentos em entregas recorrentes com qualidade técnica.",
      hardSkills: ["Edição e Color Grading Intermediários (DaVinci/Premiere)", "Motion Graphics Básico (After Effects)", "Operação de Câmera, Iluminação e Captação de Som", "Roteirização para Vídeo, Podcast ou Entretenimento", "Fluxos de Publicação Multiplataforma (YouTube, Streaming, Reels)", "Noções de Produção e Cronograma de Diária"],
      softSkills: ["Comunicação Visual", "Cumprimento de Prazos Apertados", "Receptividade a Críticas", "Proatividade"]
    },
    pleno: {
      expectativa: "Dirige, produz ou finaliza projetos audiovisuais completos, liderando equipes de set.",
      hardSkills: ["Direção de Fotografia / Direção Criativa / Produção Executiva", "Sound Design e Mixagem Profissional", "Orçamentação, Plano de Produção e Ordem do Dia", "Narrativa Transmídia e Retenção de Audiência", "Gestão de Fornecedores, Elenco e Locações", "Pós-produção Avançada e Entrega Broadcast/Streaming"],
      softSkills: ["Liderança de Set", "Negociação Criativa e Financeira", "Resolução de Imprevistos", "Visão Narrativa"]
    },
    senior: {
      expectativa: "Showrunner, Diretor ou Produtor Sênior: conduz séries, campanhas e grandes propriedades.",
      hardSkills: ["Gestão Financeira de Produções e Editais/Leis de Incentivo", "Desenvolvimento de Formatos Originais e Bíblias", "Negociação de Distribuição, Licenciamento e Streaming", "Direção de Grandes Equipes Técnicas e Artísticas", "Estratégia de Audiência, Monetização e Propriedade Intelectual", "Uso Estratégico de IA Generativa em Pré e Pós-produção"],
      softSkills: ["Liderança Artística", "Tomada de Decisão sob Pressão", "Influência com Executivos e Marcas", "Mentoria Criativa"]
    },
    especialista: {
      expectativa: "Referência técnica ou autoral em VFX, pipeline virtual, som imersivo ou roteiro.",
      hardSkills: ["Produção Virtual (Unreal Engine / LED Volume)", "VFX Avançado, Composição e Pipeline ACES", "Áudio Imersivo (Dolby Atmos) e Trilha Original", "Showrunning e Roteiro Seriado Avançado", "Arquitetura de Estúdios e Workflows em Nuvem", "Curadoria e Estratégia de Catálogo"],
      softSkills: ["Excelência Autoral", "Inovação Tecnológica em Mídia", "Pensamento Crítico", "Comunicação Executiva"]
    },
    gestor: {
      expectativa: "Dirige produtora, canal, estúdio ou área de conteúdo com foco em receita e relevância.",
      hardSkills: ["Gestão de P&L de Estúdio / Canal / Produtora", "Captação de Recursos, Patrocínios e Coproduções Internacionais", "Estratégia de Portfólio de Propriedades Intelectuais (IP)", "Gestão de Talentos Artísticos e Contratos", "Distribuição Multiplataforma e Novos Modelos de Negócio", "Governança de Compliance e Direitos"],
      softSkills: ["Liderança Executiva Criativa", "Visão de Indústria Cultural", "Negociação de Alto Nível", "Formação de Líderes"]
    }
  },

  /* ─────────────────── PESQUISA, CIÊNCIA E ACADEMIA ─────────────────── */
  pesquisa_ciencia_academia: {
    estagiario: {
      expectativa: "Iniciação científica: revisão bibliográfica, coleta de dados e apoio experimental.",
      hardSkills: ["Revisão Bibliográfica e Bases Científicas (Scopus, PubMed, SciELO)", "Gestão de Referências (Zotero/Mendeley)", "Organização de Dados Experimentais e Caderno de Lab", "Estatística Descritiva Básica (R/Python/SPSS)", "Normas ABNT / APA para Redação Científica", "Boas Práticas de Laboratório e Ética em Pesquisa"],
      softSkills: ["Rigor Científico", "Curiosidade Investigativa", "Paciência Metodológica", "Comunicação Escrita"]
    },
    junior: {
      expectativa: "Executa protocolos de pesquisa, análises estatísticas e redige artigos iniciais.",
      hardSkills: ["Desenho Experimental e Metodologia Científica", "Análise Estatística Inferencial (R/Python)", "Redação de Artigos Científicos em Inglês", "Submissão a Comitês de Ética (CEP/CEUA)", "Apresentação em Congressos e Pôsteres", "Reprodutibilidade e Versionamento de Dados/Código"],
      softSkills: ["Pensamento Crítico", "Resiliência à Revisão por Pares", "Organização", "Colaboração em Grupo de Pesquisa"]
    },
    pleno: {
      expectativa: "Conduz linhas de pesquisa com autonomia, capta fomento inicial e coorienta alunos.",
      hardSkills: ["Elaboração de Projetos para Agências de Fomento (CNPq, FAPESP, CAPES)", "Revisão Sistemática e Metanálise", "Modelagem Avançada e Bioestatística / Ciência Aberta", "Peer Review de Periódicos Internacionais", "Docência no Ensino Superior e Orientação", "Transferência de Tecnologia e Propriedade Intelectual"],
      softSkills: ["Autonomia Investigativa", "Comunicação Didática", "Mentoria de Alunos", "Gestão de Projetos Científicos"]
    },
    senior: {
      expectativa: "Pesquisador Principal / Professor: lidera laboratório, grandes grants e redes internacionais.",
      hardSkills: ["Captação de Grandes Recursos (Editais Temáticos, FINEP, Horizon)", "Liderança de Grupos de Pesquisa e Pós-Graduação", "Parcerias Pesquisa-Indústria e Spin-offs Científicas", "Estratégia de Publicação de Alto Impacto", "Avaliação de Programas e Bancas Doutorais", "Gestão de Infraestrutura Laboratorial"],
      softSkills: ["Liderança Acadêmica", "Articulação Institucional", "Visão Científica de Longo Prazo", "Formação de Pesquisadores"]
    },
    especialista: {
      expectativa: "Autoridade científica internacional, editor de periódicos ou líder de P&D de fronteira.",
      hardSkills: ["Pesquisa de Fronteira e Inovação Disruptiva", "Patentes Internacionais e Licenciamento Tecnológico", "Conselhos Científicos e Editoria de Periódicos", "Infraestruturas de Big Science e Consórcios Globais", "Políticas Científicas Baseadas em Evidências", "Métodos Computacionais e Simulação de Alta Complexidade"],
      softSkills: ["Influência Científica Global", "Pensamento Original", "Comunicação Pública da Ciência", "Ética Exemplar"]
    },
    gestor: {
      expectativa: "Dirige instituto de pesquisa, pró-reitoria ou centro de P&D conectando ciência e sociedade.",
      hardSkills: ["Gestão Orçamentária e Governança de Institutos de Pesquisa", "Política de Inovação, NITs e Ecossistemas de Ciência", "Avaliação Institucional e Captação Multissetorial", "Estratégia de Internacionalização Acadêmica", "Compliance Ético, Integridade Científica e LGPD", "Gestão de Carreira Docente e Pesquisadores"],
      softSkills: ["Liderança Executiva Científica", "Diplomacia Institucional", "Visão Estratégica", "Desenvolvimento de Lideranças"]
    }
  },

  /* ─────────────────── SETOR PÚBLICO E GOVERNO ─────────────────── */
  setor_publico_governo: {
    estagiario: {
      expectativa: "Apoio administrativo, levantamento de dados públicos e acompanhamento de processos.",
      hardSkills: ["Noções de Direito Administrativo e Constituição", "Elaboração de Ofícios, Notas Técnicas e Relatórios", "Pesquisa em Portais de Transparência e Dados Abertos", "Planilhas para Controle Orçamentário/Administrativo", "Sistemas de Protocolo Eletrônico (SEI!)", "Noções de Políticas Públicas"],
      softSkills: ["Ética e Impessoalidade", "Organização", "Comunicação Clara", "Interesse pelo Interesse Público"]
    },
    junior: {
      expectativa: "Analisa processos administrativos, acompanha contratos públicos e apoia políticas setoriais.",
      hardSkills: ["Nova Lei de Licitações e Contratos (Lei 14.133/2021)", "Elaboração de Termos de Referência e ETPs", "Ciclo Orçamentário Público (PPA, LDO, LOA)", "Análise de Dados para Políticas Públicas (Power BI/Excel)", "Atendimento ao Cidadão e Governo Digital", "Conformidade com LGPD e Lei de Acesso à Informação (LAI)"],
      softSkills: ["Rigor Normativo", "Transparência", "Resolução de Problemas", "Trabalho em Equipe"]
    },
    pleno: {
      expectativa: "Coordena projetos governamentais, fiscaliza contratos complexos e mede impacto de políticas.",
      hardSkills: ["Gestão e Fiscalização de Contratos e Convênios (MROSC)", "Avaliação de Políticas Públicas e Indicadores de Impacto", "Planejamento Estratégico Governamental (OKRs/BSC Público)", "Transformação Digital de Serviços Públicos", "Articulação Intersetorial e Controle Interno", "Compras Públicas Inovadoras"],
      softSkills: ["Articulação Política e Técnica", "Negociação Institucional", "Autonomia", "Foco no Cidadão"]
    },
    senior: {
      expectativa: "Lidera programas estruturantes, interface com órgãos de controle e modernização do Estado.",
      hardSkills: ["Governança Pública e Relacionamento com TCU/TCE/CGU", "Modelagem de Parcerias Público-Privadas (PPPs) e Concessões", "Gestão Orçamentária de Grande Porte e Execução Fiscal", "Desenho de Regulação e Análise de Impacto Regulatório (AIR)", "Liderança de Equipes Estatutárias e Multidisciplinares", "Gestão de Crises e Comunicação Pública"],
      softSkills: ["Liderança Pública", "Tomada de Decisão sob Pressão", "Integridade Inegociável", "Mentoria de Servidores"]
    },
    especialista: {
      expectativa: "Referência técnica em políticas baseadas em evidências, govtech, regulação ou finanças públicas.",
      hardSkills: ["Econometria e Avaliação Experimental de Políticas (RCTs)", "Arquitetura de Governo Digital e Interoperabilidade (Gov.br)", "IA Responsável e Dados no Setor Público", "Finanças Públicas Avançadas e Responsabilidade Fiscal", "Design de Regulação Econômica e Setorial", "Cooperação Internacional e Organismos Multilaterais"],
      softSkills: ["Pensamento Sistêmico de Estado", "Inovação no Setor Público", "Influência Técnica Executiva", "Comunicação Clara"]
    },
    gestor: {
      expectativa: "Secretário, Diretor ou Superintendente Público: responde por entregas, orçamento e legitimidade.",
      hardSkills: ["Direção Estratégica de Órgãos e Autarquias", "Gestão de Orçamento Público e Prestação de Contas", "Relações Institucionais (Legislativo, Judiciário, Sociedade Civil)", "Governança de Riscos, Integridade e Compliance Público", "Modernização Administrativa e Cultura de Resultado", "Gestão de Programas Prioritários de Governo"],
      softSkills: ["Liderança Executiva Pública", "Visão de Estado", "Negociação de Alto Nível", "Gestão de Crises"]
    }
  },

  /* ─────────────────── SERVIÇOS FINANCEIROS E SEGUROS ─────────────────── */
  servicos_financeiros_seguros: {
    estagiario: {
      expectativa: "Apoio operacional em análises de crédito, produtos financeiros, seguros ou atendimento.",
      hardSkills: ["Matemática Financeira Básica", "Excel para Análises Financeiras", "Noções do Sistema Financeiro Nacional (BACEN/CVM/SUSEP)", "Fundamentos de Produtos Bancários e Seguros", "Noções de PLD/FT e Compliance Básico", "Apoio a Relatórios de Carteira"],
      softSkills: ["Atenção a Detalhes", "Ética e Sigilo", "Curiosidade", "Organização"]
    },
    junior: {
      expectativa: "Executa análises de risco, subscrição, suitability ou consultoria financeira básica.",
      hardSkills: ["Análise de Crédito e Demonstrações Contábeis", "Subscrição e Precificação Básica de Seguros / Sinistros", "Certificações Regulatórias (CPA-10/CPA-20/CEA/SUSEP)", "SQL / Power BI para Métricas de Carteira e Inadimplência", "Prevenção à Lavagem de Dinheiro (PLD/KYC)", "Produtos de Renda Fixa, Variável e Previdência"],
      softSkills: ["Rigor Analítico", "Comunicação Transparente com Cliente", "Responsabilidade", "Proatividade"]
    },
    pleno: {
      expectativa: "Estrutura operações, gerencia carteiras ou modela riscos financeiros e atuariais.",
      hardSkills: ["Modelagem de Risco de Crédito, Mercado ou Liquidez", "Cálculo Atuarial e Precificação de Seguros", "Open Finance, Pix e Meios de Pagamento", "Gestão de Carteiras e Asset Allocation", "Compliance Regulatório Avançado (BACEN/SUSEP/CVM)", "Automação de Análises (Python/SQL)"],
      softSkills: ["Negociação Comercial e Técnica", "Pensamento Crítico", "Autonomia", "Foco em Rentabilidade e Risco"]
    },
    senior: {
      expectativa: "Lidera mesas, produtos financeiros, subscrição complexa ou gestão de riscos corporativos.",
      hardSkills: ["Estruturação de Produtos Financeiros, Crédito Corporativo e Seguros", "ALM (Asset Liability Management) e Gestão de Capital (Basileia/Solvência)", "Estratégia de Cobrança, Fraude e Recuperação de Crédito", "M&A, DCM/ECM e Mercado de Capitais", "Governança de Modelos de Risco e Auditoria", "Parcerias Bancassurance e Ecossistemas"],
      softSkills: ["Liderança de Time", "Tomada de Decisão sob Pressão", "Influência com Executivos e Reguladores", "Mentoria"]
    },
    especialista: {
      expectativa: "Referência em quant/risco, ciência atuarial avançada, tesouraria ou fintech/insurtech.",
      hardSkills: ["Modelagem Quantitativa e Machine Learning em Crédito/Fraude", "Ciências Atuariais Avançadas e Resseguro", "Tesouraria Avançada e Derivativos", "Arquitetura de Core Bancário, Tokenização e Drex", "Stress Testing e Regulação Prudencial Complexa", "Estratégia de Pricing Dinâmico em Seguros"],
      softSkills: ["Pensamento Analítico Profundo", "Inovação Financeira", "Comunicação Executiva", "Visão Sistêmica"]
    },
    gestor: {
      expectativa: "Dirige área de negócios, riscos ou diretoria financeira/seguradora com foco em retorno e solidez.",
      hardSkills: ["Gestão de P&L de Unidade Financeira / Seguradora (ROE, Sinistralidade)", "Estratégia de Crescimento, Canais e Aquisição", "Relacionamento com BACEN, CVM, SUSEP e Conselho", "Governança de Riscos Corporativos e Fraude", "Transformação Digital e Open Finance", "Formação de Executivos e Sucessão"],
      softSkills: ["Liderança Executiva", "Visão Macroeconômica", "Gestão de Crise de Confiança", "Negociação de Alto Nível"]
    }
  },

  /* ─────────────────── FARMACÊUTICA E BIOTECNOLOGIA ─────────────────── */
  farmaceutica_biotecnologia: {
    estagiario: {
      expectativa: "Apoio em controle de qualidade, assuntos regulatórios, laboratório ou P&D inicial.",
      hardSkills: ["Boas Práticas de Fabricação (BPF/GMP) e Laboratório (BPL)", "Noções de Regulação ANVISA", "Documentação Técnica (POPs e Registros)", "Técnicas Laboratoriais Básicas / Ensaios", "Planilhas de Estabilidade e Controle", "Farmacovigilância Introdutória"],
      softSkills: ["Rigor e Precisão", "Ética Científica", "Atenção a Detalhes", "Trabalho em Equipe"]
    },
    junior: {
      expectativa: "Executa análises físico-químicas/microbiológicas, dossiês regulatórios ou monitoria clínica.",
      hardSkills: ["Controle e Garantia da Qualidade (HPLC, Validação Analítica)", "Assuntos Regulatórios (Registro e Pós-registro ANVISA)", "Pesquisa Clínica (Boas Práticas Clínicas - ICH/GCP)", "Farmacovigilância e Relatos de Eventos Adversos", "Investigação de Desvios e CAPA Básico", "Bioinformática / Biotecnologia Básica"],
      softSkills: ["Disciplina Documental", "Pensamento Analítico", "Comunicação Clara", "Responsabilidade com o Paciente"]
    },
    pleno: {
      expectativa: "Conduz validações, submissões regulatórias, ensaios clínicos ou desenvolvimento de formulações.",
      hardSkills: ["Desenvolvimento Farmacotécnico e Escalonamento (Scale-up)", "Gestão de Estudos Clínicos (Fase I-IV)", "Auditorias de Qualidade e Fornecedores (GMP/ISO 13485)", "Estratégia Regulatória (ANVISA/FDA/EMA)", "Medical Affairs e Comunicação Científica", "Gestão de Riscos da Qualidade (ICH Q9)"],
      softSkills: ["Colaboração Multifuncional", "Autonomia Técnica", "Resolução de Problemas Complexos", "Foco em Compliance"]
    },
    senior: {
      expectativa: "Lidera áreas de P&D, qualidade, regulatório ou acesso ao mercado com impacto estratégico.",
      hardSkills: ["Acesso ao Mercado e Avaliação de Tecnologias em Saúde (ATS/CONITEC/ANS)", "Gestão de Portfólio de Pipeline e Lançamentos", "Transferência de Tecnologia e Parcerias (PDPs/CDMO)", "Liderança de Inspeções Sanitárias (ANVISA/FDA)", "Bioprocessos, Terapias Avançadas e Biológicos", "Propriedade Intelectual e Patentes Farmacêuticas"],
      softSkills: ["Liderança Científica", "Tomada de Decisão sob Incerteza", "Influência com Líderes de Opinião (KOLs)", "Mentoria"]
    },
    especialista: {
      expectativa: "Referência em biotecnologia, farmacoeconomia, assuntos regulatórios globais ou medical affairs.",
      hardSkills: ["Engenharia Genética, mRNA e Terapias Celulares", "Bioinformática Avançada e Descoberta de Fármacos com IA", "Farmacoeconomia e Modelos de Compartilhamento de Risco", "Estratégia Regulatória Global (ICH/EMA/FDA)", "Estabilidade Avançada e Qualidade por Design (QbD)", "Publicações Científicas de Alto Impacto"],
      softSkills: ["Inovação Biomédica", "Pensamento Sistêmico", "Comunicação Executiva Científica", "Ética Exemplar"]
    },
    gestor: {
      expectativa: "Dirige unidade farmacêutica, P&D, qualidade ou negócios de saúde com foco em pacientes e retorno.",
      hardSkills: ["Estratégia de Portfólio, P&L e Ciclo de Vida de Produtos", "Governança Global de Qualidade, Compliance e Ética (Interfarma)", "Relações Governamentais e Acesso Público/Privado", "Alianças Estratégicas, Licenciamento e M&A Biotech", "Gestão de Operações Industriais e Cadeia Fria", "Desenvolvimento de Lideranças Científicas e Comerciais"],
      softSkills: ["Liderança Executiva", "Visão de Saúde Global", "Gestão de Crise Sanitária/Reputacional", "Negociação de Alto Nível"]
    }
  },

  /* ─────────────────── IMOBILIÁRIO E FACILITIES ─────────────────── */
  imobiliario_facilities: {
    estagiario: {
      expectativa: "Apoio em vistorias, atendimento condominial/predial, cadastros e manutenção preventiva.",
      hardSkills: ["Controle de Chamados e Manutenção Predial (CAFM/CMMS)", "Vistorias de Imóveis e Checklists", "Planilhas de Controle de Contratos e Despesas", "Noções de Contratos de Locação e Condomínios", "Apoio à Gestão de Fornecedores (Limpeza, Segurança, HVAC)", "Leitura Básica de Plantas"],
      softSkills: ["Atendimento Cordial", "Organização", "Agilidade", "Trabalho em Equipe"]
    },
    junior: {
      expectativa: "Executa rotinas de facilities, administração de carteira ou apoio a transações imobiliárias.",
      hardSkills: ["Gestão de Manutenção Preventiva e Corretiva Predial", "Administração de Contratos de Locação, IPTU e Garantias", "Cotações e Acompanhamento de Serviços Terceirizados", "Normas de Segurança Predial (AVCB, NR-10, PMOC)", "CRM Imobiliário e Avaliação Comparativa de Imóveis", "Orçamento Operacional de Condomínio/Site"],
      softSkills: ["Resolução Prática de Conflitos", "Comunicação Clara", "Proatividade", "Foco no Ocupante/Cliente"]
    },
    pleno: {
      expectativa: "Gerencia operações de facilities de sites completos ou conduz negociações e incorporação.",
      hardSkills: ["Gestão de Facilities Corporativos (Hard & Soft Services)", "Análise de Viabilidade Econômica de Empreendimentos", "Negociação de Contratos Comerciais (Built-to-Suit, Sale-Leaseback)", "Eficiência Energética, Água e Resíduos em Edifícios", "Gestão de CapEx de Reformas e Retrofit", "SLA e Indicadores de Terceiros (KPIs de Facilities)"],
      softSkills: ["Negociação", "Liderança de Equipes Terceirizadas", "Autonomia", "Visão de Custo-Benefício"]
    },
    senior: {
      expectativa: "Lidera portfólios imobiliários multi-site, incorporação ou workplace experience corporativo.",
      hardSkills: ["Gestão de Portfólio Imobiliário Corporativo (CRE)", "Estruturação de Fundos Imobiliários / Securitização (CRI) Básica", "Estratégia de Workplace, Ocupação e Modelo Híbrido", "Certificações Prediais (LEED O+M, WELL, Fitwel)", "Due Diligence Técnica, Ambiental e Fundiária", "Gestão de Grandes Contratos e Facilities Regionais"],
      softSkills: ["Liderança Multifuncional", "Influência com Diretoria e Proprietários", "Tomada de Decisão sob Pressão", "Mentoria"]
    },
    especialista: {
      expectativa: "Referência em smart buildings, avaliação imobiliária, retrofit sustentável ou proptech.",
      hardSkills: ["Smart Buildings, BMS e IoT Predial", "Avaliação Imobiliária Avançada (NBR 14653)", "Retrofit Corporativo e Descarbonização de Portfólio", "Modelagem Financeira Imobiliária Complexa", "Digital Twins para Operação e Manutenção", "Estratégia de Ocupação Baseada em Dados"],
      softSkills: ["Pensamento Analítico", "Inovação Predial", "Comunicação Executiva", "Visão de Sustentabilidade"]
    },
    gestor: {
      expectativa: "Dirige operações de real estate, incorporadora ou facilities corporativos em escala.",
      hardSkills: ["Estratégia Patrimonial e Expansão Imobiliária", "Gestão de P&L, CapEx e OpEx de Portfólio Nacional", "Governança de Segurança, Compliance e Continuidade de Negócios", "Negociação de Grandes Aquisições, Parcerias e Terrenos", "Transformação Digital de Real Estate & Facilities", "Desenvolvimento de Gerentes Prediais e Comerciais"],
      softSkills: ["Liderança Executiva", "Visão de Mercado Imobiliário", "Negociação de Alto Nível", "Gestão de Crises"]
    }
  },

  /* ─────────────────── ESPORTES, FITNESS E BEM-ESTAR ─────────────────── */
  esportes_fitness_bem_estar: {
    estagiario: {
      expectativa: "Apoio em prescrição supervisionada, avaliação física e acolhimento de alunos/atletas.",
      hardSkills: ["Anatomia, Fisiologia e Biomecânica Aplicada", "Avaliação Física e Antropometria Básica", "Acompanhamento de Treinos e Correção Postural", "Primeiros Socorros e Segurança na Prática", "Atendimento e Retenção Inicial de Alunos", "Noções de Nutrição Esportiva e Sono"],
      softSkills: ["Empatia e Acolhimento", "Comunicação Motivadora", "Postura Ética", "Trabalho em Equipe"]
    },
    junior: {
      expectativa: "Prescreve programas individuais ou aulas coletivas com foco em aderência e evolução segura.",
      hardSkills: ["Periodização e Prescrição de Treinamento Individualizado", "Aulas Coletivas / Modalidades Específicas", "Avaliação Funcional e Prevenção de Lesões", "Uso de Wearables e Apps de Monitoramento de Carga", "Gestão de Carteira de Alunos / Personal", "Ética Profissional (CREF/Conselhos)"],
      softSkills: ["Escuta Ativa", "Motivação Sustentável", "Organização de Agenda", "Adaptabilidade ao Perfil do Aluno"]
    },
    pleno: {
      expectativa: "Coordena programas de performance, saúde corporativa ou equipe técnica de unidade.",
      hardSkills: ["Treinamento para Grupos Especiais e Reabilitação Funcional", "Análise de Dados de Performance e Recuperação (HRV, Carga)", "Gestão de Programas de Bem-Estar Corporativo (Wellbeing)", "Coordenação Técnica de Professores e Grade de Aulas", "Vendas Consultivas e Retenção/LTV de Alunos", "Eventos Esportivos e Desafios de Comunidade"],
      softSkills: ["Liderança Técnica", "Comunicação Inspiradora", "Visão de Experiência do Cliente", "Resolução de Conflitos"]
    },
    senior: {
      expectativa: "Lidera operações de academias, clubes, assessoria esportiva ou saúde integral de empresas.",
      hardSkills: ["Gestão Completa de Unidade Fitness / Clube (P&L, Churn, Ticket)", "Integração Multidisciplinar (Treino, Nutrição, Saúde Mental)", "Desenvolvimento de Metodologia Própria de Treinamento", "Parcerias com Marcas, Patrocínios e Convênios Corporativos", "Expansão de Serviços Digitais / Híbridos", "Auditoria de Qualidade Técnica e Segurança"],
      softSkills: ["Liderança de Equipes", "Visão de Negócio de Bem-Estar", "Tomada de Decisão", "Mentoria de Profissionais"]
    },
    especialista: {
      expectativa: "Referência em fisiologia do exercício, alto rendimento, biomecânica ou saúde preventiva.",
      hardSkills: ["Fisiologia do Alto Rendimento e Controle de Carga Avançado", "Biomecânica Aplicada e Análise Cinemática", "Programas de Longevidade e Medicina do Estilo de Vida", "Ciência de Dados Esportivos (Sports Analytics)", "Consultoria para Atletas Profissionais e Confederações", "Produção Científica e Formação de Treinadores"],
      softSkills: ["Rigor Científico", "Inovação em Performance", "Influência Técnica", "Comunicação Clara"]
    },
    gestor: {
      expectativa: "Dirige redes fitness, clubes esportivos ou programas corporativos de bem-estar em escala.",
      hardSkills: ["Estratégia de Expansão, Franquias e Novos Negócios de Bem-Estar", "Gestão Financeira Multi-unidade e Precificação de Planos", "Ecossistema Digital, App e Comunidade", "Relações Institucionais com Federações, Patrocinadores e RHs", "Governança de Saúde, Segurança e Qualidade", "Cultura de Hospitalidade e Resultado"],
      softSkills: ["Liderança Executiva", "Visão de Tendências de Saúde", "Negociação de Alto Nível", "Desenvolvimento de Líderes"]
    }
  }

};
