import { createBrowserRouter } from 'react-router-dom';

import { AuthLayout } from '../layouts/AuthLayout';
import { AppLayout } from '../layouts/AppLayout';

import { Authentication } from '../pages/Authentication';
import { Dashboard } from '../pages/dashboard/index';
import { NotFound } from '../pages/NotFound';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: '/', element: <Authentication /> }],
  },
  {
    element: <AppLayout />,
    children: [{ path: '/dashboard', element: <Dashboard /> }],
  },
  { path: '*', element: <NotFound /> },
]);

export default router;
