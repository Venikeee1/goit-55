import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PaginationProvider } from './context/pagination';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PaginationProvider>
          <App />
        </PaginationProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
