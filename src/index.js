import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PaginationProvider } from './context/pagination';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PaginationProvider>
      <App />
    </PaginationProvider>
  </React.StrictMode>
);
