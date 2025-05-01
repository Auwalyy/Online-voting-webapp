import { useAuth } from '../../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export function ProtectedRoute({ children, roles }) {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}