import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const ArticlesPage = lazy(() => import('@/pages/ArticlesPage'));

const routers = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/articles/:name',
    element: <ArticlesPage />,
  },
];

export default routers;
