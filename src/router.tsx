import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { AppLayout } from './layouts/AppLayout';

// Code splitting: cada rota vira um chunk separado — o bundle inicial fica leve
// (Login e AppLayout ficam no bundle principal por serem o caminho crítico)
const App         = lazy(() => import('./App'));
const Privacidade = lazy(() => import('./pages/Privacidade').then(m => ({ default: m.Privacidade })));
const Dashboard   = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Trilha      = lazy(() => import('./pages/Trilha').then(m => ({ default: m.Trilha })));
const PlanoBoard  = lazy(() => import('./pages/PlanoBoard').then(m => ({ default: m.PlanoBoard })));
const Evolucao    = lazy(() => import('./pages/Evolucao').then(m => ({ default: m.Evolucao })));
const Diario      = lazy(() => import('./pages/Diario').then(m => ({ default: m.Diario })));
const Config      = lazy(() => import('./pages/Config').then(m => ({ default: m.Config })));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const lazyPage = (el: React.ReactNode) => (
  <Suspense fallback={<PageLoader />}>{el}</Suspense>
);

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/privacidade',
    element: lazyPage(<Privacidade />),
  },
  {
    path: '/wizard',
    element: lazyPage(<App />),
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true,      element: lazyPage(<Dashboard />)  },
      { path: 'trilha',   element: lazyPage(<Trilha />)     },
      { path: 'plano',    element: lazyPage(<PlanoBoard />) },
      { path: 'evolucao', element: lazyPage(<Evolucao />)   },
      { path: 'diario',   element: lazyPage(<Diario />)     },
      { path: 'config',   element: lazyPage(<Config />)     },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default router;
