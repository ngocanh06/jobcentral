import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DeviceProvider } from './context/DeviceContext';
import { initScrollBoundaryIsolation } from './utils/scrollBoundary';
import './index.css';

// Initialize scroll boundary isolation so scrolling containers don't leak scroll to the entire page
initScrollBoundaryIsolation();

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
