import { Navigate } from 'react-router-dom';
import type { ReactNode, FC } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('userRole');

  if (!isAuthenticated) {
    // will return to Login if not authenticated
    return <Navigate to="/" replace />;
  }
  // If authenticated, render the requested page
  return <>{children}</>;
};

export default ProtectedRoute;