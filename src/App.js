import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Home/Home';
import PostPage from './pages/Post/Post';
import MainLayout from './Layouts/MainLayout';
import './App.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="*" element={<>Error page</>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
