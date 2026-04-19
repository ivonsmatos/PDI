import React, { useEffect, useState } from 'react';
import { usePdiStore } from '../store/usePdiStore';
import { Moon, Sun, History } from 'lucide-react';
import { OnboardingModal } from './OnboardingModal';
import { HistoricoModal } from './HistoricoModal';

interface WizardLayoutProps {
  children: React.ReactNode;
  onConcluir?: () => void;
}

function validateStep(
  stepAtual: number,
  usuario: { nome: string },
  objetivos: { id: string }[]
): string | null {
  if (stepAtual === 2 && !usuario.nome.trim())
    return 'Preencha seu nome no Passo 1 antes de continuar.';
  if (stepAtual === 4 && objetivos.length === 0)
    return 'Adicione ao menos um objetivo no Passo 3 antes de continuar.';
  return null;
}

export const WizardLayout: React.FC<WizardLayoutProps> = ({ children, onConcluir }) => {
  const { stepAtual, nextStep, prevStep, usuario, objetivos } = usePdiStore();
  const [isDarkMode, setIsDarkMode]     = useState(false);
  const [showHistorico, setShowHistorico] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleNextStep = () => {
    // Último passo: delega para o pai (App) que salva e redireciona
    if (stepAtual === 6) {
      onConcluir?.();
      return;
    }
    const error = validateStep(stepAtual + 1, usuario, objetivos);
    if (error) {
      setValidationError(error);
      setTimeout(() => setValidationError(null), 3500);
      return;
    }
    setValidationError(null);
    nextStep();
  };

  const steps = [
    { num: 1, title: 'Causa' },
    { num: 2, title: 'Auto-avaliação' },
    { num: 3, title: 'Objetivos' },
    { num: 4, title: 'Plano de Ação' },
    { num: 5, title: 'Campo de Forças' },
    { num: 6, title: 'Revisão Final' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 font-sans transition-colors duration-300">
      <OnboardingModal />
      <HistoricoModal open={showHistorico} onClose={() => setShowHistorico(false)} />

      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 transition-colors sticky top-0 z-40">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent tracking-tight">
            Meu PDI
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistorico(true)}
              className="p-2 rounded-full w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              title="Ver Histórico de Ciclos"
            >
              <History className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col">
        {/* Stepper — 2 linhas de 3 */}
        <div className="mb-10 space-y-3">
          {([steps.slice(0, 3), steps.slice(3)] as const).map((row, rowIdx) => {
            // progresso da linha: row 0 = steps 1-3, row 1 = steps 4-6
            const rowStart  = rowIdx === 0 ? 1 : 4;
            const pctLine   = rowIdx === 0
              ? stepAtual <= 3 ? ((stepAtual - 1) / 2) * 100 : 100
              : stepAtual < 4  ? 0 : ((stepAtual - 4) / 2) * 100;

            return (
              <div key={rowIdx} className="relative">
                {/* trilha base */}
                <div className="absolute top-5 left-[calc(1/6*100%)] right-[calc(1/6*100%)] h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full -z-10" />
                {/* trilha preenchida */}
                <div
                  className="absolute top-5 left-[calc(1/6*100%)] h-1.5 bg-indigo-600 dark:bg-indigo-500 rounded-full -z-10 transition-all duration-500 ease-in-out shadow-[0_0_8px_rgba(79,70,229,0.4)]"
                  style={{ width: `calc(${pctLine}% * 4/6)` }}
                />
                <div className="flex items-center justify-between">
                  {row.map((step) => {
                    const isActive = stepAtual === step.num;
                    const isPast   = stepAtual > step.num;
                    return (
                      <div key={step.num} className="flex flex-col items-center flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500
                          ${isActive
                            ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg ring-4 ring-indigo-100 dark:ring-indigo-900 scale-110'
                            : isPast
                              ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm ring-2 ring-indigo-200 dark:ring-indigo-800'
                              : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 border border-gray-300 dark:border-slate-600'
                          }`}
                        >
                          {isPast ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : step.num}
                        </div>
                        <div className={`mt-2 text-xs font-semibold text-center transition-colors leading-tight
                          ${isActive
                            ? 'text-indigo-700 dark:text-indigo-400'
                            : isPast
                              ? 'text-slate-600 dark:text-slate-300'
                              : 'text-gray-400 dark:text-slate-500'
                          }`}
                        >
                          {step.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Toast de erro */}
        {validationError && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            {validationError}
          </div>
        )}

        {/* Conteúdo */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-xl rounded-2xl p-6 sm:p-10 flex-grow relative overflow-hidden border border-white/50 dark:border-slate-700/50 ring-1 ring-slate-900/5 dark:ring-slate-100/5 transition-colors duration-300">
          {children}
        </div>

        {/* Navegação */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={stepAtual === 1}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
              stepAtual === 1
                ? 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-600 cursor-not-allowed opacity-50'
                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow active:scale-95'
            }`}
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Anterior
          </button>

          <button
            onClick={handleNextStep}
            className={`px-8 py-3 rounded-xl font-medium text-white transition-all shadow-md active:scale-95 flex items-center gap-2
              ${stepAtual === 6
                ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-green-500/30'
                : 'bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-500 dark:to-blue-500 hover:from-indigo-700 hover:to-blue-700 shadow-indigo-500/30'
              }`}
          >
            {stepAtual === 6 ? 'Ir para o Dashboard ✓' : 'Próximo Passo'}
            {stepAtual < 6 && (
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            )}
          </button>
        </div>
      </main>
    </div>
  );
};
