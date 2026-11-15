import React, { useState } from 'react';
import { Sparkles, X, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import { recomendarAreaPorPerfil, type ResultadoRecomendador } from '../data/careerMetadata';

interface Props {
  open: boolean;
  onClose: () => void;
  onApply: (resultado: ResultadoRecomendador) => void;
}

export const AreaRecommenderModal: React.FC<Props> = ({ open, onClose, onApply }) => {
  const [diaADia, setDiaADia] = useState('');
  const [ferramentas, setFerramentas] = useState('');
  const [resultadoTexto, setResultadoTexto] = useState('');
  const [evolucao, setEvolucao] = useState('');
  const [recomendacao, setRecomendacao] = useState<ResultadoRecomendador | null>(null);

  if (!open) return null;

  const handleRecomendar = (e: React.FormEvent) => {
    e.preventDefault();
    const res = recomendarAreaPorPerfil({
      diaADia,
      ferramentas,
      resultado: resultadoTexto,
      evolucao,
    });
    setRecomendacao(res);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#51266E]/10 text-[#51266E] dark:text-[#BAB1BD] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                Assistente de Recomendação de Área
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Responda 4 perguntas rápidas para descobrirmos a melhor matriz e especialidade para você.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleRecomendar} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              1. O que você faz no dia a dia?
            </label>
            <input
              type="text"
              value={diaADia}
              onChange={(e) => setDiaADia(e.target.value)}
              placeholder="Ex: analiso indicadores, desenvolvo APIs, coordeno obras, atendo clientes..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 text-sm text-slate-800 dark:text-slate-100"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              2. Quais ferramentas utiliza?
            </label>
            <input
              type="text"
              value={ferramentas}
              onChange={(e) => setFerramentas(e.target.value)}
              placeholder="Ex: Excel, Power BI, SQL, React, Figma, AutoCAD, SAP, CRM..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 text-sm text-slate-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              3. Que tipo de resultado entrega?
            </label>
            <input
              type="text"
              value={resultadoTexto}
              onChange={(e) => setResultadoTexto(e.target.value)}
              placeholder="Ex: redução de custos, aumento de vendas, qualidade clínica, entrega de projetos..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 text-sm text-slate-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              4. Para qual posição deseja evoluir?
            </label>
            <input
              type="text"
              value={evolucao}
              onChange={(e) => setEvolucao(e.target.value)}
              placeholder="Ex: Sênior, Especialista, Tech Lead, Gerente, Coordenador..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 text-sm text-slate-800 dark:text-slate-100"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#51266E] to-[#017AA1] text-white font-bold text-sm py-2.5 px-4 hover:opacity-95 transition-opacity"
          >
            <Sparkles className="w-4 h-4" /> Analisar meu perfil
          </button>
        </form>

        {recomendacao && (
          <div className="rounded-2xl border border-[#017AA1]/30 bg-[#539CBD]/10 p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#017AA1]">
              <CheckCircle2 className="w-4 h-4" /> Recomendação personalizada
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
                <span className="text-[11px] font-semibold text-slate-400 block">Área principal</span>
                <strong className="text-slate-900 dark:text-slate-100">{recomendacao.areaPrincipalLabel}</strong>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
                <span className="text-[11px] font-semibold text-slate-400 block">Especialidade sugerida</span>
                <strong className="text-slate-900 dark:text-slate-100">{recomendacao.especialidade}</strong>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
                <span className="text-[11px] font-semibold text-slate-400 block">Matriz mais adequada</span>
                <strong className="text-slate-900 dark:text-slate-100">{recomendacao.matrizAdequada}</strong>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
                <span className="text-[11px] font-semibold text-slate-400 block">Possíveis áreas de transição</span>
                <strong className="text-slate-900 dark:text-slate-100 text-xs">
                  {recomendacao.areasTransicao.map(a => a.label).join(', ')}
                </strong>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {recomendacao.justificativa}
            </p>
            <button
              type="button"
              onClick={() => {
                onApply(recomendacao);
                onClose();
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#017AA1] text-white font-bold text-sm py-2.5 px-4 hover:bg-[#016384] transition-colors"
            >
              Aplicar esta recomendação <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
