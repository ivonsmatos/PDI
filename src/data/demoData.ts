import type { PdiFields } from '../store/usePdiStore';

/**
 * Dados fictícios de exemplo usados no Modo Demonstração.
 * Representa um Dev Pleno de Tecnologia querendo ir para Sênior.
 */
export const DEMO_DATA: Omit<PdiFields, 'stepAtual'> = {
  usuario: {
    nome: 'Alex Demo',
    email: 'alex@demo.com',
    causa: 'Criar soluções que simplifiquem a vida das pessoas e ajudem equipes a entregar software de qualidade com menos estresse. Quero ser a referência técnica que eu gostaria de ter tido quando era júnior.',
    areaAtuacao: 'tecnologia',
    nivelCarreira: 'pleno',
  },
  inventario: {
    hardSkills: [
      { skill: 'Arquitetura de Software Básica',      nivelAtual: 3, nivelDesejado: 5 },
      { skill: 'Testes Automatizados (Unit/Integration)', nivelAtual: 4, nivelDesejado: 5 },
      { skill: 'Docker/Containers',                   nivelAtual: 3, nivelDesejado: 4 },
      { skill: 'Otimização de Queries',               nivelAtual: 2, nivelDesejado: 4 },
      { skill: 'Observabilidade e Logs (Datadog/New Relic)', nivelAtual: 2, nivelDesejado: 4 },
      { skill: 'Code Review e Boas Práticas',         nivelAtual: 4, nivelDesejado: 5 },
    ],
    softSkills: [
      { atributo: 'Resolução de Problemas',    pontoForteOuMelhoria: 'Forte',   exemplo: 'Resolvi bug crítico de produção que derrubava 30% das requisições.' },
      { atributo: 'Adaptabilidade',            pontoForteOuMelhoria: 'Forte',   exemplo: 'Migrei de PHP para TypeScript em 3 semanas sem interromper entregas.' },
      { atributo: 'Pensamento Crítico',        pontoForteOuMelhoria: 'Melhoria', exemplo: 'Preciso questionar mais premissas antes de aceitar soluções.' },
      { atributo: 'Comunicação Técnica com Não-Técnicos', pontoForteOuMelhoria: 'Melhoria', exemplo: 'Apresentar complexidade técnica para PMs ainda é um desafio.' },
    ],
  },
  objetivos: [
    {
      id: 'demo-obj-1',
      descricao: 'Obter certificação AWS Solutions Architect Associate até dezembro',
      prazo: 'medio',
      justificativa: 'Cloud é o requisito #1 para posições Sênior no mercado. Meu time já usa AWS e eu preciso dominar os serviços para liderar decisões de arquitetura.',
      categoria: 'educacional',
    },
    {
      id: 'demo-obj-2',
      descricao: 'Liderar tecnicamente 1 projeto de ponta a ponta com equipe de 3 devs',
      prazo: 'medio',
      justificativa: 'A experiência de liderança técnica é o gap mais citado em feedback para promoção a Sênior. Preciso de evidência concreta na próxima avaliação.',
      categoria: 'funcional',
    },
    {
      id: 'demo-obj-3',
      descricao: 'Fazer 5 sessões de mentoria com colega júnior e documentar aprendizagens',
      prazo: 'curto',
      justificativa: 'Ensinar solidifica o próprio conhecimento e demonstra maturidade técnica. É também a habilidade de mentoria requerida para o nível Sênior.',
      categoria: 'pessoal',
    },
  ],
  planoDeAcao: [
    {
      id: 'demo-ac-1',
      objetivoId: 'demo-obj-1',
      acao: 'Estudar 1h/dia pelo curso AWS Certified Solutions Architect — Adrian Cantrill',
      prazoData: new Date(Date.now() + 45 * 86400000).toISOString().slice(0, 10),
      recursos: 'Curso Adrian Cantrill (R$180), conta AWS free tier, 1h bloqueada no calendário toda manhã',
    },
    {
      id: 'demo-ac-2',
      objetivoId: 'demo-obj-1',
      acao: 'Fazer 2 simulados completos antes da prova e atingir >85%',
      prazoData: new Date(Date.now() + 80 * 86400000).toISOString().slice(0, 10),
      recursos: 'Plataforma TutorialsDojo (simulados AWS)',
    },
    {
      id: 'demo-ac-3',
      objetivoId: 'demo-obj-2',
      acao: 'Apresentar proposta de liderança técnica do projeto X para o tech lead',
      prazoData: new Date(Date.now() + 10 * 86400000).toISOString().slice(0, 10),
      recursos: 'Reunião 1:1 com tech lead, documento de escopo do projeto',
    },
    {
      id: 'demo-ac-4',
      objetivoId: 'demo-obj-2',
      acao: 'Criar ADRs (Architecture Decision Records) para as principais decisões do projeto',
      prazoData: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
      recursos: 'Template de ADR do GitHub, 2h por decisão importante',
    },
    {
      id: 'demo-ac-5',
      objetivoId: 'demo-obj-3',
      acao: 'Agendar sessão semanal de 45min com dev júnior Carla — foco: arquitetura limpa',
      prazoData: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      recursos: 'Livro Clean Architecture (Robert C. Martin), Google Meet',
    },
  ],
  campoDeForcas: {
    impulsionadoras: [
      'Empresa tem cultura de aprendizado e paga 50% de cursos',
      'Tech lead apoiador e aberto à liderança técnica distribuída',
      'Time motivado e entrega consistente há 6 meses',
    ],
    restritivas: [
      'Demanda alta de suporte dificulta bloco de estudo contínuo',
      'Reuniões em excesso fragmentam o foco diário',
      'Síndrome do impostor ao apresentar ideias de arquitetura',
    ],
    aliancas: 'Tech Lead Rafael — revisará ADRs e dará feedback semanal. Colega Bruna (Sênior) — parceira de estudos AWS e mentor informal. RH Juliana — garante acesso ao orçamento de capacitação.',
  },
};
