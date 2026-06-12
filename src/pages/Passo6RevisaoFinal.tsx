import React, { useMemo, useRef, useState } from 'react';
import { usePdiStore } from '../store/usePdiStore';
import type { RetrospectivaData } from '../store/usePdiStore';
import { computeHealthScore } from '../lib/healthScore';
import { DownloadCloud, Sparkles, AlertTriangle, Layers, Calendar, Rocket, RefreshCw, FileText, Star, X } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { AnimatePresence, motion } from 'framer-motion';

// ── Modal de Retrospectiva ────────────────────────────────────────────────────
interface RetroModalProps {
  onConfirm: (retro: RetrospectivaData) => void;
  onCancel: () => void;
}

const RetroModal: React.FC<RetroModalProps> = ({ onConfirm, onCancel }) => {
  const [funcionou, setFuncionou] = useState('');
  const [naoFuncionou, setNaoFuncionou] = useState('');
  const [aprendizagem, setAprendizagem] = useState('');
  const [nota, setNota] = useState(0);

  const podeConfirmar = nota > 0 && (funcionou.trim() || naoFuncionou.trim() || aprendizagem.trim());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative"
      >
        <button onClick={onCancel} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="text-3xl mb-2">🪞</div>
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">Retrospectiva do Ciclo</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Antes de fechar este ciclo, reflita sobre a jornada. Estas respostas ficam salvas no histórico.
          </p>
        </div>

        <div className="space-y-4">
          {/* Nota do ciclo */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-widest">
              Como você avalia este ciclo?
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setNota(n)}
                  className="text-2xl transition-transform hover:scale-110"
                >
                  <Star className={`w-8 h-8 ${n <= nota ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-600'}`} />
                </button>
              ))}
            </div>
            {nota === 0 && <p className="text-xs text-rose-400 mt-1">Selecione ao menos uma estrela para continuar.</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-widest">
              ✅ O que funcionou bem?
            </label>
            <textarea
              rows={2}
              value={funcionou}
              onChange={e => setFuncionou(e.target.value)}
              placeholder="Ex: Mantive consistência nas atividades de estudo, consegui evoluir no React..."
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-widest">
              ❌ O que não funcionou ou poderia melhorar?
            </label>
            <textarea
              rows={2}
              value={naoFuncionou}
              onChange={e => setNaoFuncionou(e.target.value)}
              placeholder="Ex: Não consegui cumprir as ações de longo prazo, falta de tempo foi real..."
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-widest">
              💡 Maior aprendizagem deste ciclo
            </label>
            <textarea
              rows={2}
              value={aprendizagem}
              onChange={e => setAprendizagem(e.target.value)}
              placeholder="Ex: Aprendi que objetivos sem data concreta raramente acontecem..."
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm({ funcionou, naoFuncionou, aprendizagem, nota })}
            disabled={!podeConfirmar}
            className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-600 text-white font-bold text-sm transition-colors"
          >
            Salvar Ciclo ✓
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ── Mentor dictionary ─────────────────────────────────────────────────────────
const DICIONARIO_MENTORIA: Record<string, { titulo: string; sugestao: string }> = {
  "Inteligência Emocional": {
    titulo: "Livro: Inteligência Emocional (Daniel Goleman)",
    sugestao: "Antes de responder mensagens difíceis, espere 10 minutos. Nomeie a emoção que sentiu antes de agir.",
  },
  "Capacidade de lidar com ambiguidade": {
    titulo: "Prática: A Técnica da Única Métrica",
    sugestao: "Quando tudo for incerto, defina qual é a ÚNICA métrica que importa agora e proteja ela de distrações.",
  },
  "Trabalho em Equipe": {
    titulo: "Ação Prática: 1:1 Informal",
    sugestao: "Agende um café de 15 min com uma pessoa diferente do seu time a cada 2 semanas, só para ouvir.",
  },
  "Comunicação": {
    titulo: "Livro: Comunicação Não-Violenta (Marshall Rosenberg)",
    sugestao: "Ao dar feedback ou fazer pedidos, separe sempre: Fato objetivo → Impacto → Necessidade → Pedido concreto.",
  },
  "Visão Sistêmica": {
    titulo: "Exercício: Leia os OKRs da empresa",
    sugestao: "Entenda os objetivos do seu gestor e do gestor dele. Pergunte-se: como meu trabalho impacta esses números?",
  },
  "Capacidade de estabelecer network": {
    titulo: "Hábito: Reconecte 2 contatos por mês",
    sugestao: "Toda semana, envie uma mensagem genuína para alguém da sua rede. Networking é consistência.",
  },
  "Capacidade de aprender": {
    titulo: "Método: Feynman Technique",
    sugestao: "Após estudar algo, tente explicar para uma criança de 12 anos. Se travar, voltou o ponto onde há lacuna.",
  },
  "Capacidade de mudar (Adaptabilidade)": {
    titulo: "Mentalidade: Growth Mindset (Carol Dweck)",
    sugestao: "Substitua 'Não sei fazer isso' por 'Ainda não sei fazer isso'. A mudança começa na linguagem.",
  },
  "Proatividade": {
    titulo: "Framework: Regra dos 2 Minutos (GTD)",
    sugestao: "Se uma tarefa leva menos de 2 minutos, faça agora. Para as demais, reserve 1h/semana para agir nas importantes.",
  },
};

// ── Componente principal ──────────────────────────────────────────────────────
export const Passo6RevisaoFinal: React.FC = () => {
  const store = usePdiStore();
  const { objetivos, planoDeAcao, inventario, campoDeForcas, salvarCiclo, resetAtual } = store;
  const printRef = useRef<HTMLDivElement>(null);
  const [showRetroModal, setShowRetroModal] = useState(false);

  // Score de saúde via lib centralizada
  const scoreSaude = useMemo(
    () => computeHealthScore({ objetivos, planoDeAcao, campoDeForcas }).score,
    [objetivos, planoDeAcao, campoDeForcas]
  );

  const textColorSaude = scoreSaude > 80 ? 'text-emerald-500' : scoreSaude > 50 ? 'text-amber-500' : 'text-rose-500';

  // Limita o radar a 8 skills para legibilidade (ordena por maior gap)
  const dataRadar = useMemo(() => {
    const sorted = [...inventario.hardSkills]
      .sort((a, b) => (b.nivelDesejado - b.nivelAtual) - (a.nivelDesejado - a.nivelAtual))
      .slice(0, 8);
    return sorted.map(skill => ({
      subject: skill.skill.length > 13 ? skill.skill.slice(0, 12) + '…' : skill.skill,
      atual: skill.nivelAtual,
      meta: skill.nivelDesejado,
      fullMark: 5,
    }));
  }, [inventario.hardSkills]);

  const mentors = useMemo(() =>
    inventario.softSkills.filter(s => s.pontoForteOuMelhoria === 'Melhoria').slice(0, 3),
    [inventario.softSkills]
  );

  const handleExportJSON = () => {
    const exportData = {
      usuario: store.usuario,
      inventario: store.inventario,
      objetivos: store.objetivos,
      planoDeAcao: store.planoDeAcao,
      campoDeForcas: store.campoDeForcas,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', `PDI_${store.usuario.nome || 'MeuPDI'}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleExportPDF = async () => {
    if (!printRef.current) return;
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);
      const canvas = await html2canvas(printRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let yOffset = 10;
      let remaining = imgHeight;
      while (remaining > 0) {
        pdf.addImage(imgData, 'PNG', 10, yOffset - (imgHeight - remaining), imgWidth, imgHeight);
        remaining -= (pageHeight - 20);
        if (remaining > 0) { pdf.addPage(); yOffset = 10; }
      }
      pdf.save(`PDI_${store.usuario.nome || 'MeuPDI'}.pdf`);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      window.print();
    }
  };

  const handleSalvarCiclo = () => {
    setShowRetroModal(true);
  };

  const handleConfirmRetro = (retro: RetrospectivaData) => {
    setShowRetroModal(false);
    salvarCiclo(retro);
    resetAtual();
  };

  const sortedAcoes = [...planoDeAcao].sort((a, b) => new Date(a.prazoData).getTime() - new Date(b.prazoData).getTime());

  return (
    <>
      <AnimatePresence>
        {showRetroModal && (
          <RetroModal
            onConfirm={handleConfirmRetro}
            onCancel={() => setShowRetroModal(false)}
          />
        )}
      </AnimatePresence>

      <div className="text-left font-sans" ref={printRef}>
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 mb-10 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20 pointer-events-none" />
          <div className="z-10 w-full mb-6 md:mb-0 md:w-2/3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">Revisão Final</h2>
            <p className="text-slate-400 font-medium">Tudo pronto para salvar e evoluir, {store.usuario.nome.split(' ')[0] || 'profissional'}?</p>
            <div className="flex gap-4 mt-6 flex-wrap">
              <span className="bg-slate-800 text-slate-300 py-2 px-4 rounded-xl text-sm font-semibold border border-slate-700 shadow-inner flex gap-2">
                <Layers className="w-5 h-5 text-indigo-400" /> {objetivos.length} Objetivos
              </span>
              <span className="bg-slate-800 text-slate-300 py-2 px-4 rounded-xl text-sm font-semibold border border-slate-700 shadow-inner flex gap-2">
                <Rocket className="w-5 h-5 text-emerald-400" /> {planoDeAcao.length} Ações
              </span>
            </div>
          </div>
          <div className="z-10 flex flex-col items-center justify-center p-4 bg-slate-800/80 rounded-2xl border border-slate-700 shadow-inner min-w-[160px]">
            <span className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Saúde do PDI</span>
            <div className={`text-5xl font-black ${textColorSaude}`}>{scoreSaude}<span className="text-2xl">%</span></div>
            <p className="text-[10px] text-slate-500 mt-2 text-center max-w-[120px]">
              {scoreSaude > 80 ? 'Plano equilibrado e viável!' : scoreSaude > 50 ? 'Faltam métricas ou ações!' : 'Perigo: Plano não executável'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Radar */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-2">
              <span>📡</span> Radar de Hard Skills
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Nível atual vs meta desejada.</p>
            <div className="w-full h-[280px]">
              {dataRadar.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dataRadar}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <Radar name="Atual" dataKey="atual" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                    <Radar name="Meta Desejada" dataKey="meta" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.4} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full border border-dashed rounded-xl border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 text-sm">Nenhuma hard skill preenchida na Etapa 2.</span>
                </div>
              )}
            </div>
          </div>

          {/* Mentoria */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-indigo-900/30 rounded-2xl p-6 border border-indigo-100 dark:border-slate-700 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-100 mb-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" /> O que o seu Mentor diria?
            </h3>
            <p className="text-xs text-indigo-700/60 dark:text-indigo-300 mb-6">Pílulas de conselho focadas nas suas soft skills a melhorar.</p>
            <div className="flex-grow space-y-4">
              {mentors.length > 0 ? (
                mentors.map((m, i) => {
                  const dic = DICIONARIO_MENTORIA[m.atributo];
                  return (
                    <div key={i} className="bg-white dark:bg-slate-800/80 p-4 rounded-xl shadow-sm border border-indigo-50 dark:border-slate-600">
                      <span className="text-[10px] uppercase font-black tracking-widest text-indigo-400 mb-1 block">{m.atributo}</span>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{dic ? dic.titulo : `Foque em: ${m.atributo}`}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">{dic ? dic.sugestao : 'Observe como líderes aplicam este conceito na prática.'}</p>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center p-8 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-dashed border-indigo-200 dark:border-slate-600">
                  <span className="text-indigo-800/50 dark:text-indigo-400/50 text-sm text-center">Você se auto-avaliou como Forte em tudo — incrível! Continue assim.</span>
                </div>
              )}
              {(campoDeForcas.restritivas ?? []).length === 0 && (
                <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl shadow-sm border border-rose-100 dark:border-rose-800/30 flex gap-3 items-start">
                  <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-rose-900 dark:text-rose-100 text-sm">Resistências Ocultas</h4>
                    <p className="text-xs text-rose-700 dark:text-rose-300 mt-1">Você não mapeou barreiras no Passo 5. Lembre-se da Síndrome do Falso Otimismo.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm mb-10">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-500" /> Mapa de Ações
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-8">Execução ordenada pela linha do tempo.</p>
          {sortedAcoes.length > 0 ? (
            <div className="relative border-l-2 border-indigo-100 dark:border-indigo-900 ml-3 pl-6 space-y-8">
              {sortedAcoes.map((acao) => {
                const obj = objetivos.find(o => o.id === acao.objetivoId);
                return (
                  <div key={acao.id} className="relative">
                    <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-800 border-4 border-indigo-500" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                        {acao.prazoData ? new Date(acao.prazoData).toLocaleDateString('pt-BR') : 'Sem data'}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{obj?.categoria || 'Ação'}</span>
                    </div>
                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">{acao.acao}</h4>
                    {acao.recursos && <p className="text-xs text-slate-500 mt-1"><span className="font-semibold text-slate-400">Recurso:</span> {acao.recursos}</p>}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="text-slate-400">Nenhum plano de ação tracejado. Volte no passo 4.</span>
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-2xl mx-auto">
          <button
            onClick={handleExportPDF}
            className="flex-1 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
          >
            <FileText className="w-5 h-5" /> Exportar PDF
          </button>
          <button
            onClick={handleExportJSON}
            className="flex-1 bg-white dark:bg-slate-800 border-2 border-indigo-600 dark:border-indigo-500 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700 font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <DownloadCloud className="w-5 h-5" /> JSON Backup
          </button>
          <button
            onClick={handleSalvarCiclo}
            className="flex-1 bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg"
          >
            <RefreshCw className="w-5 h-5" /> Salvar Ciclo
          </button>
        </div>
      </div>
    </>
  );
};
