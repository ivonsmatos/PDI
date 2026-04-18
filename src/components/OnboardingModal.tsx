import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePdiStore } from '../store/usePdiStore';
import { ChevronRight, Target, BookOpen, TrendingUp, Zap, X } from 'lucide-react';

const slides = [
  {
    icon: <Target className="w-12 h-12 text-indigo-400" />,
    title: 'Bem-vindo ao seu Terceiro Tempo',
    subtitle: 'Plano de Desenvolvimento Individual',
    desc: 'Este é o espaço para você pausar o jogo, sair do automático e pensar estrategicamente sobre a sua carreira. O PDI é a ferramenta mais poderosa do autoconhecimento profissional.',
    bg: 'from-indigo-900 to-slate-900',
  },
  {
    icon: <BookOpen className="w-12 h-12 text-emerald-400" />,
    title: 'Uma Jornada de 6 Passos',
    subtitle: 'Da causa ao plano de ação',
    desc: 'Você vai mapear sua Causa (propósito), fazer uma Auto-Avaliação honesta, definir Objetivos estratégicos, criar um Plano de Ação tático, analisar o Campo de Forças e revisar tudo em um Dashboard inteligente.',
    bg: 'from-emerald-900 to-slate-900',
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-amber-400" />,
    title: 'Seja honesto consigo mesmo',
    subtitle: 'A base de tudo é a reflexão',
    desc: 'Não existe resposta certa ou errada aqui. O PDI é um documento vivo, pessoal e confidencial. Quanto mais honesto você for na auto-avaliação, mais poderoso será o seu plano de desenvolvimento.',
    bg: 'from-amber-900 to-slate-900',
  },
  {
    icon: <Zap className="w-12 h-12 text-rose-400" />,
    title: 'Pronto para começar?',
    subtitle: 'Seus dados ficam salvos localmente',
    desc: 'O app funciona até sem internet e salva seu progresso automaticamente no navegador. Você pode pausar e continuar quando quiser. Ao final, pode exportar seu PDI completo em PDF ou JSON.',
    bg: 'from-rose-900 to-slate-900',
  },
];

const STORAGE_KEY = 'pdi-onboarding-done';

export const OnboardingModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const { usuario } = usePdiStore();

  useEffect(() => {
    const done = localStorage.getItem(STORAGE_KEY);
    // Mostra apenas na primeira vez (sem nome preenchido e sem flag)
    if (!done && !usuario.nome) {
      setTimeout(() => setVisible(true), 600);
    }
  }, [usuario.nome]);

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(s => s + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  const current = slides[step];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`relative w-full max-w-lg bg-gradient-to-br ${current.bg} rounded-3xl p-8 shadow-2xl border border-white/10 overflow-hidden`}
          >
            {/* Decorative blob */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Slide content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  {current.icon}
                </div>
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">{current.subtitle}</p>
                <h2 className="text-2xl font-extrabold text-white mb-4">{current.title}</h2>
                <p className="text-white/75 leading-relaxed text-base">{current.desc}</p>
              </motion.div>
            </AnimatePresence>

            {/* Footer */}
            <div className="mt-10 flex justify-between items-center">
              {/* Dots */}
              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === step ? 'bg-white w-6' : 'bg-white/30'}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-white text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-white/90 active:scale-95 transition-all shadow-lg"
              >
                {step < slides.length - 1 ? (
                  <>Próximo <ChevronRight className="w-4 h-4" /></>
                ) : (
                  <>Vamos começar! <Zap className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
