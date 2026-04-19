import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { usePdiStore } from '../store/usePdiStore';
import { HistoricoModal } from '../components/HistoricoModal';
import {
  LayoutDashboard, Map, CheckSquare, TrendingUp,
  Moon, Sun, History, RefreshCw, Menu, X,
} from 'lucide-react';

const navItems = [
  { to: '/',         icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard'  },
  { to: '/trilha',   icon: <Map className="w-5 h-5" />,             label: 'Trilha'     },
  { to: '/plano',    icon: <CheckSquare className="w-5 h-5" />,     label: 'Plano'      },
  { to: '/evolucao', icon: <TrendingUp className="w-5 h-5" />,      label: 'Evolução'   },
];

export const AppLayout: React.FC = () => {
  const { usuario, wizardConcluido, salvarCiclo, resetAtual } = usePdiStore();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [showHistorico, setShowHistorico] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Se o wizard não foi concluído, manda pro wizard
  useEffect(() => {
    if (!wizardConcluido) navigate('/wizard', { replace: true });
  }, [wizardConcluido, navigate]);

  const handleNovoCiclo = () => {
    if (confirm('Deseja salvar o ciclo atual e iniciar uma nova revisão do PDI?')) {
      salvarCiclo();
      resetAtual();
      navigate('/wizard', { replace: true });
    }
  };

  const firstName = usuario.nome?.split(' ')[0] || 'Você';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans">
      <HistoricoModal open={showHistorico} onClose={() => setShowHistorico(false)} />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Meu PDI
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNovoCiclo}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors border border-indigo-100 dark:border-indigo-800"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Novo Ciclo
            </button>
            <button
              onClick={() => setShowHistorico(true)}
              className="p-2 rounded-full w-9 h-9 flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              title="Histórico"
            >
              <History className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full w-9 h-9 flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl w-full mx-auto">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0 pt-6 px-3 gap-1 border-r border-slate-200 dark:border-slate-700">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-2">
            Olá, {firstName} 👋
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
          <div className="mt-auto pb-6 px-3">
            <button
              onClick={handleNovoCiclo}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Novo Ciclo
            </button>
          </div>
        </aside>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-0 z-30 bg-black/40" onClick={() => setMenuOpen(false)}>
            <nav
              className="absolute top-14 left-0 w-56 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-full pt-4 px-3 flex flex-col gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Bottom nav — mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-3 text-[10px] font-semibold gap-1 transition-colors ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-400 dark:text-slate-500'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
