import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const RestrictedRoute = ({ children, loader: Loader }) => {
  const { isLoggedIn, isRefreshing, isUserRefreshed } = useAuth();

  if (isRefreshing || !isUserRefreshed) {
    return Loader ?? <>Loading</>;
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};
