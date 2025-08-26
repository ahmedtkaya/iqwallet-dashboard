import { createBrowserRouter } from 'react-router-dom';

import { AuthLayout } from '../layouts/AuthLayout';
import { AppLayout } from '../layouts/AppLayout';
import { Dashboard } from '../pages/dashboard/index';
import { NotFound } from '../pages/NotFound';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: '/', element: <AuthLayout /> }], //Authentication vardı burada normalde ama sil dediğin için sildim hata veriyordu böyle düzenledim
  },
  {
    element: <AppLayout />,
    children: [{ path: '/dashboard', element: <Dashboard /> }],
  },
  { path: '*', element: <NotFound /> },
]);

export default router;
