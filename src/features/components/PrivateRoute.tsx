import { FC, ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
  showError: () => void;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, isAuthenticated, showError }) => {
  useEffect(() => {
    if (!isAuthenticated) {
      showError();
    }
  }, [isAuthenticated, showError]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
