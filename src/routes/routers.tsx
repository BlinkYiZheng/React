import React from 'react';
import { lazy } from 'react';
const Home = lazy(() => import('@/pages/Home'));

const routers = [
  {
    path: '/',
    element: <Home />,
  },
];
export default routers;
