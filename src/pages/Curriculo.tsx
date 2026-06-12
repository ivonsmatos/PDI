import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { usePdiStore } from '../store/usePdiStore';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { Download, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const NIVEL_LABEL: Record<string, string> = {
  estagiario: 'Estagiário', junior: 'Júnior', pleno: 'Pleno',
  senior: 'Sênior', especialista: 'Especialista', gestor: 'Gestor',
};

const AREA_LABEL: Record<string, string> = {
  tecnologia: 'Tecnologia / Desenvolvimento',
  devops_infraestrutura: 'DevOps & Infraestrutura',
  seguranca_informacao: 'Segurança da Informação',
  qualidade_qa: 'Qualidade / QA',
  ciencia_de_dados: 'Ciência de Dados / BI',
  gestao_de_produto: 'Gestão de Produto',
  inovacao_transformacao_digital: 'Inovação & Transformação Digital',
  administracao: 'Administração',
  gestao: 'Gestão & Liderança',
  financas: 'Finanças',
  contabilidade: 'Contabilidade',
  compras_procurement: 'Compras & Procurement',
  logistica_supply_chain: 'Logística & Supply Chain',
  recursos_humanos: 'Recursos Humanos',
  marketing: 'Marketing',
  vendas: 'Vendas',
  customer_success: 'Customer Success',
  comunicacao_relacoes_publicas: 'Comunicação & Relações Públicas',
  design: 'Design / UX-UI',
  saude: 'Saúde',
  educacao: 'Educação',
  direito: 'Direito',
  engenharia: 'Engenharia',
  sustentabilidade_esg: 'Sustentabilidade & ESG',
  agronegocio: 'Agronegócio',
  varejo: 'Varejo & E-commerce',
};

const CAT_COLOR: Record<string, { bg: string; text: string }> = {
  educacional: { bg: '#dbeafe', text: '#1e40af' },
  funcional:   { bg: '#dcfce7', text: '#166534' },
  pessoal:     { bg: '#fce7f3', text: '#9d174d' },
};

export const Curriculo: React.FC = () => {
  const { usuario, inventario, objetivos, planoDeAcao, planoAcaoStatus, historico } = usePdiStore();
  const printRef = useRef<HTMLDivElement>(null);

  const radarData = inventario.hardSkills.map(s => ({
    subject: s.skill.length > 14 ? s.skill.slice(0, 14) + '…' : s.skill,
    atual: s.nivelAtual,
    meta: s.nivelDesejado,
    fullMark: 5,
  }));

  const softFortes = inventario.softSkills.filter(s => s.pontoForteOuMelhoria === 'Forte');
  const softMelhoria = inventario.softSkills.filter(s => s.pontoForteOuMelhoria === 'Melhoria');

  const acoesConc = Object.values(planoAcaoStatus).filter(v => v === 'concluido').length;
  const dataGer = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  const handleDownloadPDF = async () => {
    const el = printRef.current;
    if (!el) return;
    const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [canvas.width / 2, canvas.height / 2] });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.save(`Curriculo_Competencias_${usuario.nome || 'PDI'}_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="pb-24 lg:pb-0 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-500" /> Currículo de Competências
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Documento profissional para apresentar a recrutadores e avaliações de desempenho.
            </p>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" /> Baixar PDF
          </button>
        </div>
      </motion.div>

      {/* ── Documento imprimível ─────────────────────────────────────── */}
      <div ref={printRef} style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#fff', color: '#0f172a', padding: '40px', maxWidth: '760px', margin: '0 auto' }}>

        {/* Cabeçalho */}
        <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', borderRadius: '16px', padding: '32px 36px', marginBottom: '20px', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c7d2fe', fontWeight: 700, marginBottom: '6px' }}>
                Currículo de Competências
              </div>
              <h1 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                {usuario.nome || 'Profissional'}
              </h1>
              <p style={{ fontSize: '14px', color: '#a5b4fc', margin: 0 }}>
                {AREA_LABEL[usuario.areaAtuacao] || usuario.areaAtuacao}
                {usuario.nivelCarreira ? ` · ${NIVEL_LABEL[usuario.nivelCarreira] || usuario.nivelCarreira}` : ''}
              </p>
              {usuario.email && (
                <p style={{ fontSize: '12px', color: '#818cf8', margin: '4px 0 0' }}>{usuario.email}</p>
              )}
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[
                  { label: 'Objetivos', value: objetivos.length },
                  { label: 'Ações concluídas', value: acoesConc },
                  { label: 'Ações planejadas', value: planoDeAcao.length },
                  { label: 'Ciclos fechados', value: historico.length },
                ].map(m => (
                  <div key={m.label} style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '8px 12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 900 }}>{m.value}</div>
                    <div style={{ fontSize: '9px', color: '#c7d2fe', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Causa */}
          {usuario.causa && (
            <div style={{ marginTop: '20px', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '10px', borderLeft: '3px solid #818cf8' }}>
              <div style={{ fontSize: '9px', color: '#c7d2fe', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '4px' }}>Propósito / Causa</div>
              <p style={{ fontSize: '12px', color: '#e0e7ff', margin: 0, lineHeight: 1.55 }}>{usuario.causa}</p>
            </div>
          )}
        </div>

        {/* Hard Skills + Radar */}
        {radarData.length > 0 && (
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Hard Skills
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {inventario.hardSkills.map(s => {
                    const pct = Math.round((s.nivelAtual / 5) * 100);
                    return (
                      <div key={s.skill}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 600, color: '#334155' }}>{s.skill}</span>
                          <span style={{ fontSize: '10px', color: '#64748b' }}>{s.nivelAtual}/5</span>
                        </div>
                        <div style={{ height: '6px', backgroundColor: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, backgroundColor: s.nivelAtual >= 4 ? '#10b981' : s.nivelAtual >= 3 ? '#6366f1' : '#f59e0b', borderRadius: '99px' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ width: '200px', height: '200px', flexShrink: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#64748b' }} />
                    <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
                    <Radar name="meta" dataKey="meta" stroke="#c7d2fe" fill="#c7d2fe" fillOpacity={0.3} />
                    <Radar name="atual" dataKey="atual" stroke="#6366f1" fill="#6366f1" fillOpacity={0.55} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Soft Skills */}
        {(softFortes.length > 0 || softMelhoria.length > 0) && (
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Soft Skills
            </h2>
            <div style={{ display: 'flex', gap: '24px' }}>
              {softFortes.length > 0 && (
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '10px', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px' }}>✓ Pontos Fortes</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {softFortes.map(s => (
                      <span key={s.atributo} style={{ backgroundColor: '#d1fae5', color: '#065f46', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '99px', border: '1px solid #a7f3d0' }}>
                        {s.atributo}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {softMelhoria.length > 0 && (
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '10px', fontWeight: 700, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px' }}>⚠ Em Desenvolvimento</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {softMelhoria.map(s => (
                      <span key={s.atributo} style={{ backgroundColor: '#fef3c7', color: '#92400e', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '99px', border: '1px solid #fcd34d' }}>
                        {s.atributo}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Objetivos estratégicos */}
        {objetivos.length > 0 && (
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Objetivos Estratégicos
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {objetivos.map((o, i) => {
                const colors = CAT_COLOR[o.categoria] ?? { bg: '#f1f5f9', text: '#334155' };
                const acoesObj = planoDeAcao.filter(a => a.objetivoId === o.id);
                const concObj = acoesObj.filter(a => planoAcaoStatus[a.id] === 'concluido').length;
                return (
                  <div key={o.id} style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '12px 14px', borderLeft: `3px solid ${colors.bg === '#dbeafe' ? '#3b82f6' : colors.bg === '#dcfce7' ? '#22c55e' : '#ec4899'}` }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', margin: 0, lineHeight: 1.4 }}>
                        {i + 1}. {o.descricao}
                      </p>
                      <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                        <span style={{ backgroundColor: colors.bg, color: colors.text, fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '99px', textTransform: 'uppercase' }}>
                          {o.categoria}
                        </span>
                        <span style={{ backgroundColor: '#f1f5f9', color: '#64748b', fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '99px' }}>
                          {o.prazo === 'curto' ? '≤3m' : o.prazo === 'medio' ? '3-12m' : '1a+'}
                        </span>
                      </div>
                    </div>
                    {acoesObj.length > 0 && (
                      <p style={{ fontSize: '10px', color: '#64748b', margin: '6px 0 0' }}>
                        {concObj}/{acoesObj.length} ações concluídas
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Rodapé */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>
            Gerado em {dataGer} · <strong>Meu PDI</strong> — plataforma de desenvolvimento profissional
          </p>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[
              { label: `${inventario.hardSkills.length} hard skills`, bg: '#ede9fe', color: '#5b21b6' },
              { label: `${inventario.softSkills.length} soft skills`, bg: '#ecfdf5', color: '#065f46' },
              { label: `${historico.length} ciclo(s)`, bg: '#fff7ed', color: '#9a3412' },
            ].map(b => (
              <span key={b.label} style={{ backgroundColor: b.bg, color: b.color, fontSize: '9px', fontWeight: 700, padding: '3px 8px', borderRadius: '99px' }}>{b.label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
