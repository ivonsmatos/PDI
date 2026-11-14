/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { AppLayout } from './layouts/AppLayout';

const App           = lazy(() => import('./App'));
const LandingPage          = lazy(() => import('./pages/LandingPage').then(m => ({ default: m.LandingPage })));
const OQueEPdi             = lazy(() => import('./pages/OQueEPdi').then(m => ({ default: m.OQueEPdi })));
const ComoFazerPdi         = lazy(() => import('./pages/ComoFazerPdi').then(m => ({ default: m.ComoFazerPdi })));
const ExemploPdi           = lazy(() => import('./pages/ExemploPdi').then(m => ({ default: m.ExemploPdi })));
const ParaRh               = lazy(() => import('./pages/ParaRh').then(m => ({ default: m.ParaRh })));
const CertificacoesPublicas = lazy(() => import('./pages/CertificacoesPublicas').then(m => ({ default: m.CertificacoesPublicas })));
const Sobre                = lazy(() => import('./pages/Sobre').then(m => ({ default: m.Sobre })));
const Privacidade          = lazy(() => import('./pages/Privacidade').then(m => ({ default: m.Privacidade })));
const NotFound             = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));
const Dashboard     = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Trilha        = lazy(() => import('./pages/Trilha').then(m => ({ default: m.Trilha })));
const PlanoBoard    = lazy(() => import('./pages/PlanoBoard').then(m => ({ default: m.PlanoBoard })));
const Evolucao      = lazy(() => import('./pages/Evolucao').then(m => ({ default: m.Evolucao })));
const Diario        = lazy(() => import('./pages/Diario').then(m => ({ default: m.Diario })));
const Config        = lazy(() => import('./pages/Config').then(m => ({ default: m.Config })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const Comparador    = lazy(() => import('./pages/Comparador').then(m => ({ default: m.Comparador })));
const Curriculo     = lazy(() => import('./pages/Curriculo').then(m => ({ default: m.Curriculo })));
const PerfilPublico = lazy(() => import('./pages/PerfilPublico').then(m => ({ default: m.PerfilPublico })));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const lazyPage = (el: React.ReactNode) => (
  <Suspense fallback={<PageLoader />}>{el}</Suspense>
);

const router = createBrowserRouter([
  // Landing page pública
  {
    path: '/',
    element: lazyPage(<LandingPage />),
  },
  {
    path: '/o-que-e-pdi',
    element: lazyPage(<OQueEPdi />),
  },
  {
    path: '/como-fazer-um-pdi',
    element: lazyPage(<ComoFazerPdi />),
  },
  {
    path: '/exemplo',
    element: lazyPage(<ExemploPdi />),
  },
  {
    path: '/para-rh',
    element: lazyPage(<ParaRh />),
  },
  {
    path: '/certificacoes-gratuitas',
    element: lazyPage(<CertificacoesPublicas />),
  },
  {
    path: '/sobre',
    element: lazyPage(<Sobre />),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/privacidade',
    element: lazyPage(<Privacidade />),
  },
  {
    path: '/p/:encoded',
    element: lazyPage(<PerfilPublico />),
  },
  {
    path: '/wizard',
    element: lazyPage(<App />),
  },
  // App autenticado — base /app
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { index: true,         element: lazyPage(<Dashboard />)   },
      { path: 'trilha',      element: lazyPage(<Trilha />)      },
      { path: 'plano',       element: lazyPage(<PlanoBoard />)  },
      { path: 'evolucao',    element: lazyPage(<Evolucao />)    },
      { path: 'diario',      element: lazyPage(<Diario />)      },
      { path: 'comparador',  element: lazyPage(<Comparador />)  },
      { path: 'curriculo',   element: lazyPage(<Curriculo />)   },
      { path: 'config',      element: lazyPage(<Config />)      },
      { path: 'admin',       element: lazyPage(<AdminDashboard />) },
    ],
  },
  // Compatibilidade com links antigos
  { path: '/dashboard', element: <Navigate to="/app" replace /> },
  { path: '*',          element: lazyPage(<NotFound />) },
]);

export default router;
