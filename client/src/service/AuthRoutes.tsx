import { Navigate } from 'react-router-dom';
import type { ReactNode, FC } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
    adminOnly?: boolean;
    accountantOnly?: boolean;
    adminaccountantOnly?: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, adminOnly, accountantOnly , adminaccountantOnly = false}) => {

  const userRole = localStorage.getItem('userRole'); // "admin" or "user"
  const isAuthenticated = !!userRole;

  if (!isAuthenticated) {
    // Not logged in
    return <Navigate to="/" replace />;
  }
  if (adminOnly && userRole !== 'admin') {
    // Logged in but not admin
    return <Navigate to="/unauthorizedAcess" replace />;
  }
  if (accountantOnly && userRole !== 'accountant') {
    // Logged in but not accountant
    return <Navigate to="/unauthorizedAcess" replace />;
  }
  if (adminaccountantOnly && userRole !== 'admin' && userRole !== 'accountant') {
    // Logged in but not admin or accountant
    return <Navigate to="/unauthorizedAcess" replace />;
  }

  // Authorized
  return <>{children}</>;
};


export default ProtectedRoute;