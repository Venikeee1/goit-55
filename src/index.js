import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PaginationProvider } from './context/pagination';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PaginationProvider>
        <App />
      </PaginationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
