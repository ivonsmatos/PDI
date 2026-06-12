import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { AppLayout } from './layouts/AppLayout';

const App           = lazy(() => import('./App'));
const LandingPage   = lazy(() => import('./pages/LandingPage').then(m => ({ default: m.LandingPage })));
const Privacidade   = lazy(() => import('./pages/Privacidade').then(m => ({ default: m.Privacidade })));
const Dashboard     = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Trilha        = lazy(() => import('./pages/Trilha').then(m => ({ default: m.Trilha })));
const PlanoBoard    = lazy(() => import('./pages/PlanoBoard').then(m => ({ default: m.PlanoBoard })));
const Evolucao      = lazy(() => import('./pages/Evolucao').then(m => ({ default: m.Evolucao })));
const Diario        = lazy(() => import('./pages/Diario').then(m => ({ default: m.Diario })));
const Config        = lazy(() => import('./pages/Config').then(m => ({ default: m.Config })));
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
    ],
  },
  // Compatibilidade com links antigos
  { path: '/dashboard', element: <Navigate to="/app" replace /> },
  { path: '*',          element: <Navigate to="/" replace /> },
]);

export default router;
