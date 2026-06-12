import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePdiStore } from '../store/usePdiStore';
import { X, CalendarCheck } from 'lucide-react';

const STORAGE_KEY_PREFIX = 'pdi-checkin-week-';

function getWeekKey(): string {
  const d = new Date();
  const year = d.getFullYear();
  const start = new Date(year, 0, 1);
  const week = Math.ceil(((d.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
  return `${year}-${week}`;
}

export const CheckinSemanal: React.FC = () => {
  const { addDiarioEntry, objetivos } = usePdiStore();
  const [visible, setVisible] = useState(false);
  const [avancou, setAvancou] = useState('');
  const [travou, setTravou] = useState('');
  const [foco, setFoco] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const day = new Date().getDay(); // 5 = sexta
    const weekKey = getWeekKey();
    const done = localStorage.getItem(STORAGE_KEY_PREFIX + weekKey);
    if (day === 5 && !done) {
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  const handleSave = () => {
    if (!avancou.trim() && !travou.trim() && !foco.trim()) return;

    const partes: string[] = [];
    if (avancou.trim()) partes.push(`✅ O que avancei: ${avancou.trim()}`);
    if (travou.trim()) partes.push(`⚠️ O que travou: ${travou.trim()}`);
    if (foco.trim()) partes.push(`🎯 Foco da próxima semana: ${foco.trim()}`);

    addDiarioEntry({
      data: new Date().toISOString(),
      texto: `📋 Check-in Semanal\n\n${partes.join('\n\n')}`,
      objetivoId: undefined,
    });

    localStorage.setItem(STORAGE_KEY_PREFIX + getWeekKey(), 'true');
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setVisible(false);
    }, 1400);
  };

  const handleSkip = () => {
    localStorage.setItem(STORAGE_KEY_PREFIX + getWeekKey(), 'true');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-5 text-white">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5" />
                  <span className="font-bold text-sm">Check-in Semanal</span>
                </div>
                <button onClick={handleSkip} className="p-1 rounded-lg hover:bg-white/20 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-violet-100 text-xs">
                É sexta — 3 perguntas rápidas para manter seu PDI vivo 🚀
              </p>
            </div>

            <div className="p-5 space-y-4">
              {/* Q1 */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                  ✅ O que avançou essa semana?
                </label>
                <textarea
                  rows={2}
                  value={avancou}
                  onChange={e => setAvancou(e.target.value)}
                  placeholder="Uma entrega concluída, algo aprendido, um obstáculo superado..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none"
                />
              </div>

              {/* Q2 */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                  ⚠️ O que travou?
                </label>
                <textarea
                  rows={2}
                  value={travou}
                  onChange={e => setTravou(e.target.value)}
                  placeholder="Bloqueios, distrações, o que não saiu como planejado..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none"
                />
              </div>

              {/* Q3 */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                  🎯 Foco da próxima semana
                </label>
                <select
                  value={foco}
                  onChange={e => setFoco(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-400 mb-2"
                >
                  <option value="">Escolher objetivo...</option>
                  {objetivos.map(o => (
                    <option key={o.id} value={o.descricao}>{o.descricao.slice(0, 60)}{o.descricao.length > 60 ? '…' : ''}</option>
                  ))}
                  <option value="custom">Outro (digitar abaixo)</option>
                </select>
                {foco === 'custom' && (
                  <input
                    type="text"
                    placeholder="Descreva o foco da semana..."
                    onBlur={e => setFoco(e.target.value || 'custom')}
                    className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-5 flex gap-2">
              <button
                onClick={handleSkip}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Pular
              </button>
              <button
                onClick={handleSave}
                disabled={saved}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  saved
                    ? 'bg-emerald-500 text-white'
                    : 'bg-violet-600 hover:bg-violet-700 text-white'
                }`}
              >
                {saved ? '✓ Salvo no Diário!' : 'Salvar Reflexão'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
