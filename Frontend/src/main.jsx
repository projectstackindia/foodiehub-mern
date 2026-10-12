import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext'; // add this

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>   {/* wrap here */}
        <App />
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);