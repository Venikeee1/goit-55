import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './Layouts/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { RestrictedRoute } from './components/RestrictedRoute/RestrictedRoute';
import { useEffect } from 'react';
import { refreshUser } from './redux/auth/operations';
import { useDispatch } from 'react-redux';
import './App.css';

const Homepage = lazy(() => import('./pages/Home/Home'));
const PostPage = lazy(() => import('./pages/Post/Post'));
const LoginPage = lazy(() => import('./pages/Login/Login'));
const RegisterPage = lazy(() => import('./pages/Register/Register'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Suspense fallback={<>Page is loading...</>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<>Page is loading...</>}>
                <Homepage />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute>
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute>
                <RegisterPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/posts/:id"
            element={
              <ProtectedRoute loader={<div>User refreshing</div>}>
                <PostPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<>Error page</>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
