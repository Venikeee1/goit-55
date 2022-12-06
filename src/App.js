import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useState, useRef } from 'react';
import MainLayout from './Layouts/MainLayout';
import './App.css';
import './qa/interview-tasks';
import { ErrorBoundary } from './qa/ErrorBoundary';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Homepage = lazy(() => import('./pages/Home/Home'));
const PostPage = lazy(() => import('./pages/Post/Post'));

const CustomForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    query: '',
  });
  const [clicks, setClicks] = useState(0);
  const formRef = useRef();
  /** const usersClickRef = useRef(0);
  // console.log(`clicked ${usersClickRef.current} times; in rerenders`);
  console.log(`clicked ${clicks} times; in rerenders`);
  */

  const handleClick = () => {
    // usersClickRef.current++;
    // setClicks((prevState) => prevState + 1);
    // console.log(`clicked ${usersClickRef.current} times`);
  };

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    setFormData({ [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };
  useEffect(() => {
    console.log(formRef.current, '--formRef');
  }, []);

  // throw new Error('super error');

  return (
    <form ref={formRef} onSubmit={handleSubmit} onClick={handleClick}>
      <input type="text" name="query" onChange={handleChange} />
      <button>Submit</button>
    </form>
  );
};

const FormPortal = () =>
  createPortal(<CustomForm />, document.getElementById('modals'));

const App = () => {
  const handleSubmit = (formData) => {
    fetch('/someAddress', formData);
  };

  return (
    <Suspense fallback={<>Page is loading...</>}>
      <ErrorBoundary fallbackComponent={<>There was an error </>}>
        <CustomForm onSubmit={handleSubmit} />
      </ErrorBoundary>
      <FormPortal />

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
