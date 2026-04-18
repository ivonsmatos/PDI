import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePdiStore, type PdiCiclo } from '../store/usePdiStore';
import { X, Clock, Target, Layers, ChevronRight, Trash2 } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

export const HistoricoModal: React.FC<Props> = ({ open, onClose }) => {
  const { historico, setStoreItem } = usePdiStore();

  const removerCiclo = (id: string) => {
    if (confirm('Deseja excluir este ciclo do histórico?')) {
      setStoreItem('historico' as any, historico.filter((c: PdiCiclo) => c.idCiclo !== id));
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full sm:max-w-2xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Histórico de Ciclos</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">{historico.length} ciclo(s) salvo(s)</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-grow p-6">
              {historico.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">Nenhum ciclo salvo ainda.</p>
                  <p className="text-sm mt-1">Conclua um PDI e clique em "Salvar Ciclo e Recomeçar" para arquivá-lo aqui.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {[...historico].reverse().map((ciclo: PdiCiclo) => (
                    <div key={ciclo.idCiclo} className="border border-slate-200 dark:border-slate-700 rounded-2xl p-5 hover:shadow-md transition-shadow bg-white dark:bg-slate-800">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">
                              {formatDate(ciclo.dataSalvamento)}
                            </span>
                          </div>
                          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
                            {ciclo.usuario.nome || 'Usuário sem nome'}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 italic line-clamp-2">
                            "{ciclo.usuario.causa || 'Sem causa definida'}"
                          </p>

                          <div className="flex gap-3 mt-3">
                            <span className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
                              <Target className="w-3.5 h-3.5" /> {ciclo.objetivos.length} obj.
                            </span>
                            <span className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
                              <Layers className="w-3.5 h-3.5" /> {ciclo.planoDeAcao.length} ações
                            </span>
                            <span className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
                              <ChevronRight className="w-3.5 h-3.5" /> {ciclo.inventario.softSkills.length} skills
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => removerCiclo(ciclo.idCiclo)}
                          className="p-2 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
