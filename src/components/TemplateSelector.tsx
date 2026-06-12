import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import { matrizDeCompetencias } from '../data/matrizCompetencias';
import { usePdiStore } from '../store/usePdiStore';
import type { HardSkill, SoftSkill } from '../store/usePdiStore';

type Area = keyof typeof matrizDeCompetencias;
type Nivel = 'estagiario' | 'junior' | 'pleno' | 'senior' | 'especialista' | 'gestor';

const AREA_LABELS: { value: Area; label: string }[] = [
  { value: 'tecnologia',                       label: '💻 Dev / Tecnologia' },
  { value: 'devops_infraestrutura',            label: '⚙️ DevOps & Infra' },
  { value: 'seguranca_informacao',             label: '🔒 Segurança da Informação' },
  { value: 'qualidade_qa',                     label: '🧪 Qualidade / QA' },
  { value: 'ciencia_de_dados',                 label: '📊 Ciência de Dados / BI' },
  { value: 'gestao_de_produto',                label: '🗺️ Gestão de Produto' },
  { value: 'recursos_humanos',                 label: '🤝 Recursos Humanos' },
  { value: 'marketing',                        label: '📣 Marketing' },
  { value: 'vendas',                           label: '🎯 Vendas' },
  { value: 'gestao',                           label: '👥 Gestão & Liderança' },
  { value: 'financas',                         label: '💰 Finanças' },
  { value: 'design',                           label: '🎨 Design / UX-UI' },
];

const NIVEL_LABELS: { value: Nivel; label: string }[] = [
  { value: 'estagiario', label: 'Estagiário / Aprendiz' },
  { value: 'junior',     label: 'Júnior' },
  { value: 'pleno',      label: 'Pleno' },
  { value: 'senior',     label: 'Sênior' },
  { value: 'especialista', label: 'Especialista' },
  { value: 'gestor',     label: 'Gestor' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export const TemplateSelector: React.FC<Props> = ({ open, onClose }) => {
  const { setStoreItem, updateUsuario } = usePdiStore();
  const [area, setArea] = useState<Area | ''>('');
  const [nivel, setNivel] = useState<Nivel | ''>('');
  const [applied, setApplied] = useState(false);

  const previewData = area && nivel
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (matrizDeCompetencias[area] as any)[nivel]
    : null;

  const handleApply = () => {
    if (!area || !nivel || !previewData) return;

    // Hard Skills — pré-preenchidas com nivelAtual=0 e nivelDesejado=3
    const hardSkills: HardSkill[] = (previewData.hardSkills as string[]).map(skill => ({
      skill,
      nivelAtual: 0,
      nivelDesejado: 3,
    }));

    // Soft Skills — pré-marcadas como Melhoria (ponto de partida para avaliação)
    const softSkills: SoftSkill[] = (previewData.softSkills as string[]).map(atributo => ({
      atributo,
      pontoForteOuMelhoria: '' as const,
      exemplo: '',
    }));

    updateUsuario({ areaAtuacao: area, nivelCarreira: nivel });
    setStoreItem('inventario', { hardSkills, softSkills });

    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            onClick={e => e.stopPropagation()}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <h2 className="font-bold text-slate-800 dark:text-slate-100">Template por Profissão</h2>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Escolha sua área e nível atual. As competências da sua função serão pré-carregadas na auto-avaliação — você só ajusta os níveis.
              </p>

              {/* Seleção de área */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                  Área de atuação
                </label>
                <div className="grid grid-cols-2 gap-1.5 max-h-52 overflow-y-auto pr-1">
                  {AREA_LABELS.map(a => (
                    <button
                      key={a.value}
                      onClick={() => setArea(a.value)}
                      className={`text-left px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                        area === a.value
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-indigo-300'
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seleção de nível */}
              {area && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                    Nível de carreira
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {NIVEL_LABELS.map(n => (
                      <button
                        key={n.value}
                        onClick={() => setNivel(n.value)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                          nivel === n.value
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-indigo-300'
                        }`}
                      >
                        {n.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Preview */}
              {previewData && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800"
                >
                  <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                    Preview — {previewData.hardSkills.length} hard skills + {previewData.softSkills.length} soft skills serão carregadas:
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-2">{previewData.expectativa}</p>
                  <div className="flex flex-wrap gap-1">
                    {[...previewData.hardSkills, ...previewData.softSkills].map((s: string) => (
                      <span key={s} className="text-[10px] bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 pb-5">
              <button
                onClick={handleApply}
                disabled={!area || !nivel || applied}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                  applied
                    ? 'bg-emerald-500 text-white'
                    : area && nivel
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                {applied ? '✓ Template aplicado!' : 'Aplicar Template'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
