import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import { Dashboard } from './pages/Dashboard';
import { Trilha } from './pages/Trilha';
import { PlanoBoard } from './pages/PlanoBoard';
import { Evolucao } from './pages/Evolucao';
import { AppLayout } from './layouts/AppLayout';

const router = createBrowserRouter([
  {
    path: '/wizard',
    element: <App />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'trilha', element: <Trilha /> },
      { path: 'plano', element: <PlanoBoard /> },
      { path: 'evolucao', element: <Evolucao /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default router;
