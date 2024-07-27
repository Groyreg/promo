import React from 'react';
import ReactDOM from 'react-dom/client';
import { Interceptors } from '@api/axios';

import App from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Interceptors>
      <App />
    </Interceptors>
  </React.StrictMode>,
);
