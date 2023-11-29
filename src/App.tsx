import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes';
import React from 'react';

const App = () => (
  <AppProvider>
    <AppRoutes />
  </AppProvider>
);

export default App;
