import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';

type AppProviderProps = {
  children: React.ReactNode;
};

const ErrorFallback = () => {
  return (
    <div>
      <h2>页面发生错误...</h2>
    </div>
  );
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ConfigProvider
          theme={{
            token: {
              // colorPrimary: '#00b96b',
              // colorBgContainer: '#f6ffed',
            },
          }}
        >
          <Router>{children}</Router>
        </ConfigProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
