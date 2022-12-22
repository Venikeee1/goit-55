import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/auth/operations';
import { selectUserState } from '../redux/auth/slice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isRefreshing, user, token, isTokenValid } =
    useSelector(selectUserState);

  const logout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return { isLoggedIn, isRefreshing, user, logout, token, isTokenValid };
};
