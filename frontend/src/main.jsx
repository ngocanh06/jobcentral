import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DeviceProvider } from './context/DeviceContext';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <DeviceProvider>
        <App />
      </DeviceProvider>
    </React.StrictMode>
  );
}
