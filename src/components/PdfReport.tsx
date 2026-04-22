import React, { forwardRef, useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import type { PdiFields } from '../store/usePdiStore';

const DICIONARIO_MENTORIA: Record<string, { titulo: string; sugestao: string }> = {
  "Inteligência Emocional": {
    titulo: "Livro: Inteligência Emocional (Daniel Goleman)",
    sugestao: "Antes de responder mensagens difíceis, espere 10 minutos. Nomeie a emoção que sentiu antes de agir. Pratique essa pausa consciente por 30 dias — ela muda o padrão de reatividade.",
  },
  "Capacidade de lidar com ambiguidade": {
    titulo: "Prática: A Técnica da Única Métrica",
    sugestao: "Quando tudo for incerto, defina qual é a ÚNICA métrica que importa agora e proteja-a de distrações. Escreva-a num post-it visível no seu espaço de trabalho.",
  },
  "Trabalho em Equipe": {
    titulo: "Ação Prática: 1:1 Informal",
    sugestao: "Agende um café de 15 min com uma pessoa diferente do seu time a cada 2 semanas — só para ouvir. Você vai descobrir bloqueios que ninguém leva pra reunião formal.",
  },
  "Comunicação": {
    titulo: "Livro: Comunicação Não-Violenta (Marshall Rosenberg)",
    sugestao: "Ao dar feedback ou fazer pedidos, estruture sempre em 4 camadas: Fato objetivo → Impacto → Necessidade → Pedido concreto. Treine isso em mensagens escritas antes de aplicar ao vivo.",
  },
  "Visão Sistêmica": {
    titulo: "Exercício: Leia os OKRs da empresa",
    sugestao: "Entenda os objetivos do seu gestor e do gestor dele. Em toda tarefa, pergunte-se: como meu trabalho impacta esses números? Esse é o músculo que separa executor de estrategista.",
  },
  "Capacidade de estabelecer network": {
    titulo: "Hábito: Reconecte 2 contatos por mês",
    sugestao: "Toda semana, envie uma mensagem genuína para alguém da sua rede — um artigo relevante, um parabéns por conquista. Networking é consistência, não intensidade.",
  },
  "Capacidade de aprender": {
    titulo: "Método: Feynman Technique",
    sugestao: "Após estudar algo, explique para uma criança de 12 anos. Se travar, voltou ao ponto onde há lacuna de entendimento. Estude ali até destravar.",
  },
  "Capacidade de mudar (Adaptabilidade)": {
    titulo: "Mentalidade: Growth Mindset (Carol Dweck)",
    sugestao: "Substitua 'Não sei fazer isso' por 'Ainda não sei fazer isso'. A mudança começa na linguagem que você usa consigo. Toque esse reset por 21 dias.",
  },
  "Proatividade": {
    titulo: "Framework: Regra dos 2 Minutos (GTD)",
    sugestao: "Se uma tarefa leva menos de 2 minutos, faça agora. Para as demais, bloqueie 1h por semana para agir em coisas que importam mas não são urgentes.",
  },
};

const FORTE_LEVERAGE: Record<string, string> = {
  "Inteligência Emocional": "Use essa força para mediar conflitos no time. Ofereça-se para conversas difíceis que outros evitam — essa é a habilidade mais rara em ambientes sob pressão.",
  "Capacidade de lidar com ambiguidade": "Ofereça-se para projetos early-stage e iniciativas sem playbook. É onde você brilha e quem resolve ambiguidade vira referência estratégica rapidamente.",
  "Trabalho em Equipe": "Assuma papel de facilitador em cerimônias e reuniões cross-time. Transforme isso em legado: documente rituais que funcionam.",
  "Comunicação": "Candidate-se para apresentações a lideranças e comitês. Escrita e fala clara é o acelerador de carreira mais subestimado.",
  "Visão Sistêmica": "Ofereça-se para mapear processos cross-área. Quem enxerga o todo é naturalmente chamado para decisões estratégicas.",
  "Capacidade de estabelecer network": "Use sua rede para destravar negócios e conectar pessoas. Mantenha um CRM pessoal simples dos contatos-chave.",
  "Capacidade de aprender": "Vire o 'early adopter' oficial de tecnologias e metodologias no seu time. Compartilhe descobertas em lightning talks internas.",
  "Capacidade de mudar (Adaptabilidade)": "Voluntarie-se para projetos de transformação e transições difíceis. Você é a pessoa certa quando tudo muda.",
  "Proatividade": "Identifique 1 problema silencioso por mês e resolva antes que escale. Documente o antes/depois — isso vira seu portfólio tácito.",
};

type Props = {
  usuario: PdiFields['usuario'];
  inventario: PdiFields['inventario'];
  objetivos: PdiFields['objetivos'];
  planoDeAcao: PdiFields['planoDeAcao'];
  campoDeForcas: PdiFields['campoDeForcas'];
  scoreSaude: number;
};

const pageStyle: React.CSSProperties = {
  width: '760px',
  backgroundColor: '#ffffff',
  color: '#0f172a',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  padding: '32px 40px',
  boxSizing: 'border-box',
};

const sectionStyle: React.CSSProperties = {
  width: '100%',
  padding: '24px',
  borderRadius: '16px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  boxSizing: 'border-box',
  marginBottom: '16px',
  pageBreakInside: 'avoid',
  breakInside: 'avoid',
};

const h2Style: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 800,
  color: '#1e293b',
  margin: '0 0 4px 0',
};

const subStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#64748b',
  margin: '0 0 16px 0',
};

const pStyle: React.CSSProperties = {
  fontSize: '13px',
  lineHeight: 1.55,
  color: '#334155',
  margin: 0,
};

const chipStyle = (bg: string, fg: string): React.CSSProperties => ({
  display: 'inline-block',
  backgroundColor: bg,
  color: fg,
  fontSize: '10px',
  fontWeight: 700,
  padding: '3px 8px',
  borderRadius: '999px',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginRight: '6px',
});

const prazoLabel = (p: string) =>
  p === 'curto' ? 'Curto prazo' : p === 'medio' ? 'Médio prazo' : p === 'longo' ? 'Longo prazo' : 'Sem prazo';

const categoriaLabel = (c: string) =>
  c === 'educacional' ? 'Educacional' : c === 'funcional' ? 'Funcional' : c === 'pessoal' ? 'Pessoal' : 'Geral';

const categoriaColor = (c: string) =>
  c === 'educacional' ? { bg: '#e0f2fe', fg: '#075985' } :
  c === 'funcional' ? { bg: '#dcfce7', fg: '#166534' } :
  c === 'pessoal' ? { bg: '#fce7f3', fg: '#9d174d' } :
  { bg: '#e2e8f0', fg: '#334155' };

export const PdfReport = forwardRef<HTMLDivElement, Props>(({
  usuario, inventario, objetivos, planoDeAcao, campoDeForcas, scoreSaude,
}, ref) => {
  const dataCiclo = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  const dataRadar = useMemo(() => inventario.hardSkills.map(s => ({
    subject: s.skill,
    Atual: s.nivelAtual,
    Meta: s.nivelDesejado,
    fullMark: 5,
  })), [inventario.hardSkills]);

  const hardSkillsGap = inventario.hardSkills
    .map(s => ({ ...s, gap: s.nivelDesejado - s.nivelAtual }))
    .filter(s => s.gap > 0)
    .sort((a, b) => b.gap - a.gap);

  const hardSkillsFortes = inventario.hardSkills.filter(s => s.nivelAtual >= 4 || s.nivelAtual >= s.nivelDesejado);
  const softFortes = inventario.softSkills.filter(s => s.pontoForteOuMelhoria === 'Forte');
  const softMelhorias = inventario.softSkills.filter(s => s.pontoForteOuMelhoria === 'Melhoria');

  const saudeCor = scoreSaude > 80 ? '#059669' : scoreSaude > 50 ? '#d97706' : '#e11d48';
  const saudeTexto = scoreSaude > 80
    ? 'Plano equilibrado e viável. Você tem clareza de objetivos, ações com recursos alocados e barreiras mapeadas.'
    : scoreSaude > 50
    ? 'Plano parcialmente estruturado. Alguns objetivos não têm ações, ou faltam recursos definidos. Revise antes de executar.'
    : 'Plano com lacunas críticas. Volte ao wizard e preencha: ações por objetivo, recursos e fatores restritivos.';

  // Custom tick para renderizar labels completos e quebrar em 2 linhas se necessário
  const renderTick = (props: any) => {
    const payload = props?.payload;
    const x = Number(props?.x) || 0;
    const y = Number(props?.y) || 0;
    const textAnchor = (props?.textAnchor as 'start' | 'middle' | 'end' | 'inherit' | undefined) || 'middle';
    const value: string = payload?.value || '';
    const words = value.split(' ');
    const lines: string[] = [];
    let current = '';
    const maxLen = 16;
    words.forEach(w => {
      if ((current + ' ' + w).trim().length > maxLen && current) {
        lines.push(current.trim());
        current = w;
      } else {
        current = (current + ' ' + w).trim();
      }
    });
    if (current) lines.push(current);
    return (
      <text x={x} y={y} textAnchor={textAnchor} fill="#334155" fontSize={11} fontWeight={600}>
        {lines.map((line, i) => (
          <tspan key={i} x={x} dy={i === 0 ? 0 : 13}>{line}</tspan>
        ))}
      </text>
    );
  };

  return (
    <div ref={ref} style={pageStyle}>
      {/* CAPA */}
      <div data-pdf-section style={{ ...sectionStyle, background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: '#fff', border: 'none', padding: '40px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c7d2fe', fontWeight: 700, marginBottom: '8px' }}>
          Plano de Desenvolvimento Individual
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
          {usuario.nome || 'Meu PDI'}
        </h1>
        <div style={{ fontSize: '13px', color: '#a5b4fc', marginBottom: '24px' }}>
          Ciclo gerado em {dataCiclo}
        </div>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c7d2fe', fontWeight: 700, marginBottom: '6px' }}>
            Causa raiz do ciclo
          </div>
          <div style={{ fontSize: '14px', lineHeight: 1.5, color: '#f1f5f9' }}>
            {usuario.causa || 'Sem causa raiz definida. Volte ao Passo 1 do wizard para documentar o gatilho deste PDI.'}
          </div>
        </div>
      </div>

      {/* RESUMO EXECUTIVO */}
      <div data-pdf-section style={sectionStyle}>
        <h2 style={h2Style}>Resumo Executivo</h2>
        <p style={subStyle}>Visão geral do plano, saúde e volume de iniciativas.</p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <div style={{ flex: 1, padding: '14px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Objetivos</div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#1e293b' }}>{objetivos.length}</div>
          </div>
          <div style={{ flex: 1, padding: '14px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Ações Planejadas</div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#1e293b' }}>{planoDeAcao.length}</div>
          </div>
          <div style={{ flex: 1, padding: '14px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Saúde do PDI</div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: saudeCor }}>{scoreSaude}%</div>
          </div>
        </div>

        <div style={{ padding: '14px', backgroundColor: '#f1f5f9', borderRadius: '12px', borderLeft: `4px solid ${saudeCor}` }}>
          <p style={pStyle}>{saudeTexto}</p>
        </div>
      </div>

      {/* RADAR DE HARD SKILLS */}
      {dataRadar.length > 0 && (
        <div data-pdf-section style={sectionStyle}>
          <h2 style={h2Style}>Radar de Hard Skills</h2>
          <p style={subStyle}>Comparativo entre nível atual e meta desejada. Quanto maior a distância entre o polígono azul-escuro (atual) e o azul-claro (meta), maior o gap a atacar.</p>

          <div style={{ width: '100%', height: '380px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={dataRadar} margin={{ top: 30, right: 60, bottom: 30, left: 60 }}>
                <PolarGrid stroke="#cbd5e1" />
                <PolarAngleAxis dataKey="subject" tick={renderTick} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Radar name="Nível Atual" dataKey="Atual" stroke="#1e40af" fill="#1e40af" fillOpacity={0.65} />
                <Radar name="Meta Desejada" dataKey="Meta" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.35} />
                <Legend verticalAlign="bottom" height={28} iconType="circle" wrapperStyle={{ fontSize: 12, fontWeight: 600, color: '#334155' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '8px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#334155' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#1e40af', display: 'inline-block' }} />
              <strong>Azul escuro = Nível Atual</strong> (onde você está hoje)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#334155' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#60a5fa', display: 'inline-block' }} />
              <strong>Azul claro = Meta</strong> (nível desejado ao final do ciclo)
            </div>
          </div>
        </div>
      )}

      {/* DIAGNÓSTICO DE HARD SKILLS */}
      {hardSkillsGap.length > 0 && (
        <div data-pdf-section style={sectionStyle}>
          <h2 style={h2Style}>Diagnóstico de Hard Skills — Onde Atacar</h2>
          <p style={subStyle}>Gaps ordenados por distância. Priorize os maiores ou os que destravam seus objetivos imediatos.</p>

          {hardSkillsGap.map((s, i) => {
            const prioridade = s.gap >= 3 ? { label: 'Alta prioridade', bg: '#fee2e2', fg: '#991b1b' }
              : s.gap === 2 ? { label: 'Média prioridade', bg: '#fef3c7', fg: '#92400e' }
              : { label: 'Baixa prioridade', bg: '#dcfce7', fg: '#166534' };
            return (
              <div key={i} style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '10px', backgroundColor: '#fafbfc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{s.skill}</div>
                  <span style={chipStyle(prioridade.bg, prioridade.fg)}>{prioridade.label}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>
                  Nível atual: <strong style={{ color: '#334155' }}>{s.nivelAtual}/5</strong>  →  Meta: <strong style={{ color: '#334155' }}>{s.nivelDesejado}/5</strong>  (Gap: {s.gap} níveis)
                </div>
                <p style={pStyle}>
                  <strong>Como evoluir:</strong> reserve {s.gap >= 3 ? '4 a 6 horas semanais' : s.gap === 2 ? '2 a 3 horas semanais' : '1 a 2 horas semanais'} para esta skill. Combine teoria (curso ou documentação) + prática aplicada num projeto real. Ao final de cada mês, valide o progresso com alguém mais experiente.
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* PONTOS FORTES */}
      {(softFortes.length > 0 || hardSkillsFortes.length > 0) && (
        <div data-pdf-section style={sectionStyle}>
          <h2 style={h2Style}>Pontos Fortes — O que Alavancar</h2>
          <p style={subStyle}>Estas são suas vantagens competitivas. Use-as a seu favor em projetos e decisões de carreira.</p>

          {softFortes.map((s, i) => (
            <div key={i} style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', marginBottom: '10px' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                Soft skill · Ponto forte
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#064e3b', marginBottom: '6px' }}>{s.atributo}</div>
              {s.exemplo && (
                <p style={{ ...pStyle, fontStyle: 'italic', color: '#065f46', marginBottom: '8px' }}>
                  "{s.exemplo}"
                </p>
              )}
              <p style={pStyle}>
                <strong>Como usar a seu favor:</strong> {FORTE_LEVERAGE[s.atributo] || 'Identifique situações recorrentes onde esta força entrega resultado e proponha-se ativamente para elas. Peça feedback a seu gestor para tornar essa força visível.'}
              </p>
            </div>
          ))}

          {hardSkillsFortes.map((s, i) => (
            <div key={`h-${i}`} style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={chipStyle('#dcfce7', '#166534')}>Hard skill consolidada</span>
                  <strong style={{ fontSize: '13px', color: '#14532d' }}>{s.skill}</strong>
                </div>
                <div style={{ fontSize: '12px', color: '#166534', fontWeight: 700 }}>{s.nivelAtual}/5</div>
              </div>
              <p style={{ ...pStyle, marginTop: '6px', color: '#166534' }}>
                Use esta skill como <strong>diferencial em entrevistas, avaliações e para mentorar colegas</strong>. Documente 1 caso de sucesso concreto onde ela foi decisiva.
              </p>
            </div>
          ))}
        </div>
      )}

      {/* PONTOS A DESENVOLVER */}
      {softMelhorias.length > 0 && (
        <div data-pdf-section style={sectionStyle}>
          <h2 style={h2Style}>Pontos a Desenvolver — Plano de Melhoria</h2>
          <p style={subStyle}>Atributos que, uma vez fortalecidos, destravam seu próximo nível. Trate como prioridade — estão no caminho crítico.</p>

          {softMelhorias.map((s, i) => {
            const dic = DICIONARIO_MENTORIA[s.atributo];
            return (
              <div key={i} style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#fef3c7', border: '1px solid #fde68a', marginBottom: '10px' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  Soft skill · A desenvolver
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#78350f', marginBottom: '6px' }}>{s.atributo}</div>
                {s.exemplo && (
                  <p style={{ ...pStyle, fontStyle: 'italic', color: '#92400e', marginBottom: '8px' }}>
                    Situação que disparou o alerta: "{s.exemplo}"
                  </p>
                )}
                <div style={{ padding: '10px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #fde68a' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#92400e', marginBottom: '4px' }}>
                    🎯 {dic ? dic.titulo : `Desenvolver: ${s.atributo}`}
                  </div>
                  <p style={pStyle}>
                    {dic ? dic.sugestao : 'Procure livros e cases práticos sobre o tema. Observe como líderes que você respeita aplicam este atributo e modele o comportamento por 30 dias antes de avaliar.'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* OBJETIVOS */}
      {objetivos.length > 0 && (
        <div data-pdf-section style={sectionStyle}>
          <h2 style={h2Style}>Objetivos Estratégicos</h2>
          <p style={subStyle}>O norte do ciclo. Cada objetivo deve ter ao menos 1 ação concreta e recursos alocados.</p>

          {objetivos.map((o, i) => {
            const cor = categoriaColor(o.categoria);
            const acoesDoObj = planoDeAcao.filter(a => a.objetivoId === o.id).length;
            return (
              <div key={o.id} style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '10px', backgroundColor: '#ffffff' }}>
                <div style={{ marginBottom: '6px' }}>
                  <span style={chipStyle(cor.bg, cor.fg)}>{categoriaLabel(o.categoria)}</span>
                  <span style={chipStyle('#e0e7ff', '#3730a3')}>{prazoLabel(o.prazo)}</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                  {i + 1}. {o.descricao}
                </div>
                {o.justificativa && (
                  <p style={{ ...pStyle, marginBottom: '6px' }}>
                    <strong>Por quê:</strong> {o.justificativa}
                  </p>
                )}
                <p style={{ fontSize: '11px', color: acoesDoObj === 0 ? '#be123c' : '#64748b', fontWeight: 600 }}>
                  {acoesDoObj === 0
                    ? '⚠️ Nenhuma ação vinculada — objetivo sem plano de execução.'
                    : `✓ ${acoesDoObj} ação${acoesDoObj > 1 ? 'ões' : ''} vinculada${acoesDoObj > 1 ? 's' : ''}.`}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* PLANO DE AÇÃO */}
      {planoDeAcao.length > 0 && (
        <div data-pdf-section style={sectionStyle}>
          <h2 style={h2Style}>Plano de Ação Tático</h2>
          <p style={subStyle}>O "como" dos objetivos. Cada ação é atômica, tem prazo e recursos definidos.</p>

          {planoDeAcao.map((a, i) => {
            const obj = objetivos.find(o => o.id === a.objetivoId);
            return (
              <div key={a.id} style={{ padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '8px', backgroundColor: '#fafbfc' }}>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>
                  Ação #{i + 1} · vinculada a: {obj?.descricao.slice(0, 60) || 'objetivo'}{obj && obj.descricao.length > 60 ? '...' : ''}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>{a.acao}</div>
                <div style={{ fontSize: '12px', color: '#475569', marginBottom: '2px' }}>
                  <strong>Prazo:</strong> {a.prazoData ? new Date(a.prazoData).toLocaleDateString('pt-BR') : 'Sem prazo'}
                </div>
                <div style={{ fontSize: '12px', color: '#475569' }}>
                  <strong>Recursos:</strong> {a.recursos || '— sem recursos definidos —'}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CAMPO DE FORÇAS */}
      <div data-pdf-section style={sectionStyle}>
        <h2 style={h2Style}>Campo de Forças</h2>
        <p style={subStyle}>Forças que aceleram (impulsionadoras) versus forças que travam (restritivas). O equilíbrio entre elas determina se o plano avança.</p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          <div style={{ flex: 1, padding: '14px', backgroundColor: '#ecfdf5', borderRadius: '10px', border: '1px solid #a7f3d0' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              ⬆ Impulsionadoras ({campoDeForcas.impulsionadoras.length})
            </div>
            {campoDeForcas.impulsionadoras.length > 0 ? (
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', lineHeight: 1.6, color: '#065f46' }}>
                {campoDeForcas.impulsionadoras.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            ) : (
              <p style={{ ...pStyle, color: '#065f46' }}>Sem impulsionadoras mapeadas.</p>
            )}
          </div>
          <div style={{ flex: 1, padding: '14px', backgroundColor: '#fef2f2', borderRadius: '10px', border: '1px solid #fecaca' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#991b1b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              ⬇ Restritivas ({campoDeForcas.restritivas.length})
            </div>
            {campoDeForcas.restritivas.length > 0 ? (
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', lineHeight: 1.6, color: '#991b1b' }}>
                {campoDeForcas.restritivas.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            ) : (
              <p style={{ ...pStyle, color: '#991b1b' }}>⚠️ Nenhuma barreira mapeada — cuidado com falso otimismo.</p>
            )}
          </div>
        </div>

        <div style={{ padding: '12px 14px', backgroundColor: '#eff6ff', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#1e3a8a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
            🤝 Alianças Estratégicas
          </div>
          <p style={{ ...pStyle, color: '#1e3a8a' }}>
            {campoDeForcas.aliancas || 'Sem alianças mapeadas. Identifique 2 a 3 pessoas (gestor, mentor, par) que podem destravar seu plano e formalize o pedido de apoio.'}
          </p>
        </div>

        <div style={{ marginTop: '12px', padding: '12px 14px', backgroundColor: '#f8fafc', borderRadius: '10px', borderLeft: '4px solid #6366f1' }}>
          <p style={{ ...pStyle, fontStyle: 'italic' }}>
            <strong>Leitura estratégica:</strong> {campoDeForcas.impulsionadoras.length > campoDeForcas.restritivas.length
              ? 'Você tem mais forças a favor do que contra. Mantenha atenção às restrições para que não ganhem peso.'
              : campoDeForcas.impulsionadoras.length < campoDeForcas.restritivas.length
              ? 'As restrições superam as forças favoráveis. Dedique as primeiras semanas do ciclo para neutralizar pelo menos uma barreira antes de acelerar execução.'
              : 'Forças equilibradas. Qualquer amplificação de impulsionadora ou neutralização de restritiva vira alavanca decisiva.'}
          </p>
        </div>
      </div>

      {/* TIMELINE */}
      {planoDeAcao.length > 0 && (
        <div data-pdf-section style={sectionStyle}>
          <h2 style={h2Style}>Timeline · Mapa da Mina</h2>
          <p style={subStyle}>Execução ordenada pela linha do tempo.</p>

          <div style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px solid #e0e7ff' }}>
            {[...planoDeAcao].sort((a, b) => new Date(a.prazoData).getTime() - new Date(b.prazoData).getTime()).map((a) => {
              const obj = objetivos.find(o => o.id === a.objetivoId);
              return (
                <div key={a.id} style={{ position: 'relative', marginBottom: '14px', paddingLeft: '8px' }}>
                  <div style={{ position: 'absolute', left: '-26px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffffff', border: '3px solid #6366f1' }} />
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#4f46e5', marginBottom: '2px' }}>
                    {a.prazoData ? new Date(a.prazoData).toLocaleDateString('pt-BR') : 'Sem prazo'}
                    <span style={{ color: '#94a3b8', fontWeight: 600, marginLeft: '8px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {categoriaLabel(obj?.categoria || '')}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{a.acao}</div>
                  {a.recursos && <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Recurso: {a.recursos}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MENSAGEM FINAL */}
      <div data-pdf-section style={{ ...sectionStyle, background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)', border: '1px solid #c7d2fe' }}>
        <h2 style={{ ...h2Style, color: '#312e81' }}>Mensagem do Mentor</h2>
        <p style={{ ...pStyle, color: '#3730a3', marginBottom: '10px' }}>
          {usuario.nome?.split(' ')[0] || 'Profissional'}, este PDI não é um documento para arquivar — é um contrato com você mesmo.
        </p>
        <p style={{ ...pStyle, color: '#3730a3', marginBottom: '10px' }}>
          <strong>Revise a cada 30 dias</strong> este plano. Atualize o que mudou, marque o que evoluiu, reescreva o que perdeu sentido. Plano que não é revisitado morre em 90 dias — é lei.
        </p>
        <p style={{ ...pStyle, color: '#3730a3' }}>
          Sua saúde de PDI hoje é <strong style={{ color: saudeCor }}>{scoreSaude}%</strong>. Fecha o próximo ciclo com no mínimo <strong>+15 pontos</strong>.
        </p>
      </div>

      <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '10px', color: '#94a3b8' }}>
        Gerado em {dataCiclo} · Plano de Desenvolvimento Individual
      </div>
    </div>
  );
});

PdfReport.displayName = 'PdfReport';
