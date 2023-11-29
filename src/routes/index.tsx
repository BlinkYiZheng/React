import { useRoutes } from 'react-router-dom';
import routers from './routers';

export const AppRoutes = () => {
  const element = useRoutes([...routers]);
  return <>{element}</>;
};
