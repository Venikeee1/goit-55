import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './Layouts/MainLayout';
import './App.css';
import { selectUserState } from './redux/auth/slice';

const Homepage = lazy(() => import('./pages/Home/Home'));
const PostPage = lazy(() => import('./pages/Post/Post'));
const LoginPage = lazy(() => import('./pages/Login/Login'));
const RegisterPage = lazy(() => import('./pages/Register/Register'));

const App = () => {
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="*" element={<>Error page</>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
