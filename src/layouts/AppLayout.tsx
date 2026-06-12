import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { usePdiStore } from '../store/usePdiStore';
import { useAuth } from '../contexts/AuthContext';
import { useFirebaseSync } from '../hooks/useFirebaseSync';
import { HistoricoModal } from '../components/HistoricoModal';
import { ToastContainer } from '../components/ToastContainer';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { CheckinSemanal } from '../components/CheckinSemanal';
import { useNotificacoesPrazo } from '../hooks/useNotificacoesPrazo';
import {
  LayoutDashboard, Map, CheckSquare, TrendingUp,
  Moon, Sun, History, RefreshCw, Menu, X,
  BookOpen, Settings, LogOut, Share2, GitCompareArrows, FileText,
} from 'lucide-react';
import { encodeProfile } from '../pages/PerfilPublico';
import type { PublicProfileData } from '../pages/PerfilPublico';

const AREA_LABELS: Record<string, string> = {
  tecnologia: '💻 Tecnologia / Desenvolvimento',
  devops_infraestrutura: '⚙️ DevOps & Infraestrutura',
  seguranca_informacao: '🔒 Segurança da Informação',
  qualidade_qa: '🧪 Qualidade / QA',
  ciencia_de_dados: '📊 Ciência de Dados / BI',
  gestao_de_produto: '🗺️ Gestão de Produto',
  recursos_humanos: '🤝 Recursos Humanos',
  marketing: '📣 Marketing',
  vendas: '🎯 Vendas',
  gestao: '👥 Gestão & Liderança',
  financas: '💰 Finanças',
  design: '🎨 Design / UX-UI',
};

const NIVEL_LABELS: Record<string, string> = {
  estagiario: 'Estagiário', junior: 'Júnior', pleno: 'Pleno',
  senior: 'Sênior', especialista: 'Especialista', gestor: 'Gestor',
};

const navItems = [
  { to: '/app',            icon: <LayoutDashboard className="w-5 h-5" />,  label: 'Dashboard'   },
  { to: '/app/trilha',     icon: <Map className="w-5 h-5" />,               label: 'Trilha'      },
  { to: '/app/plano',      icon: <CheckSquare className="w-5 h-5" />,       label: 'Plano'       },
  { to: '/app/evolucao',   icon: <TrendingUp className="w-5 h-5" />,        label: 'Evolução'    },
  { to: '/app/diario',     icon: <BookOpen className="w-5 h-5" />,          label: 'Diário'      },
  { to: '/app/comparador', icon: <GitCompareArrows className="w-5 h-5" />,  label: 'Comparador'  },
  { to: '/app/curriculo',  icon: <FileText className="w-5 h-5" />,          label: 'Currículo'   },
];

// bottom nav mostra só os 4 principais para não lotar
const bottomNavItems = navItems.slice(0, 4);

export const AppLayout: React.FC = () => {
  const { usuario, wizardConcluido, salvarCiclo, resetAtual, isDarkMode, setIsDarkMode,
    inventario, objetivos, planoAcaoStatus, historico } = usePdiStore();
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [showHistorico, setShowHistorico] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareToast, setShareToast] = useState<'copied' | 'shared' | null>(null);

  // Ativa sincronização automática com Firestore
  useFirebaseSync();
  // Notificações push de prazo
  useNotificacoesPrazo();

  // Sincroniza dark mode do store com o DOM
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Auth guard — redireciona para /login se não autenticado
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);

  // Se o wizard não foi concluído, redireciona
  useEffect(() => {
    if (!loading && user && !wizardConcluido) {
      navigate('/wizard', { replace: true });
    }
  }, [wizardConcluido, loading, user, navigate]);

  const handleNovoCiclo = () => {
    if (confirm('Deseja salvar o ciclo atual e iniciar uma nova revisão do PDI?')) {
      salvarCiclo();
      resetAtual();
      navigate('/wizard', { replace: true });
    }
  };

  const handleLogout = async () => {
    if (confirm('Deseja sair da sua conta?')) {
      await logout();
      navigate('/login', { replace: true });
    }
  };

  const handleShare = async () => {
    const acoesConcluidasCount = Object.values(planoAcaoStatus).filter(v => v === 'concluido').length;
    const profileData: PublicProfileData = {
      nome: usuario.nome || 'Profissional',
      area: AREA_LABELS[usuario.areaAtuacao] || usuario.areaAtuacao,
      nivel: NIVEL_LABELS[usuario.nivelCarreira] || usuario.nivelCarreira,
      hardSkills: inventario.hardSkills,
      softFortes: inventario.softSkills.filter(s => s.pontoForteOuMelhoria === 'Forte').map(s => s.atributo),
      softMelhoria: inventario.softSkills.filter(s => s.pontoForteOuMelhoria === 'Melhoria').map(s => s.atributo),
      objetivosCount: objetivos.length,
      acoesConcluidasCount,
      ciclosCount: historico.length,
      dataGeracao: new Date().toISOString(),
    };
    const encoded = encodeProfile(profileData);
    const url = `${window.location.origin}/p/${encoded}`;
    if (navigator.share) {
      try { await navigator.share({ title: `PDI de ${usuario.nome}`, url }); setShareToast('shared'); }
      catch { /* cancelado */ }
    } else {
      await navigator.clipboard.writeText(url);
      setShareToast('copied');
    }
    setTimeout(() => setShareToast(null), 3000);
  };

  // Avatar: usa foto do Google ou inicial do nome
  const photoURL = user?.photoURL;
  const firstName = usuario.nome?.split(' ')[0] || user?.displayName?.split(' ')[0] || 'Você';
  const initial = firstName.charAt(0).toUpperCase();

  // Enquanto carrega auth, mostra spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans">
      <HistoricoModal open={showHistorico} onClose={() => setShowHistorico(false)} />
      <CheckinSemanal />

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
            {shareToast && (
              <span className="hidden sm:block text-xs font-semibold text-emerald-600 dark:text-emerald-400 animate-pulse">
                {shareToast === 'copied' ? '✓ Link copiado!' : '✓ Compartilhado!'}
              </span>
            )}
            <button
              onClick={handleShare}
              className="p-2 rounded-full w-9 h-9 flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-800 hover:text-indigo-600 transition-colors"
              title="Compartilhar perfil público"
            >
              <Share2 className="w-4 h-4" />
            </button>
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
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full w-9 h-9 flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              title={isDarkMode ? 'Modo claro' : 'Modo escuro'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Avatar / logout */}
            <button
              onClick={handleLogout}
              title="Sair"
              className="flex items-center gap-1.5 ml-1 rounded-full hover:opacity-80 transition-opacity"
            >
              {photoURL ? (
                <img
                  src={photoURL}
                  alt={firstName}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-200 dark:ring-indigo-700"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-400 flex items-center justify-center text-white text-xs font-bold ring-2 ring-indigo-200 dark:ring-indigo-700">
                  {initial}
                </div>
              )}
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
              end={item.to === '/app'}
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

          {/* Divisor + Configurações */}
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
            <NavLink
              to="/app/config"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              <Settings className="w-5 h-5" /> Configurações
            </NavLink>
          </div>

          <div className="mt-auto pb-6 px-3 flex flex-col gap-2">
            <button
              onClick={handleNovoCiclo}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Novo Ciclo
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </div>
        </aside>

        {/* Mobile drawer */}
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
                  end={item.to === '/app'}
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
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                <NavLink
                  to="/app/config"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <Settings className="w-5 h-5" /> Configurações
                </NavLink>
              </div>
              <div className="mt-auto pb-6">
                <button
                  onClick={() => { setMenuOpen(false); handleLogout(); }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sair
                </button>
              </div>
            </nav>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 min-w-0">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>

      <ToastContainer />

      {/* Bottom nav — mobile (4 itens principais) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/app'}
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
        {/* Config no bottom nav como ícone */}
        <NavLink
          to="/config"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-3 text-[10px] font-semibold gap-1 transition-colors ${
              isActive
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-slate-400 dark:text-slate-500'
            }`
          }
        >
          <Settings className="w-5 h-5" />
          Config.
        </NavLink>
      </nav>
    </div>
  );
};
