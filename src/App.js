import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import MainLayout from './Layouts/MainLayout';
import { getLikedPosts } from './redux/selectors';
import './App.css';

const Homepage = lazy(() => import('./pages/Home/Home'));
const PostPage = lazy(() => import('./pages/Post/Post'));

const App = () => {
  const likedPosts = useSelector(getLikedPosts);

  console.log(likedPosts);
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
          <Route path="/pos`ts/:id" element={<PostPage />} />
          <Route path="*" element={<>Error page</>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
