import { Navigate } from 'react-router-dom';
import type { ReactNode, FC } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
    adminOnly?: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, adminOnly = false}) => {

  const userRole = localStorage.getItem('userRole'); // Example: "admin" or "user"
  const isAuthenticated = !!userRole;

  if (!isAuthenticated) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (adminOnly && userRole !== 'admin') {
    // Logged in but not admin
    return <Navigate to="/unauthorizedAcess" replace />;
  }

  // Authorized
  return <>{children}</>;
};


export default ProtectedRoute;