import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePdiStore } from '../store/usePdiStore';
import { useToastStore } from '../store/useToastStore';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { Download, FileText, Eye, Loader2 } from 'lucide-react';
import { RadarSkillTick } from '../components/RadarSkillTick';
import { AREA_LABEL_MAP as AREA_LABEL } from '../data/areas';
import { trackEvent } from '../lib/analytics';

const NIVEL_LABEL: Record<string, string> = {
  estagiario: 'Estagiário', junior: 'Júnior', pleno: 'Pleno',
  senior: 'Sênior', especialista: 'Especialista', gestor: 'Gestor',
};

const CAT_COLOR: Record<string, { bg: string; text: string }> = {
  educacional: { bg: '#dbeafe', text: '#1e40af' },
  funcional:   { bg: '#dcfce7', text: '#166534' },
  pessoal:     { bg: '#fce7f3', text: '#9d174d' },
};

export const Curriculo: React.FC = () => {
  const { usuario, inventario, objetivos, planoDeAcao, planoAcaoStatus, historico, diario, publicProfileId, incrementMetric } = usePdiStore();
  const { addToast } = useToastStore();
  const printRef = useRef<HTMLDivElement>(null);

  // Privacidade: e-mail fica desmarcado por padrão antes de exportar/exibir
  const [incluirEmail, setIncluirEmail] = useState(false);
  const [incluirProposito, setIncluirProposito] = useState(true);
  const [incluirObjetivos, setIncluirObjetivos] = useState(true);
  const [incluirContadores, setIncluirContadores] = useState(true);
  const [incluirAcoesEvidencias, setIncluirAcoesEvidencias] = useState(true);
  const [incluirExemplosSoft, setIncluirExemplosSoft] = useState(true);
  const [incluirDiario, setIncluirDiario] = useState(true);
  const [incluirHistoricoCiclos, setIncluirHistoricoCiclos] = useState(true);
  const [incluirPerfilPublico, setIncluirPerfilPublico] = useState(true);
  const [gerandoPdf, setGerandoPdf] = useState(false);

  const radarData = inventario.hardSkills.map(s => ({
    subject: s.skill,
    atual: s.nivelAtual,
    meta: s.nivelDesejado,
    fullMark: 5,
  }));

  const mediaHardAtual = inventario.hardSkills.length > 0
    ? (inventario.hardSkills.reduce((acc, s) => acc + s.nivelAtual, 0) / inventario.hardSkills.length).toFixed(1)
    : null;
  const mediaHardMeta = inventario.hardSkills.length > 0
    ? (inventario.hardSkills.reduce((acc, s) => acc + s.nivelDesejado, 0) / inventario.hardSkills.length).toFixed(1)
    : null;

  const softFortes = inventario.softSkills.filter(s => s.pontoForteOuMelhoria === 'Forte');
  const softMelhoria = inventario.softSkills.filter(s => s.pontoForteOuMelhoria === 'Melhoria');
  const softComExemplo = inventario.softSkills.filter(s => s.exemplo?.trim());

  const acoesOrdenadas = [...planoDeAcao].sort((a, b) => {
    const rank = (id: string) => {
      const st = planoAcaoStatus[id] ?? 'pendente';
      return st === 'concluido' ? 0 : st === 'em_andamento' ? 1 : st === 'pendente' ? 2 : 3;
    };
    return rank(a.id) - rank(b.id);
  });

  const destaquesDiario = [...diario]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 4);

  const acoesConc = Object.values(planoAcaoStatus).filter(v => v === 'concluido').length;
  const dataGer = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  const publicProfileUrl = publicProfileId ? `https://meupdi.app.br/p/${publicProfileId}` : '';

  const handleDownloadPDF = async () => {
    const el = printRef.current;
    if (!el || gerandoPdf) return;
    setGerandoPdf(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [canvas.width / 2, canvas.height / 2] });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      const nomeLimpo = (usuario.nome || 'PDI')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9_-]+/g, '_')
        .replace(/^_+|_+$/g, '') || 'PDI';
      pdf.save(`Curriculo_Competencias_${nomeLimpo}_${new Date().toISOString().slice(0, 10)}.pdf`);
      incrementMetric('exportacoesPdf');
      trackEvent('pdf_exported', { origin: 'curriculo' });
      addToast('PDF gerado e enviado para download.', 'success');
    } catch (err) {
      console.error('[Curriculo] Falha ao gerar PDF:', err);
      addToast('Não foi possível gerar o PDF. Tente novamente.', 'error');
    } finally {
      setGerandoPdf(false);
    }
  };

  return (
    <div className="pb-24 lg:pb-0 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-500" /> Currículo de Competências
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Documento profissional para apresentar a recrutadores e avaliações de desempenho.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={gerandoPdf}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
          >
            {gerandoPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {gerandoPdf ? 'Preparando PDF…' : 'Baixar PDF'}
          </button>
        </div>

        {/* Controle de visibilidade antes de exportar */}
        <div className="mt-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
          <p className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-indigo-500" /> Visibilidade no currículo e no PDF
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-700 dark:text-slate-200">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={incluirEmail} onChange={e => setIncluirEmail(e.target.checked)} className="rounded text-indigo-600" />
              E-mail ({usuario.email || 'não informado'})
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={incluirProposito} onChange={e => setIncluirProposito(e.target.checked)} className="rounded text-indigo-600" />
              Propósito / Causa
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={incluirObjetivos} onChange={e => setIncluirObjetivos(e.target.checked)} className="rounded text-indigo-600" />
              Objetivos estratégicos
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={incluirContadores} onChange={e => setIncluirContadores(e.target.checked)} className="rounded text-indigo-600" />
              Contadores de progresso
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={incluirExemplosSoft} onChange={e => setIncluirExemplosSoft(e.target.checked)} className="rounded text-indigo-600" />
              Exemplos de Soft Skills
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={incluirAcoesEvidencias} onChange={e => setIncluirAcoesEvidencias(e.target.checked)} className="rounded text-indigo-600" />
              Ações e evidências
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={incluirDiario} onChange={e => setIncluirDiario(e.target.checked)} className="rounded text-indigo-600" />
              Destaques do diário
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={incluirHistoricoCiclos} onChange={e => setIncluirHistoricoCiclos(e.target.checked)} className="rounded text-indigo-600" />
              Histórico de ciclos
            </label>
            {publicProfileId && (
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={incluirPerfilPublico} onChange={e => setIncluirPerfilPublico(e.target.checked)} className="rounded text-indigo-600" />
                Link do perfil público
              </label>
            )}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Este documento reflete a sua autoavaliação. O Meu PDI organiza seus registros, mas não autentica automaticamente as competências.
          </p>
        </div>
      </motion.div>

      {/* ── Documento imprimível ─────────────────────────────────────── */}
      <div ref={printRef} style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#fff', color: '#0f172a', padding: '40px', maxWidth: '760px', margin: '0 auto' }}>

        {/* Cabeçalho */}
        <div style={{ background: 'linear-gradient(135deg, #51266E 0%, #017AA1 100%)', borderRadius: '16px', padding: '32px 36px', marginBottom: '20px', color: '#fff' }}>
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
              {incluirEmail && usuario.email && (
                <p style={{ fontSize: '12px', color: '#818cf8', margin: '4px 0 0' }}>{usuario.email}</p>
              )}
              {incluirPerfilPublico && publicProfileUrl && (
                <p style={{ fontSize: '11px', color: '#c7d2fe', margin: '4px 0 0' }}>
                  Perfil público: <span style={{ color: '#e0e7ff', textDecoration: 'underline' }}>{publicProfileUrl}</span>
                </p>
              )}
            </div>
            {incluirContadores && (
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
            )}
          </div>

          {/* Causa */}
          {incluirProposito && usuario.causa && (
            <div style={{ marginTop: '20px', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '10px', borderLeft: '3px solid #818cf8' }}>
              <div style={{ fontSize: '9px', color: '#c7d2fe', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '4px' }}>Propósito / Causa</div>
              <p style={{ fontSize: '12px', color: '#e0e7ff', margin: 0, lineHeight: 1.55 }}>{usuario.causa}</p>
            </div>
          )}
        </div>

        {/* Hard Skills + Radar */}
        {radarData.length > 0 && (
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px', gap: '8px' }}>
                  <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Hard Skills
                  </h2>
                  {mediaHardAtual && mediaHardMeta && (
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#475569' }}>
                      Média: {mediaHardAtual}/5 · Meta: {mediaHardMeta}/5
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {inventario.hardSkills.map(s => {
                    const pct = Math.round((s.nivelAtual / 5) * 100);
                    return (
                      <div key={s.skill}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 600, color: '#334155', lineHeight: 1.4, paddingBottom: '2px' }}>{s.skill}</span>
                          <span style={{ fontSize: '10px', color: '#64748b', whiteSpace: 'nowrap', lineHeight: 1.4 }}>
                            {s.nivelAtual}/5 <span style={{ color: '#94a3b8' }}>(meta {s.nivelDesejado})</span>
                          </span>
                        </div>
                        <div style={{ height: '6px', backgroundColor: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, backgroundColor: s.nivelAtual >= 4 ? '#10b981' : s.nivelAtual >= 3 ? '#6366f1' : '#f59e0b', borderRadius: '99px' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ width: '340px', flexShrink: 0 }}>
                <div style={{ width: '340px', height: '270px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="64%" data={radarData} margin={{ top: 24, right: 54, bottom: 24, left: 54 }}>
                      <PolarGrid stroke="#cbd5e1" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={<RadarSkillTick fill="#475569" fontSize={9.5} maxLineLen={17} />}
                      />
                      <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
                      <Radar name="Meta" dataKey="meta" stroke="#93c5fd" fill="#93c5fd" fillOpacity={0.35} isAnimationActive={false} />
                      <Radar name="Atual" dataKey="atual" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} isAnimationActive={false} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '4px', fontSize: '10px', color: '#475569' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '99px', backgroundColor: '#4f46e5', display: 'inline-block' }} />
                    Nível atual
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '99px', backgroundColor: '#93c5fd', display: 'inline-block' }} />
                    Meta desejada
                  </span>
                </div>
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
            {incluirExemplosSoft && softComExemplo.length > 0 && (
              <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px' }}>
                  Exemplos práticos
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {softComExemplo.map(s => (
                    <div key={s.atributo} style={{ fontSize: '11px', color: '#334155', lineHeight: 1.45 }}>
                      <strong style={{ color: '#0f172a' }}>{s.atributo}:</strong> {s.exemplo}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Objetivos estratégicos */}
        {incluirObjetivos && objetivos.length > 0 && (
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
                    {o.justificativa?.trim() && (
                      <p style={{ fontSize: '10px', color: '#475569', margin: '5px 0 0', lineHeight: 1.45 }}>
                        {o.justificativa}
                      </p>
                    )}
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

        {/* Plano de Ação e Evidências */}
        {incluirAcoesEvidencias && acoesOrdenadas.length > 0 && (
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Plano de Ação e Evidências
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {acoesOrdenadas.map(a => {
                const st = planoAcaoStatus[a.id] ?? 'pendente';
                const statusMap: Record<string, { label: string; bg: string; color: string }> = {
                  concluido: { label: 'Concluída', bg: '#d1fae5', color: '#065f46' },
                  em_andamento: { label: 'Em andamento', bg: '#dbeafe', color: '#1e40af' },
                  pendente: { label: 'Planejada', bg: '#f1f5f9', color: '#475569' },
                  bloqueado: { label: 'Bloqueada', bg: '#fee2e2', color: '#991b1b' },
                };
                const badge = statusMap[st] ?? statusMap.pendente;
                return (
                  <div key={a.id} style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '10px 14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                      <p style={{ fontSize: '11.5px', fontWeight: 700, color: '#1e293b', margin: 0, lineHeight: 1.4 }}>{a.acao}</p>
                      <div style={{ display: 'flex', gap: '4px', flexShrink: 0, alignItems: 'center' }}>
                        {a.prazoData && (
                          <span style={{ fontSize: '9px', fontWeight: 600, color: '#64748b', backgroundColor: '#f1f5f9', padding: '2px 7px', borderRadius: '99px' }}>
                            Prazo: {new Date(`${a.prazoData}T00:00:00`).toLocaleDateString('pt-BR')}
                          </span>
                        )}
                        <span style={{ backgroundColor: badge.bg, color: badge.color, fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '99px' }}>
                          {badge.label}
                        </span>
                      </div>
                    </div>
                    {a.resultadoEsperado?.trim() && (
                      <p style={{ fontSize: '10px', color: '#475569', margin: '4px 0 0', lineHeight: 1.4 }}>
                        <strong>Resultado:</strong> {a.resultadoEsperado}
                      </p>
                    )}
                    {a.evidenciaUrl?.trim() && (
                      <p style={{ fontSize: '10px', color: '#017AA1', margin: '3px 0 0', wordBreak: 'break-all' }}>
                        <strong>Evidência:</strong> {a.evidenciaUrl}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Destaques do Diário de Progresso */}
        {incluirDiario && destaquesDiario.length > 0 && (
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Destaques do Diário de Progresso
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {destaquesDiario.map(entry => (
                <div key={entry.id} style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '10px 14px', borderLeft: '3px solid #017AA1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', gap: '8px' }}>
                    <span style={{ fontSize: '9.5px', fontWeight: 700, color: '#64748b' }}>
                      {new Date(entry.data).toLocaleDateString('pt-BR')}
                    </span>
                    {entry.tags && entry.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {entry.tags.map(tag => (
                          <span key={tag} style={{ fontSize: '9px', fontWeight: 600, backgroundColor: '#e6f4f8', color: '#017AA1', padding: '1px 6px', borderRadius: '99px' }}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p style={{ fontSize: '11px', color: '#334155', margin: 0, lineHeight: 1.45 }}>{entry.texto}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Histórico de Ciclos */}
        {incluirHistoricoCiclos && historico.length > 0 && (
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Evolução entre Ciclos
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {historico.map((c, idx) => (
                <div key={c.idCiclo} style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '10px 14px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b' }}>
                      Ciclo {idx + 1} · {new Date(c.dataSalvamento).toLocaleDateString('pt-BR')}
                    </span>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <span style={{ fontSize: '9.5px', color: '#64748b' }}>
                        {c.objetivos.length} objetivo(s) · {c.inventario.hardSkills.length} hard skill(s)
                      </span>
                      {c.scoreSaude !== undefined && (
                        <span style={{ fontSize: '9.5px', fontWeight: 700, backgroundColor: '#ede9fe', color: '#5b21b6', padding: '2px 7px', borderRadius: '99px' }}>
                          Saúde: {c.scoreSaude}%
                        </span>
                      )}
                    </div>
                  </div>
                  {c.retrospectiva?.aprendizagem?.trim() && (
                    <p style={{ fontSize: '10px', color: '#475569', margin: '4px 0 0', lineHeight: 1.4 }}>
                      <strong>Aprendizado-chave:</strong> {c.retrospectiva.aprendizagem}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rodapé */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>
            Gerado em {dataGer} · <strong>Meu PDI</strong> - plataforma de desenvolvimento profissional
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
