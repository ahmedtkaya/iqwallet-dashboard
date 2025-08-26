import { createBrowserRouter } from 'react-router-dom';

import { AuthLayout } from '../layouts/AuthLayout';
import { AppLayout } from '../layouts/AppLayout';
import { Dashboard } from '../pages/dashboard/index';
import { NotFound } from '../pages/NotFound';
import { Card } from '../pages/Card';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: '/', element: <AuthLayout /> }], //Authentication vardı burada normalde ama sil dediğin için sildim hata veriyordu böyle düzenledim
  },
  {
    element: <AppLayout />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/card', element: <Card /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

export default router;
