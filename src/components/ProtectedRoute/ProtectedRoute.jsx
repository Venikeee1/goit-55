import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, loader: Loader }) => {
  const { isLoggedIn, isRefreshing, isTokenValid } = useAuth();

  if (isRefreshing) {
    return Loader ?? <>Loading</>;
  }

  if (!isLoggedIn && isTokenValid) {
    return <Navigate to="/login" />;
  }

  return children;
};
